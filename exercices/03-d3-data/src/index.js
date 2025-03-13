import { json } from "d3-fetch";
import { select } from "d3-selection";
import {max, min, sum, extent, mean} from "d3-array"
Promise.all([
  json("https://jsonplaceholder.typicode.com/posts"),
  json("https://jsonplaceholder.typicode.com/users"),
]).then(function (data) {
  console.log(data);

  const posts = data[0];
  const user = data[1];
  const userWithPost = user.map((user) => {
    return {
      nom_utilisateur: user.name,
      ville: user.address.city,
      nom_companie: user.company.name,
      titre_posts: posts
        .filter((posts) => posts.userId === user.id)
        .map((post) => post.title),
    };
  });
  console.log(userWithPost);

  //Afficher nombre de titre par utilisateur
  let titreByUser = user.map((user) => {
    let post_filter = posts.filter((posts) => posts.userId === user.id);
    let new_object = {
      nom: user.name,
      nombrePost: post_filter.length,
    };
    return new_object;
  });
  console.log(titreByUser);

  //Texte le plus long
  let longeurText = 0;
  let postEnregistre = "";
  let userLonger = "";
  posts.forEach((post) => {
    if (countWords(post.body) > longeurText) {
      longeurText = countWords(post.body);
      postEnregistre = post.body;
      userLonger = user.find((user) => user.id === post.userId).name;
    }
  });
  console.log(userLonger, longeurText, postEnregistre);

//Afficher les utilisateur le nombre de posts
const WIDTH = 1000;
const HEIGHT = 800;


const svg = select("body")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT + 200);

const rectangle = svg.selectAll("rect")
  .data(titreByUser)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i*60)
  .attr("y", d => HEIGHT -d.nombrePost*10)
  .attr("width", 50) // Largeur fixe des rectangles
  .attr("height", d => d.nombrePost * 10)
  .attr("fill", "green");



  svg.selectAll("text")
  .data(titreByUser)
  .enter().append("text")
  .attr("x", (d, i) => (i) * 60 - 50) // Position x basée sur l'index
  .attr("y", 800) // Position y fixe
  .text(d => d.nom) // Texte basé sur le nom de la ville
  .attr("transform",(d, i) =>`rotate(-90, ${(i) * 60 +25}, ${HEIGHT-5})`)
  .attr("text-anchor", "middle"); // Ancrage du texte au milieu 
});




function countWords(str) {
  return str.trim().split(/\s+/).length;
}
