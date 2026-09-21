import { useCallback } from 'react'
import { Link, useParams } from 'react-router'
import { getUser, getUserRepos } from '../services/githubApi.ts'
import useRequest from '../hooks/useRequest.ts'
import {
  ArrowLeftIcon,
  ErrorMessage,
  Loading,
  RepositoryList,
  UserProfile
} from '../components/index.ts'
import { describeError } from '../utils/requestError.ts'

const UserPage = () => {
  const { username = '' } = useParams()

  const fetchUser = useCallback(
    async (signal: AbortSignal) => {
      const [user, repositories] = await Promise.all([
        getUser(username, signal),
        getUserRepos(username, signal)
      ])
      return { user, repositories }
    },
    [username]
  )

  const { status, data, error, retry } = useRequest(fetchUser)

  return (
    <div>
      <title>{`${username} · GitHub User Explore`}</title>

      <Link to="/" className="back-link d-inline-flex align-items-center gap-2 mb-4">
        <ArrowLeftIcon size={12} /> Nova busca
      </Link>

      {status === 'loading' && <Loading label="Carregando usuário..." />}

      {status === 'error' && (
        <ErrorMessage
          {...describeError(error, {
            title: 'Usuário não encontrado',
            message: `Nenhum usuário com o nome "${username}".`
          })}
          onRetry={retry}
        />
      )}

      {status === 'success' && data && (
        <div className="row g-4 g-lg-5">
          <div className="col-12 col-md-5 col-lg-4 col-xl-3">
            <UserProfile user={data.user} />
          </div>
          <div className="col-12 col-md-7 col-lg-8 col-xl-9">
            <RepositoryList repositories={data.repositories} />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPage
