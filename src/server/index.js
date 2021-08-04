import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import sendMail from "./mailer";
import serialize from "serialize-javascript";
import * as React from 'react';
import ReactDOM from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import App from '../shared/App';
import html from "./html";
import otpMsg from "./otpMsg";
import generateOTP from "./otpGenerator";
dotenv.config();


let data = {modalLink: ""};

let userNotFound = false;
let userAlreadyExist = false;

let otp = "";
           
const app = express()

mongoose.set('useCreateIndex', true);
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('useFindAndModify', false);

function connectDB(){
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.eeauv.mongodb.net/grepIdeaDb?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err){
      console.log(`Mongo Connection Error:\n\t${err}`);
      connectDB();
    }
  });
}

connectDB();


const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  smallImgUri: String,
  imgUri: String,
  largeImgUri: String,
  password: String
});
const topicSchema = new mongoose.Schema({
  topics: Array
});
const messageSchema = new mongoose.Schema({
  topic: String,
  msgs: Array
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
const Topic = new mongoose.model("Topic", topicSchema);
const Message = new mongoose.model("Message", messageSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  if(!userNotFound){
    delete data.userNotFound;
  }else{
    userNotFound = false;
  }
  if(!userAlreadyExist){
    delete data.userAlreadyExist;
  }else{
    userAlreadyExist = false;
  }
  const markup = ReactDOM.renderToString(<StaticRouter location={req.url}><App /></StaticRouter>)
  if(req.isAuthenticated()){
    res.redirect("/topics/poverty");
  }else{
    res.send(`${html[0]}${markup}${html[1]}window.__ROUTE_DATA__ = ${serialize(data)}${html[2]}`);
  }
})

app.get('/a', (req, res) => {
  let a = 
  {
      "msgs": {
      a: {
      "value": "Hey There!! This is the Starting of This Topic.",
      "topicName": "poverty",
      "_id": "6045119487d6de3b28e441dc",
      "firstName": "Chirag",
      "lastName": "Jain",
      "smallImgUri": "https://i.imgur.com/Qj5Gz8E.jpg",
      "imgUri": "https://i.imgur.com/OsME7qws.png",
      "largeImgUri": "https://i.imgur.com/OsME7qw.png",
      "username": "chirag0174.be20@chitkara.edu.in"
      },
      b: {
      "value": "Here we will discuss our ideas about Poverty, and what we can do as developers to deal with this issues.",
      "topicName": "poverty",
      "_id": "6045119487d6de3b28e441dc",
      "firstName": "Chirag",
      "lastName": "Jain",
      "smallImgUri": "https://i.imgur.com/Qj5Gz8E.jpg",
      "imgUri": "https://i.imgur.com/OsME7qws.png",
      "largeImgUri": "https://i.imgur.com/OsME7qw.png",
      "username": "chirag0174.be20@chitkara.edu.in"
      },
      c : {
      "value": "Hii",
      "topicName": "poverty",
      "_id": "609d26ace4dbc900152410a5",
      "firstName": "Harshit",
      "lastName": "Sharma",
      "smallImgUri": "https://i.imgur.com/Qj5Gz8E.jpg",
      "imgUri": "https://i.imgur.com/OsME7qws.png",
      "largeImgUri": "https://i.imgur.com/OsME7qw.png",
      "username": "iharshitsharma@outlook.com"
      }
    },
      "_id": "6047a925eee17921e8cfa302",
      "topic": "poverty",
      "__v": 0
      }
  res.send(a);
})

app.get("/topics/:topicName", (req, res) => {
  const markup = ReactDOM.renderToString(<StaticRouter location={req.url}><App /></StaticRouter>)
  if(req.isAuthenticated()){
    Topic.findOne({_id: '604367458343222b04502786'}, (err, result) => {
      if(err){
        console.log(`Error in checking if this topic exists or not: ${err}`);
        res.redirect('/500');
      }else{
        if(result.topics.includes(req.params.topicName)){
          res.send(`${html[0]}${markup}${html[1]}window.__ROUTE_DATA__ = ${serialize(data)}${html[2]}`);
        }else{
          res.redirect('/404');
        }
      }
    })
  }else{
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.logOut();
  data.modalLink = "";
  delete data.userInfo;
  res.redirect("/");
});

app.get("/get/data/topics", (req, res) => {
  if(!req.isAuthenticated()){
    return res.redirect('/');
  }
  Topic.findById("604367458343222b04502786", (err, topics) => {
    if(err){
      console.log(`Topics Data Fetching Error: \n\t${err}`);
      res.json({topics: []});
    }else{
      res.json(topics);
    }
  });
});

app.get('/get/data/messages/:topicName', (req, res) => {
  if(!req.isAuthenticated()){
    return res.redirect('/');
  }
  Message.findOne({topic: req.params.topicName}, (err, msgData) => {
    if(err){
      console.log(`Messages Data Fetching Error: \n\t${err}`);
      res.json({topic: req.params.topicName, msgs: []});
    }else{
      if(msgData){
        res.json(msgData);
      }else{
        res.json({topic: req.params.topicName, msgs: []});
      }
    }
  })
});

app.get("*", (req, res) => {
  const markup = ReactDOM.renderToString(<StaticRouter location={req.url}><App /></StaticRouter>)
  res.send(`${html[0]}${markup}${html[1]}window.__ROUTE_DATA__ = ${serialize(data)}${html[2]}`);
});

app.post("/signup", (req, res) => {
  if(req.isAuthenticated()){
    return res.redirect("/topics/poverty");
  }
  User.exists({username: req.body.username}, (err, result) => {
    if(err){
      console.log(`Checking of DB for checking if User Already Exists Error: \n\t${err}`);
      return res.redirect('/500');
    }else{
      if(result){
        Object.assign(data, {userAlreadyExist: true})
        userAlreadyExist = true;
        res.redirect("/");
      }else{
        otp = generateOTP();
        Object.assign(data, {modalLink: "verify", userInfo: {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password, smallImgUri: 'https://i.imgur.com/Qj5Gz8E.jpg', imgUri: 'https://i.imgur.com/OsME7qws.png', largeImgUri: 'https://i.imgur.com/OsME7qw.png'}})
        try{
          sendMail(otpMsg(data, otp));
        }catch{
          Object.assign(data, {modal: ""});
          res.redirect('/')
        }
        res.redirect("/");
      }
    }
  });
});

app.post("/verify", (req, res) => {
  const enteredOTP = parseInt(req.body.first)*1000 + parseInt(req.body.second)*100 + parseInt(req.body.third)*10 + parseInt(req.body.fourth);
  if(enteredOTP !== otp){
    Object.assign(data, {wrongOTP: true});
    return res.redirect("/");
  }
  Object.assign(data, {modalLink: ""});
  delete data.wrongOTP;
  User.register({firstName: data.userInfo.firstName, lastName: data.userInfo.lastName, smallImgUri: data.userInfo.smallImgUri, imgUri: data.userInfo.imgUri, largeImgUri: data.userInfo.largeImgUri, username: req.body.username}, req.body.password, (err, user) => {
    delete data.userInfo.password;
    if(err){
      console.log(`User Registration Through Passport Error: \n\t${err}`);
      res.redirect("/500");
    }else{
      passport.authenticate('local')(req, res, () => {
        res.redirect("/topics/poverty");
      });
    }
  });
});

app.post("/resend", (req, res) => {
  sendMail(otpMsg(data, otp));
  res.redirect("/");
});

app.post("/login", (req, res) => {
  if(req.isAuthenticated()){
    return res.redirect("/topics/poverty");
  }
  User.findOne({username: req.body.username}, (err, result) => {
    if(err){
      console.log(`Searching of DB at the time of Login Error: \n\t${err}`);
      return res.redirect('/500');
    }else{
      if(!result){
        Object.assign(data, {userNotFound: true})
        userNotFound = true;
        return res.redirect("/");
      }else{
        const user = new User({
          username: req.body.username,
          password: req.body.password
        });
        req.login(user, (err) =>  {
          if(err){
            console.log(`Login with req.login method of Passport Error: \n\t${err}`);
            res.redirect('/500');
          }else{
            passport.authenticate('local')(req, res, () => {
              Object.assign(data, {userInfo: {...result._doc}});
              delete data.userInfo.__v;
              res.redirect('/topics/poverty');
            });
          }
        });   
      }
    }
  });
});

app.post('/sendMessage', (req, res) => {
  req.body.value = req.body.value.replace(/^[\s\n]+|[\s\n]+$/g, '');
  Message.findOne({topic: req.body.topicName}, (err, result) => {
    if(err){
      console.log(`Data Fetching Error During Creating New Msg: ${err}`);
      res.redirect('/error');
    }else{
      if(result){
        Message.findOneAndUpdate({topic: req.body.topicName}, {$push: {msgs: {...req.body}}}, (error) => {
          if(error){
            console.log(`Data Updation Error During Create New Msg: ${error}`);
            res.redirect('/error');
          }else{
            res.redirect(`/sendMsg`);
          }
        });
      }else{
        Message.create({topic: req.body.topicName, msgs: {...req.body}},(error, id) => {
          if(error){
            console.log(`Data Creation Error During Create New Msg: ${error}`);
            res.redirect('/error');
          }else{
            res.redirect(`/sendMsg`);
          }
        })
      }
    }
  });
});

app.post('/createTopic', (req, res) => {
  Topic.findOne({_id: '604367458343222b04502786'}, (err, result) => {
    if(err){
      console.log(`Previous Topic Checking Error: ${err}`);
      res.redirect('/error');
    }else{
      if(result.topics.includes(req.body.value.toLowerCase().trim())){
        return res.redirect(`/topics/${req.body.value.toLowerCase().trim()}`)
      }else{
        Topic.findOneAndUpdate({_id: '604367458343222b04502786'}, {$push: {topics: req.body.value.toLowerCase().trim()}}, (err, result) => {
          if(err){
            console.log(`New Topic Creation Error: ${err}`);
            res.redirect('/error');
            return;
          }else{
            res.redirect(`/topics/${req.body.value.toLowerCase().trim()}`);
          }
        });
      }
    }
  });
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});