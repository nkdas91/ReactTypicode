import useNotification from "../../context/useNotification";
import postService from "../../services/postService";

export default function useDeletePost(refetch: () => void) {
  const { showNotification } = useNotification();

  const deletePost = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await postService.delete(id);

      showNotification("Post deleted");

      refetch();
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to delete post",
        "error",
      );
    }
  };

  return deletePost;
}
