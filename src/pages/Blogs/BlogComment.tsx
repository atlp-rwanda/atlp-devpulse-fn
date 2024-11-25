import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {
  getCommentsByBlogId,
  createCommentAction,
  fetchRepliesByComment,
  addReplyToComment,
} from "../../redux/actions/commentActions";

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
      console.log("Fetching comments for blogId:", blogId);
      dispatch(getCommentsByBlogId(blogId));
    }
  }, [dispatch, blogId]);

  useEffect(() => {
    if (activeCommentId) {
      console.log("Fetching replies for commentId:", activeCommentId);
      dispatch(fetchRepliesByComment(activeCommentId));
    }
  }, [dispatch, activeCommentId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log("Adding new comment:", newComment);
      dispatch(createCommentAction(blogId, newComment));
      setNewComment("");
    } else {
      console.warn("Comment content is empty. Cannot add comment.");
    }
  };

  const handleAddReply = (commentId: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to reply.");
      console.warn("User not logged in. Reply action aborted.");
      return;
    }

    if (replyContent.trim()) {
      console.log("Adding reply:", {
        replyContent,
        userId,
        commentId,
      });
      dispatch(addReplyToComment(replyContent, commentId));
      setReplyContent("");
    } else {
      console.warn("Reply content is empty. Cannot add reply.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        {isCommentLoading ? "Loading comments..." : `${comments.length} Comments`}
      </h2>

      <div className="flex flex-row my-2 gap-4 w-full items-center justify-start">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          className="px-4 py-2 w-1/2 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleAddComment}
          disabled={isCommentLoading}
          className="rounded py-1 px-4 bg-green text-white transition-colors dark:hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
        >
          Add Comment
        </button>
      </div>

      {isCommentLoading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <div
              key={comment.id} 
              className="dark:bg-slate-800 bg-slate-400 rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center gap-3 w-1/2">
                <div className="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                  <img
                    src="/api/placeholder/40/40"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{`${comment.user.firstname} ${comment.user.lastname}`}</h3>
                </div>
              </div>
              <p className="text-white">{comment.content}</p>

              <button
                onClick={() =>
                  setActiveCommentId(activeCommentId === comment.id ? null : comment.id) 
                }
                className="text-green text-sm"
              >
                {activeCommentId === comment.id ? "Hide Replies" : "View Replies"}
              </button>
              {activeCommentId === comment.id && (
                <div>
                  {repliesByCommentId[comment.id]?.length > 0 ? (
                    repliesByCommentId[comment.id].map((reply) => (
                      <div key={reply.id} className="ml-4 mt-2">
                        <p className="text-gray-200">{reply.content}</p>
                        <span className="text-xs text-gray-400">
                          - {reply.user.firstname || "Anonymous"} {reply.user.lastname || ""}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No replies yet</p>
                  )}
                  <div className="mt-2">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="bg-gray-800 px-2 py-1 w-1/2 border rounded-md mr-4"
                    />
                    <button
                      onClick={() => handleAddReply(comment.id)} 
                      className="rounded py-1 px-4 bg-green text-white transition-colors dark:hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-left">No comments yet</p>
        </div>
      )}

      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
};

export default BlogComment;
