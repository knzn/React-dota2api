import React from 'react';
import PlayerStats from './PlayerStats';
import TopPlayers from './TopPlayers';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <header className="bg-gray-900 py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-orange-500 flex items-center">
            <img
              src="https://www.pngkey.com/png/full/314-3147852_dota-2-logo-png-transparent-dota-2-logo.png"
              alt="Dota 2 Logo"
              className="h-12 mr-3"
            />
            Dota 2 Player Stats
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'url(https://www.dota2.com/home/images/heroes/bg_hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-5xl font-bold text-white">Discover Your Stats</h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        <PlayerStats />
        <TopPlayers />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Dota 2 Player Stats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;