const catImg = document.getElementById('img');
const loadingObj = document.getElementById('loading');
const optionContainer = document.getElementById('q-container');
const WLPage = document.getElementById('WLPage');
const WLPageTxt = document.getElementById('WLPage-word');
const WLPageBtn = document.getElementById('nextCatBtn');

//game variable
const optionAmount = 5; // ten is the max but its really slow to load
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
WLPageBtn.addEventListener('click', () => {
  app();
});
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
    OpenWLPage(1);
  } else {
    console.log('you lose');
    OpenWLPage(0);
  }

  // app();
}
function loading(bool) {
  WLPage.style.display = 'none';
  if (bool === true) {
    loadingObj.classList.remove('hide');
  } else {
    loadingObj.classList.add('hide');
  }
}
// 0 lost 1 Win
function OpenWLPage(WL) {
  let win = [
    'you won',
    'great job',
    'winner winner chicken dinner',
    'you deserve a gold star',
    'catastic',
    'cat novice',
    'IDk what your doing but keep it up',
    'WOw you know your cats',
    'You got this!',
    'Believe in yourself!',
    'Keep pushing forward!',
    "You're making progress!",
    "You're amazing!",
    'You can do it!',
    "Don't give up!",
    'Stay positive!',
    "You're stronger than you know!",
    "You're capable of great things!",
    "Don't be afraid to try!",
    'Take it one step at a time!',
    "You're on the right track!",
    'Keep up the good work!',
    "You're doing great!",
    'Never stop learning!',
    "You're a champion!",
    'Keep chasing your dreams!',
    "You're an inspiration!",
    "You're making a difference!",
    'Stay focused and determined!',
    "You're destined for greatness!",
    "You're capable of anything!",
    "Don't let setbacks hold you back!",
    "You're a problem solver!",
    "You're full of potential!",
    "You're a fighter!",
    'Believe in your abilities!',
    'Stay motivated!',
    "You're unique and special!",
    "You're a winner!",
    'Stay true to yourself!',
    "You're doing better than you think!",
    "You're making an impact!",
    "You're going places!",
    'Keep aiming higher!',
    "You're a valuable asset!",
    'Keep your head up!',
    "You're a leader!",
    "You're a go-getter!",
    'Stay persistent!',
    "You're a role model!",
    "You're a problem solver!",
    "You're destined for success!",
    'Stay committed to your goals!',
    "You're an overcomer!",
    'Keep the faith!',
    "You're a creative genius!",
    "You're a visionary!",
    "You're a game-changer!",
    'Stay hungry for success!',
    "You're an innovator!",
    "You're a trailblazer!",
    "You're a force to be reckoned with!",
    'Stay fearless!',
    "You're a master of your craft!",
    "You're a true professional!",
    "You're an expert!",
    'Stay disciplined!',
    "You're a rising star!",
    "You're a miracle worker!",
    "You're a miracle in progress!",
    "You're making your mark!",
    'Stay hungry, stay foolish!',
    "You're a future billionaire!",
    "You're a genius in the making!",
    "You're a trendsetter!",
    'Stay hungry, stay foolish!',
    "You're a future Nobel Prize winner!",
    "You're a future world leader!",
    'Stay curious!',
  ];
  let lose = [
    "you're trash",
    'you lost',
    'better luck next time',
    'it must have been a wall',
    'you probaly couldnt see the cat right, right?',
    "you can't be this bad",
  ];

  if (WL == 0) {
    // loosing
    WLPageTxt.innerText = lose[RandomInt(0, lose.length)];
  } else {
    //winning
    WLPageTxt.innerText = win[RandomInt(0, win.length)];
  }

  catImg.style.background = 'none';
  catImg.style.boxShadow = 'none';

  WLPage.style.display = 'block';
}
//Api's used
// https://thecatapi.com/
