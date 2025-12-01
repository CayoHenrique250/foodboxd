import { describe, it, expect} from 'vitest'
import { router } from './routes'

describe('routes.tsx', () => {
  it('deve ter rota de login', () => {
    const loginRoute = router.routes.find(r => r.path === '/login')
    expect(loginRoute).toBeDefined()
  })

  it('deve ter rota de cadastro', () => {
    const registerRoute = router.routes.find(r => r.path === '/cadastro')
    expect(registerRoute).toBeDefined()
  })

  it('deve ter rota raiz', () => {
    const rootRoute = router.routes.find(r => r.path === '/')
    expect(rootRoute).toBeDefined()
  })

  it('deve ter rotas protegidas', () => {
    const protectedRoute = router.routes.find(r => r.children)
    expect(protectedRoute).toBeDefined()
    expect(protectedRoute?.children).toBeDefined()
  })

  it('deve ter rota de dashboard', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const dashboardRoute = routes.find(r => r.path === 'dashboard')
    expect(dashboardRoute).toBeDefined()
  })

  it('deve ter rota de perfil', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const profileRoute = routes.find(r => r.path === 'perfil')
    expect(profileRoute).toBeDefined()
  })

  it('deve ter rota de pesquisa', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const searchRoute = routes.find(r => r.path === 'pesquisa')
    expect(searchRoute).toBeDefined()
  })

  it('deve ter rota de amigos', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const friendsRoute = routes.find(r => r.path === 'amigos')
    expect(friendsRoute).toBeDefined()
  })

  it('deve ter rota de review', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const reviewRoute = routes.find(r => r.path === 'review')
    expect(reviewRoute).toBeDefined()
  })

  it('deve ter rota de diário', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const dailyRoute = routes.find(r => r.path === 'diario')
    expect(dailyRoute).toBeDefined()
  })

  it('deve ter rota de listas', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const listsRoute = routes.find(r => r.path === 'listas')
    expect(listsRoute).toBeDefined()
  })

  it('deve ter rota de minha lista', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const myListRoute = routes.find(r => r.path === 'minha-lista')
    expect(myListRoute).toBeDefined()
  })

  it('deve ter rota de seguindo', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const followingRoute = routes.find(r => r.path === 'seguindo')
    expect(followingRoute).toBeDefined()
  })

  it('deve ter rota de recomendações', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const recsRoute = routes.find(r => r.path === 'recomendacoes')
    expect(recsRoute).toBeDefined()
  })

  it('deve ter rota você', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const youRoute = routes.find(r => r.path === 'voce')
    expect(youRoute).toBeDefined()
  })

  it('deve ter redirecionamento para dashboard em /app', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const indexRoute = routes.find(r => r.index === true)
    expect(indexRoute).toBeDefined()
  })

  it('deve ter todas as rotas necessárias do app', () => {
    const routes = router.routes
      .flatMap(r => r.children || [])
      .flatMap(r => r.children || [])
    
    const routePaths = routes.map(r => r.path).filter(Boolean)
    
    expect(routePaths).toContain('dashboard')
    expect(routePaths).toContain('perfil')
    expect(routePaths).toContain('pesquisa')
    expect(routePaths).toContain('amigos')
    expect(routePaths).toContain('review')
  })

  it('router deve ser um objeto', () => {
    expect(typeof router).toBe('object')
    expect(router).not.toBeNull()
  })

  it('router deve ter propriedade routes', () => {
    expect(router.routes).toBeDefined()
    expect(Array.isArray(router.routes)).toBe(true)
  })

  it('deve ter pelo menos 3 rotas principais', () => {
    expect(router.routes.length).toBeGreaterThanOrEqual(3)
  })
})


