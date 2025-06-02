import { defineStore } from "pinia";
import type { Jokes } from "~/types/jokes";
import type { User } from "~/types/user";

export const useUserStore = defineStore("useUserStore", {
  state: () => {
    return {
      user: {} as User,
      userId: "",
      isLoggedIn: false,
      myFavourites: {} as Jokes,
    };
  },
  actions: {
    async setUserInfo(object: Object) {
      this.user = object;
    },
  },
});
