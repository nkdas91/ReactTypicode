import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import type { User } from "../../types/User";

interface UserDetailsProps {
  users: User[];
  isLoading: boolean;
  onDelete: (e: React.MouseEvent, id: number) => void;
}

const UserDetails = ({ users, isLoading, onDelete }: UserDetailsProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  const user = users.find((u) => u.id === Number(id));

  if (!user && !isLoading) {
    return <div className="text-center">User not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-100 rounded-lg">
      <BackButton />

      <div className="mb-6 mt-4">
        <h1 className="text-3xl">{user?.name}</h1>
        <p className="text-gray-500">@{user?.username}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Contact</h2>
        <p>
          <span className="text-gray-500">Email:</span> {user?.email}
        </p>
        <p>
          <span className="text-gray-500">Phone:</span> {user?.phone}
        </p>
        <p>
          <span className="text-gray-500">Website:</span> {user?.website}
        </p>
      </div>

      {user?.address && (
        <div>
          <h2 className="text-lg font-medium mb-2">Address</h2>
          <p>
            {user.address?.suite}, {user.address?.street}
          </p>
          <p>
            {user.address?.city} - {user.address?.zipcode}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Link
          to={`/users/${id}/edit`}
          className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-200"
        >
          Edit
        </Link>
        <button
          onClick={(e) => {
            onDelete(e, Number(id));
            navigate("/users");
          }}
          className="bg-rose-100 text-red-700 px-4 py-2 rounded-full cursor-pointer hover:bg-rose-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
