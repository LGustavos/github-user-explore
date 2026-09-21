import { describe, expect, it } from 'vitest'
import { sortRepositories } from './sortRepositories.ts'
import { makeRepository } from '../test/factories.ts'
import type { GitHubRepository } from '../types/github.ts'

const repositories = [
  makeRepository({ id: 1, name: 'beta', stargazers_count: 5 }),
  makeRepository({ id: 2, name: 'alpha', stargazers_count: 20 }),
  makeRepository({ id: 3, name: 'gamma', stargazers_count: 1 })
]

const names = (list: GitHubRepository[]) => list.map((repository) => repository.name)

describe('sortRepositories', () => {
  it('ordena por estrelas, da maior para a menor', () => {
    expect(names(sortRepositories(repositories, 'stars-desc'))).toEqual([
      'alpha',
      'beta',
      'gamma'
    ])
  })

  it('ordena por estrelas, da menor para a maior', () => {
    expect(names(sortRepositories(repositories, 'stars-asc'))).toEqual([
      'gamma',
      'beta',
      'alpha'
    ])
  })

  it('ordena por nome de A a Z', () => {
    expect(names(sortRepositories(repositories, 'name-asc'))).toEqual([
      'alpha',
      'beta',
      'gamma'
    ])
  })

  it('ordena por nome de Z a A', () => {
    expect(names(sortRepositories(repositories, 'name-desc'))).toEqual([
      'gamma',
      'beta',
      'alpha'
    ])
  })

  it('não altera a lista original', () => {
    sortRepositories(repositories, 'name-asc')
    expect(names(repositories)).toEqual(['beta', 'alpha', 'gamma'])
  })
})
