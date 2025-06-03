<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const router = useRouter();

const resetProfile = () => {
  localStorage.removeItem("userInfo");
  window.location.reload();
};
const headerRedirect = () => {
  router.push("/");
};
</script>

<template>
  <header
    class="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50"
  >
    <div class="container mx-auto px-4 py-4">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div
          class="flex items-center gap-3 cursor-pointer"
          @click="headerRedirect"
        >
          <div
            class="w-10 h-10 bg-gradient-to-l to-white rounded-full flex items-center justify-center"
          >
            <span class="text-xl">🎭</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">JOKIFY</h1>
            <p class="text-white/60 text-sm">
              Welcome back, {{ userStore.user?.name }} 👏!
            </p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <span class="text-white/80 text-sm font-semibold"
              >❤️ {{ userStore.user.favoriteJokes?.length }}</span
            >
          </div>
          <div class="bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
            <span class="text-white/80 text-sm font-semibold"
              >👀 {{ userStore.user.totalJokesViewed }}</span
            >
          </div>
          <button
            @click="resetProfile"
            class="bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm cursor-pointer"
            title="Sign Out"
          >
            <span class="font-semibold text-white">SIGN-OUT 🚪</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
