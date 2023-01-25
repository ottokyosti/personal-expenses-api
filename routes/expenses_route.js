const express = require("express");
const router = express.Router();
const { getAllExpenses,
        getExpenseByMonth, 
        getBySort,
        addExpense, 
        deleteExpense, 
        updateExpense,
        getTotalAmount } = require("../controllers/expenses_controller");

const parser = express.json();

router.get("/", getAllExpenses);
router.get("/total", getTotalAmount);
router.get("/:month", getExpenseByMonth);
router.get("/sort", getBySort);
router.post("/", parser, addExpense);
router.delete("/:id", deleteExpense);
router.patch("/:id", parser, updateExpense);

module.exports = router;