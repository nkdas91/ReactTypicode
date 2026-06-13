import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import useUser from "../../hooks/users/useUser";
import type { Post } from "../../types/Post";
import FavouriteButton from "../FavouriteButton";
import Button from "../Button";

interface PostListItemProps {
  post: Post;
  favourites: number[];
  toggleFavourite: (id: number) => void;
  onDelete: (id: number) => void;
}

const PostListItem = ({
  post,
  favourites,
  toggleFavourite,
  onDelete,
}: PostListItemProps) => {
  const { data: user } = useUser(post.userId);

  return (
    <li className="list-row">
      <Link to={`/posts/${post.id}`} className="list-link">
        {post.title}
      </Link>
      <div className="list-actions">
        {user && (
          <Link to={`/users/${user.id}`} className="link">
            {user.name}
          </Link>
        )}
        <FavouriteButton
          isFavourite={favourites.includes(post.id)}
          toggleFavourite={() => toggleFavourite(post.id)}
        />
        <Button
          to={`/posts/${post?.id}/edit`}
          variant="secondary"
          size="icon"
          aria-label="Edit post"
        >
          <PencilIcon className="size-6" />
        </Button>
        <Button
          type="button"
          variant="danger"
          size="icon"
          aria-label="Delete post"
          onClick={() => onDelete(post.id)}
        >
          <TrashIcon className="size-6" />
        </Button>
      </div>
    </li>
  );
};

export default PostListItem;
