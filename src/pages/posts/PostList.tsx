import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import usePosts from "../../hooks/usePosts";
import { deletePost } from "../../services/postService";
import useUsers from "../../hooks/useUsers";

const PostList = () => {
  const { data: posts } = usePosts();
  const { data: users } = useUsers();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const selectedUserId = userId ?? "";

  const navigate = useNavigate();

  const filteredPosts = userId
    ? posts?.filter((p) => p.userId === Number(userId))
    : posts;

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    const res = await deletePost(id);

    if (res.data) {
      navigate("/posts");
    } else {
      console.log(res.error);
    }
  };

  const selectUser = (id: string) => {
    if (!id) {
      navigate(`/posts`);

      return;
    }

    navigate(`/posts?userId=${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center gap-2 mb-4">
        <h1 className="text-3xl mb-4">Posts</h1>

        <div>
          <label>Filter by User </label>
          <select
            value={selectedUserId}
            onChange={(e) => selectUser(e.target.value)}
            className="px-4 py-2 border border-gray-100 rounded-md"
          >
            <option value=""></option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {filteredPosts?.map((post) => (
        <div
          key={post?.id}
          className="pr-4 border border-gray-100 flex justify-between items-center hover:bg-gray-100"
        >
          <Link
            key={post?.id}
            to={`/posts/${post?.id}`}
            className="p-4 flex-grow"
          >
            {post?.title}
          </Link>
          <div className="flex gap-2">
            <Link
              to={`/posts/${post?.id}/edit`}
              className="bg-indigo-100 p-2 text-indigo-500 rounded-full cursor-pointer hover:bg-indigo-200"
            >
              <PencilIcon className="size-6" />
            </Link>
            <button
              onClick={(e) => handleDelete(e, post?.id)}
              className="bg-rose-100 p-2 text-rose-700 rounded-full cursor-pointer hover:bg-rose-200"
            >
              <TrashIcon className="size-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
