import {
  FETCH_COMMENTS_LOADING,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
  CREATE_COMMENT_LOADING,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  COUNT_COMMENTS_LOADING,
  COUNT_COMMENTS_SUCCESS,
  COUNT_COMMENTS_FAIL,
  ADD_COMMENT_LIKE_LOADING,
  ADD_COMMENT_LIKE_SUCCESS,
  ADD_COMMENT_LIKE_FAIL,
  GET_COMMENT_LIKES_LOADING,
  GET_COMMENT_LIKES_SUCCESS,
  GET_COMMENT_LIKES_FAIL,
  ADD_REPLY_FAIL,
  FETCH_REPLIES_FAIL,
  ADD_REPLY_SUCCESS,
  FETCH_REPLIES_SUCCESS,
  FETCH_REPLIES_LOADING,
  ADD_REPLY_LOADING,
} from '../index';

interface User {
  id: string;
  firstname: string;
  lastname: string;
}

interface Comment {
  id: string;
  content: string;
  user: User;
  createdAt?: string;
  updatedAt?: string;
  likesCount: number;
}

interface CommentState {
  isCommentLoading: boolean;
  isLoaded: boolean;
  errors: null | string;
  comment_data: Comment[];
  commentCounts: { [blogId: string]: number };
  repliesByCommentId: { [commentId: string]: Comment[] };
}

const initialState: CommentState = {
  isCommentLoading: false,
  isLoaded: false,
  errors: null,
  comment_data: [],
  commentCounts: {},
  repliesByCommentId: {},
};

const normalizeComment = (comment: any): Comment => ({
  id: comment.id || 'unknown',
  content: comment.content || 'No content provided',
  user: comment.user || { id: '', firstname: 'Anonymous', lastname: 'User' },
  createdAt: comment.createdAt || new Date().toISOString(),
  updatedAt: comment.updatedAt || new Date().toISOString(),
  likesCount: comment.likesCount || 0,
});

const handleLoadingStates = (state: CommentState): CommentState => ({
  ...state,
  isCommentLoading: true,
});

const handleFailState = (state: CommentState, error: string | null): CommentState => ({
  ...state,
  isCommentLoading: false,
  errors: error || 'An error occurred while processing the request.',
});

const handleSuccessState = (state: CommentState, updates: Partial<CommentState>): CommentState => ({
  ...state,
  isCommentLoading: false,
  ...updates,
});

const reducer = (state = initialState, action: { type: string; payload: any }): CommentState => {
  let newState = state;

  if (action.type.endsWith('_LOADING')) {
    newState = handleLoadingStates(state);
  } else if (action.type.endsWith('_FAIL')) {
    console.error(`${action.type}:`, action.payload);
    newState = handleFailState(state, action.payload);
  } else if (action.type.endsWith('_SUCCESS')) {
    switch (action.type) {
      case FETCH_COMMENTS_SUCCESS:
        newState = handleSuccessState(state, {
          isLoaded: true,
          comment_data: Array.isArray(action.payload)
            ? action.payload.map(normalizeComment)
            : state.comment_data,
        });
        break;

      case CREATE_COMMENT_SUCCESS:
        if (action.payload && action.payload.id) {
          newState = handleSuccessState(state, {
            isLoaded: true,
            comment_data: [...state.comment_data, normalizeComment(action.payload)],
          });
        }
        break;

      case COUNT_COMMENTS_SUCCESS:
        if (action.payload?.blogId && typeof action.payload.count === 'number') {
          newState = handleSuccessState(state, {
            commentCounts: {
              ...state.commentCounts,
              [action.payload.blogId]: action.payload.count,
            },
          });
        }
        break;

      case ADD_COMMENT_LIKE_SUCCESS:
      case GET_COMMENT_LIKES_SUCCESS:
        if (action.payload?.commentId && typeof action.payload.likesCount === 'number') {
          newState = handleSuccessState(state, {
            comment_data: state.comment_data.map((comment) =>
              comment.id === action.payload.commentId
                ? { ...comment, likesCount: action.payload.likesCount }
                : comment
            ),
          });
        }
        break;

      case FETCH_REPLIES_SUCCESS:
        if (Array.isArray(action.payload?.replies)) {
          const repliesByCommentId = action.payload.replies.reduce((acc, reply) => {
            const commentId = reply.comment;
            acc[commentId] = acc[commentId] || [];
            acc[commentId].push({
              id: reply._id,
              content: reply.content,
              user: reply.user,
              createdAt: reply.created_at,
            });
            return acc;
          }, {});

          newState = handleSuccessState(state, {
            repliesByCommentId: {
              ...state.repliesByCommentId,
              ...repliesByCommentId,
            },
          });
        }
        break;

      case ADD_REPLY_SUCCESS:
        const { commentId, reply } = action.payload || {};
        if (commentId && reply) {
          newState = handleSuccessState(state, {
            repliesByCommentId: {
              ...state.repliesByCommentId,
              [commentId]: [
                ...(state.repliesByCommentId[commentId] || []),
                {
                  id: reply._id,
                  content: reply.content,
                  user: reply.user || { firstname: 'Anonymous', lastname: '' },
                },
              ],
            },
          });
        }
        break;

      default:
        break;
    }
  }

  return newState;
};

export default reducer;
