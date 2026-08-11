"use client";

import Image from "next/image";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

type SiteTab = "profile" | "studio" | "generator";
type ColorMode = "solid" | "gradient" | "rainbow";
type OutputFormat = "ampersand" | "section" | "minimessage" | "compact" | "plain";
type GeneratorScope = "all" | "config";
type Segment = { text: string; protected: boolean };
type PreviewCharacter = { value: string; color?: string; protected?: boolean };
type SpotifyController = {
  addListener: (event: string, callback: () => void) => void;
  destroy?: () => void;
  play: () => void;
};
type SpotifyIframeApi = {
  createController: (
    element: HTMLElement,
    options: { height: string; theme: "0"; uri: string; width: string },
    callback: (controller: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    SpotifyIframeApi?: SpotifyIframeApi;
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

const CHARACTER_MAP: Record<string, string> = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ",
  k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ",
  u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
};

const PROTECTED_PATTERN = /(https?:\/\/[^\s"'<>]+|<[^>\n]*>|%[^%\n]+%|\{[^{}\n]*\}|\[[^\]\n]*\]|(?:&|§)(?:#[0-9a-fA-F]{6}|[0-9a-fA-Fk-oK-OrR])|\\[ntr]|\/[a-zA-Z][\w:-]*|[a-zA-Z0-9_.-]+:[a-zA-Z0-9_./-]+|[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+){1,}|\b[\w-]+\.(?:yml|yaml|json|toml|ini|properties|xml|jar|txt|md)\b|\bv?\d+(?:\.\d+){1,}\b)/g;
const KEY_PREFIX = /^(\s*(?:-\s*)?(?:"[^"]+"|'[^']+'|[a-zA-Z0-9_.-]+)\s*:\s*)(.*)$/;

const projects = [
  { name: "KOrder", description: "Hệ thống order hiện đại, an toàn giao dịch và hỗ trợ đa economy.", tag: "order" },
  { name: "KShop", description: "Shop linh hoạt với nhiều style, economy hook và giao diện tùy chỉnh.", tag: "shop" },
  { name: "KShards", description: "Tiền tệ shards bất đồng bộ, tích hợp PlaceholderAPI và KShop.", tag: "currency" },
  { name: "KWorth", description: "Hệ thống định giá và bán vật phẩm gọn, nhanh, dễ cấu hình.", tag: "worth" },
];

const profileProjects = [
  { name: "KonomiMC", year: "2026", type: "Minecraft Network", description: "Máy chủ sinh tồn kinh tế với hệ thống riêng, giao diện gọn và lõi ưu tiên hiệu năng.", href: "https://konomimc.top", active: true },
  { name: "Kotoba Studio", year: "2026", type: "Minecraft Plugins", description: "Studio phát triển plugin miễn phí, tài liệu rõ ràng và trải nghiệm cấu hình dễ dùng.", href: "https://github.com/orgs/Kotoba-Studio/repositories", active: true },
  { name: "LangViet", year: "2025", type: "Minecraft Eco SMP", description: "Server kinh tế sinh tồn với hệ thống chợ và tiến trình chơi dài hạn.", active: false },
  { name: "MineXDra", year: "2023—24", type: "Minecraft Vanilla SMP", description: "Server sinh tồn vanilla được xây dựng xoay quanh cộng đồng người chơi.", active: false },
];

const profileSkills = [
  { index: "01", title: "Minecraft Engineering", items: "Paper · Folia · Canvas · Velocity" },
  { index: "02", title: "Interface Design", items: "UI / UX · Minecraft GUI · Design systems" },
  { index: "03", title: "Web & Scripting", items: "HTML · CSS · JavaScript · TypeScript · Lua" },
  { index: "04", title: "Server Operations", items: "Linux · Optimization · Networking · Community" },
];

const presets = [
  { name: "Kotoba", colors: ["#F8FAFC", "#8B95A5"] },
  { name: "Amethyst", colors: ["#E9D5FF", "#8B5CF6"] },
  { name: "Ocean", colors: ["#BAE6FD", "#2563EB"] },
  { name: "Sakura", colors: ["#FFE4E6", "#FB7185"] },
  { name: "Emerald", colors: ["#D1FAE5", "#10B981"] },
];

const formats: { value: OutputFormat; label: string; hint: string }[] = [
  { value: "ampersand", label: "&#RRGGBB", hint: "Essentials / CMI" },
  { value: "section", label: "§x§R§R...", hint: "Minecraft legacy" },
  { value: "minimessage", label: "<#RRGGBB>", hint: "MiniMessage" },
  { value: "compact", label: "<gradient>", hint: "MiniMessage gọn" },
  { value: "plain", label: "Không màu", hint: "Chỉ mini-font" },
];

function splitProtected(text: string): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;
  PROTECTED_PATTERN.lastIndex = 0;
  for (const match of text.matchAll(PROTECTED_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) segments.push({ text: text.slice(cursor, index), protected: false });
    segments.push({ text: match[0], protected: true });
    cursor = index + match[0].length;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), protected: false });
  return segments;
}

function tokenizeInput(value: string): Segment[] {
  const output: Segment[] = [];
  value.split("\n").forEach((line, index, lines) => {
    const match = line.match(KEY_PREFIX);
    if (match) {
      const content = match[2];
      const quote = content[0];
      const quoted = (quote === "\"" || quote === "'") && content.endsWith(quote) && content.length > 1;
      output.push({ text: match[1], protected: true });
      if (quoted) {
        output.push({ text: quote, protected: true }, ...splitProtected(content.slice(1, -1)), { text: quote, protected: true });
      } else {
        output.push(...splitProtected(content));
      }
    } else {
      output.push(...splitProtected(line));
    }
    if (index < lines.length - 1) output.push({ text: "\n", protected: true });
  });
  return output;
}

function tokenizeAll(value: string): Segment[] {
  return value ? [{ text: value, protected: false }] : [];
}

function convertCharacter(character: string) {
  if (character === "đ" || character === "Đ") return character;
  const mapped = CHARACTER_MAP[character.toLowerCase()];
  if (mapped) return mapped;
  return character.toLocaleLowerCase("vi-VN");
}

function normalizeHex(value: string) {
  const cleaned = value.trim().replace(/^#/, "").toUpperCase();
  return /^[0-9A-F]{6}$/.test(cleaned) ? `#${cleaned}` : null;
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return [Number.parseInt(value.slice(0, 2), 16), Number.parseInt(value.slice(2, 4), 16), Number.parseInt(value.slice(4, 6), 16)];
}

function rgbToHex(red: number, green: number, blue: number) {
  return `#${[red, green, blue].map((value) => Math.round(value).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

function interpolateColor(colors: string[], progress: number) {
  if (colors.length === 1) return colors[0];
  const position = progress * (colors.length - 1);
  const startIndex = Math.min(Math.floor(position), colors.length - 2);
  const localProgress = position - startIndex;
  const start = hexToRgb(colors[startIndex]);
  const end = hexToRgb(colors[startIndex + 1]);
  return rgbToHex(
    start[0] + (end[0] - start[0]) * localProgress,
    start[1] + (end[1] - start[1]) * localProgress,
    start[2] + (end[2] - start[2]) * localProgress,
  );
}

function rainbowColor(progress: number) {
  const hue = Math.round(progress * 320);
  const section = hue / 60;
  const chroma = 0.82;
  const x = chroma * (1 - Math.abs((section % 2) - 1));
  const channels = section < 1 ? [chroma, x, 0] : section < 2 ? [x, chroma, 0] : section < 3 ? [0, chroma, x] : section < 4 ? [0, x, chroma] : section < 5 ? [x, 0, chroma] : [chroma, 0, x];
  const offset = 0.12;
  return rgbToHex((channels[0] + offset) * 255, (channels[1] + offset) * 255, (channels[2] + offset) * 255);
}

function legacySection(hex: string) {
  return `§x${hex.slice(1).split("").map((character) => `§${character}`).join("")}`;
}

function colorCharacter(character: string, color: string, format: OutputFormat) {
  const hex = color.slice(1);
  if (format === "ampersand") return `&#${hex}${character}`;
  if (format === "section") return `${legacySection(color)}${character}`;
  if (format === "minimessage") return `<#${hex}>${character}`;
  return character;
}

function buildGenerator(input: string, miniFont: boolean, mode: ColorMode, colors: string[], format: OutputFormat, scope: GeneratorScope) {
  const sourceSegments = scope === "config" ? tokenizeInput(input) : tokenizeAll(input);
  const segments = sourceSegments.map((segment) => ({
    ...segment,
    text: segment.protected || !miniFont ? segment.text : Array.from(segment.text).map(convertCharacter).join(""),
  }));
  const visibleCount = segments.reduce((count, segment) => count + (segment.protected ? 0 : Array.from(segment.text).filter((character) => !/\s/.test(character)).length), 0);
  let cursor = 0;
  const preview: PreviewCharacter[] = [];
  const validColors = colors.map(normalizeHex).filter((color): color is string => Boolean(color));
  const palette = validColors.length ? validColors : ["#FFFFFF"];

  if (format === "compact") {
    const output = segments.map((segment) => {
      if (segment.protected || !segment.text) return segment.text;
      if (mode === "solid") return `<${palette[0]}>${segment.text}</${palette[0]}>`;
      const stops = mode === "rainbow" ? ["#FF4D6D", "#F9C74F", "#43AA8B", "#4D96FF", "#9B5DE5"] : palette;
      return `<gradient:${stops.join(":")}>${segment.text}</gradient>`;
    }).join("");
    segments.forEach((segment) => {
      Array.from(segment.text).forEach((value) => {
        const progress = visibleCount <= 1 ? 0 : cursor / (visibleCount - 1);
        const color = segment.protected || /\s/.test(value) ? undefined : mode === "rainbow" ? rainbowColor(progress) : interpolateColor(palette, mode === "solid" ? 0 : progress);
        preview.push({ value, color, protected: segment.protected });
        if (!segment.protected && !/\s/.test(value)) cursor += 1;
      });
    });
    return { output, preview };
  }

  const output = segments.map((segment) => {
    if (segment.protected || format === "plain") {
      Array.from(segment.text).forEach((value) => preview.push({ value, protected: segment.protected }));
      return segment.text;
    }
    return Array.from(segment.text).map((character) => {
      if (/\s/.test(character)) {
        preview.push({ value: character });
        return character;
      }
      const progress = visibleCount <= 1 ? 0 : cursor / (visibleCount - 1);
      const color = mode === "rainbow" ? rainbowColor(progress) : interpolateColor(palette, mode === "solid" ? 0 : progress);
      cursor += 1;
      preview.push({ value: character, color });
      return colorCharacter(character, color, format);
    }).join("");
  }).join("");
  return { output: format === "minimessage" && output ? `${output}<reset>` : output, preview };
}

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function SpotifyPlayer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let controller: SpotifyController | undefined;
    let disposed = false;

    const play = () => controller?.play();
    const createPlayer = (api: SpotifyIframeApi) => {
      if (!mountRef.current || disposed) return;
      api.createController(
        mountRef.current,
        { uri: "spotify:playlist:37i9dQZEVXbMDoHDwVN2tF", width: "100%", height: "100%", theme: "0" },
        (player) => {
          controller = player;
          player.addListener("ready", play);
          play();
        },
      );
    };

    window.onSpotifyIframeApiReady = (api) => {
      window.SpotifyIframeApi = api;
      createPlayer(api);
    };

    if (window.SpotifyIframeApi) {
      createPlayer(window.SpotifyIframeApi);
    } else if (!document.querySelector('script[data-spotify-iframe-api]')) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.dataset.spotifyIframeApi = "true";
      document.body.appendChild(script);
    }

    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("keydown", play, { once: true });

    return () => {
      disposed = true;
      controller?.destroy?.();
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
    };
  }, []);

  return (
    <div className="spotify-frame" aria-label="Spotify Top 50 Global">
      <div ref={mountRef} />
    </div>
  );
}

function Profile() {
  return (
    <div className="profile-view view-enter">
      <section className="profile-hero shell">
        <div className="profile-visual">
          <div className="profile-avatar-frame">
            <Image src="/avatar.png" alt="Avatar của Nguyễn Hồng Sơn" fill priority unoptimized sizes="(max-width: 700px) 45vw, 280px" />
          </div>
          <div className="profile-availability"><span /> available for collaboration</div>
        </div>
        <div className="profile-intro">
          <p className="profile-label">MY PROFILE · VIETNAM</p>
          <h1>Nguyễn Hồng Sơn</h1>
          <h2>Minecraft developer &amp; <em>interface builder.</em></h2>
          <p>Minecraft Plugin Developer · Owner, Kotoba Studio · From Vietnam</p>
          <div className="profile-actions">
            <a className="button button-primary" href="https://github.com/hongson209" target="_blank" rel="noreferrer">GitHub @hongson209 <ExternalArrow /></a>
            <a className="button button-secondary" href="https://dsc.gg/k-studio" target="_blank" rel="noreferrer">Discord <ExternalArrow /></a>
          </div>
        </div>
        <div className="profile-facts">
          <div><span>BASE</span><strong>Vietnam</strong></div>
          <div><span>TIMEZONE</span><strong>GMT+7</strong></div>
          <div><span>BUILDING SINCE</span><strong>2023</strong></div>
        </div>
      </section>

      <section className="profile-about shell">
        <div className="profile-about-copy">
          <p>ABOUT</p>
          <h2>Từ Minecraft SMP đến từng pixel giao diện.</h2>
          <span>Tôi từng vận hành nhiều server Minecraft, làm nội dung về hosting và xây UI/GUI cho cộng đồng. Hiện tại tôi tập trung vào KonomiMC, Kotoba Studio và tiếp tục học full-stack để mỗi sản phẩm tốt hơn một chút.</span>
        </div>
        <div className="profile-skills">
          {profileSkills.map((skill) => (
            <div className="profile-skill-row" key={skill.title}>
              <span>{skill.index}</span>
              <div><strong>{skill.title}</strong><small>{skill.items}</small></div>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-work shell">
        <div className="section-heading">
          <div><p>SELECTED WORK</p><h2>Những dự án đã định hình hành trình.</h2></div>
          <a href="https://github.com/hongson209" target="_blank" rel="noreferrer">Mở GitHub cá nhân <ExternalArrow /></a>
        </div>
        <div className="profile-project-grid">
          {profileProjects.map((project) => {
            const content = (
              <>
                <div className="profile-project-top"><span>{project.year}</span><i className={project.active ? "active" : ""}>{project.active ? "active" : "archive"}</i></div>
                <div><small>{project.type}</small><h3>{project.name}</h3><p>{project.description}</p></div>
                {project.href && <b><ExternalArrow /></b>}
              </>
            );
            return project.href ? <a className="profile-project" href={project.href} target="_blank" rel="noreferrer" key={project.name}>{content}</a> : <article className="profile-project" key={project.name}>{content}</article>;
          })}
        </div>
      </section>

      <section className="profile-music shell">
        <div className="music-copy">
          <div className="music-disc"><span /></div>
          <div><p>SPOTIFY · HOT THIS WEEK</p><h2>Top 50 — Global</h2><span>Playlist xu hướng được Spotify cập nhật tự động.</span></div>
        </div>
        <SpotifyPlayer />
      </section>
    </div>
  );
}

function Studio() {
  return (
    <div className="studio-view view-enter">
      <section className="studio-hero shell">
        <div className="hero-copy">
          <div className="status-pill"><span /> minecraft development studio</div>
          <p className="hero-kicker">KOTOBA STUDIO</p>
          <h1>Plugin gọn. Trải nghiệm <em>được trau chuốt.</em></h1>
          <p className="hero-description">Các dự án Minecraft miễn phí tập trung vào giao diện sạch, vận hành ổn định và cấu hình dễ dùng.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://github.com/orgs/Kotoba-Studio/repositories" target="_blank" rel="noreferrer">Xem projects <ExternalArrow /></a>
            <a className="button button-secondary" href="https://kotoba-studio.gitbook.io/kotoba-docs" target="_blank" rel="noreferrer">Đọc tài liệu <ExternalArrow /></a>
          </div>
        </div>
        <div className="studio-identity-card">
          <div className="studio-ribbon ribbon-one" />
          <div className="studio-ribbon ribbon-two" />
          <div className="studio-monogram">K</div>
          <div className="studio-identity-copy"><span>MINECRAFT DEVELOPMENT</span><strong>Kotoba Studio</strong><small>Open projects. Clean experience.</small></div>
          <div className="studio-owner">
            <Image src="/avatar.png" alt="Avatar của Hong Son" width={38} height={38} unoptimized />
            <span><small>OWNER</small><strong>Hong Son</strong></span>
            <a href="https://github.com/hongson209" target="_blank" rel="noreferrer"><ExternalArrow /></a>
          </div>
        </div>
      </section>

      <section className="projects-section shell">
        <div className="section-heading">
          <div><p>PROJECTS</p><h2>Những gì studio đang xây dựng.</h2></div>
          <a href="https://github.com/orgs/Kotoba-Studio/repositories" target="_blank" rel="noreferrer">Tất cả repositories <ExternalArrow /></a>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a className="project-card" href="https://github.com/orgs/Kotoba-Studio/repositories" target="_blank" rel="noreferrer" key={project.name}>
              <div className="project-number">0{index + 1}</div>
              <div className="project-content"><span>{project.tag}</span><h3>{project.name}</h3><p>{project.description}</p></div>
              <div className="project-arrow"><ExternalArrow /></div>
            </a>
          ))}
        </div>
      </section>

      <section className="connect-section shell">
        <div className="connect-card docs-card">
          <p>DOCUMENTATION</p>
          <h2>Bắt đầu nhanh với Kotoba.</h2>
          <span>Hướng dẫn cài đặt, command, permission và API được viết ngắn gọn theo từng plugin.</span>
          <a href="https://kotoba-studio.gitbook.io/kotoba-docs" target="_blank" rel="noreferrer">Mở Kotoba Docs <ExternalArrow /></a>
        </div>
        <div className="connect-card discord-card">
          <div className="discord-orb">K</div>
          <p>DISCORD COMMUNITY</p>
          <h2>Cùng xây dựng tốt hơn.</h2>
          <span>Nhận cập nhật release, hỗ trợ cấu hình và góp ý trực tiếp cho các dự án Kotoba.</span>
          <a href="https://dsc.gg/k-studio" target="_blank" rel="noreferrer">Tham gia dsc.gg/k-studio <ExternalArrow /></a>
        </div>
      </section>
    </div>
  );
}

function ColorField({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  const normalized = normalizeHex(value) ?? "#FFFFFF";
  return (
    <label className="color-field">
      <span>{label}</span>
      <div>
        <input className="native-color" type="color" value={normalized} onChange={(event) => onChange(event.target.value.toUpperCase())} />
        <input className="hex-input" value={value} maxLength={7} spellCheck={false} onChange={(event) => onChange(event.target.value.toUpperCase())} aria-label={`${label} hex`} />
      </div>
    </label>
  );
}

function Generator() {
  const [input, setInput] = useState("Chào mừng <player> đến với Kotoba Studio!");
  const [miniFont, setMiniFont] = useState(true);
  const [scope, setScope] = useState<GeneratorScope>("all");
  const [mode, setMode] = useState<ColorMode>("gradient");
  const [format, setFormat] = useState<OutputFormat>("ampersand");
  const [colors, setColors] = useState(["#F8FAFC", "#7C8799"]);
  const [copied, setCopied] = useState(false);
  const generated = useMemo(() => buildGenerator(input, miniFont, mode, colors, format, scope), [input, miniFont, mode, colors, format, scope]);

  const changeColor = (index: number, value: string) => setColors((current) => current.map((color, colorIndex) => colorIndex === index ? value : color));
  const applyPreset = (presetColors: string[]) => {
    setColors(presetColors);
    setMode("gradient");
  };
  const copyOutput = async () => {
    await navigator.clipboard.writeText(generated.output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="generator-view shell view-enter">
      <section className="generator-heading">
        <div><p>MINECRAFT TOOL</p><h1>Font & Hex Generator</h1></div>
        <span>Chuyển toàn bộ text hoặc bảo vệ cấu trúc config, kết hợp mini-font và màu hex Minecraft.</span>
      </section>

      <div className="generator-layout">
        <div className="generator-main">
          <section className="tool-card input-card">
            <div className="card-title"><div><span>01</span><h2>Nội dung</h2></div><label className="switch"><input type="checkbox" checked={miniFont} onChange={(event) => setMiniFont(event.target.checked)} /><i /><span>Mini font</span></label></div>
            <div className="generator-scope" role="tablist" aria-label="Phạm vi chuyển đổi">
              <button className={scope === "all" ? "active" : ""} role="tab" aria-selected={scope === "all"} onClick={() => setScope("all")}><strong>All Text</strong><span>Chuyển toàn bộ ký tự</span></button>
              <button className={scope === "config" ? "active" : ""} role="tab" aria-selected={scope === "config"} onClick={() => setScope("config")}><strong>Safe Config</strong><span>Giữ nguyên cú pháp</span></button>
            </div>
            <textarea value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} aria-label="Nội dung cần chuyển đổi" placeholder="Nhập text hoặc config Minecraft..." />
            <div className="input-meta"><span>{Array.from(input).length} ký tự</span><span>{scope === "config" ? "Bảo vệ &color, <tag>, %placeholder%, /command và key config" : "Áp dụng font và màu lên toàn bộ nội dung"}</span></div>
          </section>

          <section className="tool-card preview-card">
            <div className="card-title"><div><span>02</span><h2>Preview</h2></div><span className="live-badge">LIVE</span></div>
            <pre className="minecraft-preview" aria-live="polite">
              {generated.preview.map((character, index) => (
                <Fragment key={`${index}-${character.value}`}><span className={character.protected ? "protected-text" : undefined} style={character.color ? { color: character.color } : undefined}>{character.value}</span></Fragment>
              ))}
            </pre>
          </section>

          <section className="tool-card output-card">
            <div className="card-title"><div><span>03</span><h2>Kết quả</h2></div><button className={copied ? "copy-button copied" : "copy-button"} onClick={copyOutput}>{copied ? "Đã sao chép" : "Sao chép"}</button></div>
            <textarea value={generated.output} readOnly spellCheck={false} aria-label="Kết quả đã tạo" />
          </section>
        </div>

        <aside className="generator-sidebar">
          <section className="tool-card settings-card">
            <div className="card-title"><div><span>A</span><h2>Kiểu màu</h2></div></div>
            <div className="segmented-control">
              {(["solid", "gradient", "rainbow"] as ColorMode[]).map((value) => <button className={mode === value ? "active" : ""} onClick={() => setMode(value)} key={value}>{value === "solid" ? "Một màu" : value === "gradient" ? "Gradient" : "Rainbow"}</button>)}
            </div>
            {mode !== "rainbow" && <div className="color-list">
              {colors.map((color, index) => <ColorField key={`${index}-${colors.length}`} label={mode === "solid" ? "Màu chính" : `Màu ${index + 1}`} value={color} onChange={(value) => changeColor(index, value)} />)}
              {mode === "gradient" && <div className="color-actions">
                <button disabled={colors.length >= 5} onClick={() => setColors((current) => [...current, "#A78BFA"])}>+ Thêm màu</button>
                <button disabled={colors.length <= 2} onClick={() => setColors((current) => current.slice(0, -1))}>− Bớt màu</button>
              </div>}
            </div>}
            {mode === "rainbow" && <div className="rainbow-swatch" />}
          </section>

          <section className="tool-card settings-card">
            <div className="card-title"><div><span>B</span><h2>Preset</h2></div></div>
            <div className="preset-grid">
              {presets.map((preset) => <button onClick={() => applyPreset(preset.colors)} key={preset.name}><i style={{ background: `linear-gradient(135deg, ${preset.colors.join(", ")})` }} /><span>{preset.name}</span></button>)}
            </div>
          </section>

          <section className="tool-card settings-card">
            <div className="card-title"><div><span>C</span><h2>Định dạng</h2></div></div>
            <div className="format-list">
              {formats.map((item) => <button className={format === item.value ? "active" : ""} onClick={() => setFormat(item.value)} key={item.value}><span><strong>{item.label}</strong><small>{item.hint}</small></span><i /></button>)}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState<SiteTab>("profile");

  const selectTab = (nextTab: SiteTab) => {
    setTab(nextTab);
    const hash = nextTab === "profile" ? "#profile" : nextTab === "studio" ? "#kotoba-studio" : "#font-generator";
    window.history.replaceState(null, "", hash);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <div className="header-inner shell">
          <button className="brand" onClick={() => selectTab("profile")} aria-label="Mở My Profile">
            <Image className="brand-avatar" src="/avatar.png" alt="" width={38} height={38} unoptimized />
            <span><strong>Hong Son</strong><small>Personal site</small></span>
          </button>
          <nav className="tab-navigation" aria-label="Điều hướng chính" role="tablist">
            <button className={tab === "profile" ? "active" : ""} role="tab" aria-selected={tab === "profile"} onClick={() => selectTab("profile")}>My Profile</button>
            <button className={tab === "studio" ? "active" : ""} role="tab" aria-selected={tab === "studio"} onClick={() => selectTab("studio")}>Kotoba Studio</button>
            <button className={tab === "generator" ? "active" : ""} role="tab" aria-selected={tab === "generator"} onClick={() => selectTab("generator")}>Font Generator</button>
          </nav>
          <a className="header-link" href="https://github.com/hongson209" target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a>
        </div>
      </header>
      {tab === "profile" ? <Profile /> : tab === "studio" ? <Studio /> : <Generator />}
      <footer className="site-footer shell"><span>© 2026 Nguyễn Hồng Sơn</span><div><a href="https://github.com/hongson209" target="_blank" rel="noreferrer">GitHub</a><a href="https://github.com/orgs/Kotoba-Studio/repositories" target="_blank" rel="noreferrer">Kotoba</a><a href="https://dsc.gg/k-studio" target="_blank" rel="noreferrer">Discord</a></div></footer>
    </main>
  );
}
