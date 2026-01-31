# Nutapos Frontend Challenge

Proyek ini adalah implementasi frontend untuk manajemen diskon dengan fitur konfigurasi API yang fleksibel (Demo vs Custom).

## 🛠️ Teknologi yang Digunakan

Berikut adalah tech stack dan library utama yang digunakan dalam proyek ini:

- **Framework Utama**: [Vue 3](https://vuejs.org/) (Composition API via `<script setup>`)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first CSS framework)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Icons**: [Iconify](https://iconify.design/) (`@iconify/vue`) - Menggunakan Material Symbols.
- **State Management**: Reactivity API (ref, reactive, computed) dari Vue core.

## 🗺️ Sitemap

Struktur navigasi aplikasi digambarkan dalam diagram berikut:

```mermaid
graph TD
    A[Dashboard] --> B{Items}
    B --> B1[Produk]
    B --> B2[Kategori]
    B --> B3[Bahan]
    B --> B4[Paket]
    B --> B5[Pilihan Ekstra]
    B --> B6[Diskon]
    B --> B7[Pajak]
    B --> B8[Tipe Penjualan]
    B --> B9[Ketersediaan Produk]
    
    A --> C[Riwayat Penjualan]
    A --> D[Outlet]
    A --> E{Pelanggan}
    E --> E1[Daftar Pelanggan]
    E --> E2[Loyalty]
    E --> E3[Riwayat Poin]
    
    A --> F[Pelayan]
    A --> G[Promo]
    A --> H{SDM}
    H --> H1[Karyawan]
    H --> H2[Jabatan]
    H --> H3[Absensi]
    
    A --> I{Stok}
    I --> I1[Supplier]
    I --> I2[Pembelian]
    
    A --> J{Uang}
    J --> J1[Rekening]
    
    A --> K{Integrasi}
    
    A --> L{Laporan}
    L --> L1[Laporan Penjualan]
    
    style A fill:#f9f9f9,stroke:#333,stroke-width:2px
    style B6 fill:#d1fae5,stroke:#10b981,stroke-width:2px
```

*Catatan: Halaman yang aktif dan berfungsi penuh saat ini adalah **Diskon**. Halaman lain menggunakan `GenericView` sebagai placeholder (Coming Soon).*

## 🔌 Alur Konfigurasi API

Aplikasi ini mendukung dua mode API yang disimpan pengaturannya di `localStorage` browser. Ini memungkinkan user untuk berpindah antara data Demo dan data Custom mereka sendiri.

```mermaid
sequenceDiagram
    participant User
    participant App
    participant LocalStorage
    participant API Service
    
    User->>App: Buka Halaman Diskon
    App->>LocalStorage: Cek 'api_config_source'
    
    alt Config belum ada (First Time)
        App->>User: Tampilkan Modal "Konfigurasi API" (Force)
        User->>App: Pilih "Demo" atau "Custom"
        
        opt Pilih Custom
            User->>App: Input URL Endpoint
        end
        
        App->>LocalStorage: Simpan 'api_config_source' & 'custom_api_url'
        App->>API Service: Set Base URL sesuai pilihan
    else Config sudah ada
        App->>LocalStorage: Ambil config
        App->>API Service: Set Base URL
    end
    
    App->>API Service: GET /discounts
    API Service-->>App: Return Data Diskon
    App-->>User: Tampilkan Tabel Diskon
    
    note over User, App: User dapat mereset config kapan saja via Dropdown Header
```

### Penjelasan Logic API

1.  **LocalStorage Keys**:
    *   `api_config_source`: Bernilai `'default'` (Demo) atau `'custom'`.
    *   `custom_api_url`: Menyimpan URL endpoint CrudCrud milik user jika memilih custom.

2.  **Service (`api.js`)**:
    *   Secara dinamis menentukan `BASE_URL` berdasarkan nilai di LocalStorage setiap kali request dibuat.
    *   Endpoint Demo diambil dari `.env` (`VITE_API_BASE_URL`).

## 🚀 Cara Menjalankan Project

### Prasyarat
*   Node.js (v18+)
*   NPM

### Setup
1.  Install dependencies:
    ```sh
    npm install
    ```

2.  Jalankan development server:
    ```sh
    npm run dev
    ```

3.  Build untuk production:
    ```sh
    npm run build
    ```

## 📁 Struktur Project Utama

*   `src/components/items/discounts/`: Komponen spesifik fitur Diskon (Table, Header, Modal, Pagination).
*   `src/views/items/DiskonView.vue`: Halaman utama Diskon (Logic Controller).
*   `src/services/api.js`: Centralized API service wrapper (Axios).
*   `src/views/GenericView.vue`: Halaman 404/Coming Soon yang dinamis.
