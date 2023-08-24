const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const { partials } = require('handlebars');
const app = express();
const flash=require('connect-flash')
const session=require('express-session')
const MySQLStore=require('express-mysql-session')(session);

const {database}=require('./keys')
// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({
  defaultLayout: 'main',
  extname: 'hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  helpers: require('./lib/handlebars')
  
}));
const sessionStore = new MySQLStore({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database,
  clearExpired: true,
  checkExpirationInterval: 900000, // 15 minutes
  expiration: 86400000, // 1 day
});

app.set('view engine', 'hbs');

// Middlewares
app.use(session({
  secret:'tatosanchez',
  resave:false,
  saveUninitialized:false,
  store:new MySQLStore(database)
}))
app.use(flash())
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Custom Middleware
// Custom Middleware
app.use((req, res, next) => {
  req.flash('success', 'This is a success flash message');
  next();
});


// Routes
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links')); 


// Public
app.use(express.static(path.join(__dirname, 'public')))
// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server escuchando en el puerto ${app.get('port')}`);
});