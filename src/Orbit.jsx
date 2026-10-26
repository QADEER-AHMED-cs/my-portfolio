import { useEffect, useRef } from "react";

/* Real brand logos from the open-source Devicon set (falls back to a letter if offline) */
const logo = (slug) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${slug}/${slug}-original.svg`;

const RING_1 = [
  { name: "React", src: logo("react"), color: "#0ea5e9" },
  { name: "Next.js", src: logo("nextjs"), color: "#000000", invert: true }, // 🆕 Added
  { name: "TypeScript", src: logo("typescript"), color: "#3178c6" },
  { name: "JavaScript", src: logo("javascript"), color: "#ca8a04" },
  { name: "Node.js", src: logo("nodejs"), color: "#339933" }, // 🆕 Added
  { name: "Express", src: logo("express"), color: "#000000", invert: true }, // 🆕 Added
  { name: "Python", src: logo("python"), color: "#3776ab" },
  { name: "Java", src: logo("java"), color: "#b07219" },
  { name: "ERPNext", letter: "E", color: "#0089ff" },
  { name: "Frappe", letter: "F", color: "#1d4ed8" },
  { name: "REST APIs", letter: "API", color: "#059669" },
  { name: "Postman", src: logo("postman"), color: "#ff6c37" },
];

const RING_2 = [
  { name: "PostgreSQL", src: logo("postgresql"), color: "#336791" },
  { name: "MongoDB", src: logo("mongodb"), color: "#47a248" },
  { name: "Prisma", letter: "P", color: "#2d3748" }, // 🆕 Added
  { name: "MySQL", src: logo("mysql"), color: "#00758f" },
  { name: "Firebase", src: logo("firebase"), color: "#ffca28" },
  { name: "Git", src: logo("git"), color: "#f34f29" },
  { name: "GitHub", src: logo("github"), color: "#6e7681", invert: true },
  { name: "Docker", src: logo("docker"), color: "#2496ed" }, // 🆕 Added
  { name: "TensorFlow", src: logo("tensorflow"), color: "#ff6f00" },
  { name: "PyTorch", src: logo("pytorch"), color: "#ee4c2c" },
];

function Node({ item, setRef }) {
  const useLetter = !item.src;
  return (
    <span ref={setRef} className="orbit-node" style={{ "--node-color": item.color }}>
      <span className={`orbit-node-icon${useLetter ? " letter" : ""}`}>
        {item.src && (
          <img
            src={item.src}
            alt=""
            loading="lazy"
            draggable="false"
            className={item.invert ? "invert" : ""}
            onError={(e) => e.currentTarget.parentElement.classList.add("letter")}
          />
        )}
        <b>{item.letter || item.name[0]}</b>
      </span>
      <span className="orbit-node-label">{item.name}</span>
    </span>
  );
}

export default function Orbit() {
  const stage = useRef(null);
  const r1 = useRef([]);
  const r2 = useRef([]);
  const s = useRef({ target: 1 });

  useEffect(() => {
    const el = stage.current;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = s.current;
    const speed = calm ? 0.35 : 1;
    st.target = 1;
    let v = 1, a1 = 0, a2 = 0, raf, last = performance.now(), visible = true;
    let r1v = 220, r2v = 136;

    const measure = () => {
      const size = Math.min(el.clientWidth, el.clientHeight);
      const edge = window.innerWidth <= 640 ? 26 : 64;
      r1v = size / 2 - edge; r2v = r1v * 0.62;
      el.style.setProperty("--r1", `${r1v}px`); el.style.setProperty("--r2", `${r2v}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);

    const place = (nodes, angle, r) => {
      const n = nodes.length;
      for (let i = 0; i < n; i++) {
        const node = nodes[i];
        if (!node) continue;
        const t = angle + (i * 2 * Math.PI) / n;
        const depth = (Math.sin(t) + 1) / 2;
        node.style.transform = `translate3d(${Math.cos(t) * r}px, ${Math.sin(t) * r}px, 0) translate(-50%, -50%) scale(${0.94 + depth * 0.14})`;
        node.style.opacity = 0.8 + depth * 0.2;
        node.style.zIndex = Math.round(depth * 100);
      }
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) {
        v += (st.target - v) * Math.min(1, dt * 5);
        a1 += (Math.PI * 2 / 36) * dt * v * speed;
        a2 -= (Math.PI * 2 / 46) * dt * v * speed;
        place(r1.current, a1, r1v);
        place(r2.current, a2, r2v);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  const pause = (e) => { if (e.target.closest(".orbit-node")) s.current.target = 0; };
  const resume = () => { s.current.target = 1; };

  return (
    <div className="orbit-wrap">
      <div className="orbit-stage" ref={stage} onPointerOver={pause} onPointerOut={resume}>
        <div className="orbit-glow" />
        <span className="orbit-path p1" />
        <span className="orbit-path p2" />
        <div className="orbit-core"><span className="orbit-core-text">QA</span></div>
        {RING_1.map((it, i) => <Node key={it.name} item={it} setRef={(n) => (r1.current[i] = n)} />)}
        {RING_2.map((it, i) => <Node key={it.name} item={it} setRef={(n) => (r2.current[i] = n)} />)}
      </div>
      <p className="orbit-hint">Hover a technology to pause · rings rotate in opposite directions</p>
    </div>
  );
}