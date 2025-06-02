import { defineStore } from "pinia";
import type { Jokes } from "~/types/jokes";
export const useJokeStore = defineStore("useJokeStore", {
  state: () => {
    return {
      jokes: {} as Jokes,
    };
  },
});
