const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

//create table is not already
router.get('/createsnippetstable', (req, res) => {
  const sql =
    'CREATE TABLE snippets(id int AUTO_INCREMENT, user_id VARCHAR(255), title VARCHAR(255), tag VARCHAR(255), code TEXT, timeStamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send('Table already created');
    } else {
      console.log(result);
      res.send('Snippets table created');
    }
  });
});

// get all user snippets
router.get('/all/:user_id', auth, (req, res) => {
  const sql = `SELECT * FROM snippets WHERE user_id = "${req.params.user_id}"`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      res.send(result);
    }
  });
});

//create new snippet
router.post('/add', auth, (req, res) => {
  const newSippet = {
    user_id: req.body.user_id,
    title: req.body.title,
    tag: req.body.tag,
    code: req.body.code,
  };

  const sql = 'INSERT INTO snippets set ?';
  const snippet = db.query(sql, newSippet, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      console.log(result);
      return res.json({ message: 'Snippet created' });
    }
  });
});

//update snippet
router.put('/update/:id', auth, (req, res) => {
  const newData = {
    title: req.body.title,
    tag: req.body.tag,
    code: req.body.code,
  };

  const sql = `UPDATE snippets SET title = '${newData.title}', tag = '${newData.tag}', code = '${newData.code}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      return res.json({ message: result });
    }
  });
});

//sort user snippets by tag
router.get('/tag/:tag', auth, async (req, res) => {
  const sql = `SELECT * FROM snippets WHERE tag = "${req.params.tag}" AND user_id = "${req.body.user_id}"`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      console.log('updated');
      res.send(result);
    }
  });
});

//search snippet
router.get('/search', auth, async (req, res) => {
  const sql = `SELECT * FROM snippets WHERE user_id = "${req.body.user_id}" AND (title LIKE "%${req.body.search_item}%" OR code LIKE "%${req.body.search_item}%")`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//delete snippet
router.post('/delete/:id', auth, (req, res) => {
  const sql = `DELETE from snippets WHERE id = ${req.params.id} AND user_id = ${req.body.user_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

module.exports = router;
