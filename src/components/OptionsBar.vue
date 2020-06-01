<template>
  <b-container class="options-bar">
    <b-row>
      <b-col sm="4">
        <data-selector></data-selector>
      </b-col>
      <b-col sm="2">
        TO ADD: dot size
      </b-col>
      <b-col sm="2">
        <fw-select
          label="Sort by"
          :value="sortBy"
          @change="setSortBy"
          :options="sortOptions"
        >
        </fw-select>
      </b-col>
      <b-col sm="2">
        <fw-select
          label="Group by"
          :value="groupBy"
          @change="setGroupBy"
          :options="groupOptions"
        >
        </fw-select>
      </b-col>
      <b-col sm="2">
        <fw-select
          label="Color by"
          :value="colorBy"
          @change="setColorBy"
          :options="colorOptions"
        ></fw-select>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import DataSelector from "./DataSelector";

export default {
  name: "OptionsBar",
  components: {
    DataSelector
  },
  data() {
    return {
      groupOptions: [
        { value: "State", text: "State" },
        { value: "Close Code", text: "Close code" },
        { value: "Team Aziendale", text: "Team Aziendale" }
      ],
      colorOptions: [
        { value: "Priority", text: "Priority" },
        { value: "Age", text: "Age" },
        { value: "Fattore di Esposizione", text: "Fattore di Esposizione" }
      ],
      sortOptions: [
        { value: "count", text: "Count" },
        { value: "alphabetically", text: "Alphabetically" }
      ]
    };
  },
  computed: {
    ...mapState(["groupBy", "colorBy", "sortBy"])
  },
  methods: {
    ...mapMutations(["setGroupBy", "setColorBy", "setSortBy"])
  }
};
</script>

<style scoped lang="stylus">
.options-bar
  .row
    align-items: flex-end
</style>
