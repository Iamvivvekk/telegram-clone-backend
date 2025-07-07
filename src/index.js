import express  from "express";
import User from './models/user.model.js';
import { connectToMongoDb } from "./database/connect_to_mongodb.js";

connectToMongoDb();

const app = express()


