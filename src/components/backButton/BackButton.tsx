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
      className="inline-flex items-center rounded-full pr-field text-muted hover:text-primary-hover focus-visible:outline-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <ArrowLeftCircleIcon className="size-12" />
      {label}
    </Link>
  );
};

export default BackButton;
