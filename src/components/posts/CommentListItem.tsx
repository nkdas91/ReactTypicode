import type { Comment } from "../../types/Comment";

interface CommentListItemProps {
  comment: Comment;
}

export default function CommentListItem({ comment }: CommentListItemProps) {
  return (
    <li className="section">
      <h3 className="text-lg">{comment.name}</h3>

      <p className="text-sm text-muted italic mb-field">{comment.email}</p>

      <p className="whitespace-pre-line">{comment.body}</p>
    </li>
  );
}
