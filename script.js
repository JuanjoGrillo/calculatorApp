const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

class Screen {
    constructor(screenElement){
        this.screenElement = screenElement
    }
    screenData = []
    inputChart = (e) => {
        if(e.target.classList.contains('number')) {
            this.screenElement.textContent += e.target.textContent
            this.screenData.push(parseFloat(e.target.textContent))
        } else if(e.target.classList.contains('operation')) {
            if(numbers.some( num => this.screenElement.textContent.slice(-1) === num)) {
                this.screenElement.textContent += e.target.textContent
                this.screenData.push(e.target.textContent)
            } 
        } else if(e.target.classList.contains('equal')){
            this.calculateValue()
        } else if(e.target.classList.contains('openParenthesis')) {
            this.screenElement.textContent += e.target.textContent
            this.screenData.push(e.target.textContent)
        } else if(e.target.classList.contains('closeParenthesis') && numbers.some( num => this.screenElement.textContent.slice(-1) === num)) {
            this.screenElement.textContent += e.target.textContent
            this.screenData.push(e.target.textContent)
        } else if(e.target.classList.contains('squareRoot')) {
            this.screenElement.textContent += e.target.textContent
            this.screenData.push(e.target.textContent)
        } else if(e.target.classList.contains('squarePower') && (numbers.some( num => this.screenElement.textContent.slice(-1) === num) || this.screenElement.textContent.slice(-1) === ")" || this.screenElement.textContent.slice(-1) === "²")) {
            this.screenElement.textContent = `${this.screenElement.textContent}${'\u00B2'}` 
            this.screenData.push(e.target.textContent)
        }
    }
    resolveParenthesis = ( chart ) => {
        const indexOfOpenParenthesis = this.screenElement.textContent.indexOf(chart)
        let oldScreenText = this.screenElement.textContent
        const newScreenText = oldScreenText.slice(indexOfOpenParenthesis + 1, oldScreenText.length)
        
        if(!newScreenText.includes('(')) {
            const indexOfCloseParenthesis = this.screenElement.textContent.indexOf(')')
            console.log(oldScreenText.slice(indexOfOpenParenthesis + 1, indexOfCloseParenthesis))
        } else {
            console.log('El texto tiene muchos parentesis')
        }
    }
    calculateValue = () => {
        this.screenData.map( chart => {
            if (chart === '(') {
                this.resolveParenthesis(chart)
            }
        })
        // let indexOfOpenParenthesis = []
        // let indexOfCloseParenthesis = []
        // this.screenData.map( chart => {
        //     if(chart === '(') {
        //         indexOfOpenParenthesis.push(this.screenData.indexOf(chart))
        //     } else if(chart === ')') {
        //         indexOfCloseParenthesis.push(this.screenData.indexOf(chart))
        //     }
        // })
        // for(let h = 0; h < indexOfOpenParenthesis.length; h++){
        //     for(let i = 0; i < indexOfCloseParenthesis[h]; i++) {
        //         let parenthesisContent = []
        //         parenthesisContent.push() 
        //     }
        // }


    //     const regDelimitationsByAddAndSustract = /([+-])+/
    //     let outerTerms = this.screenElement.textContent.split(regDelimitationsByAddAndSustract)
    //     while(outerTerms.length !== 1) {
    //         if(outerTerms[1] === "+") {
    //         const regDelimitationsByMultiplyAndDivide = /([*/])+/
    //             const firstInnerTerms = outerTerms[0].split(regDelimitationsByMultiplyAndDivide)
    //             const secondInnerTerms = outerTerms[2].split(regDelimitationsByMultiplyAndDivide) 
    //             while(firstInnerTerms.length !== 1) {
    //                 if(firstInnerTerms[1] === "*") {
    //                     const result = parseFloat(firstInnerTerms[0]) * parseFloat(firstInnerTerms[2])    
    //                     firstInnerTerms.splice(0, 3, result)
    //                 } 
    //                 else {
    //                     const result = parseFloat(firstInnerTerms[0]) / parseFloat(firstInnerTerms[2])    
    //                     firstInnerTerms.splice(0, 3, result)
    //                 }
    //             }
    //             while(secondInnerTerms.length !== 1) {
    //                 if(secondInnerTerms[1] === "*") {
    //                     const result = parseFloat(secondInnerTerms[0]) * parseFloat(secondInnerTerms[2])    
    //                     secondInnerTerms.splice(0, 3, result)
    //                 }
    //                  else {
    //                     const result = parseFloat(secondInnerTerms[0]) / parseFloat(secondInnerTerms[2])    
    //                     secondInnerTerms.splice(0, 3, result)
    //                 }
    //             }
    //             const result = parseFloat(firstInnerTerms[0]) + parseFloat(secondInnerTerms[0])
    //             console.log("Result = " + result) 
    //             outerTerms.splice(0, 3, result)
    //         } else {
    //             while(firstInnerTerms !== 1) {
    //                 if(firstInnerTerms[1] === "*") {
    //                     const result = parseFloat(firstInnerTerms[0]) * parseFloat(firstInnerTerms[2])    
    //                     firstInnerTerms.splice(0, 3, result)
    //                 } else {
    //                     const result = parseFloat(firstInnerTerms[0]) / parseFloat(firstInnerTerms[2])    
    //                     firstInnerTerms.splice(0, 3, result)
    //                 }
    //             }
    //             while(secondInnerTerms !== 1) {
    //                 if(secondInnerTerms[1] === "*") {
    //                     const result = parseFloat(secondInnerTerms[0]) * parseFloat(secondInnerTerms[2])    
    //                     secondInnerTerms.splice(0, 3, result)
    //                 } else {
    //                     const result = parseFloat(secondInnerTerms[0]) / parseFloat(secondInnerTerms[2])    
    //                     secondInnerTerms.splice(0, 3, result)
    //                 }
    //             }
    //             const result = parseFloat(outerTerms[0]) - parseFloat(outerTerms[2])
    //             console.log("Result = " + result)
    //             outerTerms.splice(0, 3, result)
    //         }
    //     }
    //     this.screenElement.textContent = outerTerms[0]
    }
}

const screen = new Screen(document.querySelector('.screen'))
const buttons = document.querySelectorAll('.button')
buttons.forEach(bttn => bttn.addEventListener('click', screen.inputChart))









