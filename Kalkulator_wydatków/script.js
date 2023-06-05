const colorLight = document.querySelector('.light');
const colorDark = document.querySelector('.dark');
const colorDollar = document.querySelector('.dollar');
const deleteBtn = document.querySelector('.delete');
const addTransaction = document.querySelector('.add-transaction');
const deleteAllTransaction = document.querySelector('.delete-all');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const availableMoney = document.querySelector('.available');

const header = document.querySelector('.header')
const newPanelAdd = document.querySelector('.new-panel-add')
const error = document.querySelector('.error')

const revenue = document.querySelector('.revenue')
const expenses = document.querySelector('.expenses')
const transactionName = document.querySelector('.transaction-name')
const transactionRevenue = document.querySelector('.transaction-revenue')

const inputName = document.querySelector('#name')
const inputSum = document.querySelector('#sum')
const inputCategory = document.querySelector('#category')
const option1 = document.querySelector('option[value="income"]')
const option2 = document.querySelector('option[value="shopping"]')
const option3 = document.querySelector('option[value="food"]')
const option4 = document.querySelector('option[value="game"]')

let ID = 0
const moneyArr = [0]

function changeToDark() {
  document.body.style.backgroundImage = 'none'
  document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.426)'
  document.body.style.backgroundSize = 'auto'
}

function changeToLight() {
  document.body.style.backgroundImage = 'none'
  document.body.style.backgroundColor = 'white'
  document.body.style.backgroundSize = 'auto'
}

function changeToFonDollar() {
  document.body.style.backgroundImage = 'url(images/fon-dollar.png)'
  document.body.style.backgroundColor = ''
}

colorDark.addEventListener('click', changeToDark)
colorLight.addEventListener('click', changeToLight)
colorDollar.addEventListener('click', changeToFonDollar)



const showPanel = () => {
  newPanelAdd.style.display = 'flex'
}
addTransaction.addEventListener('click', showPanel)


const saveCancelTransaction = () => {
  newPanelAdd.style.display = 'none'
};
cancelBtn.addEventListener('click', saveCancelTransaction)



const addNewRevenueExpenses = () => {
  error.textContent = ''
  if (inputName.value !== '' && inputSum.value !== '' && inputCategory.value == option1.value && inputSum.value > 0){
    const newDiv = document.createElement('div')
    newDiv.classList.add('transaction')
    newDiv.setAttribute('id', ID)
    revenue.appendChild(newDiv)

    const newPName = document.createElement('p');
    newPName.innerHTML = '<i class="fas fa-money-bill-wave"></i>' + ' ' + inputName.value;
    newPName.classList.add('transaction-name')

    const newPSum = document.createElement('p')
    newPSum.textContent = inputSum.value;
    newPSum.classList.add('transaction-revenue')

    const newBtn = document.createElement('button')
    newBtn.innerHTML = '<i class="fas fa-times"></i>'
    newBtn.classList.add('delete')
    newBtn.addEventListener('click', removeTransaction)

    newDiv.appendChild(newPName)
    newDiv.appendChild(newPSum)
    newDiv.appendChild(newBtn)

    saveCancelTransaction()

    moneyArr.push(parseFloat(inputSum.value))
    countMoney(moneyArr)

    inputName.value = ''
    inputSum.value = ''
    inputCategory.value = ''
    error.textContent = ''

  } else if (inputName.value !== '' && inputSum.value !== '' && inputCategory.value !== '' && inputSum.value < 0 && (inputCategory.value === option2.value || inputCategory.value === option3.value || inputCategory.value === option4.value)){
    const newDiv = document.createElement('div')
    newDiv.classList.add('transaction')
    newDiv.setAttribute('id', ID)
    expenses.appendChild(newDiv)

    const newPName = document.createElement('p')
    newPName.classList.add('transaction-name')

    switch (inputCategory.value) {
      case option2.value:
        newPName.innerHTML = '<i class="fas fa-cart-arrow-down"></i>' + ' ' + inputName.value;
        break;
      case option3.value:
        newPName.innerHTML = '<i class="fa-solid fa-mug-saucer"></i>' + ' ' + inputName.value;
        break;
      case option4.value:
        newPName.innerHTML = '<i class="fa-solid fa-icons"></i>' + ' ' + inputName.value;
        break;
    }

    const newPSum = document.createElement('p')
    newPSum.textContent = inputSum.value
    newPSum.classList.add('transaction-revenue')

    const newBtn = document.createElement('button')
    newBtn.innerHTML = '<i class="fas fa-times"></i>'
    newBtn.classList.add('delete')
    newBtn.addEventListener('click', removeTransaction);

    newDiv.appendChild(newPName)
    newDiv.appendChild(newPSum)
    newDiv.appendChild(newBtn)

    saveCancelTransaction()
    moneyArr.push(parseFloat(inputSum.value))
    countMoney(moneyArr)

    inputName.value = ''
    inputSum.value = ''
    inputCategory.value = ''
    error.textContent = ''

  } else if (inputSum.value < 0 && inputName.value !== '' && inputCategory.value == option1.value){
    error.textContent = 'Twój przychód dnie może być z minusem 😉'
  } else{
    inputName.value = ''
    inputSum.value = ''
    inputCategory.value = ''
    error.textContent = 'Wypełni wszystkie pola'
  }
  ID++
  
}

saveBtn.addEventListener('click', addNewRevenueExpenses)

const countMoney = money => {
  const newMoney = money.reduce((a, b) => a + b)
  availableMoney.textContent = `${newMoney}zł`
}

function removeTransaction(e) {
  const transaction = e.target.closest('.transaction');
  if (transaction){
    transaction.remove()
    const transactionRevenueValue = parseFloat(transaction.querySelector('.transaction-revenue').textContent);
    moneyArr.splice(transaction.getAttribute('id'), 1, -transactionRevenueValue);
    countMoney(moneyArr);
  }
}

function removeAllTransaction(){
  expenses.innerHTML = '<h3>Przychód:</h3>'
  revenue.innerHTML = '<h3>Wydatki:</h3>'
  availableMoney.textContent = '0zł'
  moneyArr = [0];
}
deleteAllTransaction.addEventListener('click',removeAllTransaction)
