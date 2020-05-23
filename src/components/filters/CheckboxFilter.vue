<template>
  <b-form-group>
    <b-form-checkbox-group
      v-model="value"
      :options="options"
      :name="filterKey"
      @change="change"
    ></b-form-checkbox-group>
  </b-form-group>
</template>

<script>
export default {
  name: "CheckboxFilter",
  props: ["filterKey"],
  data() {
    return {
      selected: null
    };
  },
  computed: {
    options () {
      let opts = this.$store.state.data.filterOptions[this.filterKey]
      return opts && opts.map(el => {
              return {
                text: el,
                value: el
              }
            })
    },
    value () {
      return this.$store.state.data.filters[this.filterKey]
    }
  },
  methods: {
    change(val) {
      this.$emit('change', {filterKey: this.filterKey, val: val})
    }
  }
};
</script>

<style lang="stylus" scoped></style>
