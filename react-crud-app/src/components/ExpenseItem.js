import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import './ExpenseItem.css'

const ExpenseItem = ({expense, handleDelete,handleEdit}) => {
console.log(expense)
  return (
    <li className='item-container'>
        <div className='item'>
            <span className='charge'>{expense.charge}</span>
            <span className='amount'>{expense.amount}원</span>
        </div>
        <div>
            <button className='item-btn'
            onClick={() => handleEdit(expense.id)}
            >
            <MdEdit style={{color:'green'}}/>
            </button>
            <button className='item-btn'
                onClick={() => handleDelete(expense.id)}
            >
            <MdDelete style={{color:'red'}}/>
            </button>
        </div>
    </li>
  )
}

export default ExpenseItem