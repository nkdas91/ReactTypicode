import PostListItem from "../../components/posts/PostListItem";
import useDeletePost from "../../hooks/posts/useDeletePost";
import usePosts from "../../hooks/posts/usePosts";

interface FavouritePostsProps {
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

const FavouritePosts = ({
  favourites,
  toggleFavourite,
}: FavouritePostsProps) => {
  const { data: postsResponse, refetch } = usePosts();
  const deletePost = useDeletePost(refetch);

  const posts = postsResponse?.data;
  const favouritePosts = posts?.filter((p) => favourites.includes(p.id));

  const handleDelete = async (id: number) => {
    await deletePost(id);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl mb-4">Favourite Posts</h1>
      <ul>
        {favouritePosts?.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            favourites={favourites}
            toggleFavourite={() => toggleFavourite(post.id)}
            onDelete={() => handleDelete(post.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default FavouritePosts;
