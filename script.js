document.getElementById("generate-button").addEventListener("click", function () {


  var title = document.getElementById("title").value;
  var managementNumber = document.getElementById("management-number").value;
  var manager = document.getElementById("manager").value;
  var storageLocation = document.getElementById("storage-location").value;
  var notes = document.getElementById("notes").value;

  var qrData =
    title + "\n" +
    "管理番号：" + managementNumber + "\n" +
    "管理者：" + manager + "\n" +
    "保管場所：" + storageLocation + "\n" +
    "特記事項：" + notes;

  var qrArea = document.getElementById("qrcode");
  qrArea.innerHTML = "";


  document.querySelector(".qr-title").textContent = title;

  new QRCode(qrArea, {
    text: qrData,
    width: 160,
    height: 160,
    typeNumber: 3,
    correctLevel: QRCode.CorrectLevel.M
  });

});

document.getElementById("save-button").addEventListener("click", function () {

  var qrArea = document.getElementById("qrcode");
  var canvas = qrArea.querySelector("canvas");

  if (!canvas) {
    alert("先にQRコードを生成してください");
    return;
  }

  var title = document.getElementById("title").value;

  var saveCanvas = document.createElement("canvas");
  var ctx = saveCanvas.getContext("2d");

  saveCanvas.width = 200;
  saveCanvas.height = 240;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, saveCanvas.width, saveCanvas.height);

  ctx.fillStyle = "#000000";
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "center";

  var titleLines = [];

  if (title.length >= 10) {
    for (var i = 0; i < title.length; i += 10) {
      titleLines.push(title.substring(i, i + 10));
    }
  } else {
    titleLines.push(title);
  }

  for (var i = 0; i < titleLines.length; i++) {
    ctx.fillText(titleLines[i], 100, 25 + i * 22);
  }

  var qrY = titleLines.length === 1 ? 35 : 57;

  ctx.drawImage(canvas, 20, qrY, 160, 160);

  var link = document.createElement("a");
  link.download = (title || "QRコード") + ".png";
  link.href = saveCanvas.toDataURL("image/png");
  link.click();

});