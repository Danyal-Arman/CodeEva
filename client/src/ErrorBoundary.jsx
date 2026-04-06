// ErrorBoundary.jsx
import React from "react";
export default class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(err, info) { console.error("Boundary caught:", err, info); }
  render() {
    if (this.state.error) {
      return <pre style={{padding:16,whiteSpace:"pre-wrap"}}>{String(this.state.error)}</pre>;
    }
    return this.props.children;
  }
}
