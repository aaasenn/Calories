
const btns = document.querySelectorAll('.btn')
const age = document.querySelector("#age")
const height = document.querySelector("#height")
const weight = document.getElementById("#weight")
const solve = document.querySelector("#solve")
const reset = document.querySelector('#reset')
const radios = document.querySelectorAll('.radio input')
const h3 = document.querySelectorAll('h3')

const activity = ['Min', 'Low', 'Avg', 'Hgh', 'Max']
const ratio = [1.2, 1.375, 1.55, 1.725, 1.9]


btns.forEach((elem) => {
    elem.addEventListener('click', () => {
        btns.forEach(elem => elem.classList.remove('active'))
        elem.classList.add('active')
    })
})

age.addEventListener('blur', () => {
    solve.removeAttribute('disabled')
})

reset.addEventListener('click', resetFunc)

function resetFunc() {
    let fields = document.querySelectorAll('.bio-tab input')
    fields.forEach(elem => elem.value = '')
    btns[1].classList.remove('active')
    btns[0].classList.add('active')
    radios.forEach(elem => elem.removeAttribute('checked'))
}

age.addEventListener('focus', () => {
    solve.removeAttribute('disabled')
})

function weightHold(weight, height, age) {
let maleW = (10 * weight.value) + (6.25 * height.value) + (5 * age.value) + 5
let femW = (10 * weight.value) + (6.25 * height.value) + (5 * age.value) - 161

if (btns[0].classList.contains('active')) {
    h3[0].innerHTML = maleW
} else {
    h3[1].innerHTML = femW
}
}

solve.addEventListener('click', weightHold)