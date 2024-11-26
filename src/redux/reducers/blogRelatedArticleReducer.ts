import {
    FETCH_BLOG_RELATED_ARTICLE_LOADING,
    FETCH_BLOG_RELATED_ARTICLE_SUCCESS,
    FETCH_BLOG_RELATED_ARTICLE_FAIL,
  } from "../index";
  
  const initialState = {
    isLoading: false,
    isLoaded: false,
    error: null,
    blogRelatedArticles: {} 
  };
  
  const blogRelatedArticle = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_BLOG_RELATED_ARTICLE_LOADING:
        return {
          ...state,
          isLoading: true,
          isLoaded: false,
        };
      case FETCH_BLOG_RELATED_ARTICLE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isLoaded: true,
          blogRelatedArticles: action.payload,
        };
      case FETCH_BLOG_RELATED_ARTICLE_FAIL:
        return {
          ...state,
          isLoading: false,
          isLoaded: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default blogRelatedArticle;
  