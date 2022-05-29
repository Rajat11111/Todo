const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
app.use(cors());
app.use(express.json());


app.post("/todos", async(req, res) => {
    try{
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo_list (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    }catch(err){
        console.error(err.message);

    }

});


app.get("/todos", async(req, res) => {
    try{
        const allTodo = await pool.query("SELECT * FROM todo_list");
        res.json(allTodo);

    }catch(err){
        console.error(err.message);
    }
})

app.get("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo_list WHERE todo_list_id = $1", [id]);
        res.send(todo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

app.put("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const {description} = req.body;
        const UpdateTodo = await pool.query("UPDATE todo_list SET description = $1 WHERE todo_list_id = $2 ", [description, id]);
        res.json("Todo was updated!");

    }catch(err){
        console.error(err.message);
    }
})

app.delete("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const DeleteTodo = await pool.query("DELETE FROM todo_list WHERE todo_list_id = $1", [id]);
        res.json("Todo was deleted");

    }catch(err){
        console.error(err.message);
    }
})



app.listen(5000, () => { 
    console.log("Server has started at port 5000");
});