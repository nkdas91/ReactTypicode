import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import ErrorMessage from "../../components/ErrorMessage";
import UserFormSkeleton from "../../components/users/skeletons/UserFormSkeleton";
import UserForm from "../../components/users/UserForm";
import useUpdateUserForm from "../../hooks/users/useUpdateUserForm";
import useUser from "../../hooks/users/useUser";

const UserEdit = () => {
  const { id } = useParams();

  const { data: user, error, isLoading } = useUser(Number(id));

  const {
    form,
    errors,
    loading,
    handleChange,
    handleAddressChange,
    handleSubmit,
  } = useUpdateUserForm(Number(id), user);

  if (isLoading) {
    return <UserFormSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!user || !form) {
    return <ErrorMessage message="User not found" />;
  }

  return (
    <div className="section">
      <BackButton url="/users" label="Back to Users" />

      <UserForm
        form={form}
        errors={errors}
        loading={loading}
        handleChange={handleChange}
        handleAddressChange={handleAddressChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserEdit;
