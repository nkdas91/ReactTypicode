import { useId } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface Option {
  label: string;
  value: string | number;
}

interface BaseSelectFieldProps {
  value: string | number;
  options: Option[];
  onChange: (value: string) => void;
}

type SelectFieldProps =
  | (BaseSelectFieldProps & {
      label: string;
      ariaLabel?: never;
    })
  | (BaseSelectFieldProps & {
      label?: never;
      ariaLabel: string;
    });

const SelectField = (props: SelectFieldProps) => {
  const id = useId();

  const { value, options, onChange } = props;

  return (
    <div>
      {"label" in props && (
        <label htmlFor={id} className="form-label">
          {props.label}
        </label>
      )}

      <div className="grid grid-cols-1">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={"ariaLabel" in props ? props.ariaLabel : undefined}
          className="form-field col-start-1 row-start-1 appearance-none pr-8"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-muted sm:size-4" />
      </div>
    </div>
  );
};

export default SelectField;
