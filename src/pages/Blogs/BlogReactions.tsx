import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  getReactionsByBlogId,
  addReactionAction,
  removeReactionAction,
} from "../../redux/actions/reactionActions";

interface Reaction {
  [type: string]: number;
}

interface BlogReactionProps {
  blogId: string;
}

const reactionTypes = [
  { type: "LIKE", label: "Like", emoji: "👍" },
  { type: "CELEBRATE", label: "Celebrate", emoji: "🎉" },
  { type: "LOVE", label: "Love", emoji: "❤️" },
  { type: "SUPPORT", label: "Support", emoji: "👏" },
  { type: "FUNNY", label: "Funny", emoji: "😂" },
];

const BlogReaction: React.FC<BlogReactionProps> = ({ blogId }) => {
  const dispatch = useDispatch();
  const [currentReaction, setCurrentReaction] = useState<string | null>(null); 
  const [showReactionsMenu, setShowReactionsMenu] = useState(false);

  const { reactions, isReactionLoading } = useSelector(
    (state: RootState) => state.reactions
  );

  const typedReactions: Reaction = reactions;

  useEffect(() => {
    if (blogId) {
      dispatch(getReactionsByBlogId(blogId));
    }
  }, [dispatch, blogId]);

  const handleAddReaction = async (type: string) => {
    if (type === currentReaction) {
      await dispatch(removeReactionAction(blogId));
      setCurrentReaction(null);
    } else {
      if (currentReaction) {
        await dispatch(removeReactionAction(blogId));
      }
      await dispatch(addReactionAction(blogId, type));
      setCurrentReaction(type);
    }
    dispatch(getReactionsByBlogId(blogId));
    setShowReactionsMenu(false);
  };

  const totalReactions = typedReactions
    ? Object.values(typedReactions).reduce((total, count) => total + count, 0)
    : 0;

  useEffect(() => {
  }, [typedReactions, totalReactions]);

  return (
    <div className="relative">
      <button
        className="rounded-full text-white px-4 py-2 transition"
        onMouseEnter={() => setShowReactionsMenu(true)}
        onMouseLeave={() => setShowReactionsMenu(false)}
      >
        <span role="img" aria-label="like" className="text-xl flex items-center gap-2">
          👍 <span>Like</span>
        </span>
      </button>

      {showReactionsMenu && (
        <div
          className="absolute top-[-50px] left-0 flex gap-1 bg-white shadow-lg rounded-xl p-2 z-10"
          onMouseEnter={() => setShowReactionsMenu(true)}
          onMouseLeave={() => setShowReactionsMenu(false)}
        >
          {reactionTypes.map(({ type, label, emoji }) => (
            <button
              key={type}
              className={`flex flex-col items-center hover:bg-gray-300 p-2 rounded-xl transition ${
                type === currentReaction ? "bg-blue-200" : ""
              }`}
              onClick={() => handleAddReaction(type)}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm text-black">{label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-400 mb-4">
        {`${totalReactions} reactions`}
      </div>
    </div>
  );
};

export default BlogReaction;