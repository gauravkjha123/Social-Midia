const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sass = require('sass');
const fs = require('fs');
// const passport = require('passport');
// const passportLocal = require('./config/passport-local-strategy');

// Configure input and output paths
const inputDir = './assets/scss'; // Directory containing Sass files
const outputDir = './assets/css'; // Directory where compiled CSS will be saved

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to compile Sass files
function compileSassFile(inputFile, outputFile) {
  const result = sass.renderSync({ file: inputFile });

  fs.writeFileSync(outputFile, result.css);

  console.log(`Compiled: ${inputFile} -> ${outputFile}`);
}

// Function to compile all Sass files in the input directory
function compileAllSassFiles() {
  fs.readdirSync(inputDir).forEach((file) => {
    if (file.endsWith('.scss')) {
      const inputFile = `${inputDir}/${file}`;
      const outputFile = `${outputDir}/${file.replace('.scss', '.css')}`;
      compileSassFile(inputFile, outputFile);
    }
  });
}

// Call the function to compile all Sass files
compileAllSassFiles();

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'ThisIsSecretKey',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
        
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
