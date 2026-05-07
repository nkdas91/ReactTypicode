import LikesPieChart from "../components/charts/LikesPieChart";
import { useLikedPostsChart } from "../hooks/useLikedPostChart";
import usePosts from "../hooks/usePosts";

interface HomeProps {
  favouritePosts: number[];
}

const Home = ({ favouritePosts }: HomeProps) => {
  const { data: posts } = usePosts();

  const pieData = useLikedPostsChart(posts, favouritePosts);

  return (
    <div className="max-w-5xl max-w-100 ">
      <div className="border border-gray-100 rounded-3xl p-4 ">
        <h2 className="text-xl">Posts</h2>
        <LikesPieChart data={pieData} />
      </div>
    </div>
  );
};

export default Home;
