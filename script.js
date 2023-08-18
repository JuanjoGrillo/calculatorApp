const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

class Screen {
    constructor(screenElement){
        this.screenElement = screenElement
    }
    inputChart = (e) => {
        if(e.target.classList.contains('number')) {
            this.screenElement.textContent += e.target.textContent
        } else if(e.target.classList.contains('operation')) {
            if(numbers.some( num => this.screenElement.textContent.slice(-1) === num)) {
                this.screenElement.textContent += e.target.textContent
            } else {
                console.log('Need a number first')
            }
        } else if(e.target.classList.contains('equal')){
            this.calculateValue()
        }
    }
    calculateValue = () => {
        const regDelimitationsByAddAndSustract = /([+-])+/
        let outerTerms = this.screenElement.textContent.split(regDelimitationsByAddAndSustract)
        if(outerTerms.length === 1) {
            const regDelimitationsByMultiplyAndDivide = /([*/])+/
            outerTerms = outerTerms[0].split(regDelimitationsByMultiplyAndDivide)
            console.log(outerTerms)
        }
        // Separar en funciones cada calculo para los casos en que no haya sumas ni restas
        // Agregar el resto de las funcionalidades con parentesis, raices y potencias
        while(outerTerms.length !== 1) {
            if(outerTerms[1] === "+") {
            const regDelimitationsByMultiplyAndDivide = /([*/])+/
                const firstInnerTerms = outerTerms[0].split(regDelimitationsByMultiplyAndDivide)
                const secondInnerTerms = outerTerms[2].split(regDelimitationsByMultiplyAndDivide) 
                while(firstInnerTerms.length !== 1) {
                    if(firstInnerTerms[1] === "*") {
                        const result = parseFloat(firstInnerTerms[0]) * parseFloat(firstInnerTerms[2])    
                        firstInnerTerms.splice(0, 3, result)
                    } 
                    else {
                        const result = parseFloat(firstInnerTerms[0]) / parseFloat(firstInnerTerms[2])    
                        firstInnerTerms.splice(0, 3, result)
                    }
                }
                while(secondInnerTerms.length !== 1) {
                    if(secondInnerTerms[1] === "*") {
                        const result = parseFloat(secondInnerTerms[0]) * parseFloat(secondInnerTerms[2])    
                        secondInnerTerms.splice(0, 3, result)
                    }
                     else {
                        const result = parseFloat(secondInnerTerms[0]) / parseFloat(secondInnerTerms[2])    
                        secondInnerTerms.splice(0, 3, result)
                    }
                }
                const result = parseFloat(firstInnerTerms[0]) + parseFloat(secondInnerTerms[0])
                console.log("Result = " + result) 
                outerTerms.splice(0, 3, result)
            } else {
                while(firstInnerTerms !== 1) {
                    if(firstInnerTerms[1] === "*") {
                        const result = parseFloat(firstInnerTerms[0]) * parseFloat(firstInnerTerms[2])    
                        firstInnerTerms.splice(0, 3, result)
                    } else {
                        const result = parseFloat(firstInnerTerms[0]) / parseFloat(firstInnerTerms[2])    
                        firstInnerTerms.splice(0, 3, result)
                    }
                }
                while(secondInnerTerms !== 1) {
                    if(secondInnerTerms[1] === "*") {
                        const result = parseFloat(secondInnerTerms[0]) * parseFloat(secondInnerTerms[2])    
                        secondInnerTerms.splice(0, 3, result)
                    } else {
                        const result = parseFloat(secondInnerTerms[0]) / parseFloat(secondInnerTerms[2])    
                        secondInnerTerms.splice(0, 3, result)
                    }
                }
                const result = parseFloat(outerTerms[0]) - parseFloat(outerTerms[2])
                console.log("Result = " + result)
                outerTerms.splice(0, 3, result)
            }
        }
        this.screenElement.textContent = outerTerms[0]
    }
}

const screen = new Screen(document.querySelector('.screen'))
const buttons = document.querySelectorAll('.button')
buttons.forEach(bttn => bttn.addEventListener('click', screen.inputChart))









