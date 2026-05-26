import { useMemo, useState } from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import UserListItem from "../../components/users/UserListItem";
import UserListSkeleton from "../../components/users/skeletons/UserListSkeleton";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import useUsers from "../../hooks/users/useUsers";

const UserList = () => {
  const [query, setQuery] = useState("");
  const { data: usersResponse, error, isLoading, refetch } = useUsers();
  const deleteUser = useDeleteUser(refetch);

  const users = usersResponse?.data;

  const filteredUsers = useMemo(() => {
    return users?.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [users, query]);

  if (isLoading) {
    return <UserListSkeleton />;
  }

  if (error) {
    return <p role="alert">{error.message}</p>;
  }

  const handleSearch = (_name: string, value: string) => {
    setQuery(value);
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
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>

      {(!filteredUsers || filteredUsers.length === 0) && !isLoading ? (
        <div className="text-center p-2">
          {query ? `No users found matching "${query}"` : "No users available"}
        </div>
      ) : null}

      {filteredUsers && (
        <ul>
          {filteredUsers?.map((user) => (
            <UserListItem key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
