const container = document.createElement('div');
document.body.appendChild(container);

const qrcode = new QRCode(container, {
    text: "https://github.com/luanaelverdi/TPInicialLabo",
    width: 256,
    height: 256,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});