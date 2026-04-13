export type ApiErrorKind = 'client' | 'server' | 'network' | 'unknown'

/** User-facing messages keyed by error kind. */
const USER_MESSAGES: Record<ApiErrorKind, string> = {
  client:  'The request could not be completed.',
  server:  'The server is having problems. Please try again later.',
  network: 'Network error. Please check your connection.',
  unknown: 'An unexpected error occurred. Please try again.',
}

export class ApiError extends Error {
  kind: ApiErrorKind
  status?: number

  constructor(
    message: string,
    kind: ApiErrorKind,
    status?: number
  ) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
  }

  /** Return the user-facing message for this error kind. */
  getUserMessage(): string {
    return USER_MESSAGES[this.kind]
  }
}

export async function fetchJson<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    })

    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        throw new ApiError(
          `Client error while requesting ${url}`,
          'client',
          response.status
        )
      }

      if (response.status >= 500) {
        throw new ApiError(
          `Server error while requesting ${url}`,
          'server',
          response.status
        )
      }

      throw new ApiError(
        `Unexpected HTTP error while requesting ${url}`,
        'unknown',
        response.status
      )
    }

    return response.json() as Promise<T>
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError(
      `Network error while requesting ${url}`,
      'network'
    )
  }
}