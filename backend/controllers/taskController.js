const Task = require('../models/TasksModel') // to interacte with db
const mongoose = require('mongoose')

// get all tasks

const getTasks = async (req, res)=> {
    const user_id = req.user._id

    const tasks = await Task.find({user_id}).sort({createdAt:-1})  // leave it blank to get all tasks
    res.status(200).json(tasks)
}


// get a single task
const getTask = async (req, res)=> {
    const {id} = req.params  // to grab id

// check id validation from mongoose
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such task'})
    }
    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({erroe:'No such task'})
    }

    res.status(200).json(task)
}


// create new task
const createTask = async (req, res) => {
    // destructure
    const {todotask,priority }=req.body // => possible bec of middleware
    
    let emptyField =[]

    if (!todotask) {
        emptyField.push('todotask')
    }
    if (emptyField.length > 0) {
        return res.status(400).json({error: 'please fill the Task field',emptyField})
    }
    
    // add doc to db
    try {
    const user_id = req.user._id
    const task = await Task.create({todotask,priority, user_id })
    res.status(200).json(task)
   } catch (error) {
      res.status(400).json({error: error.message})
   }
 
}




// delete a task
const deleteTask = async (req, res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such task'})
    }
    const task = await Task.findByIdAndDelete({_id:id})
    
    if (!task) {
        return res.status(404).json({erroe:'No such task'})
    }

    res.status(200).json(task)
}




// update a task

const updateTask= async (req, res)=>{
   const {id} = req.params
   if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such task'})
}
const task = await Task.findByIdAndUpdate({_id:id}, {
    ...req.body
})

if (!task) {
    return res.status(404).json({erroe:'No such task'})
}

res.status(200).json(task)
}

module.exports= {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask

}