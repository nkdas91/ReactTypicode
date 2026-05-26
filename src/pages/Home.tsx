import LikesPieChart from "../components/charts/LikesPieChart";
import useLikedPostsPieData from "../hooks/posts/useLikedPostsPieData";
import usePosts from "../hooks/posts/usePosts";

interface HomeProps {
  likedPostIds: number[];
}

const Home = ({ likedPostIds }: HomeProps) => {
  const { data: postsResponse } = usePosts();

  const pieData = useLikedPostsPieData(postsResponse?.data, likedPostIds);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="border border-gray-100 rounded-3xl p-4 ">
        <h2 className="text-xl">Posts</h2>
        <LikesPieChart data={pieData} />
      </div>
    </div>
  );
};

export default Home;
