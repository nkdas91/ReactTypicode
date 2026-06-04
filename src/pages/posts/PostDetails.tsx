import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import FavouriteButton from "../../components/FavouriteButton";
import Comments from "../../components/posts/Comments";
import PostDetailsSkeleton from "../../components/posts/skeletons/PostDetailsSkeleton";
import useDeletePost from "../../hooks/posts/useDeletePost";
import usePost from "../../hooks/posts/usePost";
import useUser from "../../hooks/users/useUser";
import useFavouritesStore from "../../stores/favouriteStore";

const PostDetails = () => {
  const { id } = useParams();

  const { data: post, error, isLoading, refetch } = usePost(Number(id));
  const { data: user } = useUser(post?.userId ?? null);
  const deletePost = useDeletePost(refetch);

  const isFavourite = useFavouritesStore((state) =>
    state.isFavourite(Number(id)),
  );

  const toggleFavourite = useFavouritesStore((state) => state.toggleFavourite);

  if (isLoading) {
    return <PostDetailsSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!post) {
    return <ErrorMessage message="Post not found" />;
  }

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    await deletePost(id);
  };

  return (
    <>
      <div className="section">
        <div className="flex justify-between items-center gap-card">
          <BackButton url="/posts" label="Back to Posts" />

          <FavouriteButton
            isFavourite={isFavourite}
            toggleFavourite={() => toggleFavourite(post.id)}
          />
        </div>

        <div className="my-card">
          <h1 className="text-3xl">{post?.title}</h1>
          <Link
            to={`/users/${post?.userId}`}
            className="text-sm text-muted italic hover:text-primary hover:underline"
          >
            {user?.name}
          </Link>
        </div>

        <div>
          <p>{post?.body}</p>
        </div>

        <div className="flex justify-end gap-field">
          <Button to={`/posts/${id}/edit`} variant="secondary">
            Edit
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={(e) => handleDelete(e, Number(id))}
          >
            Delete
          </Button>
        </div>
      </div>

      <Comments id={Number(id)} />
    </>
  );
};

export default PostDetails;
