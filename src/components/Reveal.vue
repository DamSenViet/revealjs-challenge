<template>
  <div class="reveal">
    <div class="slides">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
import Reveal from "reveal.js";

export default {
  name: "Reveal",
  
  data() {
    return {
      deck: null,
    };
  },

  async mounted() {
    this.deck = new Reveal(this.$el, {
      embedded: true,
      keyboard: {
        27: null,
        70: null,
        },
      });
    await this.deck.initialize();
    await this.layout();
  },
  
  methods: {
    async layout() {
    await this.$nextTick();
      this.deck.layout();
    }
  }
};
</script>

<style lang="scss" scoped>
.reveal {
  font-size: 16px;
}

.slides {
  display: grid;
  grid-row: auto;
  grid-column: auto;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
}
</style>