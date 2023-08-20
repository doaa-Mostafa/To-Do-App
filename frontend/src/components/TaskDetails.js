import {useTasksContext} from '../hooks/useTasksContext'
import {useAuthContext} from '../hooks/useAuthContext'

const TaskDetails = ({task})=> {
    const {dispatch} = useTasksContext()
    const {user} = useAuthContext()
    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch("http://localhost:4000/api/tasks/"+ task._id, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type:'DELETE_TASK', payload:json})
        }
       

    }
    return (
        <div className="task-details" >
       <div >
            
            <h3  className={task.priority === 'high'? 'high': 'low'}> {task.priority} </h3>
            <h4> {task.todotask} </h4>
            <span  className="material-symbols-outlined" onClick={handleClick}>delete</span>
           
        </div>
        </div>
    )
}

export default TaskDetails