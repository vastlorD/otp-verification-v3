# OTP Verification V3

Protótipo front-end de uma tela de verificação OTP inspirado na referência visual enviada.

## Como testar no PC

### Opção 1 — direto no navegador
1. Extraia o ZIP.
2. Abra a pasta `otp-verification-v3`.
3. Dê dois cliques em `index.html`.
4. Digite `4719`.
5. Clique em **Verificar código**.

### Opção 2 — VS Code + Live Server
1. Abra a pasta no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html`.
4. Escolha **Open with Live Server**.
5. O projeto abrirá em `http://127.0.0.1:5500/` ou endereço parecido.

## Arquivos
- `index.html` — estrutura.
- `style.css` — aparência e responsividade.
- `app.js` — comportamento do OTP.

## Recursos
- Digitação automática entre campos.
- Backspace volta para o campo anterior.
- Colar um código completo distribui os dígitos.
- Botão **Preencher** usa o código de demonstração `4719`.
- Validação visual de sucesso e erro.
- Layout responsivo para PC e celular.

> Este projeto é apenas um protótipo visual/front-end. O código OTP é local e fixo para demonstração.
