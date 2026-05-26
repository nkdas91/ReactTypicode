import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import usePostComments from "../../hooks/posts/usePostComments";
import CommentsSkeleton from "./skeletons/CommentsSkeleton";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

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
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center gap-4 mb-2">
        <h2 className="text-xl mb-2">Comments</h2>

        <button
          type="button"
          onClick={toggleFormVisibility}
          aria-label={formVisible ? "Hide comment form" : "Show comment form"}
          className="cursor-pointer"
        >
          {formVisible ? (
            <MinusCircleIcon className="size-10 text-indigo-700" />
          ) : (
            <PlusCircleIcon className="size-10 text-indigo-700" />
          )}
        </button>
      </div>

      {formVisible && (
        <div className="max-w-5xl mx-auto mb-4 p-6 border border-gray-100 rounded-lg">
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
