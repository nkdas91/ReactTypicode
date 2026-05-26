import Button from "../Button";
import TextField from "../TextField";
import type { Comment } from "../../types/Comment";

interface CommentFormProps {
  form: Comment;
  errors: Record<string, string>;
  loading?: boolean;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function CommentForm({
  form,
  errors,
  loading = false,
  onChange,
  onSubmit,
}: CommentFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Title"
        type="text"
        name="name"
        value={form.name}
        error={errors.name}
        onChange={onChange}
      />

      <TextField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        error={errors.email}
        onChange={onChange}
      />

      <TextField
        label="Comment"
        name="body"
        as="textarea"
        rows={5}
        value={form.body}
        error={errors.body}
        onChange={onChange}
      />

      <div className="flex justify-end gap-2">
        <Button type="submit" variant="secondary" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
