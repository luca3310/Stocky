import stockContainerView from "./views/stockContainerView";
import navbarView from "./views/navbarView";
import {
  state,
  state2,
  addStock,
  closeStock,
  searchStock,
  bookmarkStock,
  addBookmark,
} from "./model";

const controlCloseStock = function (id) {
  closeStock(Number(id));
  stockContainerView.render(state);
  navbarView.renderBookmark(state2);
};

const controlAddStock = async function () {
  try {
    stockContainerView.hideBtn();
    stockContainerView.renderSpinner();
    await addStock();
    stockContainerView.render(state);
  } catch (err) {
    console.log(err);
    alert(err);
  }
};

const controlSearch = async function () {
  try {
    stockContainerView.hideBtn();
    stockContainerView.renderSpinner();
    await searchStock(navbarView.getInput());
    stockContainerView.render(state);
    navbarView.renderBookmark(state2);
  } catch (err) {
    console.log(err);
    alert(err);
  }
};

const controlBookmark = function (data) {
  bookmarkStock(data);
  stockContainerView.render(state);
  navbarView.renderBookmark(state2);
};

const controlAddBookmark = function (id) {
  addBookmark(id);
  stockContainerView.render(state);
  navbarView.renderBookmark(state2);
};

const init = function () {
  stockContainerView.btnHandler(controlAddStock);
  stockContainerView.closeHandler(controlCloseStock);
  stockContainerView.bookmarkHandler(controlBookmark);
  navbarView.submitHandler(controlSearch);
  navbarView.addBookmark(controlAddBookmark);
};

init();
