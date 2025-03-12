import { json } from "d3-fetch";
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
      userLonger = user.find((user) => user.id === post.userId);
    }
  });
  console.log(userLonger, longeurText, postEnregistre);
});

function countWords(str) {
  return str.trim().split(/\s+/).length;
}
