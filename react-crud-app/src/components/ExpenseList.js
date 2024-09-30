import React from 'react'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'
import './ExpenseList.css';

const ExpenseList = ({expenses,handleDelete,handleEdit,clearList}) => {

    return (
    <>
        <ul className='list'>
            {
            expenses.map(expense => {
                return <ExpenseItem
                handleEdit={handleEdit} 
                handleDelete={handleDelete}
                key={expense.id}
                expense={expense} />
            })
             } 
        </ul>
        <button className='btn'
         onClick={clearList}>
            목록지우기
            <MdDelete/>
        </button>



    </>
  )
}

export default ExpenseList