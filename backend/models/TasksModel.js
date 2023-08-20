const mongoose = require('mongoose') // allow us to make schema bec mongo is schema less

const Schema = mongoose.Schema

const taskSchema = new Schema({

  todotask:{
    type:String,
    required:true
},

  priority:{
  type:String,
  
  },
   
    user_id: {
      type: String,
      required: true
    }

}, )


module.exports = mongoose.model('Task',taskSchema) // create Task collections automaticly

