import { defineStore } from "pinia";

type Nullabel<T> = T | null;
type User = { name: string };

export const useUserStore = defineStore("user", () => {
  const user = ref<Nullabel<User>>(null);
  const isAuthenticated = computed(() => true || user.value !== null);
  const login = (username: string, password: string) => {
    user.value = { name: username };
  }

  return {
    user,
    isAuthenticated,
    login,
  };
});
