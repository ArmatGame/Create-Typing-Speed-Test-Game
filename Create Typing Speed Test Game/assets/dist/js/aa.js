document.body.addEventListener("paste", () => {
  document.links[0].style.display = "block";
  document.links[0].style.textDecoration = "none";
  document.links[0].style.color = "red";
})