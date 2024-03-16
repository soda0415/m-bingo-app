import { defineStore } from "pinia";

export const useNormalSelectedNumbersStore = defineStore("normalSelectedNumbers", {
  state: () => ({
    normalSelectedNumbers: []
  }),
  persist: true
});
