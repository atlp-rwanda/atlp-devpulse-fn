import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { getCommentsByBlogId, createCommentAction } from '../../redux/actions/commentActions'; 

interface BlogCommentProps {
  blogId: string; 
}

const BlogComment: React.FC<BlogCommentProps> = ({ blogId }) => {
  const dispatch = useDispatch();

  const { comment_data: comments, isCommentLoading } = useSelector(
    (state: RootState) => state.comments
  );

  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    if (blogId) {
      dispatch(getCommentsByBlogId(blogId));
    }
  }, [dispatch, blogId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      dispatch(createCommentAction(blogId, newComment));
      setNewComment(''); 
    }
  };

  return (
      <div className="space-y-4">
  <h2 className="text-xl font-semibold">{comments.length} Comments</h2>

  {isCommentLoading ? (
    <p>Loading comments...</p>
  ) : comments.length > 0 ? (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="dark:bg-slate-800 bg-slate-400 rounded-lg p-4 space-y-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
              <img
                src="/api/placeholder/40/40" 
                alt={comment.user.firstname}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{`${comment.user.firstname} ${comment.user.lastname}`}</h3>
              <p className="text-sm text-slate-400">{comment.created_at}</p>
            </div>
          </div>

          <p className="text-slate-300">{comment.content}</p>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <p className="text-left">No comments yet</p>
    </div>
  )}

  <div className="flex flex-row my-2 gap-4 w-full items-center justify-start">
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Write your comment here..."
      className="px-4 py-2 w-1/2 dark:bg-slate-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
    />
    <button
      onClick={handleAddComment}
      disabled={isCommentLoading}
      className="rounded py-1 px-4 bg-green text-white transition-colors dark:hover:bg-dark-frame-bg hover:text-green hover:border hover:border-green"
    >
      Add Comment
    </button>
  </div>
</div>

  );
};

export default BlogComment;
