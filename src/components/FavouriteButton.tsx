import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

interface FavouriteButtonProps {
  isFavourite: boolean;
  toggleFavourite: () => void;
}

const FavouriteButton = ({
  isFavourite,
  toggleFavourite,
}: FavouriteButtonProps) => {
  return (
    <button
      className="cursor-pointer hover:scale-110 transition"
      onClick={toggleFavourite}
      aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
      title={isFavourite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavourite ? (
        <HeartSolidIcon className="size-8 text-rose-500" />
      ) : (
        <HeartIcon className="size-8 text-gray-500" />
      )}
    </button>
  );
};

export default FavouriteButton;
