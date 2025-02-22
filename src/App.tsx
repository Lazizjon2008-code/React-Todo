import { useEffect, useState } from "react";

function setCookie(name: string, value: string) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 1); 
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

function getCookie(name: string) {
  const value: string = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()!.split(";").shift();
  } 
  return null;
}


interface Todo {
  id: number;
  tittle: string;
  done: boolean;
}

function App() {


  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>("")


  useEffect(  () => {
    const cookieTodos = getCookie("todos")
    if(cookieTodos){
      setTodos(JSON.parse(cookieTodos))
    }
  },[])

  useEffect(() => {
    setCookie("todos", JSON.stringify(todos))
  }, [todos])


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
    <div className="container">
    <input onChange={(e) => setInput(e.target.value)} className="input" value={input} type="text" />
    <button className="add_btn" onClick={addTodo}>Add</button>
   
    <div className="main_box">
      {
        todos.map((todo) => (
          <div key={todo.id} className="Box">
            <span className={`todo-text ${todo.done ? "completed" : ""}`}>{todo.tittle}</span>
            <button  onClick={() => toggleStatus(todo.id)} className="done_btn">Done</button>
            <button onClick={() => deleteTodo(todo.id)} className="remove_btn">Remove</button>
          </div>
        ))
      }
    </div>
    </div>
    </>
  )
}

  
export default App