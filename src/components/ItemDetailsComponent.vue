<template>
    <div>
        <router-view></router-view>
        <h1>{{ itemDetails.author }}</h1>
        <!-- <div v-html="itemDetails.text"></div>
    <ul>
      <li v-for="comment in itemDetails.children" :key="comment.id">
        <p>{{ comment.text }}</p>
      </li>
    </ul> -->
    </div>
</template>

<script>
import ApiService from '@/services/api';



export default {
    name: "ItemDetailsComponent",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            itemDetails: {},
        };
    },
    async mounted() {
        console.log(this.id);
        await this.fetchItemDetails();
    },
    methods: {
        async fetchItemDetails() {
            try {
                this.itemDetails = await ApiService.fetchItemById(this.id);
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        },
    },
};

</script>
