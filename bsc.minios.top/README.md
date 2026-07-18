# HTML UI/UX Prototype

Open [index.html](index.html) directly in a browser.

Open [screens/index.html](screens/index.html) for the full screen-level gallery.

## Contents

- `index.html` - static HTML shell.
- `styles.css` - responsive enterprise fintech design system.
- `screens.js` - content model for 10 MVP phases.
- `app.js` - lightweight rendering and prototype interactions.
- `build-screens.mjs` - generator for static screen-level HTML files.
- `screens/` - 29 production-oriented HTML screens plus gallery index.

## Covered Phases

1. Authentication & Merchant Onboarding
2. Merchant Dashboard
3. API Key Management
4. Transaction Create & Payment View
5. Transaction List & Detail
6. Vault & External Wallet
7. Withdraw Flow
8. Admin Merchant & Token Management
9. Monitoring
10. System Logs, Security & Health

## Screen-Level HTML

- `screens/login.html`
- `screens/onboarding-success.html`
- `screens/merchant-blocked.html`
- `screens/merchant-dashboard.html`
- `screens/dashboard-empty.html`
- `screens/api-key-management.html`
- `screens/api-key-reset-confirm.html`
- `screens/api-key-reset-result.html`
- `screens/payment-active.html`
- `screens/payment-completed.html`
- `screens/transaction-list.html`
- `screens/transaction-detail.html`
- `screens/vault-wallet.html`
- `screens/external-wallet-edit.html`
- `screens/external-wallet-confirm.html`
- `screens/withdraw-form.html`
- `screens/withdraw-confirm.html`
- `screens/withdraw-result.html`
- `screens/withdraw-history.html`
- `screens/admin-merchant-list.html`
- `screens/admin-merchant-detail.html`
- `screens/admin-token-whitelist.html`
- `screens/admin-token-form.html`
- `screens/transaction-monitoring.html`
- `screens/sweep-monitoring.html`
- `screens/withdraw-monitoring.html`
- `screens/system-logs.html`
- `screens/security-events.html`
- `screens/deployment-health.html`

## UX Notes

- Built for FastAPI + Jinja2 migration: layout, cards, tables, forms, modals, status pills can become partials.
- Uses semantic labels, visible focus states, keyboard-friendly controls, and text status labels.
- Sensitive actions show confirmation modal and Turnstile placeholder.
- Static mock data only; no backend required.
