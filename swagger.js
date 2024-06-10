const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0", // Specification version
  info: {
    title: "Express API with Swagger",
    version: "1.0.0",
    description: "A simple Express API with Swagger documentation",
  },
  servers: [
    {
      url: "http://127.0.0.1:8080",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js", "./index.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
