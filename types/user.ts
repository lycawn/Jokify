import type { Jokes } from "./jokes";

type User = {
  username: string;
  favouriteJokes: Array<Jokes>;
};

export type { User };
