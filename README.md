# Request Desain · InfoKom HMDTIF

Aplikasi **HTML + CSS + JavaScript murni** (tanpa React, tanpa TypeScript, tanpa framework, tanpa build step).

## Struktur file

```
index.html    → kerangka halaman
styles.css    → seluruh styling & layout
app.js        → data, state, tampilan, dan interaksi
assets/       → gambar, ikon, dan favicon
vercel.json   → konfigurasi deploy statis
```

## Menjalankan

Cukup buka `index.html` lewat Live Server di VS Code, atau:

```sh
python3 -m http.server 8443
```

lalu buka http://localhost:8443

Tidak perlu `npm install`.

## Deploy

```sh
npx vercel --prod --yes
```

URL produksi: https://imk-hmdtif.vercel.app

## Fitur

- Pilih peran (Pengaju / Humas / MedKraf) dan login
- Ajukan request desain dengan validasi field wajib
- Panduan pengajuan & riwayat request terakhir
- Tinjau & revisi desain dengan kuota revisi
- Status & riwayat publikasi (stepper 8 tahap)
- Kelola pengajuan Humas: filter, terima/tolak, tugaskan PIC, cek bahasa, unggah
- Tugas MedKraf dengan validasi tautan Figma
- Notifikasi dan modal konfirmasi
- Validasi link: Figma → `figma.com`, unggahan → `instagram.com`
- Desain responsif (desktop, tablet, mobile)
