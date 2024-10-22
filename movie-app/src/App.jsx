import { MOVIES } from "./mocks/movies";
import Movie from "./components/Movie";

function App(){
  return (
    <div>
      <div className="app-container">
        {
          MOVIES.results.map((item) => {
            return (
              <Movie
                key={item.id} 
                title={item.title}
                poster_path={item.poster_path}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;