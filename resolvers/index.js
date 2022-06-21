const axios = require("axios");
const { UserInputError } = require("apollo-server");
const key = 'f798db58a0e66e474dc6ee2d5caddacb';
const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?appid=${key}`;
const GROUP_API = `https://api.openweathermap.org/data/2.5/group?appid=${key}`;

const resolvers = {

    Query: {

        getCityByName: async(obj, args, context, info) => {
            // name is required | country and config are optional
            const { name, country, config } = args;
            let url = `${WEATHER_API}&q=${name}`;

            // Add other fields if possible
            if (country) url = url + `,${country}`;
            if (config && config.units) url = url + `&units=${config.units}`;
            if (config && config.lang) url = url + `&lang=${config.lang}`;

            try {
                const { data } = await axios.get(url);

                // By default, any invalid country code is ignored by the API
                // In this case, the API returns data for any city that matches the name
                // To prevent false positives, an error is thrown if country codes don't match
                if (country && country.toUpperCase() !== data.sys.country) {
                    throw new UserInputError("Country code was invalid", {
                        invalidArgs: { country: country },
                    });
                }

                return {
                    id: data.id,
                    name: data.name,
                    country: data.sys.country,
                    coord: data.coord,

                    temperature: {
                        actual: data.main.temp,
                        feelsLike: data.main.feels_like,
                        min: data.main.temp_min,
                        max: data.main.temp_max,
                    },


                    timestamp: data.dt,

                };
            } catch (e) {
                return null;
            }
        },

        getCityById: async(obj, args, context, info) => {
            // id is required (can be string or array) | config is optional
            const { id, config } = args;
            let url = `${GROUP_API}&id=${id.join(",")}`;

            // Add other fields if possible
            if (config && config.units) url = url + `&units=${config.units}`;
            if (config && config.lang) url = url + `&lang=${config.lang}`;

            try {
                const { data } = await axios.get(url);
                const cityList = data.list.map((city) => {
                    return {
                        id: city.id,
                        name: city.name,
                        country: city.sys.country,
                        coord: city.coord,

                        temperature: {
                            actual: city.main.temp,
                            feelsLike: city.main.feels_like,
                            min: city.main.temp_min,
                            max: city.main.temp_max,
                        },

                        timestamp: city.dt,

                    };
                });
                return cityList;
            } catch (e) {
                return null;
            }
        },

    },

};

module.exports = {
    resolvers,
};