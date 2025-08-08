SKYNETCOIN — ПЛОСКАЯ СБОРКА НА ОСНОВЕ ТВОЕГО index.html
---------------------------------------------------------
Файлы клади в корень репозитория (без папок).
Что нужно поменять вручную:
1) logo.png — твой логотип (PNG), background.png — фон сайта.
2) В main.js в объекте window.SKY замени ссылки соцсетей и CONTACT_EMAIL.
3) В index.html замени https://example.com/ в og:url и canonical на реальную ссылку Pages.
4) Если нужна аналитика GA4 — включи ENABLE_GA4=true и подставь GA4_ID.

После загрузки в репо: Settings → Pages → Source: main / (root) → Save.


НОВОЕ В ЭТОЙ СБОРКЕ
------------------
- Кнопка **Connect Wallet** в шапке + вывод адреса.
- Проверка/переключение сети на **BNB Chain (56)**.
- Кнопки в секции **How to buy**: Copy contract, Add $SKY to MetaMask, Buy on PancakeSwap.
- Заглушка под **Airdrop** (кнопка Claim $SKY; по умолчанию выключено).
- Конфиг `window.SKY` расширен: `ENABLE_AIRDROP`, `ENABLE_BUY`, `CHAIN_ID`, `TOKEN{ address, symbol, decimals, image }`, `SOCIALS`.
- Включение GA4 как и раньше: `ENABLE_GA4` и `GA4_ID`.

ЧТО НАСТРОИТЬ ПЕРЕД ПУБЛИКАЦИЕЙ
-------------------------------
1) В `main.js` → `window.SKY.TOKEN.address/symbol/decimals` проверь адрес/символ/десятичность токена.
2) В `window.SKY.SOCIALS` подставь реальные ссылки.
3) Если есть домен — замени `https://example.com/` в:
   - `<meta property="og:url">` и `<link rel="canonical">` в `index.html`
   - `robots.txt` и `sitemap.xml`
4) Включи `ENABLE_AIRDROP=true`, когда будет готов бекенд под верификацию подписей.
