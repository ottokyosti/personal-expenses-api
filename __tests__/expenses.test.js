const { describe, expect, test, afterAll, beforeAll } = require('@jest/globals');
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("GET expenses endpoint", () => {
    test("should return 200", (done) => {
        request(app)
            .get("/api/expenses")
            .expect(200)
            .end(done);
    });

    test("should return expense by month", async () => {
        const response = await request(app)
            .get(`/api/expenses/January`)
            .set("Accept", "application/json");
        
        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toBeInstanceOf(Object);
        expect(typeof response.body[0].id).toBe("number");
        expect(typeof response.body[0].date).toBe("string");
        expect(typeof response.body[0].amount).toBe("number");
        expect(typeof response.body[0].shop).toBe("string");
        expect(typeof response.body[0].category).toBe("string");
        expect(response.body[0].month).toEqual("January");
    });

    test("should return sorted response", async () => {
        const response = await request(app)
            .get(`/api/expenses/sort?shop=Verkkokauppa`)
            .set("Accept", "application/json");

        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toBeInstanceOf(Object);
        expect(typeof response.body[0].id).toBe("number");
        expect(typeof response.body[0].date).toBe("string");
        expect(typeof response.body[0].amount).toBe("number");
        expect(response.body[0].shop).toEqual("Verkkokauppa");
        expect(typeof response.body[0].category).toBe("string");
    });

    test("should return 404 and Not Found", async () => {
        const response = await request(app)
            .get("/api/expenses/Februraruy");
        expect(response.status).toEqual(404);
        expect(response.text).toContain("No expenses found for that specific month");
    });
});

describe("POST expenses endpoint", () => {
    let postId;

    test("should create new expense", async () => {
        const expense = {
            date: "2023-02-23",
            amount: 12.34,
            shop: "Testikauppa",
            category: "Testikategoria"
        }
        const response = await request(app)
            .post("/api/expenses")
            .set("Accept", "application/json")
            .send(expense);
        console.log(response.headers);
        expect(response.status).toEqual(201);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.id).toBeTruthy();
        expect(response.body.date).toEqual("2023-02-23");
        expect(response.body.amount).toEqual(12.34);
        expect(response.body.shop).toEqual("Testikauppa");
        expect(response.body.category).toEqual("Testikategoria");
        postId = response.body.id;
    });

    test("should not allow no date", async () => {
        const expense = {
            amount: 111.11,
            shop: "Testi",
            category: "Testi"
        }
        const response = await request(app)
            .post("/api/expenses")
            .set("Accept", "application/json")
            .send(expense)
        expect(response.status).toEqual(400);
        expect(response.text).toContain('"date" is required');
    });

    test("should not allow no amount", async () => {
        const expense = {
            date: "2023-03-20",
            shop: "Testi",
            category: "Testi"
        }
        const response = await request(app)
            .post("/api/expenses")
            .set("Accept", "application/json")
            .send(expense)
        expect(response.status).toEqual(400);
        expect(response.text).toContain('"amount" is required');
    });

    test("should not allow no shop", async () => {
        const expense = {
            date: "2023-03-20",
            amount: 111.11,
            category: "Testi"
        }
        const response = await request(app)
            .post("/api/expenses")
            .set("Accept", "application/json")
            .send(expense)
        expect(response.status).toEqual(400);
        expect(response.text).toContain('"shop" is required');
    });

    test("should not allow no category", async () => {
        const expense = {
            date: "2023-03-20",
            amount: 111.11,
            shop: "Testi"
        }
        const response = await request(app)
            .post("/api/expenses")
            .set("Accept", "application/json")
            .send(expense)
        expect(response.status).toEqual(400);
        expect(response.text).toContain('"category" is required');
    });

    test("should not allow duplicate expenses", async () => {
        const expense = {
            date: "2023-02-23",
            amount: 12.34,
            shop: "Testikauppa",
            category: "Testikategoria"
        }
        const response = await request(app)
            .post("/api/expenses")
            .set("Accept", "application/json")
            .send(expense);
        expect(response.status).toEqual(400);
        expect(response.text).toContain("Expense exists");
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/expenses/${postId}`)
            .set("Accept", "application/json");
    });
});

describe("DELETE expenses endpoint", () => {
    test("should check if expense exists", async () => {
        const response = await request(app)
            .delete("/api/expenses/100001")
            .set("Accept", "application/json");
        expect(response.status).toEqual(404);
        expect(response.text).toContain("No expense found by that id");
    });

    test("should delete invoice by id", async () => {
        const expense = {
            date: "2023-01-01",
            amount: 111.11,
            shop: "Testi",
            category: "Testi"
        }
        const postResponse = await request(app)
            .post("/api/expenses")
            .set("Accept", "application/json")
            .send(expense);
        const id = postResponse.body.id;

        const response = await request(app)
            .delete(`/api/expenses/${id}`)
            .set("Accept", "application/json");
        expect(response.status).toEqual(200);
        expect(response.text).toContain("Expense deleted");
    });
});

describe("PATCH expenses endpoint", () => {
    let postId;
    beforeAll(async () => {
        const expense = {
            date: "2023-12-31",
            amount: 43.21,
            shop: "Testi",
            category: "Testi"
        }
        const response = await request(app)
            .post("/api/expenses")
            .set("Accept", "application/json")
            .send(expense);
        postId = response.body.id;
    });

    test("should update expense with id", async () => {
        const expense = {
            date: "2023-12-12",
            amount: 98.76,
            shop: "Testi2",
            category: "Testi2"
        }
        const response = await request(app)
            .patch(`/api/expenses/${postId}`)
            .set("Accept", "application/json")
            .send(expense);
        console.log(response);
        expect(response.status).toEqual(200);
        expect(response.text).toContain("Expense updated successfully");
    });

    test("should check expense exists", async () => {
        const expense = {
            id: 10000,
            date: "2023-11-14",
            amount: 65.23,
            shop: "Testi3",
            category: "Testi3"
        }
        const response = await request(app)
            .patch(`/api/expenses/${expense.id}`)
            .set("Accept", "application/json")
            .send(expense);
        expect(response.status).toEqual(404);
        expect(response.text).toEqual("Not Found");
    });

    test("should not allow incorrect date", async () => {
        const expense = {
            date: "2023-9-34",
            amount: 23.21,
            shop: "Testi",
            category: "Testi"
        };
        const response = await request(app)
            .patch("/api/expenses/1")
            .set("Accept", "application/json")
            .send(expense);
        expect(response.status).toEqual(400);
        expect(response.text).toContain('"date" length must be at least 10 characters long');
    });

    test("should not allow negative amount", async () => {
        const expense = {
            date: "2023-09-30",
            amount: -23.21,
            shop: "Testi",
            category: "Testi"
        };
        const response = await request(app)
            .patch("/api/expenses/1")
            .set("Accept", "application/json")
            .send(expense);
        expect(response.status).toEqual(400);
        expect(response.text).toContain('"amount" must be greater than or equal to 0');
    });

    test("should only allow shop be string", async () => {
        const expense = {
            date: "2023-09-30",
            amount: 23.21,
            shop: 124,
            category: "Testi"
        };
        const response = await request(app)
            .patch("/api/expenses/1")
            .set("Accept", "application/json")
            .send(expense);
        expect(response.status).toEqual(400);
        expect(response.text).toContain('"shop" must be a string');
    });

    test("should only allow category be string", async () => {
        const expense = {
            date: "2023-09-30",
            amount: 23.21,
            shop: "Testi",
            category: 123
        };
        const response = await request(app)
            .patch("/api/expenses/1")
            .set("Accept", "application/json")
            .send(expense);
        expect(response.status).toEqual(400);
        expect(response.text).toContain('"category" must be a string');
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/expenses/${postId}`)
            .set('Accept', 'application/json');
        connection.end();
    });
})