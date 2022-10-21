const result = document.querySelector(".equation-text");
const hist = document.querySelector(".history-text");
let operand1 = null;
let operation = null;
let operand2 = null;

function performOperation() {
    switch (operation) {
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "×":
            console.log(operand1,operand2, operation)
            return Math.floor((operand1 * operand2)*1000)/1000;
        case "÷":
            if(operand2 === 0){
                return NaN;
            }
            return Math.floor((operand1 / operand2)*1000)/1000;
    }
    return NaN;
}

function setButtons() {
    document.querySelector("#equals").addEventListener("click", (e) => {
        if (operand1!==null && operation!==null) {
            operand1 = Number(hist.innerText);
            operand2 = Number(result.innerText);
            let res = performOperation();
            if(res!==NaN){
                result.innerText = res.toString().slice(0, 13);
                hist.innerText = operand2.toString().slice(0,13);
                operation = operand1 = null;
            } else {
                document.querySelector("#clear").dispatchEvent(
                    new MouseEvent("click", {bubbles: true, cancellable: true})
                );
            }
        }
    });
    document.querySelectorAll(".op-btn").forEach((elm) => {
        elm.addEventListener("click", (e) => {
            if ( operation === null) {
                operand1 = Number(result.innerText);
                operation = elm.innerText;
                hist.innerText = operand1.toString().slice(0,13);
                result.innerText = "";
            } else {
                operand1 = Number(hist.innerText);
                operand2 = Number(result.innerText);
                let res = performOperation();
                hist.innerText = res.toString().slice(0,13);
                result.innerText = "";
                operand1 = operand2;
                operation = elm.innerText;
            }
        });
    });

    document.querySelectorAll(".num").forEach((elm) => {
        elm.addEventListener("click", (e) => {
            if(result.innerText.includes("N")){
                result.innerText = "";
            }
            if (result.innerText.length < 14) {
                result.innerText += elm.innerText;
            }
        });
    });
    document.querySelector("#dot").addEventListener("click", (e) => {
        if (result.innerText.includes(".")) {
            return;
        }
        result.innerText += ".";
    });

    document.querySelector("#backspace").addEventListener("click", () => {
        if (result.innerText.length > 0) {
            result.innerText = result.innerText.slice(
                0,
                result.innerText.length - 1
            );
        }
    });

    document.querySelector("#clear").addEventListener("click", () => {
        result.innerText = "";
        hist.innerText = "";
        operand1 = operation = operand2 = null;
    });
}

(function main() {
    const btns = document.querySelectorAll(".calc-btn");
    setButtons();
    return 0;
})();
