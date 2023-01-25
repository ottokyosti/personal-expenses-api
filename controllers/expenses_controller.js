const expenses = require("../models/expenses");
const joi = require("joi");

const getAllExpenses = async (req, res) => {
    try {
        const response = await expenses.fetchAll();
        if (response) {
            res.status(200).send(response);
        }
    } catch (e) {
        res.sendStatus(500);
    }
}

const getTotalAmount = async (req, res) => {
    try {
        const response = await expenses.fetchTotalAmount();
        if (response) {
            res.status(200).send(response);
        }
    } catch (e) {
        res.sendStatus(500);
    }
}

const getExpenseByMonth = async (req, res, next) => {
    if (req.query.id || req.query.date || req.query.amount || req.query.shop || req.query.category) return next();
    try {
        const response = await expenses.fetchByMonth(req.params.month);
        if (response.length > 0) {
            res.status(200).send(response);
        } else {
            res.status(404).send("No expenses found for that specific month");
        }
    } catch (e) {
        res.sendStatus(500);
    }
}

const addExpense = async (req, res) => {
    const schema = joi.object({
        date: joi.string().min(10).required(),
        amount: joi.number().min(0).required(),
        shop: joi.string().required(),
        category: joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    let expense = req.body;
    try {
        const findResponse = await expenses.fetchByExpense(expense);
        if (findResponse.length > 0) {
            res.status(400).send("Expense exists");
            return;
        }
        const response = await expenses.addExpense(expense);
        if (response) {
            expense.id = response.insertId;
            res.status(201).send(expense);
        }
    } catch (e) {
        res.sendStatus(500);
    }
}

const deleteExpense = async (req, res) => {
    try {
        const fetchResponse = await expenses.fetchById(req.params.id);
        if (fetchResponse.length === 0) {
            res.status(404).send("No expense found by that id");
            return;
        }

        const response = await expenses.deleteExpense(req.params.id);
        if (response) {
            res.status(200).send("Expense deleted");
        }
    } catch (e) {
        res.sendStatus(500);
    }
}

const updateExpense = async (req, res) => {
    const schema = joi.object({
        id: joi.number().integer(),
        date: joi.string().min(10),
        amount: joi.number().min(0),
        shop: joi.string(),
        category: joi.string()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    let expense = req.body;
    try {
        const fetchResponse = await expenses.fetchById(req.params.id);
        if (fetchResponse.length === 0) {
            res.status(404).send("Not Found");
            return;
        }

        const response = await expenses.updateExpense(expense, req.params.id);
        if (response) {
            res.status(200).send("Expense updated successfully");
        }
    } catch (e) {
        res.sendStatus(500);
    }
}

const getBySort = async (req, res) => {
    try {
        let query = req.query;
        const response = await expenses.fetchSorted(query);
        if (response.length > 0) {
            res.status(200).send(response);
        } else {
            res.status(404).send("Not found");
        }
    } catch (e) {
        res.sendStatus(500);
    }
}

module.exports = {
    getAllExpenses,
    getExpenseByMonth,
    addExpense,
    deleteExpense,
    updateExpense, 
    getBySort,
    getTotalAmount
};