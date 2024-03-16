import { defineStore } from "pinia";

export const useBingoNumbersStore = defineStore("bingoNumbers", {
  state: () => ({
    selectedNumbers: [],
    normalSelectedNumbers: []
  }),
  persist: true
});
