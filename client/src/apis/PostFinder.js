import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/posts"
    : "http://localhost:3001/api/posts";

export default axios.create({
  baseURL,
});
