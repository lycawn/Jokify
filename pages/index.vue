<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useJokeStore } from "~/store/jokes";
import { useUserStore } from "~/store/user";
import type { User } from "~/types/user";

const userStore = useUserStore();

const userIdSet = ref<Boolean>(false);
const userInfo = ref<User>({
  name: "",
  favoriteJokes: [],
  totalJokesViewed: 0,
});

onMounted(() => {
  const savedUserInfo = localStorage.getItem("userInfo");
  setTimeout(() => {
    if (savedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(savedUserInfo);
        userInfo.value = parsedUserInfo;
        userStore.setUserInfo(parsedUserInfo);
        userIdSet.value = true;
        userStore.isLoggedIn = true;
      } catch (error) {
        console.error("Error parsing user info:", error);
        localStorage.removeItem("userInfo");
      }
    }
  }, 500);
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"
  >
    <div
      v-if="!userStore.isLoggedIn"
      class="flex items-center justify-center min-h-screen p-4"
    >
      <user-login></user-login>
    </div>

    <div v-else class="min-h-screen">
      <JokesTable></JokesTable>
    </div>
  </div>
</template>
