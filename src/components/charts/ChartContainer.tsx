import { Suspense, type ReactNode } from "react";

interface CardContainerProps {
  title: string;
  children: ReactNode;
}

const ChartContainer = ({ title, children }: CardContainerProps) => {
  return (
    <div className="card min-w-65">
      <h2 className="card-title">{title}</h2>
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
  );
};

export default ChartContainer;
