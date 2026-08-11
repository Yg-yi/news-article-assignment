import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateArticle from './pages/CreateArticle';
import DisplayArticles from './pages/DisplayArticles';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DisplayArticles />} />
        <Route path="/create" element={<CreateArticle />} />
      </Routes>
    </Router>
  );
}

export default App;   
