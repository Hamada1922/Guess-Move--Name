// summoned Elements (((((1)))))
let chosenMovei = document.getElementById("chosen-movei"),
    btnChosenMovei = document.getElementById("confirm-chosen-movei"),
    //
    chooser = document.querySelector(".chooser"),
    chosenChar = document.getElementById("chosen-char"),
    btnChosenChar = document.getElementById("confirm-chosen-char"),
    // 
    correctDiv = document.getElementById("correct-div"),
    // 
    fullName = document.getElementById("full-name"),
    correctAndFullName = document.querySelector(".correct-and-full-name"),
    // 
    wrongCharSquare = document.getElementsByClassName("wrong-char-square"),
    //
    result = document.getElementById("result"),
    winner = document.getElementById("winner"),
    //
    overlay = document.getElementsByClassName("overlay"),
    OneMore = document.getElementById("one-more"),
    //
    btnChangeColor = document.getElementById("btn-change-color"),
    iconBtnChangeColor = document.querySelector("#btn-change-color i"),
    colors = document.getElementById("colors"),
    colorsCollection = document.getElementsByClassName("colors-collection")[0],
    btnConfirmChangeColor = document.getElementById("btn-confirm-change-color"),
    //
    body = document.body,
    buttons = document.getElementsByTagName("button"),
    wrongDiv = document.getElementById("wrong-div"),
    logo = document.getElementsByClassName("logo")[0],
    myName = document.querySelector("footer p span"),
    label = document.getElementsByTagName("label");


// variables (((((2)))))
let chosenMoveiArr = [];
let wrongCheck = [];
let endCorrect = [];
let colorMood = "hidden";

// Functions (((((3)))))
btnChosenMovei.onclick = () => {
    // trans movei name => array
    chosenMoveiArr = chosenMovei.value.split("");

    // create correct char quare
    for (let i = 0; i < chosenMoveiArr.length; i++) {
        let correctCharSquare = document.createElement("p");
        correctCharSquare.className = "correct";
        correctDiv.appendChild(correctCharSquare);
        correctCharSquare.style.cssText = `
        width: calc(100% / ${chosenMoveiArr.length})
        `;
    }
    // replace slash mark => /
    for (let i = 0; i < chosenMoveiArr.length; i++) {
        if (chosenMoveiArr[i] === " ") {
            correctCharSquare[i].innerHTML = "/";
        }
    }

    // clear input feild
    chosenMovei.value = "";
    overlay[0].style.display = "block";
    overlay[1].style.display = "none";
}

// re use correct char square 
let correctCharSquare = document.getElementsByClassName("correct");

// function {{{{{2}}}}}
btnChosenChar.onclick = () => {
    for (let i = 0; i < chosenMoveiArr.length; i++) {
        if (chosenMoveiArr[i] === chosenChar.value) {
            if (correctCharSquare[i].innerHTML === "") {
                correctCharSquare[i].innerHTML = chosenChar.value;
                wrongCheck[i] = true;
            } else continue;

        } else {
            wrongCheck[i] = false;
        }
    }

    // end correct check
    for (let i = 0; i < correctCharSquare.length; i++) {
        if (correctCharSquare[i].innerHTML === "") {
            endCorrect[i] = false;
        } else {
            endCorrect[i] = true;
        }
    }

    // full name appeare
    if (!endCorrect.includes(false)) {
        fullName.innerHTML = chosenMoveiArr.join("");
    }

    // add wrong char to his place
    if (!wrongCheck.includes(true)) {
        for (let i = 0; i < wrongCharSquare.length; i++) {
            if (wrongCharSquare[i].innerHTML === "") {
                wrongCharSquare[i].innerHTML = chosenChar.value;
                break;
            } else continue;
        }
    }

    // lose
    if (wrongCharSquare[11].innerHTML !== "") {
        console.log("lose")
    }

    // result show
    if (wrongCharSquare[11].innerHTML !== "" || !endCorrect.includes(false)) {
        result.style.display = "block"
        if (wrongCharSquare[11].innerHTML !== "") {
            winner.innerHTML = "الذى اختار اسم الفيلم";
        } else {
            winner.innerHTML = "الذى خمن اسم الفيلم";
        }
    } else {
        result.style.display = "none"
    }

    // clear char field
    chosenChar.value = "";
    chosenChar.focus();
}

// one more function
OneMore.onclick = () => window.location.reload();


// colors ((((((4)))))))
let setBackgraound = (color) => {
    body.style.cssText = `background: ${color} `;
    if (color === "white") {
        body.style.color = "black";
        for (let i = 0; i < correctCharSquare.length; i++) {
            correctCharSquare[i].style.color = "black";
        }
        chooser.style.background = "rgba(0, 0, 0, 0.2)";
        correctAndFullName.style.background = "rgba(0, 0, 0, 0.2)";
    } else {
        body.style.color = "white";
        chooser.style.background = "rgba(255, 255, 255, 0.7)";
        correctAndFullName.style.background = "rgba(255, 255, 255, 0.6)";
        for (let i = 0; i < correctCharSquare.length; i++) {
            correctCharSquare[i].style.color = "white";
        }
    }
}

let setMainColor = (color) => {
    logo.style.color = `${color}`;
    label[0].style.color = `${color}`;
    label[1].style.color = `${color}`;
    myName.style.color = `${color}`;
    iconBtnChangeColor.style.color = `${color}`;
    wrongDiv.style.cssText = `border: 2px solid ${color}`;
    correctDiv.style.cssText = `border: 2px solid ${color}`;

    //
    for (let i = 0; i < buttons.length; i++) {
        if (i === 0) {
            continue;
        } else {
            buttons[i].style.background = `${color}`;
        }
    }
    //
    for (let i = 0; i < wrongCharSquare.length; i++) {
        wrongCharSquare[i].style.cssText = `border: 2px solid ${color}`;
    }
    //
    for (let i = 0; i < correctCharSquare.length; i++) {
        correctCharSquare[i].style.cssText = `border: 2px solid ${color}`;
    }
}

if (localStorage.background !== undefined) {
    setBackgraound(localStorage.background);
}
if (localStorage.mainColor !== undefined) {
    setMainColor(localStorage.mainColor);
}

// submit change color function
btnConfirmChangeColor.onclick = () => {
    console.log(colors.value);
    let cv = colors.value;
    if (cv === "white" || cv === "black") {
        localStorage.setItem("background", cv);
        setBackgraound(cv);
    } else {
        localStorage.setItem("mainColor", cv);
        setMainColor(cv);
    }
}

// show and hidding colors menu function
btnChangeColor.onclick = () => {
    if (colorMood === "hidden") {
        colorsCollection.style.display = "flex";
        colorMood = "show";
    } else {
        colorsCollection.style.display = "none";
        colorMood = "hidden";
    }
}