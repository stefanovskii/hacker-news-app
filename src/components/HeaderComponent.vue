<template>
  <header class="header">
    <div class="logo">
      <img src="hackerNewsLogo">
      <span>Search Hacker News</span>
    </div>
    <div class="search-container">
      <input v-model="searchQuery" @input="emitSearch" class="search-bar"
        placeholder="Search stories by title, URL or author" />
      <div class="powered-by">
        <span>by Algolia</span>
      </div>
    </div>

  </header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'; 

library.add(faSearch);

export default {
  name: "HeaderComponent",
  components: FontAwesomeIcon,
  data() {
    return {
      searchQuery: "",
      timeFilter: "last24h",
      hackerNewsLogo: require("@/assets/hacker_news.png")
    };
  },
  methods: {
    emitSearch() {
      this.$emit("search-input", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f6f6ef;
  border-bottom: 1px solid #ccc;
}

.search-container {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f6f6ef;
  flex: 5;
}

.search-bar {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.powered-by {
  margin-left: 10px;
  font-size: 12px;
  color: #888;
  display: flex;
  align-items: center;
}

.powered-by span {
  margin-left: 5px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
  color: grey;
  flex: 1;
}

.search-bar {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 15px;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>