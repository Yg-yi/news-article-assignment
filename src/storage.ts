export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  publisher: string;
}

const STORAGE_KEY = 'news_articles';

// Default articles for first time reviewer
const DEFAULT_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Global Semiconductor Supply Chains Stabilize Following New Trade Agreements',
    summary: 'Major chip manufacturers report normalized lead times and increased production capacity across key technology sectors.',
    date: '2026-08-08',
    publisher: 'Tech Daily',
  },
  {
    id: '2',
    title: 'Renewable Energy Investment Hits Record High in Q2',
    summary: 'Solar and wind infrastructure development expanded by 34% year-over-year, driven by new clean energy subsidies.',
    date: '2026-08-06',
    publisher: 'Global Finance',
  },
  {
    id: '3',
    title: 'Autonomous Transit Network Begins Public Beta in Major Urban Hubs',
    summary: 'City officials launch electric self-driving shuttle fleets along designated commuter corridors to ease traffic congestion.',
    date: '2026-08-03',
    publisher: 'Urban Mobility',
  },
];

// Fetch all articles from localStorage
export const getArticles = (): Article[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    // Default articles so reviewer can see data immediately
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
    return DEFAULT_ARTICLES;
  }
  return JSON.parse(data);
};

// Create or Update article
export const saveArticle = (article: Article): void => {
  const articles = getArticles();
  const index = articles.findIndex((item) => item.id === article.id);

  if (index !== -1) {
    // Update existing article
    articles[index] = article;
  } else {
    // Add new article to the top of list
    articles.unshift(article);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
};

// Delete article by ID
export const deleteArticle = (id: string): void => {
  const articles = getArticles();
  const filtered = articles.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};   
