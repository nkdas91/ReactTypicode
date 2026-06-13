import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import type { User } from "../../types/User";
import Button from "../Button";

interface UserListItemProps {
  user: User;
  onDelete: (e: React.MouseEvent, id: number) => void;
}

const UserListItem = ({ user, onDelete }: UserListItemProps) => {
  return (
    <li className="list-row">
      <Link to={`/users/${user.id}`} className="list-link">
        {user.name}
      </Link>
      <div className="list-actions">
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
