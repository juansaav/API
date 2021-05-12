import dotenv from 'dotenv';

const dotEnv = dotenv.config();

if (dotEnv.error) {
  throw new Error("Couldn't find .env file.");
}

export default {
  // App port
  PORT: parseInt(process.env.PORT),

  // THEMOVIEDB
  THEMOVIEDB_KEY: process.env.THEMOVIEDB_KEY

}
