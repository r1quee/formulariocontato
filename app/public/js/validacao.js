function mascaraTelefone(evento) {
  let numeros = evento.target.value.replace(/\D/g, "");


  if (numeros.length > 11) numeros = numeros.slice(0, 11);

  let formatted = "";

  if (numeros.length <= 2) {
    formatted = `(${numeros}`;
  } else if (numeros.length <= 6) {
    
    formatted = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  } else if (numeros.length <= 10) {
    
    formatted = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}`;
    const resto = numeros.slice(6);
    if (resto) formatted += `-${resto}`;
  } else {
    
    formatted = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  evento.target.value = formatted;
}


function validarEmail(evento) {
  const valor = evento.target.value;
  const regexEmail = /[^a-zA-Z0-9@._\-]/g;
  evento.target.value = valor.replace(regexEmail, "");
}


function mascaraNome(evento) {
  let valor = evento.target.value;
  valor = valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
  evento.target.value = valor;
}


function mascaraAssunto(evento) {
  let valor = evento.target.value;
  valor = valor.replace(/[^a-zA-Z0-9À-ÿ\s.,!?-]/g, "");
  evento.target.value = valor;
}


function validarFormatoEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}


function validarTelefone(telefone) {
  const apenasNumeros = telefone.replace(/\D/g, "");
  return apenasNumeros.length >= 10 && apenasNumeros.length <= 11;
}


function validarNome(nome) {
  return nome.trim().length >= 3;
}


function validarAssunto(assunto) {
  return assunto.trim().length >= 5;
}


function validarMensagem(mensagem) {
  return mensagem.trim().length >= 10;
}


function exibirErro(elemento, mensagem) {
  const spanErro = elemento.parentElement.querySelector(".error-message");
  if (spanErro) {
    spanErro.textContent = mensagem;
    spanErro.classList.add("show");
    elemento.style.borderColor = "#e74c3c";
  }
}


function limparErro(elemento) {
  const spanErro = elemento.parentElement.querySelector(".error-message");
  if (spanErro) {
    spanErro.textContent = "";
    spanErro.classList.remove("show");
    elemento.style.borderColor = "#e0e0e0";
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const inputNome = document.getElementById("nome");
  const inputEmail = document.getElementById("email");
  const inputTelefone = document.getElementById("tel");
  const inputAssunto = document.getElementById("assunto");
  const inputMensagem = document.getElementById("mensagem");
  const formulario = document.querySelector("form");

 
  if (inputNome) {
    inputNome.addEventListener("input", (e) => {
      mascaraNome(e);
      if (inputNome.value.trim()) {
        if (validarNome(inputNome.value)) {
          limparErro(inputNome);
        } else {
          exibirErro(inputNome, "Nome deve ter no mínimo 3 caracteres");
        }
      } else {
        limparErro(inputNome);
      }
    });

    inputNome.addEventListener("blur", () => {
      if (inputNome.value.trim() && !validarNome(inputNome.value)) {
        exibirErro(inputNome, "Nome deve ter no mínimo 3 caracteres");
      }
    });
  }


  if (inputEmail) {
    inputEmail.addEventListener("input", (e) => {
      validarEmail(e);
      if (inputEmail.value) {
        if (validarFormatoEmail(inputEmail.value)) {
          limparErro(inputEmail);
        } else {
          exibirErro(inputEmail, "Email inválido");
        }
      } else {
        limparErro(inputEmail);
      }
    });

    inputEmail.addEventListener("blur", () => {
      if (inputEmail.value && !validarFormatoEmail(inputEmail.value)) {
        exibirErro(inputEmail, "Email inválido");
      }
    });
  }


  if (inputTelefone) {
    inputTelefone.addEventListener("input", mascaraTelefone);

    inputTelefone.addEventListener("blur", () => {
      if (inputTelefone.value && !validarTelefone(inputTelefone.value)) {
        exibirErro(inputTelefone, "Telefone deve ter 10 ou 11 dígitos");
      } else if (inputTelefone.value) {
        limparErro(inputTelefone);
      }
    });
  }

 
  if (inputAssunto) {
    inputAssunto.addEventListener("input", (e) => {
      mascaraAssunto(e);
      if (inputAssunto.value.trim()) {
        if (validarAssunto(inputAssunto.value)) {
          limparErro(inputAssunto);
        } else {
          exibirErro(inputAssunto, "Assunto deve ter no mínimo 5 caracteres");
        }
      } else {
        limparErro(inputAssunto);
      }
    });

    inputAssunto.addEventListener("blur", () => {
      if (inputAssunto.value.trim() && !validarAssunto(inputAssunto.value)) {
        exibirErro(inputAssunto, "Assunto deve ter no mínimo 5 caracteres");
      }
    });
  }

  
  if (inputMensagem) {
    inputMensagem.addEventListener("blur", () => {
      if (inputMensagem.value.trim() && !validarMensagem(inputMensagem.value)) {
        exibirErro(inputMensagem, "Mensagem deve ter no mínimo 10 caracteres");
      } else if (inputMensagem.value.trim()) {
        limparErro(inputMensagem);
      }
    });

    inputMensagem.addEventListener("input", () => {
      if (inputMensagem.value.trim()) {
        if (validarMensagem(inputMensagem.value)) {
          limparErro(inputMensagem);
        }
      }
    });
  }

  
  if (formulario) {
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      let formValido = true;

    
      if (!validarNome(inputNome.value)) {
        exibirErro(inputNome, "Nome deve ter no mínimo 3 caracteres");
        formValido = false;
      } else {
        limparErro(inputNome);
      }

      
      if (!validarFormatoEmail(inputEmail.value)) {
        exibirErro(inputEmail, "Email inválido");
        formValido = false;
      } else {
        limparErro(inputEmail);
      }

    
      if (!validarTelefone(inputTelefone.value)) {
        exibirErro(inputTelefone, "Telefone deve ter 10 ou 11 dígitos");
        formValido = false;
      } else {
        limparErro(inputTelefone);
      }

     
      if (!validarAssunto(inputAssunto.value)) {
        exibirErro(inputAssunto, "Assunto deve ter no mínimo 5 caracteres");
        formValido = false;
      } else {
        limparErro(inputAssunto);
      }

     
      if (!validarMensagem(inputMensagem.value)) {
        exibirErro(inputMensagem, "Mensagem deve ter no mínimo 10 caracteres");
        formValido = false;
      } else {
        limparErro(inputMensagem);
      }

      
      if (formValido) {
        formulario.submit();
      }
    });
  }
});
