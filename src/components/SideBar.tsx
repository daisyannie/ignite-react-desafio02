import { useContext } from "react";
import { Button } from './Button';
import { GlobalContext } from "../contexts/GlobalContext";

import '../styles/sidebar.scss';

export function SideBar() {

  const {
    genres,
    handleSelectGenre,
    selectedGenreId
  } = useContext(GlobalContext)

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              id={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleSelectGenre(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}