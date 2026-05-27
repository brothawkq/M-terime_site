# Toprak Arda Duman — Kişisel Blog Sitesi

> Kişisel blog ve portfolyo sitesi. Firebase Firestore destekli, tam yönetim panelli, mobil uyumlu.

🌐 **Canlı Site:** [toprakardaduman.netlify.app](https://toprakardaduman.netlify.app)

---

## ✨ Özellikler

- **Kişisel Hero Bölümü** — Fotoğraf, isim, unvan ve sosyal medya linkleri
- **Hakkımda** — Biyografi metni ve fotoğraf
- **Blog** — Yazı listeleme, kategori filtresi, okuma süresi rozeti
- **Yazı Detay** — Beğeni sayacı, görüntülenme sayacı, yorum sistemi
- **Admin Yanıtı** — Admin panelinden yorumlara cevap verme
- **Öne Çıkan Yazı** — Ana sayfada featured post kartı
- **E-posta Bülteni** — Abone toplama sistemi
- **İletişim Formu** — Mesajlar admin paneline düşer
- **Tam Yönetim Paneli** — Yazı ekleme/düzenleme/silme, profil ayarları, yorum yönetimi, abone listesi, site istatistikleri
- **Mobil Uyumlu** — Hamburger menü, responsive grid
- **Arama** — Blog içi arama ve yönlendirme

---

## 🛠 Teknolojiler

| Katman | Teknoloji |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Veritabanı | Firebase Firestore |
| Kimlik Doğrulama | Firebase Authentication |
| Görseller | Base64 (canvas sıkıştırma) |
| İkonlar | Font Awesome 6 |
| Fontlar | Google Fonts (Pacifico, Arvo, Josefin Sans, Dancing Script) |
| Deploy | Netlify |

---

## 📁 Proje Yapısı

```
├── index.html              # Ana sayfa
├── pages/
│   ├── blog.html           # Blog listesi
│   ├── post.html           # Yazı detay sayfası
│   ├── contact.html        # İletişim formu
│   ├── login.html          # Admin girişi
│   └── admin.html          # Yönetim paneli
└── public/
    ├── css/                # Stil dosyaları
    ├── js/                 # JavaScript (scroll, search)
    └── img/                # Statik görseller
```

---

## 🔒 Firebase Güvenlik Kuralları

```
match /posts/{id}       → herkes okur, admin yazar
match /comments/{id}    → herkes okur/yorum atar, admin günceller/siler
match /messages/{id}    → herkes mesaj atar, admin okur/siler
match /subscribers/{id} → herkes abone olur, admin okur
match /settings/{id}    → herkes okur, admin yazar
```

---

## 🚀 Kurulum

Bu proje saf HTML/CSS/JS ile yazılmıştır, build adımı yoktur.

1. Repoyu klonla
```bash
git clone https://github.com/barannilgunn/toprak-arda-duman.git
```

2. Bir local sunucu başlat (Firebase Auth `file://` protokolünde çalışmaz)
```bash
python3 -m http.server 8000
# → http://localhost:8000
```

3. Firebase projesini kendi hesabına bağlamak istersen `firebaseConfig` bloklarını güncelle.

---

## 📸 Ekran Görüntüleri

| Ana Sayfa | Blog | Yönetim Paneli |
|---|---|---|
| Hero, hakkımda, öne çıkan yazı | Kategori filtresi, arama | Yazı yönetimi, profil, yorumlar |

---

## 👤 Geliştirici

**Baran Nilgün** — Freelance Web Geliştirici  
Bu site [Toprak Arda Duman](https://toprakardaduman.netlify.app) için özel olarak geliştirilmiştir.
