class StockContainerView {
  parentEl = document.querySelector("main");
  container = document.querySelector(".stockContainer");
  btn = this.parentEl.querySelector(".addStockBtn");

  closeHandler(handler) {
    this.container.addEventListener("click", function (e) {
      const btn = e.target.closest(".close");
      if (!btn) return;
      handler(btn.closest(".stockCard").id);
    });
  }

  btnHandler(handler) {
    this.btn.addEventListener("click", function () {
      handler();
    });
  }
  hideBtn() {
    this.btn.classList.add("hide");
  }

  renderSpinner() {
    this.container.innerHTML = "";
    this.container.insertAdjacentHTML(
      "afterbegin",
      `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>`
    );
  }

  render(data) {
    this.container.innerHTML = "";
    data.forEach((data) =>
      this.container.insertAdjacentHTML(
        "afterbegin",
        this.generateStockMarkup(data)
      )
    );
    this.btn.classList.remove("hide");
  }
  generateStockBtn() {
    return `<button class="addStockBtn">add stock recommendation</button>`;
  }
  generateStockMarkup(data) {
    return `
    <div id="${data.id}" class="stockCard">
    <div class="close">X</div>
    <div class="stockCardHeader">
      <h1 class="stockCardHeading">${data.name}</h1>
      <h1 class="rating">${data.rating}</h1>
    </div>
    <div class="stockCardContainer">
      <p class="stockCardInfo">
      ${data.info}
      </p>
      <a class="stockCardLink" href="${data.link}">click for more</a>
    </div>
  </div>
  `;
  }
}

export default new StockContainerView();
