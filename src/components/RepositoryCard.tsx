import { memo } from 'react'
import { Link } from 'react-router'
import { ForkIcon, StarIcon } from './icons.tsx'
import { languageColor } from '../utils/languageColors.ts'
import type { GitHubRepository } from '../types/github.ts'

interface RepositoryCardProps {
  repository: GitHubRepository
}

const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const { owner, name, description, language, stargazers_count, forks_count } =
    repository

  return (
    <Link to={`/repository/${owner.login}/${name}`} className="repo-row">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-2 gap-lg-4">
        <div>
          <h3 className="repo-row-name mb-1 text-break">{name}</h3>
          <p className="repo-row-desc mb-0">{description || 'Sem descrição.'}</p>
        </div>

        <div className="repo-row-meta d-flex flex-row flex-lg-column align-items-lg-end gap-3 gap-lg-1">
          <span className="d-inline-flex align-items-center gap-1" title="Estrelas">
            <StarIcon size={13} className="star-icon" />{' '}
            {stargazers_count.toLocaleString('pt-BR')}
          </span>
          <span className="d-inline-flex align-items-center gap-1" title="Forks">
            <ForkIcon size={13} /> {forks_count.toLocaleString('pt-BR')}
          </span>
          {language && (
            <span className="d-inline-flex align-items-center gap-2">
              <span
                className="lang-dot"
                style={{ backgroundColor: languageColor(language) }}
              />
              {language}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default memo(RepositoryCard)
