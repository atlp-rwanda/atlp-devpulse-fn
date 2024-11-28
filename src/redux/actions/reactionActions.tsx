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
          getAllReactionsCount(blog: $blog)
        }
      `,
      variables: { blog: blogId },
    });

    const reactionsData = response?.data?.data?.getAllReactionsCount;
    dispatch(creator(fetchReactions.FETCH_REACTIONS_SUCCESS, reactionsData));
  } catch (err: any) {}
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
    toast.success("Reaction added successfully!");
  } catch (err: any) {}
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
  } catch (err: any) {}
};