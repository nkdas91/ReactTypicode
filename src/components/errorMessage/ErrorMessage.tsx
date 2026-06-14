type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex min-h-25 flex-col items-center justify-center gap-4 rounded-card bg-surface p-6 text-center">
      <p role="alert">{message}</p>
    </div>
  );
};

export default ErrorMessage;
