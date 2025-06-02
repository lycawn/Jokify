import {
  getJokeByIdFn,
  getJokeTypesFn,
  getRandomJokeFn,
  getRandomSingleTypeJokeFn,
} from "~/service/joke";
import type { Jokes } from "~/types/jokes";
export const useJokeStore = defineStore("useJokeStore", {
  state: () => {
    return {
      favouriteJoke: {} as Jokes,
      randomJoke: {} as Jokes,
      jokeType: {},
      selectedType: "",
    };
  },
  actions: {
    async setRandomJoke() {
      await getRandomJokeFn().then((res) => {
        this.randomJoke = res;
      });
    },
    async setRandomTypeJoke(jokeType: string) {
      await getRandomSingleTypeJokeFn(jokeType).then((res) => {
        this.randomJoke = res;
      });
    },
    async setTypes() {
      await getJokeTypesFn().then((res) => {
        this.jokeType = res;
      });
    },
    async setFavouriteJoke(id: string) {
      await getJokeByIdFn(id).then((res) => {
        this.favouriteJoke = res;
      });
    },
  },
  getters: {
    getTypes: (state) => state.jokeType,
  },
});
