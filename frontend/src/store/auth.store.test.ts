import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './auth.store'

describe('auth.store', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, user: null })
  })

  it('deve ter estado inicial correto', () => {
    const state = useAuthStore.getState()
    
    expect(state.token).toBeNull()
    expect(state.user).toBeNull()
  })

  it('deve fazer login com sucesso', () => {
    const mockToken = 'test-token-123'
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
    }

    useAuthStore.getState().login(mockToken, mockUser)

    const state = useAuthStore.getState()
    expect(state.token).toBe(mockToken)
    expect(state.user).toEqual(mockUser)
  })

  it('deve fazer logout com sucesso', () => {

    const mockToken = 'test-token-123'
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
    }

    useAuthStore.getState().login(mockToken, mockUser)
    
    let state = useAuthStore.getState()
    expect(state.token).toBe(mockToken)

    useAuthStore.getState().logout()

    state = useAuthStore.getState()
    expect(state.token).toBeNull()
    expect(state.user).toBeNull()
  })

  it('deve atualizar foto do usuário', () => {
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
    }

    useAuthStore.getState().login('token', mockUser)

    const newPhotoUrl = 'https://example.com/new-photo.jpg'
    useAuthStore.getState().updateUserPhoto(newPhotoUrl)

    const state = useAuthStore.getState()
    expect(state.user?.foto).toBe(newPhotoUrl)
  })

  it('não deve quebrar ao atualizar foto sem usuário logado', () => {
    const newPhotoUrl = 'https://example.com/new-photo.jpg'
    useAuthStore.getState().updateUserPhoto(newPhotoUrl)

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
  })

  it('deve preservar outros dados do usuário ao atualizar foto', () => {
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
    }

    useAuthStore.getState().login('token', mockUser)

    const newPhotoUrl = 'https://example.com/new-photo.jpg'
    useAuthStore.getState().updateUserPhoto(newPhotoUrl)

    const state = useAuthStore.getState()
    expect(state.user?.id).toBe('1')
    expect(state.user?.email).toBe('test@test.com')
    expect(state.user?.name).toBe('John')
    expect(state.user?.foto).toBe(newPhotoUrl)
  })

  it('deve manter token ao atualizar foto', () => {
    const mockToken = 'test-token-123'
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
    }

    useAuthStore.getState().login(mockToken, mockUser)

    const newPhotoUrl = 'https://example.com/new-photo.jpg'
    useAuthStore.getState().updateUserPhoto(newPhotoUrl)

    const state = useAuthStore.getState()
    expect(state.token).toBe(mockToken)
  })

  it('deve permitir login com usuário sem foto', () => {
    const mockToken = 'test-token-123'
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
    }

    useAuthStore.getState().login(mockToken, mockUser)

    const state = useAuthStore.getState()
    expect(state.user?.foto).toBeUndefined()
  })

  it('deve permitir login com usuário com foto', () => {
    const mockToken = 'test-token-123'
    const mockUser = {
      id: '1',
      email: 'test@test.com',
      name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      foto: 'https://example.com/photo.jpg',
    }

    useAuthStore.getState().login(mockToken, mockUser)

    const state = useAuthStore.getState()
    expect(state.user?.foto).toBe('https://example.com/photo.jpg')
  })

  it('deve sobrescrever login anterior', () => {
    const firstToken = 'first-token'
    const firstUser = {
      id: '1',
      email: 'first@test.com',
      name: 'First',
      last_name: 'User',
      username: 'firstuser',
    }

    useAuthStore.getState().login(firstToken, firstUser)

    const secondToken = 'second-token'
    const secondUser = {
      id: '2',
      email: 'second@test.com',
      name: 'Second',
      last_name: 'User',
      username: 'seconduser',
    }

    useAuthStore.getState().login(secondToken, secondUser)

    const state = useAuthStore.getState()
    expect(state.token).toBe(secondToken)
    expect(state.user?.id).toBe('2')
    expect(state.user?.email).toBe('second@test.com')
  })
})


