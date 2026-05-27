import type { Comment } from "../../types/Comment";

interface CommentListItemProps {
  comment: Comment;
}

export default function CommentListItem({ comment }: CommentListItemProps) {
  return (
    <li className="mb-4 p-6 border border-light rounded-lg">
      <h3 className="text-lg">{comment.name}</h3>

      <p className="text-sm text-muted italic mb-3">{comment.email}</p>

      <p className="whitespace-pre-line">{comment.body}</p>
    </li>
  );
}
