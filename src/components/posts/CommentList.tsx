import type { Comment } from "../../types/Comment";
import CommentListItem from "./CommentListItem";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center p-4">
        This post doesn't have any comments.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
