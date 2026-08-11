import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticles, deleteArticle, Article } from '../storage';

const ARTICLES_PER_PAGE = 4;

const DisplayArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'created' | 'latest_date' | 'earliest_date'>('created');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const loadArticles = () => {
    setIsRefreshing(true);
    setSortBy('created');
    setSearchTerm('');
    setCurrentPage(1);

    const data = getArticles();
    setArticles(data);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 200);
  };

  useEffect(() => {
    const data = getArticles();
    setArticles(data);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(id);
      loadArticles();
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'created') {
      return Number(b.id) - Number(a.id);
    }
    if (sortBy === 'latest_date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === 'earliest_date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE));
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = sortedArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const buttonAnimatedStyle: React.CSSProperties = {
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const handleInputMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = '#2A8575';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42, 133, 117, 0.15)';
  };

  const handleInputMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = 'transparent';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        
        {/* Header n controls */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span 
              className="fw-bold text-uppercase" 
              style={{ color: '#2A8575', fontSize: '0.85rem', letterSpacing: '1.2px' }}
            >
              {sortedArticles.length} ARTICLES FOUND
            </span>
          </div>
          <div>
            <button 
              className="btn btn-sm me-2" 
              style={{ 
                ...buttonAnimatedStyle, 
                backgroundColor: '#18181B', 
                color: '#FFFFFF', 
                border: 'none', 
                fontWeight: 500 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.backgroundColor = '#27272A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#18181B';
              }}
              onClick={loadArticles}
            >
              ↻ Refresh
            </button>
            <button 
              className="btn btn-sm" 
              style={{ 
                ...buttonAnimatedStyle, 
                backgroundColor: '#2A8575', 
                color: '#FFFFFF', 
                border: 'none', 
                fontWeight: 600 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.backgroundColor = '#226D60';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#2A8575';
              }}
              onClick={() => navigate('/create')}
            >
              + Create New Article
            </button>
          </div>
        </div>

        {/* Search n filter dropdown */}
        <div className="d-flex gap-2 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search articles by title, publisher, or summary..."
            value={searchTerm}
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: 'transparent',
              borderRadius: '6px',
              padding: '10px 14px',
              color: '#18181B',
              transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              outline: 'none',
              flex: 1,
            }}
            onMouseEnter={handleInputMouseEnter}
            onMouseLeave={handleInputMouseLeave}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="form-select"
            value={sortBy}
            style={{
              width: '200px',
              backgroundColor: '#FFFFFF',
              borderColor: 'transparent',
              borderRadius: '6px',
              color: '#18181B',
              fontWeight: 500,
              cursor: 'pointer',
              outline: 'none',
              transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            }}
            onMouseEnter={handleInputMouseEnter}
            onMouseLeave={handleInputMouseLeave}
            onChange={(e) => {
              setSortBy(e.target.value as any);
              setCurrentPage(1);
            }}
          >
            <option value="created">Recently Created</option>
            <option value="latest_date">Latest Article Date</option>
            <option value="earliest_date">Earliest Article Date</option>
          </select>
        </div>

        {/* Articlecards */}
        <div style={{ opacity: isRefreshing ? 0.2 : 1, transition: 'opacity 0.15s ease-in-out' }}>
          {currentArticles.length === 0 ? (
            <div className="alert" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', color: '#18181B' }}>
              No articles found matching your criteria.
            </div>
          ) : (
            <div>
              {currentArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="p-4 mb-3"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '8px', 
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <div className="text-uppercase mb-1" style={{ color: '#2A8575', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                    {article.publisher} &nbsp;•&nbsp; {article.date}
                  </div>

                  <h4 style={{ color: '#18181B', fontSize: '1.2rem', fontWeight: 600 }} className="mb-2">
                    {article.title}
                  </h4>

                  <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: '1.6' }} className="mb-3">
                    {article.summary}
                  </p>

                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-sm me-2"
                      style={{ 
                        ...buttonAnimatedStyle, 
                        backgroundColor: '#18181B', 
                        color: '#FFFFFF', 
                        fontSize: '0.8rem', 
                        border: 'none' 
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.backgroundColor = '#27272A';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = '#18181B';
                      }}
                      onClick={() => navigate('/create', { state: { article } })}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ 
                        ...buttonAnimatedStyle, 
                        backgroundColor: '#EF4444', 
                        color: '#FFFFFF', 
                        fontSize: '0.8rem', 
                        border: 'none' 
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.backgroundColor = '#DC2626';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = '#EF4444';
                      }}
                      onClick={() => handleDelete(article.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination pagination-sm">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                style={{ color: '#2A8575', borderColor: '#2A8575' }} 
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                &lt;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className="page-item">
                <button
                  className="page-link"
                  style={{
                    ...buttonAnimatedStyle,
                    backgroundColor: currentPage === i + 1 ? '#2A8575' : '#FFFFFF',
                    color: currentPage === i + 1 ? '#FFFFFF' : '#2A8575',
                    borderColor: '#2A8575'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                style={{ color: '#2A8575', borderColor: '#2A8575' }} 
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DisplayArticles;   
