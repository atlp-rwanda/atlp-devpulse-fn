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
  replies: { [commentId: string]: Comment[] };
  repliesByCommentId: { [commentId: string]: Comment[] };
}

const initialState: CommentState = {
  isCommentLoading: false,
  isLoaded: false,
  errors: null,
  comment_data: [],
  commentCounts: {},
  replies: {},
  repliesByCommentId: {},
};

export default (
  state = initialState,
  action: { type: string; payload: any }
): CommentState => {
  const normalizeComment = (comment: any): Comment => ({
    id: comment.id || 'unknown',
    content: comment.content || 'No content provided',
    user: comment.user || {
      id: '',
      firstname: 'Anonymous',
      lastname: 'User',
    },
    createdAt: comment.createdAt || new Date().toISOString(),
    updatedAt: comment.updatedAt || new Date().toISOString(),
    likesCount: comment.likesCount || 0,
  });

  switch (action.type) {
    case FETCH_COMMENTS_LOADING:
    case CREATE_COMMENT_LOADING:
    case COUNT_COMMENTS_LOADING:
    case ADD_COMMENT_LIKE_LOADING:
    case GET_COMMENT_LIKES_LOADING:
    case FETCH_REPLIES_LOADING:
    case ADD_REPLY_LOADING:
      return { ...state, isCommentLoading: true };

    case FETCH_COMMENTS_SUCCESS:
      if (!Array.isArray(action.payload)) {
        console.error('FETCH_COMMENTS_SUCCESS: Invalid payload', action.payload);
        return { ...state, errors: 'Invalid data format' };
      }
      return {
        ...state,
        isCommentLoading: false,
        isLoaded: true,
        comment_data: action.payload.map(normalizeComment),
      };

    case CREATE_COMMENT_SUCCESS:
      if (!action.payload || !action.payload.id) {
        console.error('CREATE_COMMENT_SUCCESS: Missing id in payload', action.payload);
        return state;
      }
      return {
        ...state,
        isCommentLoading: false,
        isLoaded: true,
        comment_data: [...state.comment_data, normalizeComment(action.payload)],
      };

    case COUNT_COMMENTS_SUCCESS:
      if (!action.payload || !action.payload.blogId || typeof action.payload.count !== 'number') {
        console.error('COUNT_COMMENTS_SUCCESS: Invalid payload', action.payload);
        return state;
      }
      return {
        ...state,
        isCommentLoading: false,
        commentCounts: {
          ...state.commentCounts,
          [action.payload.blogId]: action.payload.count,
        },
      };

    case ADD_COMMENT_LIKE_SUCCESS:
      if (!action.payload || !action.payload.commentId || typeof action.payload.likesCount !== 'number') {
        console.error('ADD_COMMENT_LIKE_SUCCESS: Invalid payload', action.payload);
        return state;
      }
      return {
        ...state,
        isCommentLoading: false,
        comment_data: state.comment_data.map((comment) =>
          comment.id === action.payload.commentId
            ? { ...comment, likesCount: action.payload.likesCount }
            : comment
        ),
      };

    case GET_COMMENT_LIKES_SUCCESS:
      if (!action.payload || !action.payload.commentId || typeof action.payload.count !== 'number') {
        console.error('GET_COMMENT_LIKES_SUCCESS: Invalid payload', action.payload);
        return state;
      }
      return {
        ...state,
        isCommentLoading: false,
        comment_data: state.comment_data.map((comment) =>
          comment.id === action.payload.commentId
            ? { ...comment, likesCount: action.payload.count }
            : comment
        ),
      };

    case FETCH_REPLIES_SUCCESS:
      if (!action.payload || !Array.isArray(action.payload.replies)) {
        console.error('FETCH_REPLIES_SUCCESS: Invalid payload', action.payload);
        return { ...state, errors: 'Invalid reply data format.' };
      }
      const repliesByCommentId = action.payload.replies.reduce((acc, reply) => {
        const commentId = reply.comment; // Use `comment` field from reply object
        if (!acc[commentId]) {
          acc[commentId] = [];
        }
        acc[commentId].push({
          id: reply._id, // Use `_id` for unique identifier
          content: reply.content,
          user: reply.user,
          createdAt: reply.created_at, // Map `created_at` to `createdAt`
        });
        return acc;
      }, {});

      return {
        ...state,
        isCommentLoading: false,
        repliesByCommentId: {
          ...state.repliesByCommentId,
          ...repliesByCommentId,
        },
      };

      case ADD_REPLY_SUCCESS: {
        const { commentId, reply } = action.payload;
      
        return {
          ...state,
          isCommentLoading: false,
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
        };
      }
      

    case FETCH_REPLIES_FAIL:
    case ADD_REPLY_FAIL:
    case FETCH_COMMENTS_FAIL:
    case CREATE_COMMENT_FAIL:
    case COUNT_COMMENTS_FAIL:
    case ADD_COMMENT_LIKE_FAIL:
    case GET_COMMENT_LIKES_FAIL:
      console.error(`${action.type}:`, action.payload);
      return {
        ...state,
        isCommentLoading: false,
        errors: action.payload || 'An error occurred while processing the request.',
      };

    default:
      return state;
  }
};
