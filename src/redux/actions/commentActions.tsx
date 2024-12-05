import axios from "./axiosconfig";
import { toast } from "react-toastify";
import creator from "./creator";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
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
  COUNT_COMMENTS_LOADING,
  COUNT_COMMENTS_SUCCESS,
  COUNT_COMMENTS_FAIL,
  FETCH_REPLIES_LOADING,
  FETCH_REPLIES_SUCCESS,
  FETCH_REPLIES_FAIL,
  ADD_REPLY_LOADING,
  ADD_REPLY_SUCCESS,
  ADD_REPLY_FAIL,
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
          user {
            id
            firstname
            lastname
          }  
        }
      }`,
      variables: { blog: id },
    });

    const comments = response.data.data.getCommentsByBlog;

    dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      payload: comments,
    });

    const commentCount = comments.length;
    dispatch({
      type: COUNT_COMMENTS_SUCCESS,
      payload: commentCount,
    });
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.errors?.[0]?.message ||
      err.message ||
      "Failed to fetch comments";

    dispatch({
      type: FETCH_COMMENTS_FAIL,
      payload: errorMessage,
    });

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

    if (!createdComment || !createdComment.id) {
      throw new Error("Invalid response structure: 'id' is missing.");
    }

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: createdComment,
    });
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

  } catch (err: any) {
    const errorMessage = err.response?.data?.errors?.[0]?.message || err.message || "Failed to delete comment";
    dispatch({
      type: DELETE_COMMENT_FAIL,
      error: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const countCommentsByBlogId = (blogId: string) => async (dispatch: any) => {
  dispatch({
    type: COUNT_COMMENTS_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `query CountCommentsByBlog($blog: ID!) {
        countCommentsByBlog(blog: $blog)
      }`,
      variables: { blog: blogId },
    });

    const commentCount = response.data.data.countCommentsByBlog;

    dispatch({
      type: COUNT_COMMENTS_SUCCESS,
      payload: { blogId, count: commentCount },
    });

  } catch (err: any) {
    const errorMessage =
      err.response?.data?.errors?.[0]?.message || err.message || "Failed to count comments";

    dispatch({
      type: COUNT_COMMENTS_FAIL,
      error: errorMessage,
    });

    toast.error(errorMessage);
  }
};

export const fetchRepliesByComment = (commentId: string) => async (dispatch: any) => {
  dispatch({ type: FETCH_REPLIES_LOADING });

  try {
    const response = await axios.post("/", {
      query: `
        query GetRepliesByComment($comment: ID!) {
          getRepliesByComment(comment: $comment) {
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
      variables: { comment: commentId },
    });

    const replies = response.data.data.getRepliesByComment.map((reply: any) => ({
      id: reply.id,
      content: reply.content,
      user: reply.user,
    }));

    dispatch({
      type: FETCH_REPLIES_SUCCESS,
      payload: { commentId, replies },
    });
  } catch (err: any) {
    dispatch({
      type: FETCH_REPLIES_FAIL,
    });
  }
};


export const addReplyToComment = (content: string, commentId: string) => async (dispatch: any) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    toast.error("User not logged in.");
    return;
  }

  dispatch({ type: ADD_REPLY_LOADING });

  try {
    const response = await axios.post("/", {
      query: `mutation AddReply($content: String!, $comment: ID!, $user: ID!) {
        addCommentReply(content: $content, comment: $comment, user: $user) {
          id
          content
        }
      }`,
      variables: {
        content,
        comment: commentId,
        user: userId, 
      },
    });

    const newReply = response.data.data.addCommentReply;
    dispatch({
      type: ADD_REPLY_SUCCESS,
      payload: { commentId, reply: newReply },
    });

  } catch (err: any) {
    const errorMessage =
      err.response?.data?.errors?.[0]?.message || err.message || "Failed to add reply";

    dispatch({
      type: ADD_REPLY_FAIL,
      error: errorMessage,
    });
    toast.error(errorMessage);
  }
};