import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import usePostComments from "../../hooks/posts/usePostComments";
import Button from "../Button";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import CommentsSkeleton from "./skeletons/CommentsSkeleton";

interface CommentsProps {
  id: number;
}

const Comments = ({ id }: CommentsProps) => {
  const {
    comments,
    isLoading,
    formVisible,
    toggleFormVisibility,
    form,
    errors,
    handleChange,
    handleSubmit,
  } = usePostComments(id);

  if (isLoading) {
    return <CommentsSkeleton />;
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-2">
        <h2 className="text-xl mb-2">Comments</h2>

        <Button
          type="button"
          onClick={toggleFormVisibility}
          aria-label={formVisible ? "Hide comment form" : "Show comment form"}
          variant="primary"
          size="icon"
        >
          {formVisible ? (
            <MinusIcon className="size-6" />
          ) : (
            <PlusIcon className="size-6" />
          )}
        </Button>
      </div>

      {formVisible && (
        <div className="mb-4 p-6 border border-light rounded-card">
          <CommentForm
            form={form}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      <CommentList comments={comments} />
    </div>
  );
};

export default Comments;
