import { useEffect, useMemo, useRef, useState } from 'react'
import RepositoryCard from './RepositoryCard.tsx'
import RepositorySort from './RepositorySort.tsx'
import type { SortMode } from './RepositorySort.tsx'
import { sortRepositories } from '../utils/sortRepositories.ts'
import type { GitHubRepository } from '../types/github.ts'

const PAGE_SIZE = 10
const PRELOAD_MARGIN = '0px 0px 200px 0px'

interface RepositoryListProps {
  repositories: GitHubRepository[]
}

const RepositoryList = ({ repositories }: RepositoryListProps) => {
  const [sortMode, setSortMode] = useState<SortMode>('stars-desc')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const sorted = useMemo(
    () => sortRepositories(repositories, sortMode),
    [repositories, sortMode]
  )

  const visible = sorted.slice(0, visibleCount)
  const hasMore = visibleCount < sorted.length

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((current) => current + PAGE_SIZE)
        }
      },
      { rootMargin: PRELOAD_MARGIN }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, visibleCount])

  if (repositories.length === 0) {
    return (
      <>
        <p className="eyebrow mb-3">Repositórios</p>
        <div className="panel p-4 text-body-secondary">
          Este usuário ainda não possui repositórios públicos.
        </div>
      </>
    )
  }

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <p className="eyebrow mb-0">Repositórios — {sorted.length}</p>
        <RepositorySort value={sortMode} onChange={setSortMode} />
      </div>

      <div className="panel overflow-hidden">
        {visible.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>

      <div ref={sentinelRef} className="list-status" aria-live="polite">
        {hasMore ? (
          <>
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
            <span className="eyebrow">
              Exibindo {visible.length} de {sorted.length}
            </span>
          </>
        ) : (
          <span className="eyebrow">
            Fim da lista · {sorted.length}{' '}
            {sorted.length === 1 ? 'repositório' : 'repositórios'}
          </span>
        )}
      </div>
    </section>
  )
}

export default RepositoryList
