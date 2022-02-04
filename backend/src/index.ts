import mongoose, { Error } from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./User";
import {
  DatabaseUserInterface,
  UserInterface,
} from "./interfaces/UserInterface";

const LocalStrategy = passportLocal.Strategy;

dotenv.config();

mongoose.connect(
  "mongodb+srv://azatseyrek:miran@cluster0.tmqvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err: Error) => {
    if (err) throw err;
    console.log("connected to mongo");
  }
);

// Middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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

// Passport
passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    User.findOne(
      { username: username },
      (err: Error, user: DatabaseUserInterface) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result: boolean) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    );
  })
);

passport.serializeUser((user: DatabaseUserInterface, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: Error, user: DatabaseUserInterface) => {
    const userInformation: UserInterface = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id,
    };
    cb(err, userInformation);
  });
});

// Routes
app.post("/register", async (req, res) => {
  const { username, password } = req?.body;
  // validation
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.send("Improper Values");
    return;
  }
  User.findOne({ username }, async (err: Error, doc: DatabaseUserInterface) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("success");
    }
  });
});

app.post("/login", passport.authenticate("local"), (req: Request, res: Response) => {
  res.send("success");
}
);

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.get("/logout", (req, res) => {
  req.logout()
  res.send("success")

})

app.post("/deleteuser/:_id", async(req, res)=> {
 

  const {_id} = req.params
  await User.findByIdAndDelete(_id.toString()).then(()=> {res.send("success")})
 
})

app.get("/getallusers", async (req, res) => {
  try {
    const data =await User.find()
    res.send(data)
  }catch(err) {
    res.send(err)
  }

})

app.listen(4000, () => {
  console.log("Server Started");
});
