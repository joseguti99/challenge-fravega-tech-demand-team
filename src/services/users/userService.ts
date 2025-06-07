import api from '../api';
import { Repository, User, userDetail, UserResponse } from '../../interfaces/users';

// Documentación del servicio de GitHub que se consume:
// https://docs.github.com/es/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28

// GET - /users — Buscar todos los usuarios
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users', {
    params: { per_page: 100, page: 1 },
  });
  return response.data;
};

// GET - /search/users?q=term — Búsqueda de usuarios por nombre
export const searchUsers = async (term: string): Promise<User[]> => {
  const response = await api.get<UserResponse>('/search/users', {
    params: { q: term, per_page: 100, page: 1 },
  });
  return response.data.items;
};

// GET - /users/:username — Detalle completo de un usuario específico
export const getUserByUsername = async (username: string): Promise<userDetail> => {
  const response = await api.get<userDetail>(`/users/${username}`);
  return response.data;
};

// GET - /users/:username/repos — Repositorios de un usuario específico
export const getReposByUsername = async (username: string): Promise<Repository[]> => {
  const response = await api.get<Repository[]>(`/users/${username}/repos`);
  return response.data;
};
