<template>
  <div class="reveal" ref="el">
    <div class="slides">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
import Reveal from "reveal.js";

export default {
  name: "Reveal",
  
  setup(props, { root }) {
    const el = ref(null);
    const deck = ref(null);
    
    // update layout
    const layout = async () => {
      await root.$nextTick();
      deck.value.layout();
    };
    
    onMounted(async () => {
      deck.value = new Reveal(el.value, {
        // manually control layout
        // disableLayout: true,
        embedded: true,
        keyboard: {
          27: null,
          70: null,
        }
      });
      await deck.value.initialize();
    });
    
    
    return {
      el,
      layout,
    };
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