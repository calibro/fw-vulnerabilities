<template>
  <div class="fw-input">
    <label class="fw-option-select-label">{{ label }}</label>
    <div class="d-flex align-items-center mt-2">
      <div v-if="label_min" class="s-label">{{ label_min }}</div>
      <b-form-input
        type="range"
        :value="value"
        @input="onInput"
        :min="min"
        :max="max"
        class="fw-slider"
      ></b-form-input>
      <div v-if="label_max" class="s-label">{{ label_max }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FWInput",
  props: ["label", "value", "max", "min", "label_min", "label_max"],
  methods: {
    onInput(evt) {
      this.$emit("input", evt);
    }
  }
};
</script>

<style lang="stylus" scoped>
.fw-input
  display: flex
  flex-direction: column
.s-label
  font-size: 0.75rem
  color: #495057
  margin: 0 5px
.fw-slider::-webkit-slider-thumb
  background: #ffc107
.fw-slider::-moz-range-thumb
    background: #ffc107
</style>
