import type { Comment } from "../../types/Comment";

interface CommentListItemProps {
  comment: Comment;
}

export default function CommentListItem({ comment }: CommentListItemProps) {
  return (
    <li className="mb-4 p-6 border border-gray-100 rounded-lg">
      <h3 className="text-lg">{comment.name}</h3>

      <p className="text-sm text-gray-500 italic mb-3">{comment.email}</p>

      <p className="text-gray-500 whitespace-pre-line">{comment.body}</p>
    </li>
  );
}
