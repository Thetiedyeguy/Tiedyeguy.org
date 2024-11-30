import axios from "axios";

// NODE_ENV keeps track of if we are in development or production

const baseURL = process.env.NODE_ENV === 'production' ? "api/yelp/v1/restaurants" : "http://localhost:4000/api/yelp/v1/restaurants";

export default axios.create({
    baseURL,
});