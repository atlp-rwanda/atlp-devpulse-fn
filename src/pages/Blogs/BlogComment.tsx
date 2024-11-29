import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  getCommentsByBlogId,
  createCommentAction,
  fetchRepliesByComment,
  addReplyToComment,
} from "../../redux/actions/commentActions";
const profile: string = require("../../assets/avatar.png").default;

interface BlogCommentProps {
  blogId: string;
}

const BlogComment: React.FC<BlogCommentProps> = ({ blogId }) => {
  const dispatch = useDispatch();

  const {
    comment_data: comments,
    isCommentLoading,
    errors,
    repliesByCommentId,
  } = useSelector((state: RootState) => state.comments);

  const [newComment, setNewComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    if (blogId) {
      dispatch(getCommentsByBlogId(blogId));
    }
  }, [dispatch, blogId]);

  useEffect(() => {
    if (activeCommentId) {
      dispatch(fetchRepliesByComment(activeCommentId));
    }
  }, [dispatch, activeCommentId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(createCommentAction(blogId, newComment));
      setNewComment("");
    }
  };

  const handleAddReply = (commentId: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to reply.");
      return;
    }

    if (replyContent.trim()) {
      dispatch(addReplyToComment(replyContent, commentId));
      setReplyContent("");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg space-y-6">
      <h2 className="text-2xl font-bold">{`${comments.length} Comments`}</h2>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment here..."
          className="flex-grow p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleAddComment}
          disabled={isCommentLoading}
          className="rounded py-1 px-4 bg-green text-white transition-colors dark:hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
        >
          Add Comment
        </button>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-800 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full bg-gray-700"
                />
                <div>
                  <h3 className="font-semibold">{`${comment.user.firstname} ${comment.user.lastname}`}</h3>
                  <p className="text-sm text-gray-400">
                  {new Date(comment.createdAt).toLocaleString("en-US", {
                    weekday: 'long',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true, 
                    }).replace(/\//g, "-")}
                  </p>
                </div>
              </div>

              <p className="text-gray-300">{comment.content}</p>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No comments yet.</p>
      )}

      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};

export default BlogComment;