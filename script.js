const inputField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height"); 
const pokemonPic = document.getElementById("sprite");
const typesDiv = document.getElementById("types");
const fieldHP = document.getElementById("hp");
const fieldAttack = document.getElementById("attack");
const fieldDefense = document.getElementById("defense");
const fieldSpAttack = document.getElementById("special-attack");
const fieldSpDefense = document.getElementById("special-defense");
const fieldSpeed = document.getElementById("speed");

const fetchData = async (pokeNameId) =>{

  try{
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokeNameId}`);
    const data = await res.json();
    showPokeStats(data);
  }catch(err){
    console.log(err);
    alert("Pokémon not found");
  }
}

const showPokeStats = (data) =>{

  const {name,id,weight,height,sprites,stats,types} = data;

  pokemonName.innerText = name.toUpperCase();
  pokemonId.innerText = "#" + id;
  pokemonWeight.innerText = "Weight: " + weight;
  pokemonHeight.innerText = "Height: " + height;
  pokemonPic.setAttribute("src",`${sprites.front_default}`);
  fieldHP.innerText = stats[0].base_stat;
  fieldAttack.innerText = stats[1].base_stat;
  fieldDefense.innerText = stats[2].base_stat;
  fieldSpAttack.innerText = stats[3].base_stat;
  fieldSpDefense.innerText = stats[4].base_stat;
  fieldSpeed.innerText = stats[5].base_stat;

  for(let i=0; i<types.length; i++){

    let typeName = types[i].type.name;
    typesDiv.innerHTML += `<div class="type" id="type-${typeName}">${typeName.toUpperCase()}</div>`;
  }
}

const clearPokeStats = () =>{

  pokemonName.innerText = "";
  pokemonId.innerText = "";
  pokemonWeight.innerText = "";
  pokemonHeight.innerText = "";
  pokemonPic.setAttribute("display","none");
  fieldHP.innerText = "";
  fieldAttack.innerText = "";
  fieldDefense.innerText = "";
  fieldSpAttack.innerText = "";
  fieldSpDefense.innerText = "";
  fieldSpeed.innerText = "";
  typesDiv.innerHTML = "";
}

searchBtn.addEventListener("click",() =>{

  const userInput = inputField.value.toLowerCase();

  clearPokeStats();
  fetchData(userInput);
});