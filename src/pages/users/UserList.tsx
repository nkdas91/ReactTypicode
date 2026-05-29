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

const UserList = () => {
  const { query, setQuery } = useUserFilters();

  const [searchInput, setSearchInput] = useState(query);

  const debouncedSearch = useDebouncedValue(searchInput);

  const {
    data: usersResponse,
    error,
    isLoading,
    refetch,
  } = useUsers({ query });

  const deleteUser = useDeleteUser(refetch);

  const users = usersResponse?.data;

  // Debounce search updates to avoid triggering
  // navigation + API requests on every keystroke.
  useEffect(() => {
    setQuery(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-3xl">Users</h1>

          <Button to="/users/create">Add</Button>
        </div>

        <div>
          <TextField
            placeholder="Search"
            name="search"
            type="search"
            value={searchInput}
            onChange={handleSearch}
          />
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
    </div>
  );
};

export default UserList;
