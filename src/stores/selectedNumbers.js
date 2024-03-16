import { defineStore } from "pinia";

export const useSelectedNumbersStore = defineStore("selectedNumbers", {
  state: () => ({
    selectedNumbers: []
  }),
  persist: true
});
