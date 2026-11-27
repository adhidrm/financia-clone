export type SiteRoute = "/" | "/tentang-kami/" | "/hubungi-kami/";

export type NavItem = {
  label: string;
  href: string;
  active?: SiteRoute;
  children?: { label: string; href: string; external?: boolean }[];
  external?: boolean;
  /** rendered as the teal filled block in the desktop nav */
  variant?: "teal";
};

export const NAV: NavItem[] = [
  { label: "Home", href: "/", active: "/" },
  { label: "Tentang Kami", href: "/tentang-kami/", active: "/tentang-kami/" },
  {
    label: "Cara Kerja Kami",
    href: "/#cara-kerja",
    // In-page anchors count as current on the homepage (WordPress
    // current-menu-ancestor), so they show yellow there.
    active: "/",
    children: [
      { label: "Biaya Komisi", href: "https://financia.co.id/biaya-komisi", external: true },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  { label: "Jenis Utang", href: "/#jenis-utang" },
  { label: "Klien/Mitra", href: "/#klien-mitra" },
  { label: "Hubungi Kami", href: "/hubungi-kami/", active: "/hubungi-kami/", variant: "teal" },
];

// Real deep link, recovered from the staging site (financia.proximalab.fyi).
const WA_PHONE = "https://api.whatsapp.com/send/?phone=62811176136";
const WA_TAIL = "&app_absent=0";

export const WHATSAPP =
  `${WA_PHONE}&text=Terimakasih+telah+menghubungi+financia.co.id+.+Mohon+diinfokan+untuk+kebutuhan+Anda+dari+layanan+kami....` +
  WA_TAIL;

export const WHATSAPP_CONSULT =
  `${WA_PHONE}&text=Terimakasih+telah+menghubungi+financia.co.id+.+Mari+konsultasikan+kebutuhan+Anda+dari+layanan+kami....` +
  WA_TAIL;

export const ABOUT_COLUMNS = [
  {
    heading:
      "Apapun Bisnis Anda, Financia adalah Solusi Penagihan Htang Komersial yang Praktis, Efisien dan Aman",
    paragraphs: [
      "Kami paham bahwa utang yang telah jatuh waktu dan belum dibayar lunas dapat mengganggu operasional serta mempengaruhi arus kas atau bahkan menyebabkan kerugian dalam skala yang kompleks di pembukuan keuangan.",
      "Tetapi jika Anda melakukan penagihan hutang sendiri, upaya tersebut kerap berakhir gagal dan diperlukan biaya besar yang harus dikeluarkan di depan dan serta waktu yang berlarut-larut. Anda mungkin berpikir untuk menghapus tagihan/piutang (accounts receivable) tak tertagih karena sulitnya menagih.",
    ],
  },
  {
    heading: "Anda Jangan Menyerah Dulu!",
    paragraphs: [
      "Financia siap memberikan layanan jasa penagihan hutang yang aman dan sesuai dengan ketentuan hukum. Kami akan menyediakan tim advokat (lawyer) yang memiliki keahlian khusus di bidang hukum komersial bagi Anda untuk melakukan penagihan utang komersial bagi Anda.",
      "Anda tidak perlu mengeluarkan biaya penagihan berupa komisi (comission fee) di muka. Melainkan, Anda hanya akan mengeluarkan biaya penagihan tersebut apabila Anda telah benar-benar menerima pembayaran atas utang.",
    ],
  },
];

export const STEPS = [
  {
    icon: "edit" as const,
    title: "Langkah Pertama: Assessment",
    body: "Financia akan memulai dengan melakukan assessment atas informasi atau data terkait utang yang Anda berikan. Hal ini dilakukan untuk menilai validitas utang dari segi hukum",
  },
  {
    icon: "mail" as const,
    title: "Langkah Kedua: Upaya Non-Litigasi",
    body: "Jika kami menilai bahwa utang adalah valid, secepatnya Financia akan melakukan proses penagihan utang di luar pengadilan (non-litigasi). Pada tahap ini, Financia akan menyampaikan surat peringatan untuk membayar (somasi) kepada pihak yang berutang, maupun negosiasi dan mediasi apabila hal ini diperlukan. Apabila upaya ini berakhir dengan perdamaian, maka kami akan menyiapkan dokumen hukum yang diperlukan agar kepentingan hukum Anda terjaga dengan baik",
  },
  {
    icon: "money" as const,
    title: "Langkah Ketiga:",
    subtitle: "Upaya Penagihan Secara Litigasi",
    body: "Apabila penagihan secara non-litigasi tidak membuahkan hasil, maka Financia akan mengerahkan tim advokat untuk melakukan upaya hukum terhadap pihak yang berutang di pengadilan atau badan arbitrase yang berwenang. Tidak menutup kemungkinan pada saat upaya hukum sedang berjalan, negosiasi dan mediasi tetap dilakukan sehingga penyelesaian utang tetap bisa diupayakan secepat mungkin. Upaya hukum yang akan dilakukan dapat berupa gugatan perdata yang disertai dengan permohonan sita jaminan, permohonan kepailitan atau penundaan kewajiban pembayaran utang, dan membuat laporan polisi. Penerapan upaya hukum tersebut diterapkan secara kasuistik.",
  },
];

export const DEBT_TYPES = {
  intro:
    "Financia menyediakan jasa penagih hutang komersial yang praktis, efektif dan aman. Berbagai jenis utang komersial yang dapat Financia tangani, antara lain berhubungan dengan:",
  items: [
    "Kredit atau pinjam meminjam uang (loan transaction)",
    "Perdagangan atau piutang dagang (accounts receivable)",
    "Penyediaan jasa (service supply contract)",
    "Pembelian properti (property acquisition)",
    "Sewa menyewa properti dan barang (lease of goods and property)",
    "Penempatan dana dalam bentuk simpanan (savings)",
    "Klaim asuransi (insurance claim)",
  ],
  industriesIntro:
    "Jasa penagih hutang yang kami berikan bisa diterapkan di hampir semua industri, dan beberapa industri yang pernah kami tangani antara lain:",
  industries: [
    "Konstruksi",
    "Pertambangan",
    "Keuangan",
    "Properti",
    "Informasi & Telekomunikasi",
    "Profesional",
    "Manufaktur",
    "Perhotelan",
    "Retail",
  ],
};

type Cell = { src?: string; w?: number; h?: number };
type Row = { cells: Cell[] };

export const CLIENT_ROWS: Row[] = [
  {
    cells: [
      { src: "/sites/financia/logos/qingjian.png", w: 119, h: 72 },
      { src: "/sites/financia/logos/batubara.png", w: 144, h: 50 },
      { src: "/sites/financia/logos/wagely.jpg", w: 137, h: 67 },
      { src: "/sites/financia/logos/bpr-mangun.png", w: 300, h: 77 },
    ],
  },
  {
    cells: [
      { src: "/sites/financia/logos/mangun-capital.jpg", w: 250, h: 67 },
      { src: "/sites/financia/logos/mbs.png", w: 100, h: 100 },
      { src: "/sites/financia/logos/mahadata.png", w: 300, h: 212 },
      { src: "/sites/financia/logos/loesche.jpg", w: 222, h: 72 },
    ],
  },
  {
    cells: [
      { src: "/sites/financia/logos/bunge.png", w: 250, h: 58 },
      { src: "/sites/financia/logos/chec.jpg", w: 250, h: 130 },
      { src: "/sites/financia/logos/deme.jpg", w: 250, h: 72 },
      { src: "/sites/financia/logos/dockwise.png", w: 103, h: 114 },
    ],
  },
  {
    cells: [
      { src: "/sites/financia/logos/gardline.png", w: 250, h: 64 },
      { src: "/sites/financia/logos/keda.png", w: 250, h: 68 },
      { src: "/sites/financia/logos/khansaheb.jpeg", w: 110, h: 110 },
      { src: "/sites/financia/logos/khansaheb-logo.jpg", w: 128, h: 128 },
    ],
  },
  {
    cells: [
      { src: "/sites/financia/logos/lunar.jpg", w: 178, h: 114 },
      { src: "/sites/financia/logos/standard-oil.png", w: 140, h: 140 },
      { src: "/sites/financia/logos/uralkali.png", w: 195, h: 130 },
      { src: "/sites/financia/logos/veliche.jpg", w: 188, h: 116 },
    ],
  },
  {
    cells: [
      {},
      { src: "/sites/financia/logos/wakachiku.jpg", w: 173, h: 151 },
      { src: "/sites/financia/logos/yara.png", w: 148, h: 148 },
      { src: "/sites/financia/logos/ambev.png", w: 198, h: 49 },
    ],
  },
];

export const WHY = [
  {
    title: "Profesional",
    body: "Financia adalah layanan jasa penagihan hutang yang didukung oleh tenaga profesional. Kami berkerja dengan cara-cara yang sesuai dengan hukum yang berlaku di Indonesia, sehingga bisa dipertanggungjawabkan secara hukum dan aman untuk para klien kami.",
  },
  {
    title: "Efektif & Efisien",
    body: "Financia memiliki SOP yang terbukti dan teruji efektif untuk melakukan penagihan utang komersial sehingga piutang/tagihan Anda dibayar oleh mitra bisnis Anda. Sudah banyak perkara utang-piutang yang sukses kami tangani dengan metode kami. Metode kami juga efisien karena Anda hanya membayar biaya komisi (commission fee) jika Anda telah menerima pembayaran atas piutang/tagihan.",
  },
  {
    title: "Biaya Masuk Akal",
    body: "Pada dasarnya kami senang membantu Anda mendapatkan apa yang menjadi hak Anda. Oleh karena itu, Financia menggunakan struktur biaya komisi (commission fee) yang masuk akal dan tidak memberatkan secara ekonomi bagi Anda.",
  },
  {
    title: "Tidak Ada Biaya Tersembunyi",
    body: "Layanan jasa penagihan utang Financia dibuat dengan sangat transparan. Kami jamin, tidak ada biaya layanan tersembunyi yang kami tetapkan untuk mengambil keuntungan dari Anda. Setiap biaya kami ungkapkan di awal dan berdasarkan persetujuan Anda.",
  },
  {
    title: "Laporan Up to Date",
    body: "Setiap upaya yang kami lakukan, selalu kami laporkan kepada klien secara berkala dan informatif sehingga klien kami mengetahui dengan jelas perkembangan upaya penagihan yang kami lakukan.",
  },
  {
    title: "Kerahasiaan",
    body: "Financia sangat berkomitmen untuk menjaga kerahasiaan setiap data atau informasi yang Anda berikan. Kami tidak akan menggunakan atau mengungkapkan kepada pihak manapun data atau informasi tersebut selain untuk tujuan penagihan utang.",
  },
  {
    title: "Konsultasi Gratis",
    body: "Layanan konsultasi Financia tersedia secara gratis dengan dukungan tenaga profesional. Hubungi kami segera.",
  },
];

export const METRICS = [
  { value: 100, suffix: "%", title: "Klien Kami Puas atas Layanan yang Kami Berikan", bg: "/sites/financia/bg/pexels-pixabay-327540.jpg" },
  { value: 155, suffix: "+", title: "Total Klien Financia", bg: "/sites/financia/bg/picture-88.jpg" },
  { value: 125, suffix: "", title: "Repeat Order", bg: "/sites/financia/bg/pexels-energepiccom-561458.jpg" },
];

export const FAQ = [
  {
    q: "1. Apa itu Financia?",
    a: "Financia adalah perusahaan yang menyediakan jasa penagihan utang yang praktis, efisien, aman dan tunduk pada hukum yang berlaku di Indonesia. Financia akan menyediakan tim advokat (lawyer) yang memiliki keahlian khusus di bidang hukum komersial dalam melakukan penagihan utang. Penagihan utang yang dilakukan bisa melalui jalur non-litigasi maupun litigasi dimana akan diterapkan secara kasuistik.",
  },
  {
    q: "2. Utang komersial apa saja yang bisa dilakukan penagihan oleh Financia?",
    a: "Pada dasarnya setiap utang yang lahir dari transaksi komersial/bisnis sepanjang menurut kami sah secara hukum dapat dilakukan penagihan oleh kami. Jika Anda masih ragu apakah utang yang hendak Anda tagih termasuk utang komersial atau tidak, silahkan konsultasikan dengan kami.",
  },
  {
    q: "3. Apakah ada nilai minimum utang atau tagihan/piutang (accounts receivable) yang dapat dilakukan penagihannya melalui Financia?",
    a: "Ada, nilai minimum utang atau tagihan/piutang (accounts receivable) yang dapat dilakukan penagihannya melalui Financia adalah sebesar atau setara Rp. 500.000.000,-.",
  },
  {
    q: "4. Kenapa Anda perlu jasa penagihan utang komersial dari Financia?",
    a: "Menagih utang di Indonesia tidak mudah, bahkan termasuk tersulit apabila dibanding dengan banyak negara lain. Masing-masing transaksi komersial memiliki karakteristik dan serta pengaturan yang berbeda. Jika tidak dilakukan dengan cara yang tepat, menagih utang hanya akan menghabiskan biaya lebih besar dari nilai tagihan/piutang Anda.",
  },
  {
    q: "5. Berapa lama proses penagihan hutang komersial akan berlangsung?",
    a: "Kami memahami konsep time value of money sehingga kami berusaha Anda bisa mendapatkan pembayaran secepat mungkin. Tetapi hal ini sangat bergantung pada seberapa kompleks permasalahan utang-piutang yang Anda miliki. Pada dasarnya, kami senang membantu Anda untuk segera mendapatkan pembayaran yang menjadi hak Anda.",
  },
  {
    q: "6. Berapa biaya komisi (commision fee) Financia?",
    a: "Pada dasarnya biaya komisi (commision fee) merupakan komisi keberhasilan (success fee). Dalam menentukan besaran biaya komisi (commision fee), kami menggunakan struktur komisi berkisar 1% s.d. 30% dari jumlah utang yang Anda terima pembayarannya dari pihak yang berutang. Selama Anda belum menerima pembayaran atas utang, Anda tidak perlu membayar biaya komisi.",
  },
  {
    q: "7. Apa saja yang perlu saya persiapkan agar proses penagihan utang melalui Financia bisa dimulai?",
    a: "Anda hanya perlu siapkan data yang berkaitan dengan utang, menghubungi kami, dan kemudian memberikan kuasa kepada kami agar kami yang bisa segera bertindak untuk dan atas nama Anda dalam melakukan penagihan utang.",
  },
  {
    q: "8. Apakah reputasi perusahaan tetap terjaga baik jika memakai jasa pihak ketiga untuk penagihan utang?",
    a: "Kami memahami bahwa reputasi perusahaan dan hubungan baik dengan mitra bisnis Anda sangat penting. Karena itu, Financia selalu bertindak sesuai dengan koridor hukum yang berlaku di Indonesia dan memperhatikan standar etika bisnis.",
  },
  {
    q: "9. Apakah menggunakan Financia aman dan terpercaya?",
    a: "Sangat aman karena Anda akan diwakilkan oleh para profesional yang terdiri dari advokat (lawyer) yang berpengalaman khususnya dalam ilmu hukum bisnis. Kami dapat dipercaya karena kami memegang teguh etika profesi dan standar etika bisnis.",
  },
  {
    q: "10. Mencakup wilayah mana saja layanan Financia?",
    a: "Layanan Financia bisa diberikan di seluruh wilayah Indonesia.",
  },
];

export const CONTACT = [
  {
    icon: "pin" as const,
    title: "Kantor Pusat :",
    lines: [
      "Sudirman Park, Unit A 3 BB. Jl. K.H.",
      "Mas Mansyur Kav. 35, Karet Tengsin.",
      "Jakarta Pusat. DKI Jakarta.",
    ],
  },
  { icon: "mail" as const, title: "Email:", lines: ["office@financia.co.id"] },
  { icon: "clock" as const, title: "Open Hours:", lines: ["Senin - Jum'at: 8.00 -6.00 WIB"] },
];

/* ---------- staging pages (financia.proximalab.fyi) ---------- */

export const ABOUT_ARTICLE = [
  {
    heading: "Apa itu Financia?",
    paragraphs: [
      "PT Garda Finansial Utama (“Financia”) adalah perusahaan agensi penagihan hutang komersial yang praktis, efisien dan aman bagi Anda. Kami akan menyediakan tim advokat (lawyer) yang memiliki keahlian khusus di bidang hukum komersial bagi Anda dalam melakukan penagihan utang.",
      "Mengapa dalam penagihan hutang, Anda memerlukan jasa penagihan hutang profesional hukum  yang memiliki keahlian khusus di bidang hukum? Sebab utang-piutang sendiri merupakan suatu masalah hukum sehingga penyelesaiannya harus sesuai dengan dan dilakukan oleh seseorang yang memiliki keahlian ilmu hukum, agar tujuan Anda tercapai tanpa menimbulkan permasalahan hukum baru bagi Anda.",
      "Cara lain yang umumnya dilakukan oleh pihak yang memiliki tagihan/piutang (accounts receivable) adalah menyewa jasa penagihan utang (debt collector) yang kerap kali mengutamakan pendekatan intimidasi dan kekerasan dalam melakukan penagihan. Bukannya mendapatkan pembayaran, melainkan kerap kali yang terjadi justru muncul masalah baru karena si penagih melakukan pelanggaran hukum yang menjurus ke perbuatan pidana.",
    ],
  },
  {
    heading: "",
    paragraphs: [
      "Karena itu, Financia memberikan jalan keluar terbaik dengan menyediakan layanan penagihan utang yang praktis, efisien dan aman. Layanan yang Financia sediakan khusus untuk menyelesaikan masalah penagihan utang komersial (commercial debt) dimana didasarkan pada dari suatu transaksi bisnis (business-to-business).",
      "Penagihan hutang yang Financia lakukan dikerjakan oleh tim profesional berpengalaman. Kami siap menerapkan berbagai pendekatan hukum, baik non-litigasi (negosiasi dan mediasi) dan litigasi (upaya hukum di pengadilan) yang diterapkan secara kasuistik. Jasa penagihan yang Financia kerjakan mencakup penagihan utang terhadap perusahaan maupun individu/perseorangan.",
      "Anda tidak perlu mengeluarkan biaya komisi (professinal fee) di muka. Besaran biaya komisi yang Financia akan kenakan kepada Anda menggunakan sistem keberhasilan (success fee basis) atas jumlah utang yang Anda terima pembayarannya dari pihak yang berutang.",
    ],
  },
];

export const SURVEY_ITEMS = [
  "Kondisi bisnis internal perusahaan menyumbang 27% penyebab utama kebangkrutan, dimana salah satunya adalah karena pengelolaan tagihan/piutang (accounts receivable) yang salah (menurut studi U.S. Small Business Administration).",
  "Banyak perusahaan menuju kebangkrutan bukan karena bisnis yang tidak menguntungkan, melainkan karena kondisi keuangan perusahaan yang tidak sehat akibat banyak tagihan/piutang perusahaan (accounts receivable) yang macet atau tidak mendapatkan pembayaran dari lawan transaksi.",
  "Biaya penagihan utang di Indonesia sangat mahal. Nilai rata-ratanya mencapai 74% dari utang (menurut Doing Business 2020 terbitan Bank Dunia).",
  "Tagihan/piutang (accounts receivable) macet tidak hanya membuat laporan keuangan terlihat buruk, tetapi juga berpotensi mengganggu kelangsungan bisnis.",
];

export const FAILURE_REASONS = [
  "Pemilik tagihan/piutang (accounts receivable) atau kreditor tidak mengetahui strategi maupun teknik yang tepat dan efektif;",
  "Pemilik tagihan/piutang (accounts receivable) atau kreditor tidak memiliki sumber daya manusia yang memiliki keahlian untuk melakukan penagihan utang sesuai dengan ketentuan hukum yang berlaku;",
  "Harus membayar dimuka biaya profesional yang mahal atau tidak logis secara ekonomi untuk melakukan penagihan, meskipun tidak ada kepastian atas keberhasilan;",
  "Menyita banyak waktu sehingga mempengaruhi kinerja dan produktivitas perusahaan;",
  "Khawatir akan implikasi hukum yang negatif bagi perusahaan apabila menggunakan metode penagihan utang yang salah.",
];

export const CONTACT_STEPS = [
  {
    title: "Pertama, HUBUNGI KAMI",
    body: "Silahkan hubungi kami untuk konsultasi awal secara gratis. Anda bisa hubungi kami klik tombol “Hubungi Kami”. Tim Profesional Financia akan segera menghubungi Anda kembali untuk memberi penjelasan dan penawaran terbaik kepada Anda.",
    highlight: "“Hubungi Kami”",
  },
  {
    title: "Kedua, SIAPKAN DATA",
    body: "Setelah menerima penjelasan dari kami, siapkan data-data yang berkaitan dengan utang. Termasuk perjanjian, faktur penjualan (invoice), nota pembelian (Purchase Order (PO)), nota pengiriman (Delivery Order (DO)), berita acara, korespondensi dan lain sebagainya yang berkaitan dengan utang. Financia menjamin kerahasiaan dan tidak akan menyalahgunakan data yang Anda berikan. Kami hanya akan gunakan data untuk profiling dan assesment untuk tujuan penagihan utang.",
  },
  {
    title: "Ketiga, KUASAKAN KAMI",
    body: "Agar bisa melakukan tindakan untuk dan atas nama Anda dalam upaya melakukan penagihan utang, kami memerlukan surat kuasa dari Anda kepada advokat (lawyer) yang kami tugaskan. Setelah Anda sepakat dengan apa yang Financia tawarkan, Anda cukup menandatangani perjanjian kerjasama dan surat kuasa. Setelah itu, Financia akan segera bertindak untuk atas nama Anda dalam melakukan penagihan utang. Kami hanya akan bertindak dengan cara-cara yang sesuai dengan hukum yang berlaku sehingga keamanan Anda terjaga.",
  },
];
