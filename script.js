// ========== THEME TOGGLE ==========
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  const body = document.body;
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") body.classList.add("light-mode");

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
  });
}

// ========== DATA BUDAYA ==========
const dataBudaya = [
  {
    nama: "Tari Kecak",
    asal: "Bali",
    kategori: "Tari Tradisional",
    deskripsi: "Tari Kecak terkenal karena pertunjukannya yang dramatis dengan nyanyian 'cak' dari puluhan penari pria.",
    gambar: "images/tarikecak.jpg"
  },
  {
    nama: "Angklung",
    asal: "Jawa Barat",
    kategori: "Alat Musik Tradisional",
    deskripsi: "Angklung terbuat dari bambu dan dimainkan dengan cara digoyangkan menghasilkan harmoni indah.",
    gambar: "images/angklung.jpg"
  },
  {
    nama: "Wayang Kulit",
    asal: "Jawa Tengah",
    kategori: "Seni Pertunjukan",
    deskripsi: "Seni teater bayangan khas Jawa yang menceritakan kisah epik Mahabharata dan Ramayana.",
    gambar: "images/wayangkulit.jpg"
  },
  {
    nama: "Tenun Ikat",
    asal: "Nusa Tenggara Timur",
    kategori: "Kain Tradisional",
    deskripsi: "Kain tradisional yang dibuat dengan teknik mengikat dan mewarnai benang sebelum ditenun.",
    gambar: "images/tenunikat.jpg"
  },
  {
    nama: "Rumah Gadang",
    asal: "Sumatera Barat",
    kategori: "Arsitektur Tradisional",
    deskripsi: "Rumah adat Minangkabau dengan atap bergonjong menyerupai tanduk kerbau.",
    gambar: "images/rumahgadang.jpg"
  }
];

// ========== RENDER BUDAYA (Culture Page) ==========
const list = document.getElementById("culture-list");

if (list) {
  function tampilkanBudaya(data) {
    list.innerHTML = "";
    data.forEach((b) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${b.gambar}" alt="${b.nama}">
        <div class="info">
          <h3>${b.nama}</h3>
          <p><strong>Asal:</strong> ${b.asal}</p>
          <p><strong>Kategori:</strong> ${b.kategori}</p>
          <p>${b.deskripsi}</p>
          <br>
          <button class="btn" data-nama="${b.nama}">Lihat Lebih Lengkap</button>
        </div>
      `;
      list.appendChild(card);
    });

    // Tambahkan event ke setiap tombol "Lihat Detail"
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const nama = btn.getAttribute("data-nama");
        // encode untuk URL aman
        window.location.href = `detail.html?nama=${encodeURIComponent(nama)}`;
      });
    });
  }

  tampilkanBudaya(dataBudaya);

  // Fitur pencarian
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const hasil = dataBudaya.filter((b) =>
      b.nama.toLowerCase().includes(keyword) ||
      b.asal.toLowerCase().includes(keyword) ||
      b.kategori.toLowerCase().includes(keyword)
    );
    tampilkanBudaya(hasil);
  });
}

// ========== DETAIL PAGE ==========
const detailContainer = document.getElementById("detail-container");

if (detailContainer) {
  // Ambil parameter dari URL
  const params = new URLSearchParams(window.location.search);
  const namaBudaya = params.get("nama");

  if (namaBudaya) {
    const budaya = dataBudaya.find(b => b.nama === namaBudaya);
    if (budaya) {
  detailContainer.innerHTML = `
    <div class="detail-page">
      <h2>${budaya.nama}</h2>
      <img src="${budaya.gambar}" alt="${budaya.nama}" class="detail-img">
      <p><b>Asal:</b> ${budaya.asal}</p>
      <p><b>Kategori:</b> ${budaya.kategori}</p>
      <p>${budaya.deskripsi}</p>
      <br>
      <a href="culture.html" class="btn">← Kembali</a>
    </div>
  `;
    } else {
      detailContainer.innerHTML = `<p>Budaya tidak ditemukan.</p>`;
    }
  } else {
    detailContainer.innerHTML = `<p>Tidak ada budaya yang dipilih.</p>`;
  }
}


