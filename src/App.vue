<template>
  <div id="app">
    <header id="header">
      <uc-header @showData="getData"></uc-header>
      <div class="search-result"
           v-show="searchingText!==''">
        You search for: "<em>{{searchingText}}</em>", <em>{{searchedResult}}</em> results found
      </div>
    </header>
    <main>
      <div class="paginator__wrap">
        <paginate
                :page-count="Math.ceil(searchedResult / 10)"
                :force-page="currentPageNum"
                :page-range="5"
                :margin-pages="0"
                :break-view-class="'paginator__break-view'"
                :click-handler="pageOnClick"
                :container-class="'paginator'"
                :page-class="'paginator__elem'"
                :page-link-class="'paginator__link'"
                :prev-link-class="'paginator__link'"
                :next-link-class="'paginator__link'"
                :active-class="'paginator__active'"
                :prev-text="'<'"
                :next-text="'>'"
                :first-last-button="true"
                :first-button-text="'<<'"
                :last-button-text="'>>'"
                :hide-prev-next="true">
        </paginate>
      </div>
      <div class="items">
        <div class="item"
             v-for="(item, key) in movieData.Search"
             :key="key"
             @click="getInfoItem(item.imdbID)"
             @mouseup="getBaseInfoCoords">
          <uc-item :item-data="item"></uc-item>
        </div>
      </div>
      <transition name="full-info">
        <div id="full-item-info"
                   v-if="showItemFullInfo"
                   @click="showItemFullInfo=!showItemFullInfo"
                   :style="{left: clickX, top: clickY}">
          <uc-item-full-info :infoData="currentItemFullInfo"></uc-item-full-info>
        </div>
      </transition>
    </main>
  </div>
</template>

<script>
  import ucHeader from './components/ucHeader';
  import ucItem from './components/ucItem';
  import ucItemFullInfo from './components/ucItemFullInfo';
  import paginate from 'vuejs-paginate';
  import {HTTP} from './config';


  export default {
    name: 'app',
    components: {ucHeader, ucItem, paginate, ucItemFullInfo},
    data() {
      return {
        movieData: {},
        searchingText: '',
        searchedResult: '0',
        currentPageNum: 1,
        currentItemFullInfo: {},
        showItemFullInfo: false,
        clickX: 0,
        clickY: 0
      }
    },
    methods: {
      getBaseInfoCoords(e) {
        //console.log(e);
        this.clickX=e.clientX + 'px';
        if ((window.innerWidth - e.clientX) < 400) {
         this.clickX=(e.clientX - 400) + 'px';
        }
        this.clickY=e.clientY + 'px';
      },
      getData(searchedData, searchingText) {
        this.movieData = searchedData;
        searchedData.Search.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)); //sorting in paginator page only
        this.searchingText = searchingText;
        this.searchedResult = searchedData.Response === 'True' ? searchedData.totalResults : '0';
        this.currentPageNum = 1;
      },
      pageOnClick(pageNum) {
        this.currentPageNum = pageNum;
        let params = {};
        params.s = this.searchingText;
        params.page = this.currentPageNum;
        HTTP.request({params})
          .then(response => {
            this.movieData = response.data;
            response.data.Search.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)) //sorting in paginator page only
          })
          .catch(error => console.log(error));
      },
      getInfoItem(id) {
        let params = {};
        params.i = id;
        HTTP.request({params})
          .then(response => this.currentItemFullInfo = response.data)
          //.then(this.makeItemFullInfoBlock())
          .then(this.showItemFullInfo = true)
          .catch(error => console.log(error));

      }
    }
  }

</script>

<style lang="scss">
  @import 'styles/vars';
  html {
    background: $color-back;
  }
#app {
  font-family: "Arial";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $base-color-text;
  min-width: 320px;
  max-width: $content-max-width;
  margin: 0 auto;
  padding: 20px;
  background: rgb(0, 27, 23);
  height: 100vh;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #ffd33a;
}

em {
  color: lightgreen;
}
#header {
  width: 100%
}
.search-result {
  padding-top: 20px;
  font-size: 1.22rem;
}
.items {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.item {
  margin: 20px;
  width: calc(100% / 5  - 40px);
  cursor: pointer;
  font-size: 1rem;
  box-sizing: border-box;
}
.item:hover {
  opacity: 0.7;
}

.paginator {
  &__wrap {
    text-align: center;
  }
  &__elem {
    margin: 0 5px;
  }
  &__link {
    color: #007fc5;
    padding: 0 3px;
    &:hover {}
  }
  &__active {
    font-weight: 600;
    font-size: 1.3rem;
  }
  &__break-view {
    display: none;
  }
}

#full-item-info {
  position: absolute;
}

.full-info-enter, .full-info-leave-to {
  transform: translateX(20px);
  opacity: 0;
  //animation: show-hide 1s;
}

  /*.full-info-leave-to {
    animation: show-hide 1s reverse;
  }*/

.full-info-enter-active, .full-info-leave-active {
  //transition: opacity 1s;
  transition: all 1.5s;
}
/* {
  width: auto;
  height: auto;
}*/
  @keyframes show-hide {
    0% {width: 0; height: 0;}
    100% {width: 500px; height: auto;}
  }

@media screen and (max-width: 1024px) {
  .item {
    width: calc(100% / 4 - 40px);
  }
}
@media screen and (max-width: 768px) {
  .item {
    width: calc(100% / 3 - 40px);
  }
}
@media screen and (max-width: 576px) {
  .item {
    width: calc(100% / 2 - 40px);
  }
}
@media screen and (max-width: 400px) {
  .item {
    width: 100%;

  }
}
</style>
