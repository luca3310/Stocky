import stockContainerView from "./views/stockContainerView";
import { state, addStock, closeStock } from "./model";

controlCloseStock = function (id) {
  closeStock(Number(id));
  stockContainerView.render(state);
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

const init = function () {
  stockContainerView.btnHandler(controlAddStock);
  stockContainerView.closeHandler(controlCloseStock);
};

init();
