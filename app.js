const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv/config');
require('./db');
const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());

const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('tiny'));

const usersRouter = require('./routers/users');
const snippetsRouter = require('./routers/snippets');

app.use(`/users`, usersRouter);
app.use(`/snippets`, snippetsRouter);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
