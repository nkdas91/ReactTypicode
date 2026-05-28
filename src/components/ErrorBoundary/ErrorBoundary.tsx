import { Component, type ErrorInfo, type ReactNode } from "react";
import Button from "../Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
  pathname?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  previousPathname?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error Boundary caught an error:", error);
    console.error(errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.pathname !== this.props.pathname && this.state.hasError) {
      this.setState({
        hasError: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-75 flex-col items-center justify-center gap-4 rounded-card bg-surface p-6 text-center">
          <h2 className="text-2xl font-bold">Something went wrong</h2>

          <p className="text-muted-foreground">
            {this.props.fallbackMessage ?? "An unexpected error occurred."}
          </p>

          <Button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded- bg-primary px-4 py-2 text-on-primary"
          >
            Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
