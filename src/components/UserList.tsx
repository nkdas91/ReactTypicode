import useUser from "../hooks/useUser";
import type { User } from "../types/User";

const UserList = () => {
  const { data: users } = useUser<User>();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl mb-4">Users</h1>
      {users.map((user) => (
        <div key={user.id} className="p-2 border border-gray-100">
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
