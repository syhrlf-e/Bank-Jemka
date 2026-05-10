# Product Requirements Document (PRD)
## Bank Jemka — Sistem Informasi Perbankan
### Mata Kuliah: Basis Data 2

---

## 1. Overview

| Item | Detail |
|---|---|
| **Nama Aplikasi** | Bank Jemka |
| **Deskripsi** | Sistem informasi perbankan berbasis web untuk simulasi operasional bank sederhana, mencakup manajemen nasabah, rekening, transfer antar rekening, dan pelaporan data. |
| **Konteks** | Tugas mata kuliah Basis Data 2 — fokus pada pengolahan data dengan antarmuka pengguna |
| **Target Platform** | Desktop Web Browser |
| **Stack Frontend** | React JSX, Tailwind CSS v4, shadcn/ui, Lucide Icons |
| **Database** | MySQL (via phpMyAdmin / XAMPP / Laragon) |
| **Tipe Pengguna** | User (Nasabah) & Admin |

---

## 2. Design System

### 2.1 Prinsip Desain

Aplikasi Bank Jemka mengadopsi prinsip **"Refined Clarity"** — antarmuka yang bersih, terstruktur, dan dapat dipercaya. Setiap elemen desain mengikuti hukum dan prinsip UI/UX berikut:

| Hukum / Prinsip | Implementasi di Bank Jemka |
|---|---|
| **Hick's Law** | Pilihan dibatasi — landing hanya 2 CTA (Login / Buka Rekening), mencegah cognitive overload |
| **Fitts's Law** | Tombol aksi utama (Transfer, Submit) berukuran besar dan mudah dijangkau |
| **Law of Proximity** | Elemen yang berkaitan dikelompokkan dalam satu card/section |
| **Law of Similarity** | Elemen dengan fungsi sama memiliki tampilan yang seragam (semua input field konsisten) |
| **Miller's Law** | Form panjang dipecah menjadi multi-step (buka rekening: 2 langkah) |
| **Jakob's Law** | Layout mengikuti konvensi banking app yang sudah familiar (saldo di atas, menu di sidebar) |
| **Visual Hierarchy** | Ukuran font, weight, dan warna mencerminkan tingkat kepentingan informasi |
| **Progressive Disclosure** | Informasi ditampilkan bertahap sesuai kebutuhan (detail transaksi on-click) |
| **Feedback Principle** | Setiap aksi user mendapat respons visual (loading state, success/error toast) |
| **Error Prevention** | Validasi realtime di form sebelum submit |

### 2.2 Tipografi

```
Font Family: Satoshi (Variable)
Source: https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap

Display / Heading : Satoshi 700–900
Body / Label      : Satoshi 400–500
Monospace (nomor rekening, saldo) : font-mono (Tailwind built-in)
```

| Role | Size | Weight | Usage |
|---|---|---|---|
| `heading-xl` | 2.25rem (36px) | 900 | Judul halaman utama |
| `heading-lg` | 1.5rem (24px) | 700 | Judul section / card |
| `heading-md` | 1.125rem (18px) | 600 | Sub-judul |
| `body-md` | 0.875rem (14px) | 400 | Teks konten |
| `body-sm` | 0.75rem (12px) | 400 | Label, caption, hint |
| `mono` | 0.875rem (14px) | 500 | Nomor rekening, nominal |

### 2.3 Color Palette

```css
/* Tailwind CSS v4 — @theme block di globals.css */
@theme {
  /* Primary — Smooth Blue */
  --color-primary-50:  #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;  /* Main brand color */
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  /* Neutral — Warm White */
  --color-neutral-0:   #ffffff;
  --color-neutral-50:  #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;

  /* Semantic */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger:  #ef4444;
  --color-info:    #3b82f6;
}
```

| Token | Hex | Penggunaan |
|---|---|---|
| `primary-600` | `#2563eb` | CTA button, active state, link |
| `primary-50` | `#eff6ff` | Background highlight, badge |
| `neutral-0` | `#ffffff` | Background utama |
| `neutral-50` | `#f8fafc` | Background page, sidebar |
| `neutral-100` | `#f1f5f9` | Card background, input bg |
| `neutral-200` | `#e2e8f0` | Border, divider |
| `neutral-500` | `#64748b` | Placeholder, hint text |
| `neutral-800` | `#1e293b` | Body text |
| `neutral-900` | `#0f172a` | Heading text |
| `success` | `#22c55e` | Transaksi masuk, status aktif |
| `danger` | `#ef4444` | Transaksi keluar, status nonaktif, error |

### 2.4 Spacing & Layout

```
Base unit  : 4px
Grid       : 12-column grid
Gutter     : 24px
Max width  : 1280px (dashboard), full-screen (auth)
Border radius:
  - sm  : 6px  (input, badge)
  - md  : 10px (card)
  - lg  : 16px (modal, panel)
  - xl  : 24px (auth panel)
```

### 2.5 Shadow & Elevation

```css
--shadow-xs : 0 1px 2px rgba(0,0,0,0.05);
--shadow-sm : 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
--shadow-md : 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
--shadow-lg : 0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.03);
```

### 2.6 Komponen shadcn/ui yang Digunakan

| Komponen | Halaman |
|---|---|
| `Button` | Semua halaman |
| `Input` | Form auth, form transfer |
| `Label` | Semua form |
| `Card, CardHeader, CardContent` | Dashboard, laporan |
| `Select` | Form transfer (pilih rekening tujuan) |
| `Table, TableHeader, TableRow, TableCell` | CRUD admin, laporan |
| `Badge` | Status rekening, status transaksi |
| `Dialog / Modal` | Konfirmasi transfer, konfirmasi delete |
| `Toast / Sonner` | Notifikasi sukses/error |
| `Separator` | Divider antar section |
| `Avatar` | Info user di navbar |
| `DropdownMenu` | Menu user (logout) |
| `Tabs` | Dashboard admin (navigasi section) |
| `Skeleton` | Loading state |

---

## 3. Struktur Halaman & Routing

```
/                     → Landing Page
/login                → Login User
/register             → Buka Rekening (multi-step)
/dashboard            → Dashboard User (protected)
/dashboard/transfer   → Halaman Transfer (protected)

/admin/login          → Login Admin
/admin/dashboard      → Dashboard Admin (protected)
/admin/users          → CRUD Nasabah
/admin/accounts       → Manajemen Rekening
/admin/transactions   → Riwayat Transaksi (read only)
/admin/transfers      → Riwayat Transfer (read only)
/admin/reports        → Laporan & Statistik
```

---

## 4. Spesifikasi Halaman

---

### 4.1 Landing Page (`/`)

**Layout:** Full screen, centered, vertikal

**Tujuan:** Entry point — user memilih antara Login atau Buka Rekening

**Elemen:**
- Logo + nama "Bank Jemka" di tengah atas
- Tagline singkat (maks 1 baris)
- 2 CTA button:
  - `Login` → Primary button (filled, blue) → navigate ke `/login`
  - `Buka Rekening` → Secondary button (outlined) → navigate ke `/register`
- Background: putih bersih dengan subtle blue gradient di pojok (decorative, tidak mengganggu)
- Footer kecil: copyright

**UX Notes:**
- Hick's Law: hanya 2 pilihan, tidak ada distraksi lain
- Visual hierarchy: logo paling besar, tagline sedang, 2 button sejajar
- Tidak ada navbar

---

### 4.2 Login User (`/login`)

**Layout:** Split screen — kiri panel dekoratif, kanan form

**Panel Kiri (40%):**
- Background: gradient biru (`primary-700` → `primary-500`)
- Logo Bank Jemka (putih)
- Ilustrasi atau pattern geometris halus
- Quote/tagline perbankan
- Warna teks: putih

**Panel Kanan (60%):**
- Background: `neutral-0` (putih)
- Konten: centered secara vertikal
- Judul: "Selamat Datang Kembali"
- Sub-judul: "Masuk ke akun Bank Jemka Anda"
- Form:
  - Input: Username
  - Input: Password (dengan toggle show/hide — icon `Eye` / `EyeOff` dari Lucide)
  - Button: "Masuk" (full width, primary)
- Link: "Belum punya akun? Buka Rekening" → `/register`
- Validasi:
  - Username: required, min 3 karakter
  - Password: required, min 6 karakter
- Error state: inline di bawah input (warna `danger`)

**UX Notes:**
- Fitts's Law: button login full-width, mudah diklik
- Feedback: button berubah ke loading state saat submit
- Error Prevention: disable button jika form belum valid

---

### 4.3 Buka Rekening (`/register`)

**Layout:** Split screen — kiri panel dekoratif, kanan form multi-step

**Panel Kiri (40%):** Sama dengan halaman login (konsistensi)

**Panel Kanan (60%):**
- Step indicator di atas (2 langkah)
- Judul dinamis sesuai step

**Step 1 — Data Diri:**
- Judul: "Informasi Pribadi"
- Field:
  - Nama Lengkap (text)
  - NIK (number, 16 digit)
  - Tempat Lahir (text)
  - Tanggal Lahir (date picker)
  - Email (email)
  - No. Telepon (tel, format Indonesia)
- Button: "Lanjutkan →"

**Step 2 — Setup Akun:**
- Judul: "Buat Akun Login"
- Field:
  - Username (text, min 3 karakter, no spasi)
  - Password (password + toggle show/hide)
  - Konfirmasi Password
- Button: "Buat Rekening" (primary)
- Link back: "← Kembali"

**Setelah Submit Berhasil:**
- Tampilkan success state: nomor rekening yang di-generate
- Button: "Login Sekarang" → redirect ke `/login`

**UX Notes:**
- Miller's Law: form dipecah 2 step, tidak overwhelming
- Progress indicator jelas (step 1 dari 2)
- Validasi per-field realtime (on blur)
- NIK: format mask 16 digit, hanya angka

---

### 4.4 Dashboard User (`/dashboard`)

**Layout:** Sidebar kiri + main content kanan

**Sidebar:**
- Logo Bank Jemka (atas)
- Menu navigasi:
  - `LayoutDashboard` — Dashboard (active)
  - `ArrowLeftRight` — Transfer
- Bagian bawah: info user (avatar inisial + nama + nomor rekening)
- Tombol logout (`LogOut` icon)
- Background: `neutral-50`, border kanan `neutral-200`

**Main Content:**

**Header:**
- Greeting: "Selamat datang, [Nama]!" 
- Tanggal hari ini

**Section 1 — Kartu Saldo:**
- Card dengan background gradient biru (`primary-600` → `primary-800`)
- Konten:
  - Label: "Saldo Rekening"
  - Nominal saldo (font mono, ukuran besar, bold, warna putih)
  - Nomor rekening (mono, putih semi-transparent)
  - Tipe rekening: "Tabungan" (badge)
- Toggle show/hide saldo (`Eye` icon, putih)

**Section 2 — Quick Action:**
- 1 tombol besar: "Transfer" (`Send` icon)
- Style: outlined atau secondary, lebar penuh atau card kecil

**Section 3 — Riwayat Transaksi:**
- Judul: "Riwayat Transaksi"
- List transaksi (terbaru di atas), tiap item:
  - Icon: `ArrowDownLeft` (hijau) untuk masuk, `ArrowUpRight` (merah) untuk keluar
  - Nama/keterangan transaksi
  - Tanggal & waktu
  - Nominal (+ hijau / - merah, font mono)
- Empty state jika belum ada transaksi

**UX Notes:**
- Visual hierarchy: saldo paling dominan (paling besar)
- Warna semantik: hijau = masuk, merah = keluar (Law of Similarity)
- Riwayat transaksi menggunakan infinite scroll atau pagination

---

### 4.5 Halaman Transfer (`/dashboard/transfer`)

**Layout:** Sidebar kiri (sama) + main content (form transfer)

**Konten:**
- Judul: "Transfer Dana"
- Sub-judul: "Kirim uang ke rekening lain"
- Form:
  - **Rekening Tujuan:** Select/Dropdown — tampilkan nama + nomor rekening (dari 5 dummy akun)
  - **Nominal:** Input number (format currency Rupiah, min Rp 1.000)
  - **Keterangan:** Input text optional (description di DB)
- Preview transfer (muncul setelah rekening tujuan & nominal diisi):
  - Dari: nama + nomor rekening user
  - Ke: nama + nomor rekening tujuan
  - Nominal: Rp xxx.xxx
  - Biaya: Rp 0
  - Total: Rp xxx.xxx
- Button: "Konfirmasi Transfer" → buka Modal konfirmasi

**Modal Konfirmasi:**
- Judul: "Konfirmasi Transfer"
- Ringkasan transfer
- Button: "Ya, Transfer" (primary) + "Batal" (ghost)

**Halaman Sukses (atau redirect ke /dashboard dengan toast):**
- Icon centang hijau besar
- Pesan: "Transfer Berhasil!"
- Detail: nominal, ke siapa
- Button: "Kembali ke Dashboard"

**UX Notes:**
- Progressive Disclosure: preview muncul setelah data diisi
- Feedback: loading state saat proses transfer
- Error: saldo tidak cukup → inline error message merah
- Format Rupiah: gunakan `Intl.NumberFormat('id-ID')`

---

### 4.6 Login Admin (`/admin/login`)

**Layout:** Centered card, background `neutral-50`

**Berbeda dari login user** — lebih simpel, tidak split screen

**Konten:**
- Badge: "Admin Panel"
- Logo Bank Jemka
- Judul: "Masuk sebagai Administrator"
- Form:
  - Username
  - Password (toggle show/hide)
  - Button: "Masuk ke Panel Admin"
- Tidak ada link ke register (admin tidak bisa daftar sendiri)

---

### 4.7 Dashboard Admin (`/admin/dashboard`)

**Layout:** Sidebar kiri + main content

**Sidebar Admin:**
- Logo + label "Admin Panel"
- Menu:
  - `LayoutDashboard` — Dashboard
  - `Users` — Kelola Nasabah
  - `CreditCard` — Kelola Rekening
  - `ArrowLeftRight` — Riwayat Transfer
  - `Receipt` — Riwayat Transaksi
  - `BarChart3` — Laporan
- Info admin + logout di bawah

**Main Content — Dashboard Admin:**

**Header:** "Dashboard Administrator"

**Section 1 — Stat Cards (4 kartu sejajar):**

| Card | Icon | Data |
|---|---|---|
| Total Nasabah | `Users` | COUNT dari table `users` |
| Rekening Aktif | `CreditCard` | COUNT accounts WHERE status = 'active' |
| Total Saldo | `Banknote` | SUM balance dari table `accounts` |
| Total Transfer | `ArrowLeftRight` | COUNT dari table `transfer` |

Desain stat card: background putih, border `neutral-200`, icon berwarna `primary-600`, angka bold besar.

**Section 2 — Tabel Transaksi Terbaru:**
- 10 transaksi terbaru dari semua akun
- Kolom: No, Nama Nasabah, Tipe, Nominal, Status, Tanggal

**Section 3 — Tabel Transfer Terbaru:**
- 10 transfer terbaru
- Kolom: No, Dari, Ke, Nominal, Status, Tanggal

---

### 4.8 Kelola Nasabah (`/admin/users`)

**Layout:** Sidebar + main content

**Fitur:**
- Tabel daftar nasabah dengan kolom:
  - No, Nama, NIK, Email, No. Telepon, Status KYC, Status User, Aksi
- Search bar (filter by nama / NIK / email)
- Button "Tambah Nasabah" → buka modal form

**Modal Tambah/Edit Nasabah:**
- Field: Nama, NIK, Tempat Lahir, Tanggal Lahir, Email, No. Telepon, Username, Password (hanya saat tambah), Status KYC, Status User

**Aksi per baris:**
- `Pencil` icon → Edit (buka modal edit)
- `Trash2` icon → Delete (buka modal konfirmasi)

**Modal Konfirmasi Delete:**
- "Apakah Anda yakin ingin menghapus nasabah ini?"
- Button: "Ya, Hapus" (danger) + "Batal"

---

### 4.9 Kelola Rekening (`/admin/accounts`)

**Layout:** Sidebar + main content

**Fitur:**
- Tabel daftar rekening dengan kolom:
  - No, Nomor Rekening, Nama Pemilik, Tipe, Saldo, Status, Aksi
- Filter by status (semua / aktif / nonaktif)
- Search by nomor rekening / nama pemilik

**Aksi per baris:**
- Toggle status: `CheckCircle` (aktifkan) / `XCircle` (nonaktifkan)
- Konfirmasi sebelum ubah status

**Tidak ada edit saldo** (sesuai kesepakatan)

---

### 4.10 Riwayat Transfer (`/admin/transfers`)

**Layout:** Sidebar + main content

**Read Only**

**Fitur:**
- Tabel semua transfer dengan kolom:
  - No, Dari (nama + norek), Ke (nama + norek), Nominal, Total, Status, Tanggal
- Filter by tanggal (date range picker)
- Search by nama / nomor rekening

---

### 4.11 Riwayat Transaksi (`/admin/transactions`)

**Layout:** Sidebar + main content

**Read Only**

**Fitur:**
- Tabel semua transaksi dengan kolom:
  - No, Nama Nasabah, Nomor Rekening, Tipe Transaksi, Nominal, Deskripsi, Status, Tanggal
- Filter by tipe (masuk / keluar) dan tanggal

---

### 4.12 Laporan (`/admin/reports`)

**Layout:** Sidebar + main content

**Section 1 — Statistik Ringkasan:**
- Total nasabah terdaftar
- Total rekening aktif vs nonaktif (bisa dalam bentuk visual sederhana)
- Total keseluruhan saldo yang tersimpan
- Total volume transfer (jumlah + nominal)

**Section 2 — Laporan Transfer per Periode:**
- Filter: pilih bulan + tahun
- Tabel: daftar transfer pada periode tersebut
- Summary: total transfer, total nominal

**Section 3 — Laporan Nasabah:**
- Daftar nasabah dengan status rekening dan saldo masing-masing
- Bisa diexport (opsional, nice to have)

---

## 5. Komponen Global

### 5.1 Navbar / Sidebar
- Konsisten di semua halaman dashboard (user & admin)
- Active state menggunakan `primary-600` background dengan teks putih
- Sidebar width: 240px (desktop)

### 5.2 Toast Notification
- Menggunakan `sonner` (shadcn/ui recommended)
- Posisi: top-right
- Durasi: 3 detik
- Tipe: success (hijau), error (merah), info (biru)

### 5.3 Loading State
- Button: spinner icon + disabled state
- Table: Skeleton rows
- Card saldo: Skeleton

### 5.4 Empty State
- Ilustrasi sederhana (icon besar dari Lucide)
- Pesan: "[Nama data] belum tersedia"
- Styling: centered, warna `neutral-400`

### 5.5 Error State
- Form: pesan merah di bawah input
- Page: full-page error dengan tombol retry

---

## 6. Database Reference

Berdasarkan ER Diagram "Bank Jomokerto":

| Table | Keterangan |
|---|---|
| `users` | Data nasabah + kredensial login |
| `accounts` | Rekening nasabah (satu user bisa punya lebih dari 1) |
| `transfer` | Rekaman transfer antar rekening |
| `transaction` | Riwayat semua transaksi (masuk/keluar) |
| `ledger` | Double-entry bookkeeping |
| `auth` | Session token untuk autentikasi |

**Catatan untuk Backend:**
- `account_number` di-generate otomatis saat buka rekening dengan format:
  ```
  69-[random 3 digit: 100–999]-[random 3 digit: 100–999]
  Contoh: 69-232-768
  Kode bank: 69 (tetap)
  Cek duplikat ke DB sebelum disimpan, generate ulang jika sudah ada
  ```
- `account_type` default: `tabungan`
- `balance` default: `0`
- `status_kyc` default: `verified` (auto approve saat register)
- `status_user` default: `active`
- `fee` di table `transfer` default: `0`
- `total_amount` = `amount` + `fee`

**Dummy Accounts (untuk testing & demo):**

| Nama | No. Rekening | Saldo Awal | Status |
|---|---|---|---|
| Rusdi Atmosfir | 69-222-896 | Rp 5.000.000 | active |
| Rehan Tohapok | 69-254-888 | Rp 1.000.000 | active |
| Ujang Wonogiri | 69-333-769 | Rp 50.000 | active |

Dummy accounts ini di-seed langsung ke DB saat setup awal. Akun ini muncul sebagai pilihan tujuan transfer di halaman transfer user.

---

## 7. State Management & Data Flow

```
Auth Flow (User):
  POST /api/login → dapat session_token → simpan di localStorage
  Setiap request berikutnya: header Authorization: Bearer {token}
  Logout: hapus token dari localStorage + invalidate di server

Auth Flow (Admin):
  Sama, tapi endpoint berbeda atau dengan flag role admin

Transfer Flow:
  1. User pilih rekening tujuan + isi nominal
  2. FE hitung total (nominal + fee = 0)
  3. Tampilkan preview
  4. User konfirmasi → POST /api/transfer
  5. Backend: kurangi saldo source, tambah saldo destination, buat record di transfer + transaction + ledger
  6. FE: redirect ke dashboard + toast sukses
```

---

## 8. Folder Structure (React)

```
src/
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/
│   │   ├── UserSidebar.jsx
│   │   ├── AdminSidebar.jsx
│   │   └── AuthLayout.jsx    # split screen layout
│   └── shared/
│       ├── StatCard.jsx
│       ├── TransactionItem.jsx
│       ├── EmptyState.jsx
│       └── LoadingSkeleton.jsx
├── pages/
│   ├── Landing.jsx
│   ├── auth/
│   │   ├── UserLogin.jsx
│   │   ├── Register.jsx
│   │   └── AdminLogin.jsx
│   ├── user/
│   │   ├── Dashboard.jsx
│   │   └── Transfer.jsx
│   └── admin/
│       ├── Dashboard.jsx
│       ├── Users.jsx
│       ├── Accounts.jsx
│       ├── Transfers.jsx
│       ├── Transactions.jsx
│       └── Reports.jsx
├── hooks/
│   ├── useAuth.js
│   └── useTransfer.js
├── lib/
│   ├── api.js            # axios instance + interceptors
│   ├── utils.js          # formatRupiah, formatDate, dll
│   └── constants.js
├── styles/
│   └── globals.css       # Tailwind v4 @theme block
└── App.jsx               # routing
```

---

## 9. Konvensi Kode

- **Naming:** snake_case untuk variabel yang mapping ke DB, camelCase untuk variabel JS/React
- **API response mapping:** konversi dari snake_case (DB) ke camelCase (FE) di layer `api.js`
- **Format Rupiah:** `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })`
- **Format Tanggal:** `Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' })`
- **Semua icon:** dari `lucide-react`
- **Semua UI component:** dari `@/components/ui` (shadcn)

---

## 10. Checklist Development

### Phase 1 — Auth & Landing
- [ ] Landing Page
- [ ] Login User (split screen)
- [ ] Register / Buka Rekening (multi-step, split screen)
- [ ] Login Admin

### Phase 2 — User Dashboard
- [ ] Layout sidebar user
- [ ] Dashboard user (saldo card + riwayat transaksi)
- [ ] Halaman Transfer + modal konfirmasi

### Phase 3 — Admin Dashboard
- [ ] Layout sidebar admin
- [ ] Dashboard admin (stat cards + tabel terbaru)
- [ ] CRUD Nasabah
- [ ] Kelola Rekening (toggle status)
- [ ] Riwayat Transfer (read only)
- [ ] Riwayat Transaksi (read only)
- [ ] Laporan

### Phase 4 — Polish
- [ ] Loading states (skeleton)
- [ ] Empty states
- [ ] Toast notifications
- [ ] Validasi form lengkap
- [ ] Error handling
- [ ] Responsive fine-tuning (desktop only)

---

*Dokumen ini dibuat sebagai acuan pengembangan frontend Bank Jemka untuk mata kuliah Basis Data 2.*
*Versi: 1.0 | Dibuat dengan diskusi bersama.*
