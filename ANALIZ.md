# ANALIZ.md — Proje Hata ve Geliştirme Raporu

> Bu dosya projenin mevcut durumunu, kritik hatalarını, eksikliklerini ve öncelik sırasına
> göre yapılacaklar listesini içerir. Kod yazmadan önce bu dosyayı oku.
> Her adım bittikten sonra [ ] → [x] olarak işaretle.

Oluşturulma: 2026-05-27
Kaynak: Proje dosyaları + referans site (https://static-myblog.onrender.com) incelemesi

---

## Kapsam Özeti

| # | Madde | Öncelik | Durum |
|---|---|---|---|
| K-01 | Ana sayfada Firebase API key eksik | KRİTİK | [ ] |
| K-02 | Navigasyon HOME linkleri kırık | KRİTİK | [ ] |
| K-03 | Login/Register formları Firebase'e bağlı değil | KRİTİK | [ ] |
| K-04 | Admin paneli tamamen eksik | KRİTİK | [ ] |
| K-05 | add.html korumasız — herkes post ekleyebilir | KRİTİK | [ ] |
| O-01 | Post detay sayfası yok | Yüksek | [ ] |
| O-02 | CSS dosyaları HTML'lere bağlanmamış | Yüksek | [ ] |
| O-03 | Yanlış görsel bağlantıları | Orta | [ ] |
| O-04 | Contact sayfası navbar'da yok | Orta | [ ] |
| O-05 | Sayfa başlıkları (title) anlamsız | Düşük | [ ] |
| O-06 | Sosyal medya ikonları tıklanamıyor | Düşük | [ ] |
| E-01 | Kategori sistemi | Yüksek | [ ] |
| E-02 | Footer bileşeni | Yüksek | [ ] |
| E-03 | Çalışan arama fonksiyonu | Orta | [ ] |
| E-04 | Post düzenleme / silme | Orta | [ ] |
| E-05 | Okuma süresi göstergesi | Düşük | [ ] |
| E-06 | Öne çıkan (featured) post alanı | Düşük | [ ] |

Uygulama sırası: K-01 → K-02 → K-03 → K-04 → K-05 → O-01 → O-02 → O-03 → O-04 → O-05 → O-06 → E serisi

---

## TASARIM REFERANSI — DEĞİŞTİRME

> Referans site: https://static-myblog.onrender.com
> Aşağıdaki kurallar o siteden birebir çıkarılmıştır.
> Yeni sayfa veya bileşen eklerken bu bölüme bak. Buradaki değerleri değiştirme.

---

### CSS DOSYASI YAPISI — ZORUNLU

`index.css` tüm diğer CSS dosyalarını içe aktarır. Her HTML sayfası yalnızca `index.css`'i bağlar.
Bağımlılık sırası değiştirilmez:

```css
@import './default.css';
@import './fontFamily.css';
@import './topbar.css';
@import './header.css';
@import './home.css';
@import './sidebar.css';
@import './posts.css';
@import './about.css';
@import './logReg.css';     ← dosya adı tam bu şekilde (küçük harf l, büyük R)
@import './add.css';
@import './error.css';
```

**⚠️ DİKKAT:** Dosya adı `logReg.css`'dir (küçük `l`, büyük `R`). Firebase Hosting Linux tabanlıdır,
büyük/küçük harf duyarlıdır. `LogReg.css` olarak kaydedilirse deploy'da CSS yüklenmez.

---

### GLOBAL STILLER — default.css

```css
:root { font-size: 16px; }

* { margin: 0; padding: 0; box-sizing: border-box; }

html::-webkit-scrollbar { width: 0px; }
html { scroll-behavior: smooth; }

body {
   width: 100;
   height: auto;
   min-height: 100vh;
   background-color: #efefef;   ← sayfa arka planı
}

img, video { width: 100%; }

a, a:active, a:link, a::before, a::after {
   color: black;
   text-decoration: none;
}

ul { list-style: none; }
```

---

### FONTLAR — fontFamily.css

Sadece bu 6 Google Fonts import'u olacak, başka CSS kuralı eklenmeyecek:

```css
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap');
```

Font kullanım kuralı:
| Kullanım Yeri | Font |
|---|---|
| Navbar, sidebar linkler, form label | Josefin Sans |
| Blog başlıkları (h1), sidebar başlıkları | Pacifico |
| Header subtitle (h3) | Satisfy |
| Yazar adı | Dancing Script |
| Tarih | Ubuntu Mono |
| Blog içerik (p) | Arvo |

---

### TOPBAR — topbar.css

```
Yükseklik:        50px
Arka plan:        #fff
Pozisyon:         static (fixed DEĞİL — sayfa ile birlikte kayar)
Font:             Josefin Sans
Max genişlik:     1366px (wrapper)
```

Layout oranları:
```
.left  → flex: 3  (sosyal medya ikonları)
.center → flex: 6  (nav linkleri)
.right  → flex: 3  (kullanıcı ikonu + arama)
```

Kullanıcı avatar:
```css
width: 40px; height: 40px; border-radius: 50%;
```

Arama ikonu:
```css
background-color: orange;
width: 30px; height: 30px;
border-radius: 50%;          ← yuvarlak turuncu buton
```

Arama kutusu animasyonu:
```css
/* başlangıç: gizli */
.searchEngine { width: 0px; transition: all 0.5s; }
/* açık: */
.searchEngine.active { width: 70%; }
.searchEngine.active input { opacity: 1; }
```

**Scroll animasyonu** (`.target` → `.active` ile tetiklenir):
```css
.wrapper { opacity: 0; transform: translateY(-10px); transition: all 0.5s; }
.wrapper.active { opacity: 1; transform: translateY(0px); }

/* Sol ikonlar — sırayla gecikme ile */
.left i { transform: translateX(-20px); opacity: 0; transition: all 0.3s; }
.wrapper.active .left i { transform: translateX(0px); opacity: 1; }
.wrapper.active .left i:nth-child(2) { transition-duration: 0.5s; }
.wrapper.active .left i:nth-child(3) { transition-duration: 0.8s; }
.wrapper.active .left i:nth-child(4) { transition-duration: 1.2s; }

/* Sağ ve orta */
.center, .right { transform: translateX(-10px) translateY(-10px); opacity: 0; }
.wrapper.active .center, .wrapper.active .right { transform: none; opacity: 1; }
```

HTML'de topbar wrapper'ı `target` class'ına sahip olmalı:
```html
<div class="topbar">
   <div class="wrapper target">
```

---

### HEADER — header.css

```
margin-top:  70px   ← topbar 50px + 20px boşluk
Görsel:      width 100%, height 450px, object-fit: cover
Pozisyon:    relative (h1 ve h3 absolute ile konumlanır)
```

Başlık konumları (img üzerine absolute):
```css
.header h1 {
   top: -50px;                       ← topbar ile header arasında görünür
   font-family: 'Pacifico', cursive;
   font-size: 4rem;
   color: white;
   text-shadow: 0px 0px 3px rgba(0,0,0,0.5), 0px 0px 5px rgba(0,0,0,0.4), 0px 0px 10px rgba(0,0,0,0.6);
}
.header h3 {
   top: 80px;                        ← görselin içinde
   font-family: 'Satisfy', cursive;
   font-size: 2.6rem;
   text-shadow: 0px 0px 3px rgba(0,0,0,0.4), 0px 0px 6px rgba(0,0,0,0.2);
}
```

**Scroll animasyonu:**
```css
.header { transform: translateX(-30px); opacity: 0; transition: all 0.5s; }
.header.active { transform: translateX(0px); opacity: 1; }

.header h1, .header h3 { transform: translateY(-20px); opacity: 0; transition: all 0.8s; }
.header.active h1, .header.active h3 { transform: translateY(0px); opacity: 1; }
.header.active h3 { transition-delay: 0.3s; }
```

HTML'de header `target` class'ına sahip olmalı:
```html
<header class="header target">
```

---

### HOME LAYOUT — home.css

```css
.home {
   width: 100%;
   display: flex;
   justify-content: center;
   margin-top: 50px;
   padding: 0px 10px;
}
.home .wrapper {
   width: 100%;
   max-width: 1366px;
   display: flex;
   padding: 0 10px;
}
```

**⚠️ KURAL:** `home.css` sadece bu iki kuralı içerir. `.posts` ve `.sidebar` stilleri
kendi ayrı dosyalarında tanımlanır. `home.css`'e post veya sidebar stili eklenmez.

---

### POSTS — posts.css

```
Yerleşim:   flex: 9  (wrapper içinde)
Düzen:      flex-wrap: wrap, gap: 20px
Post genişliği: calc(50% - 20px)  → 2 sütun
```

Post kartı:
```css
.posts .post {
   border: 1px solid rgba(0, 0, 0, 0.3);
   border-radius: 10px;
   padding: 15px;
   margin-bottom: 30px;
}
```

Tipografi:
```css
.posts h1       → font-family: 'Pacifico', cursive
.posts img      → border-radius: 10px; height: 300px; object-fit: cover
.posts p        → font-family: 'Arvo', serif; -webkit-line-clamp: 4 (4 satır kısalt)
.authorAndDate  → display: flex; justify-content: space-between
  span:nth-child(1) → Dancing Script (yazar adı)
  span:nth-child(2) → Ubuntu Mono (tarih)
```

Responsive:
```css
@media(max-width:1100px) {
   .posts .post { width: 100%; }   ← tek sütun
}
```

**Scroll animasyonu:**
```css
.posts .post { transform: translateX(-20px); opacity: 0; transition: all 0.5s; }
.posts .post:nth-child(2n) { transition: all 0.8s; }   ← çift postlar biraz geç
.posts .post.active { transform: translateX(0px); opacity: 1; }
```

HTML'de her post div'i `target` class'ına sahip olmalı:
```html
<div class="post target">
```

---

### SIDEBAR — sidebar.css

```
Yerleşim:   flex: 3  (wrapper içinde)
Padding:    0 20px
```

Alan kutusu:
```css
.sidebar .area {
   padding: 10px;
   border: 1px solid rgba(0, 0, 0, 0.3);
   border-radius: 10px;
   margin-bottom: 30px;
}
```

Başlık:
```css
.sidebar h3 {
   font-family: 'Pacifico', cursive;
   display: flex;
   justify-content: center;       ← ortalı
}
.sidebar h3::after {               ← alt çizgi dekorasyon
   content: '';
   width: 50%;
   height: 2px;
   background-color: black;
   position: absolute;
   bottom: 0;
}
```

Kategori etiketleri:
```css
.sidebar .categories span {
   width: calc(50% - 10px);        ← 2 sütun
   font-family: 'Arvo', serif;
   background-color: rgba(0, 0, 0, 0.03);
   padding: 2px;
   border-radius: 3px;
   cursor: pointer;
}
```

Linkler ("Your Space"):
```css
.sidebar a {
   font-family: 'Josefin Sans', sans-serif;
   display: block;
   padding: 3px;
   margin-bottom: 5px;
   background-color: rgba(0, 0, 0, 0.03);
}
.sidebar a:nth-child(2n + 1) { background-color: rgba(0, 0, 0, 0.08); }  ← zebra
```

**Scroll animasyonu:**
```css
.sidebar .area { opacity: 0; transition: all 0.5s; }
.sidebar .area.active { opacity: 1; }
```

HTML'de her sidebar `.area` div'i `target` class'ına sahip olmalı:
```html
<div class="area target">
```

---

### ABOUT SAYFASI — about.css

```
Her bölüm (.wrapper): flex, max-width 1366px, margin 50px auto
Çift numaralı bölümler: flex-direction: row-reverse (fotoğraf solda)
```

```css
.about .wrapper .text { flex: 2 }
.about .wrapper .photo { flex: 2; overflow: hidden; border-radius: 10px; }
.about .wrapper .photo img:hover { transform: scale(1.2); }  ← zoom efekti

h1 → Dancing Script
p  → Josefin Sans, font-size: 1.2rem, line-height: 25px
p::first-letter { margin-left: 20px; }  ← girintili paragraf başı
```

**Scroll animasyonu:**
```css
.about .wrapper { opacity: 0; transition: all 0.5s; }
.about .wrapper.active { opacity: 1; }
.about .wrapper .text { transform: translateX(-20px); }
.about .wrapper:nth-child(2n) .text { transform: translateX(20px); }
.about .wrapper.active .text { transform: translateX(0px); }
.about .wrapper .photo { transform: translateX(20px); }
.about .wrapper:nth-child(2n) .photo { transform: translateX(-20px); }
.about .wrapper.active .photo { transform: translateX(0px); }
```

---

### LOGIN / REGISTER FORMU — logReg.css

```
.logReg img:  width 100%, height calc(100vh - 50px), object-fit: cover
              → tam ekran arka plan görseli

.logReg form: position: absolute
              width: 350px
              left: calc((100% - 350px) / 2)   ← yatay ortala
              top: 50px
              background-color: rgba(0, 0, 0, 0.7)
              border-radius: 10px
              box-shadow: üçlü gölge
```

Input (floating label efekti):
```css
input {
   background: rgba(0, 0, 0, 0.3);
   border: none; border-radius: 10px;
   color: white; height: 40px;
}
span {  /* label */
   position: absolute; left: 10px; top: 10px;
   color: white; font-family: Josefin Sans;
}
input:focus ~ span,
input:valid ~ span {
   top: -10px; left: 20px;
   font-size: 0.8rem;
   background-color: rgba(0, 0, 0, 0.5);  ← label yukarı uçar
}
```

Buton:
```css
button {
   color: white;
   background-color: rgba(113, 113, 113, 0.6);
   border-radius: 5px;
   border: none;
   padding: 5px 10px;
}
```

---

### POST EKLEME FORMU — add.css

**⚠️ KRİTİK — HTML YAPISI:** Form içinde iki wrapper div zorunludur:
```html
<div class="add">
   <form>
      <div class="text">          ← genişlik %90
         <input type="text" id="title" placeholder="Title" required>
         <textarea id="content" placeholder="Content" required></textarea>
         <input type="text" id="author" placeholder="Author" required>
      </div>
      <div class="button">        ← genişlik %10
         <label for="image">
            <i class="fa-regular fa-image"></i>
         </label>
         <input type="file" id="image" accept="image/*" hidden>
         <button type="submit">
            <i class="fa-solid fa-plus"></i>
         </button>
      </div>
   </form>
</div>
```

CSS değerleri:
```css
.add {
   width: 100%; height: calc(100vh - 50px);
   display: flex; justify-content: center; align-items: center;
}
.add form {
   background-color: rgba(0, 0, 0, 0.1);
   height: 450px; width: 90%; max-width: 1000px;
   padding: 20px; border-radius: 10px;
   border: 1px solid rgba(0, 0, 0, 0.3);
   display: flex;
}
.add form .text { width: 90%; flex-direction: column; justify-content: space-around; }

input         → height: 40px; border-radius: 10px; border: none;
input:first   → font-family: Pacifico (başlık)
input:last    → font-family: Dancing Script (yazar)
textarea      → height: 180px; font-family: Arvo

.add form .button { width: 10%; flex-direction: column; justify-content: space-evenly; }
button, label → width: 40px; height: 40px; border-radius: 50%;  ← yuvarlak
button        → background-color: lightgreen
label         → background-color: rgb(255, 231, 159)  ← sarı
```

---

### ERROR SAYFASI — error.css

```css
.error {
   width: 100%; height: calc(100vh - 50px);
   display: flex; justify-content: center; align-items: center;
   position: relative;
}
.error i {
   font-size: 20rem;           ← devasa ikon
   color: rgb(255, 87, 87, 0.3);   ← soluk kırmızı
   position: absolute; z-index: 5;
}
.error span {
   font-size: 5rem; z-index: 10;
   font-family: Josefin Sans; font-weight: 700;
}
```

---

### SCROLL ANİMASYON SİSTEMİ — scroll.js

`public/js/scroll.js` IntersectionObserver kullanır. Ekrana giren `.target` class'lı
elemanlara `.active` class'ı ekler. Bu sistem tüm animasyonları tetikler.

**Kural:** Animasyonlu olmasını istediğin her element HTML'de `target` class'ına sahip olmalı:

```html
<!-- Topbar wrapper -->
<div class="wrapper target">

<!-- Header -->
<header class="header target">

<!-- Post kartları -->
<div class="post target">

<!-- Sidebar alanları -->
<div class="area target">

<!-- About bölümleri -->
<div class="wrapper target">
```

`scroll.js` bu elementleri izler, `threshold: 0.3` (elementin %30'u göründüğünde tetiklenir).

---

### ARAMA BUTONU — search.js

`public/js/search.js` sadece arama input'unun gösterilip gizlenmesini yönetir:
```js
searchIcon.addEventListener('click', () => {
   searchEngine.classList.toggle('active');
});
```
`.active` class'ı `topbar.css`'te `width: 70%` ve `opacity: 1` yapar.
Gerçek post filtreleme E-03 kapsamında eklenecek.

---

### SAYFA ŞABLONU — Her Yeni Sayfa

Yeni HTML sayfası oluştururken bu başlık yapısını kullan:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="../public/css/index.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
   <title>Sayfa Adı — Toprak Arda Duman</title>
</head>
```

- `index.html` (proje kökü): `href="public/css/index.css"` (üst klasör yok)
- `pages/*.html`: `href="../public/css/index.css"` (bir üst klasör)

---

## K-01: Ana Sayfada Firebase API Key Eksik (KRİTİK)

**Sorun:**
`index.html` satır 99'da şu değer var:
```
apiKey: "YOUR_API_KEY"
```
Bu bir placeholder. Gerçek API key yazılmamış. Sonuç: ana sayfa Firebase'e bağlanamıyor, hiç post çekilemiyor.

`pages/add.html` dosyasında ise gerçek key mevcut:
```
apiKey: "AIzaSyBk9mcH4cFoF7eXr6zKB6oanooO6ZYT3_Vc"
```
İki dosya arasında tutarsızlık var.

**Çözüm:**
`index.html` satır 99'daki `"YOUR_API_KEY"` değeri, `add.html`'deki gerçek key ile değiştirilecek.

**Etkilenen Dosya:** `index.html` (satır 99)

**Adımlar:**
- [ ] **K-01.1** `index.html` → `apiKey: "YOUR_API_KEY"` → `apiKey: "AIzaSyBk9mcH4cFoF7eXr6zKB6oanooO6ZYT3_Vc"` ile değiştir
- [ ] **K-01.2** Tarayıcıda `index.html` aç → F12 Console → Firebase hatası kalmadığını doğrula
- [ ] **K-01.3** Firestore'a test post'u ekle, ana sayfada göründüğünü kontrol et

**⚠️ GÜVENLİK NOTU:**
API key HTML dosyasında açık görünüyor. Firebase Console'dan Firestore Security Rules'u
şu şekilde ayarla; aksi halde herkes veritabanına yazabilir:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;                          // herkes okuyabilir
      allow write: if request.auth != null;         // sadece giriş yapmış kullanıcı yazabilir
    }
  }
}
```

---

## K-02: Navigasyon HOME Linkleri Kırık (KRİTİK)

**Sorun:**
`pages/` klasöründeki tüm dosyalar (about, login, register, error) HOME linkini `href="/"` olarak kullanıyor.
Bu bir web sunucusunda çalışır ama dosyayı doğrudan açınca (`file:///...`) işletim sisteminin
köküne gider, projeye değil. Bu yüzden HOME'a tıklanınca sayfa takılıyor veya hata veriyor.

Yalnızca `contact.html` bunu doğru yapmış: `href="../index.html"`

**Etkilenen Dosyalar:**
- `pages/about.html` satır 27: `href="/"` ❌
- `pages/login.html` satır 27: `href="/"` ❌
- `pages/register.html` satır 27: `href="/"` ❌
- `pages/error.html` satır 27: `href="/"` ❌

**Çözüm:** Tüm bu dosyalarda `href="/"` → `href="../index.html"` olacak.

**Adımlar:**
- [ ] **K-02.1** `pages/about.html` → HOME linkini `href="../index.html"` yap
- [ ] **K-02.2** `pages/login.html` → HOME linkini `href="../index.html"` yap
- [ ] **K-02.3** `pages/register.html` → HOME linkini `href="../index.html"` yap
- [ ] **K-02.4** `pages/error.html` → HOME linkini `href="../index.html"` yap
- [ ] **K-02.5** Her sayfada HOME linkine tıklayarak `index.html`'e döndüğünü doğrula

---

## K-03: Login ve Register Formları Firebase'e Bağlı Değil (KRİTİK)

**Sorun:**
`pages/login.html` ve `pages/register.html` sadece görsel HTML formlardır.
İçlerinde hiç JavaScript yok. Kullanıcı forma bilgi girip butona basınca hiçbir şey olmuyor.
Firebase Authentication ile hiç bağlantı kurulmamış.

Ek sorun — `pages/login.html` satır 63'te form mantık hatası:
```html
<a href="./login.html">Do you have an account?</a>
```
- Metin yanlış: "Do you have an account?" → "Don't have an account?" olmalı
- Link yanlış: `./login.html` → `./register.html` olmalı
- Kullanıcıyı kendi sayfasına gönderiyortaki bu satır anlamsız

**Etkilenen Dosyalar:**
- `pages/login.html` (tüm form — Firebase auth kodu yok)
- `pages/register.html` (tüm form — Firebase auth kodu yok)

**Çözüm:**
Her iki forma Firebase Authentication (Email/Password) entegre edilecek.

**Adımlar:**
- [ ] **K-03.1** `pages/login.html` → Firebase `signInWithEmailAndPassword` ekle
  - Başarılı giriş → `../index.html` yönlendir
  - Hatalı giriş → kullanıcıya Türkçe hata mesajı göster
- [ ] **K-03.2** `pages/register.html` → Firebase `createUserWithEmailAndPassword` ekle
  - Başarılı kayıt → `./login.html` yönlendir
  - Hatalı kayıt → kullanıcıya Türkçe hata mesajı göster
- [ ] **K-03.3** `pages/login.html` satır 63 → metin "Don't have an account?" yap, link `./register.html` yap
- [ ] **K-03.4** `pages/register.html` → görsel için `about.jpg` yerine `register.jpg` kullan (dosya mevcut, kullanılmıyor)
- [ ] **K-03.5** Giriş testi: Firebase Console'daki kullanıcı ile login yap

---

## K-04: Admin Paneli Tamamen Eksik (KRİTİK)

**Sorun:**
Projenin en büyük eksiği. Toprak'ın güvenli şekilde blog yönetebileceği bir admin paneli yok.
Şu an `pages/add.html` var ama bu sayfa herkese açık, şifre koruması yok.

**Admin Panelinde Olması Gerekenler:**

### Dosya Yapısı
```
pages/
└── admin.html          ← admin paneli (yeni oluşturulacak)
```

### Admin Paneli Bölümleri

**A. Güvenli Giriş Kontrolü**
- Sayfa açılınca Firebase Auth ile oturum kontrolü yap
- Giriş yapılmamışsa → `./login.html` yönlendir
- Sadece Toprak'ın hesabı (belirli bir email/uid) admin sayfasına girebilir

**B. Post Listesi**
- Firestore'daki tüm postları tablo olarak göster
- Her post için: başlık, yazar, tarih, düzenle butonu, sil butonu
- Silme öncesi onay sor ("Bu postu silmek istediğine emin misin?")

**C. Post Ekleme**
- Mevcut `add.html`'deki formu admin.html içine taşı (veya entegre et)
- Başlık, içerik, yazar, resim yükleme alanları
- Firestore'a kaydet

**D. Post Düzenleme**
- Listeden bir posta "Düzenle" tıklanınca form dolar
- Mevcut içerik input'lara yüklenir
- Güncelle butonuyla Firestore'da `updateDoc` yapılır

**E. Çıkış Yap**
- `signOut()` ile oturumu kapat → `./login.html` yönlendir

**Adımlar:**
- [ ] **K-04.1** `pages/admin.html` dosyasını oluştur
  - Sayfa yüklenince `onAuthStateChanged` ile oturum kontrolü
  - Giriş yoksa → `./login.html` yönlendir
- [ ] **K-04.2** Admin paneline post listesi ekle
  - Firestore'dan tüm postları çek, tablo olarak göster
- [ ] **K-04.3** Admin paneline post ekleme formu ekle
  - `add.html`'deki mevcut Firebase kodu buraya taşınır
- [ ] **K-04.4** Admin paneline post silme ekle
  - `deleteDoc` ile Firestore'dan sil
  - Silmeden önce `confirm()` ile onay al
- [ ] **K-04.5** Admin paneline post düzenleme ekle
  - Düzenle tıklanınca formu o postun verileriyle doldur
  - `updateDoc` ile güncelle
- [ ] **K-04.6** Navbar'a "Admin" linki ekle (sadece giriş yapılmışsa görünsün)
- [ ] **K-04.7** Çıkış yap butonu ekle

**Doğrulama:**
- Giriş yapmadan `admin.html`'e git → `login.html`'e yönlendirilmeli
- Giriş yap → admin.html açılmalı
- Post ekle → anasayfada görünmeli
- Post sil → anasayfadan kalkmalı
- Post düzenle → anasayfada güncellenmiş görünmeli

---

## K-05: add.html Korumasız (KRİTİK)

**Sorun:**
`pages/add.html` sayfası tamamen açık. URL'yi bilen herhangi biri bu sayfaya gidip post ekleyebilir.
Firebase Security Rules da şu an `allow write: if true` ise dış dünyadan bile yazılabilir.

**Çözüm:**
`add.html` ya admin.html ile birleştirilmeli (önerilen), ya da en azından Firebase Auth kontrolü eklenmelidir.

**Adımlar:**
- [ ] **K-05.1** K-04 tamamlandıktan sonra `add.html` içine Firebase Auth kontrolü ekle
  - Oturum yoksa → `./login.html` yönlendir
- [ ] **K-05.2** Firebase Console → Firestore Security Rules güncelle (K-01 notu)
- [ ] **K-05.3** Navbar'dan doğrudan "ADD" linkini kaldır ya da giriş kontrolüne bağla

---

## O-01: Post Detay Sayfası Yok

**Sorun:**
Anasayfada bir posta tıklandığında o postun tam içeriğini gösteren sayfa yok.
Tüm içerik anasayfada üst üste görünüyor; uzun postlarda bu kötü bir deneyim.

**Çözüm:**
`pages/post.html` sayfası oluşturulacak. URL parametresiyle (`?id=...`) hangi post
gösterileceği belirlenecek.

**Adımlar:**
- [ ] **O-01.1** `pages/post.html` dosyası oluştur
  - URL'den `?id=POST_ID` parametresini oku
  - Firestore'dan o postun verisini çek
  - Başlık, içerik, yazar, tarih, resim göster
- [ ] **O-01.2** `index.html`'deki post kartlarına tıklanabilir link ekle
  - Her post kartına `href="pages/post.html?id=DOCID"` bağlantısı
- [ ] **O-01.3** `public/css/` altına `post.css` oluştur (post detay sayfa stili)

---

## O-02: CSS Dosyaları HTML'lere Bağlanmamış

**Sorun:**
`public/css/` klasöründe şu dosyalar var ama hiçbir HTML bunları kullanmıyor:

| CSS Dosyası | Kullanılıyor mu |
|---|---|
| `about.css` | ❌ |
| `add.css` | ❌ |
| `home.css` | ❌ |
| `posts.css` | ❌ |
| `sidebar.css` | ❌ |
| `topbar.css` | ❌ |
| `header.css` | ❌ |
| `fontFamily.css` | ❌ |
| `LogReg.css` | ❌ |
| `register.css` | ❌ |
| `error.css` | ❌ |

Tüm sayfalar yalnızca `index.css` kullanıyor. Bu CSS dosyaları ya silinmeli ya da ilgili HTML'lere bağlanmalı.

**Adımlar:**
- [ ] **O-02.1** Her CSS dosyasının ne için olduğunu belirle (içeriğine bakarak)
- [ ] **O-02.2** İçeriği doluysa ilgili HTML sayfasına `<link>` ekle
- [ ] **O-02.3** İçeriği boş veya gereksizse dosyayı sil

---

## O-03: Yanlış Görsel Bağlantıları

**Sorun 1 — index.html:**
Satır 127'de yedek resim yolu:
```
public/img/backgrounds/content-1.jpg
```
Bu klasör mevcut değil. Doğru yol: `public/img/content-1.jpg`

**Sorun 2 — register.html:**
Login görseli olarak `about.jpg` kullanılıyor. Oysa `register.jpg` diye ayrı bir dosya var.

**Adımlar:**
- [ ] **O-03.1** `index.html` satır 127 → yol düzelt: `public/img/content-1.jpg`
- [ ] **O-03.2** `pages/register.html` → `about.jpg` → `../public/img/register.jpg` yap

---

## O-04: Contact Sayfası Navbar'da Gösterilmiyor

**Sorun:**
`pages/contact.html` dosyası mevcut ama hiçbir sayfanın navbar'ında bu sayfaya link yok.
Ziyaretçiler iletişim sayfasına ulaşamıyor.

**Adımlar:**
- [ ] **O-04.1** Tüm sayfalardaki navbar'a CONTACT linki ekle
  - `index.html` → `<a href="pages/contact.html">CONTACT</a>`
  - `pages/*.html` → `<a href="./contact.html">CONTACT</a>`

---

## O-05: Sayfa Başlıkları (title) Anlamsız

**Sorun:**
Birçok sayfa `<title>Document</title>` kullanıyor. SEO açısından kötü, sekme başlığı anlamsız.

| Dosya | Mevcut Title | Olması Gereken |
|---|---|---|
| `pages/about.html` | Document | About — Toprak Arda Duman |
| `pages/login.html` | Document | Login — Toprak Arda Duman |
| `pages/register.html` | Document | Register — Toprak Arda Duman |
| `pages/error.html` | Document | 404 Not Found — Toprak Arda Duman |
| `index.html` | Home | Home — Toprak Arda Duman |

**Adımlar:**
- [ ] **O-05.1** Tüm HTML dosyalarında `<title>` etiketlerini düzelt

---

## O-06: Sosyal Medya İkonları Tıklanamıyor

**Sorun:**
Topbar'daki Twitter, Instagram, Facebook, Pinterest ikonları sadece görsel.
Gerçek bir profile yönlendirme yok.

**Adımlar:**
- [ ] **O-06.1** Her ikon için gerçek sosyal medya profil URL'si ekle
  - `<i class="fa-brands fa-square-instagram">` → `<a href="https://instagram.com/..." target="_blank">` ile sar
- [ ] **O-06.2** Toprak'ın gerçek kullanıcı adlarını al ve linkleri güncelle

---

## E-01: Kategori Sistemi

**Açıklama:**
Blog yazıları kategorilere ayrılabilir. Örn: "Teknoloji", "Günlük", "Fotoğraf"
Anasayfada kategori filtresi olur. Her yazıya kategori etiketi eklenir.

**Teknik Gereksinim:**
- Firestore'da `posts` koleksiyonuna `category` alanı ekle
- Anasayfaya kategori filtresi butonları ekle
- Sidebar'daki `#art #design #paint` etiketleri gerçek kategorilere bağlanacak

**Adımlar:**
- [ ] **E-01.1** `add.html` ve `admin.html` formuna kategori seçimi ekle
- [ ] **E-01.2** `index.html`'de sidebar kategorilerine tıklanınca filtrele
- [ ] **E-01.3** Firestore sorgusu: `where("category", "==", secilenKategori)`

---

## E-02: Footer Bileşeni

**Açıklama:**
Hiçbir sayfada footer yok. Minimum bir footer olmalı:
- Toprak Arda Duman © 2024
- İletişim linki (contact.html)
- Sosyal medya ikonları

**Adımlar:**
- [ ] **E-02.1** Tüm sayfalara footer HTML bloğu ekle
- [ ] **E-02.2** `public/css/index.css`'e footer stilleri ekle

---

## E-03: Çalışan Arama Fonksiyonu

**Açıklama:**
Mevcut `search.js` sadece arama ikonuna tıklanınca input'u gösteriyor/gizliyor.
Gerçek bir arama yapmıyor. Postlar arasında başlığa göre arama yapılabilmeli.

**Adımlar:**
- [ ] **E-03.1** `public/js/search.js` güncelle
  - Input'a yazıldıkça anasayfadaki post kartlarını filtrele
  - Post başlığında aranan kelime varsa göster, yoksa gizle
  - Firestore sorgusu yerine mevcut DOM elemanları üzerinde filtrele (basit çözüm)

---

## E-04: Post Düzenleme ve Silme (Admin Paneli Dışı)

**Açıklama:**
K-04'te admin paneline edit/delete ekleniyor. Ancak anasayfada da giriş yapılmışsa
her postun altında küçük düzenle/sil butonları görünebilir.

**Adımlar:**
- [ ] **E-04.1** K-03 tamamlandıktan sonra, giriş yapılmışsa post kartlarına aksiyonlar ekle
  - Her postun altında "Düzenle" → `admin.html?edit=POSTID`
  - "Sil" → onay sonrası `deleteDoc`

---

## E-05: Okuma Süresi Göstergesi

**Açıklama:**
Her post kartında "~3 dk okuma" gibi bir bilgi kullanıcı deneyimini iyileştirir.
Kelime sayısına göre hesaplanır (ortalama 200 kelime/dakika).

**Adımlar:**
- [ ] **E-05.1** `index.html`'de post oluşturma JS'ine okuma süresi hesabı ekle
  - `Math.ceil(post.content.split(' ').length / 200)` dakika

---

## E-06: Öne Çıkan (Featured) Post Alanı

**Açıklama:**
Anasayfada büyük bir hero/featured post alanı olabilir. En son veya öne çıkan yazı
tam genişlikte, büyük görselle gösterilir.

**Adımlar:**
- [ ] **E-06.1** Firestore'da `posts` koleksiyonuna `featured: boolean` alanı ekle
- [ ] **E-06.2** Anasayfada normal post listesinin üstüne featured post bölümü ekle
- [ ] **E-06.3** Admin panelinde herhangi bir postu "öne çıkar" olarak işaretleyebilme

---

## Firebase Hosting — Yayına Alma Adımları

Bu adımlar projeyi internette herkese açık hale getirir.
Ücretsiz, özel domain bağlanabilir, HTTPS otomatik gelir.

### Ön Koşullar
- Node.js kurulu olmalı (https://nodejs.org)
- Google hesabı (Firebase projesiyle aynı)

### Adımlar

```bash
# 1. Firebase CLI kur
npm install -g firebase-tools

# 2. Giriş yap
firebase login

# 3. Proje klasörüne git
cd "/Users/baran/Desktop/Toprak Arda Duman"

# 4. Firebase'i başlat
firebase init hosting
# → Mevcut projeyi seç: blog-5a0b5
# → Public directory: . (nokta — proje kökü)
# → Single-page app: NO
# → Automatic builds: NO

# 5. Yayına al
firebase deploy --only hosting
```

Çıktı şu şekilde görünür:
```
Hosting URL: https://blog-5a0b5.web.app
```

### Özel Domain Bağlama (İsteğe Bağlı)
Firebase Console → Hosting → Add custom domain

---

## Öncelik Sırası — Özet

```
1. K-01 → API key düzelt (anasayfa çalışsın)
2. K-02 → Navigasyon düzelt (sayfalar arası geçiş çalışsın)
3. K-03 → Login/Register Firebase'e bağla
4. K-04 → Admin paneli oluştur
5. K-05 → add.html'i koru
6. O-01 → Post detay sayfası
7. O-02 → CSS dosyaları bağla
8. O-03 → Görsel yolları düzelt
9. O-04 → Contact'ı navbar'a ekle
10. O-05 → Title etiketleri düzelt
11. O-06 → Sosyal medya linkleri
12. E serisi → Ekstra özellikler
```

---

## Notlar

### Firebase Security Rules — ZORUNLU
K-01 düzeltmesinin ardından Firebase Console'dan Firestore kurallarını güncelle.
Şu an `allow write: if true` ise herkes veritabanına yazabilir.

### Resim Yükleme Sınırı
`add.html` dosyası görseli base64 olarak Firestore'a kaydediyor.
Firestore'un döküman boyutu limiti 1 MB. Büyük görseller hata verebilir.
Çözüm: Firebase Storage kullanmak (base64 yerine dosya yükle, URL sakla).
Bu K-04 kapsamında admin paneli yapılırken ele alınmalı.

### Lokalde Test
Projeyi tarayıcıda doğrudan açmak yerine basit bir yerel sunucu kullan:
```bash
# Python 3 varsa:
python3 -m http.server 3000
# Sonra: http://localhost:3000
```
Bu yöntemle `href="/"` sorunları da görünmez — sadece Firebase Hosting'e yükledikten sonra gerçek test yapılmış olur.
