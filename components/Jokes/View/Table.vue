<script setup lang="ts">
import { truncText } from "~/composables/utils/usables";
import { useJokeStore } from "~/store/jokes";
import { useUserStore } from "~/store/user";
import type { Jokes } from "~/types/jokes";
import type { User } from "~/types/user";

const loading = ref(false);
const isRevealed = ref(false);
const userStore = useUserStore();
const jokeStore = useJokeStore();
const currentJoke = ref<Jokes>(jokeStore.randomJoke);
const userInfo = ref<User>(userStore.user);
const searchQuery = ref("");

const getRandomJoke = async () => {
  loading.value = true;
  isRevealed.value = false;

  try {
    if (!jokeStore.selectedType) {
      await jokeStore.setRandomJoke();
      currentJoke.value = jokeStore.randomJoke;
    } else {
      await jokeStore.setRandomTypeJoke(jokeStore.selectedType);
      currentJoke.value = jokeStore.randomJoke[0];
    }

    userStore.user.totalJokesViewed++;
    localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
    userStore.setUserInfo(userInfo.value);

    loading.value = false;
  } catch (error) {
    console.error("Error fetching joke:", error);
    loading.value = false;
  }
};

const searchFavourites = computed(() => {
  return searchQuery.value
    ? userInfo.value.favoriteJokes.filter((item) => {
        return item.setup
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      })
    : userInfo.value.favoriteJokes;
});

const removeFavourites = (jokeId) => {
  const favorites = userInfo.value.favoriteJokes;
  userInfo.value.favoriteJokes = favorites.filter((joke) => joke.id !== jokeId);
  localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
};
const toggleFavoriteWithRating = (rating = null) => {
  if (!currentJoke.value) return;

  const jokeId = currentJoke.value.id;
  const favorites = userInfo.value.favoriteJokes;

  const existingFavoriteIndex = favorites.findIndex(
    (joke) => joke.id === jokeId
  );

  if (existingFavoriteIndex !== -1) {
    if (rating !== null) {
      userInfo.value.favoriteJokes[existingFavoriteIndex] = {
        ...userInfo.value.favoriteJokes[existingFavoriteIndex],
        rating: rating,
      };
    } else {
      userInfo.value.favoriteJokes = favorites.filter(
        (joke) => joke.id !== jokeId
      );
    }
  } else {
    const favoriteJoke = {
      ...currentJoke.value,
      rating: rating || null,
    };
    userInfo.value.favoriteJokes = [...favorites, favoriteJoke];
  }

  localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
  userStore.setUserInfo(userInfo.value);
};

const isJokeFavorited = computed(() => {
  return (
    currentJoke.value &&
    userInfo.value.favoriteJokes.some(
      (joke) => joke.id === currentJoke.value.id
    )
  );
});

const revealJoke = () => {
  isRevealed.value = true;
};

const getCurrentRating = () => {
  if (!currentJoke.value || !isJokeFavorited.value) return 0;

  const favoriteJoke = userInfo.value.favoriteJokes.find(
    (joke) => joke.id === currentJoke.value.id
  );

  return favoriteJoke?.rating || 0;
};
</script>

<template>
  <main
    class="container mx-auto px-4 py-12 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
  >
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1
          class="text-5xl font-black text-white mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"
        >
          🎭 Get Jokified
        </h1>
        <p class="text-xl text-white/80 font-light">
          Discover endless laughter with our collection of jokes
        </p>
      </header>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="getRandomJoke"
              :disabled="loading"
              class="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold py-5 px-8 rounded-3xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              ></div>
              <span
                v-if="loading"
                class="flex items-center justify-center gap-3"
              >
                <div
                  class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"
                ></div>
                <span class="text-lg">Crafting Magic...</span>
              </span>
              <span
                v-else
                class="flex items-center justify-center gap-3 text-lg"
              >
                <span class="text-2xl">🎲</span>
                Get New Joke
              </span>
            </button>

            <button
              v-if="
                currentJoke &&
                currentJoke.setup &&
                currentJoke.punchline &&
                !isRevealed
              "
              @click="revealJoke"
              class="flex-1 group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold py-5 px-8 rounded-3xl hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-500"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              ></div>
              <span class="flex items-center justify-center gap-3 text-lg">
                <span class="text-2xl">✨</span>
                Reveal Punchline
              </span>
            </button>
          </div>

          <div
            v-if="currentJoke"
            class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8"
            >
              <div class="flex flex-wrap items-center gap-3">
                <span
                  class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg"
                >
                  {{ currentJoke.type?.toUpperCase() || "GENERAL" }}
                </span>
              </div>

              <div class="flex gap-2">
                <button
                  v-for="rating in [1, 2, 3, 4, 5]"
                  v-if="currentJoke.setup"
                  :key="rating"
                  @click="toggleFavoriteWithRating(rating)"
                  class="group p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  :title="`Rate ${rating} stars`"
                >
                  <span v-if="isJokeFavorited" class="text-2xl animate-pulse">
                    {{ rating <= getCurrentRating() ? "❤️" : "☆" }}
                  </span>
                  <span
                    v-else
                    class="text-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    ❤️
                  </span>
                </button>

                <button
                  v-if="isJokeFavorited"
                  @click="toggleFavoriteWithRating(null)"
                  class="group p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  title="Remove from favorites"
                >
                  <span class="text-2xl">🗑️</span>
                </button>
              </div>
            </div>

            <div class="mb-8">
              <div
                class="text-white text-2xl font-semibold leading-relaxed p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10"
              >
                "{{ currentJoke.setup }}"
              </div>
            </div>

            <div
              v-if="isRevealed && currentJoke.punchline"
              class="reveal-punchline"
            >
              <div class="punchline-container">
                <div class="punchline-content">
                  <span class="emoji-left">💫</span>
                  <span class="punchline-text">{{
                    currentJoke.punchline
                  }}</span>
                  <span class="emoji-right">😄</span>
                </div>
                <div class="sparkle-effect">
                  <div class="sparkle"></div>
                  <div class="sparkle"></div>
                  <div class="sparkle"></div>
                  <div class="sparkle"></div>
                </div>
              </div>
            </div>

            <div
              v-else-if="currentJoke.punchline || currentJoke.delivery"
              class="text-center py-12"
            >
              <div class="text-6xl mb-4 opacity-30">🤔</div>
              <p class="text-white/50 text-lg italic">
                Click "Reveal Punchline" for the big laugh...
              </p>
            </div>
          </div>

          <div v-if="!currentJoke && !loading" class="text-center py-20">
            <div class="mb-8">
              <div class="text-8xl mb-6 animate-bounce">🎭</div>
              <h2 class="text-3xl font-bold text-white mb-4">
                Ready for Some Laughs?
              </h2>
              <p class="text-xl text-white/70">
                Click "Get New Joke" to start your comedy journey!
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div
            class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <label
              for="joke-type"
              class="block text-lg font-semibold text-white mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">🎯</span>
              Choose Category
            </label>
            <select
              id="joke-type"
              v-model="jokeStore.selectedType"
              class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 outline-none transition-all backdrop-blur-sm"
            >
              <option value="" class="text-gray-800">All Types</option>
              <option
                v-for="type in jokeStore.getTypes"
                :key="type"
                :value="type"
                class="text-gray-800"
              >
                {{ type.charAt(0).toUpperCase() + type.slice(1) }} Jokes
              </option>
            </select>
          </div>

          <div
            v-if="userStore.user?.favoriteJokes?.length > 0"
            class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <h3
              class="text-white font-bold text-xl mb-6 flex items-center gap-3"
            >
              <span class="text-2xl">💝</span>
              <span>Your Collection</span>
              <span
                class="bg-pink-500 text-white text-sm px-2 py-1 rounded-full"
              >
                {{ userStore.user.favoriteJokes.length }}
              </span>
            </h3>
            <br />

            <input
              v-model="searchQuery"
              id="search"
              type="text"
              placeholder="Search...🔍"
              class="rounded-sm bg-pink-50 text-black px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300 mb-2"
            />

            <div class="grid grid-cols-2 gap-3 mb-4">
              <div
                v-for="joke in searchFavourites.slice(0, 8)"
                :key="joke.id"
                class="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white text-center py-3 px-3 rounded-xl text-sm font-semibold border border-white/20 hover:scale-105 transition-transform cursor-pointer"
              >
                <NuxtLink :to="`/joke/${joke.id}`">
                  {{ truncText(joke.setup || joke.joke) }}</NuxtLink
                >
                <br />

                <span class="text-xs" v-for="rating in joke.rating">⭐</span>
                <br />
                <span class="text-lg" @click="removeFavourites(joke.id)"
                  >🗑️
                </span>
              </div>
            </div>
            <p
              v-if="userStore.user.favoriteJokes?.length > 8"
              class="text-white/70 text-sm text-center bg-white/5 py-2 px-4 rounded-xl"
            >
              Plus {{ userStore.user.favoriteJokes.length - 8 }} more favorites!
              ✨
            </p>
          </div>

          <div
            class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <h4
              class="text-white font-bold text-lg mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">📊</span>
              Your Stats
            </h4>
            <div class="space-y-3">
              <div class="flex justify-between items-center text-white/90">
                <span>Jokes Viewed:</span>
                <span class="font-bold text-xl text-yellow-400">{{
                  userStore.user?.totalJokesViewed || 0
                }}</span>
              </div>
              <div class="flex justify-between items-center text-white/90">
                <span>Favorites:</span>
                <span class="font-bold text-xl text-pink-400">{{
                  userStore.user?.favoriteJokes?.length || 0
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
