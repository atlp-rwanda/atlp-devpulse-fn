import {
    FETCH_COMMENTS_LOADING,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAIL,
    CREATE_COMMENT_LOADING,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,
    UPDATE_COMMENT_LOADING,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAIL,
    DELETE_COMMENT_LOADING,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
  } from "../index";
  
  interface Comment {
    id: string;
    content: string;
    author: {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
    };
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any;
  }
  
  interface CommentState {
    isCommentLoading: boolean;
    isLoaded: boolean;
    errors: null | string;
    comment_data: Comment[];
  }
  
  const initialState: CommentState = {
    isCommentLoading: false,
    isLoaded: false,
    errors: null,
    comment_data: [],
  };
  
  export default (
    state = initialState,
    { type, payload }: { type: string; payload: any }
  ): CommentState => {
    switch (type) {
      case FETCH_COMMENTS_LOADING:
      case CREATE_COMMENT_LOADING:
      case UPDATE_COMMENT_LOADING:
      case DELETE_COMMENT_LOADING:
        return {
          ...state,
          isCommentLoading: true,
        };
  
      case FETCH_COMMENTS_SUCCESS:
        return {
          ...state,
          isCommentLoading: false,
          isLoaded: true,
          comment_data: payload,
        };
  
      case CREATE_COMMENT_SUCCESS:
        if (!payload || !payload.id) {
          console.error("Invalid payload for CREATE_COMMENT_SUCCESS:", payload);
          return state;
        }
  
        const newComment = {
          ...payload,
          id: payload.id || payload._id, 
          author: {
            id: payload.author.id,
          },
        };
  
        return {
          ...state,
          isCommentLoading: false,
          isLoaded: true,
          comment_data: [...state.comment_data, newComment],
        };
  
      case UPDATE_COMMENT_SUCCESS:
        return {
          ...state,
          isCommentLoading: false,
          isLoaded: true,
          comment_data: state.comment_data.map((comment) =>
            comment.id === payload.id ? { ...comment, ...payload } : comment
          ),
        };
  
      case DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          isCommentLoading: false,
          isLoaded: true,
          comment_data: state.comment_data.filter((comment) => comment.id !== payload.id),
        };
  
      case FETCH_COMMENTS_FAIL:
      case CREATE_COMMENT_FAIL:
      case UPDATE_COMMENT_FAIL:
      case DELETE_COMMENT_FAIL:
        //console.error("Comment operation failed:", payload);
        return {
          ...state,
          isCommentLoading: false,
          isLoaded: false,
          errors: payload,
        };
  
      default:
        return state;
    }
  };
  