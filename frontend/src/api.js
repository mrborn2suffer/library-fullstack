import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
});

export const login = (email, password, role) =>
  api.post(`/api/auth/login?role=${role}`, { email, password }).then(r => r.data);

export const registerUser = payload =>
  api.post('/api/auth/register-user', payload).then(r => r.data);

export const fetchCurrentUser = () =>
  api.get('/api/auth/me').then(r => r.data);

export const fetchBooks = () =>
  api.get('/api/books').then(r => r.data);

export const fetchGenres = () =>
  api.get('/api/books/genres').then(r => r.data);

export const fetchBooksByGenre = genre =>
  api.get(`/api/books/genre/${genre}`).then(r => r.data);

export const searchBooks = query =>
  api.get('/api/books/search', { params: { q: query } }).then(r => r.data);

export const fetchCart = () =>
  api.get('/api/users/cart').then(r => r.data);

export const addToCart = bookId =>
  api.post(`/api/users/cart/${bookId}`).then(r => r.data);

export const removeFromCart = bookId =>
  api.delete(`/api/users/cart/${bookId}`).then(r => r.data);

export const createBook = book =>
  api.post('/api/books', book).then(r => r.data);

export const updateBook = (id, book) =>
  api.put(`/api/books/${id}`, book).then(r => r.data);

export const deleteBook = id =>
  api.delete(`/api/books/${id}`).then(r => r.data);

export const createAdmin = payload =>
  api.post('/api/admins/create', payload).then(r => r.data);

