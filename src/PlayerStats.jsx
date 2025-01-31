import React, { useState } from 'react';

const PlayerStats = () => {
  const [playerId, setPlayerId] = useState('');
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlayerStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.opendota.com/api/players/${playerId}`);
      if (!response.ok) {
        throw new Error('Player not found or API error');
      }
      const data = await response.json();
      setPlayerStats(data);
      console.log(data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    
  };

  const handleInputChange = (e) => {
    setPlayerId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerId.trim()) {
      fetchPlayerStats();
    }
  };

  // Helper function to safely access nested properties
  const getNestedValue = (obj, path, defaultValue = 'N/A') => {
    return path.split('.').reduce((acc, key) => acc?.[key] ?? defaultValue, obj);
  };
//   
  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center">
          <input
            type="text"
            value={playerId}
            onChange={handleInputChange}
            placeholder="Enter Player ID"
            className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-r-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {loading ? 'Loading...' : 'Fetch Stats'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {/* Player Stats */}
      {playerStats && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-orange-500 mb-6">Player Stats</h2>

          {/* Profile Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Profile</h3>
              <p className="text-gray-300">
                <strong>Name:</strong> {getNestedValue(playerStats, 'profile.personaname')}
              </p>
              <p className="text-gray-300">
                <strong>Dota ID:</strong> {getNestedValue(playerStats, 'profile.account_id')}
              </p>
              <p className="text-gray-300">
                <strong>Avatar:</strong>
                <img
                  src={getNestedValue(playerStats, 'profile.avatarfull', '')}
                  alt="Player Avatar"
                  className="h-12 w-12 rounded-full mt-2"
                />
              </p>
            </div>

            {/* MMR Section */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">MMR</h3>
              <p className="text-gray-300">
                <strong>Estimate:</strong> {getNestedValue(playerStats, 'mmr_estimate.estimate')}
              </p>
              <p className="text-gray-300">
                <strong>Rank Tier:</strong> {getNestedValue(playerStats, 'rank_tier')}
              </p>
              <p className="text-gray-300">
                <strong>Leaderboard Rank:</strong> {getNestedValue(playerStats, 'leaderboard_rank')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerStats;