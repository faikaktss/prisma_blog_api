# 🌟 BE-6442P Blog Yönetim API

![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-v5+-blue?style=flat-square)
![Express](https://img.shields.io/badge/Express.js-v4+-lightgrey?style=flat-square)
![Prisma](https://img.shields.io/badge/Prisma-v5+-purple?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15+-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

> Profesyonel bir blog yönetim sistemi RESTful API’si. TypeScript, Express.js, Prisma ORM ve PostgreSQL ile MVC mimarisi kullanılarak geliştirilmiştir.

---

## 📌 İçindekiler

- [🎯 Proje Hakkında](#-proje-hakkında)
- [✨ Özellikler](#-özellikler)
- [🛠 Teknolojiler](#-teknolojiler)
- [🏗 Mimari](#-mimari)
- [📊 Veritabanı İlişkileri](#-veritabanı-ilişkileri)
- [🚀 Kurulum](#-kurulum)
- [⚙️ Yapılandırma](#-yapılandırma)
- [🎮 Kullanım](#-kullanım)
- [📡 API Endpoints](#-api-endpoints)
- [🔍 Filtreleme](#-filtreleme)
- [📝 Örnek İstekler](#-örnek-i̇stekler)
- [🗂 Proje Yapısı](#-proje-yapısı)
- [🤝 Katkıda Bulunma](#-katkıda-bulunma)
- [📄 Lisans](#-lisans)

---

## 🎯 Proje Hakkında

BE-6442P, modern blog sistemleri için geliştirilmiş **backend API** çözümüdür.  
Kategoriler, blog gönderileri, yorumlar ve etiketler arasında ilişkiler kurabilir, gelişmiş filtreleme ile yönetimi kolaylaştırır.

**Temel Modüller:**

- 🏷 **Kategoriler**: Blog gönderilerini sınıflandırmak için  
- 📝 **Gönderiler**: Ana blog içerikleri (taslak/yayınlanmış)  
- 💬 **Yorumlar**: Gönderi yorumları  
- 🏷 **Etiketler**: Gönderilere çapraz etiketleme (Many-to-Many)

---

## ✨ Özellikler

- 🏷 Many-to-Many etiketleme sistemi  
- 🗑 Soft Delete ile güvenli veri silme  
- 📊 Çoklu filtreleme (kategori, etiket, durum)  
- 🔍 Prisma ORM ile optimize edilmiş SQL sorguları  
- 📝 TypeScript ile tip güvenliği  
- 🏗 MVC mimarisi ile temiz kod  
- ⚡ Performans optimizasyonu  
- 🛡 Kapsamlı hata yönetimi  

---

## 🛠 Teknolojiler

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| Node.js | v18+ | JavaScript runtime |
| TypeScript | v5+ | Tip güvenli JavaScript |
| Express.js | v4+ | Web framework |
| Prisma ORM | v5+ | Modern ORM |
| PostgreSQL | v15+ | İlişkisel veritabanı |
| tsx | Latest | TypeScript executor |

---

## 🏗 Mimari

**MVC (Model-View-Controller) yapısı:**

📁 src/
├── 📁 config/ # DB bağlantısı ve yapılandırmalar
├── 📁 controllers/ # HTTP işleyicileri ve business logic
├── 📁 models/ # Veritabanı işlemleri
├── 📁 routers/ # API endpoint yönlendirmeleri
├── 📁 generated/ # Prisma Client
└── 📄 app.ts # Uygulama giriş noktası

markdown
Kopyala
Düzenle

---

## 📊 Veritabanı İlişkileri

| Tablo | Alanlar | Açıklama | İlişkiler |
|-------|--------|----------|-----------|
| **Category** | `id` (PK), `name`, `created_at`, `deleted_at` | Blog gönderilerini kategorize eder | 1 Category → N Post |
| **Post** | `id` (PK), `title`, `content`, `category_id` (FK), `created_at`, `published_at`, `deleted_at` | Ana blog içerikleri | N Post → 1 Category, 1 Post → N Comment, N Post → N Tag (PostTag) |
| **Comment** | `id` (PK), `post_id` (FK), `content`, `commenter_name`, `created_at` | Gönderi yorumları | N Comment → 1 Post |
| **Tag** | `id` (PK), `name` | Gönderilere çapraz etiketleme | N Tag → N Post (PostTag) |
| **PostTag** | `post_id` (FK), `tag_id` (FK) | Gönderi-etiket ilişkisi | Many-to-Many: Post ↔ Tag |


