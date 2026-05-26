import { useMemo, useState } from "react";
import Pagination from "../../components/Pagination";
import PostListItem from "../../components/posts/PostListItem";
import PostListSkeleton from "../../components/posts/skeletons/PostListSkeleton";
import SelectField from "../../components/SelectField";
import TextField from "../../components/TextField";
import { LIMITS } from "../../constants/pagination";
import useDeletePost from "../../hooks/posts/useDeletePost";
import usePostFilters from "../../hooks/posts/usePostFilters";
import usePosts from "../../hooks/posts/usePosts";
import useUsers from "../../hooks/users/useUsers";

interface PropListProp {
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

const PostList = ({ favourites, toggleFavourite }: PropListProp) => {
  const [query, setQuery] = useState("");

  const { userId, page, limit, setUserId, setPage, setLimit } =
    usePostFilters();

  const {
    data: postsResponse,
    error,
    isLoading,
    refetch,
  } = usePosts({ page, limit, userId });

  const { data: usersResponse } = useUsers();
  const deletePost = useDeletePost(refetch);

  const posts = postsResponse?.data;
  const total = postsResponse?.total;

  const users = usersResponse?.data;

  const filteredPosts = useMemo(() => {
    return posts?.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [posts, query]);

  if (isLoading) {
    return <PostListSkeleton />;
  }

  if (error) {
    return <p role="alert">{error.message}</p>;
  }

  const handleSearch = (_name: string, value: string) => {
    setQuery(value);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl mb-4">Posts</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end md:items-center gap-3">
        <div className="order-2 sm:order-1">
          <TextField
            placeholder="Search"
            name="search"
            type="search"
            value={query}
            onChange={handleSearch}
          />
        </div>

        <div className="order-1 sm:order-2 flex flex-col md:flex-row items-end md:items-center self-end gap-3 mb-2">
          <div className="flex items-center gap-1">
            <label>Posts by</label>
            <SelectField
              value={userId}
              onChange={setUserId}
              options={[
                {
                  label: "All users",
                  value: "",
                },

                ...(users?.map((user) => ({
                  label: user.name,
                  value: user.id,
                })) ?? []),
              ]}
            />
          </div>

          <div className="flex items-center gap-1">
            <label>Show</label>
            <SelectField value={limit} onChange={setLimit} options={LIMITS} />
            <label> Records</label>
          </div>
        </div>
      </div>

      {!filteredPosts || filteredPosts.length === 0 ? (
        <div className="text-center p-2">No posts to display!</div>
      ) : null}

      <ul>
        {filteredPosts?.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            favourites={favourites}
            toggleFavourite={() => toggleFavourite(post.id)}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      {filteredPosts?.length ? (
        <div className="flex justify-end items-center gap-2 mt-4">
          <Pagination
            totalRecords={total ?? 0}
            currentPage={page}
            limit={limit}
            dataLength={posts?.length ?? 0}
            onPageChange={setPage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PostList;
