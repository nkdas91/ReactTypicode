import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import TextField from "../../components/TextField";
import { useNotification } from "../../context/NotificationContext";
import usePost from "../../hooks/usePost";
import type { Post } from "../../types/Post";
import { postSchema } from "../../schemas/postSchema";

const UserEdit = () => {
  const { id } = useParams();
  const { data: post } = usePost(id ? parseInt(id) : null);
  const [form, setForm] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showNotification } = useNotification();

  useEffect(() => {
    if (post) {
      setForm(post);
    }
  }, [post]);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!form) return;

    const result = postSchema.safeParse(form);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path.join(".")] = issue.message;
      });

      setErrors(formattedErrors);
      setLoading(false);

      return;
    }

    setErrors({});

    try {
      axios
        .put(`https://jsonplaceholder.typicode.com/posts/${id}`, form)
        .then(() => {
          showNotification("Post updated");
          setLoading(false);
        });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showNotification(error.message, "error");
      }

      showNotification("Unexpected error occurred", "error");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-100 rounded-lg">
      <BackButton />

      <form onSubmit={handleSubmit}>
        <div className="mb-6 mt-4">
          <TextField
            label="Title"
            type="text"
            name="title"
            value={form?.title}
            error={errors?.title}
            handleChange={handleChange}
          />

          <div>
            <label className="block">Body</label>
            <textarea
              name="body"
              value={form?.body}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="px-4 py-2 border border-gray-100 rounded-md w-full"
              rows={10}
            />
            <label className="text-rose-500">{errors?.body}</label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            disabled={loading}
            className={`px-4 py-2 rounded-full transition cursor-pointer
              ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              }
            `}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
