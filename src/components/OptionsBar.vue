<template>
  <b-container class="options-bar">
    <b-row>
      <b-col sm="2">
        <data-selector></data-selector>
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
          label="Sort by"
          :value="sortBy"
          @change="setSortBy"
          :options="sortOptions"
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
      <b-col sm="2" class="align-self-start d-flex flex-column">
        <fw-slider
          label="Dot size"
          :value="dotSize"
          @input="setDotSize"
          min="2"
          max="10"
          label_min="small"
          label_max="large"
        ></fw-slider>
      </b-col>
      <b-col sm="1" class="align-self-start d-flex flex-column">
        <label class="fw-option-select-label">SLA</label>
        <b-form-checkbox :checked="showSLA" @change="setShowSLA" class="mt-2"
          >Show</b-form-checkbox
        >
      </b-col>
      <b-col sm="1" class="align-self-start d-flex flex-column">
        <label class="fw-option-select-label">Description</label>
        <b-form-checkbox
          :checked="showDescriptionNote"
          @change="setShowDescriptionNote"
          class="mt-2"
          >Show</b-form-checkbox
        >
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
        { value: "vit_state", text: "State" },
        { value: "vit_u_close_code", text: "Close code" },
        { value: "usr_u_business_unit", text: "Team Aziendale" }
      ],
      colorOptions: [
        { value: "vit_priority", text: "Priority" },
        { value: "vit_age", text: "Age" },
        {
          value: "dmp_u_fatturato_esposizione_residuo",
          text: "Fattore di esposizione"
        },
        {
          value: "sir_u_remediation_cost",
          text: "Remediation Cost"
        },
        {
          value: "sir_u_workaround_cost",
          text: "Workaround Cost"
        }
      ],
      sortOptions: [
        { value: "Count", text: "Count" },
        { value: "Alphabetically", text: "Alphabetically" }
      ]
    };
  },
  computed: {
    ...mapState([
      "groupBy",
      "colorBy",
      "sortBy",
      "dotSize",
      "showSLA",
      "showDescriptionNote"
    ])
  },
  methods: {
    ...mapMutations([
      "setGroupBy",
      "setColorBy",
      "setSortBy",
      "setDotSize",
      "setShowSLA",
      "setShowDescriptionNote"
    ])
  }
};
</script>

<style scoped lang="stylus">
.options-bar
  .row
    align-items: flex-end
</style>
