import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="min-h-screen bg-surface flex flex-col items-center justify-center text-center p-4 relative">
        <button 
          className="absolute top-5 right-5 bg-primary text-white border-none rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:opacity-90 active:translate-y-0"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        
        <img src={logo} className="App-logo h-40 pointer-events-none" alt="logo" />
        
        <p className="text-lg mt-4 text-text">
          Edit <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">src/App.js</code> and save to reload.
        </p>
        
        <p className="mt-4 text-text">
          Current theme: <strong className="font-bold">{theme}</strong>
        </p>
        
        <a
          className="App-link mt-6 text-lg font-medium"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-secondary">Tailwind CSS configured with Soft Mono theme</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <span className="px-3 py-1 bg-primary text-white rounded text-xs">Primary</span>
            <span className="px-3 py-1 bg-secondary text-white rounded text-xs">Secondary</span>
            <span className="px-3 py-1 bg-success text-white rounded text-xs">Success</span>
            <span className="px-3 py-1 bg-error text-white rounded text-xs">Error</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
