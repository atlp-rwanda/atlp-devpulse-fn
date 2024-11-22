import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { getCommentLikes, addCommentLike } from '../../redux/actions/commentActions';

interface CommentLikeProps {
  commentId: string;
  blogId: string; 
}

const CommentLike: React.FC<CommentLikeProps> = ({ commentId, blogId }) => {
  const dispatch = useDispatch();
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const { likes, isLikeLoading } = useSelector((state: RootState) => state.comments); 
  const { currentUser } = useSelector((state: RootState) => state.user); 

  useEffect(() => {
    if (commentId) {
      dispatch(getCommentLikes(commentId)); 
    }
  }, [dispatch, commentId]);

  useEffect(() => {
    const userLiked = likes.some((like: any) => like.user.id === currentUser.id);
    setHasLiked(userLiked);
  }, [likes, currentUser]);

  const handleLikeClick = () => {
    if (hasLiked) {
      return;
    }
    dispatch(addCommentLike(commentId, currentUser.id)); 
    setHasLiked(true); 
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLikeClick}
        disabled={isLikeLoading}
        className={`${
          hasLiked ? 'text-blue-500' : 'text-gray-500'
        } flex items-center gap-1 px-2 py-1 rounded-md focus:outline-none`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18s8-4.4 8-9.8c0-3.6-3-6.5-6.5-6.5-2.4 0-3.9 2.5-4 3.4-.1-.9-1.6-3.4-4-3.4-3.5 0-6.5 2.9-6.5 6.5C2 13.6 10 18 10 18z"
            clipRule="evenodd"
          />
        </svg>
        {likes.length} Likes
      </button>
    </div>
  );
};

export default CommentLike;
