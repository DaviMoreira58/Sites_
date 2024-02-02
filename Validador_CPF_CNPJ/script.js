function formatarCPF(input) {
    var cpf = input.value.replace(/\D/g, "");

    if (cpf.length === 9) {
        input.value = cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-");
    } else if (cpf.length === 11) {
        input.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
        input.value = cpf;
    }
}

function calcularDigitoVerificadorCPF(cpfBase) {
    var soma = 0;
    var peso = 10;

    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpfBase[i]) * peso;
        peso--;
    }

    var resto = soma % 11;
    var digitoVerificador1 = 11 - resto;

    if (digitoVerificador1 >= 10) {
        digitoVerificador1 = 0;
    }

    cpfBase += digitoVerificador1;

    soma = 0;
    peso = 11;

    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpfBase[i]) * peso;
        peso--;
    }

    resto = soma % 11;
    var digitoVerificador2 = 11 - resto;

    if (digitoVerificador2 >= 10) {
        digitoVerificador2 = 0;
    }

    return cpfBase + digitoVerificador2;
}

function apagarDigito(event) {
    var input = document.getElementById("cpf");
    var cpf = input.value.replace(/\D/g, "");

    if (event.key === "Backspace") {
        cpf = cpf.slice(0, -1);
        if (cpf.length === 9) {
            var cpfBase = cpf.substring(0, 9);
            var cpfCompleto = calcularDigitoVerificadorCPF(cpfBase);
            input.value = cpfCompleto;
        } else {
            input.value = cpf;
        }
    } else if (cpf.length === 9) {
        var cpfBase = cpf.substring(0, 9);
        var cpfCompleto = calcularDigitoVerificadorCPF(cpfBase);
        input.value = cpfCompleto;
    } else if (cpf.length === 11) {
        input.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
        input.value = cpf;
    }
}

function validarCPF() {
    var cpf = document.getElementById("cpf").value.replace(/\D/g, "");
    var resultadoCPF = document.getElementById("resultadoCPF");

    if (cpf.length === 9) {
        var cpfBase = cpf;
        var cpfCompleto = calcularDigitoVerificadorCPF(cpfBase);

        // Formatar o CPF gerado com dígitos verificadores
        var cpfFormatado = cpfCompleto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        resultadoCPF.innerText = "CPF gerado com dígitos verificadores: " + cpfFormatado;
    } else if (cpf.length !== 11) {
        resultadoCPF.innerText = "CPF deve ter 11 dígitos ou 9 dígitos para geração automática.";
    } else {
        var cpfBase = cpf.substring(0, 9);
        var cpfCompleto = calcularDigitoVerificadorCPF(cpfBase);

        if (cpf !== cpfCompleto) {
            resultadoCPF.innerText = "CPF inválido.";
        } else {
            resultadoCPF.innerText = "CPF válido!";
        }
    }
}

function limparCPF() {
    var input = document.getElementById("cpf");
    input.value = "";
    var resultado = document.getElementById("resultadoCPF");
    resultado.innerText = "";
}

function formatarCNPJ(input) {
    var cnpj = input.value.replace(/\D/g, "");

    if (cnpj.length === 12) {
        input.value = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1})/, "$1.$2.$3/$4-$5");
    } else if (cnpj.length === 14) {
        input.value = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    } else {
        input.value = cnpj;
    }
}

function calcularDigitoVerificadorCNPJ(cnpjBase) {
    var pesosPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    var pesosSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    // Calcula o primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 12; i++) {
        soma += parseInt(cnpjBase[i]) * pesosPrimeiroDigito[i];
    }
    var primeiroDigito = soma % 11;
    primeiroDigito = primeiroDigito < 2 ? 0 : 11 - primeiroDigito;

    // Adiciona o primeiro dígito verificador ao CNPJ base
    cnpjBase += primeiroDigito;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (var j = 0; j < 13; j++) {
        soma += parseInt(cnpjBase[j]) * pesosSegundoDigito[j];
    }
    var segundoDigito = soma % 11;
    segundoDigito = segundoDigito < 2 ? 0 : 11 - segundoDigito;

    return cnpjBase + segundoDigito;
}

function apagarDigito(event) {
    var input = document.getElementById("cpf");
    var cpf = input.value.replace(/\D/g, "");

    if (event.key === "Backspace") {
        cpf = cpf.slice(0, -1);
        if (cpf.length === 9) {
            var cpfBase = cpf.substring(0, 9);
            var cpfCompleto = calcularDigitoVerificador(cpfBase);
            input.value = cpfCompleto;
        } else {
            input.value = cpf;
        }
    } else if (cpf.length === 9) {
        var cpfBase = cpf.substring(0, 9);
        var cpfCompleto = calcularDigitoVerificador(cpfBase);
        input.value = cpfCompleto;
    } else if (cpf.length === 11) {
        input.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
        input.value = cpf;
    }
}

function validarCNPJ() {
    var cnpj = document.getElementById("cnpj").value.replace(/\D/g, "");
    var resultadoCNPJ = document.getElementById("resultadoCNPJ");

    if (cnpj.length === 14) {
        var cnpjBase = cnpj.substring(0, 12);
        var cnpjCompleto = calcularDigitoVerificadorCNPJ(cnpjBase);

        if (cnpj !== cnpjCompleto) {
            resultadoCNPJ.innerText = "CNPJ inválido.";
        } else {
            resultadoCNPJ.innerText = "CNPJ válido!";
        }
    } else if (cnpj.length === 8) {
        // O usuário inseriu apenas 9 dígitos, adicionamos "0001" automaticamente
        var cnpjBase = cnpj + "0001";
        var cnpjCompleto = calcularDigitoVerificadorCNPJ(cnpjBase);

        // Formatar o CNPJ gerado com dígitos verificadores
        var cnpjFormatado = cnpjCompleto.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        resultadoCNPJ.innerText = "CNPJ gerado com dígitos verificadores: " + cnpjFormatado;
    } else {
        resultadoCNPJ.innerText = "CNPJ deve ter 14 dígitos ou 8 dígitos para geração automática.";
    }
}

function formatarCNPJ(input) {
    var cnpj = input.value.replace(/\D/g, "");

    if (cnpj.length === 14) {
        input.value = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    } else {
        input.value = cnpj;
    }
}

function limparCNPJ() {
    var input = document.getElementById("cnpj");
    input.value = "";
    var resultado = document.getElementById("resultadoCNPJ");
    resultado.innerText = "";
}
