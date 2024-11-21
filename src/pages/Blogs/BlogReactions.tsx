import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers"; 
import {
  getReactionsByBlogId,
  addReactionAction,
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

  const handleAddReaction = (type: string) => {
    dispatch(addReactionAction(blogId, type));
    dispatch(getReactionsByBlogId(blogId)); 
    setShowReactionsMenu(false); 
  };

  const totalReactions = typedReactions
    ? Object.values(typedReactions).reduce((total, count) => total + count, 0)
    : 0;

  useEffect(() => {
    console.log("Reactions:", typedReactions);
    console.log("Total Reactions:", totalReactions); 

    Object.entries(typedReactions).forEach(([type, count]) => {
      console.log(`Reaction Type: ${type}, Count: ${count}`);
    });
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
              className="flex flex-col items-center hover:bg-gray-300 p-2 rounded-xl transition"
              onClick={() => handleAddReaction(type)}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm text-black">{label}</span>
            </button>
          ))}
        </div>
      )}

          <div className="mt-2 flex flex-wrap gap-2">
            {reactionTypes.map(({ type, emoji }) => (
            <div key={type} className="flex items-center gap-1">
              <span>{emoji}</span>
            </div>
          ))}
        </div>

      <div className="text-sm text-gray-400 mb-4">
        {isReactionLoading ? "Loading reactions..." : `${totalReactions} reactions`}
      </div>
    </div>
  );
};

export default BlogReaction;
