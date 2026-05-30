import React from "react";

class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      hasError: false

    };

  }

  static getDerivedStateFromError() {

    return {

      hasError: true

    };

  }

  componentDidCatch(error, errorInfo) {

    console.error(
      "Application Error:",
      error
    );

    console.error(
      errorInfo
    );

  }

  render() {

    if (
      this.state.hasError
    ) {

      return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

          <div className="bg-white border rounded-2xl p-8 text-center max-w-md shadow-sm">

            <h1 className="text-6xl font-bold text-red-500">

              ⚠️

            </h1>

            <h2 className="text-2xl font-bold mt-4">

              Something Went Wrong

            </h2>

            <p className="text-slate-500 mt-3">

              An unexpected error occurred.

            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >

              Reload Page

            </button>

          </div>

        </div>

      );

    }

    return this.props.children;

  }

}

export default ErrorBoundary;