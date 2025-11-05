const API = "";
let token = null;

const $ = id => document.getElementById(id);

const setUserBox = (nome) => {
  $("userBox").innerText = nome ? `Logado como: ${nome}` : "";
};

$("btnRegistrar").addEventListener("click", async () => {
  const nome = $("nome").value;
  const email = $("email").value;
  const senha = $("senha").value;
  const res = await fetch(`${API}/usuarios/registrar`, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ nome, email, senha })
  });
  const data = await res.json();
  alert(data.msg || data.erro || JSON.stringify(data));
});

$("btnLogin").addEventListener("click", async () => {
  const email = $("loginEmail").value;
  const senha = $("loginSenha").value;
  const res = await fetch(`${API}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ email, senha })
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    setUserBox(data.msg ? ("Você está logado") : "");
    alert("Login bem-sucedido");
  } else {
    alert(data.erro || JSON.stringify(data));
  }
});

$("btnCriar").addEventListener("click", async () => {
  const titulo = $("titulo").value;
  const diretor = $("diretor").value;
  const genero = $("genero").value;
  const ano = Number($("ano").value) || undefined;
  const res = await fetch(`${API}/filmes`, {
    method: "POST",
    headers: { "Content-Type":"application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({ titulo, diretor, genero, ano })
  });
  const data = await res.json();
  if (res.ok) {
    alert("Filme criado!");
    carregarFilmes();
  } else {
    alert(data.erro || JSON.stringify(data));
  }
});

$("btnBuscar").addEventListener("click", carregarFilmes);

async function carregarFilmes() {
  const titulo = $("buscaTitulo").value;
  const q = titulo ? `?titulo=${encodeURIComponent(titulo)}` : "";
  const res = await fetch(`${API}/filmes${q}`);
  const filmes = await res.json();
  const lista = $("lista");
  lista.innerHTML = "";
  filmes.forEach(f => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${f.titulo} (${f.ano || ""})</h3>
      <p><strong>Diretor:</strong> ${f.diretor || "-"}</p>
      <p><strong>Gênero:</strong> ${f.genero || "-"}</p>
      <p><strong>Média:</strong> ${f.mediaAvaliacoes || 0}</p>
      <p><strong>Avaliações:</strong> ${f.avaliacoes?.length || 0}</p>
      <div style="margin-top:8px;">
        <input placeholder="Nota (0-10)" class="nota" />
        <input placeholder="Comentário" class="coment" />
        <button class="btnAvaliar">Avaliar</button>
      </div>
    `;
    lista.appendChild(div);

    const btn = div.querySelector(".btnAvaliar");
    btn.addEventListener("click", async () => {
      const nota = Number(div.querySelector(".nota").value);
      const comentario = div.querySelector(".coment").value;
      const res = await fetch(`${API}/filmes/${f._id}/avaliar`, {
        method: "POST",
        headers: { "Content-Type":"application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify({ nota, comentario })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Avaliação registrada!");
        carregarFilmes();
      } else {
        alert(data.erro || JSON.stringify(data));
      }
    });
  });
}

// load initial
carregarFilmes();
