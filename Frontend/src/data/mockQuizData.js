// Quiz data: 5 soal per sub-modul, summary quiz per modul
// Format: { id, question, options, correct, explanation }

export const demoQuizzes = {
  // === IPA DASAR ===
  'ipa-dasar-sub1': [
    {
      id: 'ipa1_q1',
      question: 'Apa itu sel dalam biologi?',
      options: ['Satuan terkecil kehidupan', 'Bagian dari mitokondria', 'Jenis bakteri', 'Cairan tubuh'],
      correct: 'A',
      explanation: 'Sel adalah satuan terkecil kehidupan yang dapat melakukan semua fungsi kehidupan.'
    },
    {
      id: 'ipa1_q2',
      question: 'Organel sel yang berfungsi sebagai "pembangkit energi" adalah?',
      options: ['Ribosom', 'Mitokondria', 'Nukleus', 'Lisosom'],
      correct: 'B',
      explanation: 'Mitokondria menghasilkan energi (ATP) untuk kebutuhan sel melalui respirasi seluler.'
    },
    {
      id: 'ipa1_q3',
      question: 'Makhluk hidup yang tidak memiliki nukleus adalah?',
      options: ['Hewan', 'Bakteri', 'Tumbuhan', 'Fungi'],
      correct: 'B',
      explanation: 'Bakteri adalah prokariot yang tidak memiliki nukleus, sedangkan yang lain adalah eukariot.'
    },
    {
      id: 'ipa1_q4',
      question: 'Lingkungan abiotik adalah?',
      options: ['Semua makhluk hidup', 'Faktor fisik non-hidup seperti cuaca', 'Hanya hewan', 'Hanya tumbuhan'],
      correct: 'B',
      explanation: 'Faktor abiotik meliputi cahaya, suhu, air, tanah, dan udara yang tidak hidup.'
    },
    {
      id: 'ipa1_q5',
      question: 'Proses pemecahan glukosa yang menghasilkan energi disebut?',
      options: ['Fotosintesis', 'Respirasi seluler', 'Transpirasi', 'Evaporasi'],
      correct: 'B',
      explanation: 'Respirasi seluler memecah glukosa untuk menghasilkan ATP (energi) di mitokondria.'
    },
  ],
  'ipa-dasar-sub2': [
    {
      id: 'ipa2_q1',
      question: 'Rantai makanan dimulai dari?',
      options: ['Herbivora', 'Produsen (tumbuhan)', 'Karnivora', 'Dekomposer'],
      correct: 'B',
      explanation: 'Produsen (tumbuhan) adalah awal rantai makanan karena mereka memproduksi energi dari matahari.'
    },
    {
      id: 'ipa2_q2',
      question: 'Hewan yang memakan tumbuhan disebut?',
      options: ['Karnivora', 'Omnivora', 'Herbivora', 'Insektivora'],
      correct: 'C',
      explanation: 'Herbivora adalah hewan pemakan tumbuhan (konsumen primer).'
    },
    {
      id: 'ipa2_q3',
      question: 'Manakah yang bukan bagian dari ekosistem?',
      options: ['Tanah', 'Cahaya matahari', 'Mobil', 'Air hujan'],
      correct: 'C',
      explanation: 'Mobil adalah benda buatan manusia, bukan bagian dari ekosistem alami.'
    },
    {
      id: 'ipa2_q4',
      question: 'Bioma tempat hidup gajah secara alami adalah?',
      options: ['Tundra', 'Savana', 'Taiga', 'Desert'],
      correct: 'B',
      explanation: 'Gajah tinggal di savana (padang rumput dengan pohon jarang) di Afrika.'
    },
    {
      id: 'ipa2_q5',
      question: 'Jenis simbiosis dimana kedua pihak diuntungkan disebut?',
      options: ['Parasitisme', 'Mutualisme', 'Komensalisme', 'Predasi'],
      correct: 'B',
      explanation: 'Mutualisme adalah hubungan dimana kedua organisme saling menguntungkan.'
    },
  ],
  'ipa-dasar-sub3': [
    {
      id: 'ipa3_q1',
      question: 'Pencemaran udara paling banyak disebabkan oleh?',
      options: ['Asap pabrik', 'Emisi kendaraan', 'Pembakaran sampah', 'Semua benar'],
      correct: 'D',
      explanation: 'Semua sumber tersebut berkontribusi pada pencemaran udara di lingkungan kita.'
    },
    {
      id: 'ipa3_q2',
      question: 'Gas rumah kaca utama yang menyebabkan pemanasan global adalah?',
      options: ['Nitrogen', 'Karbon dioksida', 'Argon', 'Oksigen'],
      correct: 'B',
      explanation: 'CO₂ adalah gas rumah kaca utama yang terakumulasi di atmosfer.'
    },
    {
      id: 'ipa3_q3',
      question: 'Konservasi adalah?',
      options: ['Pemborosan sumber daya', 'Penggunaan berlebihan', 'Pelestarian dan penggunaan bijak', 'Pengolahan limbah'],
      correct: 'C',
      explanation: 'Konservasi berarti menjaga dan menggunakan sumber daya alam dengan bijak.'
    },
    {
      id: 'ipa3_q4',
      question: 'Manakah yang bukan sumber energi terbarukan?',
      options: ['Tenaga surya', 'Tenaga angin', 'Batu bara', 'Tenaga air'],
      correct: 'C',
      explanation: 'Batu bara adalah sumber energi fosil yang tidak terbarukan.'
    },
    {
      id: 'ipa3_q5',
      question: 'Dampak negatif dari deforestasi adalah?',
      options: ['Mengurangi polusi', 'Hilangnya habitat makhluk hidup', 'Meningkatkan udara bersih', 'Menurunkan suhu bumi'],
      correct: 'B',
      explanation: 'Deforestasi menghilangkan habitat alami banyak spesies dan berkontribusi pada perubahan iklim.'
    },
  ],

  // === BAHASA INDONESIA ===
  'bindo-narasi-sub1': [
    {
      id: 'bindo1_q1',
      question: 'Teks narasi adalah?',
      options: ['Teks yang menjelaskan sesuatu', 'Cerita yang menceritakan peristiwa berurutan', 'Teks persuasi', 'Daftar harga'],
      correct: 'B',
      explanation: 'Teks narasi adalah cerita yang menceritakan serangkaian peristiwa secara berurutan.'
    },
    {
      id: 'bindo1_q2',
      question: 'Bagian pertama dari struktur narasi disebut?',
      options: ['Klimaks', 'Pengenalan (Orientasi)', 'Resolusi', 'Epilog'],
      correct: 'B',
      explanation: 'Orientasi adalah bagian awal yang memperkenalkan tokoh, tempat, dan waktu cerita.'
    },
    {
      id: 'bindo1_q3',
      question: 'Orang ketiga dalam cerita disebut sebagai?',
      options: ['Penulis', 'Narator orang ketiga', 'Pembaca', 'Ilustrator'],
      correct: 'B',
      explanation: 'Narator orang ketiga menceritakan dari perspektif luar tentang tokoh-tokoh dalam cerita.'
    },
    {
      id: 'bindo1_q4',
      question: 'Bagian cerita yang paling menegangkan disebut?',
      options: ['Pengenalan', 'Komplikasi', 'Klimaks', 'Resolusi'],
      correct: 'C',
      explanation: 'Klimaks adalah puncak ketegangan dalam cerita sebelum menuju penyelesaian.'
    },
    {
      id: 'bindo1_q5',
      question: 'Manakah contoh kalimat narasi yang baik?',
      options: ['Tolong beli susu!', 'Pada pagi yang cerah, Raka berangkat ke sekolah.', 'Berapa harga buku ini?', 'Cobalah resep ini!'],
      correct: 'B',
      explanation: 'Kalimat narasi yang baik menceritakan peristiwa dengan detail dan urutan waktu yang jelas.'
    },
  ],
  'bindo-narasi-sub2': [
    {
      id: 'bindo2_q1',
      question: 'Apa itu dialog dalam cerita?',
      options: ['Deskripsi tempat', 'Percakapan antara tokoh', 'Nama penulis', 'Judul buku'],
      correct: 'B',
      explanation: 'Dialog adalah percakapan langsung antara dua atau lebih tokoh dalam cerita.'
    },
    {
      id: 'bindo2_q2',
      question: 'Tanda baca yang digunakan untuk dialog adalah?',
      options: ['Titik (.)', 'Koma (,)', 'Kutip (" ") atau tanda petik', 'Titik koma (;)'],
      correct: 'C',
      explanation: 'Tanda kutip digunakan untuk membatasi kata-kata yang diucapkan tokoh.'
    },
    {
      id: 'bindo2_q3',
      question: 'Manakah penulisan dialog yang benar?',
      options: ['"Halo" kata Ani.', 'Ani berkata "Halo.', '"Halo" Ani berkata', 'Halo, kata "Ani"'],
      correct: 'A',
      explanation: 'Penulisan yang benar adalah membuka dan menutup kutip serta menggunakan koma sebelum atribusi.'
    },
    {
      id: 'bindo2_q4',
      question: 'Fungsi dialog dalam cerita adalah?',
      options: ['Menambah halaman', 'Membuat cerita membosankan', 'Mengungkapkan kepribadian tokoh dan mempercepat alur', 'Hanya dekorasi'],
      correct: 'C',
      explanation: 'Dialog membantu pembaca memahami karakter, emosi, dan menggerakkan cerita maju.'
    },
    {
      id: 'bindo2_q5',
      question: 'Dalam narasi, kata sapaan yang formal adalah?',
      options: ['Lo', 'Loe', 'Saudara/Ibu/Pak', 'Eh'],
      correct: 'C',
      explanation: 'Dalam narasi formal, gunakan kata sapaan yang sopan seperti Saudara, Ibu, Pak, atau nama lengkap.'
    },
  ],
  'bindo-narasi-sub3': [
    {
      id: 'bindo3_q1',
      question: 'Alasan penulis menulis cerita disebut?',
      options: ['Plot', 'Tema', 'Motivasi atau Tujuan', 'Setting'],
      correct: 'C',
      explanation: 'Motivasi adalah alasan penulis menghadirkan cerita tertentu untuk pembaca.'
    },
    {
      id: 'bindo3_q2',
      question: 'Pesan moral dalam cerita disebut?',
      options: ['Alur', 'Amanat', 'Narasi', 'Deskripsi'],
      correct: 'B',
      explanation: 'Amanat adalah pesan atau pelajaran yang ingin penulis sampaikan kepada pembaca.'
    },
    {
      id: 'bindo3_q3',
      question: 'Manakah yang bukan unsur cerita?',
      options: ['Tokoh', 'Setting', 'Alur', 'Resep masakan'],
      correct: 'D',
      explanation: 'Resep masakan bukan unsur cerita fiksi; unsur cerita adalah tokoh, setting, alur, tema, dan amanat.'
    },
    {
      id: 'bindo3_q4',
      question: 'Cerita yang bagus harus memiliki?',
      options: ['Halaman banyak', 'Tokoh yang relatable dan alur yang menarik', 'Kata-kata sulit', 'Hanya satu karakter'],
      correct: 'B',
      explanation: 'Cerita yang bagus memiliki tokoh yang dapat dimengerti pembaca dan alur yang mengena hati.'
    },
    {
      id: 'bindo3_q5',
      question: 'Teknik bercerita yang membuat pendengar penasaran disebut?',
      options: ['Deskripsi', 'Suspense atau Ketegangan', 'Repetisi', 'Parodi'],
      correct: 'B',
      explanation: 'Suspense adalah teknik untuk membuat audiens merasa penasaran dan ingin tahu kelanjutannya.'
    },
  ],
  'bindo-narasi-sub4': [
    {
      id: 'bindo4_q1',
      question: 'Manakah yang termasuk gaya bahasa perbandingan?',
      options: ['Aliterasi', 'Simile (perumpamaan)', 'Onomatope', 'Ironi'],
      correct: 'B',
      explanation: 'Simile adalah gaya bahasa yang membandingkan dua hal berbeda dengan kata "seperti" atau "bagaikan".'
    },
    {
      id: 'bindo4_q2',
      question: 'Contoh simile yang tepat adalah?',
      options: ['Dia adalah matahari di kelasnya', 'Matanya seperti bintang bersinar', 'Tangan membeku', 'Dia berjalan cepat'],
      correct: 'B',
      explanation: '"Matanya seperti bintang bersinar" adalah simile karena membandingkan mata dengan bintang.'
    },
    {
      id: 'bindo4_q3',
      question: 'Gaya bahasa yang memberikan sifat manusia pada benda disebut?',
      options: ['Simile', 'Personifikasi', 'Metafora', 'Hiperbola'],
      correct: 'B',
      explanation: 'Personifikasi adalah gaya bahasa yang memberikan ciri-ciri manusia pada benda mati atau alam.'
    },
    {
      id: 'bindo4_q4',
      question: 'Contoh personifikasi adalah?',
      options: ['Bunga itu indah', 'Angin berbisik lembut', 'Bunga seperti gadis cantik', 'Bunga ada di taman'],
      correct: 'B',
      explanation: '"Angin berbisik" adalah personifikasi karena angin diberi sifat manusia (berbisik).'
    },
    {
      id: 'bindo4_q5',
      question: 'Gaya bahasa yang melebih-lebihkan disebut?',
      options: ['Hiperbola', 'Litotes', 'Ironi', 'Sinisme'],
      correct: 'A',
      explanation: 'Hiperbola adalah gaya bahasa yang melebih-lebihkan untuk memberikan kesan dramatik.'
    },
  ],

  // === BAHASA INGGRIS ===
  'binggris-basic-sub1': [
    {
      id: 'eng1_q1',
      question: 'Arti dari "Hello, how are you?" adalah?',
      options: ['Apa kabar?', 'Siapa nama Anda?', 'Berapa harga ini?', 'Di mana toko itu?'],
      correct: 'A',
      explanation: '"How are you?" adalah pertanyaan untuk menanyakan kabar seseorang.'
    },
    {
      id: 'eng1_q2',
      question: 'Respons yang tepat untuk "How are you?" adalah?',
      options: ['My name is Raka', 'I am fine, thank you', 'I like pizza', 'I go to school'],
      correct: 'B',
      explanation: '"I am fine, thank you" adalah respons standart yang polite untuk menanyakan kabar.'
    },
    {
      id: 'eng1_q3',
      question: 'Apa arti "What is your name?"?',
      options: ['Apa pekerjaan Anda?', 'Siapa nama Anda?', 'Di mana Anda tinggal?', 'Berapa umur Anda?'],
      correct: 'B',
      explanation: '"What is your name?" digunakan untuk menanyakan nama seseorang.'
    },
    {
      id: 'eng1_q4',
      question: 'Kalimat untuk memperkenalkan diri adalah?',
      options: ['I am Raka', 'My name is Raka', 'I am Raka from Indonesia', 'Semua benar'],
      correct: 'D',
      explanation: 'Semua kalimat tersebut adalah cara yang tepat untuk memperkenalkan diri dalam bahasa Inggris.'
    },
    {
      id: 'eng1_q5',
      question: 'Apa arti dari "Nice to meet you"?',
      options: ['Senang bertemu Anda', 'Siapa Anda?', 'Dari mana Anda?', 'Apa kabar Anda?'],
      correct: 'A',
      explanation: '"Nice to meet you" adalah ungkapan untuk menunjukkan kesenangan bertemu seseorang.'
    },
  ],
  'binggris-basic-sub2': [
    {
      id: 'eng2_q1',
      question: 'Arti dari "Where are you from?" adalah?',
      options: ['Ke mana Anda pergi?', 'Dari mana Anda?', 'Apa pekerjaan Anda?', 'Berapa umur Anda?'],
      correct: 'B',
      explanation: '"Where are you from?" menanyakan asal atau negara asal seseorang.'
    },
    {
      id: 'eng2_q2',
      question: 'Respons yang tepat untuk "Where are you from?" adalah?',
      options: ['I am student', 'I am from Indonesia', 'I like swimming', 'I have two sisters'],
      correct: 'B',
      explanation: '"I am from Indonesia" adalah respons yang tepat untuk menjawab asal usul.'
    },
    {
      id: 'eng2_q3',
      question: 'Apa arti dari "What do you do?"?',
      options: ['Apa yang Anda lakukan sekarang?', 'Apa pekerjaan Anda?', 'Apa hobi Anda?', 'Semua bisa benar'],
      correct: 'D',
      explanation: 'Pertanyaan ini bisa menanyakan aktivitas saat ini, pekerjaan, atau hobi tergantung konteksnya.'
    },
    {
      id: 'eng2_q4',
      question: 'Kalimat "I am a student" berarti?',
      options: ['Saya adalah guru', 'Saya seorang siswa', 'Saya bekerja di sekolah', 'Saya menyukai sekolah'],
      correct: 'B',
      explanation: '"I am a student" bermakna Anda adalah seorang pelajar/siswa.'
    },
    {
      id: 'eng2_q5',
      question: 'Manakah kalimat pekerjaan yang benar?',
      options: ['I work like doctor', 'I am work as a doctor', 'I am a doctor', 'I work doctor'],
      correct: 'C',
      explanation: '"I am a doctor" adalah cara yang tepat untuk menyatakan profesi.'
    },
  ],
  'binggris-basic-sub3': [
    {
      id: 'eng3_q1',
      question: 'Arti dari "I like..." adalah?',
      options: ['Saya tidak suka', 'Saya menyukai', 'Saya membenci', 'Saya lupa'],
      correct: 'B',
      explanation: '"I like" adalah ungkapan untuk menunjukkan kesukaan terhadap sesuatu.'
    },
    {
      id: 'eng3_q2',
      question: 'Manakah kalimat kesukaan yang benar?',
      options: ['I like to eat pizza', 'I like eating pizza', 'I like pizza', 'Semua benar'],
      correct: 'D',
      explanation: 'Ketiga bentuk tersebut sama-sama benar dan digunakan dalam bahasa Inggris.'
    },
    {
      id: 'eng3_q3',
      question: 'Arti dari "I dislike" adalah?',
      options: ['Saya tidak suka', 'Saya menyukai', 'Saya cinta', 'Saya takut'],
      correct: 'A',
      explanation: '"I dislike" berarti Anda tidak menyukai atau tidak gemar terhadap sesuatu.'
    },
    {
      id: 'eng3_q4',
      question: 'Apa lawan dari "I like"?',
      options: ['I love', 'I hate', 'I know', 'I see'],
      correct: 'B',
      explanation: '"I hate" adalah lawan dari "I like"; keduanya mengekspresikan preferensi berlawanan.'
    },
    {
      id: 'eng3_q5',
      question: 'Kalimat "I love football" berarti?',
      options: ['Saya tidak suka sepak bola', 'Saya menyukai sepak bola', 'Saya takut sepak bola', 'Saya bermain sepak bola'],
      correct: 'B',
      explanation: '"I love" menunjukkan kesukaan yang lebih kuat daripada "I like".'
    },
  ],
  'binggris-basic-sub4': [
    {
      id: 'eng4_q1',
      question: 'Apa arti dari "What is this?"',
      options: ['Apa itu?', 'Di mana itu?', 'Siapa itu?', 'Kapan itu?'],
      correct: 'A',
      explanation: '"What is this?" digunakan untuk menanyakan identitas benda yang dekat.'
    },
    {
      id: 'eng4_q2',
      question: 'Respons untuk "What is this?" bisa berupa?',
      options: ['This is a pen', 'This is a book', 'This is an apple', 'Semua benar'],
      correct: 'D',
      explanation: 'Semua respons tersebut adalah jawaban yang tepat tergantung benda yang ditunjuk.'
    },
    {
      id: 'eng4_q3',
      question: 'Perbedaan "This" dan "That" adalah?',
      options: ['Tidak ada perbedaan', '"This" untuk dekat, "That" untuk jauh', '"This" untuk jauh, "That" untuk dekat', 'Keduanya sama'],
      correct: 'B',
      explanation: '"This" untuk benda yang dekat, "That" untuk benda yang jauh dari pembicara.'
    },
    {
      id: 'eng4_q4',
      question: 'Kalimat "That is a house" berarti?',
      options: ['Ini adalah rumah', 'Itu adalah rumah (yang jauh)', 'Itu adalah toko', 'Itu adalah sekolah'],
      correct: 'B',
      explanation: '"That" menunjuk benda yang letaknya jauh dari pembicara.'
    },
    {
      id: 'eng4_q5',
      question: 'Artikel "a" dan "an" digunakan untuk?',
      options: ['Benda jamak', 'Benda tunggal', 'Kata kerja', 'Kata sifat'],
      correct: 'B',
      explanation: '"a" dan "an" adalah artikel untuk kata benda tunggal (singular).'
    },
  ],

  // === SUMMARY QUIZ ===
  'ipa-dasar-summary': [
    {
      id: 'ipa_sum_1',
      question: 'Manakah yang merupakan definisi ekosistem?',
      options: ['Hanya tumbuhan', 'Komunitas organisme dan lingkungan fisiknya yang saling berinteraksi', 'Hanya hewan', 'Hanya tanah'],
      correct: 'B',
      explanation: 'Ekosistem adalah sistem yang terdiri dari organisme dan lingkungan fisiknya.'
    },
    {
      id: 'ipa_sum_2',
      question: 'Mitokondria menghasilkan?',
      options: ['Protein', 'Lemak', 'Energi (ATP)', 'Vitamin'],
      correct: 'C',
      explanation: 'Mitokondria adalah "pembangkit energi" yang menghasilkan ATP untuk sel.'
    },
    {
      id: 'ipa_sum_3',
      question: 'Produsen dalam rantai makanan adalah?',
      options: ['Karnivora', 'Tumbuhan', 'Bakteri', 'Omnivora'],
      correct: 'B',
      explanation: 'Tumbuhan (produsen) mengubah energi matahari menjadi energi kimia.'
    },
    {
      id: 'ipa_sum_4',
      question: 'Gas yang menyebabkan efek rumah kaca utama adalah?',
      options: ['Nitrogen', 'Oksigen', 'Karbon dioksida', 'Argon'],
      correct: 'C',
      explanation: 'CO₂ adalah gas rumah kaca yang paling berkontribusi pada pemanasan global.'
    },
    {
      id: 'ipa_sum_5',
      question: 'Konservasi bertujuan untuk?',
      options: ['Mengganti alam', 'Menjaga dan menggunakan sumber daya secara bijak', 'Mengambil semua', 'Tidak ada tujuan'],
      correct: 'B',
      explanation: 'Konservasi adalah upaya melestarikan alam untuk generasi mendatang.'
    },
  ],

  'bindo-narasi-summary': [
    {
      id: 'bindo_sum_1',
      question: 'Struktur narasi yang benar adalah?',
      options: ['Pengenalan - Komplikasi - Klimaks - Penyelesaian', 'Klimaks - Pengenalan - Penyelesaian', 'Penyelesaian - Pengenalan', 'Tanpa urutan'],
      correct: 'A',
      explanation: 'Struktur narasi: Orientasi → Komplikasi → Klimaks → Resolusi → Koda.'
    },
    {
      id: 'bindo_sum_2',
      question: 'Dialog harus ditulis dengan tanda?',
      options: ['Kurung ()', 'Kutip (" ")', 'Kurung siku []', 'Garis miring (/)'],
      correct: 'B',
      explanation: 'Dialog ditandai dengan tanda kutip ("...") untuk membedakan dari narasi.'
    },
    {
      id: 'bindo_sum_3',
      question: 'Pesan moral dalam cerita disebut?',
      options: ['Plot', 'Amanat', 'Tema', 'Ironi'],
      correct: 'B',
      explanation: 'Amanat adalah pesan atau pembelajaran yang ingin penulis sampaikan.'
    },
    {
      id: 'bindo_sum_4',
      question: 'Gaya bahasa membandingkan dengan kata "seperti" disebut?',
      options: ['Personifikasi', 'Metafora', 'Simile', 'Hiperbola'],
      correct: 'C',
      explanation: 'Simile adalah perbandingan langsung dengan kata "seperti" atau "bagaikan".'
    },
    {
      id: 'bindo_sum_5',
      question: 'Personifikasi adalah gaya bahasa yang?',
      options: ['Melebih-lebihkan', 'Memberi sifat manusia pada benda', 'Membandingkan', 'Mengulangi'],
      correct: 'B',
      explanation: 'Personifikasi memberikan ciri/sifat manusia kepada benda atau alam.'
    },
  ],

  'binggris-basic-summary': [
    {
      id: 'eng_sum_1',
      question: 'Cara memperkenalkan diri dalam bahasa Inggris adalah?',
      options: ['What is your name?', 'My name is... / I am...', 'Where are you?', 'How old are you?'],
      correct: 'B',
      explanation: '"My name is..." atau "I am..." digunakan untuk memperkenalkan diri.'
    },
    {
      id: 'eng_sum_2',
      question: 'Manakah kalimat yang tepat?',
      options: ['I am from Indonesia', 'I am Indonesia', 'I Indonesia', 'I from'],
      correct: 'A',
      explanation: '"I am from [country]" adalah struktur yang benar.'
    },
    {
      id: 'eng_sum_3',
      question: 'Perbedaan "a" dan "an" adalah?',
      options: ['Tidak ada', '"a" sebelum vokal, "an" sebelum konsonan', '"a" sebelum konsonan, "an" sebelum vokal', 'Berbeda makna'],
      correct: 'C',
      explanation: '"a" untuk konsonan, "an" untuk vokal (a, e, i, o, u).'
    },
    {
      id: 'eng_sum_4',
      question: 'Demonstrative pronoun yang benar adalah?',
      options: ['"This" untuk jauh, "That" untuk dekat', '"This" untuk dekat, "That" untuk jauh', 'Keduanya sama', 'Tidak ada perbedaan'],
      correct: 'B',
      explanation: '"This" = dekat; "That" = jauh dari pembicara.'
    },
    {
      id: 'eng_sum_5',
      question: 'Manakah bentuk kesukaan yang benar?',
      options: ['I like to pizza', 'I like pizza', 'I like of pizza', 'I like in pizza'],
      correct: 'B',
      explanation: '"I like + noun" adalah struktur yang benar.'
    },
  ],
};

// Helper function to get quiz by ID
export const getQuizById = (quizId) => demoQuizzes[quizId] || [];

// Helper function to get all quizzes for a module
export const getModuleQuizzes = (moduleId) => {
  const quizzes = {};
  const submodulesCount = {
    'ipa-dasar': 3,
    'bindo-narasi': 4,
    'binggris-basic': 4,
  };

  for (let i = 1; i <= (submodulesCount[moduleId] || 0); i++) {
    const key = `${moduleId}-sub${i}`;
    quizzes[key] = demoQuizzes[key] || [];
  }

  return quizzes;
};
