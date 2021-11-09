const express = require('express'); 
const pool = require('./db')
const app = express();

// This route shows all the tasks either completed or not
app.get("/getAllTasks" , (req , res) => {
    pool.query('SELECT * FROM todo ORDER BY todo_id ASC', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
})

// This route creates a new task
app.post("/createTask" , async(req , res) => {
  const { name, status} = req.body

  pool.query('INSERT INTO todo (name, status) VALUES ($1, $2)', [name, status], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Task added with description: ${result.name}`)
  })
})

// This route updates a particular task with status completed
app.put("/updateTask" , (req , res) => {
    const {id , status} = req.body
    pool.query('UPDATE todo SET status = $2 where todo_id = $1', [id , status], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send("Updated Successfully")
    })
})

// This route shows all the tasks which are completed
app.get("/CompletedTask" , (req , res) => {
    const {status} = req.body
    pool.query('SELECT * FROM todo where status = $1', [status], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
})

// This route shows all the tasks which are yet to be completed
app.get("/taskToBeDone" , (req , res) => {
    const {status} = req.body
    pool.query('SELECT * FROM todo where status = $1', [status], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
})

const port = 8000

app.listen(port , () => {
    console.log(`App is running at ${port}`)
})
