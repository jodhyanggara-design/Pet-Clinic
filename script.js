let currentTab = 1;
const dataRekamMedik = []; // Array untuk menyimpan semua data rekam medik

// Fungsi untuk menampilkan tab tertentu
function showTab(n) {
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
    tabs[n - 1].style.display = "block";
    updateProgressBar(n);
    currentTab = n;
}

// Fungsi untuk memperbarui progress bar
function updateProgressBar(n) {
    const steps = document.getElementsByClassName("step");
    for (let i = 0; i < steps.length; i++) {
        steps[i].className = steps[i].className.replace(" active", "");
    }
    document.getElementById(`step${n}`).className += " active";
}

// Handler untuk Login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('login-message');

    if (username === 'admin' && password === 'kliniket') {
        message.textContent = "";
        // Pindah dari Tab 1 (Login) ke Tab 2 (Halaman 1)
        nextTab(1, 2); 
    } else {
        message.textContent = "Username atau Password salah!";
    }
});

// Handler untuk pindah ke tab berikutnya
function nextTab(current, next) {
    // Validasi sederhana dapat ditambahkan di sini sebelum pindah tab
    if (current === 2) {
        // Ambil data dari Halaman 1 dan isi ke Halaman 2 (kolom disabled)
        const namaHewan = document.getElementById('nama_hewan_1').value;
        const jenisHewan = document.getElementById('jenis_hewan_1').value;

        document.getElementById('nama_hewan_2').value = namaHewan;
        document.getElementById('jenis_hewan_2').value = jenisHewan;
    }
    showTab(next);
}

// Handler untuk pindah ke tab sebelumnya
function prevTab(current, prev) {
    showTab(prev);
}

// Handler untuk Selesaikan & Rekap (Tab 3 Submit)
document.getElementById('form-halaman2').addEventListener('submit', function(e) {
    e.preventDefault();
    collectDataAndDisplay();
    // Pindah ke Tab 4 (Rekap Data)
    showTab(4); 
});

// FUNGSI INI ADALAH PERBAIKAN UTAMA: Mengumpulkan semua data dan menampilkannya di tabel
function collectDataAndDisplay() {
    // 1. Ambil data Halaman 1
    const dataHalaman1 = {
        nama_pemilik: document.getElementById('nama_pemilik').value,
        telepon: document.getElementById('telepon').value,
        alamat: document.getElementById('alamat').value,
        nama_hewan: document.getElementById('nama_hewan_1').value,
        jenis_hewan: document.getElementById('jenis_hewan_1').value,
    };

    // 2. Ambil data Halaman 2
    const dataHalaman2 = {
        tanggal: document.getElementById('tanggal').value,
        ras_hewan: document.getElementById('ras_hewan').value,
        jenis_kelamin: document.getElementById('jenis_kelamin').value,
        umur: document.getElementById('umur').value,
        berat_badan: document.getElementById('berat_badan').value, // ambil angka saja
        anamnesa: document.getElementById('anamnesa').value,
        hr: document.getElementById('hr').value,
        rr: document.getElementById('rr').value,
        suhu: document.getElementById('suhu').value, // ambil angka saja
        crt: document.getElementById('crt').value,
        mukosa: document.getElementById('mukosa').value,
        turgor: document.getElementById('turgor').value,
        tanda_klinis: document.getElementById('tanda_klinis').value,
        diagnosa: document.getElementById('diagnosa').value,
        terapi: document.getElementById('terapi').value,
    };

    // Gabungkan data
    const rekamMedikBaru = { ...dataHalaman1, ...dataHalaman2 };
    dataRekamMedik.push(rekamMedikBaru);

    // 3. Tampilkan di tabel
    const tableBody = document.querySelector('#rekam-medik-table tbody');
    const data = rekamMedikBaru;

    const newRow = tableBody.insertRow();
    
    // **Memasukkan SEMUA DATA ke kolom yang sesuai (sesuai header baru di HTML)**
    newRow.innerHTML = `
        <td>${data.tanggal}</td>
        <td>${data.nama_pemilik}</td>
        <td>${data.telepon}</td>
        <td>${data.alamat}</td>
        <td>${data.nama_hewan}</td>
        <td>${data.jenis_hewan} / ${data.ras_hewan}</td>
        <td>${data.jenis_kelamin} / ${data.umur}</td>
        <td>${data.berat_badan} kg / ${data.suhu} °C</td>
        <td>HR: ${data.hr} / RR: ${data.rr} / CRT: ${data.crt}</td>
        <td>${data.mukosa} / ${data.turgor}</td>
        <td>${data.anamnesa}</td>
        <td>${data.tanda_klinis}</td>
        <td>${data.diagnosa}</td>
        <td>${data.terapi}</td>
    `;
}

// Fungsi untuk mereset formulir dan kembali ke Tab 2
function resetForm() {
    document.getElementById('form-halaman1').reset();
    document.getElementById('form-halaman2').reset();
    showTab(2); // Kembali ke halaman pengisian pertama
}

// Inisialisasi: Tampilkan Tab Login saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    showTab(1);
});