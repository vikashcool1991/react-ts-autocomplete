import { Component, ErrorInfo } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "../../interfaces";
import {
  ERROR_BOUNDARY_MESSAGE,
  ERROR_BOUNDARY_MESSAGE_LOG,
} from "../../constants/autocomplete";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(ERROR_BOUNDARY_MESSAGE_LOG, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>{ERROR_BOUNDARY_MESSAGE}</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
