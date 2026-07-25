"use client";

import { useMemo, useState } from "react";

type View =
  | "overview"
  | "projects"
  | "sql"
  | "learning"
  | "profile";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const navItems: { id: View; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "sql", label: "SQL Lab" },
  { id: "learning", label: "Learning" },
  { id: "profile", label: "Profile" },
];

const projects = [
  {
    name: "LogiTrack AI",
    type: "Logistics & Operations System",
    status: "Completed",
    problem:
      "Pengiriman dan pergerakan kontainer membutuhkan satu sumber data yang dapat dipantau oleh admin, operator, dan pelanggan.",
    solution:
      "Sistem Laravel dengan CRUD master data, transaksi pengiriman, tracking publik, dashboard Chart.js, REST API, dan AI assistant.",
    stack: ["Laravel", "MySQL", "REST API", "Chart.js", "Tailwind"],
    metric: "3 role pengguna",
    accent: "lime",
    url: "https://github.com/Readwips/web_tracking_barang",
    demo: "https://readwips.github.io/web_tracking_barang/",
  },
  {
    name: "WhatsApp to Google Sheets",
    type: "Workflow Automation",
    status: "Completed",
    problem:
      "Pesanan dari percakapan WhatsApp perlu dipindahkan ke spreadsheet secara manual dan berulang.",
    solution:
      "Otomasi Node.js yang membaca pesan masuk, mengekstrak item dan jumlah, lalu menyimpannya ke Google Sheets secara real-time.",
    stack: ["Node.js", "WhatsApp Web.js", "Google Sheets API", "Data Parsing"],
    metric: "Real-time automation",
    accent: "blue",
    url: "https://github.com/Readwips/chat-wa-to-excel",
  },
  {
    name: "Vivy Responsive Website",
    type: "Frontend Web Experience",
    status: "Completed",
    problem:
      "Informasi cerita, karakter, dan dunia Vivy membutuhkan presentasi web yang ringkas dan responsif.",
    solution:
      "Website frontend responsif yang menyajikan konten visual terstruktur menggunakan HTML, CSS, dan JavaScript.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    metric: "15 commits",
    accent: "orange",
    url: "https://github.com/Readwips/web_vivy",
    demo: "https://readwips.github.io/web_vivy/",
  },
];

const searchIndex: { title: string; subtitle: string; view: View }[] = [
  ...projects.map((item) => ({ title: item.name, subtitle: item.type, view: "projects" as View })),
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

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const term = query.toLowerCase();
    return searchIndex
      .filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(term))
      .slice(0, 5);
  }, [query]);

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
            <strong>SETYO AGUNG P</strong>
            <small>IT OPERATIONS</small>
          </span>
        </button>

        <div className="identityCard">
          <img className="avatar" src={`${basePath}/setyo-agung-prabowo.jpg`} alt="Foto Setyo Agung P" />
          <div>
            <strong>SETYO AGUNG P</strong>
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
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebarNote">
          <span className="pulseDot" />
          <div>
            <strong>Available for work</strong>
            <small>Bojonegoro · Remote / On-site</small>
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
            <a className="roundButton" href="https://github.com/Readwips" target="_blank" rel="noreferrer" aria-label="Buka GitHub Setyo">↗</a>
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
                    <a className="secondaryButton" href={`${basePath}/CV_Setyo_Agung_Prabowo.pdf`} download>Download CV</a>
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
                  <strong>11</strong>
                  <p>Repository publik di GitHub</p>
                  <button onClick={() => changeView("projects")}>Jelajahi ↗</button>
                </article>
                <article className="statCard">
                  <span>02 / DATABASE</span>
                  <strong>05</strong>
                  <p>Skema dan latihan query</p>
                  <button onClick={() => changeView("sql")}>Buka lab ↗</button>
                </article>
                <article className="statCard darkCard">
                  <span>03 / TECHNOLOGY</span>
                  <strong>12</strong>
                  <p>Tools dalam matriks skill</p>
                  <button onClick={() => changeView("learning")}>Lihat matriks ↗</button>
                </article>
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
                    <div className="projectFooter">
                      <strong>{project.metric}</strong>
                      <div className="projectLinks">
                        {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo ↗</a>}
                        <a href={project.url} target="_blank" rel="noreferrer">GitHub ↗</a>
                      </div>
                    </div>
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

          {active === "learning" && (
            <section className="view animateIn">
              <PageTitle eyebrow="CONTINUOUS IMPROVEMENT / LEARNING" title="Perjalanan belajar dan pengembangan diri." copy="Ringkasan pendidikan dan kemampuan yang saya pelajari serta terapkan secara bertahap melalui pendidikan dan proyek." />
              <div className="learningLayout">
                <article className="journeyPanel">
                  <span className="sectionLabel">LEARNING JOURNEY</span>
                  {[
                    ["2009–2015", "Pendidikan Dasar", "SDN 1 Kauman Bojonegoro"],
                    ["2015–2018", "Sekolah Menengah Pertama", "SMPN 6 Bojonegoro"],
                    ["2018–2021", "Teknik Elektronika Industri", "SMKN 2 Bojonegoro · dasar perangkat keras dan elektronika"],
                    ["2021–2025", "S1 Sistem Informasi", "Universitas Terbuka · data, dokumentasi sistem, dan analisis proses bisnis"],
                    ["NOW", "Project-based learning", "Laravel · MySQL · REST API · JavaScript · workflow automation"],
                  ].map(([year, title, skills]) => <div className="journeyItem" key={year}><time>{year}</time><i className={year === "NOW" ? "current" : ""} /><div><strong>{title}</strong><p>{skills}</p>{year === "NOW" && <StatusPill tone="positive">Currently learning</StatusPill>}</div></div>)}
                </article>
                <div className="skillPanels">
                  {[
                    ["Data & Database", [["MySQL", "Used in LogiTrack"], ["Data processing", "Experience"], ["Data validation", "Experience"], ["SQL query", "Project practice"]]],
                    ["Programming", [["Laravel / PHP", "Project experience"], ["JavaScript", "Project experience"], ["HTML / CSS", "Comfortable"], ["REST API", "Used in LogiTrack"]]],
                    ["IT & Systems", [["Basic networking", "Understanding"], ["Hardware / software troubleshooting", "Understanding"], ["System documentation", "Experience"], ["ERP fundamentals", "Basic"]]],
                  ].map(([group, rows]) => <article className="skillPanel" key={group as string}><h2>{group as string}</h2>{(rows as string[][]).map(([skill, level]) => <div key={skill}><span>{skill}</span><strong>{level}</strong></div>)}</article>)}
                </div>
              </div>
            </section>
          )}

          {active === "profile" && (
            <section className="view animateIn">
              <PageTitle eyebrow="PROFILE / CONTACT" title="Teknologi yang dekat dengan kebutuhan operasional." copy="Saya mencari tempat untuk bertumbuh sambil membantu tim bekerja lebih tertib, cepat, dan berbasis data." />
              <div className="profileHero">
                <div className="profilePortrait"><img src={`${basePath}/setyo-agung-prabowo.jpg`} alt="Potret formal Setyo Agung Prabowo" /><i>AVAILABLE</i></div>
                <div className="profileIntro">
                  <span className="sectionLabel">ABOUT ME</span>
                  <h2>Setyo Agung Prabowo</h2>
                  <p className="profileLead">S1 Sistem Informasi · Web Development · Data Processing · IT Support</p>
                  <p>Lulusan S1 Sistem Informasi dengan pemahaman dalam pengembangan web, pengolahan data, dokumentasi, dan analisis proses bisnis. Terbiasa menyusun laporan, mengolah data, serta menganalisis permasalahan secara terstruktur. Teliti, adaptif, komunikatif, dan terus belajar teknologi baru.</p>
                  <div className="contactActions"><a className="primaryButton" href="mailto:setyoagungprab@gmail.com">Kirim email <span>→</span></a><a className="secondaryButton" href="https://github.com/Readwips" target="_blank" rel="noreferrer">GitHub</a><a className="secondaryButton" href={`${basePath}/CV_Setyo_Agung_Prabowo.pdf`} download>Download CV</a></div>
                </div>
              </div>
              <div className="profileFacts">
                <div><span>LOCATION</span><strong>Bojonegoro, Jawa Timur</strong></div>
                <div><span>EMAIL</span><a href="mailto:setyoagungprab@gmail.com">setyoagungprab@gmail.com</a></div>
                <div><span>PHONE</span><a href="tel:+6283848222144">0838-4822-2144</a></div>
                <div><span>GITHUB</span><a href="https://github.com/Readwips" target="_blank" rel="noreferrer">github.com/Readwips ↗</a></div>
              </div>
              <div className="resumeGrid">
                <article>
                  <span className="sectionLabel">EDUCATION</span>
                  <div className="resumeItem"><time>2021–2025</time><div><strong>Universitas Terbuka</strong><p>S1 Sistem Informasi</p></div></div>
                  <div className="resumeItem"><time>2018–2021</time><div><strong>SMKN 2 Bojonegoro</strong><p>Teknik Elektronika Industri</p></div></div>
                </article>
                <article>
                  <span className="sectionLabel">EXPERIENCE</span>
                  <div className="resumeItem"><time>DISHUB</time><div><strong>Dinas Perhubungan Kabupaten Bojonegoro</strong><p>Mengelola dan memvalidasi data operasional serta menyusun laporan data untuk kebutuhan internal.</p></div></div>
                </article>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
