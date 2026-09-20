import { useCallback } from 'react'
import { Link, useParams } from 'react-router'
import { getUser, getUserRepos, isNotFound } from '../services/githubApi.ts'
import useRequest from '../hooks/useRequest.ts'
import {
  ArrowLeftIcon,
  ErrorMessage,
  Loading,
  RepositoryList,
  UserProfile
} from '../components/index.ts'

const UserPage = () => {
  const { username = '' } = useParams()

  const fetchUser = useCallback(
    (signal: AbortSignal) =>
      Promise.all([getUser(username, signal), getUserRepos(username, signal)]),
    [username]
  )

  const { status, data, error, retry } = useRequest(fetchUser)
  const notFound = isNotFound(error)

  return (
    <div>
      <title>{`${username} · GitHub User Explore`}</title>

      <Link to="/" className="back-link d-inline-flex align-items-center gap-2 mb-4">
        <ArrowLeftIcon size={12} /> Nova busca
      </Link>

      {status === 'loading' && <Loading label="Carregando usuário..." />}

      {status === 'error' && (
        <ErrorMessage
          title={notFound ? 'Usuário não encontrado' : 'Falha ao carregar dados'}
          message={
            notFound
              ? `Nenhum usuário com o nome "${username}".`
              : 'Não foi possível se comunicar com a API do GitHub.'
          }
          onRetry={retry}
        />
      )}

      {status === 'success' && data && (
        <div className="row g-4 g-lg-5">
          <div className="col-12 col-md-5 col-lg-4 col-xl-3">
            <UserProfile user={data[0]} />
          </div>
          <div className="col-12 col-md-7 col-lg-8 col-xl-9">
            <RepositoryList repositories={data[1]} />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPage
