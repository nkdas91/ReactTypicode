import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1) || navigate("/")}>
      <ArrowLeftCircleIcon className="size-12 cursor-pointer text-gray-400 hover:text-indigo-500" />
    </button>
  );
};

export default BackButton;
