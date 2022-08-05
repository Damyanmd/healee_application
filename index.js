const form = document.querySelector("#currenciesExchange");

const group1 = document.querySelector("#group1");
const group2 = document.querySelector("#group2");
const group3 = document.querySelector("#group3");

const count1 = document.querySelector("#count1");
const count2 = document.querySelector("#count2");
const count3 = document.querySelector("#count3");

const longestArray = document.querySelector("#longestArray");

function main() {
  document.addEventListener("DOMContentLoaded", runApp);
  form.addEventListener("change", runApp);
}

async function runApp() {
  deleteChilds();
  const groups = [];
  const allCurencies = document.getElementById("currencies");
  const searchCurrency = form.elements.currencies.value;
  for (i = 0; i < allCurencies.length; i++) {
    let currValue = allCurencies.options[i].value;
    if (searchCurrency !== currValue) {
      const res1 = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${searchCurrency}/${currValue}.json`
      );
      const res2 = await axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currValue}/${searchCurrency}.json`
      );
      const result1 = Math.round(res1.data[currValue] * 10) / 10;
      const result2 = Math.round(res2.data[searchCurrency] * 10) / 10;
      const text1 = `${searchCurrency.toUpperCase()}-${currValue.toUpperCase()}: ${result1}`;
      const text2 = `${currValue.toUpperCase()}-${searchCurrency.toUpperCase()}: ${result2}`;
      groups.push({
        t: text1,
        ex: result1,
      });
      groups.push({
        t: text2,
        ex: result2,
      });
    }
  }
  groups.sort((a, b) => a.ex - b.ex);
  const countedElementsByGroup = { count1: 0, count2: 0, count3: 0 };
  groups.forEach((element) => {
    if (element.ex < 1) {
      countedElementsByGroup.count1 = countedElementsByGroup.count1 + 1;
    } else if (element.ex >= 1.5) {
      countedElementsByGroup.count3 = countedElementsByGroup.count3 + 1;
    } else {
      countedElementsByGroup.count2 = countedElementsByGroup.count2 + 1;
    }
  });
  appendItemsToHTML(groups, countedElementsByGroup);
}

const appendItemsToHTML = (groups, countedElementsByGroup) => {
  groups.forEach((element) => {
    const newLine = document.createElement("div");
    newLine.textContent = element.t;
    if (element.ex < 1) {
      group1.appendChild(newLine);
    } else if (element.ex >= 1.5) {
      group3.appendChild(newLine);
    } else {
      group2.appendChild(newLine);
    }
  });
  //counters
  const {
    count1: firstGroupCounter,
    count2: secondGroupCounter,
    count3: thirdGroupCounter,
  } = countedElementsByGroup;
  const newLineCount1 = document.createElement("p");
  newLineCount1.textContent = `Count: ${firstGroupCounter}`;
  count1.append(newLineCount1);
  const newLineCount2 = document.createElement("p");
  newLineCount2.textContent = `Count: ${secondGroupCounter}`;
  count2.append(newLineCount2);
  const newLineCount3 = document.createElement("p");
  newLineCount3.textContent = `Count: ${thirdGroupCounter}`;
  count3.append(newLineCount3);
  //longest array
  const longest = Math.max(
    firstGroupCounter,
    secondGroupCounter,
    thirdGroupCounter
  );
  const newLineLongest1 = document.createElement("p");
  newLineLongest1.textContent = longest;
  longestArray.append(newLineLongest1);
};

function deleteChilds() {
  //remove groups
  let childGroup1 = group1.lastElementChild;
  let childGroup2 = group2.lastElementChild;
  let childGroup3 = group3.lastElementChild;
  while (childGroup1 || childGroup2 || childGroup3) {
    if (childGroup1) {
      group1.removeChild(childGroup1);
      childGroup1 = group1.lastElementChild;
    }
    if (childGroup2) {
      group2.removeChild(childGroup2);
      childGroup2 = group2.lastElementChild;
    }
    if (childGroup3) {
      group3.removeChild(childGroup3);
      childGroup3 = group3.lastElementChild;
    }
  }
  //remove counter
  const childCount1 = count1.lastElementChild;
  const childCount2 = count2.lastElementChild;
  const childCount3 = count3.lastElementChild;
  if (childCount1) {
    count1.removeChild(childCount1);
    count2.removeChild(childCount2);
    count3.removeChild(childCount3);
  }
  //remove longest array
  const childLongest1 = longestArray.lastElementChild;
  if (childLongest1) {
    longestArray.removeChild(childLongest1);
  }
}

main();
