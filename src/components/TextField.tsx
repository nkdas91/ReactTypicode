import type { HTMLInputTypeAttribute } from "react";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  as?: "input" | "textarea";
  rows?: number;
  name: string;
  value?: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

export default function TextField({
  label,
  placeholder,
  type = "text",
  as = "input",
  rows = 4,
  name,
  value,
  error,
  onChange,
}: TextFieldProps) {
  const commonProps = {
    id: name,
    name,
    placeholder,
    value: value ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.name, e.target.value),
    "aria-invalid": !!error,
    "aria-describedby": error ? `${name}-error` : undefined,
    className:
      "px-4 py-2 border border-light rounded-md w-full focus-visible:outline-primary",
  };

  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={name} className="block mb-1">
          {label}
        </label>
      )}

      {as === "textarea" ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {error && (
        <p id={`${name}-error`} className="text-on-danger text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
