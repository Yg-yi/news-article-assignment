import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveArticle, Article } from '../storage';

const CreateArticle: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const publisherRef = useRef<HTMLInputElement | null>(null);

  const editingArticle = (location.state as { article?: Article })?.article;
  const isEditing = Boolean(editingArticle);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [error, setError] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title);
      setSummary(editingArticle.summary);
      setDate(editingArticle.date);
      setPublisher(editingArticle.publisher);
    }
  }, [editingArticle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check field and auto focus empty input
    if (!title.trim()) {
      titleRef.current?.focus();
      titleRef.current?.reportValidity();
      return;
    }

    if (!summary.trim()) {
      summaryRef.current?.focus();
      summaryRef.current?.reportValidity();
      return;
    }

    if (!date) {
      dateRef.current?.focus();
      dateRef.current?.reportValidity();
      return;
    }

    if (!publisher.trim()) {
      publisherRef.current?.focus();
      publisherRef.current?.reportValidity();
      return;
    }

    if (date > todayStr) {
      setError('Article date cannot be set in the future.');
      dateRef.current?.focus();
      return;
    }

    if (isEditing) {
      const confirmed = window.confirm('Are you sure you want to update this article?');
      if (!confirmed) return;
    }

    saveArticle({
      id: editingArticle ? editingArticle.id : Date.now().toString(),
      title,
      summary,
      date,
      publisher,
    });

    navigate('/');
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    padding: '10px 14px',
    color: '#18181B',
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = '#FFFFFF';
    e.currentTarget.style.borderColor = '#2A8575';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42, 133, 117, 0.15)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = '#F8FAFC';
    e.currentTarget.style.borderColor = '#E2E8F0';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        <div
          className="p-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          }}
        >
          <h2 className="mb-4" style={{ color: '#18181B', fontWeight: 600 }}>
            {isEditing ? 'Edit News Article' : 'Create News Article'}
          </h2>

          {error && <div className="alert alert-danger mb-4">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: '#18181B', fontSize: '0.9rem' }}>
                Article Title <span className="text-danger">*</span>
              </label>
              <input
                ref={titleRef}
                required
                type="text"
                className="form-control"
                placeholder="Enter article title"
                style={inputStyle}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: '#18181B', fontSize: '0.9rem' }}>
                Article Summary <span className="text-danger">*</span>
              </label>
              <textarea
                ref={summaryRef}
                required
                className="form-control"
                rows={4}
                placeholder="Enter a brief summary"
                style={inputStyle}
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                  if (error) setError('');
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: '#18181B', fontSize: '0.9rem' }}>
                Article Date <span className="text-danger">*</span>
              </label>
              <input
                ref={dateRef}
                required
                type="date"
                className="form-control"
                max={todayStr}
                style={inputStyle}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (error) setError('');
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ color: '#18181B', fontSize: '0.9rem' }}>
                Publisher <span className="text-danger">*</span>
              </label>
              <input
                ref={publisherRef}
                required
                type="text"
                className="form-control"
                placeholder="Enter publisher name"
                style={inputStyle}
                value={publisher}
                onChange={(e) => {
                  setPublisher(e.target.value);
                  if (error) setError('');
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            <div className="d-flex">
              <button
                type="submit"
                className="btn me-2"
                style={{
                  backgroundColor: '#2A8575',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = '#226D60';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#2A8575';
                }}
              >
                {isEditing ? 'Update Article' : 'Create Article'}
              </button>

              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: '#18181B',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = '#27272A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#18181B';
                }}
                onClick={() => navigate('/')}
              >
                {isEditing ? 'Cancel' : 'View Articles'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;   
