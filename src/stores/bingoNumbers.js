import { defineStore } from "pinia";

export const useBingoNumbersStore = defineStore("bingoNumbers", {
  state: () => ({
    countNumber: 0,
    drawnNumber: null,
    selectedNumbers: [],
    normalSelectedNumbers: []
  }),
  persist: true
});
