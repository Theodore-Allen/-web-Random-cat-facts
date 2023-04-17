const catImg = document.getElementById('img');
const optionContainer = document.getElementById('q-container');
const optionAmount = 4;

let answer;

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
        tempCat.push({ name: e[i].breeds[0].name, id: e[i].id, url: e[i].url });
      }
      console.log(tempCat);
      gameStart(tempCat);
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
function gameStart(catsArray) {
  var tempRand = RandomInt(0, optionAmount);
  answer = tempRand;
 
  console.log(tempRand);

  catImg.style.backgroundImage = `url(${catsArray[tempRand].url})`;

  for (var i = 0; i < optionAmount; i++) {
    const button = document.createElement('button');
   
    button.innerText = catsArray[i].name;
    button.setAttribute('index', i);
    
    optionContainer.append(button);
  }
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
function RandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
//Api's used
// https://thecatapi.com/
