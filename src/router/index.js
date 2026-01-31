import { createRouter, createWebHistory } from 'vue-router'
import GenericView from '../views/GenericView.vue'
import DiskonView from '../views/items/DiskonView.vue'

import { h } from 'vue'
import { RouterView } from 'vue-router'

// Basic layout wrapper for nested routes to ensure they render
const RouterLayout = { render: () => h(RouterView) }

export const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: { hidden: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: GenericView,
    meta: { 
      icon: 'material-symbols:analytics-outline',
      label: 'Dashboard'
    }
  },
  {
    path: '/items',
    component: RouterLayout,
    meta: { 
      icon: 'material-symbols:sell-outline', 
      label: 'Items', 
      badge: 'baru',
      isOpen: true 
    },
    redirect: '/items/produk',
    children: [
      { path: 'produk', name: 'Produk', component: GenericView },
      { path: 'kategori', name: 'Kategori', component: GenericView },
      { path: 'bahan', name: 'Bahan', component: GenericView },
      { path: 'paket', name: 'Paket', component: GenericView },
      { path: 'pilihan-ekstra', name: 'Pilihan Ekstra', component: GenericView },
      { path: 'diskon', name: 'Diskon', component: DiskonView },
      { path: 'pajak', name: 'Pajak', component: GenericView },
      { path: 'tipe-penjualan', name: 'Tipe Penjualan', component: GenericView },
      { path: 'ketersediaan-produk', name: 'Ketersediaan Produk', component: GenericView },
    ]
  },
  {
    path: '/riwayat-penjualan',
    name: 'Riwayat Penjualan',
    component: GenericView,
    meta: { icon: 'material-symbols:history', label: 'Riwayat Penjualan' }
  },
  {
    path: '/outlet',
    name: 'Outlet',
    component: GenericView,
    meta: { icon: 'material-symbols:storefront-outline', label: 'Outlet' }
  },
  {
    path: '/pelanggan',
    component: RouterLayout,
    meta: { icon: 'material-symbols:stars-outline', label: 'Pelanggan', badge: 'baru' },
    redirect: '/pelanggan/daftar',
    children: [
      { path: 'daftar', name: 'Daftar Pelanggan', component: GenericView },
      { path: 'loyalty', name: 'Loyalty Pelanggan', component: GenericView },
      { path: 'riwayat-poin', name: 'Riwayat Poin Pelanggan', component: GenericView },
    ]
  },
  {
    path: '/pelayan',
    name: 'Pelayan',
    component: GenericView,
    meta: { icon: 'material-symbols:person-apron-outline', label: 'Pelayan' }
  },
  {
    path: '/promo',
    name: 'Promo',
    component: GenericView,
    meta: { icon: 'material-symbols:campaign-outline', label: 'Promo' }
  },
  {
    path: '/sdm',
    component: RouterLayout,
    meta: { icon: 'material-symbols:badge-outline', label: 'SDM' },
    redirect: '/sdm/karyawan',
    children: [
      { path: 'karyawan', name: 'Daftar Karyawan', component: GenericView },
      { path: 'jabatan', name: 'Jabatan dan Hak Akses', component: GenericView },
      { path: 'absensi', name: 'Absensi', component: GenericView },
      { path: 'laporan-absensi', name: 'Laporan Absensi', component: GenericView },
      { path: 'laporan-akses', name: 'Laporan Permintaan Akses', component: GenericView },
    ]
  },
  {
    path: '/stok',
    component: RouterLayout,
    meta: { icon: 'material-symbols:inventory-2-outline', label: 'Stok' },
    redirect: '/stok/supplier',
    children: [
      { path: 'supplier', name: 'Daftar Supplier', component: GenericView },
      { path: 'pembelian', name: 'Pembelian', component: GenericView },
      { path: 'pembayaran-hutang', name: 'Pembayaran Hutang', component: GenericView },
      { path: 'masuk', name: 'Stok Masuk', component: GenericView },
      { path: 'keluar', name: 'Stok Keluar', component: GenericView },
      { path: 'koreksi', name: 'Koreksi Stok', component: GenericView },
      { path: 'transfer', name: 'Transfer Stok', component: GenericView },
    ]
  },
  {
    path: '/uang',
    component: RouterLayout,
    meta: { icon: 'material-symbols:payments-outline', label: 'Uang' },
    redirect: '/uang/rekening',
    children: [
      { path: 'rekening', name: 'Daftar Rekening', component: GenericView },
      { path: 'masuk', name: 'Uang Masuk', component: GenericView },
      { path: 'keluar', name: 'Uang Keluar', component: GenericView },
      { path: 'akun', name: 'Akun', component: GenericView },
      { path: 'jurnal', name: 'Jurnal', component: GenericView },
    ]
  },
  {
    path: '/integrasi',
    component: RouterLayout,
    meta: { icon: 'material-symbols:integration-instructions-outline', label: 'Integrasi' },
    redirect: '/integrasi/pembayaran-digital',
    children: [
      { path: 'pembayaran-digital', name: 'Pembayaran Digital', component: GenericView },
      { path: 'kitchen-display', name: 'Kitchen Display', component: GenericView },
      { path: 'my-nutapos', name: 'My Nutapos', component: GenericView },
      { path: 'akutansi', name: 'Akutansi', component: GenericView },
    ]
  },
  {
    path: '/laporan',
    component: RouterLayout,
    meta: { icon: 'material-symbols:description-outline', label: 'Laporan' },
    redirect: '/laporan/penjualan',
    children: [
      { path: 'penjualan', name: 'Laporan Penjualan', component: GenericView },
      { path: 'penjualan-shift', name: 'Laporan Penjualan per Shift', component: GenericView },
      { path: 'item', name: 'Laporan Item', component: GenericView },
      { path: 'pesanan', name: 'Laporan Pesanan', component: GenericView },
      { path: 'pembelian', name: 'Laporan Pembelian', component: GenericView },
      { path: 'keuangan', name: 'Laporan Keuangan', component: GenericView },
      { path: 'stok', name: 'Laporan Stok', component: GenericView },
      { path: 'laba', name: 'Laporan Laba', component: GenericView },
      { path: 'pelanggan', name: 'Laporan Pelanggan', component: GenericView },
      { path: 'daily', name: 'Daily Report', component: GenericView },
    ]
  },
  {
    path: '/status',
    name: 'Status Nutapos',
    component: GenericView,
    meta: { icon: 'material-symbols:check-circle-outline', label: 'Status Nutapos' }
  },
  {
    path: '/riwayat-aktivasi',
    name: 'Riwayat Aktivasi',
    component: GenericView,
    meta: { icon: 'material-symbols:history-edu-outline', label: 'Riwayat Aktivasi' }
  },
  {
    path: '/hapus-data',
    name: 'Hapus Data',
    component: GenericView,
    meta: { icon: 'material-symbols:delete-outline', label: 'Hapus Data' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
