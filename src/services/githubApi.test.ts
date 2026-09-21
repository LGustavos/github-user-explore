import { describe, expect, it } from 'vitest'
import { getLastPage } from './githubApi.ts'

const BASE = 'https://api.github.com/user/1/repos'

describe('getLastPage', () => {
  it('retorna 1 quando não há header de paginação', () => {
    expect(getLastPage(undefined)).toBe(1)
  })

  it('lê a última página do link rel="last"', () => {
    const link = `<${BASE}?per_page=100&page=2>; rel="next", <${BASE}?per_page=100&page=4>; rel="last"`
    expect(getLastPage(link)).toBe(4)
  })

  it('funciona quando page não é o último parâmetro da URL', () => {
    const link = `<${BASE}?page=7&per_page=100>; rel="last"`
    expect(getLastPage(link)).toBe(7)
  })

  it('retorna 1 quando já está na última página', () => {
    const link = `<${BASE}?per_page=100&page=1>; rel="first", <${BASE}?per_page=100&page=2>; rel="prev"`
    expect(getLastPage(link)).toBe(1)
  })
})
