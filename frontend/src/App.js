import { fetchSummary } from "./api/expenseApi";

import { useEffect, useState } from "react";
import { fetchExpenses, addExpense } from "./api/expenseApi";

function App() {
  const [summary, setSummary] = useState({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
});
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  // Fetch expenses
  const loadExpenses = () => {
    fetchExpenses()
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));
      fetchSummary()
  .then((res) => setSummary(res.data))
  .catch((err) => console.error(err));

  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    addExpense(formData)
      .then(() => {
        loadExpenses();
        setFormData({
          title: "",
          amount: "",
          category: "",
          type: "expense",
          date: "",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>Smart Expense Tracker</h1>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
  <div>
    <h3>Income</h3>
    <p>₹ {summary.totalIncome}</p>
  </div>
  <div>
    <h3>Expense</h3>
    <p>₹ {summary.totalExpense}</p>
  </div>
  <div>
    <h3>Balance</h3>
    <p>₹ {summary.balance}</p>
  </div>
</div>


      <h3>Add Expense</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <br /><br />

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <br /><br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add</button>
      </form>

      <hr />

      <h3>Expenses</h3>

      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <ul>
          {expenses.map((exp) => (
            <li key={exp._id}>
              {exp.title} — ₹{exp.amount} ({exp.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
