const screen = document.querySelector('.screen')
const numbers = document.querySelectorAll('.number')
const insertNumber = (e) => {
    screen.textContent += e.target.textContent
}
numbers.forEach( number => 
    number.addEventListener('click', insertNumber)
)