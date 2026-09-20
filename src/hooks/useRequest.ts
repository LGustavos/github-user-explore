import { useCallback, useEffect, useState } from 'react'

type RequestStatus = 'loading' | 'success' | 'error'

type Request<T> = (signal: AbortSignal) => Promise<T>

interface RequestResult<T> {
  request: Request<T>
  attempt: number
  status: Exclude<RequestStatus, 'loading'>
  data: T | null
  error: unknown
}

interface RequestState<T> {
  status: RequestStatus
  data: T | null
  error: unknown
  retry: () => void
}

const useRequest = <T>(request: Request<T>): RequestState<T> => {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<RequestResult<T> | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    request(controller.signal)
      .then((data) => {
        setResult({ request, attempt, status: 'success', data, error: null })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setResult({ request, attempt, status: 'error', data: null, error })
      })

    return () => controller.abort()
  }, [request, attempt])

  const retry = useCallback(() => setAttempt((current) => current + 1), [])

  if (!result || result.request !== request || result.attempt !== attempt) {
    return { status: 'loading', data: null, error: null, retry }
  }

  return { status: result.status, data: result.data, error: result.error, retry }
}

export default useRequest
