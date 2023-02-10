import { Notyf } from "notyf";

export let state = [];
export let state2 = [];

const apikey = "5dfb614943c5e68cd0a20aab52b10a91";

export const closeStock = function (id) {
  state = state.filter((value) => value.id !== id);
};

export const bookmarkStock = function (id) {
  const stock = state.find((value) => value.id === Number(id));
  if (!stock.bookmarked) {
    state2.push(stock);
  } else {
    state2 = state2.filter((value) => value.id != id);
  }
  stock.bookmarked = !stock.bookmarked;
};

export const addBookmark = function (id) {
  if (state.find((value) => value.id === Number(id))) return;
  const stock = state2.find((value) => value.id === Number(id));
  state.push(stock);
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
    console.log(stockName);
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
      bookmarked: false,
    });
  } catch (err) {
    const notyf = new Notyf({
      position: {
        x: "center",
        y: "top",
      },
    });
    notyf.error("something went wrong try again!");
  }
};

export const searchStock = async function (getStock) {
  try {
    console.log(getStock);

    const res = await fetch(
      `https://financialmodelingprep.com/api/v3/rating/${getStock}?apikey=${apikey}`
    );
    const stockRating = await res.json();
    console.log(stockRating[0].ratingScore);

    //
    const res2 = await fetch(
      `https://financialmodelingprep.com/api/v3/profile/${getStock}?apikey=${apikey}`
    );

    const stockProfile = await res2.json();

    const date = Date.now();

    state.push({
      name: getStock,
      rating: stockRating[0].rating,
      info: `${stockProfile[0].companyName} is a company from ${stockProfile[0].country}, their sector is ${stockProfile[0].sector} in the industry ${stockProfile[0].industry}`,
      link: stockProfile[0].website,
      id: date,
      bookmarked: true,
    });
    state2.push({
      name: getStock,
      rating: stockRating[0].rating,
      info: `${stockProfile[0].companyName} is a company from ${stockProfile[0].country}, their sector is ${stockProfile[0].sector} in the industry ${stockProfile[0].industry}`,
      link: stockProfile[0].website,
      id: date,
      bookmarked: true,
    });
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
