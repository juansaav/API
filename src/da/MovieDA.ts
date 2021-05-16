import { IMovie, IMovieInputDTO } from "../interfaces/IMovie"; 
import { db } from "../da/dbconnection"; 

export class MovieDA { 

    public async GetAllMovies() { 

        // Return all movies
        var movies = await  await db.movie.findMany()
        return movies;
        
    }

    public async CreateMovie(newMovie: IMovieInputDTO) {

        // Insert movies
        delete newMovie['genre_ids']; // TODO, NO ELIMINARLO 
        const movie = await db.movie.create({
          data: newMovie       
        })
        return movie;

    }
 
}