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
  onBlur?: (name: string, value: string) => void;
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
  onBlur,
}: TextFieldProps) {
  const commonProps = {
    id: name,
    name,
    placeholder,
    value: value ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(name, e.target.value),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onBlur?.(name, e.target.value),
    "aria-invalid": !!error,
    "aria-describedby": error ? `${name}-error` : undefined,
    className: "form-field",
  };

  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}

      {as === "textarea" ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {error && (
        <p id={`${name}-error`} className="form-error">
          {error}
        </p>
      )}
    </div>
  );
}
