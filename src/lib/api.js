// https://api.themoviedb.org/3/movie/upcoming?api_key=a01170454c6b8755a69617eadc51091d&language=en-US&page=1

/*
page: int
total_pages: int
*/

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = 'a01170454c6b8755a69617eadc51091d'
const LAST_PAGE = 31

export async function getUpcoming(page = 1) {
  if (page > LAST_PAGE) {
    const data = await fetch(`${API_URL}/movie/upcoming?api_key=${API_KEY}&page=1`)
    return data.json()
  } else {
    const data = await fetch(`${API_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`)
    return data.json()
  }
}

export async function getMovie(movieId) {
  const data = await fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`)
  return data.json()
}

export const API_CONFIG = {
  images: {
    base_url: 'http://image.tmdb.org/t/p/',
    secure_base_url: 'https://image.tmdb.org/t/p/',
    backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
    logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
    poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    profile_sizes: ['w45', 'w185', 'h632', 'original'],
    still_sizes: ['w92', 'w185', 'w300', 'original'],
  },
}
