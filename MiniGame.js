const catImg = document.getElementById('img');
const loadingObj = document.getElementById('loading');
const optionContainer = document.getElementById('q-container');
const WLPage = document.getElementById('WLPage');


//game variable
const optionAmount = 3; // ten is the max but its really slow to load
let answer;
let score;

app();
async function app() {
  loading(true);
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


//event listenser

//functions

// pulls the cat id and img url from the api
async function getCatArray() {
  const endpoint =
    'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1';
  const server = await fetch(endpoint);
  const response = await server.json();

  return response;
}

function gameStart(catsArray) {
  optionContainer.innerHTML = '';

  var tempRand = RandomInt(0, optionAmount);
  answer = tempRand;

  catImg.style.backgroundImage = `url(${catsArray[tempRand].url})`;

  // making the optionsBTNS for each cat
  for (var i = 0; i < optionAmount; i++) {
    const button = document.createElement('button');

    button.innerText = catsArray[i].name;
    button.setAttribute('index', i);
    button.addEventListener('click', (e) =>
      answerCheck(button.getAttribute('index'))
    );

    optionContainer.append(button);
  }


  if (document.readyState === 'ready' || document.readyState === 'complete') {
    loading(false);
  } else {
    document.onreadystatechange = function () {
      if (document.readyState == 'complete') {
        loading(false);
      }
    };
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
//returns a random int number
function RandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function answerCheck(index) {
  console.log(index);
  if (index == answer) {
    console.log('you won');

  } else {
    console.log('you lose');
  }
  OpenWLPage(0)
  app();
}
function loading(bool) {
  if (bool === true) {
    loadingObj.classList.remove('hide');
  } else {
    loadingObj.classList.add('hide');
  }
}
// 0 lost 1 Win
function OpenWLPage(WL)
{



  if(WL == 0)
  {
    // loosing 


  }
  else
  {
    //winning 


  }
catImg.style.background = 'none';
}
//Api's used
// https://thecatapi.com/
