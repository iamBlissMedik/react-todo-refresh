import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import "./App.css";
function App() {
  const [isCompleteScreen, SetIsCompleteScreen] = useState(false);
  return (
    <>
      <div className="app">
        <h1>my todos</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label htmlFor="">Title</label>
              <input type="text" placeholder="what's the task title?" />
            </div>
            <div className="todo-input-item">
              <label htmlFor="">description</label>
              <input type="text" placeholder="what's the task description?" />
            </div>
            <div className="todo-input-item">
              <button type="button" className="primaryButton">
                Add
              </button>
            </div>
          </div>
          <div className="btn-area">
            <button
              className={`secondaryButton ${
                isCompleteScreen === false && "active"
              }`}
              onClick={() => SetIsCompleteScreen(false)}
            >
              Todo
            </button>
            <button
              className={`secondaryButton ${isCompleteScreen && "active"}`}
              onClick={() => SetIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>
          <div className="todo-list">
            <div className="todo-list-item">
              <h3>task one</h3>
              <p>description</p>
              <div>
                <AiOutlineDelete className="delete-icon" />
                <BsCheckLg className="check-icon"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
