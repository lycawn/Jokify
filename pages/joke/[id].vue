<script setup lang="ts">
import { useJokeStore } from "~/store/jokes";

definePageMeta({
  name: "joke",
  path: "/joke/:id",
  title: "joke",
});

const route = useRoute();
const jokeStore = useJokeStore();
const favouriteJoke = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const jokeId = route.params.id;
    if (jokeId) {
      await jokeStore.setFavouriteJoke(jokeId);
      favouriteJoke.value = jokeStore.favouriteJoke;
    }
  } catch (err) {
    error.value = "Failed to load joke";
    console.error("Error loading joke:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800"
  >
    <jokes-header-table></jokes-header-table>
    <main
      class="container mx-auto px-4 py-12 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
    >
      <div class="max-w-3xl mx-auto">
        <div v-if="loading" class="text-center py-20">
          <div
            class="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"
          ></div>
          <p class="text-white/80 text-xl">Loading your joke...</p>
        </div>

        <div v-else-if="error" class="text-center py-20">
          <div class="text-6xl mb-4">😵</div>
          <h2 class="text-2xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p class="text-white/70 text-lg">{{ error }}</p>
          <NuxtLink
            to="/"
            class="inline-block mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            ← Back to Home
          </NuxtLink>
        </div>

        <div v-else-if="favouriteJoke" class="space-y-8">
          <header class="text-center">
            <h1
              class="text-4xl font-black text-white mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"
            >
              🎭 Featured Joke
            </h1>
            <p class="text-white/70">Joke #{{ favouriteJoke.id }}</p>
          </header>

          <div
            class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
          >
            <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div class="flex flex-wrap items-center gap-3">
                <span
                  class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg"
                >
                  {{ favouriteJoke.type?.toUpperCase() || "GENERAL" }}
                </span>
                <span
                  class="bg-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  #{{ favouriteJoke.id }}
                </span>
              </div>

              <div class="flex items-center gap-2">
                <span class="text-2xl">❤️</span>
                <span class="text-white/80 text-sm">Favorite</span>
              </div>
            </div>

            <div class="space-y-6">
              <div
                class="text-white text-2xl font-semibold leading-relaxed p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10"
              >
                "{{ favouriteJoke.setup }}"
              </div>

              <div
                class="bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 text-yellow-100 text-2xl font-bold p-8 rounded-3xl border border-yellow-400/30 backdrop-blur-sm shadow-xl"
              >
                <div class="flex items-center gap-4">
                  <span class="text-4xl">💫</span>
                  <span>{{ favouriteJoke.punchline }}</span>
                  <span class="text-4xl">😄</span>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <NuxtLink
              to="/"
              class="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-3xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-500"
            >
              <span class="flex items-center gap-3">
                <span>←</span>
                <span>Back to Generator</span>
              </span>
            </NuxtLink>
          </div>
        </div>

        <div v-else class="text-center py-20">
          <div class="text-6xl mb-4">🤷‍♂️</div>
          <h2 class="text-2xl font-bold text-white mb-4">Joke Not Found</h2>
          <p class="text-white/70 text-lg mb-6">
            The joke you're looking for doesn't exist or has been removed.
          </p>
          <NuxtLink
            to="/"
            class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            ← Discover New Jokes
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
