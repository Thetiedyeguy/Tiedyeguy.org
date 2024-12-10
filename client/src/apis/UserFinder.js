import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/users/v1"
    : "http://localhost:3001/api/users/v1";

export default axios.create({
  baseURL,
});
