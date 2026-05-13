import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import FavouriteButton from "../../components/FavouriteButton";
import Comments from "../../components/posts/Comments";
import { useNotification } from "../../context/NotificationContext";
import usePost from "../../hooks/usePost";
import useUser from "../../hooks/useUser";
import { deletePost } from "../../services/postService";

interface PropDetailsProp {
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

const PostDetails = ({ favourites, toggleFavourite }: PropDetailsProp) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const { data: post } = usePost(id ? parseInt(id) : null);
  const { data: user } = useUser(post?.userId ? post.userId : null);

  if (!post) return <label>Post not found!</label>;

  const isFavourite = favourites.includes(post.id);

  const handleDelete = async (e: React.MouseEvent, id: number | undefined) => {
    e.preventDefault();
    setLoading(true);
    const res = await deletePost(id ?? null);

    if (res.data) {
      setLoading(false);
      showNotification("Post deleted");
      navigate("/posts");
    } else {
      setLoading(false);
      showNotification("Error deleting post");
    }
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
          <Link
            to={`/posts/${id}/edit`}
            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-200"
          >
            Edit
          </Link>

          <button
            onClick={(e) => handleDelete(e, post?.id)}
            disabled={loading}
            className={`px-4 py-2 rounded-full transition cursor-pointer
              ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-rose-100 text-rose-700 hover:bg-rose-200"
              }
            `}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <Comments id={Number(id)} />
    </>
  );
};

export default PostDetails;
