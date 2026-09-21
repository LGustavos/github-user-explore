import axios from 'axios'
import type { GitHubRepository, GitHubUser } from '../types/github.ts'

const api = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API_URL,
  headers: { Accept: 'application/vnd.github+json' }
})

const getUser = async (username: string, signal?: AbortSignal): Promise<GitHubUser> => {
  const { data } = await api.get<GitHubUser>(`/users/${encodeURIComponent(username)}`, {
    signal
  })
  return data
}

const REPOS_PER_PAGE = 100
const MAX_REPO_PAGES = 10

const getLastPage = (link: string | undefined): number => {
  const last = link?.split(',').find((part) => part.includes('rel="last"'))
  const url = last?.match(/<([^>]+)>/)?.[1]
  if (!url) return 1
  return Number(new URL(url).searchParams.get('page')) || 1
}

const getUserRepos = async (
  username: string,
  signal?: AbortSignal
): Promise<GitHubRepository[]> => {
  const url = `/users/${encodeURIComponent(username)}/repos`
  const fetchPage = (page: number) =>
    api.get<GitHubRepository[]>(url, {
      params: { per_page: REPOS_PER_PAGE, sort: 'updated', page },
      signal
    })

  const first = await fetchPage(1)
  const lastPage = Math.min(getLastPage(first.headers.link), MAX_REPO_PAGES)
  const rest = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) => fetchPage(index + 2))
  )

  return [first, ...rest].flatMap(({ data }) => data)
}

const getRepository = async (
  owner: string,
  repo: string,
  signal?: AbortSignal
): Promise<GitHubRepository> => {
  const { data } = await api.get<GitHubRepository>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
    { signal }
  )
  return data
}

const isNotFound = (error: unknown): boolean =>
  axios.isAxiosError(error) && error.response?.status === 404

export { getUser, getUserRepos, getRepository, getLastPage, isNotFound }
