import {
  Component,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import IconRetry from "../../../../assets/images/icon-retry.svg?react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactElement<{ onRetry?: () => void }>;
  reset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("React ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    // reset local boundary state
    this.setState({ hasError: false, error: undefined });

    // trigger react-query reset() if provided
    if (this.props.reset) {
      this.props.reset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback && isValidElement(this.props.fallback)) {
        return cloneElement(this.props.fallback, { onRetry: this.handleReset });
      }

      return (
        <div
          role="alert"
          className="flexcol flexcenter error gap-1rem error_boundary"
        >
          <h1>⚠️ {this.state.error?.message || "Something went wrong"}</h1>
          <p>We couldn't connect to the API server. Please try again later.</p>
          <button
            onClick={this.handleReset}
            className="flex flexcenter retry_btn gap-1rem"
          >
            <IconRetry /> Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
