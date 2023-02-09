const factBtn = document.getElementById('factBtn');
const factTxt = document.getElementById('factTxt');
const catImg = document.getElementById('img');
const hart = document.getElementById('hart');
async function catPic() {
  hart.classList.remove('hide');
  const endpoint = ' https://api.thecatapi.com/v1/images/search';
  const server = await fetch(endpoint);
  const response = await server.json();
  catImg.style.backgroundImage = `url(${response[0].url})`;

  catimg.addEventListener('onLoad', () => {
    hart.classList.add('hide');
  });
}
async function catFact() {
  const endpoint = 'https://catfact.ninja/fact';
  const server = await fetch(endpoint);
  const response = await server.json();
  factTxt.innerText = response.fact;
}
catPic();
catFact();
factBtn.addEventListener('click', () => {
  catPic();
  catFact();
});
