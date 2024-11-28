const authTestData = {
    validAuth: {
        login: {
            email: "test@jest.com",
            password: "JestTest123!",
            first_name: "Jester"
        }
    },
    
    validAuth2: {
        login: {
            email: "tester@jest.com",
            password: "JestTest456!",
            first_name: "Jester2"
        }
    },
    
    missingEmail: {
        login: {
            password: "JestTest456!",
            first_name: "Jester2"
        }
    },
    
    missingPassword: {
        login: {
            email: "test2@jest.com",
            first_name: "Jester2"
        }
    },
    
    invalidEmail: {
        login: {
            email: "test@jest",
            password: "JestTest123!",
            first_name: "Jester"
        }
    },
    
    invalidPassword: {
        login: {
            email: "test3@jest.com",
            password: "jesttest",
            first_name: "Jester"
        }
    },
    
    invalidNameLength: {
        login: {
            email: "test4@jest.com",
            password: "JestTest678!",
            first_name: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
        }
    }
}

module.exports = authTestData;