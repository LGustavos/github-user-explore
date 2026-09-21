import { isNotFound } from '../services/githubApi.ts'

interface ErrorContent {
  title: string
  message: string
}

const GENERIC_ERROR: ErrorContent = {
  title: 'Falha ao carregar',
  message: 'Não foi possível se comunicar com a API do GitHub.'
}

export const describeError = (error: unknown, notFound: ErrorContent): ErrorContent =>
  isNotFound(error) ? notFound : GENERIC_ERROR
