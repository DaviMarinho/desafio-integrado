import api from './api';
import { Noticia, CreateNoticiaDto, UpdateNoticiaDto } from '../types/Noticia';

interface ListarNoticiasParams {
  page?: number;
  perPage?: number;
  q?: string; // Search query
}

/**
 * Lista notícias com paginação e busca
 */
export const listarNoticias = async (params: ListarNoticiasParams = {}) => {
  const { page = 1, perPage = 10, q } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: perPage.toString(),
  });

  if (q) {
    queryParams.append('search', q);
  }

  const response = await api.get<Noticia[]>(`/noticias?${queryParams.toString()}`);

  // NestJS backend returns total count in X-Total-Count header
  const total = parseInt(response.headers['x-total-count'] || '0', 10);

  return {
    data: response.data,
    total,
    page,
    perPage,
  };
};

/**
 * Busca uma notícia específica por ID
 */
export const buscarNoticia = async (id: number): Promise<Noticia> => {
  const response = await api.get<Noticia>(`/noticias/${id}`);
  return response.data;
};

/**
 * Cria uma nova notícia
 */
export const criarNoticia = async (data: CreateNoticiaDto): Promise<Noticia> => {
  const response = await api.post<Noticia>('/noticias', data);
  return response.data;
};

/**
 * Atualiza uma notícia existente
 */
export const atualizarNoticia = async (
  id: number,
  data: UpdateNoticiaDto
): Promise<Noticia> => {
  const response = await api.patch<Noticia>(`/noticias/${id}`, data);
  return response.data;
};

/**
 * Deleta uma notícia
 */
export const deletarNoticia = async (id: number): Promise<void> => {
  await api.delete(`/noticias/${id}`);
};
