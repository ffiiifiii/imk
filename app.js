/* ==========================================================================
   Request Desain · InfoKom HMDTIF
   Aplikasi HTML + CSS + JavaScript murni (tanpa framework).
   Struktur: DATA → STATE → HELPERS → VIEWS → EVENTS → BOOT
   ========================================================================== */

/* --------------------------------------------------------------------------
   DATA
   -------------------------------------------------------------------------- */
const A = "/assets";

const roleData = {
  pengaju: {
    label: "Pengaju",
    name: "Reyhan",
    title: "Pengaju (Pengaju)",
    unitLabel: "Departemen",
    unit: "Dept. PSDM · HMDTIF",
    email: "reyhan@hmdtif.example",
    rights: [
      "Mengajukan request konten",
      "Meninjau draf dan merevisi (maks. 1x)",
      "Melihat status dan riwayat publikasi",
    ],
  },
  humas: {
    label: "Humas",
    name: "Farid",
    title: "Humas (InfoKom)",
    unitLabel: "Divisi",
    unit: "InfoKom · HMDTIF",
    email: "farid@hmdtif.example",
    rights: [
      "Menerima atau menolak request, memilih PIC",
      "Cek Bahasa, teruskan ke Pengaju",
      "Mengunggah ke media sosial, tandai selesai",
    ],
  },
  medkraf: {
    label: "MedKraf",
    name: "Kemal",
    title: "MedKraf (InfoKom)",
    unitLabel: "Divisi",
    unit: "MedKraf · InfoKom HMDTIF",
    email: "kemal@hmdtif.example",
    rights: ["Mengerjakan desain, serahkan hasil", "Mengunggah versi revisi"],
  },
};

const statusTone = {
  "Pengecekan Form": ["blue", ""],
  "Proses Desain": ["blue", ""],
  "Pengecekan Bahasa": ["blue", ""],
  "Revisi Bahasa": ["red", "half"],
  "Pengecekan Hasil": ["red", "half"],
  "Revisi Desain": ["red", "half"],
  "Siap Unggah": ["orange", "three"],
  Selesai: ["green", "check"],
  Ditolak: ["red", "cross"],
};

const statusShort = {
  "Pengecekan Form": "Cek Form",
  "Proses Desain": "Proses Desain",
  "Pengecekan Bahasa": "Cek Bahasa",
  "Revisi Bahasa": "Revisi Bahasa",
  "Pengecekan Hasil": "Cek Hasil",
  "Revisi Desain": "Revisi Desain",
  "Siap Unggah": "Siap Unggah",
  Selesai: "Selesai",
  Ditolak: "Ditolak",
};

const statusStep = {
  "Pengecekan Form": 1,
  "Proses Desain": 2,
  "Pengecekan Bahasa": 3,
  "Revisi Bahasa": 4,
  "Pengecekan Hasil": 5,
  "Revisi Desain": 6,
  "Siap Unggah": 7,
  Selesai: 8,
  Ditolak: 0,
};

const steps = [
  "Cek Form",
  "Proses Desain",
  "Cek Bahasa",
  "Revisi Bahasa",
  "Cek Hasil",
  "Revisi Desain",
  "Siap Unggah",
  "Selesai",
];

const humasFilters = [
  "Semua",
  "Pengecekan Form",
  "Proses Desain",
  "Pengecekan Bahasa",
  "Revisi Bahasa",
  "Pengecekan Hasil",
  "Revisi Desain",
  "Siap Unggah",
  "Selesai",
  "Ditolak",
];

const medkrafMembers = ["Kemal", "Raka", "Sinta", "Bima", "Nadia", "Dimas"];
const taskStatuses = ["Proses Desain", "Revisi Bahasa", "Revisi Desain"];
const reviewStatuses = [
  "Pengecekan Hasil",
  "Revisi Desain",
  "Siap Unggah",
  "Selesai",
];

const baseHistory = [
  ["Request terkirim → Pengecekan Form", "12 Nov, 09.12"],
  ["Request diterima → Proses Desain", "12 Nov, 10.05"],
  ["Desain diserahkan → Pengecekan Bahasa", "13 Nov, 14.20"],
  ["Koreksi bahasa → Revisi Bahasa", "13 Nov, 15.02"],
  ["Revisi diserahkan → Pengecekan Bahasa", "13 Nov, 16.30"],
  ["Diteruskan ke pengaju → Pengecekan Hasil", "13 Nov, 16.45"],
  ["Draf disetujui → Siap Unggah", "14 Nov, 08.10"],
  ["Konten diunggah → Selesai", "14 Nov, 12.00"],
];

function previewForTitle(title) {
  const t = title.toLowerCase();
  if (t.includes("rekrut") || t.includes("magang")) return "1082f.png";
  if (t.includes("workshop")) return "preview-workshop.svg";
  if (t.includes("seminar")) return "preview-seminar.svg";
  if (t.includes("donasi")) return "preview-donasi.svg";
  if (t.includes("festival")) return "preview-festival.svg";
  return "preview-generic.svg";
}

function makeReq(p) {
  return {
    link: "",
    humasNote: "",
    pengajuNote: "",
    rejectReason: "",
    uploadLink: "",
    revisiLeft: 1,
    ...p,
    preview: previewForTitle(p.title),
    history: baseHistory.slice(0, p.historyCount || 1),
  };
}

function initialReqs() {
  return [
    makeReq({
      id: 1,
      title: "Open Recruitment Magang",
      by: "Reyhan (PSDM)",
      byFull: "Reyhan · Dept. PSDM",
      type: "Reels",
      date: "14 Nov",
      dateFull: "14 November 2026",
      pic: "",
      status: "Pengecekan Form",
      desc: "Reels promosi Open Recruitment Magang 2026.",
      caption: "Yuk gabung Magang HMDTIF 2026! Info di bio.",
      historyCount: 1,
    }),
    makeReq({
      id: 2,
      title: "Workshop Desain",
      by: "Nisa (BPH)",
      byFull: "Nisa · BPH",
      type: "Feeds",
      date: "15 Nov",
      dateFull: "15 November 2026",
      pic: "Sinta",
      status: "Pengecekan Hasil",
      desc: "Feeds promosi Workshop Desain.",
      caption: "Yuk ikuti Workshop Desain HMDTIF!",
      link: "https://figma.com/design/workshop-desain",
      historyCount: 6,
    }),
    makeReq({
      id: 3,
      title: "Seminar Karier",
      by: "Dika (PSDM)",
      byFull: "Dika · PSDM",
      type: "Story",
      date: "16 Nov",
      dateFull: "16 November 2026",
      pic: "Kemal",
      status: "Revisi Bahasa",
      desc: "Story promosi Seminar Karier.",
      caption: "Daftar Seminar Karier sekarang!",
      link: "https://figma.com/design/seminar-karier",
      humasNote: 'Typo pada baris ke 3 : "pendaftran" → "pendaftaran".',
      historyCount: 4,
    }),
    makeReq({
      id: 4,
      title: "Donasi Pendidikan",
      by: "Alya (PSDI)",
      byFull: "Alya · PSDI",
      type: "Feeds",
      date: "17 Nov",
      dateFull: "17 November 2026",
      pic: "Nadia",
      status: "Siap Unggah",
      desc: "Feeds ajakan donasi pendidikan.",
      caption: "Bantu adik-adik tetap sekolah, donasi sekarang.",
      link: "https://figma.com/design/donasi-pendidikan",
      historyCount: 7,
    }),
    makeReq({
      id: 5,
      title: "Festival Seni",
      by: "Fajar (PIT)",
      byFull: "Fajar · PIT",
      type: "Reels",
      date: "18 Nov",
      dateFull: "18 November 2026",
      pic: "Dimas",
      status: "Selesai",
      desc: "Reels dokumentasi Festival Seni.",
      caption: "Terima kasih sudah hadir di Festival Seni!",
      link: "https://figma.com/design/festival-seni",
      historyCount: 8,
    }),
  ];
}

function initialNotifs() {
  return [
    {
      id: 1,
      role: "pengaju",
      title: "Draf siap ditinjau",
      body: "Workshop Desain · sisa revisi 1x",
      time: "5 menit lalu",
      unread: true,
      page: { name: "p_review" },
      reqId: 2,
    },
    {
      id: 2,
      role: "pengaju",
      title: "Request diterima Humas",
      body: "Donasi Pendidikan · PIC: Nadia",
      time: "Kemarin",
      unread: false,
      page: { name: "p_status" },
      reqId: 4,
    },
    {
      id: 3,
      role: "pengaju",
      title: "Konten sudah diunggah",
      body: "Festival Seni · Selesai",
      time: "2 hari lalu",
      unread: false,
      page: { name: "p_status" },
      reqId: 5,
    },
    {
      id: 4,
      role: "humas",
      title: "Request baru masuk",
      body: "Open Recruitment Magang · Reyhan (PSDM)",
      time: "2 menit lalu",
      unread: true,
      page: { name: "h_list", filter: "Pengecekan Form" },
      reqId: 1,
    },
    {
      id: 5,
      role: "humas",
      title: "Pengaju menyetujui draf",
      body: "Donasi Pendidikan · Siap Unggah",
      time: "1 jam lalu",
      unread: true,
      page: { name: "h_list", filter: "Siap Unggah" },
      reqId: 4,
    },
    {
      id: 6,
      role: "humas",
      title: "Hasil desain siap diperiksa",
      body: "Seminar Karier · dari Kemal (MedKraf)",
      time: "Kemarin",
      unread: true,
      page: { name: "h_list", filter: "Revisi Bahasa" },
      reqId: 3,
    },
    {
      id: 7,
      role: "medkraf",
      title: "Catatan koreksi Bahasa",
      body: "Seminar Karier · Typo pada baris ke 3",
      time: "1 jam lalu",
      unread: true,
      page: { name: "m_task" },
      reqId: 3,
    },
    {
      id: 8,
      role: "medkraf",
      title: "Tugas baru dari Humas",
      body: "Seminar Karier · unggah 16 Nov",
      time: "2 hari lalu",
      unread: true,
      page: { name: "m_task" },
      reqId: 3,
    },
  ];
}

/* --------------------------------------------------------------------------
   STATE
   -------------------------------------------------------------------------- */
const S = {
  role: "pengaju",
  page: { name: "roles" },
  notif: false,
  modal: null,
  reqs: initialReqs(),
  notifs: initialNotifs(),
  selectedId: 1,
  medName: "Kemal",
  draft: "",
  toast: null,
  tab: "Reels",
  version: "Versi 1",
  form: { by: "", title: "", date: "", desc: "", caption: "" },
  errors: {},
  modalVal: "",
  modalErr: "",
  copied: false,
};

/* --------------------------------------------------------------------------
   HELPERS
   -------------------------------------------------------------------------- */
const $app = document.getElementById("app");
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

const homePage = (role) =>
  role === "pengaju"
    ? { name: "p_request" }
    : role === "humas"
      ? { name: "h_list", filter: "Pengecekan Form" }
      : { name: "m_task" };

function roleOfPage(page) {
  if (page.name === "login") return page.role;
  if (page.name.startsWith("p_")) return "pengaju";
  if (page.name.startsWith("h_")) return "humas";
  if (page.name.startsWith("m_")) return "medkraf";
  return null;
}

function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function stamp() {
  const d = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getDate()} ${months[d.getMonth()]}, ${pad(d.getHours())}.${pad(d.getMinutes())}`;
}

function say(text) {
  S.toast = { id: Date.now(), text };
  render();
  setTimeout(() => {
    if (S.toast && S.toast.text === text) {
      S.toast = null;
      render();
    }
  }, 2600);
}

function go(page, opts = {}) {
  const r = roleOfPage(page);
  if (r) S.role = r;
  S.page = page;
  S.notif = Boolean(opts.notif);
  S.modal = null;
  S.errors = {};
  window.scrollTo({ top: 0 });
  render();
}

function currentReq() {
  return S.reqs.find((r) => r.id === S.selectedId) || S.reqs[0];
}

function setStatus(req, status, note) {
  req.status = status;
  if (note) req.humasNote = note;
  req.history.push([`Status → ${status}`, stamp()]);
}

/** Validasi link: harus URL http(s) dengan domain sesuai permintaan */
function linkError(value, domain, label) {
  const raw = (value || "").trim();
  if (!raw) return `${label} wajib diisi`;
  let u;
  try {
    u = new URL(raw);
  } catch {
    return `Gunakan tautan yang valid, mis. https://${domain}/...`;
  }
  if (!["http:", "https:"].includes(u.protocol)) {
    return `Gunakan tautan http/https, mis. https://${domain}/...`;
  }
  const host = u.hostname.toLowerCase();
  const ok =
    domain === "figma.com"
      ? host === "figma.com" || host.endsWith(".figma.com")
      : host === "instagram.com" ||
        host.endsWith(".instagram.com") ||
        host === "instagr.am";
  return ok ? "" : `Tautan harus dari ${domain}, mis. https://${domain}/...`;
}

/* --------------------------------------------------------------------------
   pieces kecil
   -------------------------------------------------------------------------- */
function statusPill(status, compact = false) {
  const [tone, icon] = statusTone[status] || ["blue", ""];
  const mark = icon === "check" ? "✓" : icon === "cross" ? "✕" : "";
  const label = compact ? statusShort[status] || status : status;
  return `<span class="status ${tone}${compact ? " compact" : ""}"><i class="sicon ${icon}">${mark}</i>${esc(label)}</span>`;
}

function field(label, required, error, control) {
  return `<label class="${error ? "invalid" : ""}">
    <span class="field-label">${esc(label)}${required ? '<sup aria-label="wajib diisi">*</sup>' : ""}</span>
    ${control}
    ${error ? `<span class="err" role="alert">${esc(error)}</span>` : ""}
  </label>`;
}

function brand() {
  return `<div class="brand"><img src="${A}/69146.svg" alt="" /><strong>InfoKom</strong></div>`;
}

function avatar(large = false) {
  return `<div class="avatar${large ? " avatar-large" : ""}"><img src="${A}/${large ? "127e7.svg" : "fa01b.svg"}" alt="" /></div>`;
}

function preview(src) {
  return `<div class="preview"><img src="${A}/${src || "1082f.png"}" alt="Preview desain" /></div>`;
}

function detail(row, pic = true) {
  return `<dl>
    <dt>Judul</dt><dd>${esc(row.title)}</dd>
    <dt>Pengaju</dt><dd>${esc(row.byFull)}</dd>
    <dt>Tipe Konten</dt><dd>${esc(row.type)}</dd>
    <dt>Tanggal Unggah</dt><dd>${esc(row.dateFull)}</dd>
    <dt>Deskripsi</dt><dd>${esc(row.desc)}</dd>
    <dt>Caption</dt><dd>${esc(row.caption)}</dd>
    ${pic ? `<dt>PIC MedKraf</dt><dd>${esc(row.pic || "Belum Ditugaskan")}</dd>` : ""}
  </dl>`;
}

function requestTable(rows, empty = "Belum ada pengajuan.") {
  const widths = [150, 110, 60, 70, 80, 110];
  const body = rows.length
    ? rows
        .map(
          (
            r,
          ) => `<tr class="${S.selectedId === r.id ? "selected" : ""}" data-act="select" data-id="${r.id}">
            <td title="${esc(r.title)}"><span class="cell">${esc(r.title)}</span></td>
            <td title="${esc(r.by)}"><span class="cell">${esc(r.by)}</span></td>
            <td><span class="cell">${esc(r.type)}</span></td>
            <td><span class="cell">${esc(r.date)}</span></td>
            <td><span class="cell">${esc(r.pic || "-")}</span></td>
            <td>${statusPill(r.status, true)}</td>
          </tr>`,
        )
        .join("")
    : `<tr class="empty-row"><td colspan="6">${esc(empty)}</td></tr>`;
  return `<div class="table-scroll"><table class="fixed-table">
    <colgroup>${widths.map((w) => `<col style="width:${w}px" />`).join("")}</colgroup>
    <thead><tr><th>Judul</th><th>Pengaju</th><th>Tipe</th><th>Unggah</th><th>PIC</th><th>Status</th></tr></thead>
    <tbody>${body}</tbody>
  </table></div>`;
}

function miniTask(r, meta) {
  return `<button class="mini-task clickable${S.selectedId === r.id ? " selected" : ""}" data-act="select" data-id="${r.id}">
    <strong>${esc(r.title)}</strong><span>${esc(meta)}</span>${statusPill(r.status, true)}
  </button>`;
}

/* --------------------------------------------------------------------------
   VIEWS
   -------------------------------------------------------------------------- */
function rolePicker() {
  const cards = [
    ["pengaju", "61ce6.svg", "Ajukan kebutuhan publikasi Anda.", "blue"],
    ["humas", "0c6de.svg", "Kelola komunikasi dan publikasi.", "green"],
    ["medkraf", "bce34.svg", "Kelola kebutuhan media kreatif.", "orange"],
  ];
  return `<main class="role-page fade-in">
    <img class="ambient ambient-login" src="${A}/b1f88.svg" alt="" />
    <section class="role-panel">
      ${brand()}
      <h1>Pilih Peran</h1>
      <p>Login sesuai peran kamu</p>
      <div class="role-grid">
        ${cards
          .map(
            ([
              role,
              icon,
              desc,
              tone,
            ]) => `<button class="role-card ${tone}" data-act="role" data-role="${role}">
              <span class="role-icon"><img src="${A}/${icon}" alt="" /></span>
              <span>Masuk sebagai<strong>${roleData[role].label}</strong></span>
              <small>${desc}</small><b>Lanjut&nbsp; →</b>
            </button>`,
          )
          .join("")}
      </div>
    </section>
  </main>`;
}

function login(role) {
  return `<main class="role-page">
    <img class="ambient ambient-login" src="${A}/b1f88.svg" alt="" />
    <section class="role-panel login-panel fade-in">
      ${brand()}
      <h1>Masuk sebagai ${roleData[role].label}</h1>
      <p class="login-sub">Masukkan email dan kata sandi untuk melanjutkan.</p>
      <form data-form="login">
        ${field("Email", false, S.errors.email, `<input type="email" name="email" placeholder="Masukkan email Anda" autocomplete="off" value="${esc(S.form.email || "")}" />`)}
        ${field("Kata sandi", false, S.errors.pass, `<input type="password" name="pass" placeholder="Masukkan kata sandi Anda" autocomplete="off" />`)}
        <button class="link right" type="button" data-act="hint">Lupa kata sandi?</button>
        ${S.hint ? '<p class="hint">Hubungi admin InfoKom untuk mengatur ulang kata sandi.</p>' : ""}
        <button class="button primary wide" type="submit">Masuk</button>
      </form>
      <div class="or"><span>atau</span></div>
      <button class="button ghost wide" data-act="login-guest">Masuk dengan Google</button>
      <button class="link center" data-act="roles">← Ganti peran</button>
    </section>
  </main>`;
}

function sidebar() {
  const items =
    S.role === "pengaju"
      ? [
          [
            "Ajukan Permintaan",
            "54fbe.svg",
            { name: "p_request" },
            ["p_request", "profile"],
          ],
          ["Tinjau & Revisi", "e0886.svg", { name: "p_review" }, ["p_review"]],
          ["Status & Riwayat", "e6d93.svg", { name: "p_status" }, ["p_status"]],
        ]
      : S.role === "humas"
        ? [["Daftar Pengajuan", "54fbe.svg", homePage("humas"), ["h_list"]]]
        : [["Tugas Saya", "5f177.svg", homePage("medkraf"), ["m_task"]]];
  return `<aside class="sidebar card">
    ${brand()}
    <nav>${items
      .map(
        ([
          label,
          icon,
          to,
          active,
        ]) => `<button class="${active.includes(S.page.name) ? "nav-active" : ""}" data-act="nav" data-page="${esc(JSON.stringify(to))}">
          <img src="${A}/${icon}" alt="" /><span>${label}</span>
        </button>`,
      )
      .join("")}</nav>
  </aside>`;
}

function header() {
  const items = S.notifs.filter((n) => n.role === S.role);
  const unread = items.filter((n) => n.unread).length;
  const chip =
    S.role === "pengaju"
      ? "Reyhan · Pengaju (PSDM)"
      : S.role === "humas"
        ? "Farid · Humas (InfoKom)"
        : `${S.medName} · MedKraf (InfoKom)`;
  return `<header class="header card">
    <h2>Request Desain · InfoKom HMDTIF</h2>
    <div class="header-actions">
      <button class="bell ${S.notif ? "selected" : ""}" data-act="bell" aria-label="Notifikasi">
        <img src="${A}/1b2ef.svg" alt="" />${unread ? `<b>${unread}</b>` : ""}
      </button>
      <span>${esc(chip)}</span>
      <button class="avatar-button" data-act="avatar" aria-label="Profil">${avatar()}</button>
    </div>
  </header>`;
}

function notifications() {
  if (!S.notif) return "";
  const items = S.notifs.filter((n) => n.role === S.role);
  return `<div class="notification card" data-stop="1">
    <h3>Notifikasi</h3>
    ${items.length === 0 ? '<p class="empty-note">Belum ada notifikasi.</p>' : ""}
    ${items
      .map(
        (
          n,
        ) => `<button class="${n.unread ? "unread" : ""}" data-act="notif" data-id="${n.id}" data-page="${esc(JSON.stringify(n.page))}">
          <i></i><span><strong>${esc(n.title)}</strong><small>${esc(n.body)}</small><em>${esc(n.time)}</em></span>
        </button>`,
      )
      .join("")}
  </div>`;
}

function profile() {
  const d = roleData[S.role];
  const name = S.role === "medkraf" ? S.medName : d.name;
  const count = (...st) => S.reqs.filter((r) => st.includes(r.status)).length;
  const stats =
    S.role === "pengaju"
      ? [
          [S.reqs.length, "Total Pengajuan"],
          [
            S.reqs.filter(
              (r) => r.status !== "Selesai" && r.status !== "Ditolak",
            ).length,
            "Sedang Diproses",
          ],
          [count("Selesai"), "Selesai"],
        ]
      : S.role === "humas"
        ? [
            [count("Pengecekan Form"), "Menunggu Keputusan"],
            [count("Pengecekan Bahasa"), "Cek Bahasa"],
            [count("Siap Unggah"), "Siap Unggah"],
          ]
        : [
            [
              S.reqs.filter(
                (r) => r.pic === S.medName && taskStatuses.includes(r.status),
              ).length,
              "Tugas Aktif",
            ],
            [
              S.reqs.filter(
                (r) => r.pic === S.medName && r.status === "Pengecekan Bahasa",
              ).length,
              "Menunggu Pemeriksaan",
            ],
          ];
  const rows = [
    ["Nama lengkap", name],
    ["Peran", d.label],
    [d.unitLabel, d.unit],
    [
      "Email",
      S.role === "medkraf" ? `${name.toLowerCase()}@hmdtif.example` : d.email,
    ],
    ["Bergabung sejak", "Januari 2026"],
  ];
  return `<div class="profile-grid">
    <section class="card profile-card">
      <h2>Profil Saya</h2>
      <div class="profile-id">${avatar(true)}<div><h1>${esc(name)}</h1><span class="pill">${esc(S.role === "medkraf" ? "MedKraf (InfoKom)" : d.title)}</span></div></div>
      <hr />
      ${rows.map(([k, v]) => `<div class="profile-row"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("")}
      <div class="profile-actions">
        <button class="button primary" data-act="home">Kembali ke Beranda</button>
        <button class="button outline" data-act="roles">Ganti Peran</button>
      </div>
    </section>
    <section class="card summary-card">
      <h2>Ringkasan Aktivitas</h2>
      <div class="stats">${stats.map(([v, l]) => `<div><b>${v}</b><small>${esc(l)}</small></div>`).join("")}</div>
      <h3>Hak Akses Peran</h3>
      <ul>${d.rights.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
    </section>
  </div>`;
}

function pRequest() {
  const e = S.errors;
  const f = S.form;
  const dates = today();
  return `<div class="request-grid">
    <form class="card form-card" data-form="request">
      <h2>Ajukan Permintaan Desain</h2>
      ${field("Nama Pengaju", true, e.by, `<input name="by" placeholder="reyhan" value="${esc(f.by)}" />`)}
      <div class="tabs">${["Reels", "Feeds", "Story"].map((t) => `<button type="button" class="${S.tab === t ? "active" : ""}" data-act="tab" data-value="${t}">${t}</button>`).join("")}</div>
      <div class="two-fields">
        ${field("Judul Pengajuan", true, e.title, `<input name="title" placeholder="Judul Konten" value="${esc(f.title)}" />`)}
        ${field("Tanggal Unggahan", true, e.date, `<input type="date" name="date" class="${f.date ? "has-value" : ""}" min="${dates}" value="${esc(f.date)}" />`)}
      </div>
      ${field("Deskripsi Singkat Desain", true, e.desc, `<textarea name="desc" placeholder="Tuliskan Deskripsi">${esc(f.desc)}</textarea>`)}
      ${field("Caption (untuk Reels / Feeds) — opsional", false, "", `<textarea name="caption" placeholder="Tuliskan Caption">${esc(f.caption)}</textarea>`)}
      ${Object.values(e).some(Boolean) ? '<p class="form-alert" role="alert">Lengkapi kolom bertanda * terlebih dahulu sebelum mengirim.</p>' : ""}
      <button class="button primary submit" type="submit">Kirim Pengajuan</button>
    </form>
    <aside class="card guide-card">
      <h2>Panduan Pengajuan</h2>
      <ul>
        <li>Pengajuan masuk ditinjau Humas. Jika ditolak, ajukan ulang.</li>
        <li>Draf desain akan dikirim H-1 sebelum hari unggah.</li>
        <li>Revisi draf hanya dapat diajukan 1x setelah dikirim Humas.</li>
      </ul>
      <h2>Pengajuan Terakhir Saya</h2>
      ${S.reqs
        .slice(-2)
        .reverse()
        .map(
          (r) =>
            `<div class="mini-task"><strong>${esc(r.title)}</strong><span>${esc(r.type)} · unggah ${esc(r.date)}</span>${statusPill(r.status, true)}</div>`,
        )
        .join("")}
    </aside>
  </div>`;
}

function pReview() {
  const list = S.reqs.filter((r) => reviewStatuses.includes(r.status));
  const cur = list.find((r) => r.id === S.selectedId) || list[0];
  const canAct = cur && cur.status === "Pengecekan Hasil";
  const noQuota = cur ? cur.revisiLeft <= 0 : true;
  const reviewTable = `<div class="table-scroll review-table"><table class="fixed-table">
    <colgroup><col style="width:36%" /><col style="width:36%" /><col style="width:28%" /></colgroup>
    <thead><tr><th>Judul</th><th>Status</th><th>Aksi</th></tr></thead>
    <tbody>${
      list.length
        ? list
            .map(
              (r) =>
                `<tr class="${cur && cur.id === r.id ? "selected" : ""}"><td><span class="cell"><b>${esc(r.title)}</b></span></td><td>${statusPill(r.status, true)}</td><td><button class="button primary mini" data-act="select" data-id="${r.id}">Detail</button></td></tr>`,
            )
            .join("")
        : '<tr class="empty-row"><td colspan="3">Belum ada konten.</td></tr>'
    }</tbody>
  </table></div>`;
  return `<div class="review-grid">
    <section class="card review-card">
      <h2>Tinjau &amp; Revisi Desain</h2>
      ${
        cur
          ? `<span class="self">${statusPill(cur.status)}</span>
        ${field(`Draf Desain — ${cur.title}`, false, "", `<input readonly value="${esc(cur.link)}" placeholder="https://figma.com" />`)}
        ${preview(cur.preview)}
        <div class="tabs two">${["Versi 1", "Versi 2"].map((v) => `<button class="${S.version === v ? "active" : ""}" data-act="version" data-value="${v}">${v}</button>`).join("")}</div>
        ${field("Caption", false, "", `<input readonly value="${esc(cur.caption)}" />`)}`
          : '<p class="empty-state">Belum ada draf yang perlu ditinjau.</p>'
      }
    </section>
    <aside class="card side-card">
      <h2>Revisi Desain</h2>
      <span class="quota"><i class="sicon half"></i> Sisa Kuota Revisi : ${cur ? cur.revisiLeft : 0}x</span>
      <h4>Konten untuk ditinjau</h4>
      <p class="small">Lihat detail konten untuk review dan revisi.</p>
      ${reviewTable}
      ${cur && !canAct ? `<p class="form-note">Status draf ini "${cur.status}", jadi belum ada tindakan yang diperlukan.</p>` : ""}
      <button class="button outline block" ${!canAct || noQuota ? "disabled" : ""} data-act="modal" data-modal="p_revisi">Ajukan Revisi</button>
      <button class="button primary block" ${!canAct ? "disabled" : ""} data-act="modal" data-modal="p_setujui">Setujui Desain</button>
    </aside>
  </div>`;
}

function pStatus() {
  const cur = currentReq();
  const step = statusStep[cur.status];
  return `<div class="status-grid">
    <section class="card status-card">
      <h2>Status &amp; Riwayat Publikasi</h2>
      <ol class="stepper${step === 0 ? " rejected" : ""}">
        ${steps
          .map((label, i) => {
            const n = i + 1;
            const state =
              n < step || (step === 8 && n === 8)
                ? "done"
                : n === step
                  ? "now"
                  : "todo";
            return `<li class="${state}"><span>${state === "done" ? '<svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></svg>' : n}</span><small>${esc(label)}</small></li>`;
          })
          .join("")}
      </ol>
      ${step === 0 ? `<p class="reject-note" role="status">Pengajuan ditolak. Alasan: ${esc(cur.rejectReason)}</p>` : ""}
      <h2 class="sub">Daftar Pengajuan Saya</h2>
      ${requestTable(S.reqs)}
    </section>
    <aside class="side-stack">
      <section class="card side-card"><h2>Detail Pengajuan</h2>${detail(cur, false)}</section>
      <section class="card side-card history"><h2>Riwayat Proses</h2><ul>${cur.history.map(([t, w], i) => `<li class="${i === cur.history.length - 1 ? "last" : ""}"><strong>${esc(t)}</strong><small>${esc(w)}</small></li>`).join("")}</ul></section>
    </aside>
  </div>`;
}

function hList() {
  const filter = S.page.filter || "Pengecekan Form";
  const rows =
    filter === "Semua" ? S.reqs : S.reqs.filter((r) => r.status === filter);
  const cur = rows.find((r) => r.id === S.selectedId) || rows[0];
  let detailHtml = "";
  if (!cur) {
    detailHtml =
      '<section class="card detail-card"><h2>Detail Pengajuan</h2><p class="empty-state">Pilih pengajuan pada tabel untuk melihat detail dan tindakannya.</p></section>';
  } else if (cur.status === "Pengecekan Bahasa") {
    detailHtml = `<section class="card detail-card"><h2>Pengecekan Bahasa — ${esc(cur.title)}</h2>
      <a class="link-box" href="${esc(cur.link)}" target="_blank" rel="noreferrer"><span>${esc(cur.link)}</span></a>
      ${preview(cur.preview)}
      <button class="button outline block" data-act="modal" data-modal="h_revisi_bahasa">Ajukan Revisi ke MedKraf</button>
      <button class="button primary block" data-act="modal" data-modal="h_teruskan">Teruskan ke Pengaju</button>
    </section>`;
  } else if (cur.status === "Siap Unggah") {
    detailHtml = `<section class="card detail-card"><h2>Unggah Desain — ${esc(cur.title)}</h2>
      <input class="gap" data-field="design-link" data-id="${cur.id}" value="${esc(cur.link)}" placeholder="https://figma.com" />
      ${S.errors.designLink ? `<p class="err" role="alert">${esc(S.errors.designLink)}</p>` : ""}
      ${preview(cur.preview)}
      <label class="gap">Caption<span class="link-box caption-box">${esc(cur.caption)}</span></label>
      <div class="dual-actions tight">
        <a class="button outline" href="${A}/${cur.preview}" download="desain-infokom.png">Unduh Desain</a>
        <button class="button outline" data-act="copy">${S.copied ? "Tersalin" : "Salin Caption"}</button>
      </div>
      <button class="button primary block" data-act="modal" data-modal="h_unggah">Tandai Sudah Diunggah</button>
    </section>`;
  } else {
    detailHtml = `<section class="card detail-card"><h2>Detail Pengajuan</h2><div class="status-line">${statusPill(cur.status)}</div>${detail(cur)}${
      cur.status === "Ditolak"
        ? `<p class="reject-note">Alasan penolakan: ${esc(cur.rejectReason)}</p>`
        : cur.status === "Selesai" && cur.uploadLink
          ? `<p class="form-note">Diunggah di: ${esc(cur.uploadLink)}</p>`
          : cur.status === "Pengecekan Form"
            ? `<div class="dual-actions"><button class="button outline" data-act="modal" data-modal="h_tolak">Tolak</button><button class="button primary" data-act="modal" data-modal="h_terima">Terima</button></div>`
            : ""
    }</section>`;
  }
  return `<div class="requests-grid">
    <section class="card table-card">
      <h2>Daftar &amp; Detail Pengajuan</h2>
      <div class="filters">${humasFilters.map((f) => `<button class="${filter === f ? "active" : ""}" data-act="filter" data-value="${esc(f)}">${f}</button>`).join("")}</div>
      ${requestTable(rows, "Belum ada pengajuan dengan status ini.")}
    </section>
    ${detailHtml}
  </div>`;
}

function mTask() {
  const list = S.reqs.filter(
    (r) => r.pic === S.medName && taskStatuses.includes(r.status),
  );
  const cur = list.find((r) => r.id === S.selectedId) || list[0];
  const form = cur
    ? `<h2 class="sub">Serahkan Hasil</h2>
       ${field("Tautan Figma / File Hasil", true, S.errors.link, `<input name="link" placeholder="https://figma.com" value="" />`)}
       ${preview(cur.preview)}
       <button class="button primary task-submit" data-act="submit-design" data-id="${cur.id}">Serahkan Desain</button>`
    : "";
  return `<div class="task-grid">
    <section class="card task-card">
      <h2>Pengerjaan Desain</h2>
      ${
        cur
          ? `${detail(cur)}
        ${
          cur.humasNote || cur.pengajuNote
            ? `<h2 class="sub">Catatan Revisi</h2>
          <div class="note"><strong>Catatan Revisi Humas</strong><p>${esc(cur.humasNote || "Belum Ada")}</p></div>
          <div class="note"><strong>Catatan Revisi Pengaju</strong><p>${esc(cur.pengajuNote || "Belum Ada")}</p></div>`
            : ""
        }
        ${form}`
          : `<p class="empty-state">Belum ada tugas aktif untuk ${esc(S.medName)}.</p>`
      }
    </section>
    <aside class="card task-list">
      <h2>Tugas Saya</h2>
      ${list.length ? list.map((r) => miniTask(r, `${r.type} · unggah ${r.date}`)).join("") : '<p class="empty-state">Tugas baru akan muncul di sini.</p>'}
    </aside>
  </div>`;
}

function modal() {
  if (!S.modal) return "";
  const cur = currentReq();
  const m = S.modal;
  const icon = {
    p_success: ["ok", "6f0ef.svg"],
    p_revisi: ["warn", "6bb5d.svg"],
    p_konfirmasi: ["orange", null],
    p_setujui: ["ok", "6f0ef.svg"],
    h_tolak: ["warn", "6bb5d.svg"],
    h_terima: ["ok", "6f0ef.svg"],
    h_unggah: ["upload", null],
    h_revisi_bahasa: ["warn", "6bb5d.svg"],
    h_teruskan: ["orange", null],
  }[m] || ["ok", "6f0ef.svg"];
  const titles = {
    p_success: "Request Berhasil Dikirim",
    p_revisi: "Ajukan Revisi",
    p_konfirmasi: "Kirim Revisi?",
    p_setujui: "Setujui Desain",
    h_tolak: "Tolak Pengajuan",
    h_terima: "Terima & Tugaskan PIC MedKraf",
    h_unggah: "Tandai Sudah Diunggah",
    h_revisi_bahasa: "Ajukan Revisi",
    h_teruskan: "Teruskan ke Pengaju",
  };
  const body = {
    p_success: `<p>Request "${esc(cur.title)}" tercatat dengan status Pengecekan Form. Humas akan memeriksa kelengkapannya.</p>`,
    p_revisi: field(
      "Deskripsi Revisi",
      true,
      S.modalErr,
      `<textarea class="tall" placeholder="Tulis semua masukan revisi dalam satu catatan." data-modal-input>${esc(S.modalVal)}</textarea>`,
    ),
    p_konfirmasi:
      "<p>Revisi hanya dapat diajukan 1x dan hasilnya akan langsung diunggah. Pastikan semua masukan sudah ditulis.</p>",
    p_setujui: `<p>Apakah Anda yakin menyetujui draf "${esc(cur.title)}"? Setelah disetujui, status menjadi Siap Unggah.</p>`,
    h_tolak: field(
      "Alasan Penolakan",
      true,
      S.modalErr,
      `<textarea placeholder="Tulis alasan penolakan" data-modal-input>${esc(S.modalVal)}</textarea>`,
    ),
    h_terima: field(
      "Pilih PIC MedKraf",
      true,
      S.modalErr,
      `<select class="${S.modalVal ? "" : "empty"}" data-modal-input><option value="">Pilih anggota medkraf</option>${medkrafMembers.map((x) => `<option ${S.modalVal === x ? "selected" : ""}>${x}</option>`).join("")}</select>`,
    ),
    h_unggah: field(
      "Link Unggahan",
      true,
      S.modalErr,
      `<input placeholder="https://instagram.com/p/..." class="${S.modalVal ? "has-value" : ""}" data-modal-input value="${esc(S.modalVal)}" />`,
    ),
    h_revisi_bahasa: field(
      "Deskripsi Revisi",
      true,
      S.modalErr,
      `<textarea class="tall" placeholder="Tulis catatan koreksi Bahasa untuk MedKraf." data-modal-input>${esc(S.modalVal)}</textarea>`,
    ),
    h_teruskan: `<p>Draf "${esc(cur.title)}" akan diteruskan ke Pengaju untuk ditinjau.</p>`,
  }[m];
  const cancel = {
    p_success: "Tutup",
    p_revisi: "Batal",
    p_konfirmasi: "Kembali",
    p_setujui: "Batal",
    h_tolak: "Batal",
    h_terima: "Batal",
    h_unggah: "Batal",
    h_revisi_bahasa: "Batal",
    h_teruskan: "Batal",
  }[m];
  const confirm = {
    p_success: "Lihat Status",
    p_revisi: "Ajukan",
    p_konfirmasi: "Ya, Kirim Revisi",
    p_setujui: "Setujui",
    h_tolak: "Tolak",
    h_terima: "Tugaskan",
    h_unggah: "Selesai",
    h_revisi_bahasa: "Ajukan",
    h_teruskan: "Teruskan",
  }[m];
  const iconHtml = icon[1]
    ? `<img class="m-icon ${icon[0] === "warn" ? "warn" : ""}" src="${A}/${icon[1]}" alt="" />`
    : `<span class="m-icon dot ${icon[0]}">${icon[0] === "orange" ? "✓" : "»"}</span>`;
  return `<div class="modal-backdrop" data-act="modal-close">
    <section class="modal card" data-stop="1" role="dialog" aria-modal="true" aria-label="${titles[m]}">
      <button class="modal-close" data-act="modal-close" aria-label="Tutup"><img src="${A}/47fa3.svg" alt="" /></button>
      <h2>${iconHtml}${esc(titles[m])}</h2>
      ${body}
      <div class="dual-actions">
        <button class="button outline" data-act="modal-cancel">${cancel}</button>
        <button class="button primary" data-act="modal-confirm" data-modal="${m}">${confirm}</button>
      </div>
    </section>
  </div>`;
}

function shell(inner) {
  const ambient =
    S.role === "pengaju"
      ? "b1f88.svg"
      : S.role === "humas"
        ? "6bee6.svg"
        : "e3734.svg";
  return `<main class="app-shell">
    <img class="ambient ambient-app" src="${A}/${ambient}" alt="" />
    <div class="dashboard">
      ${sidebar()}
      <div class="workspace">
        ${header()}
        <div class="page-fade">${inner}</div>
      </div>
      ${notifications()}
    </div>
    ${S.toast ? `<div class="toast" role="status">${esc(S.toast.text)}</div>` : ""}
    ${modal()}
  </main>`;
}

function render() {
  let inner = "";
  if (S.page.name === "roles") {
    $app.innerHTML = rolePicker();
    return;
  }
  if (S.page.name === "login") {
    $app.innerHTML = login(S.page.role);
    return;
  }
  switch (S.page.name) {
    case "profile":
      inner = profile();
      break;
    case "p_request":
      inner = pRequest();
      break;
    case "p_review":
      inner = pReview();
      break;
    case "p_status":
      inner = pStatus();
      break;
    case "h_list":
      inner = hList();
      break;
    case "m_task":
      inner = mTask();
      break;
  }
  $app.innerHTML = shell(inner);
}

/* --------------------------------------------------------------------------
   EVENTS
   -------------------------------------------------------------------------- */
$app.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target.closest("form");
  if (!form) return;
  if (form.dataset.form === "login") {
    const email = form.email.value.trim();
    const pass = form.pass.value.trim();
    S.errors = {
      email: !email
        ? "Email wajib diisi"
        : /^\S+@\S+\.\S+$/.test(email)
          ? ""
          : "Format email belum benar",
      pass: pass ? "" : "Kata sandi wajib diisi",
    };
    if (S.errors.email || S.errors.pass) return render();
    if (S.role === "medkraf") S.medName = "Kemal";
    go(homePage(S.role));
    return;
  }
  if (form.dataset.form === "request") {
    const f = {
      by: form.by.value.trim(),
      title: form.title.value.trim(),
      date: form.date.value,
      desc: form.desc.value.trim(),
      caption: form.caption.value.trim(),
    };
    S.errors = {
      by: f.by ? "" : "Nama pengaju wajib diisi",
      title: f.title ? "" : "Judul pengajuan wajib diisi",
      date: !f.date
        ? "Tanggal unggahan wajib diisi"
        : f.date < today()
          ? "Tanggal unggahan tidak boleh sebelum hari ini"
          : "",
      desc: f.desc ? "" : "Deskripsi desain wajib diisi",
    };
    if (Object.values(S.errors).some(Boolean)) return render();
    const [y, m, d] = f.date.split("-").map(Number);
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const id = Math.max(0, ...S.reqs.map((r) => r.id)) + 1;
    const req = makeReq({
      id,
      title: f.title,
      by: `${f.by} (PSDM)`,
      byFull: `${f.by} · Dept. PSDM`,
      type: S.tab,
      date: `${d} ${months[m - 1].slice(0, 3)}`,
      dateFull: `${d} ${months[m - 1]} ${y}`,
      pic: "",
      status: "Pengecekan Form",
      desc: f.desc,
      caption: f.caption || "-",
      historyCount: 1,
    });
    S.reqs.push(req);
    S.selectedId = id;
    S.form = { by: "", title: "", date: "", desc: "", caption: "" };
    S.notifs.push({
      id: Date.now(),
      role: "humas",
      title: "Request baru masuk",
      body: `${req.title} · ${req.by}`,
      time: "baru saja",
      unread: true,
      page: { name: "h_list", filter: "Pengecekan Form" },
      reqId: id,
    });
    S.modal = "p_success";
    render();
  }
});

$app.addEventListener("input", (e) => {
  const t = e.target;
  if (t.name === "date") t.classList.toggle("has-value", Boolean(t.value));
  if (t.matches("form[data-form='request'] [name]")) {
    S.form[t.name] = t.value;
    if (S.errors[t.name]) S.errors[t.name] = "";
    return;
  }
  if (t.matches("form[data-form='login'] [name]")) {
    S.form[t.name] = t.value;
    return;
  }
  if (t.dataset.field === "design-link") {
    const req = S.reqs.find((r) => r.id === Number(t.dataset.id));
    if (req) req.link = t.value;
    if (S.errors.designLink) {
      S.errors.designLink = "";
      render();
    }
    return;
  }
  if (t.hasAttribute("data-modal-input")) {
    S.modalVal = t.value;
    t.classList.toggle("has-value", Boolean(t.value));
    if (t.tagName === "SELECT") t.classList.toggle("empty", !t.value);
    if (S.modalErr) {
      S.modalErr = "";
      const err = t.closest("label")?.querySelector(".err");
      if (err) err.remove();
    }
  }
});

$app.addEventListener("change", (e) => {
  if (e.target.matches("form[data-form='request'] [name='date']")) {
    S.form.date = e.target.value;
    e.target.classList.toggle("has-value", Boolean(e.target.value));
  }
  if (e.target.hasAttribute("data-modal-input")) {
    S.modalVal = e.target.value;
    e.target.classList.toggle("has-value", Boolean(e.target.value));
    if (e.target.tagName === "SELECT")
      e.target.classList.toggle("empty", !e.target.value);
  }
});

$app.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const act = el.dataset.act;

  if (act === "role") return go({ name: "login", role: el.dataset.role });
  if (act === "roles") return go({ name: "roles" });
  if (act === "login-guest") return go(homePage(S.role));
  if (act === "hint") {
    S.hint = !S.hint;
    return render();
  }
  if (act === "home") return go(homePage(S.role));
  if (act === "nav") return go(JSON.parse(el.dataset.page));
  if (act === "filter") return go({ name: "h_list", filter: el.dataset.value });
  if (act === "tab") {
    S.tab = el.dataset.value;
    return render();
  }
  if (act === "version") {
    S.version = el.dataset.value;
    return render();
  }
  if (act === "select") {
    S.selectedId = Number(el.dataset.id);
    return render();
  }
  if (act === "bell") {
    const notifPage =
      S.role === "pengaju"
        ? { name: "p_review" }
        : S.role === "humas"
          ? { name: "h_list", filter: "Pengecekan Form" }
          : { name: "m_task" };
    return S.notif ? go(homePage(S.role)) : go(notifPage, { notif: true });
  }
  if (act === "avatar")
    return S.page.name === "profile"
      ? go(homePage(S.role))
      : go({ name: "profile" });
  if (act === "notif") {
    const n = S.notifs.find((x) => x.id === Number(el.dataset.id));
    if (n) {
      n.unread = false;
      if (n.reqId) S.selectedId = n.reqId;
    }
    return go(JSON.parse(el.dataset.page));
  }
  if (act === "copy") {
    const cur = currentReq();
    if (navigator.clipboard)
      navigator.clipboard.writeText(cur.caption).catch(() => undefined);
    S.copied = true;
    render();
    setTimeout(() => {
      S.copied = false;
      render();
    }, 1600);
    return;
  }
  if (act === "modal") {
    if (el.dataset.modal === "h_unggah") {
      S.errors.designLink = linkError(
        currentReq().link,
        "figma.com",
        "Link desain",
      );
      if (S.errors.designLink) return render();
    }
    S.modal = el.dataset.modal;
    S.modalVal = "";
    S.modalErr = "";
    return render();
  }
  if (act === "modal-close") {
    const isCloseButton = el.classList.contains("modal-close");
    if (!isCloseButton && e.target.closest("[data-stop]")) return;
    S.modal = null;
    return render();
  }
  if (act === "modal-cancel") {
    if (S.modal === "p_konfirmasi") {
      S.modal = "p_revisi";
      S.modalVal = S.draft;
    } else S.modal = null;
    S.modalErr = "";
    return render();
  }
  if (act === "modal-confirm") return confirmModal(el.dataset.modal);
  if (act === "submit-design") {
    const input = e.target.closest(".task-card").querySelector("[name='link']");
    const val = input ? input.value.trim() : "";
    S.errors.link = linkError(val, "figma.com", "Tautan Figma / file hasil");
    if (S.errors.link) return render();
    const req = S.reqs.find((r) => r.id === Number(el.dataset.id));
    if (req) {
      req.link = val;
      setStatus(req, "Pengecekan Bahasa");
    }
    S.errors = {};
    return go({ name: "h_list", filter: "Pengecekan Form" });
  }
});

function confirmModal(m) {
  const cur = currentReq();
  const id = cur ? cur.id : 0;
  const val = S.modalVal.trim();
  const guard = (message, fn) => {
    S.modalErr = message;
    if (message) return render();
    fn();
  };
  switch (m) {
    case "p_success":
      return go({ name: "p_status" });
    case "p_revisi":
      return guard(val ? "" : "Deskripsi revisi wajib diisi", () => {
        S.draft = val;
        S.modal = "p_konfirmasi";
        render();
      });
    case "p_konfirmasi":
      if (cur) {
        setStatus(cur, "Revisi Desain");
        cur.pengajuNote = S.draft;
        cur.revisiLeft -= 1;
      }
      return go({ name: "m_task" });
    case "p_setujui":
      if (cur) setStatus(cur, "Siap Unggah");
      return go({ name: "h_list", filter: "Siap Unggah" });
    case "h_tolak":
      return guard(val ? "" : "Alasan penolakan wajib diisi", () => {
        if (cur) {
          cur.rejectReason = val;
          setStatus(cur, "Ditolak");
        }
        go({ name: "h_list", filter: "Pengecekan Form" });
      });
    case "h_terima":
      return guard(val ? "" : "PIC MedKraf wajib dipilih", () => {
        if (cur) {
          cur.pic = val;
          S.medName = val;
          setStatus(cur, "Proses Desain");
        }
        go({ name: "m_task" });
      });
    case "h_unggah":
      return guard(linkError(val, "instagram.com", "Link unggahan"), () => {
        if (cur) {
          cur.uploadLink = val;
          setStatus(cur, "Selesai");
        }
        go({ name: "p_status" });
      });
    case "h_revisi_bahasa":
      return guard(val ? "" : "Deskripsi revisi wajib diisi", () => {
        if (cur) {
          setStatus(cur, "Revisi Bahasa");
          cur.humasNote = val;
        }
        go({ name: "m_task" });
      });
    case "h_teruskan":
      if (cur) setStatus(cur, "Pengecekan Hasil");
      return go({ name: "p_review" });
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (S.modal) {
    S.modal = null;
    render();
  } else if (S.notif) {
    S.notif = false;
    render();
  }
});

document.addEventListener("click", (e) => {
  if (
    S.notif &&
    !e.target.closest(".notification") &&
    !e.target.closest("[data-act='bell']")
  ) {
    S.notif = false;
    render();
  }
});

render();
