# Aplikasi Data Siswa

Aplikasi frontend untuk menampilkan dan mengelola data siswa. Dibuat dengan React dan Vite.

## Persyaratan

- Node.js dan npm
- Backend API yang berjalan di `http://localhost:5000`

## Menjalankan aplikasi

Buka PowerShell di folder project utama (`C:\pelatihan frontend`), bukan di folder `frontend` di dalamnya, lalu jalankan:

```powershell
npm install
npm run dev
```

Buka URL yang ditampilkan Vite di terminal, biasanya `http://localhost:5173`.

## Backend API

Frontend mengakses endpoint `http://localhost:5000/api/siswa` untuk membaca, menambah, mengubah, dan menghapus data siswa. Pastikan backend sudah berjalan dan mengizinkan request dari frontend (CORS).

Jika alamat backend berbeda, ubah konstanta `API` di `src/app.jsx`.

## Build

Untuk membuat build produksi:

```powershell
npm run build
```

Hasil build tersedia di folder `dist`.
