import axios from "./axiosconfig";
import { toast } from "react-toastify";
import creator from "./creator";
import {
  FETCH_COMMENTS_FAIL,
  FETCH_COMMENTS_LOADING,
  FETCH_COMMENTS_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_LOADING,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_LOADING,
  DELETE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_LOADING,
  UPDATE_COMMENT_SUCCESS,
} from "../index";

export const getCommentsByBlogId = (id: string) => async (dispatch: any) => {
  dispatch({
    type: FETCH_COMMENTS_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `query GetCommentsByBlog($blog: ID!) {
        getCommentsByBlog(blog: $blog) {
         id
         content
         blog {
          id
          title  
        }
         user {
           id
           firstname
           lastname
        }  
       }
      }`,
      variables: { blog: id },
    });

    const commentsData = response.data.data.getCommentsByBlog;
    console.log("commentsData", commentsData)
    dispatch(creator(FETCH_COMMENTS_SUCCESS, commentsData));
  } catch (err: any) {
    const errorMessage = err.response?.data?.errors?.[0]?.message || err.message || "Failed to fetch comments";
    dispatch(creator(FETCH_COMMENTS_FAIL, errorMessage));
    toast.error(errorMessage);
  }
};

export const createCommentAction = (blogId: string, content: string) => async (dispatch: any) => {
  const userId = localStorage.getItem('userId'); 

  if (!userId) {
    toast.error("User not logged in.");
    return;
  }

  dispatch({
    type: CREATE_COMMENT_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `
        mutation addComment($content: String!, $user: ID!, $blog: ID!) {
          addComment(content: $content, user: $user, blog: $blog) {
            id
            content
            user {
              id
              firstname
              lastname
            }

          }
        }
      `,
      variables: {
        content,
        user: userId,
        blog: blogId,
      },
    });

    const createdComment = response?.data?.data?.addComment;
    console.log(createdComment);

    if (!createdComment || !createdComment.id) {
      throw new Error("Invalid response structure: 'id' is missing.");
    }

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: createdComment,
    });
    toast.success("Comment created successfully!");
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.errors?.[0]?.message || err.message || "Failed to create comment";
    dispatch({
      type: CREATE_COMMENT_FAIL,
      error: errorMessage,
    });
    toast.error(errorMessage);
  }
};
 

export const updateCommentAction = (commentId: string, updateFields: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_COMMENT_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `mutation UpdateComment($commentId: ID!, $updateFields: CommentInput!) {
        updateComment(commentId: $commentId, updateFields: $updateFields) {
          id
          content
          created_at
          updated_at
          author {
            id
            email
            firstname
            lastname
          }
        }
      }`,
      variables: { commentId, updateFields },
    });

    const updatedComment = response?.data?.data?.updateComment;

    if (!updatedComment || !updatedComment.id) {
      throw new Error("Invalid response structure for update.");
    }

    dispatch({
      type: UPDATE_COMMENT_SUCCESS,
      payload: updatedComment,
    });
    toast.success("Comment updated successfully!");
  } catch (err: any) {
    const errorMessage = err.response?.data?.errors?.[0]?.message || err.message || "Failed to update comment";
    dispatch({
      type: UPDATE_COMMENT_FAIL,
      error: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const deleteCommentAction = (commentId: string) => async (dispatch: any) => {
  dispatch({
    type: DELETE_COMMENT_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `mutation DeleteComment($commentId: ID!) {
        deleteComment(commentId: $commentId)
      }`,
      variables: { commentId },
    });

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: commentId, 
    });
    toast.success("Comment deleted successfully!");
  } catch (err: any) {
    const errorMessage = err.response?.data?.errors?.[0]?.message || err.message || "Failed to delete comment";
    dispatch({
      type: DELETE_COMMENT_FAIL,
      error: errorMessage,
    });
    toast.error(errorMessage);
  }
};
