const Nav = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <nav>
        <div className="container mx-auto p-4 my-4">
          <div className="w-full mx-auto">
            // Not wrapping it in a form to perform search as I type
            <input
              className="w-full px-4 py-3 text-white font-light border-2 border-gray-800 rounded-xl focus:border-2 focus:border-blue-500 focus:outline-none placeholder:text-gray-500 hover:cursor-text"
              type="text"
              name="movie"
              value={searchTerm}
              placeholder="Enter a movie..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
