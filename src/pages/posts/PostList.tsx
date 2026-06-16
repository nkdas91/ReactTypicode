import { useCallback } from "react";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Pagination from "../../components/pagination/Pagination";
import PostListItem from "../../components/posts/PostListItem";
import PostListSkeleton from "../../components/posts/skeletons/PostListSkeleton";
import SelectField from "../../components/selectField/SelectField";
import TableHeader from "../../components/tableHeader/TableHeader";
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

  const handleToggleFavourite = useCallback(
    (id: number) => {
      toggleFavourite(id);
    },
    [toggleFavourite],
  );

  const handleDelete = useCallback(
    (id: number) => {
      requestDelete(id);
    },
    [requestDelete],
  );

  if (isLoading) return <PostListSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-field mb-card">
        <h1 className="title">Posts</h1>

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
                id="favouritesCheckbox"
                type="checkbox"
                checked={showFavourites}
                onChange={(e) => setShowFavourites(e.target.checked)}
              />
              <label htmlFor="favouritesCheckbox">Show only favourites</label>
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
            toggleFavourite={handleToggleFavourite}
            onDelete={handleDelete}
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
