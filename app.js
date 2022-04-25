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
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://snippet-manager-test.netlify.app',
    ],
    credentials: true,
  })
);

const usersRouter = require('./routers/users');
const tagsRouter = require('./routers/tags');
const snippetsRouter = require('./routers/snippets');

app.use(`/users`, usersRouter);
app.use(`/tags`, tagsRouter);
app.use(`/snippets`, snippetsRouter);

// for development
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// for production
// app.listen(() => console.log(`Server running`));
