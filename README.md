<div align="center">
  <img src="public/logo-nama.png" alt="Bank Jemka Logo" width="250" />
  
  # Bank Jemka
  
  **Sistem Informasi Perbankan Modern Berbasis Web**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
</div>

<br />

## 📖 Deskripsi Proyek

**Bank Jemka** adalah purwarupa (prototype) antarmuka sistem perbankan yang dikembangkan sebagai tugas mata kuliah **Basis Data 2**. Aplikasi ini mensimulasikan antarmuka modern, aman, dan responsif untuk kebutuhan perbankan pengguna maupun administrator.

Aplikasi ini dibagi menjadi 4 fase utama pengembangan UI:
1. **Auth & Landing Page**: Halaman muka yang elegan, serta sistem Multi-step form untuk pendaftaran nasabah baru.
2. **User Dashboard (Mobile/Island UI)**: Antarmuka nasabah yang didesain secara sentris layaknya aplikasi mobile/Android dengan *Bottom Navigation Bar*. Mencakup informasi saldo, form transfer dana dengan *preview & konfirmasi*, serta riwayat transaksi.
3. **Admin Dashboard**: Panel kontrol komprehensif bagi administrator dengan sidebar untuk mengelola data Nasabah, Rekening, dan memantau seluruh log Transaksi & Transfer.
4. **Polish**: Penyempurnaan UX melalui validasi formulir dan *Toast Notifications* menggunakan `sonner`.

---

## ✨ Fitur Utama

### 🧑‍💼 Modul Nasabah (User)
- **Landing Page** informatif.
- **Registrasi Multi-step** dengan validasi input (NIK angka max 16 digit, Nama huruf saja, dll).
- **Mobile-centric Dashboard** (Island UI) yang berfokus pada kenyamanan layar kecil maupun besar.
- **Sistem Transfer Dana** dilengkapi fitur *Preview Card* dan validasi nominal minimum.
- **Riwayat Transaksi** mutasi rekening.
- Tampilan sensor saldo dinamis.

### 🛡️ Modul Administrator
- **Dashboard Analitik** merangkum total nasabah, rekening, saldo global, dan volume transfer.
- **Manajemen Nasabah (CRUD)** untuk mendata informasi pribadi.
- **Manajemen Rekening** untuk mengaktifkan/menonaktifkan akun.
- **Log Riwayat Transaksi & Transfer** global.
- **Laporan Statistik** sederhana.

---

## 🚀 Teknologi yang Digunakan

- **Framework**: [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (dibangun di atas [Radix UI](https://www.radix-ui.com/))
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Routing**: [React Router v6](https://reactrouter.com/)

---

## 📦 Cara Instalasi & Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer Anda secara lokal:

1. **Clone repository ini**
   ```bash
   git clone https://github.com/syhrlf-e/Bank-Jemka.git
   cd Bank-Jemka
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Jalankan *Development Server***
   ```bash
   npm run dev
   ```

4. **Buka di Browser**
   Buka URL `http://localhost:5173` di browser Anda.

---

<div align="center">
  <i>Dibuat untuk memenuhi tugas mata kuliah Basis Data 2.</i>
</div>
