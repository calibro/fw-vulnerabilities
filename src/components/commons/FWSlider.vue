<template>
  <div class="fw-input">
    <label class="fw-option-select-label">{{ label }} ({{value}})</label>
    <b-form-input
      type="range"
      :value="value"
      @input="onInput"
      :min="min" :max="max"
    ></b-form-input>
  </div>
</template>

<script>
export default {
  name: "FWInput",
  props: ["label", "value", "max", "min"],
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
</style>
