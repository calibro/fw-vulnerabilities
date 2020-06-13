<template>
  <div class="range-filter">
    <div class="input-block">
      <label>Min</label>
      <b-form-input ref="minInput" :value="minVal" type="number" :min="minRange" :max="Math.min(maxRange, maxVal)" @change="change" step="0.1"></b-form-input>
    </div>
    <div class="input-block">
      <label>Max</label>
      <b-form-input ref="maxInput" :value="maxVal" type="number" :min="Math.max(minRange,minVal)" :max="maxRange" @change="change" step="0.1"></b-form-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RangeFilter',
  props: ['filterKey'],
  computed: {
    range () {
      return this.$store.state.data.filterOptions[this.filterKey]
    },
    value () {
      return this.$store.state.data.filters[this.filterKey]
    },
    minRange () {
      return this.range && this.range.length == 2 ? this.range[0].toFixed(1) : 0
    },
    maxRange () {
      return this.range && this.range.length == 2 ? this.range[1].toFixed(1) : 10
    },
    minVal () {
      return this.value && this.value.length == 2 ? this.value[0].toFixed(1) : 0
    },
    maxVal () {
      return this.value && this.value.length == 2 ? this.value[1].toFixed(1) : 10
    }
  },
  methods: {
    change (val) {
      let min = Math.max(parseFloat(this.$refs.minInput.localValue), this.minRange)
      let max = Math.min(parseFloat(this.$refs.maxInput.localValue), this.maxRange)

      min = Math.min(min, max)
      max = Math.max(min, max)

      this.$refs.minInput.localValue = min
      this.$refs.maxInput.localValue = max
      this.$emit('change', {filterKey: this.filterKey, val: [min, max]})
    }
  }
}
</script>

<style lang="stylus" scoped>
.range-filter
  display flex
  justify-content: space-between
  .input-block
    display flex
    flex-direction column
    width 45%
    label
      font-size 13px
      font-weight bold
</style>