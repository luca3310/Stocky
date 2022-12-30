export const state = [];

const apikey = "5dfb614943c5e68cd0a20aab52b10a91";

export const closeStock = function (id) {
  state.forEach(function (value) {
    value;
    if (value.id === id) {
      state.pop(value);
    }
  });
};

const getRandomStock = async function () {
  try {
    const res = await fetch(
      `https://financialmodelingprep.com/api/v3/financial-statement-symbol-lists?apikey=${apikey}`
    );
    const data = await res.json();
    const randomStock = Math.floor(Math.random() * data.length);
    return data[randomStock];
  } catch (err) {
    throw err;
  }
};

export const addStock = async function () {
  try {
    const stockName = await getRandomStock();
    const res = await fetch(
      `https://financialmodelingprep.com/api/v3/rating/${stockName}?apikey=${apikey}`
    );
    const stockRating = await res.json();
    console.log(stockRating[0].ratingScore);

    //
    const res2 = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${stockName}?apikey=${apikey}`
    );

    const stockProfile = await res2.json();

    const date = Date.now();

    state.push({
      name: stockName,
      rating: stockRating[0].rating,
      info: `${stockProfile[0].companyName} is a company from ${stockProfile[0].country}, their sector is ${stockProfile[0].sector} in the industry ${stockProfile[0].industry}`,
      link: stockProfile[0].website,
      id: date,
    });
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
