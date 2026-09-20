import { Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Loading } from './components/index.ts'
import { HomePage, NotFoundPage, RepositoryPage, UserPage } from './pages/index.ts'

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="/repository/:owner/:repo" element={<RepositoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
