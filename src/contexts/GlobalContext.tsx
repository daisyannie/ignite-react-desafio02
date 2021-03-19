import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GlobalContextData {
  genres: GenreResponseProps[]
  selectedGenre: GenreResponseProps
  selectedGenreId: number
  movies: MovieProps[]
  handleSelectGenre: (id: number) => void
}

interface ProviderProps {
  children: ReactNode
}

export const GlobalContext = createContext({} as GlobalContextData)

export function GlobalContextProvider({children}: ProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  function handleSelectGenre(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, [selectedGenreId]);

  return (
    <GlobalContext.Provider value={{
      genres,
      selectedGenre,
      movies,
      handleSelectGenre,
      selectedGenreId
    }}>
      {children}
    </GlobalContext.Provider>
  )
}