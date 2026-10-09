const inputs = [...document.querySelectorAll(".otp-input")];
const form = document.getElementById("otpForm");
const fillBtn = document.getElementById("fillBtn");
const statusBox = document.getElementById("status");

const DEMO_CODE = "4719";

function updateActive() {
  inputs.forEach((input) => input.classList.remove("active"));
  const focused = document.activeElement;
  if (inputs.includes(focused)) focused.classList.add("active");
}

function setStatus(message = "", type = "") {
  statusBox.textContent = message;
  statusBox.className = "status" + (type ? ` ${type}` : "");
}

function clearValidation() {
  inputs.forEach((input) => input.classList.remove("valid", "invalid"));
}

function fillCode(code) {
  const digits = String(code).replace(/\D/g, "").slice(0, inputs.length);

  inputs.forEach((input, index) => {
    input.value = digits[index] || "";
    input.classList.remove("just-filled");
    if (digits[index]) {
      requestAnimationFrame(() => input.classList.add("just-filled"));
    }
  });

  clearValidation();
  setStatus();

  const nextIndex = Math.min(digits.length, inputs.length - 1);
  inputs[nextIndex].focus();
}

inputs.forEach((input, index) => {
  input.addEventListener("focus", updateActive);
  input.addEventListener("blur", updateActive);

  input.addEventListener("input", (event) => {
    const digit = event.target.value.replace(/\D/g, "").slice(-1);
    event.target.value = digit;
    clearValidation();
    setStatus();

    if (digit && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      inputs[index - 1].focus();
      inputs[index - 1].value = "";
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputs[index - 1].focus();
    }

    if (event.key === "ArrowRight" && index < inputs.length - 1) {
      event.preventDefault();
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("paste", (event) => {
    const pasted = (event.clipboardData || window.clipboardData).getData("text");
    const digits = pasted.replace(/\D/g, "");

    if (digits.length >= 2) {
      event.preventDefault();
      fillCode(digits);
    }
  });
});

fillBtn.addEventListener("click", () => {
  fillCode(DEMO_CODE);
  setStatus("Código preenchido automaticamente.", "");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const code = inputs.map((input) => input.value).join("");

  clearValidation();

  if (code.length !== inputs.length) {
    inputs.forEach((input) => {
      if (!input.value) input.classList.add("invalid");
    });
    setStatus("Digite os 4 dígitos.", "error");
    return;
  }

  if (code === DEMO_CODE) {
    inputs.forEach((input) => input.classList.add("valid"));
    setStatus("Código confirmado com sucesso ✓", "ok");
  } else {
    inputs.forEach((input) => input.classList.add("invalid"));
    setStatus("Código incorreto. Para o teste, use 4719.", "error");
  }
});

window.addEventListener("load", () => inputs[0].focus());
