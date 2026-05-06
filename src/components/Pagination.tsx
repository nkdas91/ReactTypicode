interface PaginationProps {
  totalRecords: number;
  currentPage: number;
  limit: number;
  dataLength: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalRecords,
  currentPage,
  limit,
  dataLength,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalRecords / limit);

  const safePage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  const start = totalRecords === 0 ? 0 : (safePage - 1) * limit + 1;
  const end = Math.min(safePage * limit, totalRecords);

  const baseBtn = "border px-4 py-2 rounded-full transition";

  const enabled =
    "cursor-pointer border-indigo-700 text-indigo-700 hover:bg-indigo-100";

  const disabled = "cursor-not-allowed border-gray-400 text-gray-400";

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {totalRecords === 0 || dataLength === 0 ? (
        <label>No records found</label>
      ) : (
        <>
          <label>
            Showing records {start} to {end} of {totalRecords} records.
          </label>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`${baseBtn} ${currentPage === 1 ? disabled : enabled}`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`${baseBtn} ${currentPage === totalPages ? disabled : enabled}`}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
