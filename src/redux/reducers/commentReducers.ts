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
}

const initialState: CommentState = {
  isCommentLoading: false,
  isLoaded: false,
  errors: null,
  comment_data: [],
  commentCounts: {},
};

export default (
  state = initialState,
  { type, payload }: { type: string; payload: any }
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

  switch (type) {
    case FETCH_COMMENTS_LOADING:
    case CREATE_COMMENT_LOADING:
    case COUNT_COMMENTS_LOADING:
      return { ...state, isCommentLoading: true };

    case FETCH_COMMENTS_SUCCESS:
      if (!Array.isArray(payload)) {
        console.error('FETCH_COMMENTS_SUCCESS: Invalid payload', payload);
        return { ...state, errors: 'Invalid data format' };
      }
      return {
        ...state,
        isCommentLoading: false,
        isLoaded: true,
        comment_data: payload.map(normalizeComment),
      };

    case CREATE_COMMENT_SUCCESS:
      if (!payload || !payload.id) {
        console.error('CREATE_COMMENT_SUCCESS: Missing id in payload', payload);
        return state;
      }
      return {
        ...state,
        isCommentLoading: false,
        isLoaded: true,
        comment_data: [...state.comment_data, normalizeComment(payload)],
      };

    case COUNT_COMMENTS_SUCCESS:
      if (!payload || !payload.blogId || typeof payload.count !== 'number') {
        console.error('COUNT_COMMENTS_SUCCESS: Invalid payload', payload);
        return state;
      }
      return {
        ...state,
        isCommentLoading: false,
        commentCounts: {
          ...state.commentCounts,
          [payload.blogId]: payload.count,
        },
      };

    case FETCH_COMMENTS_FAIL:
    case CREATE_COMMENT_FAIL:
        console.error(`${type}:`, payload); 
        return {
          ...state,
          isCommentLoading: false,
          errors: payload || 'An error occurred while creating the comment.',
        };
    case COUNT_COMMENTS_FAIL:
      console.error(`${type}:`, payload);
      return { ...state, isCommentLoading: false, errors: payload || 'Error occurred' };

    default:
      return state;
  }
};
