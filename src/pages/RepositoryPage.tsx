import { useCallback } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import { getRepository } from '../services/githubApi.ts'
import useRequest from '../hooks/useRequest.ts'
import {
  ArrowLeftIcon,
  ErrorMessage,
  ExternalLinkIcon,
  ForkIcon,
  Loading,
  StarIcon
} from '../components/index.ts'
import { avatarUrl } from '../utils/avatar.ts'
import { formatNumber } from '../utils/format.ts'
import { languageColor } from '../utils/languageColors.ts'
import { describeError } from '../utils/requestError.ts'

const RepositoryPage = () => {
  const { owner = '', repo = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchRepository = useCallback(
    (signal: AbortSignal) => getRepository(owner, repo, signal),
    [owner, repo]
  )

  const { status, data: repository, error, retry } = useRequest(fetchRepository)

  const handleBack = () => {
    if (location.key === 'default') {
      navigate(`/user/${owner}`)
      return
    }
    navigate(-1)
  }

  return (
    <div>
      <title>{`${owner}/${repo} · GitHub User Explore`}</title>

      <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
        <button
          type="button"
          className="back-link d-inline-flex align-items-center gap-2"
          onClick={handleBack}
        >
          <ArrowLeftIcon size={12} /> Voltar
        </button>
        <Link to={`/user/${owner}`} className="back-link">
          Perfil de {owner}
        </Link>
      </div>

      {status === 'loading' && <Loading label="Carregando repositório..." />}

      {status === 'error' && (
        <ErrorMessage
          {...describeError(error, {
            title: 'Repositório não encontrado',
            message: `Não encontramos "${owner}/${repo}".`
          })}
          onRetry={retry}
        />
      )}

      {status === 'success' && repository && (
        <article>
          <div className="row">
            <div className="col-12 col-lg-9">
              <Link
                to={`/user/${repository.owner.login}`}
                className="repo-byline d-inline-flex align-items-center gap-2 mb-3 text-decoration-none"
              >
                <img
                  src={avatarUrl(repository.owner.avatar_url, 56)}
                  alt={`Avatar de ${repository.owner.login}`}
                  className="repo-byline-avatar"
                  width="28"
                  height="28"
                />
                <span className="eyebrow">{repository.owner.login} /</span>
              </Link>

              <h1 className="repo-title mb-3">{repository.name}</h1>

              <p className="lead-text measure text-body-secondary mb-4">
                {repository.description || 'Sem descrição.'}
              </p>

              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink d-inline-flex align-items-center gap-2"
              >
                Abrir no GitHub <ExternalLinkIcon size={13} />
              </a>
            </div>
          </div>

          <div className="stat-band row g-0 mt-5">
            <div className="stat-cell col-12 col-md-4">
              <p className="eyebrow mb-2">Estrelas</p>
              <p className="stat-number mono mb-0 d-flex align-items-center gap-2">
                <StarIcon size={18} className="star-icon" />
                {formatNumber(repository.stargazers_count)}
              </p>
            </div>

            <div className="stat-cell col-12 col-md-4">
              <p className="eyebrow mb-2">Forks</p>
              <p className="stat-number mono mb-0 d-flex align-items-center gap-2">
                <ForkIcon size={18} />
                {formatNumber(repository.forks_count)}
              </p>
            </div>

            <div className="stat-cell col-12 col-md-4">
              <p className="eyebrow mb-2">Linguagem</p>
              {repository.language ? (
                <p className="stat-number mono mb-0 d-flex align-items-center gap-2">
                  <span
                    className="lang-dot"
                    style={{ backgroundColor: languageColor(repository.language) }}
                  />
                  {repository.language}
                </p>
              ) : (
                <p className="mb-0 text-body-secondary">Não informada</p>
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  )
}

export default RepositoryPage
