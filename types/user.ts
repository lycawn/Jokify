import type { Jokes } from "./jokes";

type User = {
  name: string;
  favoriteJokes: Array<Jokes>;
  totalJokesViewed: number;
};

export type { User };
