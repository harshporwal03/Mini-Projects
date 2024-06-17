const BASE_URL =
  "https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=";
const API_KEY = "461d3e109bmshb2d64bee62ccae6p1918cdjsnd30707f6d9ad";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}${fromCurr.value}`;
  try {
    let response = await fetch(URL, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "currency-converter-pro1.p.rapidapi.com",
      },
    });
    let data = await response.json();
    console.log("API Response:", data); // Log the entire response for debugging

    if (data && data.result && data.result[toCurr.value]) {
      let rate = data.result[toCurr.value];
      let finalAmount = amtVal * rate;
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(
        2
      )} ${toCurr.value}`;
    } else {
      msg.innerText = `Error: Rate for ${toCurr.value} not found.`;
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msg.innerText = "Error fetching exchange rate. Please try again.";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  if (!img) {
    img = document.createElement("img");
    element.parentElement.appendChild(img);
  }
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
