import { LIMITS } from "../constants/pagination";
import SelectField from "./SelectField";
import TextField from "./TextField";

interface TableHeaderProps {
  searchQuery: string;
  onSearch: (_name: string, value: string) => void;
  limit: number;
  onLimitChange: (newLimit: string) => void;
}

const TableHeader = ({
  searchQuery,
  onSearch,
  limit,
  onLimitChange,
}: TableHeaderProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center">
      <TextField
        placeholder="Search"
        name="search"
        type="search"
        value={searchQuery}
        onChange={onSearch}
      />

      <div className="flex items-center gap-1 mb-2">
        <span>Show</span>
        <SelectField
          value={limit}
          onChange={onLimitChange}
          options={LIMITS}
          ariaLabel="Select the number of records to display in the list"
        />
        <span> Records</span>
      </div>
    </div>
  );
};

export default TableHeader;
