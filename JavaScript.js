var firstCard = document.getElementById("FirstCard");
var secondCard = document.getElementById("SecondCard");
var resultCard = document.getElementById("ResultCard");
var questionImage = document.getElementById("QuestionImage");
var nextButton = document.getElementById("NextButton");
var results = Array(), answers = Array();

function OnLoad() {
    secondCard.style.display = "none";
    firstCard.style.display = "none";
    resultCard.style.display = "none";
    Show(firstCard);
}

function HardSubmit() {
    let answerChecked = document.querySelector("[name='answer']:checked");
    let answer;

    answerChecked.checked = false;
    nextButton.disabled = true;

    let counter = parseInt(document.getElementById("Counter").value);
    let summary = document.getElementById("Summary");
    if (isInt(results[counter - 1])) {
        answer = parseInt(answerChecked.value);
    } else {
        answer = parseFloat(answerChecked.value);
    }

    if (counter < 25) {
        summary.innerHTML = "<b>Hard Level: </b>" + (counter + 1) + " Of 25 Questions";
        questionImage.src = "images/" + (counter + 1) + ".jpg";
        //Set Question
        results[counter] = GenerateQustion(8);
        answers[counter - 1] = answer;
    } else {

        answers[counter - 1] = answer;
        //Calculate Mark
        let mark = CalcualteMark(results, answers);
        if (mark >= 45) {
            Congrats(mark, counter * 2);
        } else {
            Lose(mark, counter * 2);
        }
    }

    document.getElementById("Counter").value = counter + 1;
    return false;
}

function Hard() {
    document.getElementById("GameForm").onsubmit = function () { return HardSubmit(); };

    nextButton.disabled = true;

    document.getElementById("Counter").value = 1;
    document.getElementById("Summary").innerHTML = "<b>Hard Level: </b> 1 Of 25 Questions";
    results = [];
    answers = [];

    results[0] = GenerateQustion(8);
}

function IntermediateSubmit() {
    let answerChecked = document.querySelector("[name='answer']:checked");
    let answer;

    answerChecked.checked = false;
    nextButton.disabled = true;

    let counter = parseInt(document.getElementById("Counter").value);
    let summary = document.getElementById("Summary");
    if (isInt(results[counter - 1])) {
        answer = parseInt(answerChecked.value);
    } else {
        answer = parseFloat(answerChecked.value);
    }

    if (counter < 10) {
        summary.innerHTML = "<b>Intermediate Level: </b>" + (counter + 1) + " Of 10 Questions";
        questionImage.src = "images/" + (counter + 1) + ".jpg";
        //Set Question
        results[counter] = GenerateQustion(4);
        answers[counter - 1] = answer;
    } else {

        answers[counter - 1] = answer;
        //Calculate Mark
        let mark = CalcualteMark(results, answers);
        if (mark >= 15) {
            Congrats(mark, counter * 2);
        } else {
            Lose(mark, counter * 2);
        }
    }

    document.getElementById("Counter").value = counter + 1;

    return false;
}

function Intermediate() {
    document.getElementById("GameForm").onsubmit = function () { return IntermediateSubmit(); };

    nextButton.disabled = true;

    document.getElementById("Counter").value = 1;
    document.getElementById("Summary").innerHTML = "<b>Intermediate Level: </b> 1 Of 10 Questions";
    results = [];
    answers = [];

    results[0] = GenerateQustion(4);
}
function EasySubmit() {
    let answerChecked = document.querySelector("[name='answer']:checked");
    let answer = parseInt(answerChecked.value);

    answerChecked.checked = false;
    nextButton.disabled = true;

    let counter = parseInt(document.getElementById("Counter").value);
    let summary = document.getElementById("Summary");
    if (counter < 5) {
        summary.innerHTML = "<b>Easy Level: </b> " + (counter + 1) + " Of 5 Questions";
        questionImage.src = "images/" + (counter + 1) + ".jpg";
        //Set Question
        results[counter] = GenerateQustion(2);
        answers[counter - 1] = answer;
    } else {

        answers[counter - 1] = answer;
        //Calculate Mark
        let mark = CalcualteMark(results, answers);
        if (mark >= 7) {
            Congrats(mark, counter*2);
        } else {
            Lose(mark, counter*2);
        }
    }

    document.getElementById("Counter").value = counter + 1;

    return false;
}

function Easy() {
    document.getElementById("GameForm").onsubmit = function () { return EasySubmit(); };

    nextButton.disabled = true;

    document.getElementById("Counter").value = 1;

    document.getElementById("Summary").innerHTML = "<b>Easy Level: </b> 1 Of 5 Questions";
    results = [];
    answers = [];

    results[0] = GenerateQustion(2);
}

function ExamSubmit(form) {
    let answerChecked = document.querySelector("[name='answer']:checked");
    let answer = parseInt(answerChecked.value);

    answerChecked.checked = false;
    nextButton.disabled = true;

    let counter = parseInt(document.getElementById("Counter").value);
    let summary = document.getElementById("Summary");

    document.getElementById("Counter").value = counter + 1;

    if (counter < 5) {
        summary.innerHTML = (counter+1) + " Of 5 Questions";
        questionImage.src = "images/"+(counter+1)+".jpg";
        //Set Question
        results[counter] = GenerateQustion(2);
        answers[counter-1] = answer;
    } else {
        answers[counter-1] = answer;
        //Calculate Mark
        let mark = CalcualteMark(results, answers);
        if (mark >= 7) {
            //Hard
            Hide(secondCard);
            setTimeout(function () {
                Show(secondCard);
            }, 2000);
            Hard();
        } else if (mark >= 5) {
            //Intermediate
            Hide(secondCard);
            setTimeout(function () {
                Show(secondCard);
            }, 2000);
            Intermediate();
        } else {
            //Easy
            Hide(secondCard);
            setTimeout(function () {
                Show(secondCard);
            }, 2000);
            Easy();
        }
    }
    return false;
}

function InformationSubmit() {
    let name = document.getElementById("Name");
    let age = document.getElementById("Age");
    if (!CheckName(name) || !CheckAge(age)) {
        return false;
    }

    Hide(firstCard);
    setTimeout(function () {
        Show(secondCard);
    }, 2000);
    results[0] = GenerateQustion(2);

    return false;
}

function CalcualteMark(array1, array2) {
    console.log(array1);
    console.log(array2);
    let mark = 0;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] == array2[i]) {
            mark++;
        }
    }
    return mark * 2;
}

function GenerateQustion(numberOfOperations) {
    let operation;
    if (numberOfOperations == 2) {
        operation  = Math.floor(Math.random() * 2);
    } else if (numberOfOperations == 4) {
        operation = Math.floor(Math.random() * 2) + 2;
    } else {
        operation = Math.floor(Math.random() * 4) + 4;
    }


    let random1 = Math.floor(Math.random() * 10);
    let random2 = Math.floor(Math.random() * 10);
    let random3 = Math.floor(Math.random() * 10);

    let result;
    switch (operation) {
        case 0: {
            result = random1 + random2;
            document.getElementById("Question").innerHTML = random1 + " + " + random2 + " = ?";
            break;
        }
        case 1: {
            result = random1 - random2;
            document.getElementById("Question").innerHTML = random1 + " - " + random2 + " = ?";
            break;
        }
        case 2: {
            result = random1 * random2;
            document.getElementById("Question").innerHTML = random1 + " x " + random2 + " = ?";
            break;
        }
        case 3: {
            result = random1 / random2;
            if (result.toString().indexOf('.') != -1)
                result = parseFloat(result.toFixed(2));
            document.getElementById("Question").innerHTML = random1 + " / " + random2 + " = ?";
            break;
        }
         case 4: {
            result = random1 + (random2 * random3);
            if (result.toString().indexOf('.') != -1)
                result = parseFloat(result.toFixed(2));
            document.getElementById("Question").innerHTML = random1 + " + " + random2 + " x " + random3 + " = ?";
            break;
        }
        case 5: {
            result = random1 + (random2 / random3);
            if (result.toString().indexOf('.') != -1)
                result = parseFloat(result.toFixed(2));
            document.getElementById("Question").innerHTML = random1 + " + " + random2 + " / " + random3 + " = ?";
            break;
        }
        case 6: {
            result = random1 - (random2 * random3);
            if (result.toString().indexOf('.') != -1)
                result = parseFloat(result.toFixed(2));
            document.getElementById("Question").innerHTML = random1 + " - " + random2 + " x " + random3 + " = ?";
            break;
        }
        case 7: {
            result = random1 - (random2 / random3);
            if (result.toString().indexOf('.') != -1)
                result = parseFloat(result.toFixed(2));
            document.getElementById("Question").innerHTML = random1 + " - " + random2 + " / " + random3 + " = ?";
            break;
        }
        
    }

    let randoms = GenerateRandomArray(5, (numberOfOperations / 2), result);
    randoms = CheckResultDublication(result, randoms);

    FetchDataIntoRadioButtons(randoms);

    UpdateOneRadioButtonWithResult(result);

    return result;
}


function GenerateRandomArray(length,level,result) {
    let array = [];
    while (array.length < length) {
        let random;
        if (level == 1) {
            random = Math.floor(Math.random() * 10);
        } else if (level >= 2) {
            if (isInt(result)) {
                random = Math.floor(Math.random() * 100);
            }
            else {
                random = Math.random() * 10;
                random = parseFloat(random.toFixed(2));
            }
        }
        if (array.indexOf(random) === -1) array.push(random);
    }
    return array;
}

function CheckResultDublication(result, array) {
    if (array.indexOf(result) !== -1) {
        while (array[array.indexOf(result)] == result) {
            array[array.indexOf(result)] = Math.floor(Math.random() * 10);
        }
    }
    return array;
}

function FetchDataIntoRadioButtons(array) {
    document.getElementById("First").value = array[0];
    document.getElementById("Second").value = array[1];
    document.getElementById("Third").value = array[2];
    document.getElementById("Fourth").value = array[3];
    document.getElementById("FirstLabel").innerHTML = array[0];
    document.getElementById("SecondLabel").innerHTML = array[1];
    document.getElementById("ThirdLabel").innerHTML = array[2];
    document.getElementById("FourthLabel").innerHTML = array[3];
}

function UpdateOneRadioButtonWithResult(result) {
    const selector = Math.floor(Math.random() * 4) + 1;
    switch (selector) {
        case 1: {
            document.getElementById("First").value = result;
            document.getElementById("FirstLabel").innerHTML = result;
            break;
        }
        case 2: {
            document.getElementById("Second").value = result;
            document.getElementById("SecondLabel").innerHTML = result;
            break;
        }
        case 3: {
            document.getElementById("Third").value = result;
            document.getElementById("ThirdLabel").innerHTML = result;
            break;
        }
        case 4: {
            document.getElementById("Fourth").value = result;
            document.getElementById("FourthLabel").innerHTML = result;
            break;
        }

    }
}


function EnableNext() {
    nextButton.disabled = false;
}



function CheckAge(element) {
    let age = element.value
    if (age > 5 && age < 100) {
        document.getElementsByClassName("invalid-feedback")[1].style.display = "none";
        element.classList.remove("is-invalid");
        return true;
    } else {
        document.getElementsByClassName("invalid-feedback")[1].style.display = "block";
        element.classList.add("is-invalid");
        return false;
    }
}
function CheckName(element) {
    let text = element.value;
    if (IsLetter(text)) {
        Hide(document.getElementsByClassName("invalid-feedback")[0]);
        element.classList.remove("is-invalid");
        return true;
    } else {
        Show(document.getElementsByClassName("invalid-feedback")[0]);
        element.classList.add("is-invalid");
        return false;
    }
}

function Hide(element) {
    element.style.animation = 'backOutUp';
    element.style.animationDuration = '2s';

    element.addEventListener('animationend', () => {
        element.style.display = "none";
    });
}
function Show(element) {
    element.style.display = '';
    element.style.animation = 'backInDown';
    element.style.animationDuration = '2s';
    element.addEventListener('animationend', () => {
        element.style.display = '';
    });
}
function IsLetter(s) {
    return s.match("^[a-zA-Z\(\)]+$");
}
function isInt(n) {
    return parseInt(n) === n;
}

function Congrats(mark, total) {
    Hide(secondCard);
    setTimeout(function () {
        Show(resultCard);
        document.getElementById("ResultImage").src = "images/winner.gif";
        var audio = new Audio('music/winner.mp3');
        audio.play();
        document.getElementById("ResultTitle").innerHTML = `Congrats,<br>You got ${mark} From ${total}`;
        document.getElementById("ResultTitle").style.color = "green";
    }, 2000);
}

function Lose(mark, total) {
    Hide(secondCard);
    setTimeout(function () {
        Show(resultCard);
        document.getElementById("ResultImage").src = "images/loser.gif";
        var audio = new Audio('music/loser.mp3');
        audio.play();
        document.getElementById("ResultTitle").innerHTML = `Sorry,<br>You got ${mark} From ${total}`;
        document.getElementById("ResultTitle").style.color = "red";
    }, 2000);

}