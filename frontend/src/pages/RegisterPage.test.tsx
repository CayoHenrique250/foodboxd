/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { RegisterPage } from './RegisterPage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

globalThis.fetch = vi.fn()

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar o formulário de cadastro corretamente', () => {
    render(<RegisterPage />)
    
    expect(screen.getByLabelText(/^nome$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/sobrenome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirme sua senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
  })

  it('deve mostrar erros de validação quando campos obrigatórios vazios', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument()
      expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument()
        expect(screen.getAllByText(/senha é obrigatória/i).length).toBeGreaterThan(0)
    })
  })

  it('deve validar formato de e-mail', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    const emailInput = screen.getByLabelText(/e-mail/i)
    await user.type(emailInput, 'email-invalido')
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/por favor, insira um e-mail válido/i)).toBeInTheDocument()
    })
  })

  it('deve validar tamanho mínimo da senha', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    const passwordInput = screen.getByLabelText(/^senha$/i)
    await user.type(passwordInput, '1234567')
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/a senha deve ter pelo menos 8 caracteres/i)).toBeInTheDocument()
    })
  })

  it('deve validar que senhas coincidem', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    const passwordInput = screen.getByLabelText(/^senha$/i)
    const password2Input = screen.getByLabelText(/confirme sua senha/i)
    
    await user.type(passwordInput, '12345678')
    await user.type(password2Input, '87654321')
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/as senhas não coincidem/i)).toBeInTheDocument()
    })
  })

  it('deve alternar visibilidade da senha', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    const passwordInput = screen.getByLabelText(/^senha$/i) as HTMLInputElement
    expect(passwordInput.type).toBe('password')
    
    const toggleButtons = screen.getAllByRole('button', { name: /mostrar senha/i })
    await user.click(toggleButtons[0])
    
    expect(passwordInput.type).toBe('text')
  })

  it('deve alternar visibilidade da confirmação de senha', async () => {
    const user = userEvent.setup()
    render(<RegisterPage />)
    
    const password2Input = screen.getByLabelText(/confirme sua senha/i) as HTMLInputElement
    expect(password2Input.type).toBe('password')
    
    const toggleButtons = screen.getAllByRole('button', { name: /mostrar senha/i })
    await user.click(toggleButtons[1])
    
    expect(password2Input.type).toBe('text')
  })

  it('deve cadastrar com sucesso', async () => {
    const user = userEvent.setup()

    ;(globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Conta criada com sucesso' }),
      headers: new Headers({ 'content-type': 'application/json' }),
    })

    render(<RegisterPage />)
    
    await user.type(screen.getByLabelText(/^nome$/i), 'John')
    await user.type(screen.getByLabelText(/sobrenome/i), 'Doe')
    await user.type(screen.getByLabelText(/e-mail/i), 'john@test.com')
    await user.type(screen.getByLabelText(/^senha$/i), '12345678')
    await user.type(screen.getByLabelText(/confirme sua senha/i), '12345678')
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/conta criada com sucesso/i)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    }, { timeout: 3000 })
  })

  it('deve mostrar erro quando e-mail já existe', async () => {
    const user = userEvent.setup()

    ;(globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ email: ['Este e-mail já está em uso.'] }),
      headers: new Headers({ 'content-type': 'application/json' }),
    })

    render(<RegisterPage />)
    
    await user.type(screen.getByLabelText(/^nome$/i), 'John')
    await user.type(screen.getByLabelText(/e-mail/i), 'existing@test.com')
    await user.type(screen.getByLabelText(/^senha$/i), '12345678')
    await user.type(screen.getByLabelText(/confirme sua senha/i), '12345678')
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/este e-mail já está em uso/i)).toBeInTheDocument()
    })
  })

  it('deve mostrar erro quando falha de conexão', async () => {
    const user = userEvent.setup()

    ;(globalThis.fetch as any).mockRejectedValueOnce(new Error('Network error'))

    render(<RegisterPage />)
    
    await user.type(screen.getByLabelText(/^nome$/i), 'John')
    await user.type(screen.getByLabelText(/e-mail/i), 'john@test.com')
    await user.type(screen.getByLabelText(/^senha$/i), '12345678')
    await user.type(screen.getByLabelText(/confirme sua senha/i), '12345678')
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/não foi possível conectar ao servidor/i)).toBeInTheDocument()
    })
  })

  it('deve ter link para página de login', () => {
    render(<RegisterPage />)
    
    const link = screen.getByText(/já tem uma conta\? faça login/i)
    expect(link).toHaveAttribute('href', '/login')
  })

  it('deve desabilitar botão durante submissão', async () => {
    const user = userEvent.setup()

    ;(globalThis.fetch as any).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' }),
        headers: new Headers({ 'content-type': 'application/json' }),
      }), 100))
    )

    render(<RegisterPage />)
    
    await user.type(screen.getByLabelText(/^nome$/i), 'John')
    await user.type(screen.getByLabelText(/e-mail/i), 'john@test.com')
    await user.type(screen.getByLabelText(/^senha$/i), '12345678')
    await user.type(screen.getByLabelText(/confirme sua senha/i), '12345678')
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)
    
    expect(screen.getByRole('button', { name: /criando conta/i })).toBeDisabled()
  })

  it('deve aceitar sobrenome opcional', async () => {
    const user = userEvent.setup()

    ;(globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Success' }),
      headers: new Headers({ 'content-type': 'application/json' }),
    })

    render(<RegisterPage />)
    
    await user.type(screen.getByLabelText(/^nome$/i), 'John')
    await user.type(screen.getByLabelText(/e-mail/i), 'john@test.com')
    await user.type(screen.getByLabelText(/^senha$/i), '12345678')
    await user.type(screen.getByLabelText(/confirme sua senha/i), '12345678')
    
    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalled()
    })
  })
})


