import { useState } from "react";

function App() {

  interface Todo {
    id: number;
    tittle: string;
    done: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>("")

  function addTodo() {
    if(!input.trim()) return;
    setTodos([...todos, {id: Date.now(), tittle: input, done: false}])
    setInput("")
  }

  function toggleStatus(id: number) {
    setTodos(todos.map((todo) => {
      if(todo.id === id) {
        todo.done = !todo.done
        return todo
      }
      return todo
    }))
  }
  

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  console.log(todos);
  
  return (
    <>
    <input onChange={(e) => setInput(e.target.value)} className="input" value={input} type="text" />
    <button className="add_btn" onClick={addTodo}>Add</button>
   
    <ul className="main_box">
      {
        todos.map((todo) => (
          <div key={todo.id} className={`Box ${todo.done ? "completed" : ""}`}>
            <span onClick={() => toggleStatus(todo.id)} className="todo-text">{todo.tittle}</span>
            <button onClick={() => deleteTodo(todo.id)} className="remove_btn">Remove</button>
          </div>
        ))
      }
    </ul>
    </>
  )
}

  
export default App