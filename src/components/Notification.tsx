interface NotificationProps {
  message: string;
  type?: "success" | "error";
}

const Notification = ({ message, type = "success" }: NotificationProps) => {
  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white transition-all
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {message}
    </div>
  );
};

export default Notification;
