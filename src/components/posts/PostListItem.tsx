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
    <li className="border border-light flex justify-between items-center flex-wrap gap-2">
      <Link
        to={`/posts/${post.id}`}
        className="p-4 grow hover:text-primary border-l-3 border-transparent hover:border-l-3 hover:border-primary hover:bg-linear-to-r hover:from-indigo-100 hover:to-white"
      >
        {post.title}
      </Link>
      <div className="flex items-center ml-auto justify-end gap-2 px-4 py-2">
        {user && (
          <Link
            to={`/users/${user.id}`}
            className="text-sm text-muted italic hover:text-primary hover:underline"
          >
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
