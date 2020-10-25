// Variable for holding ui elements
const form = document.getElementById('loan-form');
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthlyPayment');
const totalPayment = document.getElementById('totalPayment');
const totalInterest = document.getElementById('totalInterest');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const errorMsg = document.querySelector('.alert');
const reset = document.querySelector('#reset');
let errorTimer, calculateTimer;
// Event listener
form.addEventListener('submit', calculationProcess);
reset.addEventListener('click', resetAll);
amount.addEventListener('focus', selectAll);
interest.addEventListener('focus', selectAll);
years.addEventListener('focus', selectAll);
// Function for general work flow
function calculationProcess(e) {
    e.preventDefault();
    loading.style.display = 'block';
    result.style.display = 'none';
    errorMsg.style.display = "none";
    clearTimeout(errorTimer);
    clearTimeout(calculateTimer);
    calculateTimer = setTimeout(calculateResults, 1500);
}
// Function for the calculation
function calculateResults() {
    const principal = Number(amount.value);
    const periodicInterestRate = Number(interest.value) / 100 / 12;
    const periodicPayment = Number(years.value) * 12;
    const x = Math.pow(1 + periodicInterestRate, periodicPayment);
    const monthly = (principal * x * periodicInterestRate) / (x - 1);
    if(isFinite(monthly)) {
        monthlyPayment.value = `$ ${monthly.toFixed(2)}`;
        totalPayment.value = `$ ${(monthly * periodicPayment).toFixed(2)}`;
        totalInterest.value = `$ ${((monthly * periodicPayment) - principal).toFixed(2)}`;
        loading.style.display = 'none';
        result.style.display = 'block';
    } else {
        loading.style.display = 'none';
        showError();
    }
}
// Function for showing error message for 3s
function showError() {
    errorMsg.style.display = "block";
    // Only show error message for 3s for better user experience.
    errorTimer = setTimeout(() => errorMsg.style.display = "none", 3000);
}
// Function for reset the ui
function resetAll() {
    result.style.display = 'none';
}
// Select all value when focus on the field
function selectAll(e) {
    e.target.select();
}