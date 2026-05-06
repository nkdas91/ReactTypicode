import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import PostCard from "../../components/posts/PostCard";
import { usePosts } from "../../hooks/usePosts";
import useUsers from "../../hooks/useUsers";
import { deletePost } from "../../services/postService";

interface PropListProp {
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

const PostList = ({ favourites, toggleFavourite }: PropListProp) => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 5);
  const selectedUserId = userId ?? "";

  const { data: posts, total } = usePosts(selectedUserId, page, limit);
  const { data: users } = useUsers();

  const navigate = useNavigate();

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

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    navigate(`/posts?${params.toString()}`);
  };

  const setLimit = (limit: string) => {
    if (!limit) return;

    const params = new URLSearchParams(searchParams);
    params.set("limit", limit);

    navigate(`/posts?${params.toString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center gap-2 mb-4">
        <h1 className="text-3xl mb-4">Posts</h1>

        <div className="flex gap-4">
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

          <div className="flex items-center gap-2">
            <label>Show </label>
            <div className="grid grid-cols-1">
              <select
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="col-start-1 row-start-1 px-4 py-2 border border-gray-100 rounded-md appearance-none"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>

              <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4" />
            </div>
            <label> Records</label>
          </div>
        </div>
      </div>
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          favourites={favourites}
          toggleFavourite={() => toggleFavourite(post.id)}
          handleDelete={(e) => handleDelete(e, post.id)}
        />
      ))}

      <div className="flex justify-end items-center gap-2 mt-4">
        <Pagination
          totalRecords={total}
          currentPage={page}
          limit={limit}
          dataLength={posts.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PostList;
