import { select } from "d3-selection";

// C'est ici que vous allez écrire les premières lignes avec d3.js!
const WIDTH = 500;
const HEIGHT = 800;

const svg = select("body")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);

// Ajoute les trois cercles au même SVG
svg
  .append("circle")
  .attr("id", "cercle1")
  .attr("cx", 100)
  .attr("cy", 50)
  .attr("r", 40)
  .attr("fill", "green");
svg.append("text").text("1e texte").attr("x", "75").attr("y", "100");

svg
  .append("circle")
  .attr("id", "cercle2")
  .attr("cx", 200)
  .attr("cy", 150)
  .attr("r", 40)
  .attr("fill", "green");
svg.append("text").text("2e texte").attr("x", "175").attr("y", "200");

svg
  .append("circle")
  .attr("id", "cercle3")
  .attr("cx", 250)
  .attr("cy", 250)
  .attr("r", 40)
  .attr("fill", "green");
svg.append("text").text("3e texte").attr("x", "225").attr("y", "300");

const cercle1 = select("#cercle1");

const cercle2 = select("#cercle2");
cercle2.attr("fill", "red");

const cercle3 = select("#cercle3").on("click", function () {
  cercle1.attr("cx", 50).attr("cy", 50);
  cercle2.attr("cx", 50).attr("cy", 150);
  select(this).attr("cx", 50).attr("cy", 250);
});

const data = [20, 5, 25, 8, 15];
const HEIGHT2 =200

const newSvg = select("body")
    .append("svg")
    .attr("width", "100%")
    .attr("height", HEIGHT2);

const rectangles = newSvg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 60) // Espace horizontal entre chaque rectangle
    .attr("y", d => HEIGHT2 - d * 10) // Aligne les rectangles en bas
    .attr("width", 50) // Largeur fixe des rectangles
    .attr("height", d => d * 10) // Hauteur proportionnelle aux données
    .attr("fill", "green");