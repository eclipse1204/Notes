require('dotenv').config();

const express=require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride=require('method-override');
const ejs = require('ejs');
const app=express();
const Routes=require('./server/routes/index.js');
const connectDB=require('./server/config/db.js')
const session =require('express-session');
const passport=require('passport')
const MongoStore=require('connect-mongo');


const port=3000 || process.env.PORT;

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

connectDB();

app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',Routes);
app.use('/',require('./server/routes/dashboard.js'));
app.use('/',require('./server/routes/auth.js'));

app.all('*',(req,res)=>{
    res.status(404).render('404.ejs')
})

app.listen(port,()=>{
    console.log("Server running on port "+port);
})