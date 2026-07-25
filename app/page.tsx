"use client";

import { useMemo, useState } from "react";

type View =
  | "overview"
  | "projects"
  | "sql"
  | "support"
  | "jobs"
  | "learning"
  | "profile";

const navItems: { id: View; label: string; mark: string }[] = [
  { id: "overview", label: "Overview", mark: "OV" },
  { id: "projects", label: "Projects", mark: "PR" },
  { id: "sql", label: "SQL Lab", mark: "SQ" },
  { id: "support", label: "Support Desk", mark: "IT" },
  { id: "jobs", label: "Job Tracker", mark: "JB" },
  { id: "learning", label: "Learning", mark: "LR" },
  { id: "profile", label: "Profile", mark: "ME" },
];

const projects = [
  {
    name: "Dashboard Penjualan UMKM",
    type: "Data & Business Intelligence",
    status: "Completed",
    problem:
      "Transaksi manual membuat pemilik usaha sulit membaca produk terlaris dan pergerakan stok.",
    solution:
      "Dashboard operasional untuk mencatat transaksi, mengelola stok, dan merangkum kinerja penjualan.",
    stack: ["Next.js", "PostgreSQL", "Tailwind", "REST API"],
    metric: "5 tabel relasional",
    accent: "lime",
  },
  {
    name: "Job Application Tracker",
    type: "Personal Information System",
    status: "In progress",
    problem:
      "Riwayat lamaran tersebar dan tindak lanjut setiap perusahaan mudah terlewat.",
    solution:
      "Satu sistem untuk memantau status, jadwal interview, catatan, dan performa pencarian kerja.",
    stack: ["TypeScript", "CRUD", "Analytics", "Local Data"],
    metric: "25 lamaran terlacak",
    accent: "orange",
  },
  {
    name: "Chat WA to Excel",
    type: "Workflow Automation",
    status: "Prototype",
    problem:
      "Data administrasi dari percakapan perlu dipindahkan ke spreadsheet secara berulang.",
    solution:
      "Alur ekstraksi data terstruktur yang mengurangi pekerjaan input manual dan kesalahan format.",
    stack: ["JavaScript", "Excel", "Data Parsing"],
    metric: "1 alur otomatis",
    accent: "blue",
  },
];

const tickets = [
  {
    id: "#IT-024",
    issue: "Printer finance tidak terdeteksi",
    category: "Printer",
    priority: "High",
    status: "Resolved",
    user: "Staff Finance",
    cause: "Driver printer corrupt setelah pembaruan Windows.",
    solution: "Remove driver lama, instal driver terbaru, restart spooler, lalu test printing.",
  },
  {
    id: "#IT-023",
    issue: "Laptop lambat saat membuka aplikasi kantor",
    category: "Hardware",
    priority: "Medium",
    status: "Resolved",
    user: "Staff Admin",
    cause: "RAM penuh, startup berlebih, dan ruang penyimpanan tersisa 8%.",
    solution: "Audit startup, bersihkan temporary files, dan optimalkan penggunaan storage.",
  },
  {
    id: "#IT-022",
    issue: "Akun pengguna terkunci setelah gagal login",
    category: "Account",
    priority: "Low",
    status: "Documented",
    user: "Staff Gudang",
    cause: "Batas percobaan login tercapai.",
    solution: "Verifikasi pengguna, reset kredensial, lalu dokumentasikan langkah pencegahan.",
  },
];

const applications = [
  { company: "Nusantara Digital", role: "IT Support", date: "22 Jul 2026", status: "Interview" },
  { company: "Arunika Retail", role: "Application Support", date: "19 Jul 2026", status: "Process" },
  { company: "DataKita", role: "Junior Data Admin", date: "17 Jul 2026", status: "Process" },
  { company: "Satu Sistem", role: "Junior Web Developer", date: "14 Jul 2026", status: "Applied" },
  { company: "Karya Teknologi", role: "Helpdesk", date: "10 Jul 2026", status: "Rejected" },
];

const searchIndex: { title: string; subtitle: string; view: View }[] = [
  ...projects.map((item) => ({ title: item.name, subtitle: item.type, view: "projects" as View })),
  ...tickets.map((item) => ({ title: item.issue, subtitle: `${item.id} · ${item.category}`, view: "support" as View })),
  ...applications.map((item) => ({ title: item.company, subtitle: item.role, view: "jobs" as View })),
  { title: "Query produk terlaris", subtitle: "SQL Lab", view: "sql" },
  { title: "Skill matrix", subtitle: "Learning journey", view: "learning" },
];

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`statusPill ${tone}`}>{children}</span>;
}

function PageTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <header className="pageTitle">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
    </header>
  );
}

export default function Home() {
  const [active, setActive] = useState<View>("overview");
  const [query, setQuery] = useState("");
  const [ticketFilter, setTicketFilter] = useState("All");

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const term = query.toLowerCase();
    return searchIndex
      .filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(term))
      .slice(0, 5);
  }, [query]);

  const filteredTickets = ticketFilter === "All"
    ? tickets
    : tickets.filter((ticket) => ticket.category === ticketFilter);

  const changeView = (view: View) => {
    setActive(view);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="appShell">
      <aside className="sidebar">
        <button className="brand" onClick={() => changeView("overview")} aria-label="Buka overview">
          <span className="brandMark">SA</span>
          <span>
            <strong>SETYO.A</strong>
            <small>IT OPERATIONS</small>
          </span>
        </button>

        <div className="identityCard">
          <div className="avatar">SP</div>
          <div>
            <strong>Setyo Agung Prabowo</strong>
            <span>System Information Graduate</span>
          </div>
        </div>

        <nav className="sideNav" aria-label="Navigasi utama">
          <p>WORKSPACE</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? "active" : ""}
              onClick={() => changeView(item.id)}
            >
              <span className="navMark">{item.mark}</span>
              {item.label}
              {item.id === "support" && <em>3</em>}
            </button>
          ))}
        </nav>

        <div className="sidebarNote">
          <span className="pulseDot" />
          <div>
            <strong>Available for work</strong>
            <small>Jakarta · Remote / On-site</small>
          </div>
        </div>
      </aside>

      <main className="mainContent">
        <div className="topbar">
          <button className="mobileBrand" onClick={() => changeView("overview")}>SA</button>
          <div className="searchWrap">
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari proyek, tiket, atau perusahaan..."
              aria-label="Cari seluruh dashboard"
            />
            <kbd>/</kbd>
            {query && (
              <div className="searchResults">
                {searchResults.length ? searchResults.map((result) => (
                  <button key={`${result.title}-${result.subtitle}`} onClick={() => changeView(result.view)}>
                    <strong>{result.title}</strong>
                    <span>{result.subtitle}</span>
                  </button>
                )) : <p>Tidak ada hasil yang cocok.</p>}
              </div>
            )}
          </div>
          <div className="topActions">
            <span className="liveBadge"><i /> SYSTEM ONLINE</span>
            <button className="roundButton" onClick={() => window.print()} aria-label="Cetak profil">↗</button>
          </div>
        </div>

        <nav className="mobileNav" aria-label="Navigasi seluler">
          {navItems.map((item) => (
            <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => changeView(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="viewContainer">
          {active === "overview" && (
            <section className="view animateIn">
              <div className="heroPanel">
                <div className="heroCopy">
                  <p className="eyebrow">PERSONAL INFORMATION SYSTEM / 2026</p>
                  <h1>Membangun sistem yang membuat pekerjaan lebih <span>jelas.</span></h1>
                  <p>
                    Saya Setyo—lulusan Sistem Informasi yang menghubungkan data, aplikasi web,
                    dan pemecahan masalah IT untuk mendukung operasional yang lebih baik.
                  </p>
                  <div className="heroActions">
                    <button className="primaryButton" onClick={() => changeView("projects")}>Lihat proyek <span>→</span></button>
                    <button className="secondaryButton" onClick={() => window.print()}>Cetak profil</button>
                  </div>
                </div>
                <div className="heroSignal">
                  <div className="signalTop">
                    <span>CAREER SIGNAL</span>
                    <i>LIVE</i>
                  </div>
                  <strong>OPEN</strong>
                  <p>untuk peluang IT Support, Application Support, dan Junior System Analyst.</p>
                  <div className="signalBars"><i /><i /><i /><i /><i /></div>
                </div>
              </div>

              <div className="statGrid">
                <article className="statCard limeCard">
                  <span>01 / PROJECTS</span>
                  <strong>06</strong>
                  <p>Produk digital & studi kasus</p>
                  <button onClick={() => changeView("projects")}>Jelajahi ↗</button>
                </article>
                <article className="statCard">
                  <span>02 / DATABASE</span>
                  <strong>05</strong>
                  <p>Skema dan latihan query</p>
                  <button onClick={() => changeView("sql")}>Buka lab ↗</button>
                </article>
                <article className="statCard">
                  <span>03 / IT CASES</span>
                  <strong>15</strong>
                  <p>Kasus terdokumentasi</p>
                  <button onClick={() => changeView("support")}>Lihat kasus ↗</button>
                </article>
                <article className="statCard darkCard">
                  <span>04 / TECHNOLOGY</span>
                  <strong>12</strong>
                  <p>Tools dalam matriks skill</p>
                  <button onClick={() => changeView("learning")}>Lihat matriks ↗</button>
                </article>
              </div>

              <div className="dashboardGrid">
                <article className="panel activityPanel">
                  <div className="panelHeader">
                    <div><span>RECENT ACTIVITY</span><h2>Jejak kerja terbaru</h2></div>
                    <button onClick={() => changeView("learning")}>Semua aktivitas</button>
                  </div>
                  <div className="activityList">
                    {[
                      ["24 JUL", "Mendokumentasikan query SQL reporting", "Database Lab", "lime"],
                      ["21 JUL", "Menyelesaikan kasus printer finance", "Support Desk", "orange"],
                      ["18 JUL", "Memperbarui dashboard penjualan UMKM", "Project", "blue"],
                      ["14 JUL", "Menambahkan empat lamaran baru", "Job Tracker", "navy"],
                    ].map(([date, title, tag, tone]) => (
                      <div className="activityItem" key={title}>
                        <time>{date}</time>
                        <i className={tone} />
                        <div><strong>{title}</strong><span>{tag}</span></div>
                        <b>↗</b>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="panel pipelinePanel">
                  <div className="panelHeader">
                    <div><span>JOB PIPELINE</span><h2>Lamaran aktif</h2></div>
                    <StatusPill tone="positive">+12% bulan ini</StatusPill>
                  </div>
                  <div className="pipelineBody">
                    <div className="donut"><span><strong>25</strong>total</span></div>
                    <div className="legend">
                      <div><i className="lime" /><span>Interview</span><strong>4</strong></div>
                      <div><i className="blue" /><span>Proses</span><strong>7</strong></div>
                      <div><i className="orange" /><span>Ditolak</span><strong>10</strong></div>
                      <div><i className="gray" /><span>Lainnya</span><strong>4</strong></div>
                    </div>
                  </div>
                  <button className="wideLink" onClick={() => changeView("jobs")}>Buka job tracker <span>→</span></button>
                </article>
              </div>

              <div className="focusStrip">
                <div><span>CURRENT FOCUS</span><strong>SQL · Database Design · REST API</strong></div>
                <div><span>NEXT UP</span><strong>Docker · Cloud · CI/CD</strong></div>
                <div><span>LAST UPDATED</span><strong>24 July 2026</strong></div>
              </div>
            </section>
          )}

          {active === "projects" && (
            <section className="view animateIn">
              <PageTitle eyebrow="CASE STUDY / PROJECT MANAGEMENT" title="Proyek yang dimulai dari masalah nyata." copy="Bukan sekadar tangkapan layar—setiap proyek menjelaskan masalah, keputusan, dan hasil yang ingin dicapai." />
              <div className="projectGrid">
                {projects.map((project, index) => (
                  <article className={`projectCard ${project.accent}`} key={project.name}>
                    <div className="projectIndex">0{index + 1}</div>
                    <div className="projectMeta"><span>{project.type}</span><StatusPill tone={project.status === "Completed" ? "positive" : "neutral"}>{project.status}</StatusPill></div>
                    <h2>{project.name}</h2>
                    <div className="problemSolution">
                      <div><span>THE PROBLEM</span><p>{project.problem}</p></div>
                      <div><span>THE SOLUTION</span><p>{project.solution}</p></div>
                    </div>
                    <div className="tagRow">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="projectFooter"><strong>{project.metric}</strong><button>Studi kasus <span>↗</span></button></div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {active === "sql" && (
            <section className="view animateIn">
              <PageTitle eyebrow="DATABASE CENTER / SQL PLAYGROUND" title="Data yang rapi menghasilkan keputusan yang baik." copy="Dokumentasi struktur database penjualan UMKM dan contoh query reporting yang dapat dibaca recruiter maupun tim teknis." />
              <div className="databaseBanner">
                <div><span>ACTIVE DATABASE</span><h2>penjualan_umkm</h2><p>PostgreSQL · 5 tables · 12 relationships</p></div>
                <StatusPill tone="positive">● CONNECTED</StatusPill>
              </div>
              <div className="schemaGrid">
                {[
                  ["categories", "category_id", "category_name", "description"],
                  ["products", "product_id", "category_id ↗", "product_name", "price", "stock"],
                  ["customers", "customer_id", "customer_name", "phone"],
                  ["sales", "sale_id", "customer_id ↗", "sale_date", "total_amount"],
                  ["sale_items", "item_id", "sale_id ↗", "product_id ↗", "quantity", "subtotal"],
                ].map(([name, ...fields]) => (
                  <article className="schemaCard" key={name}>
                    <h3><i />{name}</h3>
                    {fields.map((field, i) => <div key={field}><span>{field}</span><em>{i === 0 ? "PK · INT" : field.includes("↗") ? "FK · INT" : "FIELD"}</em></div>)}
                  </article>
                ))}
              </div>
              <div className="sqlWorkspace">
                <article className="codePanel">
                  <div className="codeTop"><span>Query 01 — produk_terlaris.sql</span><button onClick={() => navigator.clipboard?.writeText("SELECT p.product_name, SUM(si.quantity) AS total_sold FROM products p JOIN sale_items si ON p.product_id = si.product_id GROUP BY p.product_name ORDER BY total_sold DESC;")}>Salin query</button></div>
                  <pre><code><b>SELECT</b>{`\n  `}<span>p.product_name</span>,{`\n  `}<b>SUM</b>(si.quantity) <b>AS</b> <span>total_sold</span>{`\n`}<b>FROM</b> products p{`\n`}<b>JOIN</b> sale_items si{`\n  `}<b>ON</b> p.product_id = si.product_id{`\n`}<b>GROUP BY</b> p.product_name{`\n`}<b>ORDER BY</b> total_sold <b>DESC</b>;</code></pre>
                </article>
                <article className="resultPanel">
                  <div className="codeTop"><span>RESULT</span><StatusPill tone="positive">3 rows · 18ms</StatusPill></div>
                  <table><thead><tr><th>product_name</th><th>total_sold</th></tr></thead><tbody><tr><td>Kopi Arabika</td><td>120</td></tr><tr><td>Mie Instan</td><td>90</td></tr><tr><td>Teh Melati</td><td>75</td></tr></tbody></table>
                  <div className="miniBars"><div><span>Kopi Arabika</span><i style={{ width: "100%" }} /></div><div><span>Mie Instan</span><i style={{ width: "75%" }} /></div><div><span>Teh Melati</span><i style={{ width: "62%" }} /></div></div>
                </article>
              </div>
            </section>
          )}

          {active === "support" && (
            <section className="view animateIn">
              <PageTitle eyebrow="IT OPERATIONS / KNOWLEDGE BASE" title="Masalah dicatat. Solusi dapat diulang." copy="Simulasi helpdesk yang menunjukkan alur diagnosis, penanganan, dan dokumentasi insiden operasional." />
              <div className="filterRow">
                {["All", "Printer", "Hardware", "Account"].map((filter) => <button key={filter} className={ticketFilter === filter ? "active" : ""} onClick={() => setTicketFilter(filter)}>{filter}</button>)}
                <span>{filteredTickets.length} kasus ditampilkan</span>
              </div>
              <div className="ticketList">
                {filteredTickets.map((ticket) => (
                  <details className="ticketCard" key={ticket.id}>
                    <summary>
                      <span className="ticketId">{ticket.id}</span>
                      <div><strong>{ticket.issue}</strong><small>{ticket.user} · {ticket.category}</small></div>
                      <StatusPill tone={ticket.priority === "High" ? "danger" : "neutral"}>{ticket.priority}</StatusPill>
                      <StatusPill tone="positive">{ticket.status}</StatusPill>
                      <b>⌄</b>
                    </summary>
                    <div className="ticketDetail">
                      <div><span>DIAGNOSIS</span><p>{ticket.cause}</p></div>
                      <div><span>RESOLUTION</span><p>{ticket.solution}</p></div>
                    </div>
                  </details>
                ))}
              </div>
              <div className="supportSteps">
                {[["01", "Identify", "Kumpulkan gejala dan konteks pengguna."], ["02", "Diagnose", "Uji kemungkinan penyebab secara sistematis."], ["03", "Resolve", "Terapkan solusi dengan risiko terkendali."], ["04", "Document", "Simpan pengetahuan agar dapat digunakan ulang."]].map(([no, name, desc]) => <div key={no}><span>{no}</span><strong>{name}</strong><p>{desc}</p></div>)}
              </div>
            </section>
          )}

          {active === "jobs" && (
            <section className="view animateIn">
              <PageTitle eyebrow="CAREER OPERATIONS / JOB TRACKER" title="Pencarian kerja, dikelola seperti pipeline." copy="Dashboard personal untuk menjaga tindak lanjut tetap terarah dan melihat pola dari setiap lamaran." />
              <div className="jobStats">
                {[["25", "Total lamaran", "+4 bulan ini"], ["04", "Interview", "16% conversion"], ["07", "Dalam proses", "Butuh follow-up"], ["01", "Offer", "Target berikutnya"]].map(([number, label, note], index) => <article key={label} className={index === 0 ? "featured" : ""}><span>{label}</span><strong>{number}</strong><small>{note}</small></article>)}
              </div>
              <div className="jobGrid">
                <article className="panel applicationTable">
                  <div className="panelHeader"><div><span>APPLICATIONS</span><h2>Lamaran terbaru</h2></div><button>+ Tambah lamaran</button></div>
                  <div className="tableScroll"><table><thead><tr><th>Perusahaan</th><th>Posisi</th><th>Tanggal</th><th>Status</th></tr></thead><tbody>{applications.map((app) => <tr key={app.company}><td><strong>{app.company}</strong></td><td>{app.role}</td><td>{app.date}</td><td><StatusPill tone={app.status === "Interview" ? "positive" : app.status === "Rejected" ? "danger" : "neutral"}>{app.status}</StatusPill></td></tr>)}</tbody></table></div>
                </article>
                <article className="panel roleChart">
                  <div className="panelHeader"><div><span>ROLE MIX / JULY</span><h2>Posisi yang dituju</h2></div></div>
                  {[['IT Support', 7, '100%'], ['Programmer', 4, '57%'], ['Admin Data', 3, '43%'], ['Teknisi', 2, '29%']].map(([role, count, width]) => <div className="roleBar" key={role}><div><span>{role}</span><strong>{count}</strong></div><i><b style={{ width }} /></i></div>)}
                  <p className="chartNote">Fokus terbesar tetap pada peran yang menggabungkan troubleshooting dan pemahaman sistem.</p>
                </article>
              </div>
            </section>
          )}

          {active === "learning" && (
            <section className="view animateIn">
              <PageTitle eyebrow="CONTINUOUS IMPROVEMENT / LEARNING" title="Belajar dengan bukti, bukan progress bar." copy="Setiap skill ditempatkan berdasarkan pengalaman nyata: sudah dipakai, dipahami, atau sedang dipelajari." />
              <div className="learningLayout">
                <article className="journeyPanel">
                  <span className="sectionLabel">LEARNING JOURNEY</span>
                  {[
                    ["2025", "Web foundation", "HTML · CSS · JavaScript"],
                    ["2026", "Information systems", "SQL · Database Design · Next.js · REST API · Git · Linux"],
                    ["NOW", "Operational maturity", "Docker · Cloud · CI/CD"],
                  ].map(([year, title, skills], index) => <div className="journeyItem" key={year}><time>{year}</time><i className={index === 2 ? "current" : ""} /><div><strong>{title}</strong><p>{skills}</p>{index === 2 && <StatusPill tone="positive">Currently learning</StatusPill>}</div></div>)}
                </article>
                <div className="skillPanels">
                  {[
                    ["Database", [["MySQL", "Used in project"], ["SQL JOIN", "Used in project"], ["Normalization", "Understanding"], ["Index optimization", "Learning"]]],
                    ["Programming", [["HTML / CSS", "Comfortable"], ["JavaScript", "Intermediate"], ["Next.js", "Project experience"], ["PHP", "Basic"]]],
                    ["IT Support", [["Windows troubleshooting", "Experience"], ["Hardware checking", "Experience"], ["Network basics", "Understanding"], ["Printer setup", "Experience"]]],
                  ].map(([group, rows]) => <article className="skillPanel" key={group as string}><h2>{group as string}</h2>{(rows as string[][]).map(([skill, level]) => <div key={skill}><span>{skill}</span><strong>{level}</strong></div>)}</article>)}
                </div>
              </div>
            </section>
          )}

          {active === "profile" && (
            <section className="view animateIn">
              <PageTitle eyebrow="PROFILE / CONTACT" title="Teknologi yang dekat dengan kebutuhan operasional." copy="Saya mencari tempat untuk bertumbuh sambil membantu tim bekerja lebih tertib, cepat, dan berbasis data." />
              <div className="profileHero">
                <div className="profilePortrait"><span>SA</span><i>AVAILABLE</i></div>
                <div className="profileIntro">
                  <span className="sectionLabel">ABOUT ME</span>
                  <h2>Setyo Agung Prabowo</h2>
                  <p className="profileLead">System Information Graduate · Web Developer · Database Enthusiast · IT Support</p>
                  <p>Saya menikmati pekerjaan yang menuntut ketelitian: memahami kebutuhan pengguna, menelusuri penyebab masalah, menyusun data, lalu menerjemahkannya menjadi solusi yang mudah digunakan.</p>
                  <div className="contactActions"><a className="primaryButton" href="mailto:setyo@example.com">Kirim email <span>→</span></a><button className="secondaryButton" onClick={() => window.print()}>Download CV</button></div>
                </div>
              </div>
              <div className="profileFacts">
                <div><span>LOCATION</span><strong>Jakarta, Indonesia</strong></div>
                <div><span>FOCUS ROLES</span><strong>IT Support · Application Support · Junior System Analyst</strong></div>
                <div><span>WORK MODE</span><strong>On-site · Hybrid · Remote</strong></div>
                <div><span>LANGUAGE</span><strong>Bahasa Indonesia · English</strong></div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
