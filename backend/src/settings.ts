import assert from 'assert'

export function getEnvOrThrow(envName: string): string {
  const env = process.env[envName]
  assert(env, `Missing environment variable ${envName}`)
  return env
}

export function getEnvOrDefault(envName: string, defaultValue: string): string {
  return process.env[envName] ?? defaultValue
}

export const NODE_ENV = getEnvOrDefault('NODE_ENV', 'development').toLowerCase()
export const LOGGER_LEVEL = getEnvOrDefault('LOGGER_LEVEL', 'info')
export const CORS_ALLOWED_ORIGINS = getEnvOrDefault('CORS_ALLOWED_ORIGINS', '*')
