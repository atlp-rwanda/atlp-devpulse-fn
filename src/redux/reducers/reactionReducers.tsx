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
      return {
        ...state,
        isReactionLoading: true,
        errors: null, 
      };

    case fetchReactions.FETCH_REACTIONS_SUCCESS:
      return {
        ...state,
        isReactionLoading: false,
        reactions: payload, 
        errors: null,
      };

    case fetchReactions.FETCH_REACTIONS_FAILURE:
      return {
        ...state,
        isReactionLoading: false,
        errors: payload, 
      };

    case addReaction.ADD_REACTION_LOADING:
    case removeReaction.REMOVE_REACTION_LOADING:
      return {
        ...state,
        isReactionLoading: true,
        errors: null, 
      };

    case addReaction.ADD_REACTION_SUCCESS: {
      const updatedReactions = { ...state.reactions };
      const { type } = payload;

      if (type) {
        updatedReactions[type] = (updatedReactions[type] || 0) + 1; 
      }

      return {
        ...state,
        isReactionLoading: false,
        reactions: updatedReactions,
        errors: null,
      };
    }

    case removeReaction.REMOVE_REACTION_SUCCESS: {
      const updatedReactions = { ...state.reactions };
      const { type } = payload;

      if (type && updatedReactions[type] > 0) {
        updatedReactions[type] -= 1; 
      }

      return {
        ...state,
        isReactionLoading: false,
        reactions: updatedReactions,
        errors: null,
      };
    }

    case addReaction.ADD_REACTION_FAIL:
    case removeReaction.REMOVE_REACTION_FAIL:
      return {
        ...state,
        isReactionLoading: false,
        errors: payload, 
      };

    default:
      return state;
  }
};
