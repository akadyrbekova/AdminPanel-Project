const API = "http://localhost:8000/products";

//? переменные для инпутов: добавлеия товаров
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let descr = document.querySelector("#descr");
let image = document.querySelector("#image");
let btnAdd = document.querySelector("#btn-add");

// ? блок для отображения товаров
let list = document.querySelector("#products-list");

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


render()


  // ? очищаем инпуты

  title.value = "";
  price.value = "";
  descr.value = "";
  image.value = "";
});

// ! отображаем карточки товаров
render();
async function render() {
  let products = await fetch(API)
    .then((res) => res.json())
    .catch((err) => console.log(err));


list.innerHTML= ''

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



    <a href="#" class="btn btn-primary btn-danger" id=${element.id}>DELETE</a>
    <a href="#" class="btn btn-primary btn-primary" id=${element.id}>EDIT</a>
  </div>
</div> `;

    list.append(newElem);
  });
}
