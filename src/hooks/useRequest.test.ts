import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import useRequest from './useRequest.ts'

type Request = (signal: AbortSignal) => Promise<string>

const pending: Request = () => new Promise<string>(() => {})

describe('useRequest', () => {
  it('começa carregando e depois retorna os dados', async () => {
    const request = vi.fn<Request>().mockResolvedValue('dados')
    const { result } = renderHook(() => useRequest(request))

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(result.current.data).toBe('dados')
  })

  it('expõe o erro quando a requisição falha', async () => {
    const error = new Error('falhou')
    const request = vi.fn<Request>().mockRejectedValue(error)
    const { result } = renderHook(() => useRequest(request))

    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBe(error)
    expect(result.current.data).toBeNull()
  })

  it('refaz a requisição ao chamar retry', async () => {
    const request = vi
      .fn<Request>()
      .mockRejectedValueOnce(new Error('falhou'))
      .mockResolvedValueOnce('dados')
    const { result } = renderHook(() => useRequest(request))

    await waitFor(() => expect(result.current.status).toBe('error'))
    act(() => result.current.retry())

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('success'))
    expect(request).toHaveBeenCalledTimes(2)
  })

  it('cancela a requisição anterior quando a requisição muda', async () => {
    const first = vi.fn<Request>(pending)
    const second = vi.fn<Request>().mockResolvedValue('novo')

    const { result, rerender } = renderHook(({ request }) => useRequest(request), {
      initialProps: { request: first }
    })
    rerender({ request: second })

    await waitFor(() => expect(result.current.data).toBe('novo'))
    for (const [signal] of first.mock.calls) {
      expect(signal.aborted).toBe(true)
    }
  })

  it('cancela a requisição ao desmontar', () => {
    const request = vi.fn<Request>(pending)
    const { unmount } = renderHook(() => useRequest(request))

    unmount()

    expect(request.mock.calls.at(-1)?.[0].aborted).toBe(true)
  })
})
