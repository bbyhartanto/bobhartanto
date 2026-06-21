---
title: 30 hari menguji batas kemampuan AI, Lean Product Development, dengan studi industri kalibrasi.
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

Saya menyempatkan 4 bulan terakhir ini untuk mundur satu langkah dan mengetes sebuah hipotesis:

::div{.thesis}
[Hipotesis Awal]{.tag}

"Jika AI sudah bisa mengambil alih 80% urusan 'menggambar interface', lalu di mana letak moat seorang Product Designer hari ini?"
::

Saya mengujinya lewat eksperimen yang *extremely lean*: Menggali potensi micro-SaaS di industri Kalibrasi.

Bekal saya cuma tiga: Lean framework, kemauan membongkar domain knowledge industri yang asing bagi saya, dan AI sebagai eksekutor yang memangkas jarak antara 'Ide' menjadi 'MVP'.

## \[\[1]{.step-number}Cari Masalah Terdekat, Sunk Cost Terendah]{.h2-inner}

Memilih Industri kalibrasi sebagai bahan riset bukan kebetulan — perusahaan kalibrasi ini milik seorang teman. Secara bisnis, lab kalibrasi adalah *underserved market* ERP yang sangat seksi: market size-nya terlalu kecil untuk dilirik raksasa ERP membuat produk yang spesifik di domain ini.

Saat memetakan bisnis prosesnya, saya menemukan kenyataan di lapangan: semua alur kerja dari alat masuk, diukur, dihitung standar deviasinya, sampai sertifikat keluar masih dikerjakan lewat Spreadsheet.

Bagi kacamata bisnis, spreadsheet adalah inefisiensi. Tapi bagi kacamata saya sebagai Desainer, *spreadsheet ini adalah "Proto-UI"*. User sebenarnya sudah punya **mental model** tentang data apa yang mau mereka masukkan; mereka hanya terjebak di alat yang terlalu generik.

## \[\[2]{.step-number}Membatasi "Biaya Gagal" (The CapEx Mindset)]{.h2-inner}

Riset ini dipatok 1 bulan, dengan biaya harus mendekati Rp0 (VS Code + Qwen versi gratisan).

Dalam business research saya selalu menggunakan filosofi lean startup milik Eric Ries:

> "A business experiment is prone to fail. If it has to die, it must die as cheap as possible."

Di sinilah ego saya sebagai desainer paling diuji. Saya harus menahan diri untuk tidak membuka Figma dan membuat Design System yang mulus.

::div{.thesis}
[Keputusan Desain]{.tag}

Di tahap validasi awal, menelantarkan estetika visual demi mempercepat pengujian "Core Logic" adalah bentuk keputusan desain yang paling legowo dari seorang desainer.
::

Detail yang saya kejar di tahap ini bukan pada pixel, melainkan pada **Data Mapping** proses kalibrasi: bagaimana merancang arsitektur database yang mampu menampung ribuan raw data pengukuran alat, mencocokkannya dengan reference data alat kalibrasi, lalu menghitung standard deviasi koreksi suhu ruang, klaim CMC.

## \[\[3]{.step-number}Memetakan Opportunity Cost lewat 4U Framework]{.h2-inner}

Dengan menggunakan framework dari Harvard Business School, saya menemukan titik kritis dimana ada peluang yang bisa di-solve:

::div{.tag-row}
[Unworkable]{.chip}[Unavoidable]{.chip}[Urgent]{.chip}[Undeserved]{.chip}
::

Yaitu pada proses pengukuran kalibrasi suatu mesin produksi — jika proses penghitungan deviasi dan worksheet terlalu lama, ini akan mengakibatkan sertifikat terlambat terbit.

::div{.chain}
**Sertifikat terlambat terbit**[→]{.arrow}**Mesin klien menganggur lebih lama**[→]{.arrow}**Invoice lab kalibrasi tertahan lebih lama**
::

Cashflow pun tersumbat dan klien dirugikan karena regulasi industri tidak mengizinkan mesin beroperasi dengan sertifikat yang kadaluarsa.

Mendigitalisasi proses ini bukan sekadar perkara "bikin UI yang modern", melainkan memangkas *Opportunity Cost* pemilik lab agar cashflow mereka cair 3 hari lebih cepat. Dari situlah tercetus ide untuk membuat *Sistem Kalibrasi* bernama **Skalasi**, sejenis ERP berbasis CRUD untuk menghitung nilai deviasi hingga menerbitkan sertifikat otomatis.

## Merelakan Ide

::div{.check-note}
  :::div{.body}
  **MVP Berhasil Berfungsi**

  Aplikasi Skalasi berhasil berdiri. Secara fungsi, ia sukses memangkas waktu hitung dan cetak sertifikat dari hitungan jam menjadi hitungan menit.
  :::
::

**Namun, tepat di titik ini pula saya memutuskan untuk membunuh Skalasi.** Ada dua tamparan realita yang saya dapatkan justru setelah kodenya jalan:

::div{.flag-note}
  :::div{.body}
  **Ancaman Scope Creep Permanen — The Moat Failure**

  Diuji lewat framework 3D (*Discontinuous, Defensible, Disruptive*), Skalasi gagal total di aspek **Defensible**. Business owner memberi tahu satu fakta lapangan: rumus hitung kalibrasi bisa berubah sewaktu-waktu mengikuti update regulasi dari KAN (Komite Akreditasi Nasional). Artinya, logic kodingan yang saya bangun berdiri di atas tanah goyang — begitu KAN merilis standar hitung baru, seluruh fungsi matematika di backend harus dirombak ulang. Tanpa moat yang kuat, project ini hanya akan menjadi sunk cost abadi.
  :::
::

::div{.flag-note}
  :::div{.body}
  **Ilusi Urgensi — "Nice to Have", Bukan "Must Have"**

  Respons pemilik lab saat melihat demo prototype Skalasi sangat positif. Tapi masalahnya, tidak ada binar kepanikan di matanya. Skala orderan mereka per bulan saat ini masih sepenuhnya ter-cover oleh Google Sheets. Mereka merasa 'repot', tapi rasa sakit itu belum cukup parah untuk menjustifikasi mereka keluar uang dan beradaptasi dengan software baru.
  :::
::

::div{.thesis}
[Hukum Alam Product Development]{.tag}

Kita tidak bisa menjual vitamin kepada orang yang sedang butuh painkiller.
::

## Kesimpulan

Secara finansial, eksperimen 4 bulan ini menghasilkan Rp0. Tapi secara mindset, ini adalah ROI terbesar saya di tahun ini.

Eksperimen ini menjawab tuntas pertanyaan saya di awal: *Ya, AI telah membuat biaya prototyping hingga nyaris menyentuh angka nol.* Dulu, untuk tahu apakah sebuah ide SaaS itu viable atau tidak, seorang founder harus membayar Software Agency 50 juta dan menunggu 3 bulan. Hari ini, saya bisa membuktikan bahwa ide itu unviable hanya dalam 30 hari, sendirian.

Kemudahan ini membawa satu prediksi logis: **Tahun 2026 akan dipenuhi oleh Noise.**

Akan lahir jutaan aplikasi baru yang mengalir deras ke pasar. Bukan karena aplikasi itu "dibutuhkan", melainkan semata-mata karena ia "bisa dibuat".

Dan di sanalah saya menemukan definisi ulang dari value seorang Senior Product Designer hari ini:

::div{.gauge-quote}
  :::div{.gauges}
    ::::div{.gauge}
      :::::div{.gauge-label}
      Gas — Eksekusi
      :::::
    ::::

    ::::div{.gauge}
      :::::div{.gauge-label}
      Rem — Intuisi Bisnis
      :::::
    ::::
  :::

AI memberikan kita [pedal gas]{.accent} untuk membangun apa saja dengan sangat cepat. Namun intuisi bisnis, ketajaman riset, dan kepekaan terhadap urgensi pasarlah yang menjadi [pedal rem]{.accent-brake}. Dan di jalanan yang turunannya sangat curam, yang menyelamatkan nyawa penumpang bukanlah seberapa kencang gasnya, melainkan seberapa presisi remnya.
::

Saya Bobby Hartanto. Saya siap kembali menginjak pedal gas dan pedal rem untuk perusahaan Anda di tahun 2026.

(Catatan lengkap mengenai pembedahan kasus kalibrasi dengan framework 4U & 3D ini sedang saya tuliskan dalam artikel terpisah.)

::div{.prompt-block}
["]{.q-mark}

Untuk rekan-rekan desainer, PM, atau engineer yang belakangan ini sedang asyik *vibe coding*: pernahkah kalian berada di momen di mana kalian "terlalu asyik nge-build fitur sampai lupa mengecek apakah user-nya beneran butuh"? Bagaimana cara kalian menyadarkan diri sendiri? Let's talk.
::

::div{.hashtags}
<span>#ProductDesign</span> <span>#LeanStartup</span> <span>#UIUX</span> <span>#SaaS</span> <span>#VibeCoding</span> <span>#BusinessAcumen</span> <span>#ProductManagement</span>
::
