import { MODEL } from "../models";

export const Helper = {
    aggregation: async (query, model) => {
        try {
            let data = await MODEL[model]
                .aggregate(query)
                .collation({ locale: "en", strength: 1 })
                .exec();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getDataLength: async (query, model) => {
        try {
            let data = await MODEL[model].aggregate(query);
            return data.length;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
