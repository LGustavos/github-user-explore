import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SearchForm from './SearchForm.tsx'

describe('SearchForm', () => {
  it('envia o username sem espaços nas pontas', async () => {
    const onSubmit = vi.fn()
    render(<SearchForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('Username'), '  torvalds  ')
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(onSubmit).toHaveBeenCalledWith('torvalds')
  })

  it('mostra erro e não envia quando o campo está vazio', async () => {
    const onSubmit = vi.fn()
    render(<SearchForm onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Username')).toHaveClass('is-invalid')
    expect(screen.getByText('Informe um nome de usuário.')).toBeInTheDocument()
  })
})
