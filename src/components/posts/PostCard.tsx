import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import type { Post } from "../../types/Post";
import FavouriteButton from "../FavouriteButton";

interface PostCardProps {
  post: Post;
  favourites: number[];
  toggleFavourite: (id: number) => void;
  handleDelete: (e: React.MouseEvent, id: number) => void;
}

const PostCard = ({
  post,
  favourites,
  toggleFavourite,
  handleDelete,
}: PostCardProps) => {
  return (
    <div
      key={post?.id}
      className="border border-gray-100 flex justify-between items-center flex-wrap gap-2"
    >
      <Link
        key={post?.id}
        to={`/posts/${post?.id}`}
        className="p-4 flex-grow hover:text-indigo-700 border-l-3 border-transparent hover:border-l-3 hover:border-indigo-700 hover:bg-linear-to-r hover:from-indigo-100 hover:to-white"
      >
        {post?.title}
      </Link>
      <div className="flex items-center ml-auto justify-end gap-2 px-4 py-2">
        <Link
          to={`/users/${post?.userId}`}
          className="text-sm text-gray-500 italic hover:text-indigo-700 hover:underline"
        >
          {post?.name}
        </Link>
        <FavouriteButton
          isFavourite={favourites.includes(post.id)}
          toggleFavourite={() => toggleFavourite(post.id)}
        />
        <Link
          to={`/posts/${post?.id}/edit`}
          className="bg-indigo-100 p-2 text-indigo-700 rounded-full cursor-pointer hover:bg-indigo-200"
        >
          <PencilIcon className="size-6" />
        </Link>
        <button
          onClick={(e) => handleDelete(e, post?.id)}
          className="bg-rose-100 p-2 text-rose-700 rounded-full cursor-pointer hover:bg-rose-200"
        >
          <TrashIcon className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
