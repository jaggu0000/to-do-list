import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

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
        }

        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id);
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete }
                }
                return todo;
            })
        })
    }

    useEffect(()=> {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md min-h-[550px] flex flex-col p-7 rounded-xl'>

            {/* ------------- title ----------------------- */}

            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text-3xl font-semibold
                '>To-Do-List</h1>
            </div>

            {/* ------------- input box ----------------------- */}

            <div className='flex items-center my-7 bg-gray-300 rounded-full h-14'>
                <input ref={inputRef} type="text" placeholder='Add your task' className='bg-transparent border-0 outline-none flex-1 pl-7 pr-2 h-full placeholder-slate-500 cursor-pointer' />
                <button onClick={add} className='border-none rounded-full bg-green-400 h-full w-32 hover:bg-green-500'>ADD</button>
            </div>

            {/* ------------- to-do list ----------------------- */}

            <div>
                {todoList.map((item, index) => {
                    return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
                })}
            </div>
        </div>
    )
}

export default Todo
