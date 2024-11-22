const NotFound = () => {
    return (
        <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 class="text-9xl font-extrabold text-red-500">404</h1>
            <p class="mt-4 text-2xl font-medium text-gray-800">
                Oops! The page you're looking for doesn't exist.
            </p>
            <a href="/" class="mt-6 px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                Go Back Home
            </a>
      </div>
      
    );
}

export default NotFound;