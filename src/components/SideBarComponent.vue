<template>
  <div class="sidebar">
    <ul>
      <li :class="{ active: currentCategory === 'All' }" @click="selectCategory('All')"><font-awesome-icon
          :icon="['far', 'newspaper']" />All</li>
      <li :class="{ active: currentCategory === 'Hot' }" @click="selectCategory('Hot')"><font-awesome-icon
          :icon="['fas', 'fire-flame-curved']" />Hot</li>
      <li :class="{ active: currentCategory === 'Show HN' }" @click="selectCategory('Show HN')">
        <font-awesome-icon :icon="['fas', 'tv']" />Show HN</li>
      <li :class="{ active: currentCategory === 'Ask HN' }" @click="selectCategory('Ask HN')">
        <font-awesome-icon :icon="['far', 'comment']" />Ask HN</li>
      <li :class="{ active: currentCategory === 'Polls' }" @click="selectCategory('Polls')">
        <font-awesome-icon :icon="['fas', 'lightbulb']" />Polls</li>
      <li :class="{ active: currentCategory === 'Jobs' }" @click="selectCategory('Jobs')">
        <font-awesome-icon :icon="['fas', 'briefcase']" />Jobs</li>
      <li :class="{ active: currentCategory === 'Shipow' }" @click="selectCategory('Shipow')">
        <font-awesome-icon :icon="['fas', 'user']" />Shipow</li>
      <li :class="{ active: currentCategory === 'Starred' }" @click="selectCategory('Starred')">
        <font-awesome-icon :icon="['fas', 'star']" />Starred</li>
    </ul>
  </div>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faTv } from '@fortawesome/free-solid-svg-icons';

library.add(faFireFlameCurved, faNewspaper, faStar, faUser, faBriefcase, faLightbulb, faComment, faTv);

export default {
  name: 'SideBar',
  components: FontAwesomeIcon,
  props: {
    currentCategory: String,
  },
  methods: {
    selectCategory(category) {
      this.$emit('categoryChange', category);
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  background-color: #f6f6ef;
  border-right: 1px solid #ccc;
  min-height: 100vh;
}

ul {
  list-style-type: none;
  padding-top: 60px;
  padding-left: 0;
  margin-top: 0;
}

li {
  padding-bottom: 40px;
  cursor: pointer;
}

li.active {
  font-weight: bold;
  color: #ff6600; 
  background-color: #ffe6cc; 
}

</style>
