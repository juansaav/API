import { IUser, IUserInputDTO, IMovie } from "../interfaces"; 
import { db } from "../da/dbconnection"; 

export class UserDA { 

    public async GetUser(email: string): Promise<IUser>  { 

        // Get user by email
        var user = await db.user.findUnique({
          where: {
            email: email,
          },
        })
        return user;

    }

    public async CreateUser(newUser: IUser): Promise<IUser>   {

        // Insert user
        const user = await db.user.create({
          data: newUser       
        })
        return user;

    }

    public async GetFauvoriteMovies(userId: number):Promise<IMovie[]>  {

        // Get favourites movies
        const user = await db.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            movies: { include: { movie: true } }, 
          },
        }); 
        // Return only movies
        const result = user.movies.map(movie => {
          return movie.movie
        })
        return result;

    }s

    public async AddFauvoriteMovie(userId: number, movieId: number): Promise<void>  {

        // Add favourite movie to user
        await db.favouriteMovies.create({
          data : { userId: userId, movieId: movieId }
        })
        
    }
 
} 