import React, { useEffect, useRef, useState } from 'react'

import check_mark from '../assets/check-mark.png'
import TodoItem from './TodoItem'
const Todo = () => {
    const inputRef = useRef();
    const [todoList, setTodoList] = useState(localStorage.getItem('todos')?
    JSON.parse(localStorage.getItem('todos')):[]);
    const [errorMessage, setMessage] = useState('');
    const dateRef = useRef();
    
    const add = ()=>{
      if(!inputRef.current.value){
        setMessage('Please enter a task first')
        return null;
      }else{
        setMessage('')
      }
        const inputText = inputRef.current.value.trim();
        const dateVal = dateRef.current.value;
        const newTodo = {
          id: Date.now(),
          text: inputText,
          isComplete: false, 
          date: dateVal ? dateVal : null
        }
        setTodoList((prev)=> [...prev, newTodo]);
        inputRef.current.value = '';
        dateRef.current.value = Date.now()
    }

    const deleteTodo = (id) => {
      setTodoList((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id)
      })
    }

    const toggle = (id) => {
      setTodoList((prevTodos)=> {
        return prevTodos.map((todoitem)=>{
          if(todoitem.id === id){
            return {...todoitem, isComplete: !todoitem.isComplete}
          }
          return todoitem;
        })
      })
    }
useEffect(()=> {
  localStorage.setItem("todos", JSON.stringify(todoList))
  
},[todoList])
  return (
    <>
    <div className='bg-white place-self-center 
    w-11/12 max-w-md felx felx-col p-7 min-h-[550px] rounded-3xl'>
      <div className="flex mt-7 items-center gap-2">
        <img className="w-1/10 h-1/10" src={check_mark} alt="" />
        <h1 className="text-2xl font-semibold text-black">Todo list</h1>
      </div>
      <p className='text-red-500 text-xl my-3'>{errorMessage}</p>
      <div className='flex items-center my-4 bg-gray-400 w-full rounded-full'>
        <input ref={inputRef} className='pr-2 pl-2 border-0 bg-transparent
         outline-none flex-1 placeholder:text-slate-600' type="text" placeholder='Add your text here'/>
        <button onClick={add} className='bg-red-500 p-2 rounded-full text-amber-50 mr-0.1 w-20 cursor-pointer'>
            ADD +
            </button>
        </div>
        <input type="date" ref={dateRef}/>
        <div>
          {todoList.map((item, index) => {
            return <TodoItem key={index} 
            text={item.text} date={item.date} id={item.id} 
            isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
          })}
           
        </div> 
    </div>
   
    </>
  )
}

export default Todo
