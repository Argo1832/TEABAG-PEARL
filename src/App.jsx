import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  if (!data) return null;

  return (
    <div style={{ background: "#FAFAFA", minHeight: "100vh" }}>
      <Header site={data.site} />
      <Characters list={data.characters} />
      <Gallery items={data.gallery} />
      <World world={data.world} />
      <Cursor />
    </div>
  );
}

/* ===================== HEADER ===================== */
function Header({ site }) {
  return (
    <div style={{ padding: 60 }}>
      <h1 style={{ fontWeight: 200, fontSize: 48, marginBottom: 10 }}>
        {site?.title || "BEASTBORNE ARCHIVE"}
      </h1>
      <div style={{ color: "#999", fontSize: 12 }}>
        {site?.subtitle || "Teabag&Pearl"}
      </div>
    </div>
  );
}

/* ===================== CHARACTERS ===================== */
function Characters({ list }) {
  const [modal, setModal] = useState(null);

  return (
    <section style={{ padding: 60 }}>
      <div style={{ display: "flex", gap: 24, overflowX: "auto" }}>
        {list?.map((c) => (
          <div key={c.id} style={{ minWidth: 220 }}>
            <div
              style={{ overflow: "hidden", borderRadius: 16, cursor: "pointer" }}
              onClick={() => setModal(c)}
            >
              <img
                src={c.image}
                style={{
                  width: "100%",
                  height: 340,
                  objectFit: "cover",
                  transition: "0.4s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            <div style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
              {c.index || c.id.toString().padStart(2, "0")}
            </div>
            <div style={{ fontSize: 14 }}>{c.name}</div>
          </div>
        ))}
      </div>

      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 900,
              maxWidth: "90%",
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              borderRadius: 20,
              boxShadow: "0 30px 80px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <img
              src={modal.detailImage || modal.image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            <div style={{ padding: 40 }}>
              <div style={{ fontSize: 12, color: "#aaa", marginBottom: 10 }}>
                {modal.index || modal.id.toString().padStart(2, "0")}
              </div>

              <h2 style={{ fontWeight: 200, fontSize: 28 }}>{modal.name}</h2>

              <div style={{ fontSize: 12, color: "#aaa", marginBottom: 10 }}>
                {modal.sub}
              </div>

              <div style={{ fontSize: 10, letterSpacing: 2, color: "#999" }}>
                {modal.tag}
              </div>

              <div style={{ fontStyle: "italic", marginTop: 20 }}>
                “{modal.quote}”
              </div>

              <div style={{ marginTop: 20, fontSize: 13, color: "#666" }}>
                {modal.desc}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ===================== GALLERY ===================== */
function Gallery({ items }) {
  const [active, setActive] = useState(null);

  return (
    <section style={{ padding: 60 }}>
      <h1 style={{ fontWeight: 200, fontSize: 32, marginBottom: 40 }}>
        GALLERY
      </h1>

      <div style={{ display: "flex", gap: 16 }}>
        {items?.map((g, i) => (
          <img
            key={i}
            src={g.image}
            style={{ width: 200, height: 120, objectFit: "cover", cursor: "pointer" }}
            onClick={() => setActive(g.image)}
          />
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={active} style={{ maxHeight: "80%" }} />
        </div>
      )}
    </section>
  );
}

/* ===================== WORLD ===================== */
function World({ world }) {
  return (
    <section style={{ padding: 60, maxWidth: 600 }}>
      <h1 style={{ fontWeight: 200, fontSize: 32, marginBottom: 40 }}>
        {world?.title}
      </h1>

      {world?.paragraphs?.map((p, i) => (
        <p key={i} style={{ color: "#666", marginBottom: 20 }}>
          {p}
        </p>
      ))}
    </section>
  );
}

/* ===================== CURSOR ===================== */
function Cursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.style.position = "fixed";
    cursor.style.width = "40px";
    cursor.style.height = "40px";
    cursor.style.border = "1px solid black";
    cursor.style.borderRadius = "50%";
    cursor.style.pointerEvents = "none";
    cursor.style.display = "flex";
    cursor.style.alignItems = "center";
    cursor.style.justifyContent = "center";
    cursor.style.fontSize = "10px";
    cursor.style.zIndex = 999;

    document.body.appendChild(cursor);

    const move = (e) => {
      cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    };

    document.addEventListener("mousemove", move);

    document.querySelectorAll("img").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.innerHTML = "VIEW";
        cursor.style.transform += " scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.innerHTML = "";
        cursor.style.transform = cursor.style.transform.replace(" scale(1.5)", "");
      });
    });

    return () => document.removeEventListener("mousemove", move);
  }, []);

  return null;
}
