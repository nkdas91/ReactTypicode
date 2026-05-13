interface TextFieldProps {
  label?: string;
  placeholder?: string;
  type: string;
  name: string;
  value: string | undefined;
  error?: string;
  handleChange: (name: string, value: string) => void;
}

const TextField = ({
  label,
  placeholder,
  type,
  name,
  value,
  error,
  handleChange,
}: TextFieldProps) => {
  return (
    <div className="mb-2">
      <label className="block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value || ""}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className="px-4 py-2 border border-gray-100 rounded-md w-full"
      />
      <label className="text-rose-500">{error}</label>
    </div>
  );
};

export default TextField;
