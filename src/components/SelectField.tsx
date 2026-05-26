import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  value: string | number;
  options: Option[];
  onChange: (value: string) => void;
}

const SelectField = ({ value, options, onChange }: SelectFieldProps) => {
  return (
    <div className="grid grid-cols-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="col-start-1 row-start-1 px-4 py-2 pr-8 border border-gray-100 rounded-md appearance-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4" />
    </div>
  );
};

export default SelectField;
