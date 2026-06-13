import type { Comment } from "../../types/Comment";

interface CommentListItemProps {
  comment: Comment;
}

export default function CommentListItem({ comment }: CommentListItemProps) {
  return (
    <li className="section">
      <h3 className="section-title">{comment.name}</h3>

      <p className="caption">{comment.email}</p>

      <p className="whitespace-pre-line mt-2">{comment.body}</p>
    </li>
  );
}
