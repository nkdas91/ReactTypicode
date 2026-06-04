import Button from "./Button";

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
    <div className="flex justify-end items-center flex-wrap gap-2">
      {totalRecords === 0 || dataLength === 0 ? null : (
        <>
          <p>
            Showing records {start} to {end} of {totalRecords} records.
          </p>
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </>
      )}
    </div>
  );
};

export default Pagination;
