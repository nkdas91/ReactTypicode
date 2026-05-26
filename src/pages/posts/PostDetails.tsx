import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import FavouriteButton from "../../components/FavouriteButton";
import Comments from "../../components/posts/Comments";
import PostDetailsSkeleton from "../../components/posts/skeletons/PostDetailsSkeleton";
import useDeletePost from "../../hooks/posts/useDeletePost";
import usePost from "../../hooks/posts/usePost";
import useUser from "../../hooks/users/useUser";

interface PropDetailsProp {
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

const PostDetails = ({ favourites, toggleFavourite }: PropDetailsProp) => {
  const { id } = useParams();

  const { data: post, error, isLoading, refetch } = usePost(Number(id));
  const { data: user } = useUser(post?.userId ?? null);
  const deletePost = useDeletePost(refetch);

  if (isLoading) {
    return <PostDetailsSkeleton />;
  }

  if (error) return <p role="alert">{error.message}</p>;

  if (!post) return <div className="text-center">Post not found!</div>;

  const isFavourite = favourites.includes(post.id);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    await deletePost(id);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mb-5 p-6 border border-gray-100 rounded-lg">
        <div className="flex justify-between aligh-center gap-4">
          <BackButton url="/posts" label="Back to Posts" />

          <FavouriteButton
            isFavourite={isFavourite}
            toggleFavourite={() => toggleFavourite(post.id)}
          />
        </div>

        <div className="mb-6 mt-4">
          <h1 className="text-3xl">{post?.title}</h1>
          <Link
            to={`/users/${post?.userId}`}
            className="text-sm text-gray-500 italic hover:text-indigo-700 hover:underline"
          >
            {user?.name}
          </Link>
        </div>

        <div className="mb-6">
          <p>{post?.body}</p>
        </div>

        <div className="flex justify-end gap-2">
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
