const connection = require("../db/connection");

const expenses = {
    fetchAll: () => new Promise((resolve, reject) => {
        connection.query("SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as date FROM expenses", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }),
    fetchByMonth: (month) => new Promise((resolve, reject) => {
        connection.query("SELECT *, DATE_FORMAT(date, '%M') as month, DATE_FORMAT(date, '%Y-%m-%d') as date FROM expenses", (err, result) => {
            if (err) {
                reject(err);
            } else {
                let sortedArray = [];
                result.forEach((element) => {
                    let data = JSON.parse(JSON.stringify(element));
                    if (data.month === month) {
                        sortedArray.push(data);
                    }
                });
                resolve(sortedArray);
            }
        });
    }),
    addExpense: (expense) => new Promise((resolve, reject) => {
        connection.query("INSERT INTO expenses SET ?", expense, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }),
    deleteExpense: (id) => new Promise((resolve, reject) => {
        connection.query("DELETE FROM expenses WHERE id=?", id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }),
    updateExpense: (expense, id) => new Promise((resolve, reject) => {
        connection.query("UPDATE expenses SET ? WHERE id=?", [expense, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }),
    fetchSorted: (query) => new Promise((resolve, reject) => {
        connection.query("SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as date FROM expenses WHERE ?", query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    }),
    fetchTotalAmount: () => new Promise((resolve, reject) => {
        connection.query("SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as date FROM expenses", (err, result) => {
            if (err) {
                reject(err);
            } else {
                let dataArray = [];
                let totalAmount = 0;
                result.forEach((element) => {
                    let data = JSON.parse(JSON.stringify(element));
                    dataArray.push(data);
                    totalAmount += data.amount;
                });
                resolve({ data: dataArray, total: totalAmount });
            }
        });
    }),
    fetchByExpense: (expense) => new Promise((resolve, reject) => {
        let queryString = "SELECT * FROM expenses WHERE date=? AND amount=? AND shop=? AND category=?";
        connection.query(queryString, [expense.date, expense.amount, expense.shop, expense.category], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    }),
    fetchById: (id) => new Promise((resolve, reject) => {
        connection.query("SELECT * FROM expenses WHERE id=?", id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
};

module.exports = expenses;