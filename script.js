
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

fetch("https://api.frankfurter.app/currencies")
  .then(res => res.json())
  .then(data => {
    Object.entries(data).forEach(([code, name]) => {
      const option1 = new Option(`${code} - ${name}`, code);
      const option2 = new Option(`${code} - ${name}`, code);
      fromCurrency.add(option1);
      toCurrency.add(option2);
    });
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  });

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (from === to) {
    document.getElementById("result").innerText = "Please choose different currencies.";
    return;
  }

  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const symbolMap = {
        USD: "$", INR: "₹", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", KRW: "₩", RUB: "₽",
        AUD: "A$", CAD: "C$", CHF: "CHF", HKD: "HK$", SGD: "S$", NZD: "NZ$"
      };
      const fromSymbol = symbolMap[from] || from;
      const toSymbol = symbolMap[to] || to;
      document.getElementById("result").innerText = `${fromSymbol}${amount} ${from} = ${toSymbol}${rate} ${to}`;
    })
    .catch(() => {
      document.getElementById("result").innerText = "Error fetching rates.";
    });
}
