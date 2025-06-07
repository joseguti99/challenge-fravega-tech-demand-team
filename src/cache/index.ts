/* eslint-disable no-console */

// Almacena un valor en localStorage
export const setCache = <T>(key: string, data: T): void => {
  // Prevenimos llamar al cache del cliente durante el periodo de hidratacion
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error al guardar en cache:', error);
  }
};

// Obtiene un valor del localStorage
export const getCache = <T>(key: string): T | null => {
  // Prevenimos llamar al cache del cliente durante el periodo de hidratacion
  if (typeof window === 'undefined') return null;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error al obtener del cache:', error);
    return null;
  }
};

// Actualiza un valor existente en localStorage
export const updateCache = <T>(key: string, data: T): void => {
  setCache(key, data);
};

// Elimina un valor específico del localStorage
export const deleteCache = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error al eliminar del cache:', error);
  }
};

// Limpia todo el localStorage
export const clearCache = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error al limpiar cache:', error);
  }
};