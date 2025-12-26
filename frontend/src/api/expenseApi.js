import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchExpenses = () => API.get("/expenses");
export const addExpense = (data) => API.post("/expenses", data);
export const fetchSummary = () => API.get("/expenses/summary");
