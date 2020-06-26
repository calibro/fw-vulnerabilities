<template>
  <div
    class="filter-sidebar"
    v-bind:class="{ open: isOpen }"
    v-click-outside="hide"
  >
    <div class="button-container">
      <b-button
        class="button-toggle-filter d-flex align-items-center justify-content-center"
        pill
        variant="outline-secondary"
        @click="toggleSidebar"
      >
        <b-icon-funnel v-if="!isOpen"></b-icon-funnel>
        <b-icon-x v-if="isOpen"></b-icon-x>
      </b-button>
    </div>
    <div class="filters-container">
      <div class="filter-header">
        <div class="filter-title">Filters</div>
        <div class="filter-reset" @click="() => this['data/resetFilters']()">
          RESET
        </div>
      </div>
      <div class="filter-list" role="tablist">
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-1
            role="tab"
          >
            Real target
            <span
              class="active-filter-marker"
              v-if="isFilterActive('vit_u_real_target')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-1"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <group-list-filter
                filterKey="vit_u_real_target"
                @change="onChangeFilter"
              ></group-list-filter>
            </div>
          </b-collapse>
        </div>
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-2
            role="tab"
          >
            CVSS Score
            <span
              class="active-filter-marker"
              v-if="isFilterActive('vit_u_cvss_score')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-2"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <range-filter
                filterKey="vit_u_cvss_score"
                @change="onChangeFilter"
              ></range-filter>
            </div>
          </b-collapse>
        </div>
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-3
            role="tab"
          >
            Priority
            <span
              class="active-filter-marker"
              v-if="isFilterActive('vit_priority')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-3"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <checkbox-filter
                filterKey="vit_priority"
                @change="onChangeFilter"
              ></checkbox-filter>
            </div>
          </b-collapse>
        </div>
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-4
            role="tab"
          >
            State
            <span
              class="active-filter-marker"
              v-if="isFilterActive('vit_state')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-4"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <checkbox-filter
                filterKey="vit_state"
                @change="onChangeFilter"
              ></checkbox-filter>
            </div>
          </b-collapse>
        </div>
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-5
            role="tab"
          >
            Close Code
            <span
              class="active-filter-marker"
              v-if="isFilterActive('vit_u_close_code')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-5"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <checkbox-filter
                filterKey="vit_u_close_code"
                @change="onChangeFilter"
              ></checkbox-filter>
            </div>
          </b-collapse>
        </div>
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-6
            role="tab"
          >
            Team Aziendale
            <span
              class="active-filter-marker"
              v-if="isFilterActive('usr_u_business_unit')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-6"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <checkbox-filter
                filterKey="usr_u_business_unit"
                @change="onChangeFilter"
              ></checkbox-filter>
            </div>
          </b-collapse>
        </div>
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-7
            role="tab"
          >
            Year
            <span
              class="active-filter-marker"
              v-if="isFilterActive('vit_u_year')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-7"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <checkbox-filter
                filterKey="vit_u_year"
                @change="onChangeFilter"
              ></checkbox-filter>
            </div>
          </b-collapse>
        </div>
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-8
            role="tab"
          >
            Esposizione
            <span
              class="active-filter-marker"
              v-if="isFilterActive('dmp_u_esposizione')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-8"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <checkbox-filter
                filterKey="dmp_u_esposizione"
                @change="onChangeFilter"
              ></checkbox-filter>
            </div>
          </b-collapse>
        </div>
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-9
            role="tab"
          >
            Source
            <span
              class="active-filter-marker"
              v-if="isFilterActive('vit_source')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-9"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <checkbox-filter
                filterKey="vit_source"
                @change="onChangeFilter"
              ></checkbox-filter>
            </div>
          </b-collapse>
        </div>
        <div class="filter-block">
          <div
            class="filter-according-toggle"
            v-b-toggle.accordion-10
            role="tab"
          >
            Remediation supervisor
            <span
              class="active-filter-marker"
              v-if="isFilterActive('vit_u_handler')"
            ></span>
            <b-icon-chevron-up class="caret"></b-icon-chevron-up>
          </div>
          <b-collapse
            id="accordion-10"
            accordion="filter-accordion"
            role="tabpanel"
          >
            <div class="filter-body">
              <group-list-filter
                filterKey="vit_u_handler"
                @change="onChangeFilter"
              ></group-list-filter>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import CheckboxFilter from "./filters/CheckboxFilter";
import RangeFilter from "./filters/RangeFilter";
import GroupListFilter from "./filters/GroupListFilter";

import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "FilterSidebar",
  components: {
    RangeFilter,
    CheckboxFilter,
    GroupListFilter
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    filterList() {
      return filterColumns;
    }
  },
  methods: {
    ...mapMutations(["data/setFilterValue", "data/resetFilters"]),
    isFilterActive(filterKey) {
      return this.$store.getters["data/isFilterActive"](filterKey);
    },
    onChangeFilter(filterName, val) {
      this["data/setFilterValue"](filterName, val);
    },
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    hide() {
      this.isOpen = false;
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style lang="stylus" scoped>
.filter-sidebar
  height 100%
  max-width 400px
  position absolute
  right -350px
  transition all 0.3s
  display flex
  border-left 1px solid #ccc
  background #fff
  overflow-y scroll
  &.open
    right 0px
  .button-container
    flex 0 0 50px
    display flex
    justify-content center
    margin-top 10px
    .button-toggle-filter
      border-radius: 50% 50% !important;
      width: 34px;
      height: 34px;
      padding 0px
  .filters-container
    flex 1 0 auto
    margin-top 15px
    margin-right 15px
    margin-left 5px
    .filter-header
      display flex
      flex-direction row
      border-bottom 1px solid #ccc
      padding-bottom 10px
      margin-bottom 10px
      align-items center
      .filter-title
        font-weight bold
      .filter-reset
        margin-left auto
        cursor pointer
        font-size 0.875rem
        &:hover
          text-decoration underline
    .filter-block
      border-bottom 1px solid #ccc
      padding 10px 0px
      margin 10px 0px
      .filter-according-toggle
        text-transform uppercase
        font-size 0.75rem
        display flex
        cursor pointer
        justify-content center
        align-items center
        .active-filter-marker
          display inline-block
          width 10px
          height 10px
          border-radius 5px
          background #ffc107
          margin-left 5px
        .caret
          margin-left auto
          transition transform 0.3s
        &.collapsed
          .caret
            transform rotate(180deg)
      .filter-body
        margin-top 10px
        max-width: 305px
</style>
