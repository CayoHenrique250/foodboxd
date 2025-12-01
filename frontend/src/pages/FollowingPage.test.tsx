import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import FollowingPage from './FollowingPage'

describe('FollowingPage', () => {
  it('deve renderizar a página de seguindo corretamente', () => {
    render(<FollowingPage />)
    
    expect(screen.getByAltText(/food boxd/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/pesquisar pessoas que você segue/i)).toBeInTheDocument()
  })

  it('deve exibir lista de pessoas que o usuário segue', () => {
    render(<FollowingPage />)
    
    expect(screen.getByText(/maria silva/i)).toBeInTheDocument()
    expect(screen.getByText(/carlos santos/i)).toBeInTheDocument()
    expect(screen.getByText(/ana costa/i)).toBeInTheDocument()
  })

  it('deve exibir usernames', () => {
    render(<FollowingPage />)
    
    expect(screen.getByText(/@maria_silva/i)).toBeInTheDocument()
    expect(screen.getByText(/@carlos_santos/i)).toBeInTheDocument()
  })

  it('deve ter botões de seguindo para cada usuário', () => {
    render(<FollowingPage />)
    
    const followingButtons = screen.getAllByRole('button', { name: /seguindo/i })
    expect(followingButtons.length).toBeGreaterThan(0)
  })

  it('deve filtrar usuários ao pesquisar por nome', async () => {
    const user = userEvent.setup()
    render(<FollowingPage />)
    
    const searchInput = screen.getByPlaceholderText(/pesquisar pessoas que você segue/i)
    await user.type(searchInput, 'Maria')
    
    expect(screen.getByText(/maria silva/i)).toBeInTheDocument()
    expect(screen.queryByText(/carlos santos/i)).not.toBeInTheDocument()
  })

  it('deve filtrar usuários ao pesquisar por username', async () => {
    const user = userEvent.setup()
    render(<FollowingPage />)
    
    const searchInput = screen.getByPlaceholderText(/pesquisar pessoas que você segue/i)
    await user.type(searchInput, 'carlos_santos')
    
    expect(screen.getByText(/carlos santos/i)).toBeInTheDocument()
    expect(screen.queryByText(/maria silva/i)).not.toBeInTheDocument()
  })

  it('deve exibir mensagem quando não há resultados', async () => {
    const user = userEvent.setup()
    render(<FollowingPage />)
    
    const searchInput = screen.getByPlaceholderText(/pesquisar pessoas que você segue/i)
    await user.type(searchInput, 'usuário inexistente xyz')
    
    expect(screen.getByText(/nenhum resultado encontrado/i)).toBeInTheDocument()
  })

  it('deve chamar handleUnfollow ao clicar no botão', async () => {
    const user = userEvent.setup()
    const consoleSpy = vi.spyOn(console, 'log')
    render(<FollowingPage />)
    
    const followingButtons = screen.getAllByRole('button', { name: /seguindo/i })
    await user.click(followingButtons[0])
    
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('deve exibir avatares dos usuários', () => {
    render(<FollowingPage />)
    
    const avatars = screen.getAllByRole('img').filter(img => 
      img.getAttribute('alt') !== 'Food Boxd'
    )
    expect(avatars.length).toBeGreaterThan(0)
  })
})


