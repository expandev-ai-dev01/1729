export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to NoteBox</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your lightweight app for quick notes with search and tag categorization
        </p>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700">
            Start creating your notes and organize them with tags for easy access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
