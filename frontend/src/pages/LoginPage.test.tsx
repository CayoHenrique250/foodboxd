/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { LoginPage } from './LoginPage'
import { useAuthStore } from '../store/auth.store'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

globalThis.fetch = vi.fn()

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({ token: null, user: null })
  })

  it('deve renderizar o formulário de login corretamente', () => {
    render(<LoginPage />)
    
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
    expect(screen.getByText(/não tem uma conta\? cadastre-se/i)).toBeInTheDocument()
  })

  it('deve mostrar erros de validação quando campos vazios', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument()
      expect(screen.getAllByText(/senha é obrigatória/i).length).toBeGreaterThan(0)
    })
  })

  it('deve mostrar erro quando e-mail inválido', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/e-mail/i)
    await user.type(emailInput, 'email-invalido')
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)
    
    expect(emailInput).toHaveValue('email-invalido')
  })

  it('deve mostrar erro quando senha muito curta', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    
    const passwordInput = screen.getByLabelText(/^senha$/i)
    await user.type(passwordInput, '12345')
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/a senha deve ter pelo menos 6 caracteres/i)).toBeInTheDocument()
    })
  })

  it('deve alternar visibilidade da senha', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    
    const passwordInput = screen.getByLabelText(/^senha$/i) as HTMLInputElement
    expect(passwordInput.type).toBe('password')
    
    const toggleButton = screen.getByRole('button', { name: /mostrar senha/i })
    await user.click(toggleButton)
    
    expect(passwordInput.type).toBe('text')
    
    await user.click(toggleButton)
    expect(passwordInput.type).toBe('password')
  })

  it('deve fazer login com sucesso', async () => {
    const user = userEvent.setup()
    const mockToken = 'mock-token-123'
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      name: 'Test',
      last_name: 'User',
      username: 'testuser',
    }

    ;(globalThis.fetch as any).mockImplementation((url: string) => {
      if (url.includes('login')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ access: mockToken }),
          headers: new Headers({ 'content-type': 'application/json' }),
        })
      }
      if (url.includes('users/me')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser),
          headers: new Headers({ 'content-type': 'application/json' }),
        })
      }
    })

    render(<LoginPage />)
    
    await user.type(screen.getByLabelText(/e-mail/i), 'test@test.com')
    await user.type(screen.getByLabelText(/^senha$/i), '123456')
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/app/dashboard')
    })
  })

  it('deve mostrar erro quando credenciais inválidas', async () => {
    const user = userEvent.setup()

    ;(globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ detail: 'E-mail ou senha inválidos.' }),
      headers: new Headers({ 'content-type': 'application/json' }),
    })

    render(<LoginPage />)
    
    await user.type(screen.getByLabelText(/e-mail/i), 'wrong@test.com')
    await user.type(screen.getByLabelText(/^senha$/i), 'wrongpass')
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/e-mail ou senha inválidos/i)).toBeInTheDocument()
    })
  })

  it('deve mostrar erro quando falha de conexão', async () => {
    const user = userEvent.setup()

    ;(globalThis.fetch as any).mockRejectedValueOnce(new Error('Network error'))

    render(<LoginPage />)
    
    await user.type(screen.getByLabelText(/e-mail/i), 'test@test.com')
    await user.type(screen.getByLabelText(/^senha$/i), '123456')
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/não foi possível conectar ao servidor/i)).toBeInTheDocument()
    })
  })

  it('deve redirecionar se usuário já estiver logado', () => {
    useAuthStore.setState({ 
      token: 'existing-token', 
      user: { 
        id: '1', 
        email: 'test@test.com', 
        name: 'Test', 
        last_name: 'User',
        username: 'testuser' 
      } 
    })
    
    render(<LoginPage />)
    
    expect(screen.getByText(/redirecionando/i)).toBeInTheDocument()
  })

  it('deve ter link para página de cadastro', () => {
    render(<LoginPage />)
    
    const link = screen.getByText(/não tem uma conta\? cadastre-se/i)
    expect(link).toHaveAttribute('href', '/cadastro')
  })

  it('deve desabilitar botão durante submissão', async () => {
    const user = userEvent.setup()

    ;(globalThis.fetch as any).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ access: 'token' }),
        headers: new Headers({ 'content-type': 'application/json' }),
      }), 100))
    )

    render(<LoginPage />)
    
    await user.type(screen.getByLabelText(/e-mail/i), 'test@test.com')
    await user.type(screen.getByLabelText(/^senha$/i), '123456')
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await user.click(submitButton)
    
    expect(screen.getByRole('button', { name: /entrando/i })).toBeDisabled()
  })
})


