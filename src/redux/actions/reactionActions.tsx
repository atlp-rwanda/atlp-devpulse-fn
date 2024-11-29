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
<<<<<<< HEAD
=======
    toast.error("Failed to fetch reactions.");
>>>>>>> 3c47b86d6acf665a349558f7c7db9de56fe795ca
  }
};

export const addReactionAction = (blogId: string, type: string) => async (dispatch: any) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
<<<<<<< HEAD
=======
    toast.error("User not logged in.");
>>>>>>> 3c47b86d6acf665a349558f7c7db9de56fe795ca
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
<<<<<<< HEAD
  } catch (err: any) {
    dispatch(creator(addReaction.ADD_REACTION_FAIL, err.message));
=======
    toast.success("Reaction added successfully!");
  } catch (err: any) {
    dispatch(creator(addReaction.ADD_REACTION_FAIL, err.message));
    toast.error("Failed to add reaction.");
>>>>>>> 3c47b86d6acf665a349558f7c7db9de56fe795ca
  }
};

export const removeReactionAction = (blogId: string) => async (dispatch: any) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
<<<<<<< HEAD
=======
    toast.error("User not logged in.");
>>>>>>> 3c47b86d6acf665a349558f7c7db9de56fe795ca
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
<<<<<<< HEAD
  } catch (err: any) {
    dispatch(creator(removeReaction.REMOVE_REACTION_FAIL, err.message));
=======
    toast.success("Reaction removed successfully!");
  } catch (err: any) {
    dispatch(creator(removeReaction.REMOVE_REACTION_FAIL, err.message));
    toast.error("Failed to remove reaction.");
>>>>>>> 3c47b86d6acf665a349558f7c7db9de56fe795ca
  }
};
