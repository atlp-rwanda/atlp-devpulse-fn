// actions/blogActions.ts

import axios from "./axiosconfig";
import {
  fetchBlogs,
  fetchSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../actiontypes/blogTypes";
import { toast } from "react-toastify";
import creator from "./creator";
import {
  FETCH_BLOGS_FAIL,
  FETCH_BLOGS_LOADING,
  FETCH_BLOGS_SUCCESS,
} from "../index";

// Fetch all blogs
export const getAllBlogs = (tag?: string) => async (dispatch: any) => {
  dispatch({
    type: FETCH_BLOGS_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `query GetAllBlogs($tag: String) {
        getAllBlogs(tag: $tag) {
          id
          title
          content
          coverImage
          images
          likes {
            id
          }
          comments {
            id
          }
          isHidden
          author {
            id
            firstName
            lastName
          }
          tags
          created_at
          updated_at
        }
      }`,
      variables: { tag },
    });
    const blogsData = response.data.data.getAllBlogs;
    dispatch(creator(FETCH_BLOGS_SUCCESS, blogsData));
  } catch (err: any) {
    dispatch(creator(FETCH_BLOGS_FAIL, err));
    toast.error(err.message);
  }
};

// Fetch a single blog by ID
export const getBlogById = (id: string) => async (dispatch: any) => {
  dispatch({
    type: fetchSingleBlog.FETCH_SINGLE_BLOG_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `query GetBlogById($id: ID!) {
        getBlogById(id: $id) {
          id
          title
          content
          coverImage
          images
          likes {
            id
          }
          comments {
            id
          }
          isHidden
          author {
            id
            firstName
            lastName
          }
          tags
          created_at
          updated_at
        }
      }`,
      variables: { id },
    });

    dispatch({
      type: fetchSingleBlog.FETCH_SINGLE_BLOG_SUCCESS,
      data: response.data.data.getBlogById,
    });
  } catch (err: any) {
    dispatch({
      type: fetchSingleBlog.FETCH_SINGLE_BLOG_FAIL,
      error: err.message,
    });
    toast.error(err.message);
  }
};

// Create a new blog
export const createBlogAction = (blogFields: any) => async (dispatch: any) => {
  dispatch({
    type: createBlog.CREATE_BLOG_LOADING,
  });
  try {
    const response = await axios.post("/", {
      query: `
        mutation CreateBlog($blogFields: BlogInput!) {
         createBlog(blogFields: $blogFields) {
          id
          title
          content
          coverImage
          images
          likes {
            id
          }
          comments {
            id
          }
          isHidden
          author {
            id
            firstName
            lastName
          }
          tags
          created_at
          updated_at
        }
      }
      `,
      variables: {
        blogFields: {
          title: blogFields.title,
          content: blogFields.content,
          coverImage: blogFields.coverImage,
          author: blogFields.author,
          images: blogFields.images!,
          tags: blogFields.tags!,
        },
      },
    });

    dispatch({
      type: createBlog.CREATE_BLOG_SUCCESS,
      data: response.data.data.createBlog,
    });
    toast.success("Blog created successfully!");
  } catch (err: any) {
    console.log("Request Blog Fields: ", blogFields);
    dispatch({
      type: createBlog.CREATE_BLOG_FAIL,
      error: err.message,
    });
  }
};

// Update an existing blog
export const updateBlogAction =
  (id: string, updateFields: any) => async (dispatch: any) => {
    dispatch({
      type: updateBlog.UPDATE_BLOG_LOADING,
    });

    try {
      const response = await axios.post("/", {
        query: `mutation UpdateBlog($id: ID!, $updateFields: BlogInput) {
        updateBlog(id: $id, ...$updateFields) {
          id
          title
          content
          coverImage
          images
          likes {
            id
          }
          comments {
            id
          }
          isHidden
          author {
            id
            firstName
            lastName
          }
          tags
          created_at
          updated_at
        }
      }`,
        variables: { id, ...updateFields },
      });

      dispatch({
        type: updateBlog.UPDATE_BLOG_SUCCESS,
        data: response.data.data.updateBlog,
      });
      toast.success("Blog updated successfully!");
    } catch (err: any) {
      dispatch({
        type: updateBlog.UPDATE_BLOG_FAIL,
        error: err.message,
      });
      toast.error(err.message);
    }
  };

// Delete a blog
export const deleteBlogAction = (id: string) => async (dispatch: any) => {
  dispatch({
    type: deleteBlog.DELETE_BLOG_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `mutation DeleteBlog($id: ID!) {
        deleteBlog(id: $id)
      }`,
      variables: { id },
    });

    dispatch({
      type: deleteBlog.DELETE_BLOG_SUCCESS,
      message: "Blog deleted successfully",
    });
    toast.success("Blog deleted successfully!");
  } catch (err: any) {
    dispatch({
      type: deleteBlog.DELETE_BLOG_FAIL,
      error: err.message,
    });
    toast.error(err.message);
  }
};
