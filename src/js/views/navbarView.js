class navbarView {
  parentEl = document.querySelector(".form");
  input = document.querySelector(".input").value;
  dropdowncontent = document.querySelector(".dropdown-content");

  submitHandler(handler) {
    this.parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  getInput() {
    return document.querySelector(".input").value;
  }

  renderBookmark(data) {
    this.dropdowncontent.innerHTML = "";
    data.forEach((data) =>
      this.dropdowncontent.insertAdjacentHTML(
        "afterbegin",
        this.bookmarkMarkup(data)
      )
    );
  }

  addBookmark(handler) {
    this.dropdowncontent.addEventListener("click", function (e) {
      const bookmark = e.target.closest(".bookmark");
      if (!bookmark) return;
      handler(bookmark.id )
    });
  }

  bookmarkMarkup(data) {
    return `
    <h3 class="bookmark" id="${data.id}">${data.name}</h3>
    <div class="underline"></div>
    `;
  }
}

export default new navbarView();
