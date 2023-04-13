const catImg = document.getElementById('img');
const optionContainer = document.getElementById('q-container')
const optionAmount = 4;
app();
async function app() {
  getCatArray().then((e) =>
    id2CatInfo(
      e.map((e) => {
        return e.id;
      })
    ).then((e) => {
      var tempCat = [];
      for (var i = 0; i < optionAmount; i++) {
       
        tempCat.push({name: e[i].breeds[0].name, id: e[i].id, url: e[i].url })
      }

    })
  );
}


// pulls the cat id and img url from the api
async function getCatArray() {
  const endpoint =
    'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1';
  const server = await fetch(endpoint);
  const response = await server.json();

  return response;
}


// runs the id back threw the api to get everything about the cat like the breed 
async function id2CatInfo(id) {
  var cats = [];
  for (var i = 0; i < optionAmount; i++) {
    const endpoint = 'https://api.thecatapi.com/v1/images/' + id[i];
    const server = await fetch(endpoint);
    const response = await server.json();
    cats.push(response);
  }

  return cats;
}

//Api's used
// https://thecatapi.com/
