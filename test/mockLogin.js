const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); 
const { expect } = chai;

chai.use(chaiHttp);

let adminToken = ""; 

// Function to log in as an admin before running tests
const loginAsAdmin = async () => {
    if (adminToken) return adminToken; // Return existing token if already obtained

    const loginRes = await chai.request(app)
        .post("/api/auth/login") // Replace with actual login endpoint
        .send({
            email: "biswakarmasushmita5@gmail.com", 
            password: "admin123"
        });

    expect(loginRes).to.have.status(200);
    expect(loginRes.body).to.have.property("token");

    adminToken = loginRes.body.token; 
    return adminToken;
};

module.exports = { loginAsAdmin };
