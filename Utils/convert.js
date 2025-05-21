// Converte um arquivo de imagem (File) em Base64
export function imagemParaBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // string base64
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsDataURL(file); // lê como base64
  });
}

// Converte uma string Base64 em um elemento de imagem (ou File se necessário)
export function base64ParaImagem(base64, nomeArquivo = 'imagem.png') {
  // Cria um elemento de imagem para exibir (caso queira mostrar no HTML)
  const img = document.createElement('img');
  img.src = base64;

  // Alternativamente, retornar como objeto File (opcional)
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const file = new File([u8arr], nomeArquivo, { type: mime });

  return {
    elementoImagem: img, // para usar em HTML
    arquivo: file        // para upload ou download
  };
}
