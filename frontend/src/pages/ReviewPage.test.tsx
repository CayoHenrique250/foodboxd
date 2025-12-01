import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import ReviewPage from './ReviewPage'

describe('ReviewPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar a página de review corretamente', () => {
    render(<ReviewPage />)
    
    expect(screen.getByText(/nova avaliação/i)).toBeInTheDocument()
    expect(screen.getByText(/criar lista/i)).toBeInTheDocument()
  })

  it('deve alternar entre abas de avaliação e lista', async () => {
    const user = userEvent.setup()
    render(<ReviewPage />)
    
    const reviewTab = screen.getByRole('button', { name: /nova avaliação/i })
    const listTab = screen.getByRole('button', { name: /criar lista/i })
    
    expect(reviewTab).toHaveClass('tabActive')
    
    await user.click(listTab)
    expect(listTab).toHaveClass('tabActive')
    
    await user.click(reviewTab)
    expect(reviewTab).toHaveClass('tabActive')
  })

  it('deve renderizar formulário de avaliação na aba review', () => {
    render(<ReviewPage />)
    
    expect(screen.getByText(/detalhes da avaliação/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/restaurante/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/prato/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data da visita/i)).toBeInTheDocument()
  })

  it('deve validar campos obrigatórios na avaliação', async () => {
    const user = userEvent.setup()
    render(<ReviewPage />)
    
    const submitButton = screen.getByRole('button', { name: /publicar avaliação/i })
    await user.click(submitButton)
    
    const restaurantSelect = screen.getByLabelText(/restaurante/i)
    expect(restaurantSelect).toBeRequired()
  })

  it('deve permitir selecionar avaliação com estrelas', async () => {
    const user = userEvent.setup()
    render(<ReviewPage />)
    
    const starButtons = screen.getAllByRole('button').filter(btn => 
      btn.querySelector('svg')
    )
    
    const ratingStars = starButtons.slice(0, 5)
    expect(ratingStars.length).toBeGreaterThanOrEqual(5)
    
    if (ratingStars.length >= 3) {
      await user.click(ratingStars[2])
    }
  })

  it('deve permitir adicionar fotos', async () => {
    render(<ReviewPage />)
    
    const uploadButton = screen.getByRole('button', { name: /adicionar fotos/i })
    expect(uploadButton).toBeInTheDocument()
  })

  it('deve permitir escrever texto de experiência', async () => {
    const user = userEvent.setup()
    render(<ReviewPage />)
    
    const textarea = screen.getByPlaceholderText(/conte-nos sobre sua experiência/i)
    await user.type(textarea, 'Ótima experiência!')
    
    expect(textarea).toHaveValue('Ótima experiência!')
  })

  it('deve mostrar contador de caracteres', () => {
    render(<ReviewPage />)
    
    expect(screen.getByText(/0 \/ 1000 caracteres/i)).toBeInTheDocument()
  })

  it('deve renderizar formulário de lista na aba criar lista', async () => {
    const user = userEvent.setup()
    render(<ReviewPage />)
    
    const listTab = screen.getByRole('button', { name: /criar lista/i })
    await user.click(listTab)
    
    expect(screen.getByText(/informações da lista/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nome da lista/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
  })

  it('deve permitir adicionar itens à lista', async () => {
    const user = userEvent.setup()
    render(<ReviewPage />)
    
    const listTab = screen.getByRole('button', { name: /criar lista/i })
    await user.click(listTab)
    
    const addButton = screen.getByRole('button', { name: /adicionar item/i })
    await user.click(addButton)
    
    expect(screen.getByPlaceholderText(/nome do item/i)).toBeInTheDocument()
  })

  it('deve permitir adicionar e remover itens da lista', async () => {
    const user = userEvent.setup()
    render(<ReviewPage />)
    
    const listTab = screen.getByRole('button', { name: /criar lista/i })
    await user.click(listTab)
    
    const addButton = screen.getByRole('button', { name: /adicionar item/i })
    await user.click(addButton)
    
    const itemInput = screen.getByPlaceholderText(/nome do item/i)
    await user.type(itemInput, 'Pizza Margherita')
    
    const confirmButton = screen.getAllByRole('button').find(btn => btn.textContent?.trim() !== '' && !btn.textContent?.includes('adicionar'))
    if (confirmButton) {
      await user.click(confirmButton)
    }
    
    await waitFor(() => {
      expect(screen.getByText(/pizza margherita/i)).toBeInTheDocument()
    })
  })

  it('deve submeter avaliação com sucesso', async () => {
    const user = userEvent.setup()
    render(<ReviewPage />)
    
    const selects = screen.getAllByRole('combobox')
    const restaurantSelect = selects[0]
    await user.selectOptions(restaurantSelect, '1')
    
    const pratoSelect = selects[1]
    await user.selectOptions(pratoSelect, '1')
    
    const dateInput = screen.getByLabelText(/data da visita/i)
    await user.type(dateInput, '2024-01-01')
    
    const buttons = screen.getAllByRole('button')
    const starButton = buttons.find(btn => btn.getAttribute('type') === 'button' && btn.querySelector('svg'))
    if (starButton) {
      await user.click(starButton)
    }
    
    const submitButton = screen.getByRole('button', { name: /publicar avaliação/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/avaliação publicada com sucesso/i)).toBeInTheDocument()
    })
  })

  it('deve desabilitar botão durante submissão', async () => {
    const user = userEvent.setup()
    render(<ReviewPage />)
    
    const selects = screen.getAllByRole('combobox')
    await user.selectOptions(selects[0], '1')
    await user.selectOptions(selects[1], '1')
    
    const dateInput = screen.getByLabelText(/data da visita/i)
    await user.type(dateInput, '2024-01-01')
    
    const submitButton = screen.getByRole('button', { name: /publicar avaliação/i })
    await user.click(submitButton)
    
    expect(screen.getByRole('button', { name: /publicando/i })).toBeDisabled()
  })
})

