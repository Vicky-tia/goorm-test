import { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {

  const [expenses, setExpenses] = useState([
    {id: 1, charge: "렌트비", amount: 1000}
  ])

  const [edit, setEdit] = useState(false)

  const [charge, setCharge] = useState("")
  const [amount, setAmount] = useState(0)

  const [id, setId] = useState('')

  const [message, setMessage] = useState('')

  const handleEdit = (id) => {
    const expense = expenses.find(item => item.id === id);
    const {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id)
  }  

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber)
  }

  const handleSubmit = (e) => {
     e.preventDefault();

     if(charge!=="" && amount >0) {
      if(edit) {

        const newExpenses = expenses.map(item =>{
          return item.id === id ?
          {...item, charge, amount} : item
        })

        setExpenses(newExpenses);
        setEdit(false);
        showMessage('아이템이 수정되었습니다')

      }else{
      const newExpense ={
        id: crypto.randomUUID(),
        charge,
        amount
      }
      setExpenses([...expenses, newExpense])
      showMessage('아이템이 제출되었습니다')
    }
      setCharge('');
      setAmount(0);
     } else {
      console.log('error');
      showMessage('비용을 입력해주시기 바랍니다')
     }
  }

  const handleDelete =(id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpenses)
    showMessage('아이템이 삭제되었습니다') 
  }

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  
  const clearList =() =>{
    setExpenses([])
    showMessage('아이템 목록이 삭제되었습니다')
  }

  return (
    <main className="main-container">
      <header className={`Alert ${message ? 'active' : ''}`}>{message}</header>

      <h1>예산계산기</h1>

      <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}>
        <ExpenseForm
        edit={edit}
        charge={charge}
        amount={amount}
        handleCharge={handleCharge}
        handleAmount={handleAmount}
        handleSubmit={handleSubmit}
        />
      </div>
      <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}>
        <ExpenseList 
        handleDelete={handleDelete}
        expenses={expenses}
        handleEdit={handleEdit}
        clearList={clearList}

        />
      </div>

<div style={{display:'flex', justifyContent:'end', marginTop:'1rem'}}>
<p style={{ fontSize: '2rem' }}>
  총지출 : 
  <span>
    {expenses.reduce((acc, curr)=> {
      return (acc += curr.amount)
    },0)}
    원</span>
</p>
</div>

    </main>
  );
}

export default App;



 