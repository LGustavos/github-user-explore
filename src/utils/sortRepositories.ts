import type { SortMode } from '../components/RepositorySort.tsx'
import type { GitHubRepository } from '../types/github.ts'

export const sortRepositories = (
  repositories: GitHubRepository[],
  mode: SortMode
): GitHubRepository[] => {
  const list = [...repositories]
  switch (mode) {
    case 'stars-desc':
      return list.sort((a, b) => b.stargazers_count - a.stargazers_count)
    case 'stars-asc':
      return list.sort((a, b) => a.stargazers_count - b.stargazers_count)
    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return list.sort((a, b) => b.name.localeCompare(a.name))
  }
}
