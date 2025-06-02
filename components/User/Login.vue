<script setup lang="ts">
import { useUserStore } from "~/store/user";
import type { User } from "~/types/user";
const userId = ref("");

const userIdSet = ref<Boolean>(false);
const userInfo = ref<User>({
  name: "",
  favoriteJokes: [],
  totalJokesViewed: 0,
});

const userStore = useUserStore();
const handleUserIdSubmit = () => {
  if (userId.value.trim()) {
    const newUserInfo = {
      name: userId.value.trim(),
      favoriteJokes: [],
      totalJokesViewed: 0,
    };

    userInfo.value = newUserInfo;
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    userStore.setUserInfo(newUserInfo);
    userIdSet.value = true;
    userStore.isLoggedIn = true;
  }
};
</script>

<template>
  <div
    class="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20"
  >
    <div class="text-center mb-8">
      <div
        class="w-20 h-20 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
      >
        <span class="text-3xl">😂</span>
      </div>
      <h1 class="text-4xl font-bold text-white mb-2">Jokify</h1>
      <p class="text-white/70">Your daily dose of laughter</p>
    </div>

    <form @submit.prevent="handleUserIdSubmit" class="space-y-6">
      <div>
        <input
          v-model="userId"
          type="text"
          required
          class="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all backdrop-blur-sm"
          placeholder="Enter your name"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Join Jokify
      </button>
    </form>
  </div>
</template>
