/**
 * Utilitários de Validação
 * 
 * Este arquivo contém funções auxiliares para validação de dados,
 * especialmente para campos brasileiros como CPF, telefone, etc.
 * 
 * FUNÇÕES DISPONÍVEIS:
 * - validarCPF: Valida CPF com cálculo de dígitos verificadores
 * - formatarCPF: Aplica máscara de CPF (000.000.000-00)
 * - limparCPF: Remove formatação do CPF
 * - validarTelefone: Valida formato de telefone brasileiro
 * - formatarTelefone: Aplica máscara de telefone ((00) 00000-0000)
 * - limparTelefone: Remove formatação do telefone
 * - validarEmail: Valida formato de email
 */

/**
 * Função: limparCPF
 * 
 * Remove todos os caracteres não numéricos do CPF.
 * 
 * @param {string} cpf - CPF com ou sem formatação
 * @returns {string} - CPF apenas com números
 * 
 * Exemplo:
 * limparCPF("123.456.789-00") => "12345678900"
 */
export const limparCPF = (cpf) => {
  if (!cpf) return "";
  return cpf.replace(/\D/g, ""); // Remove tudo que não é dígito
};

/**
 * Função: formatarCPF
 * 
 * Aplica máscara de CPF no formato: 000.000.000-00
 * 
 * @param {string} cpf - CPF sem formatação
 * @returns {string} - CPF formatado
 * 
 * Exemplo:
 * formatarCPF("12345678900") => "123.456.789-00"
 */
export const formatarCPF = (cpf) => {
  const limpo = limparCPF(cpf);
  
  // Aplica a máscara: 000.000.000-00
  if (limpo.length <= 3) return limpo;
  if (limpo.length <= 6) return `${limpo.slice(0, 3)}.${limpo.slice(3)}`;
  if (limpo.length <= 9) return `${limpo.slice(0, 3)}.${limpo.slice(3, 6)}.${limpo.slice(6)}`;
  return `${limpo.slice(0, 3)}.${limpo.slice(3, 6)}.${limpo.slice(6, 9)}-${limpo.slice(9, 11)}`;
};

/**
 * Função: validarCPF
 * 
 * Valida CPF verificando:
 * 1. Se tem 11 dígitos
 * 2. Se não é uma sequência repetida (111.111.111-11, etc.)
 * 3. Se os dígitos verificadores estão corretos
 * 
 * Algoritmo de validação:
 * - Calcula o primeiro dígito verificador
 * - Calcula o segundo dígito verificador
 * - Compara com os dígitos informados
 * 
 * @param {string} cpf - CPF para validar (com ou sem formatação)
 * @returns {boolean} - true se CPF é válido, false caso contrário
 * 
 * Exemplo:
 * validarCPF("123.456.789-00") => false (CPF inválido)
 * validarCPF("111.444.777-35") => true (CPF válido)
 */
export const validarCPF = (cpf) => {
  const limpo = limparCPF(cpf);

  // Verifica se tem 11 dígitos
  if (limpo.length !== 11) return false;

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(limpo)) return false;

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(limpo.charAt(i)) * (10 - i);
  }
  let digito1 = 11 - (soma % 11);
  if (digito1 >= 10) digito1 = 0;

  // Verifica o primeiro dígito
  if (digito1 !== parseInt(limpo.charAt(9))) return false;

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(limpo.charAt(i)) * (11 - i);
  }
  let digito2 = 11 - (soma % 11);
  if (digito2 >= 10) digito2 = 0;

  // Verifica o segundo dígito
  if (digito2 !== parseInt(limpo.charAt(10))) return false;

  // Se chegou aqui, CPF é válido
  return true;
};

/**
 * Função: limparTelefone
 * 
 * Remove todos os caracteres não numéricos do telefone.
 * 
 * @param {string} telefone - Telefone com ou sem formatação
 * @returns {string} - Telefone apenas com números
 * 
 * Exemplo:
 * limparTelefone("(11) 98765-4321") => "11987654321"
 */
export const limparTelefone = (telefone) => {
  if (!telefone) return "";
  return telefone.replace(/\D/g, ""); // Remove tudo que não é dígito
};

/**
 * Função: formatarTelefone
 * 
 * Aplica máscara de telefone no formato: (00) 00000-0000
 * 
 * @param {string} telefone - Telefone sem formatação
 * @returns {string} - Telefone formatado
 * 
 * Exemplo:
 * formatarTelefone("11987654321") => "(11) 98765-4321"
 */
export const formatarTelefone = (telefone) => {
  const limpo = limparTelefone(telefone);

  // Aplica a máscara: (00) 00000-0000
  if (limpo.length === 0) return "";
  if (limpo.length <= 2) return `(${limpo}`;
  if (limpo.length <= 7) return `(${limpo.slice(0, 2)}) ${limpo.slice(2)}`;
  return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7, 11)}`;
};

/**
 * Função: validarTelefone
 * 
 * Valida se o telefone tem formato válido (10 ou 11 dígitos).
 * 
 * @param {string} telefone - Telefone para validar (com ou sem formatação)
 * @returns {boolean} - true se telefone é válido, false caso contrário
 * 
 * Exemplo:
 * validarTelefone("(11) 98765-4321") => true
 * validarTelefone("11987654321") => true
 * validarTelefone("123") => false
 */
export const validarTelefone = (telefone) => {
  const limpo = limparTelefone(telefone);
  // Telefone válido tem 10 ou 11 dígitos (fixo ou celular)
  return limpo.length >= 10 && limpo.length <= 11;
};

/**
 * Função: validarEmail
 * 
 * Valida formato de email usando regex.
 * 
 * @param {string} email - Email para validar
 * @returns {boolean} - true se email é válido, false caso contrário
 * 
 * Exemplo:
 * validarEmail("usuario@exemplo.com") => true
 * validarEmail("email-invalido") => false
 */
export const validarEmail = (email) => {
  if (!email) return true; // Email é opcional, então vazio é válido
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Função: formatarData
 * 
 * Formata data no formato brasileiro: DD/MM/YYYY
 * 
 * @param {string} data - Data no formato YYYY-MM-DD (input type="date")
 * @returns {string} - Data formatada DD/MM/YYYY
 * 
 * Exemplo:
 * formatarData("2025-01-15") => "15/01/2025"
 */
export const formatarData = (data) => {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

