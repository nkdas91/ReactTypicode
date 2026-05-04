interface TextFieldProps {
  label: string;
  type: string;
  name: string;
  value: string | undefined;
  handleChange: (name: string, value: string) => void;
}

const TextField = ({
  label,
  type,
  name,
  value,
  handleChange,
}: TextFieldProps) => {
  return (
    <div className="mb-2">
      {" "}
      <label className="block">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className="px-4 py-2 border border-gray-100 rounded-md"
      />
    </div>
  );
};

export default TextField;
