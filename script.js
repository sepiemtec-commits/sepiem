const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const email = document.body.dataset.email || "contato@sepiem.com";

document.querySelectorAll("[data-mail]").forEach((node) => {
  node.textContent = email;
  if (node.tagName === "A") node.href = "mailto:" + email;
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-stuck", window.scrollY > 8);
});

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

const form = document.querySelector("#form-contato");
const ok = document.querySelector(".form-ok");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nome = String(data.get("nome") || "").trim();
  const remetente = String(data.get("email") || "").trim();
  const empresa = String(data.get("empresa") || "").trim();
  const interesse = String(data.get("interesse") || "").trim();
  const mensagem = String(data.get("mensagem") || "").trim();

  if (!nome || !remetente || !mensagem) {
    ok.textContent = "Preencha nome, e-mail e mensagem para continuar.";
    ok.classList.add("show");
    return;
  }

  const body = [
    "Nome: " + nome,
    "E-mail: " + remetente,
    "Organização: " + (empresa || "—"),
    "Interesse: " + interesse,
    "",
    mensagem
  ].join("\n");

  const subject = "Contato pelo site SEPIEM — " + interesse;
  window.location.href =
    "mailto:" + email +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  ok.textContent = "A mensagem foi preparada no seu e-mail. Se a janela não abrir, escreva direto para " + email + ".";
  ok.classList.add("show");
});
