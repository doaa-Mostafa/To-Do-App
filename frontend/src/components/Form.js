import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
const Form = () => {
  const { dispatch } = useTasksContext();
  const {user} = useAuthContext()
 
  const [todotask, setTodotask] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState(null);
  const [emptyField, setEmtyField]=useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }
    const task = {  todotask,priority };

    const response = await fetch("http://localhost:4000/api/tasks/", {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmtyField(json.emptyField)
    }
    if (response.ok) {
      
      setError(null)
      setTodotask('')
      setPriority('')
      setEmtyField([])
      console.log("new task addes", json)
      dispatch({ type: 'CREATE_TASK', payload: json })
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>

      

     

      <label>Task:</label>
      <input onChange={(e) => setTodotask(e.target.value)} 
      value={todotask}
      className={emptyField.includes('todotask') ? 'error': ''} />
       
      
     
       <label>priority:</label>
      <select onChange={(e) => setPriority(e.target.value)} 
      value={priority}
      >
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Form;
