document.addEventListener('DOMContentLoaded', () => {
    const data = [
      {"base_country":"UK","base_currency":"GBP","target_country":"USA","target_currency":"USD","exchange_rate":1.273718,"ppp_score":0.97},
      {"base_country":"UK","base_currency":"GBP","target_country":"India","target_currency":"INR","exchange_rate":105.669210,"ppp_score":2.12},
      // Add other data entries here
    ];
  
    const baseCountrySelect = document.getElementById('base-country');
    const targetCountrySelect = document.getElementById('target-country');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');
    const calculateButton = document.getElementById('calculate');
  
    // Populate select options
    const countries = [...new Set(data.map(item => item.base_country))];
    countries.forEach(country => {
      baseCountrySelect.add(new Option(country, country));
      targetCountrySelect.add(new Option(country, country));
    });
  
    calculateButton.addEventListener('click', () => {
      const baseCountry = baseCountrySelect.value;
      const targetCountry = targetCountrySelect.value;
      const amount = parseFloat(amountInput.value);
      const conversionData = data.find(item => item.base_country === baseCountry && item.target_country === targetCountry);
      if (conversionData) {
        const convertedValue = amount * conversionData.exchange_rate * conversionData.ppp_score;
        resultDiv.innerHTML = `
          <p>Original Amount: ${amount} ${conversionData.base_currency}</p>
          <p>Converted Amount: ${convertedValue.toFixed(2)} ${conversionData.target_currency}</p>
          <p>PPP Rate: ${conversionData.ppp_score}</p>
        `;
      } else {
        resultDiv.textContent = 'Conversion data not found.';
      }
    });
  });
  