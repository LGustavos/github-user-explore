import type { GitHubRepository } from '../types/github.ts'

export const makeRepository = (
  overrides: Partial<GitHubRepository> = {}
): GitHubRepository => ({
  id: 1,
  name: 'repo',
  description: null,
  language: null,
  stargazers_count: 0,
  forks_count: 0,
  html_url: 'https://github.com/octocat/repo',
  owner: {
    login: 'octocat',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4'
  },
  ...overrides
})
