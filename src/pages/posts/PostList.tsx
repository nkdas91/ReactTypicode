import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";
import useUsers from "../../hooks/useUsers";
import { deletePost } from "../../services/postService";

const PostList = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const page = Number(searchParams.get("page") || 1);
  const selectedUserId = userId ?? "";

  const { data: posts, total } = usePosts(selectedUserId, page);
  const { data: users } = useUsers();

  const navigate = useNavigate();
  const limit = 5;

  const totalPages = Math.ceil(total / limit);

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

  const previousPage = () => {
    if (page === 1) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", (page - 1).toString());

    navigate(`/posts?${params.toString()}`);
  };

  const nextPage = () => {
    if (page === totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", (page + 1).toString());

    navigate(`/posts?${params.toString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center gap-2 mb-4">
        <h1 className="text-3xl mb-4">Posts</h1>

        <div className="flex items-center gap-2">
          <label>Posts by </label>
          <div className="grid grid-cols-1">
            <select
              value={selectedUserId}
              onChange={(e) => selectUser(e.target.value)}
              className="col-start-1 row-start-1 px-4 py-2 border border-gray-100 rounded-md appearance-none"
            >
              <option value="">All users</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4" />
          </div>
        </div>
      </div>
      {posts?.map((post) => (
        <div
          key={post?.id}
          className="pr-4 border border-gray-100 flex justify-between items-center gap-2"
        >
          <Link
            key={post?.id}
            to={`/posts/${post?.id}`}
            className="p-4 flex-grow hover:text-indigo-700 border-l-3 border-transparent hover:border-l-3 hover:border-indigo-700 hover:bg-linear-to-r hover:from-indigo-100 hover:to-white"
          >
            {post?.title}
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to={`/users/${post?.userId}`}
              className="text-sm text-gray-500 italic hover:text-indigo-700 hover:underline"
            >
              {post?.name}
            </Link>
            <Link
              to={`/posts/${post?.id}/edit`}
              className="bg-indigo-100 p-2 text-indigo-700 rounded-full cursor-pointer hover:bg-indigo-200"
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

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={previousPage}
          disabled={page === 1}
          className={`${page === 1 ? "cursor-not-allowed border-gray-400 text-gray-400" : "cursor-pointer border-indigo-700 text-indigo-700 hover:bg-indigo-100"} border px-4 py-2 rounded-full`}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className={`${page === totalPages ? "cursor-not-allowed border-gray-400 text-gray-400" : "cursor-pointer border-indigo-700 text-indigo-700 hover:bg-indigo-100"} border px-4 py-2 rounded-full`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
