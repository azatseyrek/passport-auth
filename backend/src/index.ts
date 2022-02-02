import mongoose, { Error } from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

mongoose.connect(
  "mongodb+srv://azatseyrek:admin@cluster0.tmqvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err: Error) => {
    if (err) throw err;
    console.log("connected to mongo");
    
  }
);

// Middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());