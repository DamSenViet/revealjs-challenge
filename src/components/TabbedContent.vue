<template>
  <v-container>
    <v-row :class="{
      'page-row': true,
      'expanded': isExpanded,
      }">
      <section>
        <v-tabs v-model="tab">
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>

          <!-- <v-btn @click="onExpand" elevation="0" class="expand-button">
            <v-icon>mdi-arrow-expand</v-icon>
          </v-btn> -->
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-btn class="close-button" elevation="0" v-if="isExpanded" @click="onExpand">
                <v-icon>mdi-fullscreen-exit</v-icon>
              </v-btn>

              <Reveal
                ref="reveal"
                :class="{
                  presentation: true,
                  expanded: isExpanded,
                }"
              >
                <section>
                  <StackedBarChart class="chart" />
                </section>
                <section>
                  <GDPChart class="chart" />
                </section>
              </Reveal>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text> Filler Content Two </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </section>

      <section v-if="!isExpanded">
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Storyboard
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="d-flex justify-space-between align-center">
                <span>Presentation</span>
                <v-btn elevation="0" @click="onExpand"><v-icon>mdi-motion-play-outline</v-icon></v-btn>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>
    </v-row>
  </v-container>
</template>

<script>
import Reveal from "./Reveal";
import GDPChart from "./GDPChart";
import StackedBarChart from "./StackedBarChart";

export default {
  name: "TabbedContent",

  components: {
    Reveal,
    GDPChart,
    StackedBarChart,
  },

  data() {
    return {
      isExpanded: false,
      tab: null,
      items: ["Tab One", "Tab Two"],
    };
  },

  mounted() {
    window.document.addEventListener("keydown", this.onKeyDown);
  },

  destroyed() {
    window.document.removeEventListener("keydown", this.onKeyDown);
  },

  methods: {
    async onExpand() {
      this.isExpanded = !this.isExpanded;
      await this.$refs.reveal.layout();
    },
    async onKeyDown(event) {
      if (event.keyCode == 27) this.isExpanded = false;
      else if (event.keyCode == 70) this.isExpanded = true;
      await this.$refs.reveal.layout();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-row {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 400px;
  column-gap: 30px;
  padding: 12px;
  &.expanded {
    grid-template-columns: 1fr;
  }
}

.presentation {
  height: 500px;
  & .chart {
    height: 400px;
    width: 500px;
  }

  &.expanded {
    height: 700px;
    & .chart {
      // height: 600px;
      // width: 600px;
    }
  }
}

.expand-button {
  display: block;
  align-self: center;
}

.close-button {
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
}
</style>