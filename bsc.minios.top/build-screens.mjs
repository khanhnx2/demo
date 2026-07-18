import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "pm/uiux/screens";
mkdirSync(outDir, { recursive: true });

const nav = [
  ["login.html", "Login"],
  ["onboarding-success.html", "Onboarding"],
  ["merchant-blocked.html", "Blocked"],
  ["merchant-dashboard.html", "Dashboard"],
  ["dashboard-empty.html", "Empty dashboard"],
  ["api-key-management.html", "API key"],
  ["api-key-reset-confirm.html", "Reset confirm"],
  ["api-key-reset-result.html", "Reset result"],
  ["payment-active.html", "Payment active"],
  ["payment-completed.html", "Payment completed"],
  ["transaction-list.html", "Transactions"],
  ["transaction-detail.html", "Tx detail"],
  ["vault-wallet.html", "Vault"],
  ["external-wallet-edit.html", "External wallet"],
  ["external-wallet-confirm.html", "Wallet confirm"],
  ["withdraw-form.html", "Withdraw"],
  ["withdraw-confirm.html", "Withdraw confirm"],
  ["withdraw-result.html", "Withdraw result"],
  ["withdraw-history.html", "Withdraw history"],
  ["admin-merchant-list.html", "Merchants"],
  ["admin-merchant-detail.html", "Merchant detail"],
  ["admin-token-whitelist.html", "Tokens"],
  ["admin-token-form.html", "Token form"],
  ["transaction-monitoring.html", "Tx monitor"],
  ["sweep-monitoring.html", "Sweep monitor"],
  ["withdraw-monitoring.html", "Withdraw monitor"],
  ["system-logs.html", "Logs"],
  ["security-events.html", "Security"],
  ["deployment-health.html", "Health"]
];

const rows = {
  tx: [["tx_8f21", "ACTIVE", "0x7b...19a", "120 USDT"], ["tx_7a10", "COMPLETED", "0x51...d22", "45 USDC"], ["tx_6c55", "WAIT", "0x29...91c", "330 FDUSD"]],
  withdraw: [["USDT", "300.00", "PROCESSING", "Pending"], ["USDC", "100.00", "SUCCESS", "0x18cd...be9"], ["CAKE", "12.00", "FAILED", "Missing BNB"]],
  services: [["nginx", "SUCCESS", "healthy", "2d 4h"], ["fastapi", "SUCCESS", "healthy", "2d 4h"], ["sweep-worker", "WARN", "queue high", "12s heartbeat"]]
};

const screens = [
  s("login.html", "Login", "01", "Merchant", "Google SSO entry for merchants.", "Continue with Google", "API docs", [["Auth", "Google"], ["Default", "ACTIVE"], ["Turnstile", "Later"], ["Session", "Secure"]], form(["Google SSO button", "Support link", "API docs link"]), table("Trust checks", ["Control", "State"], [["Google SSO", "Required"], ["AES wallet encryption", "Enabled"], ["Cloudflare proxy", "Enabled"]])),
  s("onboarding-success.html", "Onboarding Success", "01", "Merchant", "First login setup confirmation.", "Go to dashboard", "View API key", [["Merchant", "Created"], ["API key", "Generated"], ["Vault", "Generated"], ["Status", "ACTIVE"]], checklist(["Merchant profile created", "API key generated", "Vault wallet generated"]), table("Created assets", ["Asset", "Value"], [["Merchant", "Acme Shop"], ["Vault", "0xa431...f12"], ["Tier", "0 / 5 active tx"]])),
  s("merchant-blocked.html", "Merchant Blocked", "01", "Merchant", "Blocked state with recovery path.", "Contact support", "Sign out", [["API", "Disabled"], ["Withdraw", "Disabled"], ["Status", "BLOCK"], ["Reason", "Admin"]], alert("Your merchant account is blocked. Payment APIs and withdraw actions are disabled."), table("Unavailable actions", ["Action", "Reason"], [["Create transaction", "Merchant blocked"], ["Withdraw", "Merchant blocked"], ["Reset API key", "Contact support"]])),
  s("merchant-dashboard.html", "Merchant Dashboard", "02", "Merchant", "Operational overview for merchant state.", "Create API transaction", "Refresh", [["Active tx", "12/30"], ["Vault USDT", "8,420"], ["Waiting sweep", "3"], ["Pending withdraw", "1"]], alert("3 sweep jobs are waiting for BNB gas."), table("Recent transactions", ["UUID", "Status", "Wallet", "Amount"], rows.tx)),
  s("dashboard-empty.html", "Dashboard Empty State", "02", "Merchant", "New merchant state before first API transaction.", "Open API key", "Read docs", [["Active tx", "0/5"], ["Vault", "0"], ["Transactions", "None"], ["Tier", "0"]], code("curl -X POST https://crypto.minios.top/transaction/create \\\n  -H 'Authorization: Bearer <API_KEY>'"), table("Next steps", ["Step", "Action"], [["1", "Copy API key"], ["2", "Call create transaction"], ["3", "Show address on merchant site"]])),
  s("api-key-management.html", "API Key Management", "03", "Merchant", "Copy and reveal bearer API key.", "Copy API key", "Reset key", [["Auth", "Bearer"], ["Key", "Masked"], ["APIs", "2"], ["Security", "Turnstile"]], form(["Masked API key", "Reveal toggle", "Copy button"]), table("Endpoints", ["Method", "Endpoint"], [["POST", "/transaction/create"], ["GET", "/transaction/{uuid}"]])),
  s("api-key-reset-confirm.html", "API Key Reset Confirm", "03", "Merchant", "Sensitive confirmation before key reset.", "Reset API key", "Cancel", [["Old key", "Revoked"], ["Confirm", "Required"], ["Turnstile", "Required"], ["Impact", "Integrations"]], confirm("Resetting the API key immediately breaks existing integrations."), table("Checklist", ["Requirement", "State"], [["Turnstile", "Incomplete"], ["Impact checkbox", "Unchecked"], ["Submit", "Disabled"]])),
  s("api-key-reset-result.html", "API Key Reset Result", "03", "Merchant", "One-time visibility for newly generated key.", "Copy new key", "Done", [["Result", "SUCCESS"], ["Visibility", "One time"], ["Old key", "Revoked"], ["Audit", "Logged"]], code("sk_live_new_7Hk...q9r"), table("Security events", ["Event", "State"], [["API key reset", "SUCCESS"], ["Old key revoked", "SUCCESS"], ["Admin visibility", "Metadata only"]])),
  s("payment-active.html", "Payment Active", "04", "Customer", "Public payment address with countdown and QR.", "Copy address", "Refresh status", [["Status", "ACTIVE"], ["Expires", "01:42:18"], ["Network", "BSC"], ["Tokens", "Whitelist"]], qr(), table("Received balances", ["Token", "Amount", "Last tx"], [["USDT", "100.00", "0x91ab...12ce"], ["USDC", "24.50", "0x88fa...42dd"], ["FDUSD", "0", "No transfer"]])),
  s("payment-completed.html", "Payment Completed", "04", "Customer", "Completed payment state after 2 hours.", "Copy receipt", "Close", [["Status", "COMPLETED"], ["Window", "Closed"], ["Received", "124.50"], ["Transfers", "2"]], alert("This transaction is completed. New payments to this address are not accepted by the system."), table("Final balances", ["Token", "Amount"], [["USDT", "100.00"], ["USDC", "24.50"]])),
  s("transaction-list.html", "Transaction List", "05", "Merchant", "Filterable merchant transaction table.", "Export CSV", "Clear filters", [["Active", "12"], ["Completed", "1,284"], ["Wait", "3"], ["Abandoned", "2"]], filters(["Status", "Token", "Date range", "Wallet search"]), table("Transactions", ["UUID", "Status", "Wallet", "Amount"], rows.tx)),
  s("transaction-detail.html", "Transaction Detail", "05", "Merchant", "Balances, blockchain transfers, and sweep state.", "Copy UUID", "Back to list", [["Status", "ACTIVE"], ["Expire", "11:42"], ["Transfers", "2"], ["Sweep", "WAIT"]], code("UUID tx_8f21\nWallet 0x7b29aF92c8710B4e9874D5cFe71096419a"), table("Blockchain transfers", ["Hash", "From", "Token", "Amount"], [["0x91ab...12ce", "0x88...203", "USDT", "100"], ["0x88fa...42dd", "0x77...881", "USDC", "24.5"]])),
  s("vault-wallet.html", "Vault Wallet", "06", "Merchant", "Vault address, BNB gas state, and token balances.", "Copy vault", "Go withdraw", [["BNB gas", "0.018"], ["USDT", "8,420"], ["USDC", "980"], ["CAKE", "42"]], alert("Vault private key is encrypted and never displayed."), table("Vault balances", ["Token", "Amount", "State"], [["BNB", "0.018", "SUCCESS"], ["USDT", "8,420", "SUCCESS"], ["USDC", "980", "SUCCESS"]])),
  s("external-wallet-edit.html", "External Wallet Edit", "06", "Merchant", "Edit destination wallet for withdrawals.", "Save wallet", "Cancel", [["Network", "BSC"], ["Address", "Required"], ["Turnstile", "Required"], ["Withdraw", "Enabled after save"]], form(["External wallet address", "Network fixed to BSC", "Turnstile block"]), table("Validation", ["Rule", "Message"], [["Format", "Must start with 0x"], ["Ownership", "Merchant controls private key"]])),
  s("external-wallet-confirm.html", "External Wallet Confirm", "06", "Merchant", "Confirm wallet replacement impact.", "Confirm change", "Back", [["Old wallet", "Masked"], ["New wallet", "0xa431..."], ["Risk", "High"], ["Audit", "Logged"]], confirm("Changing external wallet affects all future withdrawals."), table("Review", ["Field", "Value"], [["Network", "BNB Smart Chain"], ["External wallet", "0xa431...f12"], ["Private key", "Merchant owned"]])),
  s("withdraw-form.html", "Withdraw Form", "07", "Merchant", "Withdraw amount or all from vault.", "Request withdraw", "Withdraw all", [["Mode", "Amount"], ["Gas", "Ready"], ["Turnstile", "Required"], ["Queue", "Pending"]], form(["Token selector", "Amount input", "Withdraw all segmented control", "Gas readiness panel"]), table("Available balances", ["Token", "Available"], [["USDT", "8,420"], ["USDC", "980"], ["CAKE", "42"]])),
  s("withdraw-confirm.html", "Withdraw Confirm", "07", "Merchant", "Irreversible transfer confirmation.", "Confirm withdraw", "Cancel", [["Token", "USDT"], ["Amount", "300"], ["To", "0xa431..."], ["Risk", "Irreversible"]], confirm("Blockchain transfers cannot be reversed. Verify token, amount, and address."), table("Review", ["Field", "Value"], [["Token", "USDT"], ["Amount", "300"], ["External wallet", "0xa431...f12"]])),
  s("withdraw-result.html", "Withdraw Result", "07", "Merchant", "Request submission result.", "View history", "New withdraw", [["Status", "PENDING"], ["Worker", "Queued"], ["Gas", "Ready"], ["Audit", "Logged"]], alert("Withdraw request is queued. Status will update after worker processing."), table("Request", ["Field", "Value"], [["Token", "USDT"], ["Amount", "300"], ["Status", "PENDING"]])),
  s("withdraw-history.html", "Withdraw History", "07", "Merchant", "Withdraw list with status and failure recovery.", "Export CSV", "Filter", [["Pending", "1"], ["Processing", "1"], ["Success", "42"], ["Failed", "3"]], filters(["Token", "Status", "Date range"]), table("Withdraws", ["Token", "Amount", "Status", "Tx hash"], rows.withdraw)),
  s("admin-merchant-list.html", "Admin Merchant List", "08", "Admin", "Manage merchants, tiers, active/block.", "Create merchant note", "Filter", [["Merchants", "128"], ["Active", "124"], ["Blocked", "4"], ["Tier max", "100"]], filters(["Status", "Tier", "Email search"]), table("Merchants", ["Merchant", "Tier", "Status", "Active tx"], [["Acme Shop", "5", "ACTIVE", "12"], ["North Labs", "2", "ACTIVE", "3"], ["Risky Store", "0", "BLOCK", "0"]])),
  s("admin-merchant-detail.html", "Admin Merchant Detail", "08", "Admin", "Merchant profile, tier, status, and asset summary.", "Save tier", "Block merchant", [["Status", "ACTIVE"], ["Tier", "5"], ["Vault", "1"], ["API", "Metadata"]], form(["Tier select", "Status select", "Admin note"]), table("Merchant assets", ["Asset", "Value"], [["Vault", "0xa431...f12"], ["Active transactions", "12"], ["Pending withdraws", "1"]])),
  s("admin-token-whitelist.html", "Token Whitelist", "08", "Admin", "CRUD whitelist token policy.", "Create token", "Filter", [["Tokens", "7"], ["Enabled", "6"], ["Disabled", "1"], ["Ignored", "Non-whitelist"]], filters(["Status", "Symbol", "Contract search"]), table("Tokens", ["Symbol", "Contract", "Decimals", "Status"], [["USDT", "0x55d...7955", "18", "ACTIVE"], ["USDC", "0x8ac...580d", "18", "ACTIVE"], ["OLD", "0x000...dead", "18", "BLOCK"]])),
  s("admin-token-form.html", "Token Form", "08", "Admin", "Create or edit whitelisted BEP-20 token.", "Save token", "Cancel", [["Symbol", "Required"], ["Contract", "Required"], ["Decimals", "Required"], ["Status", "Active/Block"]], form(["Symbol", "Contract address", "Decimals", "Status"]), table("Validation", ["Rule", "Message"], [["Contract", "Must be valid BSC address"], ["Decimals", "Numeric"], ["Disable", "Future payments ignored"]])),
  s("transaction-monitoring.html", "Transaction Monitoring", "09", "Admin", "Monitor active and completed payment transactions.", "Export", "Pause refresh", [["Active", "184"], ["Completed 24h", "920"], ["Unsupported", "Ignored"], ["Refresh", "15s"]], filters(["Merchant", "Status", "Token", "Time range"]), table("Live transactions", ["UUID", "Merchant", "Status", "Amount"], [["tx_8f21", "Acme Shop", "ACTIVE", "120 USDT"], ["tx_7a10", "North Labs", "COMPLETED", "45 USDC"]])),
  s("sweep-monitoring.html", "Sweep Monitoring", "09", "Admin", "Track sweep jobs and retry state.", "Retry selected", "Filter gas waits", [["Waiting", "18"], ["Retry max", "365d"], ["Failed", "2"], ["Interval", "5m"]], alert("Most WAIT jobs need merchant-funded BNB gas."), table("Sweep jobs", ["Transaction", "Status", "Retry count", "Reason"], [["tx_6c55", "WAIT", "42", "Missing BNB"], ["tx_8f21", "PROCESSING", "1", "Worker active"]])),
  s("withdraw-monitoring.html", "Withdraw Monitoring", "09", "Admin", "Track withdraw worker queue and failures.", "Retry failed", "Pause refresh", [["Pending", "8"], ["Processing", "2"], ["Failed", "3"], ["Success 24h", "91"]], filters(["Merchant", "Token", "Status"]), table("Withdraw queue", ["Merchant", "Token", "Amount", "Status"], [["Acme Shop", "USDT", "300", "PROCESSING"], ["North Labs", "CAKE", "12", "FAILED"]])),
  s("system-logs.html", "System Logs", "10", "Admin", "Searchable system logs by service and severity.", "Copy filtered URL", "Export logs", [["Errors", "2"], ["Warn", "18"], ["Services", "7"], ["Window", "1h"]], filters(["Service", "Severity", "Date range", "Entity search"]), table("Logs", ["Time", "Severity", "Service", "Message"], [["12:08", "SUCCESS", "fastapi", "Google SSO login"], ["12:11", "WARN", "turnstile", "Withdraw challenge failed"], ["12:18", "DANGER", "api", "Blocked key used"]])),
  s("security-events.html", "Security Events", "10", "Admin", "Sensitive action audit trail.", "Export events", "Filter", [["API resets", "4"], ["Wallet changes", "2"], ["Turnstile fails", "8"], ["Withdraw attempts", "33"]], filters(["Event type", "Merchant", "Severity"]), table("Events", ["Time", "Event", "Actor", "State"], [["12:01", "API key reset", "Acme Shop", "SUCCESS"], ["12:11", "Turnstile failed", "North Labs", "WARN"], ["12:18", "Blocked API key used", "Risky Store", "DANGER"]])),
  s("deployment-health.html", "Deployment Health", "10", "Admin", "Docker Compose and Cloudflare health overview.", "Refresh health", "Copy report", [["Services", "7/7"], ["Cloudflare", "On"], ["WAF", "On"], ["Turnstile", "On"]], alert("Cloudflare proxy, SSL, WAF, and Turnstile are expected controls for production."), table("Services", ["Service", "State", "Detail", "Uptime"], rows.services))
];

function s(file, title, phase, owner, summary, primary, secondary, metrics, side, table) {
  return { file, title, phase, owner, summary, primary, secondary, metrics, side, table };
}

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function status(value) {
  const text = String(value).toLowerCase();
  if (/fail|block|danger/.test(text)) return "danger";
  if (/wait|pending|warn/.test(text)) return "warn";
  if (/success|complete|active/.test(text)) return "success";
  return "info";
}

function table(title, headers, data) {
  return `<article class="table-card"><div class="table-head"><h2>${esc(title)}</h2><div class="filters"><span class="chip">Server-rendered</span><span class="chip">Responsive</span></div></div><table><thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${data.map(row => `<tr>${row.map(cell).join("")}</tr>`).join("")}</tbody></table></article>`;
}

function cell(value) {
  const raw = String(value);
  if (/^(ACTIVE|COMPLETED|PENDING|PROCESSING|SUCCESS|FAILED|BLOCK|WAIT|WARN|DANGER)$/i.test(raw)) return `<td><span class="status ${status(raw)}">${esc(raw)}</span></td>`;
  if (raw.startsWith("0x") || raw.startsWith("tx_") || raw.startsWith("/")) return `<td><code>${esc(raw)}</code></td>`;
  return `<td>${esc(raw)}</td>`;
}

function form(items) {
  return `<div class="form-grid">${items.map((item, i) => `<div class="field"><label for="field-${i}">${esc(item)}</label><input id="field-${i}" placeholder="${esc(item)}"></div>`).join("")}</div>`;
}

function filters(items) {
  return `<div class="filters">${items.map(item => `<span class="chip">${esc(item)}</span>`).join("")}</div>`;
}

function alert(text) {
  return `<div class="alert">${esc(text)}</div>`;
}

function confirm(text) {
  return `${alert(text)}<label class="check-row"><input type="checkbox"><span>I understand the operational impact.</span></label><div class="turnstile">Cloudflare Turnstile placeholder</div>`;
}

function checklist(items) {
  return `<div class="stack">${items.map(item => `<span class="status success">${esc(item)}</span>`).join("")}</div>`;
}

function code(text) {
  return `<pre class="code">${esc(text)}</pre>`;
}

function qr() {
  return `<div class="qr" role="img" aria-label="QR code for BSC wallet address"></div><p class="helper"><code>0x7b29aF92c8710B4e9874D5cFe71096419a</code></p>`;
}

function page(screen) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(screen.title)} - crypto.minios.top</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Fira+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <a class="skip-link" href="#screen-title">Skip to main content</a>
  <div class="app-shell">
    <aside class="sidebar" aria-label="Screen navigation">
      <div class="brand"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"/></svg></span><span><strong>crypto</strong><small>minios.top</small></span></div>
      <nav class="phase-nav">${nav.map(([file, label], i) => `<a class="nav-button" href="${file}" ${file === screen.file ? 'aria-current="page"' : ""}><span class="nav-index">${String(i + 1).padStart(2, "0")}</span><span>${esc(label)}</span></a>`).join("")}</nav>
    </aside>
    <main class="main">
      <header class="topbar"><div><p class="eyebrow">Phase ${esc(screen.phase)} / ${esc(screen.owner)}</p><h1 id="screen-title">${esc(screen.title)}</h1></div><div class="topbar-actions"><a class="button secondary" href="index.html">All screens</a><a class="button secondary" href="../index.html">Prototype</a></div></header>
      <section class="screen">
        <section class="hero"><article class="panel"><p class="eyebrow">BNB Smart Chain Payment Gateway</p><h2>${esc(screen.summary)}</h2><div class="actions"><button class="button primary" type="button">${esc(screen.primary)}</button><button class="button secondary" type="button">${esc(screen.secondary)}</button></div></article><aside class="card"><h3>Screen UI</h3>${screen.side}</aside></section>
        <div class="metrics">${screen.metrics.map(([label, value]) => `<article class="metric"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(screen.owner)} workflow</small></article>`).join("")}</div>
        ${screen.table}
      </section>
    </main>
  </div>
</body>
</html>`;
}

const index = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>All UI Screens - crypto.minios.top</title><link rel="stylesheet" href="../styles.css"></head><body><main class="screen"><section class="panel"><p class="eyebrow">Screen-level UI package</p><h1>All screens</h1><p>Production-oriented HTML screens for the crypto payment gateway MVP.</p></section><section class="metrics">${screens.map(screen => `<a class="metric" href="${screen.file}"><span>Phase ${screen.phase}</span><strong>${esc(screen.title)}</strong><small>${esc(screen.owner)}</small></a>`).join("")}</section></main></body></html>`;

for (const screen of screens) writeFileSync(join(outDir, screen.file), page(screen));
writeFileSync(join(outDir, "index.html"), index);
