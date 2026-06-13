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
    handleBlur,
    handleSubmit,
  } = usePostComments(id);

  if (isLoading) {
    return <CommentsSkeleton />;
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-card my-card">
        <h2 className="section-title">Comments</h2>

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
        <div className="section mb-card">
          <CommentForm
            form={form}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      <CommentList comments={comments} />
    </div>
  );
};

export default Comments;
