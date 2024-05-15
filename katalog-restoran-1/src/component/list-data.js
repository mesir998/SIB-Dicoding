import("../public/data/DATA.json").then(({ default: jsondata }) => {
  console.log(jsondata);
  let datas = jsondata["restaurants"];
  let listData = "";
  datas.forEach(function (data) {
    listData += `
        <div class="judulKartu" tabindex="0">
            <div class="gamcit">
                <p>${data["city"]}</p>
                <img src="${data["pictureId"]}" alt="${data["name"]}" />
            </div>
            <div class="itemCards">
                <h3><b>${data["name"]}</b></h3>
                <h5>Rate ${data["rating"]}</h5>
                <p>${data["description"].slice(0, 200)}...</p>
            </div>
        </div>
        `;
  });
  document.querySelector("#listCards").innerHTML = listData;
});
