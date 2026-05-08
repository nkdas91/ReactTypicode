import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import TextField from "../../components/TextField";
import type { User } from "../../types/User";

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onDelete: (e: React.MouseEvent, id: number) => void;
}

const UserList = ({ users, isLoading, onDelete }: UserListProps) => {
  const [query, setQuery] = useState("");

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()),
  );

  if (isLoading) {
    return <Spinner />;
  }

  const handleSearch = (name: string, value: string) => {
    setQuery(value);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-3xl">Users</h1>

          <Link
            to="/users/create"
            className="bg-indigo-700 px-4 py-2 text-white rounded-full cursor-pointer hover:bg-indigo-600"
          >
            Add
          </Link>
        </div>

        <div>
          <TextField
            placeholder="Search"
            name="search"
            type="search"
            value={query}
            handleChange={handleSearch}
          />
        </div>
      </div>

      {(!filteredUsers || filteredUsers.length === 0) && !isLoading ? (
        <div className="text-center p-2">No users to display!</div>
      ) : (
        ""
      )}

      {filteredUsers?.map((user) => (
        <div
          key={user?.id}
          className="border border-gray-100 flex justify-between items-center flex-wrap gap-2"
        >
          <Link
            key={user?.id}
            to={`/users/${user?.id}`}
            className="p-4 flex-grow hover:text-indigo-700 border-l-3 border-transparent hover:border-l-3 hover:border-indigo-700 hover:bg-linear-to-r hover:from-indigo-100 hover:to-white"
          >
            {user?.name}
          </Link>
          <div className="flex justify-end ml-auto gap-2 px-4 py-2">
            <Link
              to={`/posts?userId=${user?.id}`}
              className="bg-indigo-100 px-4 py-2 text-indigo-700 rounded-full cursor-pointer hover:bg-indigo-200"
            >
              Posts
            </Link>
            <Link
              to={`/users/${user?.id}/edit`}
              className="bg-indigo-100 p-2 text-indigo-700 rounded-full cursor-pointer hover:bg-indigo-200"
            >
              <PencilIcon className="size-6" />
            </Link>
            <button
              onClick={(e) => onDelete(e, user?.id)}
              className="bg-rose-100 p-2 text-rose-700 rounded-full cursor-pointer hover:bg-rose-200"
            >
              <TrashIcon className="size-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
