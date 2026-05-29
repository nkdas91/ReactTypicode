import { Suspense, type ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
}

const ChartContainer = ({ children }: CardContainerProps) => {
  return (
    <div>
      <div className="rounded-card p-4 border border-light min-w-65">
        <h2 className="text-lg mb-4">Posts (Liked vs Not Liked)</h2>
        <Suspense
          fallback={
            <div className="flex h-75 items-center justify-center">
              <p className="text-muted-foreground">Loading chart...</p>
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
};

export default ChartContainer;
