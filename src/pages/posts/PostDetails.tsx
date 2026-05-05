import { Link, useNavigate, useParams } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { deletePost } from "../../services/postService";
import BackButton from "../../components/BackButton";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post } = usePost(id ? parseInt(id) : null);
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent, id: number | undefined) => {
    e.preventDefault();

    const res = await deletePost(id ?? null);

    if (res.data) {
      navigate("/posts");
    } else {
      console.log(res.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-100 rounded-lg">
      <BackButton />

      <div className="mb-6 mt-4">
        <h1 className="text-3xl">{post?.title}</h1>
        <p className="text-gray-500">@{post?.userId}</p>
      </div>

      <div className="mb-6">
        <p>{post?.body}</p>
      </div>

      <div className="flex justify-end gap-2">
        <Link
          to={`/posts/${id}/edit`}
          className="bg-indigo-500 px-4 py-2 text-white rounded-full cursor-pointer hover:bg-indigo-600"
        >
          Edit
        </Link>
        <button
          onClick={(e) => handleDelete(e, post?.id)}
          className="bg-rose-700 px-4 py-2 text-white rounded-full cursor-pointer hover:bg-rose-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
