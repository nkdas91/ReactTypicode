import { useNavigate } from "react-router-dom";
import PostCard from "../../components/posts/PostCard";
import usePosts from "../../hooks/usePosts";
import { deletePost } from "../../services/postService";

interface FavouritePostsProps {
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

const FavouritePosts = ({
  favourites,
  toggleFavourite,
}: FavouritePostsProps) => {
  const { data: posts } = usePosts();
  const navigate = useNavigate();

  const favouritePosts = posts.filter((p) => favourites.includes(p.id));

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();

    const res = await deletePost(id);

    if (res.data) {
      navigate("/posts/favourites");
    } else {
      console.log(res.error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {favouritePosts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          favourites={favourites}
          toggleFavourite={() => toggleFavourite(post.id)}
          handleDelete={(e) => handleDelete(e, post.id)}
        />
      ))}
    </div>
  );
};

export default FavouritePosts;
