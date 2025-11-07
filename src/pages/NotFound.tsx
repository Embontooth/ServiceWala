import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="text-center px-6 py-12 max-w-2xl">
        {/* 404 Icon */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-500">404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Error 404
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            The service you are looking for does not exist
          </p>
          <p className="text-gray-500">
            The page you're trying to access might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Icon/Illustration */}
        <div className="mb-8 text-8xl">
          🔍
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-md"
          >
            Go to Homepage
          </Link>
          <Link
            to="/services"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
          >
            Browse Services
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Need help finding a service?</p>
          <div className="flex gap-4 justify-center text-sm">
            <Link to="/" className="text-blue-500 hover:text-blue-600 underline">
              Contact Support
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/services" className="text-blue-500 hover:text-blue-600 underline">
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
