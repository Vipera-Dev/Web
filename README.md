# ViperaDev.com

**ViperaDev**, bağımsız bir **oyun stüdyosu** ve **oyun geliştirme
araçları üreticisidir**.\
Bu depo, [ViperaDev.com](https://viperadev.com) web sitesinin kaynak
kodlarını içerir.

------------------------------------------------------------------------

## 🎮 İçerik ve Özellikler

-   **Modern ve animasyonlu arayüz:** Aurora blob arka planlar, neon
    grid, yıldız partikülleri ve kaydırma animasyonlarıyla dinamik bir
    görünüm.
-   **Hero bölümü:** Slogan + typing animasyonu ile dikkat çekici giriş.
-   **Projeler:** Aktif oyun ve araç projeleri, teknoloji etiketleri ve
    kategori filtresi (Tümü / Oyunlar / Araçlar).
-   **Proje Detay Sayfaları:**
    -   [Mission: Budy](mission-budy.html) → Aksiyon/RPG prototipi.\
    -   [ViperaDeck](viperadeck.html) → Kart tabanlı üretkenlik süper
        uygulaması.\
-   **Geliştirme Süreci:** Araçlar, şablonlar ve kalite/güvenlik odaklı
    iş akışları.
-   **Takım:** Ekip üyeleri, roller ve sosyal medya bağlantıları.
-   **İletişim:** E-posta, sosyal medya linkleri ve form tabanlı
    iletişim.
-   **Paylaş Menüsü:** Proje kartlarında ⋯ butonuyla açılan menü (link
    kopyalama, GitHub, görsel açma).
-   **Footer:** Hızlı navigasyon, iletişim bilgileri ve telif hakkı.

------------------------------------------------------------------------

## 📂 Klasör Yapısı

    ViperaDev.com/
    │
    ├── index.html          # Ana sayfa (Hero, Hakkında, Projeler, Araçlar, Takım, İletişim)
    ├── mission-budy.html   # Mission: Budy proje detay sayfası
    ├── viperadeck.html     # ViperaDeck proje detay sayfası
    ├── style.css           # Tüm site stilleri ve animasyonlar
    ├── app.js              # Typing animasyonu, scroll reveal, mobil nav, filtre, paylaş menüsü
    │
    ├── icons/              # SVG ikonlar
    │   ├── github.svg
    │   ├── linkedin.svg
    │   ├── instagram.svg
    │   ├── youtube.svg
    │   ├── x.svg
    │   ├── itchio.svg
    │   ├── medium.svg
    │   └── logo.svg
    │
    ├── pages/              # Proje alt sayfaları için görseller/medya
    │   ├── Games/mission-budy/images/...
    │   └── Apps/viperadeck/images/...
    │
    └── README.md           # Proje açıklaması ve kullanım rehberi

------------------------------------------------------------------------

## ⚙️ Teknik Detaylar

-   **Responsive Tasarım:** Tüm cihazlarda uyumlu (mobil / tablet /
    masaüstü).
-   **Animasyonlar:**
    -   `aurora`, `neonGridMove`, `starsDrift` → arka plan efektleri\
    -   `fadeIn`, `slideUp`, `pulse`, `bounce` → içerik animasyonları\
    -   Typing animasyonu → Hero başlığı
-   **Navigasyon:**
    -   Sticky üst menü\
    -   Mobil için hamburger menü (`aria-expanded`, `aria-controls`
        erişilebilirlik desteğiyle)\
-   **Projeler Bölümü:**
    -   Filtre sistemi (`data-category`)\
    -   Hover'da görsel/video önizleme\
    -   Paylaş menüsü + toast mesajı\
-   **İletişim:**
    -   Form gönderimi `mailto:` ile çalışıyor (istemci üzerinden)\
    -   Doğrudan e-posta linki: `viperadev@gmail.com`\
-   **Sosyal Medya:** GitHub, LinkedIn, Instagram, YouTube, X, itch.io,
    Medium

------------------------------------------------------------------------

## 🚀 Geliştirme Notları

1.  **Eksik içerik:**
    -   Proje detay sayfalarında medya alanları şimdilik "yakında"
        olarak işaretli. Görseller/video eklenecek.\
2.  **Performans:**
    -   `body::before` ve `body::after` GPU yoğun çalışıyor; gerekirse
        tek katman optimize edilebilir.\
3.  **SEO:**
    -   `og:image` tüm sayfalarda aynı (`og-image.jpg`). Proje bazlı
        görseller eklenmeli.\
4.  **UI iyileştirme:**
    -   Tag bileşenleri küçük cihazlarda sıkışabiliyor. Responsive
        padding/gap düzenlemesi gerekebilir.\
    -   Paylaş menüsü CSS içinde iki farklı `.share-menu` tanımı var,
        fazlalık temizlenmeli.

------------------------------------------------------------------------

## 🔑 Kullanım

Yerel geliştirme için:

``` bash
# Depoyu klonla
git clone https://github.com/ViperaDev/ViperaDev.com
cd ViperaDev.com

# index.html dosyasını tarayıcıda aç
```

Statik site olduğundan ekstra build gerektirmez.

------------------------------------------------------------------------

## 📌 Lisans & Telif

© 2025 **ViperaDev**\
*"Enter'a bas. Efsane başlasın."*\
Tüm hakları saklıdır.
