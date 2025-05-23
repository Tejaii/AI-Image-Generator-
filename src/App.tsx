import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import AvatarGenerator from './components/AvatarGenerator';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <AvatarGenerator />
      </Layout>
    </ThemeProvider>
  );
}

export default App;