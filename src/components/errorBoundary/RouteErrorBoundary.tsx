import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary";

interface RouteErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
}

const RouteErrorBoundary = ({
  children,
  fallbackMessage,
}: RouteErrorBoundaryProps) => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname} fallbackMessage={fallbackMessage}>
      {children}
    </ErrorBoundary>
  );
};

export default RouteErrorBoundary;
