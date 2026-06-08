import BackButton from "../../components/BackButton";
import UserForm from "../../components/users/UserForm";
import useCreateUserForm from "../../hooks/users/useCreateUserForm";

const UserCreate = () => {
  const {
    form,
    errors,
    loading,
    handleChange,
    handleAddressChange,
    handleSubmit,
  } = useCreateUserForm();

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

export default UserCreate;
