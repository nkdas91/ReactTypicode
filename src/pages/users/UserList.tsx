import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { deleteUser } from "../../services/userService";

const UserList = () => {
  const { data: users } = useUsers();
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    const res = await deleteUser(id);

    if (res.data) {
      navigate("/users");
    } else {
      console.log(res.error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl mb-4">Users</h1>
      {users?.map((user) => (
        <div
          key={user?.id}
          className="pr-4 border border-gray-100 flex justify-between items-center hover:bg-gray-100"
        >
          <Link
            key={user?.id}
            to={`/users/${user?.id}`}
            className="p-4 flex-grow"
          >
            {user?.name}
          </Link>
          <div className="flex gap-2">
            <Link
              to={`/users/${user?.id}/edit`}
              className="bg-indigo-100 p-2 text-indigo-500 rounded-full cursor-pointer hover:bg-indigo-200"
            >
              <PencilIcon className="size-6" />
            </Link>
            <button
              onClick={(e) => handleDelete(e, user?.id)}
              className="bg-rose-100 p-2 text-rose-700 rounded-full cursor-pointer hover:bg-rose-200"
            >
              <TrashIcon className="size-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
