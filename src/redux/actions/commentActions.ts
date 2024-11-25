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
  ADD_COMMENT_LIKE_LOADING,
  ADD_COMMENT_LIKE_SUCCESS,
  ADD_COMMENT_LIKE_FAIL,
  GET_COMMENT_LIKES_LOADING,
  GET_COMMENT_LIKES_SUCCESS,
  GET_COMMENT_LIKES_FAIL,
  FETCH_REPLIES_LOADING,
  FETCH_REPLIES_SUCCESS,
  FETCH_REPLIES_FAIL,
  ADD_REPLY_LOADING,
  ADD_REPLY_SUCCESS,
  ADD_REPLY_FAIL,
} from "../index";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", 
  cache: new InMemoryCache(),
});

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

    const comments = response.data.data.getCommentsByBlog;
    console.log("comments", comments);

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

    console.log("Comment Count:", commentCount);
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

export const addCommentLike = (userId: string, commentId: string) => async (dispatch: any) => {
  dispatch({ type: ADD_COMMENT_LIKE_LOADING });

  try {
    const mutation = gql`
      mutation AddCommentLike($user: ID!, $comment: ID!) {
        addCommentLike(user: $user, comment: $comment)
      }
    `;
    const { data } = await client.mutate({
      mutation,
      variables: { user: userId, comment: commentId },
    });

    dispatch({
      type: ADD_COMMENT_LIKE_SUCCESS,
      payload: { commentId, likesCount: data.addCommentLike },
    });
  } catch (error:any) {
    console.error('Error adding comment like:', error);
    dispatch({ type: ADD_COMMENT_LIKE_FAIL, payload: error.message });
  }
};

export const getCommentLikes = (commentId: string) => async (dispatch: any) => {
  try {
    dispatch({ type: "GET_COMMENT_LIKES_LOADING" });

    const { data } = await client.query({
      query: gql`
        query GetCommentLikes($comment: ID!) {
          getCommentLikes(comment: $comment) {
            count
          }
        }
      `,
      variables: { comment: commentId },
    });

    dispatch({
      type: "GET_COMMENT_LIKES_SUCCESS",
      payload: data.getCommentLikes.count,
    });
  } catch (error: any) {
    dispatch({
      type: "GET_COMMENT_LIKES_FAIL",
      payload: error.message,
    });
  }
};

export const fetchRepliesByComment = (commentId: string) => async (dispatch: any) => {
  dispatch({ type: FETCH_REPLIES_LOADING });

  try {
    const { data } = await client.query({
      query: gql`
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

    // Restructure the response to match the required shape
    const replies = data.getRepliesByComment.map((reply: any) => ({
      id: reply.id,
      content: reply.content,
      user: reply.user, // Extract user details
    }));

    dispatch({
      type: FETCH_REPLIES_SUCCESS,
      payload: { commentId, replies },
    });
  } catch (err: any) {
    console.error("Error fetching replies:", err.message);
    dispatch({
      type: FETCH_REPLIES_FAIL,
      payload: err.message,
    });
    toast.error("Failed to fetch replies.");
  }
};

// Action to add a reply to a comment
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
          user {
            id
            firstname
            lastname
          }
        }
      }`,
      variables: {
        content,
        comment: commentId,
        user: userId, // Pass the userId here
      },
    });

    const newReply = response.data.data.addCommentReply;
    dispatch({
      type: ADD_REPLY_SUCCESS,
      payload: { commentId, reply: newReply },
    });
    toast.success("Reply added successfully!");
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
