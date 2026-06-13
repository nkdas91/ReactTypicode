import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import ConfirmModal from "../../components/ConfirmModal";
import ErrorMessage from "../../components/ErrorMessage";
import UserDetailsSkeleton from "../../components/users/skeletons/UserDetailsSkeleton";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import useUser from "../../hooks/users/useUser";

const UserDetails = () => {
  const { id } = useParams();
  const { data: user, error, isLoading } = useUser(Number(id));

  const navigate = useNavigate();
  const { isConfirmOpen, requestDelete, cancelDelete, confirmDelete } =
    useDeleteUser({ onSuccess: () => navigate("/users") });

  if (isLoading) {
    return <UserDetailsSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!user && !isLoading) {
    return <ErrorMessage message="User not found" />;
  }

  return (
    <div className="section">
      <BackButton url="/users" label="Back to Users" />

      <div className="form-section mt-card">
        <h1 className="title">{user?.name}</h1>
        <p className="caption">@{user?.username}</p>
      </div>

      <div className="form-section">
        <h2 className="section-title">Contact</h2>
        <p>
          <span className="text-muted">Email:</span> {user?.email}
        </p>
        <p>
          <span className="text-muted">Phone:</span> {user?.phone}
        </p>
        <p>
          <span className="text-muted">Website:</span> {user?.website}
        </p>
      </div>

      {user?.address && (
        <div className="form-section">
          <h2 className="section-title">Address</h2>
          <p>
            {user.address.suite}, {user.address.street}
          </p>
          <p>
            {user.address.city} - {user.address.zipcode}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-field">
        <Button to={`/users/${id}/edit`} variant="secondary">
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={() => requestDelete(Number(id))}
        >
          Delete
        </Button>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onClose={cancelDelete}
      />
    </div>
  );
};

export default UserDetails;
