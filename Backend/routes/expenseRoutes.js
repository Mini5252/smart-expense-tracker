const express = require("express");
const router = express.Router();


const {
  addExpense,
  getExpenses,
  getExpenseSummary,
} = require("../controllers/expenseController");
router.get("/summary", getExpenseSummary);
// Add expense
router.post("/", addExpense);

// Get all expenses
router.get("/", getExpenses);

module.exports = router;
