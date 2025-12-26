const Expense = require("../models/expenseModel");

// 1️⃣ Add new expense
exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2️⃣ Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 3️⃣ Get expense summary
exports.getExpenseSummary = async (req, res) => {
  try {
    const expenses = await Expense.find();

    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
