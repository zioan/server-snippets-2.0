const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

//create table is not already
router.get('/createsnippetstable', (req, res) => {
  let sql =
    'CREATE TABLE snippets(id int AUTO_INCREMENT, user_id VARCHAR(255), title VARCHAR(255), tag VARCHAR(255), code VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send('Table already created');
    } else {
      console.log(result);
      res.send('Users table created');
    }
  });
});

//get all user snippets
router.get('/:id', auth, (req, res) => {});

//create new snippet
router.get('/add', auth, (req, res) => {
  const newSippet = {
    user_id: req.body.user_id,
    title: req.body.title,
    tag: req.body.tag,
    code: req.body.code,
  };

  let sql = 'INSERT INTO posts set ?';
  db.query(sql, newSippet, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(result);
      return res.send(result);
    }
  });
});

module.exports = router;
