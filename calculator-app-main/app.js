let resultContainer = document.getElementById('result');
let numsContainer = document.getElementById('numsContainer');

/*result is a string*/ 
let result = resultContainer.textContent;
let finalElem = true;
let displayedOperations = true;

numsContainer.addEventListener("click", returnValue);

function returnValue(e){
    if(e.target.tagName === "DIV" || e.target.tagName === "P") {

        let paragraph
        if(e.target.tagName === "DIV"){
            paragraph = e.target.querySelector("p");
        } else if(e.target.tagName === "P"){
            paragraph = e.target;
        }

        const value = paragraph.textContent;

        if(value === "RESET"){
            result = "0";
            resultContainer.textContent = result;
            displayedOperations = false;
        }   
        else if(value === "DEL"){
            result = "0";
            result = result.slice(0, -1);
            resultContainer.textContent  = result || "0";
            displayedOperations = false;
        }   
        else if (value === "x" && finalElem != " "){
            result = result + " * ";
            resultContainer.textContent = result;
            displayedOperations = false;
        }   
        else if(value === "="){
            showResult(result);
            displayedOperations = true;
        } else {
            if (result === "0") {
                result = value;
            } else {
                result = result + value;
            }
            resultContainer.textContent = result;
        } 
        
    } else if (value !== "x" && value !== "RESET" && value !== "DEL" && value !== "=" && finalElem != " ") {
            if (value === ".") {
                result = result + value;
                resultContainer.textContent = result;
                displayedOperations = false;
            } else {
                result = result + " " + value + " ";
                resultContainer.textContent = result;
                displayedOperations = false;
            }
            
        }
        displayedOperations = false;
        returnFinalElement(result);
    }


function showResult(operations){
    try{
        resultContainer.textContent = eval(operations)
        result = resultContainer.textContent
        displayedOperations = true
        showWithCommas(result)

    } catch (error){
        resultContainer.textContent = "Error"
        result = " "
    }
}

function returnFinalElement(result){
    finalElem = result[result.length - 1]
}

function placeCommas(chain) {
    let chainWithComma = ""
    if (chain.length > 3) {
        for (let i = chain.length - 1, counter = 0; i >= 0; i--) {
        chainWithComma = chain[i] + chainWithComma
        counter++
        // Insertar una coma después de cada grupo de tres dígitos
            if (counter === 3 && i !== 0) {
                chainWithComma = "," + chainWithComma
                counter = 0
            }
        }
    } else{
        chainWithComma = chain
    }

    return chainWithComma
}

function placeCommasAllString(str) {
    //let str = "9029889 + 2788.5998 * 2 + 323332 - 5848"
    let chains
    let lastString = ""

    // Convert the string into an array of string for each space found

        chains = str.split(" ") 
        
        for (let i = 0; i < chains.length; i++) {
            let chain = chains[i]
            
            //If the string contains an arithmetic expression, only add it to the final string
            if (chain === "+" || chain === "-" || chain === "*" || chain === "/") {
                lastString = lastString + " " + chain + " "
            } 
            else if (chain.includes(".")) {
                let chainWithFullstop = chain.split(".")
                let chainWithFullstopAndCommas = placeCommas(chainWithFullstop[0]) + "." + chainWithFullstop[1]
                lastString = lastString + chainWithFullstopAndCommas
            } 
            else if (chain.length > 3) { 
                // If the string is greater then 3, add a comma to the beginning
                let chainWithComma = placeCommas(chain)
                lastString = lastString + chainWithComma
            } 
            else{
                lastString = lastString + chain
            }
            
        }   

return lastString
}

function showWithCommas(value) {
    
    let valueWithCommas
    
    if (value.includes(" ")) {
        valueWithCommas = placeCommasAllString(value)
    }
    else if (value.includes(".")) {
        let chainWithFullstop = value.split(".")
        let chainWithFullstopAndCommas = placeCommas(chainWithFullstop[0]) + "." + chainWithFullstop[1]
        valueWithCommas = chainWithFullstopAndCommas
    } else{
        valueWithCommas = placeCommas(value)
    }

    result = valueWithCommas
    resultContainer.textContent = result
    return result
}

/*SELECCIONAR COLOR*/
let main = document.getElementById('main')
let selectColor = document.getElementById('select-color')
let theme = document.getElementById('theme')

selectColor.addEventListener("click", themeSelector)
theme.addEventListener("click", changeTheme)

function changeTheme(){
    switch(selectColor.value){
        case "1":
            selectColor.value = "2"
            break;
        case "2":
            selectColor.value = "3"
            break;
        case "3":
            selectColor.value = "1"
            break;
        default:
            break;
    };
    themeSelector()
}

function themeSelector() {
    switch (selectColor.value) {
        case "1":
            main.classList.remove("theme2-main")
            main.classList.remove("theme3-main")
            break;
        case "2":
            main.classList.remove("theme3-main")
            main.classList.add("theme2-main")
            break;
        case "3":
            main.classList.remove("theme2-main")
            main.classList.add("theme3-main")
        default:
            break;
    }
}