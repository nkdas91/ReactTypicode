import { useParams } from "react-router-dom";
import usePost from "../../hooks/usePost";
import type { Post } from "../../types/Post";
import { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import axios from "axios";
import BackButton from "../../components/BackButton";

const UserEdit = () => {
  const { id } = useParams();
  const { data: post } = usePost(id ? parseInt(id) : null);
  const [form, setForm] = useState<Post | null>(null);

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

    if (!form) return;

    try {
      axios
        .put(`https://jsonplaceholder.typicode.com/posts/${id}`, form)
        .then((res) => console.log(res.data));
    } catch (err) {
      console.error(err);
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
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button className="bg-indigo-500 px-4 py-2 text-white rounded-full cursor-pointer hover:bg-indigo-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
