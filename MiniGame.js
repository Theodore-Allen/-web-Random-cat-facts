const catImg = document.getElementById('img');
const catSound = new Audio('http://soundbible.com/grab.php?id=1287&type=mp3');

async function getCatArray() {
   const endpoint = ' https://api.thecatapi.com/v1/images/search?limit=10';
  const server = await fetch(endpoint);
  const response = await server.json();
  console.log(response);
}

console


