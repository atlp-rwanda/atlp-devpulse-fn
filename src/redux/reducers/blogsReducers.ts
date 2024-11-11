import { toast } from "react-toastify";
import {
  fetchBlogs,
  fetchSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../actiontypes/blogTypes";

interface State {
  success: boolean;
  loading: boolean;
  error: any;
  message: any;
  data: any;
}

const initialState: State = {
  loading: false,
  success: false,
  error: null,
  message: null,
  data: { blogs: [] },
};

// Reducer for all blogs (fetch, create, update, delete)
export const blogsReducer = (
  state: State = initialState,
  action: any
): State => {
  switch (action.type) {
    case fetchBlogs.FETCH_BLOGS_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
        message: null,
        data: null,
      };
    case fetchBlogs.FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: action.message,
        data: action.data,
      };
    case fetchBlogs.FETCH_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };

    case createBlog.CREATE_BLOG_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case createBlog.CREATE_BLOG_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: action.message,
        data: {
          blogs: [action.data, ...state.data.blogs],
        },
      };
    case createBlog.CREATE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case updateBlog.UPDATE_BLOG_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case updateBlog.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: action.message,
        data: {
          blogs: state.data.blogs.map((blog: any) =>
            blog.id === action.data.id ? action.data : blog
          ),
        },
      };
    case updateBlog.UPDATE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case deleteBlog.DELETE_BLOG_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case deleteBlog.DELETE_BLOG_SUCCESS:
      if (!action.data.id) {
        toast.error("Blog has already been deleted");
      }
      return {
        ...state,
        loading: false,
        data: {
          blogs: state.data.blogs.filter(
            (blog: any) => blog.id !== action.data.id
          ),
        },
      };
    case deleteBlog.DELETE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

// Reducer for a single blog (fetching by ID)
export const singleBlogReducer = (
  state: State = initialState,
  action: any
): State => {
  switch (action.type) {
    case fetchSingleBlog.FETCH_SINGLE_BLOG_LOADING:
      return {
        loading: true,
        success: false,
        error: null,
        message: null,
        data: null,
      };
    case fetchSingleBlog.FETCH_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        message: action.message,
        data: action.data,
      };
    case fetchSingleBlog.FETCH_SINGLE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      };

    default:
      return state;
  }
};
