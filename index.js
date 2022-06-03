// function add(v1, v2) {
//     return parseInt(v1) + parseInt(v2);
// }

// function subtract(v1, v2) {
//     return parseInt(v1) - parseInt(v2);
// }

// function multiply(v1, v2) {
//     return parseInt(v1) * parseInt(v2);
// }

// function divide(v1, v2) {
//     return parseInt(v1) / parseInt(v2);
// }

// function operate(op, val1, val2) {
//     if(op == "+") {
//         return add(val1, val2);
//     } else if(op == "-") {
//         return subtract(val1, val2);
//     } else if(op == "*") {
//         return multiply(val1, val2);
//     } else if(op == "/") {
//         return divide(val1, val2);
//     }
// }

function btnStat(disabled = true) {
    allBtn.forEach(btn => {
        let tempVal = btn.innerText;
        if(tempVal == extras[0] || tempVal == extras[1] || tempVal == op[0] || tempVal == op[2] || tempVal == op[3]) {
            if(disabled) {
                btn.setAttribute("disabled", true);
            } else {
                btn.removeAttribute("disabled");
            }
        }
    })
}

let allBtn = document.querySelectorAll("button");
let screenText = document.querySelector("#calc-screen-text");
let screenValue = document.querySelector("#calc-screen-value");

let op = ["+", "-", "*", "/"];
let num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let extras = ["C", "=", "B"];
let value = "";

allBtn.forEach(btn => {
    btnStat(true);
    
    btn.addEventListener("click", function() {
        let tempVal = this.innerText;
        
        if(op.includes(tempVal)) {
            value += tempVal;
            screenText.innerText = value.replace(/-{1,}/g, "-").replace(/\.{1,}/g, ".");
            btnStat();
        }

        if(num.includes(tempVal)) {
            value += tempVal; 
            screenText.innerText = value.replace(/-{1,}/g, "-").replace(/\.{1,}/g, ".");
            btnStat(false);
        }

        if(tempVal == extras[0]) {
            value = "";
            screenText.innerText = 0;
            screenValue.innerText = " = Ans";
            btnStat();
        }

        if(tempVal == extras[1]) {
            let finalVal = value.replace(/-{1,}/g, "-").replace(/\.{1,}/g, ".");
            
            try {
                screenValue.innerText = eval(finalVal);
            } catch(err) {
                screenValue.innerText = "Unexpected Error";
            }
        }

        if(tempVal == extras[2]) {
            if(value) {
                value = value.slice(0, -1);
                if(value) {
                    screenText.innerText = value.replace(/-{1,}/g, "-").replace(/\.{1,}/g, ".");
                } else {
                    screenText.innerText = 0;
                }
            } else {
                screenText.innerText = 0;
            }
        }
    })
})

window.addEventListener("keydown", function(eve) {
    if(num.includes(eve.key)) {
        value += eve.key; 
        screenText.innerText = value.replace(/-{1,}/g, "-").replace(/\.{1,}/g, ".");
        btnStat(false);
    }

    if(op.includes(eve.key)) {
        value += eve.key;
        screenText.innerText = value.replace(/-{1,}/g, "-").replace(/\.{1,}/g, ".");
        btnStat();
    }

    if(eve.key == "Enter") {
        let finalVal = value.replace(/-{1,}/g, "-").replace(/\.{1,}/g, ".");
        
        try {
            screenValue.innerText = eval(finalVal);
        } catch(err) {
            screenValue.innerText = "Unexpected Error";
        }
    }

    if(eve.key == "C" || eve.key == "c") {
        value = "";
        screenText.innerText = 0;
        screenValue.innerText = " = Ans";
        btnStat();
    }
    
    if(eve.key == "Backspace" || eve.key == "B" || eve.key == "b") {
        if(value) {
            value = value.slice(0, -1);
            if(value) {
                screenText.innerText = value.replace(/-{1,}/g, "-").replace(/\.{1,}/g, ".");
            } else {
                screenText.innerText = 0;
            }
        } else {
            screenText.innerText = 0;
        }
    }
})