const express = require("express");
const router = express.Router();
const pool = require("../db/mysql");

const app = express();

app.get("/", (req, res) => {
  const id = req.query.id
  const name = '%' + req.query.name + '%'
  poll.query(
    "SELECT * FROM products WHERE id = ? and name like ?", [id, name],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.send(err);
      }
    }
  );
});

app.post("/", ()=>{
  poll.query('INSERT INTO ', req.body, (err, res)=>{
    if (!err) {
      res.send('insert success');
    } else {
      res.send(err);
    }
  })
})

app.put('/', function (req, res) {
  const name = req.query.name
  const id = req.query.id
  pool.query('UPDATE `name` SET `name`=?, where `id`=?', [name, id], (error, results)=>{
   if (error) throw error;
   res.end((results));
 });
});

app.delete("/:id", function(req, res) {
 const id = req.params.id
  pool.query("DELETE FROM products WHERE id = ?", [id],(err, res) => {
    if (err) {
      console.log(err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
});

module.exports = router;


router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
});