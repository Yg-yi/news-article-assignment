# News Article 

A responsive 2-page CRUD web application built with React, TypeScript, and Bootstrap. This application enables users to create, read, update, delete, search, and filter news articles with client-side persistence.

---

## 🚀 Features

* **Create & Update Articles:** Interactive form with real-time validation, error handling, auto-focus on missing fields, and future-date restrictions.
* **Display & Layout:** Clean card-based article list inspired by modern news feeds.
* **Search & Dynamic Filtering:** Real-time search by title, publisher, or summary, with dynamic sorting (Recently Created, Latest Article Date, Earliest Article Date).
* **Pagination:** Fixed, intuitive pagination controls for browsing articles across pages.
* **Refresh & Delete:** Interactive list management including visual UI refresh feedback and article deletion with confirmation prompts.
* **Data Persistence:** Utilizes browser `localStorage` pre-populated with initial mock articles for immediate testing upon launch.

---

## 🛠️ Tech Stack & Tools

* **Frontend:** React, TypeScript, React Router (`react-router-dom`)
* **Styling:** Bootstrap 5, Custom CSS animations
* **Storage:** LocalStorage (Mock Database Layer)
* **Development:** Node.js, npm / yarn / pnpm

---

## 📋 Prerequisites

Ensure you have a modern Node.js environment installed on your machine:

* **Node.js:** Active LTS version (or any modern version supported by your environment)
* **Package Manager:** `npm`, `yarn`, or `pnpm`

---

## ⚡ Setup & Local Execution Instructions

Follow these steps to run the application locally:

### 1. Clone the Repository
Clone copy of the repository and navigate into the project root directory:
```bash
git clone https://github.com/Yg-yi/news-article-assignment.git

cd news-article-assignment 
```

### 2. Install Dependencies
Run the following command to install all necessary packages:
```bash
npm install
```

### 3. Start Development Server
Launch the application locally:
```bash
npm start
```

The application will automatically open in your default browser at:
`http://localhost:<PORT>` (typically port 3000, or whichever available port your environment assigns).

## 📂 Key Files
* `src/pages/CreateArticle.tsx` — Page 1: Form page for creating & updating articles
* `src/pages/DisplayArticles.tsx` — Page 2: Dashboard for searching, filtering & displaying articles
* `src/storage.ts` — LocalStorage API layer & initial mock dataset