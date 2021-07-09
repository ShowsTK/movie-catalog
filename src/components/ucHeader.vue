<template>
  <div class="header">
    <div class="head-comp nameSite">Movie Catalog</div>
    <uc-search-box class="head-comp searchbox" @userOnInput="search" :opts="searchParams"></uc-search-box>
    <a href="#" class="head-comp authLink">Войти</a>
  </div>
</template>

<script>
  import ucSearchBox from './ucSearchBox';
  //import {config} from '../config';

  export default {
    name: "ucHeader",
    components: {ucSearchBox},
    data() {
      return {
        searchParams: {} //config.search
      }
    },
    methods: {
      search(searchData,searchingText) {
        this.$emit('showData', searchData, searchingText)
      }
    }
  }

</script>

<style scoped>
  .header {
    background: #8f0003;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    color: yellow;
    box-shadow: 0 0 6px inset #fff;
    border-radius: 3px;
  }
  .nameSite {
    font-size: 1.8rem;
  }
  .searchbox {
    width: 60%;
    //max-width: 60%;
    min-width: 200px;
    //height: 20px;
  }
</style>
