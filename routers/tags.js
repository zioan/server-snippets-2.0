const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

//create table is not already
router.get('/createtagstable', (req, res) => {
  const sql =
    'CREATE TABLE tags(id int AUTO_INCREMENT, user_id VARCHAR(255), tag VARCHAR(255), PRIMARY KEY (id))';
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

// get all user tags
router.get('/all/:user_id', auth, (req, res) => {
  const sql = `SELECT * FROM tags WHERE user_id = "${req.params.user_id}"`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//create new tag
router.post('/add', auth, (req, res) => {
  const newTag = {
    user_id: req.body.user_id,
    tag: req.body.tag,
  };

  const sql = 'INSERT INTO tags set ?';
  const snippet = db.query(sql, newTag, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      console.log(result);
      return res.json({ message: 'Tag created' });
    }
  });
});

//update tag
router.get('/update/:id', auth, (req, res) => {
  const newData = {
    user_id: req.body.user_id,
    tag: req.body.tag,
  };

  const sql = `UPDATE tags SET user_id = '${newData.user_id}', tag = '${newData.tag}' WHERE id = ${req.params.id} AND user_id = ${req.body.user_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      return res.json({ message: result });
    }
  });
});

//delete tag
router.delete('/delete/:id', auth, (req, res) => {
  const sql = `DELETE from tags WHERE id = ${req.params.id}`;
  // const sql = `DELETE from tags WHERE id = ${req.params.id} AND user_id = ${req.body.user_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
