
> Modern blog yönetim sistemi için geliştirilmiş RESTful API. TypeScript, Express.js, Prisma ORM ve PostgreSQL teknolojileri kullanılarak MVC mimarisi ile geliştirilmiştir.

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

## 🎯 Proje Hakkında

Bu proje, modern blog sistemleri için geliştirilmiş kapsamlı bir backend API'sidir. Kategoriler, blog yazıları, yorumlar ve etiketler arasında karmaşık ilişkiler kurabilen, gelişmiş filtreleme özellikleri sunan profesyonel bir blog yönetim sistemidir.

### 🎨 Temel Konseptler

- **Kategoriler**: Blog yazılarını organize etmek için
- **Gönderiler**: Ana blog içeriği (taslak/yayınlanmış durumları)
- **Yorumlar**: Gönderilere yapılan kullanıcı yorumları
- **Etiketler**: Gönderilerin çapraz etiketlenmesi (Many-to-Many ilişki)

## ✨ Özellikler

- 🏷️ **Gelişmiş Etiketleme Sistemi**: Many-to-Many ilişkiler ile esnek etiketleme
- 🗑️ **Soft Delete**: Verilerin güvenli silinmesi (kategori, gönderi, yorum)
- 📊 **Çoklu Filtreleme**: Durum, kategori, etiket bazlı gelişmiş filtreleme
- 🔍 **Dinamik Sorgular**: Prisma ORM ile optimize edilmiş veritabanı sorguları
- 📝 **TypeScript**: Tip güvenliği ve geliştirici deneyimi
- 🏗️ **MVC Mimarisi**: Temiz ve sürdürülebilir kod yapısı
- ⚡ **Performans**: Optimize edilmiş veritabanı ilişkileri
- 🛡️ **Hata Yönetimi**: Kapsamlı hata yakalama ve işleme

## 🛠️ Teknolojiler

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| **Node.js** | v18+ | JavaScript runtime environment |
| **TypeScript** | v5+ | Tip güvenli JavaScript |
| **Express.js** | v4+ | Web framework |
| **Prisma ORM** | v5+ | Modern ORM ve veritabanı toolkit |
| **PostgreSQL** | v15+ | İlişkisel veritabanı |
| **tsx** | Latest | TypeScript executor |

## 🏗️ Mimari

Proje **MVC (Model-View-Controller)** mimarisi kullanılarak geliştirilmiştir:

```
📁 src/
├── 📁 config/          # Veritabanı bağlantı yapılandırması
├── 📁 controllers/     # İş mantığı ve HTTP işleyicileri
├── 📁 models/          # Veritabanı işlemleri ve sorguları  
├── 📁 routers/         # API endpoint yönlendirmeleri
├── 📁 generated/       # Prisma Client (otomatik oluşturulan)
└── 📄 app.ts          # Ana uygulama giriş noktası
```

### 🔗 Veri Akışı

```
HTTP İsteği → Router → Controller → Model → Prisma → PostgreSQL
     ↓           ↓         ↓         ↓        ↓
   URL'den   Yönlendirme  İş Mantığı  SQL    Veritabanı
  parametre     işlemi    Doğrulama  Sorgusu
```

## 📊 Veritabanı Şeması

### 📋 Tablolar ve İlişkiler

```mermaid
erDiagram
    Category ||--o{ Post : "bir-çok"
    Post ||--o{ Comment : "bir-çok"
    Post ||--o{ PostTag : "bir-çok"
    Tag ||--o{ PostTag : "bir-çok"
    
    Category {
        int id PK
        string name
        datetime created_at
        datetime deleted_at
    }
    
    Post {
        int id PK
        string title
        string content
        int category_id FK
        datetime created_at
        datetime published_at
        datetime deleted_at
    }
    
    Comment {
        int id PK
        int post_id FK
        string content
        string commenter_name
        datetime created_at
    }
    
    Tag {
        int id PK
        string name
    }
    
    PostTag {
        int post_id FK
        int tag_id FK
    }
```

### 🗂️ Veri Modelleri

#### 📁 Category (Kategori)
```typescript
{
  id: number              // Benzersiz kimlik
  name: string           // Kategori adı
  created_at: Date       // Oluşturulma tarihi
  deleted_at?: Date      // Silinme tarihi (soft delete)
  posts: Post[]          // İlişkili gönderiler
}
```

#### 📝 Post (Gönderi)
```typescript
{
  id: number              // Benzersiz kimlik
  title: string          // Gönderi başlığı
  content: string        // Gönderi içeriği
  category_id: number    // Kategori referansı
  created_at: Date       // Oluşturulma tarihi
  published_at?: Date    // Yayınlanma tarihi
  deleted_at?: Date      // Silinme tarihi (soft delete)
  category: Category     // İlişkili kategori
  comments: Comment[]    // İlişkili yorumlar
  postTags: PostTag[]    // İlişkili etiketler
}
```

#### 💬 Comment (Yorum)
```typescript
{
  id: number              // Benzersiz kimlik
  post_id: number        // Gönderi referansı
  content: string        // Yorum içeriği
  commenter_name: string // Yorumcu adı
  created_at: Date       // Oluşturulma tarihi
  post: Post             // İlişkili gönderi
}
```

#### 🏷️ Tag (Etiket)
```typescript
{
  id: number              // Benzersiz kimlik
  name: string           // Etiket adı
  postTags: PostTag[]    // İlişkili gönderiler
}
```

#### 🔗 PostTag (Gönderi-Etiket İlişkisi)
```typescript
{
  post_id: number        // Gönderi referansı
  tag_id: number         // Etiket referansı
  post: Post             // İlişkili gönderi
  tag: Tag               // İlişkili etiket
}
```

## 🚀 Kurulum

### 📋 Gereksinimler

- Node.js (v18 veya üzeri)
- PostgreSQL (v15 veya üzeri)
- npm veya yarn paket yöneticisi

### 🛠️ Adım Adım Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/kullaniciadi/prisma-blog-api.git
cd prisma-blog-api
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Çevre değişkenlerini ayarlayın**
```bash
cp .env.example .env
```

4. **Veritabanı bağlantısını yapılandırın**
```bash
# .env dosyasını düzenleyin
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/blog_db"
PORT=3000
```

5. **Veritabanını oluşturun ve migrate edin**
```bash
npx prisma migrate dev --name init
```

6. **Prisma Client'ı generate edin**
```bash
npx prisma generate
```

7. **Uygulamayı çalıştırın**
```bash
# Geliştirme modu
npm run dev

# Veya
tsx watch src/app.ts
```

## ⚙️ Yapılandırma

### 🌍 Çevre Değişkenleri

```env
# Veritabanı bağlantısı
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Sunucu portu
PORT=3000

# Uygulama ortamı
NODE_ENV=development
```

### 🗄️ Veritabanı İşlemleri

```bash
# Veritabanı durumunu kontrol et
npx prisma migrate status

# Yeni migration oluştur
npx prisma migrate dev --name migration_name

# Veritabanını sıfırla (DİKKAT: Tüm veriyi siler!)
npx prisma migrate reset

# Prisma Studio'yu aç (veritabanı görsel arayüzü)
npx prisma studio
```

## 🎮 Kullanım

### ▶️ Sunucuyu Başlatma

```bash
# Geliştirme modu (otomatik yeniden başlatma)
npm run dev

# Veya direkt tsx ile
tsx watch src/app.ts
```

Sunucu başladığında konsola şu mesaj yazdırılır:
```
Sunucu ayakta
```

API `http://localhost:3000` adresinde çalışmaya başlar.

## 📡 API Endpoints

### 📁 Kategori Endpoints

| Method | Endpoint | Açıklama | Durum |
|--------|----------|----------|-------|
| `GET` | `/api/categories` | Tüm kategorileri listele | ✅ Aktif |
| `GET` | `/api/categories/:id` | Belirli kategoriyi getir | ✅ Aktif |
| `POST` | `/api/categories` | Yeni kategori oluştur | ✅ Aktif |
| `PUT` | `/api/categories/:id` | Kategoriyi güncelle | ✅ Aktif |
| `DELETE` | `/api/categories/:id` | Kategoriyi sil (soft delete) | ✅ Aktif |

### 📝 Gönderi Endpoints

| Method | Endpoint | Açıklama | Durum |
|--------|----------|----------|-------|
| `GET` | `/api/posts` | Tüm gönderileri listele | 🚧 Geliştiriliyor |
| `GET` | `/api/posts/:id` | Belirli gönderiyi getir | 🚧 Geliştiriliyor |
| `POST` | `/api/posts` | Yeni gönderi oluştur | 🚧 Geliştiriliyor |
| `PUT` | `/api/posts/:id` | Gönderiyi güncelle | 🚧 Geliştiriliyor |
| `DELETE` | `/api/posts/:id` | Gönderiyi sil (soft delete) | 🚧 Geliştiriliyor |

### 🏷️ Etiket Endpoints

| Method | Endpoint | Açıklama | Durum |
|--------|----------|----------|-------|
| `GET` | `/api/tags` | Tüm etiketleri listele | 🚧 Geliştiriliyor |
| `GET` | `/api/tags/:id` | Belirli etiketi getir | 🚧 Geliştiriliyor |
| `POST` | `/api/tags` | Yeni etiket oluştur | 🚧 Geliştiriliyor |
| `PUT` | `/api/tags/:id` | Etiketi güncelle | 🚧 Geliştiriliyor |
| `DELETE` | `/api/tags/:id` | Etiketi sil (hard delete) | 🚧 Geliştiriliyor |

### 🔗 Gönderi-Etiket İlişki Endpoints

| Method | Endpoint | Açıklama | Durum |
|--------|----------|----------|-------|
| `POST` | `/api/posts/:id/tags` | Gönderiye etiket ekle | 🚧 Geliştiriliyor |
| `DELETE` | `/api/posts/:id/tags` | Gönderiden etiket sil | 🚧 Geliştiriliyor |

### 💬 Yorum Endpoints

| Method | Endpoint | Açıklama | Durum |
|--------|----------|----------|-------|
| `GET` | `/api/comments` | Tüm yorumları listele | 🚧 Geliştiriliyor |
| `GET` | `/api/comments/:id` | Belirli yorumu getir | 🚧 Geliştiriliyor |
| `POST` | `/api/comments` | Yeni yorum oluştur | 🚧 Geliştiriliyor |
| `PUT` | `/api/comments/:id` | Yorumu güncelle | 🚧 Geliştiriliyor |
| `DELETE` | `/api/comments/:id` | Yorumu sil | 🚧 Geliştiriliyor |

## 🔍 Filtreleme

### 📝 Gönderi Filtreleme Özellikleri

Gönderiler endpoint'i gelişmiş filtreleme seçenekleri sunar:

```http
GET /api/posts?showDeleted=active&status=published&category=2&tags=1,3,5
```

#### 📋 Filtreleme Parametreleri

| Parametre | Değerler | Açıklama |
|-----------|----------|----------|
| `showDeleted` | `true`, `false`, `active` | Silinmiş gönderileri göster/gizle |
| `status` | `published`, `draft`, `all` | Yayınlanma durumuna göre filtrele |
| `category` | `number` | Belirli kategorideki gönderiler |
| `tags` | `1,2,3` | Belirtilen etiketlere sahip gönderiler |

#### 🎯 Filtreleme Mantığı

**Silinme Durumu:**
- `showDeleted=true`: Sadece silinmiş gönderiler
- `showDeleted=active`: Sadece aktif gönderiler  
- `showDeleted=false`: Tüm gönderiler (aktif + silinmiş)

**Yayın Durumu:**
- `status=published`: Sadece yayınlanmış gönderiler
- `status=draft`: Sadece taslak gönderiler
- `status=all`: Tüm gönderiler

**Etiket Filtresi:**
- `tags=1`: 1 numaralı etikete sahip gönderiler
- `tags=1,3,5`: 1, 3 veya 5 numaralı etiketlerden **en az birine** sahip gönderiler (OR mantığı)

### 📁 Kategori Filtreleme

```http
GET /api/categories?showDeleted=active
```

| Parametre | Değerler | Açıklama |
|-----------|----------|----------|
| `showDeleted` | `true`, `false`, `active` | Silinmiş kategorileri göster/gizle |

## 📝 Örnek İstekler

### 📁 Kategori İşlemleri

#### ➕ Yeni Kategori Oluşturma
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Teknoloji"
}
```

**Yanıt:**
```json
{
  "id": 1,
  "name": "Teknoloji",
  "created_at": "2025-07-30T10:30:00Z",
  "deleted_at": null
}
```

#### 📋 Kategorileri Listeleme
```http
GET /api/categories?showDeleted=active
```

**Yanıt:**
```json
[
  {
    "id": 1,
    "name": "Teknoloji",
    "created_at": "2025-07-30T10:30:00Z",
    "deleted_at": null
  },
  {
    "id": 2,
    "name": "Yemek",
    "created_at": "2025-07-30T11:00:00Z",
    "deleted_at": null
  }
]
```

#### ✏️ Kategori Güncelleme
```http
PUT /api/categories/1
Content-Type: application/json

{
  "name": "Güncel Teknoloji"
}
```

#### 🗑️ Kategori Silme (Soft Delete)
```http
DELETE /api/categories/1
```

### 📝 Gönderi İşlemleri

#### ➕ Yeni Gönderi Oluşturma
```http
POST /api/posts
Content-Type: application/json

{
  "title": "TypeScript ile Modern Web Geliştirme",
  "content": "TypeScript, JavaScript'e statik tip kontrolü ekler...",
  "category_id": 1,
  "published_at": "2025-07-30T12:00:00Z"
}
```

#### 🔍 Gelişmiş Filtreleme ile Gönderi Listeleme
```http
GET /api/posts?showDeleted=active&status=published&category=1&tags=2,5
```

**Açıklama:** Aktif, yayınlanmış, 1. kategorideki ve 2 veya 5 numaralı etiketlere sahip gönderiler

### 🏷️ Etiket İşlemleri

#### ➕ Gönderiye Etiket Ekleme
```http
POST /api/posts/1/tags
Content-Type: application/json

{
  "tagId": 3
}
```

#### 🗑️ Gönderiden Etiket Silme
```http
DELETE /api/posts/1/tags
Content-Type: application/json

{
  "tagId": 3
}
```

## 🗂️ Proje Yapısı

```
📁 BE-6442P/
├── 📁 prisma/                    # Prisma yapılandırması
│   ├── 📄 schema.prisma         # Veritabanı şeması
│   └── 📁 migrations/           # Veritabanı migration'ları
├── 📁 src/                      # Kaynak kodlar
│   ├── 📁 config/               # Yapılandırma dosyaları
│   │   └── 📄 database.ts       # Veritabanı bağlantısı
│   ├── 📁 controllers/          # HTTP işleyicileri
│   │   ├── 📄 categoryControllers.ts
│   │   ├── 📄 postsControlerr.ts
│   │   ├── 📄 commentControllers.ts
│   │   └── 📄 tagController.ts
│   ├── 📁 models/               # Veritabanı işlemleri
│   │   ├── 📄 categoryModel.ts
│   │   ├── 📄 postModels.ts
│   │   ├── 📄 commentModels.ts
│   │   ├── 📄 tags.Model.ts
│   │   └── 📄 postTag.Model.ts
│   ├── 📁 routers/              # API yönlendirmeleri
│   │   ├── 📄 categoryRoutes.ts
│   │   ├── 📄 postsRoutes.ts
│   │   ├── 📄 commentsRoutes.ts
│   │   └── 📄 TagRoutes.ts
│   ├── 📁 generated/            # Prisma Client (otomatik)
│   ├── 📄 app.ts               # Ana uygulama
│   └── 📄 constant.ts          # Sabit değerler
├── 📄 package.json             # Proje bağımlılıkları
├── 📄 tsconfig.json           # TypeScript yapılandırması
├── 📄 .env                    # Çevre değişkenleri
├── 📄 .env.example           # Çevre değişkenleri örneği
└── 📄 README.md              # Bu dosya
```

### 📋 Dosya Açıklamaları

#### 🔧 Yapılandırma Dosyaları
- **`prisma/schema.prisma`**: Veritabanı şeması ve model tanımları
- **`tsconfig.json`**: TypeScript derleyici ayarları
- **`package.json`**: Proje bağımlılıkları ve script'ler

#### 🏗️ Uygulama Katmanları
- **`controllers/`**: HTTP isteklerini işler, business logic'i yürütür
- **`models/`**: Veritabanı işlemleri ve Prisma sorguları
- **`routers/`**: API endpoint'lerini tanımlar ve controller'lara yönlendirir
- **`config/`**: Uygulama yapılandırmaları (veritabanı bağlantısı vb.)

#### 🎯 Ana Dosyalar
- **`app.ts`**: Express.js sunucu yapılandırması ve middleware'ler
- **`constant.ts`**: Uygulama sabitleri (enum'lar, config değerleri)

## 🧪 Test ve Geliştirme

### 🔄 Geliştirme Araçları

```bash
# Otomatik yeniden başlatma ile geliştirme
npm run dev

# Prisma Studio (veritabanı GUI)
npx prisma studio

# Veritabanı migration'ları
npx prisma migrate dev

# Prisma Client yeniden oluşturma
npx prisma generate
```

### 🛠️ Yararlı Komutlar

```bash
# Veritabanı durumunu kontrol et
npx prisma migrate status

# Migration geçmişini görüntüle
npx prisma migrate history

# Veritabanını tamamen sıfırla
npx prisma migrate reset

# Seed data ekle (varsa)
npx prisma db seed
```

## 🚧 Bilinen Sorunlar ve Geliştirmeler

### ⚠️ Mevcut Sorunlar
1. **Tag filtreleme**: `tags` parametresi boş olduğunda hata verebilir
2. **Error handling**: Bazı controller'larda hata mesajları tutarsız
3. **Await eksiklikleri**: Bazı async fonksiyonlarda await eksik
4. **Route yapılandırması**: Posts ve comments route'ları henüz aktif değil

### 🔮 Gelecek Özellikler
- [ ] Kullanıcı kimlik doğrulama sistemi
- [ ] Sayfalama (pagination) desteği
- [ ] Cache mekanizması (Redis)
- [ ] Rate limiting
- [ ] API dokümantasyonu (Swagger)
- [ ] Unit ve integration testleri
- [ ] Docker desteği
- [ ] CI/CD pipeline

## 📊 Performans Notları

### 🚀 Optimizasyonlar
- Prisma ORM ile optimize edilmiş SQL sorguları
- Many-to-Many ilişkiler için compound primary key kullanımı
- Soft delete ile veri bütünlüğü korunması
- İndekslenmiş foreign key'ler

### 📈 Öneri Edilen İyileştirmeler
- Büyük veri setleri için sayfalama eklenmesi
- Cache katmanı eklenmesi (Redis)
- Database connection pooling
- Query optimization (EXPLAIN ANALYZE kullanımı)

## 🤝 Katkıda Bulunma

### 🔧 Geliştirme Süreci

1. **Fork** yapın
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** yapın (`git commit -m 'Add amazing feature'`)
4. **Push** yapın (`git push origin feature/amazing-feature`)
5. **Pull Request** açın

### 📋 Katkı Kuralları

- TypeScript strict mode kullanın
- ESLint kurallarına uyun
- Commit mesajlarını anlamlı yazın
- Test yazın (gelecekte eklenecek)
- Dokümantasyonu güncelleyin

### 🐛 Bug Bildirimi

Bug bildirimi için GitHub Issues kullanın ve şunları belirtin:
- İşletim sistemi ve Node.js versiyonu
- Hata mesajının tam metni
- Hatayı yeniden oluşturma adımları
- Beklenen davranış

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Geliştirici**: [Adınız]
- **Email**: your.email@example.com
- **GitHub**: [@kullaniciadi](https://github.com/kullaniciadi)
- **LinkedIn**: [linkedin.com/in/profiliniz](https://linkedin.com/in/profiliniz)

## 🙏 Teşekkürler

Bu projenin geliştirilmesinde kullanılan açık kaynak teknolojilere ve topluluklarına teşekkür ederiz:
- [Prisma](https://www.prisma.io/) - Modern ORM
- [Express.js](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [PostgreSQL](https://www.postgresql.org/) - İlişkisel veritabanı

---

⭐ Eğer bu proje işinize yaradıysa, lütfen bir **star** verin!
