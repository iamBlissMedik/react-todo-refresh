import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import "./App.css";
import { useEffect } from "react";
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos, newTodoItem];

    setAllTodos(updatedTodoArr);
    localStorage.setItem("updated", JSON.stringify(updatedTodoArr));
  };
  const handleDelete = (index) => {
    let reducedTodos = allTodos.filter((e, i) => i !== index);
    setAllTodos(reducedTodos);
    localStorage.setItem("updated", JSON.stringify(reducedTodos));
  };
  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd} - ${mm} - ${yy} at ${h} : ${m} : ${s}`;
    let filteredObj = {
      ...allTodos[index],
      completedOn,
    };
    let updatedCompletedArr = [...completedTodos, filteredObj];
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);
  };
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("updated"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
  }, []);
  return (
    <>
      <div className="app">
        <h1>my todos</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label htmlFor="">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="what's the task title?"
              />
            </div>
            <div className="todo-input-item">
              <label htmlFor="">description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="what's the task description?"
              />
            </div>
            <div className="todo-input-item">
              <button
                type="button"
                onClick={handleAddTodo}
                className="primaryButton"
              >
                Add
              </button>
            </div>
          </div>
          <div className="btn-area">
            <button
              className={`secondaryButton ${!isCompleteScreen && "active"}`}
              onClick={() => setIsCompleteScreen(false)}
            >
              Todo
            </button>
            <button
              className={`secondaryButton ${isCompleteScreen && "active"}`}
              onClick={() => setIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>
          <div className="todo-list">
            {!isCompleteScreen
              ? allTodos.map((todo, index) => {
                  return (
                    <div className="todo-list-item" key={index}>
                      {" "}
                      <h3>{todo.title}</h3>
                      <p>{todo.description}</p>
                      <div>
                        <AiOutlineDelete
                          className="delete-icon"
                          onClick={() => handleDelete(index)}
                        />
                        <BsCheckLg
                          className="check-icon"
                          onClick={() => handleCompleted(index)}
                        />
                      </div>
                    </div>
                  );
                })
              : completedTodos.map((todo, index) => {
                  return (
                    <div className="todo-list-item" key={index}>
                      {" "}
                      <h3>{todo.title}</h3>
                      <p>{todo.description}</p>
                      <p>
                        {" "}
                        <small>Completed on:</small> {todo.completedOn}
                      </p>
                      <div>
                        <AiOutlineDelete
                          className="delete-icon"
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
