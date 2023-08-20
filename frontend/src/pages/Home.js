import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import {useAuthContext } from '../hooks/useAuthContext'

// components
import TaskDetails from "../components/TaskDetails";
import Form from "../components/Form";

const Home = () => {

  const { tasks, dispatch } = useTasksContext();
  const {user} = useAuthContext()

  useEffect(() => { // this function runs once when the components render
    // fetch tasks from the api in the backend
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:4000/api/tasks", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TASKS', payload: json }); // update global context state
      }
    };

    if (user) {
      fetchTasks();
    } 

    
  }, [dispatch, user]); // dependency array [] function fires ones when first render
  return (
    <div className="home">
      
      <div className="tasks">
      <Form />
       
        {tasks && tasks.map( task => (<TaskDetails  task={task} key={task._id} />
          ))}
      </div>
      </div>
      
    
  );
};

export default Home;
