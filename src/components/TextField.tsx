import type { HTMLInputTypeAttribute } from "react";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  name: string;
  value?: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

export default function TextField({
  label,
  placeholder,
  type = "text",
  name,
  value,
  error,
  onChange,
}: TextFieldProps) {
  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={name} className="block mb-1">
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="px-4 py-2 border border-gray-100 rounded-md w-full"
      />

      {error && (
        <p id={`${name}-error`} className="text-rose-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
