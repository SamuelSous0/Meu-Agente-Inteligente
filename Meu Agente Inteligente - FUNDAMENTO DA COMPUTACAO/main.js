 const linhas = [
      { nome: "860", cor: "#1e88e5" },
      { nome: "346", cor: "#43a047" },
      { nome: "1995", cor: "#e53935" },
      { nome: "812", cor: "#f9a825" },
      { nome: "214", cor: "#6a1b9a" }
    ];

    function iniciarSimulacao() {
      document.getElementById('tela').innerHTML = "<strong>Notificações:</strong>";
      document.querySelectorAll(".onibus").forEach(o => o.remove());

      linhas.forEach((linha, index) => {
        setTimeout(() => {
          criarOnibus(linha);
        }, index * 6000);
      });
    }

    function criarOnibus({ nome, cor }) {
      const onibus = document.createElement("div");
      onibus.className = "onibus";
      onibus.style.backgroundColor = cor;
      onibus.innerText = "Linha " + nome;
      onibus.style.left = "-150px";

      const cenario = document.getElementById("cenario");
      cenario.appendChild(onibus);

      let pos = -150;
      const lotado = Math.random() < 0.5;
      let statusAtual = "";

      const intervalo = setInterval(() => {
        pos += 2;
        onibus.style.left = pos + "px";

        const pontoX = 520;
        const distancia = pontoX - (pos + 140);

        if (distancia == 300 && statusAtual !== "aCaminho") {
          statusAtual = "aCaminho";
          adicionarMensagem(`🚌 Ônibus ${nome} a caminho. Estimativa: 3 minutos.`, "info");
        }

        if (distancia == 150 && statusAtual !== "chegando") {
          statusAtual = "chegando";
          if (lotado) {
            adicionarMensagem(`⚠️ Ônibus ${nome} está superlotado. Aguarde o próximo.`, "alerta");
          } else {
            adicionarMensagem(`🟢 Ônibus ${nome} com assentos disponíveis. Chega em 1 min.`, "info");
          }
        }

        if (distancia <= 0 && statusAtual !== "chegou") {
          statusAtual = "chegou";
          adicionarMensagem(`✅ Ônibus ${nome} chegou ao ponto.`, "ok");
          clearInterval(intervalo);
        }
      }, 60);
    }

    function adicionarMensagem(texto, tipo) {
      const tela = document.getElementById("tela");
      const div = document.createElement("div");
      div.className = "mensagem " + tipo;
      div.textContent = texto;
      tela.appendChild(div);
      tela.scrollTop = tela.scrollHeight;
    }