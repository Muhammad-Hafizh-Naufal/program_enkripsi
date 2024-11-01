// 1. Enkripsi Substitusi (Caesar Cipher)
function caesarCipher(text, shift) {
  shift = shift % 26; // Menangani nilai shift besar atau negatif
  return text
    .split("")
    .map((char) => {
      // Handle huruf saja
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const baseCharCode = isUpperCase ? 65 : 97;

        // Rumus: (posisi huruf + geseran) mod 26
        return String.fromCharCode(
          ((code - baseCharCode + shift + 26) % 26) + baseCharCode
        );
      }
      return char;
    })
    .join("");
}

// 2. Enkripsi Blocking (Membagi teks jadi blok-blok)
function blockCipher(text, blockSize = 4) {
  // Hapus spasi dan ubah ke huruf besar
  const cleanText = text.toUpperCase().replace(/\s/g, "");

  // Tambah padding 'X' jika perlu
  const padded =
    cleanText +
    "X".repeat((blockSize - (cleanText.length % blockSize)) % blockSize);

  // Bagi jadi blok-blok
  const blocks = [];
  for (let i = 0; i < padded.length; i += blockSize) {
    blocks.push(padded.slice(i, i + blockSize));
  }

  return blocks.join(" ");
}

// 3. Enkripsi Permutasi Sederhana
function permutationCipher(text, key = [2, 0, 1, 3]) {
  // Hapus spasi dan tambah padding
  const cleanText = text.replace(/\s/g, "");
  const padding = "X".repeat(
    (key.length - (cleanText.length % key.length)) % key.length
  );
  const paddedText = cleanText + padding;

  let result = "";

  // Proses per blok sesuai panjang kunci
  for (let i = 0; i < paddedText.length; i += key.length) {
    const block = paddedText.slice(i, i + key.length);
    // Terapkan permutasi
    let permuted = "";
    for (let j = 0; j < key.length; j++) {
      permuted += block[key[j]] || "X"; // Tambah fallback 'X'
    }
    result += permuted + " ";
  }

  return result.trim();
}

// Contoh penggunaan:
const pesan = "Halo Dunia";

console.log("=== Hasil Enkripsi ===");
console.log("Original  :", pesan);
console.log("Substitusi:", caesarCipher(pesan, 3));
console.log("Blocking  :", blockCipher(pesan));
console.log("Permutasi :", permutationCipher(pesan));
