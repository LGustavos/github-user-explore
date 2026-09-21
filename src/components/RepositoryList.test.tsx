import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RepositoryList from './RepositoryList.tsx'
import { makeRepository } from '../test/factories.ts'
import type { GitHubRepository } from '../types/github.ts'

let triggerIntersection = () => {}

class IntersectionObserverMock {
  constructor(callback: IntersectionObserverCallback) {
    triggerIntersection = () =>
      callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver
      )
  }

  observe() {}

  disconnect() {}
}

const repositories = Array.from({ length: 25 }, (_, index) =>
  makeRepository({ id: index + 1, name: `repo-${index + 1}`, stargazers_count: index })
)

const renderList = (list: GitHubRepository[] = repositories) =>
  render(
    <MemoryRouter>
      <RepositoryList repositories={list} />
    </MemoryRouter>
  )

describe('RepositoryList', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  })

  it('exibe os 10 primeiros e carrega mais 10 a cada rolagem', () => {
    renderList()
    expect(screen.getAllByRole('link')).toHaveLength(10)
    expect(screen.getByText('Exibindo 10 de 25')).toBeInTheDocument()

    act(() => triggerIntersection())
    expect(screen.getAllByRole('link')).toHaveLength(20)

    act(() => triggerIntersection())
    expect(screen.getAllByRole('link')).toHaveLength(25)
    expect(screen.getByText('Fim da lista · 25 repositórios')).toBeInTheDocument()
  })

  it('ordena por estrelas por padrão e permite trocar a ordenação', async () => {
    renderList()
    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('repo-25')

    await userEvent.selectOptions(screen.getByLabelText('Ordenar'), 'name-asc')
    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('repo-1')
  })

  it('mostra uma mensagem quando não há repositórios', () => {
    renderList([])
    expect(
      screen.getByText('Este usuário ainda não possui repositórios públicos.')
    ).toBeInTheDocument()
  })
})
