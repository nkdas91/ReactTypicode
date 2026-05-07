import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import type { User } from "../../types/User";

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onDelete: (e: React.MouseEvent, id: number) => void;
}

const UserList = ({ users, isLoading, onDelete }: UserListProps) => {
  if (isLoading) {
    return <Spinner />;
  }

  if ((!users || users.length === 0) && !isLoading) {
    return <div className="text-center">No users at the moment!</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl mb-4">Users</h1>
      {users?.map((user) => (
        <div
          key={user?.id}
          className="pr-4 border border-gray-100 flex justify-between items-center gap-2"
        >
          <Link
            key={user?.id}
            to={`/users/${user?.id}`}
            className="p-4 flex-grow hover:text-indigo-700 border-l-3 border-transparent hover:border-l-3 hover:border-indigo-700 hover:bg-linear-to-r hover:from-indigo-100 hover:to-white"
          >
            {user?.name}
          </Link>
          <div className="flex gap-2">
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
