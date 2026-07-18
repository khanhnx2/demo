const nav = document.querySelector("#phase-nav");
const screenEl = document.querySelector("#screen");
const titleEl = document.querySelector("#screen-title");
const toast = document.querySelector("#toast");
const dialog = document.querySelector("#confirm-dialog");

const icons = {
  copy: '<svg viewBox="0 0 24 24" focusable="false"><path d="M8 8h10v12H8z"/><path d="M6 16H4V4h12v2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" focusable="false"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>'
};

function statusClass(value) {
  const text = value.toLowerCase();
  if (text.includes("fail") || text.includes("block") || text.includes("danger")) return "danger";
  if (text.includes("wait") || text.includes("pending") || text.includes("warn")) return "warn";
  if (text.includes("success") || text.includes("completed") || text.includes("active")) return "success";
  return "info";
}

function renderNav() {
  nav.innerHTML = screens.map((item, index) => `
    <button class="nav-button" type="button" data-index="${index}">
      <span class="nav-index">${item.phase}</span>
      <span>${item.title}</span>
    </button>
  `).join("");
}

function renderMetrics(items) {
  return `<div class="metrics">${items.map(([label, value, note]) => `
    <article class="metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
    </article>
  `).join("")}</div>`;
}

function renderTable(table) {
  return `
    <article class="table-card">
      <div class="table-head">
        <h2>${table.title}</h2>
        <div class="filters"><span class="chip">Status</span><span class="chip">Token</span><span class="chip">Date range</span></div>
      </div>
      <table aria-label="${table.title}">
        <thead><tr>${table.headers.map(header => `<th scope="col">${header}</th>`).join("")}</tr></thead>
        <tbody>${table.rows.map(row => `<tr>${row.map(cell => renderCell(cell)).join("")}</tr>`).join("")}</tbody>
      </table>
    </article>
  `;
}

function renderCell(cell) {
  if (/^(ACTIVE|COMPLETED|PENDING|PROCESSING|SUCCESS|FAILED|BLOCK|WAIT|WARN|DANGER)$/i.test(cell)) {
    return `<td><span class="status ${statusClass(cell)}">${cell}</span></td>`;
  }
  if (cell.startsWith("0x") || cell.startsWith("tx_") || cell.startsWith("/")) {
    return `<td><span class="copy-row"><code>${cell}</code><button class="copy-mini" type="button" data-copy="${cell}" aria-label="Copy ${cell}">${icons.copy}</button></span></td>`;
  }
  return `<td>${cell}</td>`;
}

function renderForm(type) {
  const snippets = {
    login: `<button class="button primary" type="button">${icons.shield} Continue with Google</button><div class="alert">If merchant is blocked, API access and withdraws are disabled.</div>`,
    alerts: `<div class="alert">3 sweep jobs are waiting because transaction wallets need BNB gas.</div><pre class="code">Authorization: Bearer &lt;API_KEY&gt;\nPOST /transaction/create</pre>`,
    api: `<div class="field"><label for="api-key">Masked API key</label><input id="api-key" value="sk_live_************************q9r" readonly></div><button class="button danger" type="button" data-confirm="Reset API key">Reset API key</button>`,
    payment: `<div class="qr" role="img" aria-label="QR code for BSC wallet address"></div><div class="copy-row"><code>0x7b29aF92c8710B4e9874D5cFe71096419a</code><button class="copy-mini" type="button" data-copy="payment address" aria-label="Copy payment address">${icons.copy}</button></div>`,
    filters: `<div class="form-grid"><div class="field"><label for="status">Status</label><select id="status"><option>All statuses</option><option>ACTIVE</option><option>COMPLETED</option></select></div><div class="field"><label for="search">Search</label><input id="search" placeholder="UUID, wallet, tx hash"></div></div>`,
    wallet: `<div class="field"><label for="external-wallet">External wallet</label><input id="external-wallet" value="0xa431c5F9d021AeB84798aD4a2B91F0C12f"></div><p class="helper">Merchant owns this wallet private key. Wrong address can lose funds.</p>`,
    withdraw: `<div class="form-grid"><div class="field"><label for="token">Token</label><select id="token"><option>USDT</option><option>USDC</option></select></div><div class="field"><label for="amount">Amount</label><input id="amount" inputmode="decimal" value="300.00"></div></div><button class="button danger" type="button" data-confirm="Request withdraw">Request withdraw</button>`,
    admin: `<div class="form-grid"><div class="field"><label for="tier">Merchant tier</label><select id="tier"><option>Tier 5 - 30 active tx</option><option>Tier 10 - 100 active tx</option></select></div><button class="button danger" type="button" data-confirm="Block merchant">Block merchant</button></div>`,
    monitoring: `<div class="progress" aria-label="Queue depth target"><span style="--value:68%"></span></div><p class="helper">Sweep queue is above target. Top reason: missing BNB gas.</p>`,
    logs: `<div class="form-grid"><div class="field"><label for="severity">Severity</label><select id="severity"><option>All severities</option><option>WARN</option><option>DANGER</option></select></div><div class="field"><label for="service">Service</label><input id="service" placeholder="fastapi, redis, sweep-worker"></div></div>`
  };
  return snippets[type] || "";
}

function renderScreen(index) {
  const item = screens[index] || screens[1];
  titleEl.textContent = item.title;
  document.querySelectorAll(".nav-button").forEach((button, buttonIndex) => {
    button.setAttribute("aria-current", buttonIndex === index ? "page" : "false");
  });
  screenEl.innerHTML = `
    <section class="hero">
      <article class="panel">
        <p class="eyebrow">Phase ${item.phase} / ${item.owner}</p>
        <h2>${item.title}</h2>
        <p>${item.summary}</p>
        <div class="actions">
          <button class="button primary" type="button">${item.primary} ${icons.arrow}</button>
          <button class="button secondary" type="button">${item.secondary}</button>
        </div>
      </article>
      <aside class="card">
        <h3>UX intent</h3>
        <p>${item.side}</p>
        ${renderForm(item.form)}
      </aside>
    </section>
    ${renderMetrics(item.metrics)}
    <section class="content-grid">
      ${renderTable(item.table)}
      <article class="card stack">
        <h3>Implementation notes</h3>
        <p>Server-rendered page with progressive enhancement for copy buttons, confirmations, filters, and detail views.</p>
        <span class="status info">Keyboard navigable</span>
        <span class="status success">44px touch targets</span>
        <span class="status warn">Sensitive actions confirmed</span>
      </article>
    </section>
  `;
  location.hash = item.id;
  document.querySelector(".app-shell").classList.remove("mobile-open");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

renderNav();
const initialIndex = Math.max(0, screens.findIndex(item => item.id === location.hash.slice(1)));
renderScreen(initialIndex);

nav.addEventListener("click", event => {
  const button = event.target.closest(".nav-button");
  if (button) renderScreen(Number(button.dataset.index));
});

document.addEventListener("click", event => {
  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) showToast(`Copied ${copyButton.dataset.copy}`);
  const confirmButton = event.target.closest("[data-confirm]");
  if (confirmButton) {
    document.querySelector("#dialog-copy").textContent = `${confirmButton.dataset.confirm} requires Turnstile verification and explicit confirmation.`;
    dialog.showModal();
  }
});

document.querySelector("#theme-toggle").addEventListener("click", () => {
  const dark = document.documentElement.getAttribute("data-theme") !== "dark";
  if (dark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  document.querySelector("#theme-toggle").textContent = dark ? "Light mode" : "Dark mode";
});

document.querySelector("#menu-button").addEventListener("click", () => {
  document.querySelector(".app-shell").classList.toggle("mobile-open");
});
