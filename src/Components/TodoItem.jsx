import React from 'react'
import check from '../assets/check.png'
import uncheck from '../assets/circle.png'
import deleteIcon from '../assets/delete.png'

const TodoItem = ({text, date, id, isComplete, deleteTodo, toggle}) => {

  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={()=>{toggle(id)}} className='flex flex-1 my-3 items-center gap-2 cursor-pointer'>
        <img className='w-6 h-6'src={isComplete ? check : uncheck} alt="" />
        <div>
        <p className={`${isComplete ? 'line-through text-gray-500' : ''}`}>{text}</p>
        <p className='text-gray-400'>{date}</p>
        </div>
        
      </div>
      <img onClick={() => {deleteTodo(id)}} className="w-6 cursor-pointer" src= {deleteIcon} alt="" />
    </div>
  )
}

export default TodoItem
