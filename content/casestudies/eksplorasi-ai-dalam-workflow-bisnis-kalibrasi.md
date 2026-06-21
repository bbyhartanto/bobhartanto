---
title: Eksplorasi Ai dalam Workflow Bisnis Kalibrasi
category: Problem to Product
description: Jika AI sudah bisa mengambil alih 80% urusan menggambar interface, lalu di mana letak harga termahal seorang Product Designer hari ini? Saya mengujinya lewat eksperimen extremely lean menggali potensi micro-SaaS di industri Kalibrasi.
draft: false
focus: Strategy & Research
platform: Webiste, Laravel
role: Researcher, Business development
seo:
  title: Eksplorasi Ai dalam Workflow Bisnis Kalibrasi
  description: Jika AI sudah bisa mengambil alih 80% urusan menggambar interface, lalu di mana letak harga termahal seorang Product Designer hari ini? Saya mengujinya lewat eksperimen extreme lean menggali potensi micro-SaaS di industri Kalibrasi.
timeline: "2026"
---

<p>Saya menyempatkan 4 bulan terakhir ini untuk mundur satu langkah dan mengetes sebuah hipotesis:</p>

<div class="thesis">
    <span class="tag">Hipotesis Awal</span>
    <p>"Jika AI sudah bisa mengambil alih 80% urusan 'menggambar interface', lalu di mana letak moat seorang Product Designer hari ini?"</p>
</div>

<p>Saya mengujinya lewat eksperimen yang <em>extremely lean</em>: Menggali potensi micro-SaaS di industri Kalibrasi.</p>

<p>Bekal saya cuma tiga: Lean framework, kemauan membongkar domain knowledge industri yang asing bagi saya, dan AI sebagai eksekutor yang memangkas jarak antara 'Ide' menjadi 'MVP'.</p>

<h2 id="sec1"><span class="h2-inner"><span class="step-number">1</span>Cari Masalah Terdekat, Sunk Cost Terendah</span></h2>

<p>Memilih Industri kalibrasi sebagai bahan riset bukan kebetulan — perusahaan kalibrasi ini milik seorang teman. Secara bisnis, lab kalibrasi adalah <em>underserved market</em> ERP yang sangat seksi: market size-nya terlalu kecil untuk dilirik raksasa ERP membuat produk yang spesifik di domain ini.</p>

<p>Saat memetakan bisnis prosesnya, saya menemukan kenyataan di lapangan: semua alur kerja dari alat masuk, diukur, dihitung standar deviasinya, sampai sertifikat keluar masih dikerjakan lewat Spreadsheet.</p>

<p>Bagi kacamata bisnis, spreadsheet adalah inefisiensi. Tapi bagi kacamata saya sebagai Desainer, <mark class="reframe">spreadsheet ini adalah "Proto-UI"</mark>. User sebenarnya sudah punya <strong>mental model</strong> tentang data apa yang mau mereka masukkan; mereka hanya terjebak di alat yang terlalu generik.</p>

<h2 id="sec2"><span class="h2-inner"><span class="step-number">2</span>Membatasi "Biaya Gagal" (The CapEx Mindset)</span></h2>

<p>Riset ini dipatok 1 bulan, dengan biaya harus mendekati Rp0 (VS Code + Qwen versi gratisan).</p>

<p>Dalam business research saya selalu menggunakan filosofi lean startup milik Eric Ries:</p>

<blockquote>"A business experiment is prone to fail. If it has to die, it must die as cheap as possible."</blockquote>

<p>Di sinilah ego saya sebagai desainer paling diuji. Saya harus menahan diri untuk tidak membuka Figma dan membuat Design System yang mulus.</p>

<div class="thesis">
    <span class="tag">Keputusan Desain</span>
    <p>Di tahap validasi awal, menelantarkan estetika visual demi mempercepat pengujian "Core Logic" adalah bentuk keputusan desain yang paling legowo dari seorang desainer.</p>
</div>

<p>Detail yang saya kejar di tahap ini bukan pada pixel, melainkan pada <strong>Data Mapping</strong> proses kalibrasi: bagaimana merancang arsitektur database yang mampu menampung ribuan raw data pengukuran alat, mencocokkannya dengan reference data alat kalibrasi, lalu menghitung standard deviasi koreksi suhu ruang, klaim CMC.</p>

<h2 id="sec3"><span class="h2-inner"><span class="step-number">3</span>Memetakan Opportunity Cost lewat 4U Framework</span></h2>

<p>Dengan menggunakan framework dari Harvard Business School, saya menemukan titik kritis dimana ada peluang yang bisa di-solve:</p>

<div class="tag-row">
    <span class="chip">Unworkable</span>
    <span class="chip">Unavoidable</span>
    <span class="chip">Urgent</span>
    <span class="chip">Undeserved</span>
</div>

<p>Yaitu pada proses pengukuran kalibrasi suatu mesin produksi — jika proses penghitungan deviasi dan worksheet terlalu lama, ini akan mengakibatkan sertifikat terlambat terbit.</p>

<div class="chain">
    <b>Sertifikat terlambat terbit</b><span class="arrow">→</span><b>Mesin klien menganggur lebih lama</b><span class="arrow">→</span><b>Invoice lab kalibrasi tertahan lebih lama</b>
</div>

<p>Cashflow pun tersumbat dan klien dirugikan karena regulasi industri tidak mengizinkan mesin beroperasi dengan sertifikat yang kadaluarsa.</p>

<p>Mendigitalisasi proses ini bukan sekadar perkara "bikin UI yang modern", melainkan memangkas <mark class="reframe">Opportunity Cost</mark> pemilik lab agar cashflow mereka cair 3 hari lebih cepat. Dari situlah tercetus ide untuk membuat <em>Sistem Kalibrasi</em> bernama <strong>Skalasi</strong>, sejenis ERP berbasis CRUD untuk menghitung nilai deviasi hingga menerbitkan sertifikat otomatis.</p>

<h2 id="merelakan">Merelakan Ide</h2>

<div class="check-note">
    <svg class="icon" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#5C7A6E" stroke-width="1.6" />
        <path d="M7.5 12.5l3 3 6-6.5" stroke="#5C7A6E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <div class="body">
        <strong>MVP Berhasil Berfungsi</strong>
        <p>Aplikasi Skalasi berhasil berdiri. Secara fungsi, ia sukses memangkas waktu hitung dan cetak sertifikat dari hitungan jam menjadi hitungan menit.</p>
    </div>
</div>

<p><strong>Namun, tepat di titik ini pula saya memutuskan untuk membunuh Skalasi.</strong> Ada dua tamparan realita yang saya dapatkan justru setelah kodenya jalan:</p>

<div class="flag-note">
    <svg class="icon" viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 16.5h.01M10.3 3.9L2.7 17a1.8 1.8 0 0 0 1.55 2.7h15.5a1.8 1.8 0 0 0 1.55-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0z" stroke="#C44830" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <div class="body">
        <strong>Ancaman Scope Creep Permanen — The Moat Failure</strong>
        <p>Diuji lewat framework 3D (<em>Discontinuous, Defensible, Disruptive</em>), Skalasi gagal total di aspek <strong>Defensible</strong>. Business owner memberi tahu satu fakta lapangan: rumus hitung kalibrasi bisa berubah sewaktu-waktu mengikuti update regulasi dari KAN (Komite Akreditasi Nasional). Artinya, logic kodingan yang saya bangun berdiri di atas tanah goyang — begitu KAN merilis standar hitung baru, seluruh fungsi matematika di backend harus dirombak ulang. Tanpa moat yang kuat, project ini hanya akan menjadi sunk cost abadi.</p>
    </div>
</div>

<div class="flag-note">
    <svg class="icon" viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 16.5h.01M10.3 3.9L2.7 17a1.8 1.8 0 0 0 1.55 2.7h15.5a1.8 1.8 0 0 0 1.55-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0z" stroke="#C44830" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <div class="body">
        <strong>Ilusi Urgensi — "Nice to Have", Bukan "Must Have"</strong>
        <p>Respons pemilik lab saat melihat demo prototype Skalasi sangat positif. Tapi masalahnya, tidak ada binar kepanikan di matanya. Skala orderan mereka per bulan saat ini masih sepenuhnya ter-cover oleh Google Sheets. Mereka merasa 'repot', tapi rasa sakit itu belum cukup parah untuk menjustifikasi mereka keluar uang dan beradaptasi dengan software baru.</p>
    </div>
</div>

<div class="thesis">
    <span class="tag">Hukum Alam Product Development</span>
    <p>Kita tidak bisa menjual vitamin kepada orang yang sedang butuh painkiller.</p>
</div>

<h2 id="kesimpulan">Kesimpulan</h2>

<p>Secara finansial, eksperimen 4 bulan ini menghasilkan Rp0. Tapi secara mindset, ini adalah ROI terbesar saya di tahun ini.</p>

<p>Eksperimen ini menjawab tuntas pertanyaan saya di awal: <mark class="reframe">Ya, AI telah membuat biaya prototyping hingga nyaris menyentuh angka nol.</mark> Dulu, untuk tahu apakah sebuah ide SaaS itu viable atau tidak, seorang founder harus membayar Software Agency 50 juta dan menunggu 3 bulan. Hari ini, saya bisa membuktikan bahwa ide itu unviable hanya dalam 30 hari, sendirian.</p>

<p>Kemudahan ini membawa satu prediksi logis: <strong>Tahun 2026 akan dipenuhi oleh Noise.</strong></p>

<p>Akan lahir jutaan aplikasi baru yang mengalir deras ke pasar. Bukan karena aplikasi itu "dibutuhkan", melainkan semata-mata karena ia "bisa dibuat".</p>

<p>Dan di sanalah saya menemukan definisi ulang dari value seorang Senior Product Designer hari ini:</p>

<div class="gauge-quote">
    <div class="gauges">
        <div class="gauge">
            <svg width="64" height="40" viewBox="0 0 64 40">
                <path d="M6 36 A26 26 0 0 1 58 36" stroke="#3A372F" stroke-width="5" fill="none" stroke-linecap="round" />
                <path d="M6 36 A26 26 0 0 1 44 13" stroke="#D88A78" stroke-width="5" fill="none" stroke-linecap="round" />
                <line x1="32" y1="36" x2="46" y2="18" stroke="#F3EFE6" stroke-width="2" stroke-linecap="round" />
                <circle cx="32" cy="36" r="3" fill="#F3EFE6" />
            </svg>
            <div class="gauge-label">Gas — Eksekusi</div>
        </div>
        <div class="gauge">
            <svg width="64" height="40" viewBox="0 0 64 40">
                <path d="M6 36 A26 26 0 0 1 58 36" stroke="#3A372F" stroke-width="5" fill="none" stroke-linecap="round" />
                <path d="M6 36 A26 26 0 0 1 19 14" stroke="#E0A98C" stroke-width="5" fill="none" stroke-linecap="round" />
                <line x1="32" y1="36" x2="16" y2="20" stroke="#F3EFE6" stroke-width="2" stroke-linecap="round" />
                <circle cx="32" cy="36" r="3" fill="#F3EFE6" />
            </svg>
            <div class="gauge-label">Rem — Intuisi Bisnis</div>
        </div>
    </div>
    <p>AI memberikan kita <span class="accent">pedal gas</span> untuk membangun apa saja dengan sangat cepat. Namun intuisi bisnis, ketajaman riset, dan kepekaan terhadap urgensi pasarlah yang menjadi <span class="accent-brake">pedal rem</span>. Dan di jalanan yang turunannya sangat curam, yang menyelamatkan nyawa penumpang bukanlah seberapa kencang gasnya, melainkan seberapa presisi remnya.</p>
</div>

<p class="closing-sign">Saya Bobby Hartanto. Saya siap kembali menginjak pedal gas dan pedal rem untuk perusahaan Anda di tahun 2026.</p>

<p class="editor-note">(Catatan lengkap mengenai pembedahan kasus kalibrasi dengan framework 4U & 3D ini sedang saya tuliskan dalam artikel terpisah.)</p>

<div class="prompt-block">
    <span class="q-mark">"</span>
    <p>Untuk rekan-rekan desainer, PM, atau engineer yang belakangan ini sedang asyik <em>vibe coding</em>: pernahkah kalian berada di momen di mana kalian "terlalu asyik nge-build fitur sampai lupa mengecek apakah user-nya beneran butuh"? Bagaimana cara kalian menyadarkan diri sendiri? Let's talk.</p>
</div>

<div class="hashtags">
    <span>#ProductDesign</span><span>#LeanStartup</span><span>#UIUX</span><span>#SaaS</span><span>#VibeCoding</span><span>#BusinessAcumen</span><span>#ProductManagement</span>
</div>
