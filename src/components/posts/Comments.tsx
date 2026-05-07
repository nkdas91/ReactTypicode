import { useEffect, useState } from "react";
import useComments from "../../hooks/useComments";
import type { Comment } from "../../types/Comment";
import Spinner from "../Spinner";
import TextField from "../TextField";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

interface CommentsProps {
  id: number;
}

const Comments = ({ id }: CommentsProps) => {
  const { data: comments, loading } = useComments(id);
  const [savedComments, setsavedComments] = useState<Comment[]>([]);
  const [form, setForm] = useState<Comment>({
    postId: id,
    id: 0,
    name: "",
    body: "",
    email: "",
  } as Comment);
  const [formVisible, setFormVisibility] = useState(false);

  useEffect(() => {
    const localComments = localStorage.getItem(`comments_${id}`);
    if (localComments) {
      setsavedComments((prev) => [...prev, ...JSON.parse(localComments)]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`comments_${id}`, JSON.stringify(savedComments));
  }, [savedComments]);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  if (loading) {
    return <Spinner />;
  }

  if (comments.length === 0) {
    return <div>This post doesn't have any comments.</div>;
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    form.id = comments.length + savedComments.length + 1;
    if (!form) return;
    setsavedComments((prev) => [...prev, form]);
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-2">
        <h2 className="text-xl mb-2">Comments</h2>
        {!formVisible && (
          <PlusCircleIcon
            onClick={() => setFormVisibility((prev) => !prev)}
            className="size-10 text-indigo-700 cursor-pointer"
          />
        )}
        {formVisible && (
          <MinusCircleIcon
            onClick={() => setFormVisibility((prev) => !prev)}
            className="size-10 text-indigo-700 cursor-pointer"
          />
        )}
      </div>

      <div
        className={`${formVisible ? "block" : "hidden"} max-w-3xl mx-auto mb-4 p-6 border border-gray-100 rounded-lg`}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            type="text"
            name="name"
            value={form?.name}
            handleChange={handleChange}
          />
          <TextField
            label="email"
            type="email"
            name="email"
            value={form?.email}
            handleChange={handleChange}
          />
          <label>Comment</label>
          <textarea
            name="body"
            value={form?.body}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="px-4 py-2 border border-gray-100 rounded-md w-full"
            rows={5}
          />
          <div className="flex justify-end gap-2">
            <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-200">
              Save
            </button>
          </div>
        </form>
      </div>
      {savedComments &&
        savedComments.map((c) => (
          <div
            className="max-w-3xl mx-auto mb-4 p-6 border border-gray-100 rounded-lg"
            key={c.id}
          >
            <h3 className="text-lg">{c.name}</h3>
            <label className="text-sm text-gray-500 italic block mb-3">
              {c.email}
            </label>
            <p className="text-gray-500">{c.body}</p>
          </div>
        ))}
      {comments.map((c) => (
        <div
          className="max-w-3xl mx-auto mb-4 p-6 border border-gray-100 rounded-lg"
          key={c.id}
        >
          <h3 className="text-lg">{c.name}</h3>
          <label className="text-sm text-gray-500 italic block mb-3">
            {c.email}
          </label>
          <p className="text-gray-500">{c.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
