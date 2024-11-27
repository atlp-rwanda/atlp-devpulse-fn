import {
  fetchReactions,
  addReaction,
  removeReaction,
} from "../actiontypes/reactionTypes";


interface ReactionState {
  isReactionLoading: boolean; 
  reactions: Record<string, number>; 
  errors: null | string; 
}

const initialState: ReactionState = {
  isReactionLoading: false, 
  reactions: {}, 
  errors: null, 
};

export default (
  state = initialState,
  { type, payload }: { type: string; payload: any }
): ReactionState => {
  switch (type) {
    case fetchReactions.FETCH_REACTIONS_LOADING:
    case addReaction.ADD_REACTION_LOADING:
    case removeReaction.REMOVE_REACTION_LOADING:
      return {
        ...state,
        isReactionLoading: true,
      };

    case fetchReactions.FETCH_REACTIONS_SUCCESS:
  console.log("Payload received in FETCH_REACTIONS_SUCCESS:", payload); 

  const transformedReactions =
    typeof payload === "number"
      ? { TOTAL: payload } 
      : Array.isArray(payload)
      ? payload.reduce((acc: Record<string, number>, reaction: { type: string }) => {
          if (reaction.type) {
            acc[reaction.type] = (acc[reaction.type] || 0) + 1;
          }
          return acc;
        }, {})
      : {};

  console.log("Transformed reactions:", transformedReactions);
  return {
    ...state,
    isReactionLoading: false,
    reactions: transformedReactions,
  };

    case addReaction.ADD_REACTION_SUCCESS:
      console.log("Payload received in ADD_REACTION_SUCCESS:", payload);
      const updatedReactions = (payload || []).reduce(
        (acc: Record<string, number>, reaction: { type: string; count: number }) => {
          acc[reaction.type] = reaction.count;
          return acc;
        },
        {}
      );
      return {
        ...state,
        isReactionLoading: false,
        reactions: updatedReactions, 
      };

    case removeReaction.REMOVE_REACTION_SUCCESS:
      const reactionsAfterRemoval = (payload || []).reduce(
        (acc: Record<string, number>, reaction: { type: string; count: number }) => {
          acc[reaction.type] = reaction.count;
          return acc;
        },
        {}
      );
      return {
        ...state,
        isReactionLoading: false,
        reactions: reactionsAfterRemoval, 
      };

    case fetchReactions.FETCH_REACTIONS_FAIL:
    case addReaction.ADD_REACTION_FAIL:
    case removeReaction.REMOVE_REACTION_FAIL:
      console.error("Reaction error:", payload); 
      return {
        ...state,
        isReactionLoading: false,
        errors: payload,
      };

    default:
      return state;
  }
};