import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiUrl, API_BASE_URL } from './api'

describe('api.ts', () => {

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('deve construir URL corretamente', () => {
    const url = apiUrl('login/')
    expect(url).toContain('/api/login/')
  })

  it('deve remover barra inicial do endpoint se presente', () => {
    const url1 = apiUrl('/users/me/')
    const url2 = apiUrl('users/me/')
    
    expect(url1).toBe(url2)
    expect(url1).toContain('/api/users/me/')
  })

  it('deve usar API_BASE_URL como base', () => {
    const url = apiUrl('test/')
    expect(url).toContain(API_BASE_URL)
  })

  it('deve criar URL válida', () => {
    const url = apiUrl('register/')
    
    expect(() => new URL(url)).not.toThrow()
  })

  it('deve incluir /api/ no caminho', () => {
    const url = apiUrl('users/')
    expect(url).toMatch(/\/api\/users\//)
  })

  it('deve funcionar com endpoints vazios', () => {
    const url = apiUrl('')
    expect(url).toContain('/api/')
  })

  it('deve funcionar com endpoints complexos', () => {
    const url = apiUrl('users/123/profile/')
    expect(url).toContain('/api/users/123/profile/')
  })

  it('deve funcionar com query parameters no endpoint', () => {
    const url = apiUrl('search/?q=test')
    expect(url).toContain('/api/search/?q=test')
  })

  it('API_BASE_URL deve ser uma string', () => {
    expect(typeof API_BASE_URL).toBe('string')
  })

  it('API_BASE_URL deve começar com http', () => {
    expect(API_BASE_URL).toMatch(/^https?:\/\//)
  })

  it('deve produzir URLs consistentes', () => {
    const url1 = apiUrl('login/')
    const url2 = apiUrl('login/')
    
    expect(url1).toBe(url2)
  })
})


