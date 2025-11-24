/**
 * Utilitários de Exportação
 * 
 * Este arquivo contém funções para exportar dados em diferentes formatos.
 * 
 * FUNÇÕES DISPONÍVEIS:
 * - exportarCSV: Exporta dados para arquivo CSV
 * - formatarDataParaCSV: Formata data para exibição no CSV
 */

/**
 * Função: formatarDataParaCSV
 * 
 * Converte data do formato ISO (YYYY-MM-DD) para formato brasileiro (DD/MM/YYYY).
 * 
 * @param {string} dataISO - Data no formato YYYY-MM-DD ou null/undefined
 * @returns {string} - Data formatada DD/MM/YYYY ou string vazia
 * 
 * Exemplo:
 * formatarDataParaCSV("2025-01-15") => "15/01/2025"
 * formatarDataParaCSV(null) => ""
 */
const formatarDataParaCSV = (dataISO) => {
  if (!dataISO) return "";
  try {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  } catch (error) {
    return "";
  }
};

/**
 * Função: exportarCSV
 * 
 * Exporta um array de objetos para um arquivo CSV.
 * 
 * Como funciona:
 * 1. Extrai os cabeçalhos (chaves do primeiro objeto)
 * 2. Mapeia os cabeçalhos para nomes amigáveis (se fornecido)
 * 3. Converte cada objeto em linha CSV
 * 4. Cria um blob com o conteúdo CSV
 * 5. Cria um link de download e clica automaticamente
 * 6. Remove o link após o download
 * 
 * @param {Array} dados - Array de objetos para exportar
 * @param {string} nomeArquivo - Nome do arquivo CSV (sem extensão)
 * @param {Object} mapeamentoCampos - Mapeamento de campos para nomes amigáveis (opcional)
 * 
 * Exemplo:
 * exportarCSV(
 *   [{ nome: "João", idade: 30 }],
 *   "membros",
 *   { nome: "Nome Completo", idade: "Idade" }
 * )
 */
export const exportarCSV = (dados, nomeArquivo = "exportacao", mapeamentoCampos = {}) => {
  // Verifica se há dados para exportar
  if (!dados || dados.length === 0) {
    alert("Não há dados para exportar.");
    return;
  }

  // Extrai os cabeçalhos do primeiro objeto
  const cabecalhos = Object.keys(dados[0]);

  // Mapeia cabeçalhos para nomes amigáveis (se fornecido)
  const cabecalhosFormatados = cabecalhos.map(
    (campo) => mapeamentoCampos[campo] || campo
  );

  // Função para escapar valores CSV (trata vírgulas, aspas, quebras de linha)
  const escaparCSV = (valor) => {
    if (valor === null || valor === undefined) return "";
    const string = String(valor);
    // Se contém vírgula, aspas ou quebra de linha, envolve em aspas
    if (string.includes(",") || string.includes('"') || string.includes("\n")) {
      return `"${string.replace(/"/g, '""')}"`; // Escapa aspas duplas
    }
    return string;
  };

  // Função para formatar valor do campo
  const formatarValor = (valor, campo) => {
    // Se for data, formata para DD/MM/YYYY
    if (campo.includes("data") || campo.includes("nascimento") || campo.includes("batismo")) {
      return formatarDataParaCSV(valor);
    }
    // Se for boolean, converte para Sim/Não
    if (typeof valor === "boolean") {
      return valor ? "Sim" : "Não";
    }
    // Retorna o valor como string
    return escaparCSV(valor);
  };

  // Cria a primeira linha (cabeçalhos)
  const linhaCabecalho = cabecalhosFormatados.map(escaparCSV).join(",");

  // Cria as linhas de dados
  const linhasDados = dados.map((objeto) => {
    return cabecalhos
      .map((campo) => formatarValor(objeto[campo], campo))
      .join(",");
  });

  // Combina cabeçalho e dados
  const conteudoCSV = [linhaCabecalho, ...linhasDados].join("\n");

  // Adiciona BOM (Byte Order Mark) para UTF-8, necessário para Excel abrir corretamente
  const BOM = "\uFEFF";
  const conteudoComBOM = BOM + conteudoCSV;

  // Cria um blob (Binary Large Object) com o conteúdo CSV
  const blob = new Blob([conteudoComBOM], { type: "text/csv;charset=utf-8;" });

  // Cria um link temporário para download
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  // Configura o link
  link.setAttribute("href", url);
  link.setAttribute("download", `${nomeArquivo}_${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden"; // Esconde o link

  // Adiciona o link ao DOM, clica e remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Libera a URL do objeto
  URL.revokeObjectURL(url);
};

