import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import TextField from "../../components/TextField";
import UserListItem from "../../components/users/UserListItem";
import UserListSkeleton from "../../components/users/skeletons/UserListSkeleton";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import useUserFilters from "../../hooks/users/useUserFilters";
import useUsers from "../../hooks/users/useUsers";
import Pagination from "../../components/Pagination";
import SelectField from "../../components/SelectField";
import { LIMITS } from "../../constants/pagination";

const UserList = () => {
  const { page, limit, query, setPage, setLimit, setQuery } = useUserFilters();

  const [searchInput, setSearchInput] = useState(query);

  const debouncedSearch = useDebouncedValue(searchInput);

  const {
    data: usersResponse,
    error,
    isLoading,
    refetch,
  } = useUsers({ page, limit, query });

  const deleteUser = useDeleteUser(refetch);

  const users = usersResponse?.data;
  const total = usersResponse?.total;

  // Debounce search updates to avoid triggering
  // navigation + API requests on every keystroke.
  useEffect(() => {
    setQuery(debouncedSearch);
  }, [debouncedSearch, setQuery]);

  if (isLoading) {
    return <UserListSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const handleSearch = (_name: string, value: string) => {
    setSearchInput(value);
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    await deleteUser(id);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center flex-wrap gap-2 mb-5">
        <h1 className="text-3xl">Users</h1>

        <Button to="/users/create">Add new user</Button>
      </div>

      <div className="flex flex-wrap gap-2 justify-between items-center">
        <TextField
          placeholder="Search"
          name="search"
          type="search"
          value={searchInput}
          onChange={handleSearch}
        />

        <div className="flex items-center gap-1 mb-2">
          <label>Show</label>
          <SelectField value={limit} onChange={setLimit} options={LIMITS} />
          <label> Records</label>
        </div>
      </div>

      {(!users || users.length === 0) && !isLoading ? (
        <ErrorMessage
          message={
            query ? `No users found matching "${query}"` : "No users available"
          }
        />
      ) : null}

      {users && (
        <ul>
          {users.map((user) => (
            <UserListItem key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </ul>
      )}

      {users?.length ? (
        <div className="flex justify-end items-center gap-2 mt-4">
          <Pagination
            totalRecords={total ?? 0}
            currentPage={page}
            limit={limit}
            dataLength={users?.length ?? 0}
            onPageChange={setPage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserList;
