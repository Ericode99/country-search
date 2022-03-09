// SELECTORS
const input = document.querySelector(".search-bar");
const btn = document.querySelector(".search-icon");
const countries = document.querySelector(".countries");

// FUNCTIONS
const renderError = function (err) {
  // remove old data
  if (document.querySelector(".country")) {
    const old = document.querySelector(".country");
    old.remove();
  } else if (document.querySelector(".error")) {
    const old = document.querySelector(".error");
    old.remove();
  }

  const errhtml = `        
    <article class="error">
      <p class="error-message">${err}</p>
    </article>`;
  countries.insertAdjacentHTML("beforeend", errhtml);
};

const renderCountry = function (data) {
  try {
    const html = `
    <article class="country">
    <img class="img" src="${data.flags.png}" />
    <div class="data">
      <h1 class="name">${data.name.common}</h1>
      <h2 class="region">${data.region}</h2>
      <p class="capital"><span>🏛</span>${String(Object.values(data.capital))
        .split(",")
        .join(", ")}</p>
      <p class="inhabitants"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} Million</p>
      <p class="language"><span>🗣</span>${String(Object.values(data.languages))
        .split(",")
        .join(", ")}</p>
      <p class="currency"><span>💰</span>${
        Object.values(data.currencies)[0].symbol
      }: ${Object.values(data.currencies)[0].name}</p>
    </div>
  </article>`;
    countries.insertAdjacentHTML("beforeend", html);
  } catch (err) {
    renderError(err);
  }
};

const search = function () {
  // remove old data
  if (document.querySelector(".country")) {
    const old = document.querySelector(".country");
    old.remove();
  } else if (document.querySelector(".error")) {
    const old = document.querySelector(".error");
    old.remove();
  }

  const country = input.value;
  console.log(country);
  try {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => {
        console.log(response);
        if (response.status === 404) {
          throw new Error("404 country not found");
          return;
        }
        input.value = "";
        return response.json();
      })
      .catch((err) => renderError(err))
      .then((data) => {
        console.log(data[0]);
        renderCountry(data[0]);
      });
  } catch (err) {
    renderError(err);
  }
};

// EVENTS
btn.addEventListener("click", search);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    search();
  }
});

///////////////////////////////////////////////////////////////////////////////////
//Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;
