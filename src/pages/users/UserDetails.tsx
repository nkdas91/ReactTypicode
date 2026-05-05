import { Link, useNavigate, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { deleteUser } from "../../services/userService";
import BackButton from "../../components/BackButton";

const UserDetails = () => {
  const { id } = useParams();
  const { data: user } = useUser(id ? parseInt(id) : null);
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent, id: number | undefined) => {
    e.preventDefault();

    const res = await deleteUser(id ?? null);

    if (res.data) {
      navigate("/users");
    } else {
      console.log(res.error);
    }
  };

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
          className="bg-indigo-500 px-4 py-2 text-white rounded-full cursor-pointer hover:bg-indigo-600"
        >
          Edit
        </Link>
        <button
          onClick={(e) => handleDelete(e, user?.id)}
          className="bg-rose-700 px-4 py-2 text-white rounded-full cursor-pointer hover:bg-rose-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
