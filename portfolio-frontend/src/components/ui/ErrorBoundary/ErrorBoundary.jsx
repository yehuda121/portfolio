import React from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI error boundary caught:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { title, message, actionLabel } = this.props;
      return (
        <div className="error-boundary">
          <h1>{title}</h1>
          <p>{message}</p>
          <button type="button" className="error-boundary-btn" onClick={this.handleReload}>
            {actionLabel}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
