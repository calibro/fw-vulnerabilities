<template>
  <div>
    <tree
      :data="hierarchy"
      :options="treeOptions"
    />
  </div>
</template>

<script>
import LiquorTree from 'liquor-tree'
import * as d3 from "d3";
import { groups } from "d3-array";

export default {
  name: 'HierarchyFilter',
  components: {
    [LiquorTree.name]: LiquorTree
  },
  data () {
    let store = this.$store
    return {
      treeOptions: {
        store: {
          store: store,
          getter: () => {
            return store.getters['data/tree']
          },
          dispatcher(tree) {
            store.dispatch('data/updateHierarchy', tree)
          }
        },
        checkbox: true
      }
    }
  },
  computed: {
    hierarchy () {
      return this.$store.state.data.hierarchy
    }
  }
}
</script>

<style lang="stylus">
.tree-root
  .tree-node.selected
    .tree-content
      background none
  .tree-node:not(.selected)
    .tree-content:hover
      background none
  .tree-checkbox
    height 15px !important
    width 15px !important
    &.checked:after
      transform rotate(45deg) scale(0.5, 0.5)
      top -3px
      left 2px
</style>