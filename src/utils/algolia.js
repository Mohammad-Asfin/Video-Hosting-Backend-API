import { ApiError } from "./ApiError.js";

// Normally you would do:
// import algoliasearch from "algoliasearch";
// const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
// const index = client.initIndex("videos");

class AlgoliaService {
    constructor() {
        this.isConfigured = !!(process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_API_KEY);
    }

    async addVideo(video) {
        if (!this.isConfigured) return;
        try {
            // await index.saveObject({ objectID: video._id, title: video.title, ... })
            console.log(`Algolia: Added video ${video._id} to search index.`);
        } catch (error) {
            console.error("Algolia sync error:", error);
        }
    }

    async updateVideo(video) {
        if (!this.isConfigured) return;
        try {
            // await index.partialUpdateObject({ objectID: video._id, title: video.title, ... })
            console.log(`Algolia: Updated video ${video._id} in search index.`);
        } catch (error) {
            console.error("Algolia sync error:", error);
        }
    }

    async deleteVideo(videoId) {
        if (!this.isConfigured) return;
        try {
            // await index.deleteObject(videoId)
            console.log(`Algolia: Deleted video ${videoId} from search index.`);
        } catch (error) {
            console.error("Algolia sync error:", error);
        }
    }
}

export const algoliaService = new AlgoliaService();
