document.addEventListener('DOMContentLoaded', function() {
    const data = [
        {"base_country":"UK", "base_currency":"GBP", "target_country":"USA", "target_currency":"USD", "exchange_rate":1.273718, "ppp_score":0.97},
        {"base_country":"UK", "base_currency":"GBP", "target_country":"India", "target_currency":"INR", "exchange_rate":105.669210, "ppp_score":2.12},
        {"base_country":"UK", "base_currency":"GBP", "target_country":"Mexico", "target_currency":"MXN", "exchange_rate":21.79, "ppp_score":0.97},
        {"base_country":"USA", "base_currency":"USD", "target_country":"UK", "target_currency":"GBP", "exchange_rate":0.7852279, "ppp_score":1.04},
        {"base_country":"USA", "base_currency":"USD", "target_country":"India", "target_currency":"INR", "exchange_rate":82.962631, "ppp_score":2.2},
        {"base_country":"USA", "base_currency":"USD", "target_country":"Mexico", "target_currency":"MXN", "exchange_rate":17.098734, "ppp_score":1},
        {"base_country":"India", "base_currency":"INR", "target_country":"UK", "target_currency":"GBP", "exchange_rate":0.0094675954, "ppp_score":0.47},
        {"base_country":"India", "base_currency":"INR", "target_country":"USA", "target_currency":"USD", "exchange_rate":0.012054167, "ppp_score":0.46},
        {"base_country":"India", "base_currency":"INR", "target_country":"Mexico", "target_currency":"MXN", "exchange_rate":0.20614852, "ppp_score":0.46},
        {"base_country":"Mexico", "base_currency":"MXN", "target_country":"UK", "target_currency":"GBP", "exchange_rate":0.037, "ppp_score":2.20},
        {"base_country":"Mexico", "base_currency":"MXN", "target_country":"USA", "target_currency":"USD", "exchange_rate":0.058472454, "ppp_score":1},
        {"base_country":"Mexico", "base_currency":"MXN", "target_country":"India", "target_currency":"INR", "exchange_rate":4.8508717, "ppp_score":2.2}
    ];

    const baseCountrySelect = document.getElementById('base-country');
    const targetCountrySelect = document.getElementById('target-country');
    const amountInput = document.getElementById('amount');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');

    function populateSelectOptions() {
        let baseCountries = [...new Set(data.map(item => item.base_country))];
        let targetCountries = [...new Set(data.map(item => item.target_country))];

        baseCountries.forEach(country => {
            let option = new Option(country, country);
            baseCountrySelect.add(option);
        });

        targetCountries.forEach(country => {
            let option = new Option(country, country);
            targetCountrySelect.add(option);
        });
    }

  function calculate() {
      let baseCountry = baseCountrySelect.value;
      let targetCountry = targetCountrySelect.value;
      let amount = parseFloat(amountInput.value);
      let conversionData = data.find(item => item.base_country === baseCountry && item.target_country === targetCountry);

      if(conversionData && !isNaN(amount)) {
          // Adjust the amount by the PPP rate first to get its equivalent in the base currency's purchasing power
          let pppAdjustedAmountInBaseCurrency = amount / conversionData.ppp_score;

          // Then convert that PPP-adjusted amount to the target currency using the exchange rate
          let adjustedValueInTargetCurrency = pppAdjustedAmountInBaseCurrency * conversionData.exchange_rate;

          // Calculate the amount in the local currency by dividing the adjusted value in the target currency by the exchange rate from base to target currency
          let adjustedValueInLocalCurrency = adjustedValueInTargetCurrency / conversionData.exchange_rate;

          resultDiv.innerHTML = `
              <p>PPP Rate: ${conversionData.ppp_score}</p>
              <p>Adjusted Value: ${adjustedValueInTargetCurrency.toFixed(2)} ${conversionData.target_currency}</p>
              <p>Adjusted Value in Local Currency: ${adjustedValueInLocalCurrency.toFixed(2)} ${conversionData.base_currency}</p>
          `;
      } else {
          resultDiv.innerHTML = 'Please ensure all fields are filled correctly.';
      }
  }

    populateSelectOptions();
    calculateButton.addEventListener('click', calculate);
});
