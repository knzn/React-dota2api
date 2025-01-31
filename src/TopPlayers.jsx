import React, { useState, useEffect } from 'react';

const TopPlayers = () => {
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch and select random players
  const fetchRandomPlayers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.opendota.com/api/proPlayers');
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const data = await response.json();

      // Select 5 random players
      const randomPlayers = getRandomPlayers(data, 5);
      setTopPlayers(randomPlayers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get random players
  const getRandomPlayers = (players, count) => {
    const shuffled = players.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, count); // Select the first `count` players
  };

  // Fetch random players on component mount
  useEffect(() => {
    fetchRandomPlayers();
  }, []);

  if (loading) {
    return <p className="text-gray-300">Loading players...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Random Pro Players</h2>

      {/* Refresh Button */}
      <button
        onClick={fetchRandomPlayers}
        className="mb-6 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300"
      >
        Refresh Players
      </button>

      {/* Player Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {topPlayers.map((player) => (
          <div
            key={player.account_id}
            className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Player Avatar */}
            <div className="flex justify-center">
              <img
                src={player.avatarfull || 'https://via.placeholder.com/150'}
                alt={player.name}
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>

            {/* Player Details */}
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-orange-500">
                {player.name || 'N/A'}
              </p>
              <p className="text-gray-300">
                <strong>Team:</strong> {player.team_name || 'N/A'}
              </p>
              <p className="text-gray-300">
                <strong>Country:</strong> {player.country_code || 'N/A'}
              </p>
            </div>

            {/* View Profile Button */}
            <div className="mt-4 text-center">
              <a
                href={`https://www.opendota.com/players/${player.account_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlayers;