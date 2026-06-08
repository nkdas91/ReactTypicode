import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import Pagination from "../../components/Pagination";
import TableHeader from "../../components/TableHeader";
import UserListItem from "../../components/users/UserListItem";
import UserListSkeleton from "../../components/users/skeletons/UserListSkeleton";
import useListPageController from "../../hooks/useListPageController";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import useUserFilters from "../../hooks/users/useUserFilters";
import useUsers from "../../hooks/users/useUsers";

const UserList = () => {
  const { page, limit, query, setPage, setLimit, setQuery } = useUserFilters();

  const { searchInput, handleSearch } = useListPageController({
    query,
    setQuery,
  });

  const {
    data: usersResponse,
    error,
    isLoading,
    refetch,
  } = useUsers({ page, limit, query });

  const deleteUser = useDeleteUser(refetch);

  const users = usersResponse?.data;
  const total = usersResponse?.total;

  if (isLoading) return <UserListSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-field mb-card">
        <h1 className="text-3xl">Users</h1>

        <Button to="/users/create">Add new user</Button>
      </div>

      <TableHeader
        searchQuery={searchInput}
        onSearch={handleSearch}
        limit={limit}
        onLimitChange={setLimit}
      />

      {!users?.length && (
        <ErrorMessage
          message={
            query ? `No users found matching "${query}"` : "No users available"
          }
        />
      )}

      <ul>
        {users?.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            onDelete={(e, id) => {
              e.preventDefault();
              deleteUser(id);
            }}
          />
        ))}
      </ul>

      {users?.length ? (
        <div className="flex justify-end mt-card">
          <Pagination
            totalRecords={total ?? 0}
            currentPage={page}
            limit={limit}
            dataLength={users.length}
            onPageChange={setPage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserList;
