import { Link } from 'react-router'
import { GithubIcon } from './components/index.ts'
import AppRoutes from './routes.tsx'

const App = () => {
  return (
    <div className="app-shell">
      <header className="masthead">
        <div className="container py-3 d-flex align-items-center justify-content-between">
          <Link
            to="/"
            className="masthead-brand d-inline-flex align-items-center gap-2 text-decoration-none"
          >
            <GithubIcon size={18} />
            <span>User Explore</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow-1 py-4 py-lg-5">
        <div className="container">
          <AppRoutes />
        </div>
      </main>
    </div>
  )
}

export default App
