 
import React, {useRef} from 'react'

const EditTodo = ({ id, currentText, editTodo }) => {

    const inputRef = useRef();

    const handleEdit = () => {
        const inputText = inputRef.current.value.trim();
        editTodo(id, inputText);
    };

    return (
        <div className='flex items-center bg-gray-200 rounded-full min-h-10 hover:shadow'>
            <input ref={inputRef} type="text" defaultValue={currentText} placeholder='Edit your task' className='bg-transparent border-0 outline-none flex-1 pl-7 pr-2 h-10 placeholder-slate-500 cursor-pointer' />
            <button onClick={handleEdit} className='border-none rounded-full bg-green-400 h-10 w-32 hover:bg-green-500'>SAVE</button>
        </div>
    )
}

export default EditTodo
 