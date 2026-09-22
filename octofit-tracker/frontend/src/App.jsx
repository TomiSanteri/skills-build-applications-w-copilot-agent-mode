import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/activities">
          <span className="brand-mark">OF</span>
          <span>OctoFit <em>Tracker</em></span>
        </NavLink>
        <span className="status-pill"><span /> Live workspace</span>
      </header>
      <div className="app-layout">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="eyebrow">Workspace</p>
          <nav className="nav-list">
            <NavLink to="/activities" className="nav-link">Activities <span>01</span></NavLink>
            <NavLink to="/leaderboard" className="nav-link">Leaderboard <span>02</span></NavLink>
            <NavLink to="/teams" className="nav-link">Teams <span>03</span></NavLink>
            <NavLink to="/users" className="nav-link">Users <span>04</span></NavLink>
            <NavLink to="/workouts" className="nav-link">Workouts <span>05</span></NavLink>
          </nav>
          <div className="sidebar-note">
            <strong>Move with purpose.</strong>
            <span>Every session adds up.</span>
          </div>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
