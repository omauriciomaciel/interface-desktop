const appContent = document.getElementById('app-content');
const inputNumber = document.getElementById('inputNumber');
const inputFile = document.getElementById('inputFile');

// Função para interagir com a função Python para fazer o upload do arquivo
async function handleUpload() {
  const numberValue = inputNumber.value;
  if (!numberValue) {
    alert('Por favor, insira um número.');
    return;
  }

  if (!inputFile.files.length) {
    alert('Por favor, selecione um arquivo .xlsx para fazer upload.');
    return;
  }

  const file = inputFile.files[0];
  const response = await eel.upload_file(numberValue, file.name, file.data)();
  appContent.innerHTML = `<p>${response}</p>`;
}

// Função para interagir com a função Python para fazer o download do arquivo modificado
async function handleDownload() {
  const numberValue = inputNumber.value;
  if (!numberValue) {
    alert('Por favor, insira um número.');
    return;
  }

  const response = await eel.download_modified_file(numberValue)();
  const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `arquivo_modificado.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
}
