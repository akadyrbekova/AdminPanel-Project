const API = "http://localhost:8000/products";

//? переменные для инпутов: добавлеия товаров
let title = document.querySelector("#title"),
  price = document.querySelector("#price"),
  descr = document.querySelector("#descr"),
  image = document.querySelector("#image"),
  btnAdd = document.querySelector("#btn-add");

// ? блок для отображения товаров
let list = document.querySelector("#products-list");

//? переменные для инпутов: редактирования товаров
let editTitle = document.querySelector("#edit-title"),
  editPrice = document.querySelector("#edit-price"),
  editDescr = document.querySelector("#edit-descr"),
  editImage = document.querySelector("#edit-image"),
  editSaveBtn = document.querySelector("#btn-save-edit"),
  exampleModal = document.querySelector("#exampleModal");

//? добавление слушателя событий
btnAdd.addEventListener("click", async function () {
  // ? формируем объект с данными из инпутов
  let obj = {
    title: title.value,
    price: price.value,
    descr: descr.value,
    image: image.value,
  };

  //? проверка на заполненность полей, если хотя бы один из инпутов пустой, срабатывает return, который останавливает весь код

  if (
    !obj.title.trim() ||
    !obj.price.trim() ||
    !obj.descr.trim() ||
    !obj.image.trim()
  ) {
    alert(`Заполните поля`);
    return;
  }

  // ?  отправка POST запроса для добавления в database

  await fetch(API, {
    method: "POST", //? метод запроса
    headers: {
      "Content-Type": "application/json; charset=utf-8", //? кодировка
    },
    body: JSON.stringify(obj), //? содержимое
  });

  render();

  // ? очищаем инпуты

  title.value = "";
  price.value = "";
  descr.value = "";
  image.value = "";
});

// ! отображаем карточки товаров
render();
async function render() {

// ? получаем данные через get 

  let products = await fetch(API)
    .then((res) => res.json())
    .catch((err) => console.log(err));
//? очищаем содержимое блока list
  list.innerHTML = "";
// ? перебор массива 
  products.forEach((element) => {
    let newElem = document.createElement("div");
    newElem.id = element.id;

    newElem.innerHTML = `
    <div class="card m-5" style="width: 18rem;">
  <img src=${element.image}" class="card-img-top" alt="...">
  <div class="card-body">

    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${element.descr}</p>
    <p class="card-text">${element.price}</p>



    <a href="#" class="btn btn-primary btn-danger  btn-delete" id=${element.id}>Delete</a>
    <a href="#" class="btn btn-primary btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${element.id}>Edit</a>
  </div>
</div> `;

    list.append(newElem);    //? отрисовываем карточку в list
  });
}

//! редактирование продукта



document.addEventListener("click", function (e) {
  // ? отлавливаем нажатие именно по кнопке с классом btn-edit
  if (e.target.classList.contains("btn-edit")) {
    // ? получаем id 
    let id = e.target.id;
    // ? делаем запрос н аредактируемый продукт по id 
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // ? заполняем инпуты модального окна, данными из полученного продукта
        editTitle.value = data.title;
        editPrice.value = data.price;
        editDescr.value = data.descr;
        editImage.value = data.image;



        // ? передаем id кнопке save через аттрибут
        editSaveBtn.setAttribute("id", data.id);
      });
  }
});


//? слушатель событи йдля кнопки сохранения
editSaveBtn.addEventListener("click", function () {
  let id = this.id;
// ? вытаскиваем данные из инпутов
  let title = editTitle.value;
  let price = editPrice.value;
  let descr = editDescr.value;
  let image = editImage.value;
// ? делаем проверку на заполненность
  if (!title || !price || !descr || !image) return;
  // ? формируем объект с отредактированными данными 
  let editedProduct = {
    title: title,
    price: price,
    descr: descr,
    image: image,
  };
  saveEdit(editedProduct, id);
});
// ? функция дл ясохранения изменеий
async function saveEdit(editedProduct, id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editedProduct),
  });
  // ? вызов функции render для отображения обновленых данных
  render();
  let modal = bootstrap.Modal.getInstance(exampleModal);
  modal.hide();

}
