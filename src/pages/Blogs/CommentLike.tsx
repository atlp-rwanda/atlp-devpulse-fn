import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { getCommentLikes } from "../../redux/actions/commentActions";

interface CommentLikeProps {
  commentId: string;
  currentUserId: string; 
}

const CommentLike: React.FC<CommentLikeProps> = ({ commentId, currentUserId }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(0);

  const { isLikeLoading } = useSelector((state: RootState) => ({
    isLikeLoading: state.comments.isCommentLoading,
  }));

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await dispatch(getCommentLikes(commentId));
        if (response?.data?.getCommentLikes?.count >= 0) {
          setLikesCount(response.data.getCommentLikes.count);
          setIsLiked(response.data.getCommentLikes.userIds?.includes(currentUserId) || false);
        }
      } catch (error) {
        console.error("Error fetching comment likes:", error);
      }
    };

    fetchLikes();
  }, [dispatch, commentId, currentUserId]);

  const handleToggleLike = () => {
    setIsLiked((prevIsLiked) => {
      const newIsLiked = !prevIsLiked;
      setLikesCount((prevCount) => (newIsLiked ? prevCount + 1 : prevCount - 1));
      return newIsLiked;
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={isLikeLoading}
        onClick={handleToggleLike}
        className={`flex items-center gap-1 px-2 py-1 rounded-md focus:outline-none ${
          isLiked ? "text-blue-500 bg-blue-100" : "text-gray-500"
        }`}
      >
        <span className="text-lg">{isLiked ? "👍" : "👍"}</span>
        {likesCount} {likesCount === 1 ? "Like" : "Likes"}
      </button>
    </div>
  );
};

export default CommentLike;
