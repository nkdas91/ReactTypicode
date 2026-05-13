import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface BackButtonProps {
  url: string;
  label: string;
}

const BackButton = ({ url, label }: BackButtonProps) => {
  return (
    <Link
      to={url}
      className="flex items-center text-gray-500 hover:text-indigo-500"
    >
      <ArrowLeftCircleIcon className="size-12" />
      {label}
    </Link>
  );
};

export default BackButton;
