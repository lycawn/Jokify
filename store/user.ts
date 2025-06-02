import { defineStore } from "pinia";
import type { User } from "~/types/user";

export const useUserStore = defineStore("useUserStore", {
  state: () => {
    return {
      user: {} as User,
      userId: "",
      isLoggedIn: false,
    };
  },
  actions: {
    async setUserInfo(object: Object) {
      this.user = object;
    },
  },
});
