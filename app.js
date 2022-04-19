const express = require('express');
require('dotenv/config');
require('./db');
const app = express();
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('tiny'));

const usersRouter = require('./routers/users');
const tagsRouter = require('./routers/tags');
const snippetsRouter = require('./routers/snippets');

app.use(`/users`, usersRouter);
app.use(`/tags`, tagsRouter);
app.use(`/snippets`, snippetsRouter);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
