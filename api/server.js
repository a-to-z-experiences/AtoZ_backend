const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const authRoutes = require("../config/auth/authRoutes.js");
const experiencesRoutes = require("../config/experiences/experiences_routes.js");
const usersRoutes = require("../config/users/users_routes.js");

server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(express.json());

authRoutes(server);
experiencesRoutes(server);
usersRoutes(server);

module.exports = server;
