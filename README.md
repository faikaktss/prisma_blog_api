# 🌟 BE-6442P Blog Yönetim API

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-v5+-blue)
![Express](https://img.shields.io/badge/Express.js-v4+-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-v5+-purple)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

> Modern blog yönetim sistemi için geliştirilmiş RESTful API. TypeScript, Express.js, Prisma ORM ve PostgreSQL kullanılarak MVC mimarisi ile geliştirilmiştir.

---

## 📋 İçindekiler

- [🎯 Proje Hakkında](#-proje-hakkında)
- [✨ Özellikler](#-özellikler)
- [🛠️ Teknolojiler](#️-teknolojiler)
- [🏗️ Mimari](#️-mimari)
- [📊 Veritabanı Şeması](#-veritabanı-şeması)
- [🚀 Kurulum](#-kurulum)
- [⚙️ Yapılandırma](#️-yapılandırma)
- [🎮 Kullanım](#-kullanım)
- [📡 API Endpoints](#-api-endpoints)
- [🔍 Filtreleme](#-filtreleme)
- [📝 Örnek İstekler](#-örnek-i̇stekler)
- [🗂️ Proje Yapısı](#️-proje-yapısı)
- [🤝 Katkıda Bulunma](#-katkıda-bulunma)
- [📄 Lisans](#-lisans)

---

## 🎯 Proje Hakkında

BE-6442P, modern blog sistemleri için geliştirilmiş kapsamlı bir **backend API**’dir.  
Kategoriler, blog yazıları, yorumlar ve etiketler arasında ilişkiler kurabilen, gelişmiş filtreleme özellikleri sunan profesyonel bir çözüm sağlar.

**Temel Konseptler:**
- 🏷️ **Kategoriler:** Blog yazılarını organize etmek için  
- 📝 **Gönderiler:** Ana blog içerikleri (taslak/yayınlanmış)  
- 💬 **Yorumlar:** Kullanıcı yorumları  
- 🏷️ **Etiketler:** Gönderilere çapraz etiketleme (Many-to-Many)

---

## ✨ Özellikler

- 🏷️ Many-to-Many etiketleme sistemi  
- 🗑️ Soft Delete (güvenli veri silme)  
- 📊 Çoklu filtreleme (kategori, etiket, durum)  
- 🔍 Dinamik ve optimize edilmiş sorgular (Prisma ORM)  
- 📝 TypeScript ile tip güvenliği  
- 🏗️ MVC Mimarisi  
- ⚡ Performans optimizasyonları  
- 🛡️ Kapsamlı hata yönetimi  

---

## 🛠️ Teknolojiler

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| Node.js | v18+ | JavaScript runtime environment |
| TypeScript | v5+ | Tip güvenli JavaScript |
| Express.js | v4+ | Web framework |
| Prisma ORM | v5+ | Modern ORM ve veritabanı toolkit |
| PostgreSQL | v15+ | İlişkisel veritabanı |
| tsx | Latest | TypeScript executor |

---

## 🏗️ Mimari

**MVC (Model-View-Controller) yapısı kullanılmıştır:**

📁 src/
├── 📁 config/ # DB bağlantı ayarları
├── 📁 controllers/ # HTTP işleyicileri ve business logic
├── 📁 models/ # Veritabanı sorguları
├── 📁 routers/ # API endpoint yönlendirmeleri
├── 📁 generated/ # Prisma Client (otomatik)
└── 📄 app.ts # Ana uygulama giriş noktası

shell
Kopyala
Düzenle

### 🔗 Veri Akışı

HTTP Request → Router → Controller → Model → Prisma → PostgreSQL

yaml
Kopyala
Düzenle

---

## 📊 Veritabanı Şeması

```mermaid
erDiagram
    Category ||--o{ Post : "bir-çok"
    Post ||--o{ Comment : "bir-çok"
    Post ||--o{ PostTag : "bir-çok"
    Tag ||--o{ PostTag : "bir-çok"
🚀 Kurulum
Gereksinimler
Node.js v18+

PostgreSQL v15+

npm veya yarn

Adımlar
bash
Kopyala
Düzenle
# Projeyi klonla
git clone https://github.com/kullaniciadi/prisma-blog-api.git
cd prisma-blog-api

# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur
cp .env.example .env
Veritabanı URL’sini .env dosyasında yapılandırın:

env
Kopyala
Düzenle
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=3000
NODE_ENV=development
bash
Kopyala
Düzenle
# Migration çalıştır
npx prisma migrate dev --name init

# Prisma Client oluştur
npx prisma generate

# Sunucuyu başlat
npm run dev
📡 API Endpoints
Kaynak	Method	Endpoint	Durum
Kategoriler	GET	/api/categories	✅
Kategoriler	POST	/api/categories	✅
Gönderiler	GET	/api/posts	🚧 Geliştiriliyor
Etiketler	GET	/api/tags	🚧 Geliştiriliyor
Yorumlar	GET	/api/comments	🚧 Geliştiriliyor

Tüm endpoint detayları, filtreleme ve örnek istekler burada listelenmiştir.

🔍 Filtreleme
Gönderiler için gelişmiş filtreleme:

http
Kopyala
Düzenle
GET /api/posts?showDeleted=active&status=published&category=1&tags=2,5
Parametre	Açıklama
showDeleted	true / false / active
status	published / draft / all
category	Kategori ID
tags	Etiket ID’leri (OR mantığı)

🗂️ Proje Yapısı
arduino
Kopyala
Düzenle
📁 src/
├── config/
├── controllers/
├── models/
├── routers/
├── generated/
└── app.ts
🤝 Katkıda Bulunma
Fork yapın

Feature branch oluşturun (git checkout -b feature/x)

Commit yapın (git commit -m 'Add feature')

Push edin (git push origin feature/x)

Pull Request açın

Kurallara uyun: ESLint, TypeScript strict, anlamlı commit, test ve dokümantasyon.

📄 Lisans
