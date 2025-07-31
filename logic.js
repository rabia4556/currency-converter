const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
// "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector("#fromcurr")
const toCurr = document.querySelector("#tocurr")
const msg = document.querySelector(".msg")

document.addEventListener("load", () => {})

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option")
    newOption.innerText = currCode
    newOption.value = currCode
    if (select.name === "From" && currCode === "USD") {
      newOption.selected = "selected"
    } else if (select.name === "To" && currCode === "PKR") {
      newOption.selected = "selected"
    }
    select.append(newOption)
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target)
  })
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input")
  let AmtVal = amount.value
  // console.log(AmtVal)
  if (AmtVal === "" || AmtVal < 1) {
    AmtVal = 1
    amount.value = "1"
  }

  
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json` ///${ toCurr.value.toLowerCase()}.json;
  let response = await fetch(URL)
  // console.log(response)
  let data = await response.json()
  console.log(data)
  let from = fromCurr.value.toLowerCase()
  console.log(from)
  let to = toCurr.value.toLowerCase()
  console.log(to)

  let rate = data[from][to]
  let finalAmount = AmtVal * rate
  msg.innerText = `${AmtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}


const updateFlag = (element) => {
  let currCode = element.value
  console.log(currCode)
  let Countrycode = countryList[currCode]
  let newSrc = `https://flagsapi.com/${Countrycode}/shiny/64.png`
  let img = element.parentElement.querySelector("img")
  img.src = newSrc
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
})

window.addEventListener("load",()=>{
  updateExchangeRate();
})


// console.log(fromCurr.value , toCurr.value)

// async function getUsdInrRate() {
//     // This url will give you currencies UDS/XXX
//     const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json'

//     // Fetch data and get INR rate
//     const pkr = await fetch(url)
//         .then(response => response.json())
//         .then(data => data['usd'].pkr)

//     console.log(pkr)
// }

// getUsdInrRate()
