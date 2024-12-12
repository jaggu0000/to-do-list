import React from 'react'
import tick from '../assets/tick_green.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
    return (
        <div className='flex items-center my-3 gap-2'>
            <div onClick={() => toggle(id)} className='flex flex-1 items-center cursor-pointer gap-1'>
                <img src={isComplete ? tick : not_tick} alt="" className='w-7 hover:bg-gray-300 hover:rounded-full' />
                <p className={`text-slate-900 text-[18px] decoration-slate-500 ${isComplete ? 'line-through' : null}`}>{text}</p>
            </div>

            <img onClick={() => { deleteTodo(id) }} src={delete_icon} alt="" className='w-4 cursor-pointer' />

        </div>
    )
}

export default TodoItems
 