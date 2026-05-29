import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Pagination from "../../components/Pagination";
import PostListItem from "../../components/posts/PostListItem";
import PostListSkeleton from "../../components/posts/skeletons/PostListSkeleton";
import SelectField from "../../components/SelectField";
import TextField from "../../components/TextField";
import { LIMITS } from "../../constants/pagination";
import useDeletePost from "../../hooks/posts/useDeletePost";
import usePostFilters from "../../hooks/posts/usePostFilters";
import usePosts from "../../hooks/posts/usePosts";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import useUsers from "../../hooks/users/useUsers";

interface PropListProp {
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

const PostList = ({ favourites, toggleFavourite }: PropListProp) => {
  const { userId, page, limit, query, setUserId, setPage, setLimit, setQuery } =
    usePostFilters();

  const [searchInput, setSearchInput] = useState(query);

  const debouncedSearch = useDebouncedValue(searchInput);

  const {
    data: postsResponse,
    error,
    isLoading,
    refetch,
  } = usePosts({ page, limit, userId, query });

  const { data: usersResponse } = useUsers();
  const deletePost = useDeletePost(refetch);

  const posts = postsResponse?.data;
  const total = postsResponse?.total;

  const users = usersResponse?.data;

  // Debounce search updates to avoid triggering
  // navigation + API requests on every keystroke
  useEffect(() => {
    setQuery(debouncedSearch);
  }, [debouncedSearch]);

  if (isLoading) {
    return <PostListSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const handleSearch = (_name: string, value: string) => {
    setSearchInput(value);
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
            value={searchInput}
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

      {!posts || posts.length === 0 ? (
        <ErrorMessage message="No posts to display!" />
      ) : null}

      <ul>
        {posts?.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            favourites={favourites}
            toggleFavourite={() => toggleFavourite(post.id)}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      {posts?.length ? (
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
