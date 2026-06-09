import ConfirmModal from "../../components/ConfirmModal";
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
import useListPageController from "../../hooks/useListPageController";
import useUsers from "../../hooks/users/useUsers";
import useFavouritesStore from "../../stores/favouriteStore";

const PostList = () => {
  const favourites = useFavouritesStore((s) => s.favourites);
  const toggleFavourite = useFavouritesStore((s) => s.toggleFavourite);

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

  const { searchInput, handleSearch } = useListPageController({
    query,
    setQuery,
  });

  const {
    data: postsResponse,
    error,
    isLoading,
    refetch,
  } = usePosts({
    page,
    limit,
    userId,
    query,
    showFavourites,
    favourites,
  });

  const { data: usersResponse } = useUsers({ limit: NO_LIMIT });

  const { isConfirmOpen, requestDelete, cancelDelete, confirmDelete } =
    useDeletePost({ onSuccess: refetch });

  const posts = postsResponse?.data;
  const total = postsResponse?.total;
  const users = usersResponse?.data;

  if (isLoading) return <PostListSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-field mb-card">
        <h1 className="text-3xl">Posts</h1>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1">
            <span>Posts by </span>

            <SelectField
              value={userId}
              onChange={setUserId}
              options={[
                { label: "All users", value: "" },
                ...(users?.map((u) => ({
                  label: u.name,
                  value: u.id,
                })) ?? []),
              ]}
              ariaLabel="Select a user to display posts"
            />
          </div>

          {favourites.length ? (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showFavourites}
                onChange={(e) => setShowFavourites(e.target.checked)}
              />
              <label>Show only favourites</label>
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

      {!posts?.length && (
        <ErrorMessage
          message={
            query ? `No posts found matching "${query}"` : "No posts available"
          }
        />
      )}

      <ul>
        {posts?.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            favourites={favourites}
            toggleFavourite={() => toggleFavourite(post.id)}
            onDelete={() => requestDelete(post.id)}
          />
        ))}
      </ul>

      {posts?.length ? (
        <div className="flex justify-end mt-card">
          <Pagination
            totalRecords={total ?? 0}
            currentPage={page}
            limit={limit}
            dataLength={posts.length}
            onPageChange={setPage}
          />
        </div>
      ) : null}

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Delete Post"
        message="Are you sure you want to delete this post?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onClose={cancelDelete}
      />
    </div>
  );
};

export default PostList;
