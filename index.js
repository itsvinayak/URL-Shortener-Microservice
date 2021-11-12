const  express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();

// database connection
const db = require('./db');
db.connectDB();


const port =  process.env.PORT || 3000;


// express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// apis
app.use('/api/shorturl', require('./routes/urls'));





app.listen(port, () => console.log(`listening on port ${port}!`));