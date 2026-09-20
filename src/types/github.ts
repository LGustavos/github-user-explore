export interface GitHubOwner {
  login: string
  avatar_url: string
}

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  email: string | null
  followers: number
  following: number
  html_url: string
}

export interface GitHubRepository {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  owner: GitHubOwner
}
