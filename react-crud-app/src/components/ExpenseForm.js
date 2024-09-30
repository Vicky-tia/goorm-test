import React from 'react'
import { MdSend } from 'react-icons/md'
import './ExpenseForm.css'

const ExpenseForm = ({charge,amount,handleCharge,handleAmount,handleSubmit,edit}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div className='form'>
            <div className='form-group'>
                <label htmlFor='charge'>지출항목</label>
                <input
                type='text'
                id='charge'
                name='charge'
                className='form-control'
                placeholder='예) 렌트비'
                value={charge}
                onChange={handleCharge}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='amount'>비용</label>                
                <input
                type='number'
                id='amount'
                name='amount'
                className='form-control'
                placeholder='예) 100'
                value={amount}
                onChange={handleAmount}
                />
            </div>
        </div>
        <button type ='submit' className='btn'>
            {edit ? "수정" : "제출"}
            <MdSend />
        </button>
    </form>
  )
}

export default ExpenseForm