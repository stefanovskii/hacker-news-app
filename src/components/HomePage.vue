<template>
    <div id="header">
        <HeaderComponent @search-input="updateQuery" />
    </div>
    <div id="main">
        <div class="sidebar">
            <SideBarComponent :currentCategory="selectedCategory" @categoryChange="handleCategoryChange" />
        </div>
        <div class="post">
            <div class="filters">
                <label for="type-filter">Search</label>
                <select id="type-filter" v-model="selectedType">
                    <option value="All"> All</option>
                    <option value="Stories"> Stories</option>
                    <option value="Comments"> Comments</option>
                    <option value="Ask HN"> Ask HN</option>
                    <option value="Show HN"> Show HN</option>
                    <option value="Launch HN"> Launch HN</option>
                    <option value="Jobs"> Jobs</option>
                    <option value="Polls"> Polls</option>
                </select>

                <label for="popularity-date">by</label>
                <select id="popularity-date" v-model="selectedOption">
                    <option value="popularity">Popularity</option>
                    <option value="date">Date</option>
                </select>

                <label for="date-filter">for</label>
                <select id="date-filter" v-model="selectedDate">
                    <option value="all-time">All Time</option>
                    <option value="last-24h">Last 24h</option>
                    <option value="day">Last Day</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                </select>
            </div>

            <ul class="post-list">
                <li v-for="post in filteredPosts" :key="post.objectID" class="post-item">
                    <div class="post-header">
                        <div class="post-title">
                            <router-link :to="`/items/${post.objectID}`">
                {{ post.title }}
              </router-link>
                        </div>
                    </div>
                    <div class="post-details">
                        <span class="post-points">{{ post.points }} points</span>
                        <span class="post-author">{{ post.author }}</span>
                        <span class="post-time">{{ timeSince(post.created_at) }}</span>
                        <span class="post-url">
                            <a :href="post.url" target="_blank">{{ post.url }}</a>
                        </span>
                        <span class="post-comments">{{ post.num_comments }} comments</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
import HeaderComponent from "./HeaderComponent.vue";
import SideBarComponent from "./SideBarComponent.vue";
import ApiService from "@/services/api";

export default {
    name: "HomePage",
    components: {
        HeaderComponent,
        SideBarComponent
    },

    data() {
        return {
            query: "",
            posts: [],
            selectedType: "All",
            selectedOption: "popularity",
            selectedDate: "all-time",
            selectedCategory: 'Hot'
        };
    },

    computed: {
        filteredPosts() {
            return this.posts.filter((post) => {
                return this.filterByType(post) && this.filterByDate(post);
            })
        }
    },

    methods: {
        async updateQuery(newQuery) {
            this.query = newQuery;
            await this.searchPosts();
        },
        async searchPosts() {
            try {
                this.posts = await ApiService.showPosts(this.query);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        },

        timeSince(dateString) {
            const createdAt = new Date(dateString);
            const now = new Date();
            const seconds = Math.floor((now - createdAt) / 1000);

            let interval = Math.floor(seconds / 31536000);
            if (interval > 1) return `${interval} years ago`;

            interval = Math.floor(seconds / 2592000);
            if (interval > 1) return `${interval} months ago`;

            interval = Math.floor(seconds / 86400);
            if (interval > 1) return `${interval} days ago`;

            interval = Math.floor(seconds / 3600);
            if (interval > 1) return `${interval} hours ago`;

            interval = Math.floor(seconds / 60);
            if (interval > 1) return `${interval} minutes ago`;

            return `${seconds} seconds ago`;
        },


        filterByType(post) {
            if (this.selectedType === "Stories") return post._tags.includes("story");
            if (this.selectedType === "Comments") return post._tags.includes("comment"); // treba da zemam type:comment
            if (this.selectedType === "Ask HN") return post._tags.includes("ask_hn");
            if (this.selectedType === "Show HN") return post._tags.includes("show_hn");
            if (this.selectedType === "Launch HN") return post._tags.includes("launch_hn");
            if (this.selectedType === "Jobs") return post._tags.includes("jobs"); // ne mozham da gi pronajdam vo json file-ot
            if (this.selectedType === "Polls") return post._tags.includes("poll"); // ne mozham da gi pronajdam vo json file-ot
            return true;
        },

        filterByOption(posts) {
            if (this.selectedOption === "popularity") {
                return posts.sort((a, b) => b.points - a.points);
            }

            if (this.selectedOption === "date") {
                return posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }

            return posts;
        },


        filterByDate(post) {
            if (this.selectedDate === "all-time") return true;

            const now = new Date();
            const postDate = new Date(post.created_at);

            if (this.selectedDate === "last-24h") {
                return now - postDate <= 24 * 60 * 60 * 1000;
            }
            if (this.selectedDate === "day") {
                return now - postDate <= 1 * 24 * 60 * 60 * 1000;
            }
            if (this.selectedDate === "month") {
                return now - postDate <= 30 * 24 * 60 * 60 * 1000;
            }
            if (this.selectedDate === "year") {
                return now - postDate <= 365 * 24 * 60 * 60 * 1000;
            }

            return true;
        },
        filterPosts() {
            this.filteredPosts;
        },

        handleCategoryChange(category) {
            this.selectedCategory = category;
        },
    },
    async mounted() {
        await this.searchPosts();
    },
};
</script>

<style>
#main {
    display: flex;
    width: 100%;
    height: 100%;
}

.sidebar {
    flex: 1;
}

.post {
    flex: 5;
    height: 30px;
    min-height: 100vh;
    overflow-y: auto;
}

.post-item {
    list-style-type: none;
}

.post-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.post-item {
    border-bottom: 1px solid #ddd;
    padding: 20px 15px;
}

.post-header {
    margin-bottom: 5px;
}

.post-title a {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color: #0073e6;
}

.post-title a:hover {
    text-decoration: underline;
}

.post-details {
    font-size: 14px;
    color: #555;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 5px;
}

.post-details span {
    display: inline-block;
    margin-right: 15px;
}

.post-points {
    font-weight: bold;
    color: #000;
}

.post-author {
    color: #555;
}

.post-url a {
    color: #0073e6;
    text-decoration: none;
}

.post-url a:hover {
    text-decoration: underline;
}

.post-comments {
    color: #555;
}

.filters {
    height: 40px;
    background: orange;
}
</style>