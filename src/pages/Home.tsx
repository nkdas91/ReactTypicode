import { lazy } from "react";
import ChartContainer from "../components/charts/ChartContainer";
import usePosts from "../hooks/posts/usePosts";
import useUsers from "../hooks/users/useUsers";
import useFavouritesStore from "../stores/favouriteStore";
import getLikedPostsPieData from "../utils/charts/getLikedPostsPieData";
import getUsersPostsBarData from "../utils/charts/getUsersPostsBarData";

const LikedPostsPieChart = lazy(
  () => import("../components/charts/LikedPostsPieChart"),
);
const UsersPostBarChart = lazy(
  () => import("../components/charts/UsersPostsBarChart"),
);

const Home = () => {
  const { data: postsResponse } = usePosts();
  const { data: userResponse } = useUsers();

  const favourites = useFavouritesStore((state) => state.favourites);

  const pieData = getLikedPostsPieData(postsResponse?.total, favourites.length);

  const barData = getUsersPostsBarData(
    postsResponse?.total,
    userResponse?.total,
  );

  return (
    <div className="max-w-5xl mx-auto flex flex-wrap gap-4">
      <ChartContainer title="Posts (Liked vs Not Liked)">
        <LikedPostsPieChart data={pieData} />
      </ChartContainer>

      <ChartContainer title="Posts vs Users">
        <UsersPostBarChart data={barData} />
      </ChartContainer>
    </div>
  );
};

export default Home;
