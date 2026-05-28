import { lazy, Suspense } from "react";

import getLikedPostsPieData from "../utils/charts/getLikedPostsPieData";
import usePosts from "../hooks/posts/usePosts";

const LikesPieChart = lazy(() => import("../components/charts/LikesPieChart"));

interface HomeProps {
  likedPostIds: number[];
}

const Home = ({ likedPostIds }: HomeProps) => {
  const { data: postsResponse } = usePosts();

  const pieData = getLikedPostsPieData(
    postsResponse?.total,
    likedPostIds.length,
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="rounded-card p-4 border border-light">
        <h2 className="text-xl">Posts</h2>
        <Suspense
          fallback={
            <div className="flex h-75 items-center justify-center">
              <p className="text-muted-foreground">Loading chart...</p>
            </div>
          }
        >
          <LikesPieChart data={pieData} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
