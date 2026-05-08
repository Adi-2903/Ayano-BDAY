import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  showDebug: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    showDebug: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, showDebug: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-[100] text-red-500 font-mono text-sm p-8">
          <div className="bg-black border border-red-500 p-4 rounded max-w-2xl overflow-auto">
            <h2 className="text-xl font-bold mb-2">🏎️ Scene Crash Detected</h2>
            <p className="mb-4">The 3D scene encountered a fatal error.</p>
            <pre className="whitespace-pre-wrap">{this.state.error?.toString()}</pre>
            <pre className="whitespace-pre-wrap text-xs mt-2 text-red-800">{this.state.error?.stack}</pre>
            <button 
              className="mt-4 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-800"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        {this.props.children}
        <button 
          onClick={() => this.setState({ showDebug: !this.state.showDebug })}
          className="absolute top-2 left-2 z-50 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
          title="Debug Info"
        >
          🐛
        </button>
      </>
    );
  }
}
