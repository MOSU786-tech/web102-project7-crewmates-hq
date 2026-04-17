import './App.css';
import React from 'react';
import { NavLink, useRoutes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CrewGalleryPage from './pages/CrewGalleryPage';
import CreateCrewmatePage from './pages/CreateCrewmatePage';
import CrewmateDetailPage from './pages/CrewmateDetailPage';
import EditCrewmatePage from './pages/EditCrewmatePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/crew',
      element: <CrewGalleryPage />,
    },
    {
      path: '/create',
      element: <CreateCrewmatePage />,
    },
    {
      path: '/crewmates/:id',
      element: <CrewmateDetailPage />,
    },
    {
      path: '/crewmates/:id/edit',
      element: <EditCrewmatePage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  const navClassName = ({ isActive }) =>
    isActive ? 'nav-link nav-link--active' : 'nav-link';

  return (
    <div className="app-shell">
      <div className="ambient-orb ambient-orb--one" />
      <div className="ambient-orb ambient-orb--two" />
      <header className="topbar">
        <div className="brand-block">
          <p className="eyebrow">Week 8 Project</p>
          <NavLink className="brand-link" to="/">
            <h1>Crewmates HQ</h1>
          </NavLink>
          <p className="brand-copy">
            Build, track, and tune your own mission-ready crew with Supabase CRUD.
          </p>
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink className={navClassName} to="/">
            Home
          </NavLink>
          <NavLink className={navClassName} to="/crew">
            Crew Gallery
          </NavLink>
          <NavLink className={navClassName} to="/create">
            Create Crewmate
          </NavLink>
        </nav>
      </header>

      <main className="page-shell">{element}</main>
    </div>
  );
};

export default App;
