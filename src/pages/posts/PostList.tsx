import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Pagination from "../../components/Pagination";
import PostListItem from "../../components/posts/PostListItem";
import PostListSkeleton from "../../components/posts/skeletons/PostListSkeleton";
import SelectField from "../../components/SelectField";
import TableHeader from "../../components/TableHeader";
import { NO_LIMIT } from "../../constants/pagination";
import useDeletePost from "../../hooks/posts/useDeletePost";
import usePostFilters from "../../hooks/posts/usePostFilters";
import usePosts from "../../hooks/posts/usePosts";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import useUsers from "../../hooks/users/useUsers";
import useFavouritesStore from "../../stores/favouriteStore";

const PostList = () => {
  const favourites = useFavouritesStore((state) => state.favourites);
  const toggleFavourite = useFavouritesStore((state) => state.toggleFavourite);

  const {
    userId,
    page,
    limit,
    query,
    showFavourites,
    setUserId,
    setPage,
    setLimit,
    setQuery,
    setShowFavourites,
  } = usePostFilters();

  const [searchInput, setSearchInput] = useState(query);

  const debouncedSearch = useDebouncedValue(searchInput);

  const {
    data: postsResponse,
    error,
    isLoading,
    refetch,
  } = usePosts({ page, limit, userId, query, showFavourites, favourites });

  const { data: usersResponse } = useUsers({ limit: NO_LIMIT });
  const deletePost = useDeletePost(refetch);

  const posts = postsResponse?.data;
  const total = postsResponse?.total;

  const users = usersResponse?.data;

  // Debounce search updates to avoid triggering
  // navigation + API requests on every keystroke.
  useEffect(() => {
    setQuery(debouncedSearch);
  }, [debouncedSearch, setQuery]);

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
    <div>
      <div className="flex justify-between items-center flex-wrap gap-2 mb-5">
        <h1 className="text-3xl">Posts</h1>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1">
            <span>Posts by </span>
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
              ariaLabel="Select a user to display their posts"
            />
          </div>

          {favourites.length ? (
            <div className="flex items-center gap-2">
              <input
                id="show-favourites"
                type="checkbox"
                checked={showFavourites}
                onChange={(e) => setShowFavourites(e.target.checked)}
                className="cursor-pointer"
              />

              <label htmlFor="show-favourites" className="cursor-pointer">
                Show only favourites
              </label>
            </div>
          ) : null}
        </div>
      </div>

      <TableHeader
        searchQuery={searchInput}
        onSearch={handleSearch}
        limit={limit}
        onLimitChange={setLimit}
      />

      {(!posts || posts.length === 0) && !isLoading ? (
        <ErrorMessage
          message={
            query ? `No posts found matching "${query}"` : "No posts available"
          }
        />
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
