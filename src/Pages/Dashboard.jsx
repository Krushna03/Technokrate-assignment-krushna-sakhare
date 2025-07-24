import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/authAtom";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const Dashboard = () => {
  const user = useRecoilValue(authAtom);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!task.trim()) return toast.error("Task cannot be empty");
    setTodos((prev) => [...prev, task]);
    setTask("");
    toast.success("Task added successfully!");
  };

  const deleteTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
    toast.info("Task removed");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {todos.length > 0 ? (
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
            >
              <span>{todo}</span>
              <button onClick={() => deleteTodo(index)} className="text-red-600">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks yet. Add some!</p>
      )}
    </div>
  );
};

export default Dashboard;
