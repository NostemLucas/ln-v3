export const useSidebarStore = defineStore("sidebar", {
  state: () => ({ isOpen: false, isMobile: false }),
  /*  getters: {
    doubleCount: (state) => state.count * 2,
  },
  */
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
