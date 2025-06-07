import api from '../api'
import { getAllUsers, searchUsers, getUserByUsername, getReposByUsername } from './userService'
import { 
  getAllUsersMockData, 
  getUserByTermMockData, 
  getByUserMockData, 
  getReposByUsernameMockData 
} from './usersMock'

jest.mock('../api')
const mockedApi = api as jest.Mocked<typeof api>

describe('Users Service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllUsers', () => {
    it('retorna todos los usuarios correctamente', async () => {
      mockedApi.get.mockResolvedValue({ data: getAllUsersMockData })

      const result = await getAllUsers()

      expect(mockedApi.get).toHaveBeenCalledWith('/users', {
        params: { per_page: 100, page: 1 }
      })
      expect(result).toEqual(getAllUsersMockData)
    })

    it('maneja errores correctamente', async () => {
      const errorMessage = 'Error al obtener usuarios'
      mockedApi.get.mockRejectedValue(new Error(errorMessage))

      await expect(getAllUsers()).rejects.toThrow(errorMessage)
      expect(mockedApi.get).toHaveBeenCalledWith('/users', {
        params: { per_page: 100, page: 1 }
      })
    })
  })

  describe('searchUsers', () => {
    it('busca usuarios por término correctamente', async () => {
      const searchTerm = 'john'
      const mockResponse = { data: { items: getUserByTermMockData } }
      mockedApi.get.mockResolvedValue(mockResponse)

      const result = await searchUsers(searchTerm)

      expect(mockedApi.get).toHaveBeenCalledWith('/search/users', {
        params: { q: searchTerm, per_page: 100, page: 1 }
      })
      expect(result).toEqual(getUserByTermMockData)
    })

    it('maneja búsquedas con términos vacíos', async () => {
      const searchTerm = ''
      const mockResponse = { data: { items: [] } }
      mockedApi.get.mockResolvedValue(mockResponse)

      const result = await searchUsers(searchTerm)

      expect(mockedApi.get).toHaveBeenCalledWith('/search/users', {
        params: { q: searchTerm, per_page: 100, page: 1 }
      })
      expect(result).toEqual([])
    })

    it('maneja errores en la búsqueda', async () => {
      const searchTerm = 'test'
      const errorMessage = 'Error en la búsqueda'
      mockedApi.get.mockRejectedValue(new Error(errorMessage))

      await expect(searchUsers(searchTerm)).rejects.toThrow(errorMessage)
    })
  })

  describe('getUserByUsername', () => {
    it('obtiene el detalle de un usuario por username', async () => {
      const username = 'johndoe'
      mockedApi.get.mockResolvedValue({ data: getByUserMockData })

      const result = await getUserByUsername(username)

      expect(mockedApi.get).toHaveBeenCalledWith(`/users/${username}`)
      expect(result).toEqual(getByUserMockData)
    })

    it('maneja usuario no encontrado', async () => {
      const username = 'usuarionoexiste'
      const errorMessage = 'Usuario no encontrado'
      mockedApi.get.mockRejectedValue(new Error(errorMessage))

      await expect(getUserByUsername(username)).rejects.toThrow(errorMessage)
      expect(mockedApi.get).toHaveBeenCalledWith(`/users/${username}`)
    })
  })

  describe('getReposByUsername', () => {
    it('obtiene los repositorios de un usuario', async () => {
      const username = 'johndoe'
      mockedApi.get.mockResolvedValue({ data: getReposByUsernameMockData })

      const result = await getReposByUsername(username)

      expect(mockedApi.get).toHaveBeenCalledWith(`/users/${username}/repos`)
      expect(result).toEqual(getReposByUsernameMockData)
    })

    it('maneja usuario sin repositorios', async () => {
      const username = 'usuariosinrepos'
      mockedApi.get.mockResolvedValue({ data: [] })

      const result = await getReposByUsername(username)

      expect(mockedApi.get).toHaveBeenCalledWith(`/users/${username}/repos`)
      expect(result).toEqual([])
    })

    it('maneja errores al obtener repositorios', async () => {
      const username = 'testuser'
      const errorMessage = 'Error al obtener repositorios'
      mockedApi.get.mockRejectedValue(new Error(errorMessage))

      await expect(getReposByUsername(username)).rejects.toThrow(errorMessage)
      expect(mockedApi.get).toHaveBeenCalledWith(`/users/${username}/repos`)
    })
  })
})