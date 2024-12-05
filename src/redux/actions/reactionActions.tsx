import axios from "./axiosconfig";
import { toast } from "react-toastify";
import creator from "./creator";
import {
  fetchReactions,
  addReaction,
  removeReaction,
} from "./../actiontypes/reactionTypes";

export const getReactionsByBlogId = (blogId: string) => async (dispatch: any) => {
  dispatch({
    type: fetchReactions.FETCH_REACTIONS_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `
        query GetReactionsByBlog($blog: ID!) {
          getReactionsByBlog(blog: $blog) {
            id
            type
          }
        }
      `,
      variables: { blog: blogId },
    });

    const reactions = response?.data?.data?.getReactionsByBlog;
    const reactionCounts = reactions.reduce((acc: any, reaction: any) => {
      acc[reaction.type] = (acc[reaction.type] || 0) + 1;
      return acc;
    }, {});

    dispatch(creator(fetchReactions.FETCH_REACTIONS_SUCCESS, reactionCounts));
  } catch (err: any) {
    dispatch(creator(fetchReactions.FETCH_REACTIONS_FAILURE, err.message));
  }
};

export const addReactionAction = (blogId: string, type: string) => async (dispatch: any) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    toast.error("User not logged in.");
    return;
  }

  dispatch({
    type: addReaction.ADD_REACTION_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `
        mutation AddReaction($user: ID!, $blog: ID!, $type: ReactionType!) {
          addReaction(reactionFields: { user: $user, blog: $blog, type: $type }) {
            id
            type
            user {
              id
              firstname
            }
            blog {
              id
              title
            }
          }
        }
      `,
      variables: { user: userId, blog: blogId, type },
    });

    const reaction = response?.data?.data?.addReaction;
    dispatch(creator(addReaction.ADD_REACTION_SUCCESS, reaction));

  } catch (err: any) {
    dispatch(creator(addReaction.ADD_REACTION_FAIL, err.message));
    toast.error("Failed to add reaction.");
  }
};

export const removeReactionAction = (blogId: string) => async (dispatch: any) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    toast.error("User not logged in.");
    return;
  }

  dispatch({
    type: removeReaction.REMOVE_REACTION_LOADING,
  });

  try {
    const response = await axios.post("/", {
      query: `
        mutation RemoveReaction($user: ID!, $blog: ID!) {
          removeReaction(user: $user, blog: $blog)
        }
      `,
      variables: { user: userId, blog: blogId },
    });

    dispatch(creator(removeReaction.REMOVE_REACTION_SUCCESS, { userId, blogId }));
  } catch (err: any) {
    dispatch(creator(removeReaction.REMOVE_REACTION_FAIL, err.message));
  }
};
