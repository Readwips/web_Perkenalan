# Web Perkenalan — Setyo Agung Prabowo

Portofolio pribadi berbentuk dashboard untuk memperkenalkan profil, proyek, kemampuan SQL, perjalanan belajar, dan informasi kontak Setyo Agung Prabowo.

## Demo

[Buka portofolio di GitHub Pages](https://readwips.github.io/web_Perkenalan/)

## Fitur

- Overview profil dan ketersediaan kerja
- Daftar proyek beserta tautan repository dan demo
- SQL Lab dengan contoh skema dan query
- Learning Journey dari SD hingga pembelajaran saat ini
- Profil, kontak, foto, dan CV yang dapat diunduh
- Tampilan responsif untuk desktop, tablet, dan ponsel

## Teknologi

- Next.js 16
- React 19
- TypeScript
- CSS responsif
- GitHub Actions dan GitHub Pages

## Menjalankan secara lokal

Gunakan Node.js `22.13.0` atau versi yang lebih baru.

```bash
npm ci
npm run dev
```

Kemudian buka `http://localhost:3000`.

## Build

Build utama:

```bash
npm run build
```

Build statis untuk GitHub Pages:

```bash
npm run build:github
```

Setiap perubahan yang didorong ke branch `main` akan dibangun dan diterbitkan otomatis melalui workflow GitHub Pages.
