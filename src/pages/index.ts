import { lazy } from 'react'

export { default as HomePage } from './HomePage.tsx'
export const NotFoundPage = lazy(() => import('./NotFoundPage.tsx'))
export const RepositoryPage = lazy(() => import('./RepositoryPage.tsx'))
export const UserPage = lazy(() => import('./UserPage.tsx'))
