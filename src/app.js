import 'fonts'
import 'img'
import 'style.css'
const btns = document.querySelectorAll('.btn')
const age = document.querySelector("#age")
const height = document.querySelector("#height")
const weight = document.getElementById("weight")
const solve = document.querySelector("#solve")
const reset = document.querySelector('#reset')
const radios = document.querySelectorAll('.radio input')
const resultFields = document.querySelectorAll('h3')
const measurements = document.querySelector('.bio-info')
const paramArr = [weight, height, age]
const resultSection = document.querySelector('.result-info')

const activity = ['Min', 'Low', 'Avg', 'Hgh', 'Max']
const ratio = [1.2, 1.375, 1.55, 1.725, 1.9]


//Функция удержания веса для мужчин
function holdWeightMen(w, h, a) {
    return (10 * w.value) + (6.25 * h.value) - (5 * a.value) + 5
}

//Функция удержания веса для женщин
function holdWeightWomen(w, h, a) {
    return (10 * w.value) + (6.25 * h.value) - (5 * a.value) + -161
}

//Функция чтения радио-кнопок (возвращает коэффициент умножения)
function radioRead(radios) {
    let radioIndex;
    radios.forEach((elem, i) => {
        if (elem.checked) {
            radioIndex = i;
        }
    })
    return ratio[radioIndex]
}

//Функция чтения пола
function sexRead(sexBtns) {
    let sexBtn;
    sexBtns.forEach(elem => {
        if (elem.classList.contains('active')) {
            sexBtn = elem
        }
    })
    return sexBtn
}

//Итоговый расчёт
function solveAll() {
    const sexBtn = sexRead(btns)
    if(sexBtn.dataset.sex === 'men') {
        //Посчитать функцию удержания веса и умножить на коэффициент
        const holdResult = Math.floor(holdWeightMen(weight, height, age) * radioRead(radios))
        const loseResult = Math.floor(holdResult - holdResult * 0.15);
        const gainResult = Math.floor(holdResult + holdResult * 0.15);

        resultFields[0].textContent = holdResult
        resultFields[1].textContent = loseResult
        resultFields[2].textContent = gainResult
    }

    if(sexBtn.dataset.sex === 'women') {
        const holdResult = Math.floor(holdWeightWomen(weight, height, age) * radioRead(radios))
        const loseResult = Math.floor(holdResult - holdResult * 0.15);
        const gainResult = Math.floor(holdResult + holdResult * 0.15);

        resultFields[0].textContent = holdResult
        resultFields[1].textContent = loseResult
        resultFields[2].textContent = gainResult
    }
}

//Функция выбора пола
function sexOption(e) {
    btns.forEach(elem => elem.classList.remove('active'))
    e.target.classList.add('active')
}

//Функция сброса
function clearReset() {
    paramArr.forEach(elem => elem.value = '')
    radios[0].checked = true;
    solve.disabled = true;
    reset.disabled = true;
}

//Функция проверки значений для отключения\включения кнопки РАССЧИТАТЬ
function readMeasures() {
    let measures = Array.from(measurements.querySelectorAll('input'))
    let fillStatus = measures.every(elem => elem.value && elem.value > 0)

    if (fillStatus) {
        solve.disabled = false;
    } else {
        solve.disabled = true;
    }
}

//Функция состояние кнопнки RESET
function resetState() {
    if (paramArr.some(elem => elem.value)) {
        reset.disabled = false
    } else {
        reset.disabled = true
    }
}

//Функция скрытия результатов
function showResult() {
    resultSection.style.display = 'block'

}

function hideResult() {
    resultSection.style.display = 'none'
}

//События кнопок
solve.addEventListener('click', solveAll)
solve.addEventListener('click', showResult)
btns.forEach(elem => elem.addEventListener('click', sexOption))
paramArr.forEach(elem => elem.addEventListener('keydown', readMeasures))
paramArr.forEach(elem => elem.addEventListener('keyup', readMeasures))
paramArr.forEach(elem => elem.addEventListener('keydown', resetState))
paramArr.forEach(elem => elem.addEventListener('keyup', resetState))
reset.addEventListener('click', clearReset)
reset.addEventListener('click', hideResult)






