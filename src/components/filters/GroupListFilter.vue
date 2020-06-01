<template>
  <div class="group-list-filter">
    <div class="group-list-filter-controls">
      <b-form-input
        v-model="searchTerm"
        placeholder="Search"
        class="search-input"
      ></b-form-input>
      <div class="select-deselect-all">
        <span @click="selectAll" class="select-all">Select all</span> /
        <span @click="deselectAll" class="select-all">Deselect all</span>
      </div>
    </div>
    <div class="group-list">
      <div v-for="item in filteredOption" :key="'g' + item.id">
        <input
        type="checkbox"
        :checked="activeValues.includes(String(item.id))"
        :name="item.id"
        class="item-checkbox"
        @click="toggleValue(item.id)"
        />
        {{item.label}} ({{item.count}})
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'

export default {
  name: "GroupListFilter",
  props: ["filterKey"],
  data() {
    return {
      searchTerm: ""
    };
  },
  computed: {
    filteredOption () {
      return this.searchTerm.length > 0 ? this.options.filter(el => el.label.includes(this.searchTerm)) : this.options
    },
    options () {
      let opts = this.$store.state.data.filterOptions[this.filterKey]
      let allData = this.$store.state.data.csvData
      return opts && opts.map(key => {
              return {
                id: key,
                label: 'Application ' + key,
                // Should we count the original dataset or the filtered one?
                count: allData.filter(e => e[this.filterKey] == key).length
              }
            })
    },
    activeValues() {
      return this.$store.state.data.filters[this.filterKey]
    }
  },
  methods: {
    toggleValue (id) {
      let vals = this.activeValues.slice()
      if (vals.includes(id)) {
        vals.splice(vals.indexOf(id), 1)
      } else {
        vals.push(id)
      }
      this.$emit('change', {filterKey: this.filterKey, val: vals})
    },
    selectAll() {
      let addVals = this.filteredOption.map(e => e.id)
      let vals = _.union(addVals, this.activeValues)

      this.$emit('change', {filterKey: this.filterKey, val: vals})
    },
    deselectAll() {
      let remVals = this.filteredOption.map(e => e.id)
      let vals = _.difference(this.activeValues, remVals)

      this.$emit('change', {filterKey: this.filterKey, val: vals})
    }
  }
};
</script>

<style lang="stylus" scoped>
.group-list-filter
  max-height 40vh
  overflow scroll
  .group-list-filter-controls
    padding 5px 5px 10px 5px
    position sticky
    top 0px
    z-index 1
    background-color white
    .select-deselect-all
      margin-top 7px
      span
        cursor pointer
        text-decoration underline
</style>
