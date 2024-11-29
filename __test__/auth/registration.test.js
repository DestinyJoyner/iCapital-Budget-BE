const request = require("supertest");
const app = require("../../app.js");
const authTestData = require("../testData/authTestData.js")

// referenced old repo test https://github.com/DestinyJoyner/Poll-Everywhere-Puppeteer-Project/blob/main/back_end/__test__/app.test.js

const registerEndpoint = "/auth/register"

describe("POST /auth/register", () => {
    // test for valid registration info
    describe("with valid registration credentials", () => {
        // test status code
        test("should respond with 200 status code", async () => {
            const response = await request(app).post(registerEndpoint).send(authTestData.validAuth)

            expect(response.statusCode).toBe(200)
        })

        // test successful registration
        test("should return user info and token", async () => {
            const response = await request(app).post(registerEndpoint).send(authTestData.validAuth2)
            
            // check response body for token, email, id, first_name
            expect(response.body).toHaveProperty("token")
            expect(response.body).toHaveProperty("id")
            expect(response.body).toHaveProperty("email")
            expect(response.body).toHaveProperty("first_name")
        })
    })

    // still in parent describe for post auth endpoint 
    // ERROR TESTING 
    describe("with invalid registration credentials", () => {
        // should receive error for already included in database
        test("should return error for duplicate email", async () => {
            const response = await request(app).post(registerEndpoint).send(authTestData.validAuth)
            
            // check response body for error
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("error")
            expect(response.body.error).toContain("linked to another account")
        })

        // missing credentials
        /* 
             "errors": [{
            "type": "field",
            "value": "",
            "msg": "A valid email is required",
            "path": "login.email",
            "location": "body"}]
            */
        test("should return error for missing email", async () => {
            const response = await request(app).post(registerEndpoint).send(authTestData.missingEmail)
            
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors.some(err=> err.msg === "A valid email is required")).toBe(true)
        })

        test("should return error for missing password", async () => {
            const response = await request(app).post(registerEndpoint).send(authTestData.missingPassword)

            const passwordErrors = ["A password is required", "Password must be at least 8 characters long and include: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"]
            
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors.some(err => passwordErrors.includes(err.msg))).toBe(true)
        })

        // invalid email test
        test("should return error for invalid email", async () => {
            const response = await request(app).post(registerEndpoint).send(authTestData.invalidEmail)
            
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors.some(err => err.msg === "A valid email is required")).toBe(true)
        })

        // invalid password test
        test("should return error for invalid password", async () => {
            const response = await request(app).post(registerEndpoint).send(authTestData.invalidPassword)
            
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors.some(err => err.msg === "Password must be at least 8 characters long and include: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character")).toBe(true)
        })

        // invalid first name length
        test("should return error for name length", async () => {
            const response = await request(app).post(registerEndpoint).send(authTestData.invalidNameLength)
            
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors.some(err => err.msg === "First name should be less than 25 characters")).toBe(true)
        })

    })

})