import { useEffect,  useState } from "react";
import Movie from "./Movie";

function App() {

  let url = 'https://yts.mx/api/v2/list_movies.json?';
  const [loading, setLoading] = useState(true);
  const [movies, setMovie] = useState([]);

  useEffect( () => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setMovie(json.data.movies);
      setLoading(false);
    });
  },[]);

  return (
    <div className="App">
      { loading ? <div>loading..</div> :
        <section>
        {
          movies.map( (movie) => (
            <Movie key={movie.id} img={movie.medium_cover_image} title={movie.title} genres={movie.genres} />
          )) 
        }
        </section>
      }
    </div>
  );
}

export default App;
