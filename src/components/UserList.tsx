import { Link } from "react-router-dom";
import useUsers from "../hooks/useUsers";

const UserList = () => {
  const { data: users } = useUsers();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl mb-4">Users</h1>
      {users?.map((user) => (
        <Link key={user?.id} to={`/users/${user?.id}`}>
          <div key={user?.id} className="p-2 border border-gray-100">
            {user?.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
