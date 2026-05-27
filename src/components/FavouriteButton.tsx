import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Button from "./Button";

interface FavouriteButtonProps {
  isFavourite: boolean;
  toggleFavourite: () => void;
}

const FavouriteButton = ({
  isFavourite,
  toggleFavourite,
}: FavouriteButtonProps) => {
  return (
    <Button
      size="icon"
      onClick={toggleFavourite}
      aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
      title={isFavourite ? "Remove from favorites" : "Add to favorites"}
      className={`p-1 bg-white hover:bg-white hover:scale-110 transition focus-visible:outline-2 ${isFavourite ? "focus-visible:outline-accent" : "focus-visible:outline-muted"} `}
    >
      {isFavourite ? (
        <HeartSolidIcon className="size-8 text-accent" />
      ) : (
        <HeartIcon className="size-8 text-muted" />
      )}
    </Button>
  );
};

export default FavouriteButton;
