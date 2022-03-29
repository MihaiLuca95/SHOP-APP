import React from 'react';
import Analytics from './analytics/Analytics';

const options = {
  endpoint: 'http://localhost:3001/api/analytics',
  events: ['click', 'keyup']
}

function App() {
  return (
    <div className="App">
      <Analytics {...options} />
    </div>
  );
}

export default App;
