const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');

const schema = require('./graphql/Product');
const db = require('./utils');

const { PORT } = process.env;
// Initialization of express application
const app = express();

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// app.use(express.static('client'))
// Using bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up connection of database
db.setUpConnection()

// Using graphql middleware
app.post('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))
app.get('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    console.log(`GraphQL running on http://localhost:${PORT}/graphql`)
})