import axios from "axios";

const APIUrl = "http://localhost:8080/api";

export const httpRequest = axios.create({
  baseURL: APIUrl,
});
