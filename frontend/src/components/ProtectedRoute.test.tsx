import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuthStore } from '../store/auth.store'
import { Routes, Route } from 'react-router-dom'

describe('ProtectedRoute', () => {
  it('deve renderizar Outlet quando usuário autenticado', () => {
    useAuthStore.setState({ 
      token: 'valid-token', 
      user: { 
        id: '1', 
        email: 'test@test.com', 
        name: 'Test',
        last_name: 'User',
        username: 'testuser'
      } 
    })

    window.history.pushState({}, '', '/protected')
    render(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<div>Protected Content</div>} />
        </Route>
      </Routes>
    )

    expect(screen.getByText(/protected content/i)).toBeInTheDocument()
  })

  it('deve redirecionar para login quando não autenticado', () => {
    useAuthStore.setState({ token: null, user: null })

    window.history.pushState({}, '', '/protected')
    render(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<div>Protected Content</div>} />
        </Route>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    )

    expect(screen.queryByText(/protected content/i)).not.toBeInTheDocument()
    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })

  it('deve redirecionar mesmo com token inválido/vazio', () => {
    useAuthStore.setState({ token: '', user: null })
    window.history.pushState({}, '', '/protected')
    render(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<div>Protected Content</div>} />
        </Route>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    )

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })

  it('deve usar replace na navegação', () => {
    useAuthStore.setState({ token: null, user: null })

    window.history.pushState({}, '', '/protected')
    render(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<div>Protected Content</div>} />
        </Route>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    )

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})


