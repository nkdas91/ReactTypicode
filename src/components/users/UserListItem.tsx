import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import type { User } from "../../types/User";
import Button from "../Button";

interface UserCardProps {
  user: User;
  onDelete: (e: React.MouseEvent, id: number) => Promise<void>;
}

const UserListItem = ({ user, onDelete }: UserCardProps) => {
  return (
    <li className="border border-gray-100 flex justify-between items-center flex-wrap gap-2">
      <Link
        to={`/users/${user.id}`}
        className="p-4 grow hover:text-indigo-700 border-l-3 border-transparent hover:border-l-3 hover:border-indigo-700 hover:bg-linear-to-r hover:from-indigo-100 hover:to-white"
      >
        {user.name}
      </Link>
      <div className="flex justify-end ml-auto gap-2 px-4 py-2">
        <Button to={`/posts?userId=${user.id}`} variant="secondary">
          Posts
        </Button>
        <Button
          to={`/users/${user.id}/edit`}
          variant="secondary"
          size="icon"
          aria-label="Edit user"
        >
          <PencilIcon className="size-6" />
        </Button>
        <Button
          type="button"
          variant="danger"
          size="icon"
          aria-label="Delete user"
          onClick={(e) => onDelete(e, user.id)}
        >
          <TrashIcon className="size-6" />
        </Button>
      </div>
    </li>
  );
};

export default UserListItem;
