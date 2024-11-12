// import { toast } from "react-toastify";
// import {
//   fetchBlogs,
//   fetchSingleBlog,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } from "../actiontypes/blogTypes";
import {
  FETCH_BLOGS_FAIL,
  FETCH_BLOGS_LOADING,
  FETCH_BLOGS_SUCCESS,
} from "../index";

// interface State {
//   success: boolean;
//   loading: boolean;
//   error: any;
//   message: any;
//   data: any;
// }

// const initialState: State = {
//   loading: false,
//   success: false,
//   error: null,
//   message: null,
//   data: [],
// };

// // Reducer for all blogs (fetch, create, update, delete)
// export const blogsReducer = (
//   state = initialState,
//   { type, payload }: any
// ): State => {
//   switch (type) {
//     case FETCH_BLOGS_LOADING:
//       return {
//         ...state,
//         loading: true,
//         success: false,
//         error: null,
//         message: null,
//         data: null,
//       };
//     case FETCH_BLOGS_SUCCESS:
//       return {
//         ...state,
//         success: true,
//         loading: false,
//         message: payload.message,
//         data: payload,
//       };
//     case FETCH_BLOGS_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: error,
//         data: null,
//       };

//     case createBlog.CREATE_BLOG_LOADING:
//       return {
//         ...state,
//         loading: true,
//         success: false,
//         error: null,
//       };
//     case createBlog.CREATE_BLOG_SUCCESS:
//       return {
//         ...state,
//         success: true,
//         loading: false,
//         message: payload.message,
//         data: {
//           blogs: [payload.data, ...state.data.blogs],
//         },
//       };
//     case createBlog.CREATE_BLOG_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: payload.error,
//       };

//     case updateBlog.UPDATE_BLOG_LOADING:
//       return {
//         ...state,
//         loading: true,
//         success: false,
//         error: null,
//       };
//     case updateBlog.UPDATE_BLOG_SUCCESS:
//       return {
//         ...state,
//         success: true,
//         loading: false,
//         message: payload.message,
//         data: {
//           blogs: state.data.blogs.map((blog: any) =>
//             blog.id === payload.data.id ? payload.data : blog
//           ),
//         },
//       };
//     case updateBlog.UPDATE_BLOG_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: payload.error,
//       };

//     case deleteBlog.DELETE_BLOG_LOADING:
//       return {
//         ...state,
//         loading: true,
//         success: false,
//         error: null,
//       };
//     case deleteBlog.DELETE_BLOG_SUCCESS:
//       if (!payload.data.id) {
//         toast.error("Blog has already been deleted");
//       }
//       return {
//         ...state,
//         loading: false,
//         data: {
//           blogs: state.data.blogs.filter(
//             (blog: any) => blog.id !== payload.data.id
//           ),
//         },
//       };
//     case deleteBlog.DELETE_BLOG_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: payload.error,
//       };

//     default:
//       return state;
//   }
// };

// // Reducer for a single blog (fetching by ID)
// export const singleBlogReducer = (
//   state: State = initialState,
//   action: any
// ): State => {
//   switch (action.type) {
//     case fetchSingleBlog.FETCH_SINGLE_BLOG_LOADING:
//       return {
//         loading: true,
//         success: false,
//         error: null,
//         message: null,
//         data: null,
//       };
//     case fetchSingleBlog.FETCH_SINGLE_BLOG_SUCCESS:
//       return {
//         ...state,
//         success: true,
//         loading: false,
//         message: action.message,
//         data: action.data,
//       };
//     case fetchSingleBlog.FETCH_SINGLE_BLOG_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.error,
//         data: null,
//       };

//     default:
//       return state;
//   }
// };

const initialState = {
  isLoading: true,
  isLoaded: false,
  errors: null,
  data: [],
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case FETCH_BLOGS_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: true,
      };

    default:
      return state;
  }
};
