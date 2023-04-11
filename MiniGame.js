const factBtn = document.getElementById('factBtn');
const factTxt = document.getElementById('factTxt');
const catImg = document.getElementById('img');
const hart = document.getElementById('hart');
const catSound = new Audio('http://soundbible.com/grab.php?id=1287&type=mp3');
const body = document.getElementsByName('body');
async function catPic() {
  hart.classList.remove('hide');
  const endpoint = '  https://api.thecatapi.com/v1/images/search?limit=10';
  const server = await fetch(endpoint);
  const response = await server.json();
  
  catImg.style.backgroundImage = `url(${response[0].url})`;
  console.log(response)
  await re();
}

catPic();



function re() {
  console.log('loaded');
  hart.classList.add('hide');
}
