import axios from "axios";

const BASE_URL = "https://hn.algolia.com/api/v1";

const ApiService = {
    async showPosts(query) {
        let apiUrl;
        if (query) {
            apiUrl = `${BASE_URL}/search?query=${query}`;
        } else {
            apiUrl = `${BASE_URL}/search?tags=front_page`;
        }
        try {
            const response = await axios.get(apiUrl);
            return response.data.hits;
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    },

    async fetchItemById(id) {
        const apiUrl = `${BASE_URL}/items/${id}`;
        try {
            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            console.error("Error fetching item:", error);
            throw error;
        }
    },
};

export default ApiService;
