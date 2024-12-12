 
import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import EditTodo from './EditTodo'

const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
            isEditing: false,
        }

        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id);
        });
    };

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete }
                }
                return todo;
            });
        });
    };

    const edit = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isEditing: !todo.isEditing }
                }
                return todo;
            });
        });
    };

    const editTodo = (id, inputText) => {
        if (inputText === "") {
            return null;
        }
        setTodoList((prevTodos => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, text: inputText, isEditing: false }
                }
                return todo;
            });
        }));
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md max-h-[550px] min-h-[550px] flex flex-col p-7 rounded-xl gap-1'>

            {/* ------------- title ----------------------- */}

            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text-3xl font-semibold
                '>To-Do-List</h1>
            </div>

            {/* ------------- input box ----------------------- */}

            <div className='flex items-center my-7 bg-gray-200 rounded-full min-h-14 hover:shadow'>
                <input ref={inputRef} type="text" placeholder='Add your task' className='bg-transparent border-0 outline-none flex-1 pl-7 pr-2 h-14 placeholder-slate-500 cursor-pointer hover:placeholder-slate-600' />
                <button onClick={add} className='border-none rounded-full bg-green-400 h-14 w-32 hover:bg-green-500'>ADD</button>
            </div>

            {/* ------------- to-do list ----------------------- */}

            <div className='overflow-auto scrollbar-hide '>
                {todoList.map((item, index) => {
                    return (!item.isEditing ? <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} edit={edit} /> : <EditTodo 
                        key={index} id={item.id} currentText={item.text} editTodo={editTodo} />)
                })}
            </div>
        </div>
    )
}

export default Todo
 