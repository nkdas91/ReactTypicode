import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

import Button from "./Button";
import { classNames } from "../utils/classNames";

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
      variant="ghost"
      size="icon"
      onClick={toggleFavourite}
      aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
      title={isFavourite ? "Remove from favorites" : "Add to favorites"}
      className={classNames(
        "favourite-button",
        isFavourite ? "favourite-button-active" : "favourite-button-inactive",
      )}
    >
      {isFavourite ? (
        <HeartSolidIcon className="favourite-icon-active" />
      ) : (
        <HeartIcon className="favourite-icon-inactive" />
      )}
    </Button>
  );
};

export default FavouriteButton;
