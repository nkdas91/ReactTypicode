import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import PostFormSkeleton from "../../components/posts/skeletons/PostFormSkeleton";
import TextField from "../../components/TextField";
import usePost from "../../hooks/posts/usePost";
import useUpdatePostForm from "../../hooks/posts/useUpdatePostForm";

const PostEdit = () => {
  const { id } = useParams();
  const { data: post, error, isLoading } = usePost(Number(id));

  const { form, errors, loading, handleChange, handleSubmit } =
    useUpdatePostForm(Number(id), post);

  if (isLoading) {
    return <PostFormSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!post) {
    return <ErrorMessage message="Post not found" />;
  }

  return (
    <div className="section">
      <BackButton url="/posts" label="Back to Posts" />

      <form onSubmit={handleSubmit}>
        <div className="form-section mt-card">
          <TextField
            label="Title"
            type="text"
            name="title"
            value={form?.title}
            error={errors?.title}
            onChange={handleChange}
          />

          <TextField
            label="Body"
            name="body"
            as="textarea"
            rows={10}
            value={form?.body}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} variant="secondary">
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
