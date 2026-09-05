/**
 * PocketCircle — Modern 3-Part Architecture & 12-Section Interactive Engine
 * Parts: 1. Landing Page | 2. Auth Page (Google Sign-In) | 3. Master 12-Section Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  handleUrlRouting();
  window.addEventListener('hashchange', handleUrlRouting);
  initSpendTracker();
  initGoalSimulator();
});

/* ==========================================================================
   01. Theme Engine (Warm Skinnish Minimalist)
   ========================================================================== */
function initTheme() {
  const htmlRoot = document.documentElement;
  htmlRoot.setAttribute('data-theme', 'warm-minimal');
  localStorage.setItem('pocketcircle-theme', 'warm-minimal');
}

/* ==========================================================================
   02. Single-Page Navigation & Routing
   ========================================================================== */
let currentUser = localStorage.getItem('pocketcircle-user') ? JSON.parse(localStorage.getItem('pocketcircle-user')) : null;

function handleUrlRouting() {
  const hash = window.location.hash.replace('#', '') || 'landing';

  if (hash === 'auth') {
    renderView('auth');
  } else if (hash === 'dashboard') {
    renderView('dashboard');
  } else if (hash.startsWith('section-')) {
    const secId = hash.replace('section-', '');
    renderView('dashboard');
    openSectionDetail(secId);
  } else {
    renderView('landing');
  }
}

function navigateTo(viewId) {
  window.location.hash = viewId;
}

function renderView(viewName) {
  const views = {
    landing: document.getElementById('view-landing'),
    auth: document.getElementById('view-auth'),
    dashboard: document.getElementById('view-dashboard')
  };

  const landingNav = document.getElementById('landing-nav');
  const dashboardNavContext = document.getElementById('dashboard-nav-context');
  const headerCta = document.getElementById('header-cta');

  // Toggle visible views
  Object.keys(views).forEach(key => {
    if (key === viewName) {
      views[key].style.display = 'block';
    } else {
      views[key].style.display = 'none';
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update Header Context
  if (viewName === 'dashboard') {
    landingNav.style.display = 'none';
    dashboardNavContext.style.display = 'flex';
    headerCta.textContent = 'Active Workspace';
    headerCta.onclick = () => closeSectionDetail();
  } else if (viewName === 'auth') {
    landingNav.style.display = 'flex';
    dashboardNavContext.style.display = 'none';
    headerCta.textContent = 'Sandbox Bypass';
    headerCta.onclick = () => handleGoogleSignIn();
  } else {
    landingNav.style.display = 'flex';
    dashboardNavContext.style.display = 'none';
    headerCta.textContent = 'Enter Platform';
    headerCta.onclick = () => navigateTo('auth');
  }
}

/* ==========================================================================
   03. Authentication Handlers (Google Sign-In & Direct Demo)
   ========================================================================== */
function handleGoogleSignIn() {
  currentUser = {
    name: 'Aarav Mehta',
    email: 'aarav.mehta@iitd.ac.in',
    flat: 'Flat 402, Nilgiri Hostel',
    role: 'Student & Co-Tenant'
  };
  localStorage.setItem('pocketcircle-user', JSON.stringify(currentUser));
  navigateTo('dashboard');
}

function handleEmailSignIn() {
  const emailInput = document.getElementById('auth-email');
  const email = emailInput ? emailInput.value : 'student@campus.edu';
  currentUser = {
    name: email.split('@')[0],
    email: email,
    flat: 'Campus Hostel Flat 402',
    role: 'Student'
  };
  localStorage.setItem('pocketcircle-user', JSON.stringify(currentUser));
  navigateTo('dashboard');
}

function demoDirectLogin() {
  handleGoogleSignIn();
}

function signOutUser() {
  localStorage.removeItem('pocketcircle-user');
  currentUser = null;
  navigateTo('landing');
}

/* ==========================================================================
   04. Master Dashboard 12-Section Drill-Down Workspace Controller
   ========================================================================== */
const sectionsData = {
  '01': {
    number: '01',
    title: 'Hostel & Flatmate Bill Splitter',
    category: 'CAMPUS MICRO-FINANCE',
    desc: 'Automated debt allocation for room rent, groceries, late-night canteen runs, and WiFi without WhatsApp awkwardness.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 01 · SPLIT ENGINE</span>
        <h2 class="workspace-title">Hostel & Flatmate Bill Splitter</h2>
        <p class="workspace-sub">Flat 402 active cycle. Settle room debts with 1-tap UPI dispatch and zero manual bookkeeping.</p>
      </div>

      <div class="split-cockpit-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <div style="background: var(--bg-surface-elevated); padding: 28px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <h4 style="font-size: 1.1rem; font-weight: 600;">Current Split Bill</h4>
            <span class="badge-subtle">Flat 402 · 4 Roommates</span>
          </div>
          <div style="margin-bottom: 20px; font-size: 0.95rem;">
            <div style="display: flex; justify-content: space-between; padding: 6px 0;">
              <span>Bill Description:</span> <strong>WiFi + Midnight Swiggy Feast</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0;">
              <span>Total Bill:</span> <strong class="mono-text" style="font-size: 1.2rem;">₹2,400</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0;">
              <span>Your Share (25%):</span> <strong class="mono-text text-emerald">₹600 (Covered)</strong>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-hairline);">
              <div>
                <strong>Rahul Kumar</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Settled via UPI · 10:14 PM</div>
              </div>
              <span class="text-emerald mono-text" style="font-size: 0.85rem;">✓ Paid ₹600</span>
            </div>
            <div id="roommate-ananya-card" style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-hairline);">
              <div>
                <strong>Ananya Sharma</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Unsettled · 1 ping sent</div>
              </div>
              <button class="btn-micro primary" onclick="settleRoommate('ananya')">Settle ₹600</button>
            </div>
            <div id="roommate-kabir-card" style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-hairline);">
              <div>
                <strong>Kabir Mehta</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Unsettled · Mess refund offset</div>
              </div>
              <button class="btn-micro primary" onclick="settleRoommate('kabir')">Settle ₹600</button>
            </div>
          </div>

          <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="settleAllRoommates()">
            1-Tap Settle All Dues (₹1,200)
          </button>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 28px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="editorial-kicker">AUTOMATIC SWEEP FLOW</span>
            <h4 style="font-size: 1.2rem; font-weight: 600; margin: 8px 0 12px;">Where Settled Dues Go</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              Unlike traditional apps where settled money rots as idle payment balance, PocketCircle automatically routes recovered dues straight into your prioritized Goal Vault.
            </p>
          </div>
          <div style="padding: 18px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-hairline); margin: 20px 0;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Active Vault Target</div>
            <div style="font-size: 1.1rem; font-weight: 600; margin: 4px 0;">Semester-End Goa Trip Fund</div>
            <div class="mono-text text-emerald" id="sweep-vault-stat">₹18,600 / ₹25,000 funded</div>
          </div>
          <div id="split-action-status" style="font-size: 0.85rem; color: var(--accent-emerald); font-family: var(--font-mono); min-height: 24px;"></div>
        </div>
      </div>
    `
  },

  '02': {
    number: '02',
    title: 'The "What-If" Impulse Simulator',
    category: 'INTELLIGENT PRE-SPEND INTERCEPTION',
    desc: 'Simulate pre-spend butterfly effects before you scan a payment QR code.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 02 · PREDICTIVE COCKPIT</span>
        <h2 class="workspace-title">The "What-If" Impulse Simulator</h2>
        <p class="workspace-sub">Slide to simulate any prospective spend and observe the immediate real-world effect on your mess runway and goal timelines.</p>
      </div>

      <div style="background: var(--bg-surface-elevated); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--border-hairline); margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <strong style="font-size: 1.1rem;">Simulate Outing / Purchase Amount:</strong>
          <span class="mono-text text-gold" id="workspace-sim-pill" style="font-size: 1.6rem; font-weight: 700; background: var(--accent-gold-soft); padding: 4px 18px; border-radius: var(--radius-full);">₹1,800</span>
        </div>

        <input type="range" id="ws-impulse-slider" class="minimal-slider" min="200" max="6000" step="100" value="1800" oninput="runWorkspaceWhatIf(this.value)">
        
        <div class="slider-ticks">
          <span>₹200 (Canteen)</span>
          <span>₹2,000 (Dinner & Drinks)</span>
          <span>₹4,000 (Weekend Trip)</span>
          <span>₹6,000 (Gadget BNPL)</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;">
        <div style="background: var(--bg-surface); padding: 26px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Mess & Rent Runway</span>
          <div class="mono-text" id="ws-runway-metric" style="font-size: 1.5rem; font-weight: 700; margin: 8px 0;">16 Days Safe</div>
          <p id="ws-runway-note" style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">Mess dues due on the 10th (₹3,200) remain safely funded.</p>
        </div>

        <div style="background: var(--bg-surface); padding: 26px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">MacBook Fund Delay</span>
          <div class="mono-text text-gold" id="ws-goal-metric" style="font-size: 1.5rem; font-weight: 700; margin: 8px 0;">+11 Days Push</div>
          <p id="ws-goal-note" style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">Full funding date pushed to Nov 23, 2026.</p>
        </div>

        <div style="background: var(--bg-surface); padding: 26px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">AI Waste Detection Nudge</span>
          <div style="font-size: 0.88rem; font-style: italic; color: var(--text-secondary); margin-top: 10px; line-height: 1.5;" id="ws-waste-nudge">
            "Spending ₹1,800 tonight is equivalent to 40 canteen coffees. Trimming this to ₹600 recovers ₹1,200 into your emergency cushion."
          </div>
        </div>
      </div>
    `
  },

  '03': {
    number: '03',
    title: 'Mess & Canteen Runway Tracker',
    category: 'DAILY BURN MANAGEMENT',
    desc: 'Daily cash & UPI burn calculator with countdown till the next hostel mess fee due date.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 03 · RUNWAY COCKPIT</span>
        <h2 class="workspace-title">Mess & Canteen Runway Tracker</h2>
        <p class="workspace-sub">Tracks every petty cash and UPI scan to safeguard against mid-month dryouts.</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <div style="background: var(--bg-surface-elevated); padding: 32px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
          <h4 style="font-size: 1.1rem; margin-bottom: 16px;">Runway Health Analysis</h4>
          <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px;">
              <span>Monthly Pocket Money:</span> <strong class="mono-text">₹8,000</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px;">
              <span>Hostel Mess Dues Reserved:</span> <strong class="mono-text text-emerald">₹3,200 (Protected)</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px;">
              <span>Current Available Cash:</span> <strong class="mono-text">₹4,200</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px;">
              <span>Safe Daily Burn Rate:</span> <strong class="mono-text text-gold">₹220 / day</strong>
            </div>
          </div>
          <div style="padding: 16px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-hairline); font-size: 0.85rem; color: var(--text-secondary);">
            💡 <strong>Smart Alarm:</strong> If your daily spend exceeds ₹350 for 2 consecutive days, PocketCircle will trigger an automatic burn freeze alert.
          </div>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 32px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
          <h4 style="font-size: 1.1rem; margin-bottom: 16px;">Recent Campus Outlays</h4>
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.88rem;">
            <div style="display: flex; justify-content: space-between; padding: 10px; background: var(--bg-surface); border-radius: var(--radius-sm);">
              <span>Nescafe Kiosk (Coffee + Maggi)</span>
              <strong class="mono-text">-₹65</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px; background: var(--bg-surface); border-radius: var(--radius-sm);">
              <span>Hostel Stationery (Printouts)</span>
              <strong class="mono-text">-₹40</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px; background: var(--bg-surface); border-radius: var(--radius-sm);">
              <span>Evening Chai Tapri</span>
              <strong class="mono-text">-₹30</strong>
            </div>
          </div>
        </div>
      </div>
    `
  },

  '04': {
    number: '04',
    title: 'Direct UPI Settlement Engine',
    category: 'ZERO-FRICTION PAYMENTS',
    desc: 'Pay roommate debts directly without typing VPA or copying phone numbers.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 04 · UPI DIRECT</span>
        <h2 class="workspace-title">Direct UPI Settlement Engine</h2>
        <p class="workspace-sub">Integrated UPI QR intent generator that settles debts in 1 click without leaving the app.</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <div style="background: var(--bg-surface-elevated); padding: 32px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline); text-align: center;">
          <h4 style="font-size: 1.1rem; margin-bottom: 8px;">Simulated Dynamic UPI QR</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 24px;">Pre-loaded with exact split amount ₹600 to Flat 402 pool.</p>
          
          <div style="width: 180px; height: 180px; margin: 0 auto 20px; background: #ffffff; border: 2px solid var(--border-hairline); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 4rem;">
            🏁
          </div>
          <div class="mono-text" style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 16px;">
            UPI ID: pocketcircle.flat402@axisbank
          </div>
          <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="alert('UPI Intent Launched: Simulating instant settlement receipt!')">
            Simulate 1-Tap UPI Intent Dispatch
          </button>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 32px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
          <h4 style="font-size: 1.1rem; margin-bottom: 16px;">Why Native UPI Matters</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px; font-size: 0.88rem; color: var(--text-secondary);">
            <li>✓ <strong>Zero VPA Typing:</strong> No manually asking "Hey what's your Google Pay number?".</li>
            <li>✓ <strong>Instant Reconciliation:</strong> Debts update in real time the millisecond the webhook fires.</li>
            <li>✓ <strong>Closed-Loop Auto Sweep:</strong> Unlocked funds immediately populate micro-savings vaults.</li>
          </ul>
        </div>
      </div>
    `
  },

  '05': {
    number: '05',
    title: 'Dues-to-Vault Auto Sweep',
    category: 'CLOSED-LOOP WEALTH ACCUMULATION',
    desc: 'Directing settled student debts into high-yield goal vaults rather than letting cash leak out.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 05 · CLOSED-LOOP SWEEP</span>
        <h2 class="workspace-title">Dues-to-Vault Auto Sweep</h2>
        <p class="workspace-sub">The mechanism that prevents reclaimed flatmate money from disappearing into impulse canteen snacks.</p>
      </div>
      <div style="background: var(--bg-surface-elevated); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--border-hairline);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
          <div>
            <h4 style="font-size: 1.2rem; font-weight: 600;">Active Sweep Rule: 100% Flat Dues ➔ Goa Trip Vault</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Every time Rahul, Ananya or Kabir settles a bill, the money routes automatically.</p>
          </div>
          <span class="badge-subtle">SWEEP ACTIVE</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; justify-content: space-between; padding: 14px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-hairline);">
            <span>Yesterday 10:14 PM · Rahul Settled WiFi Share</span>
            <strong class="mono-text text-emerald">+₹600 Auto-Swept</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 14px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-hairline);">
            <span>3 Days Ago · Mess Electricity Refund</span>
            <strong class="mono-text text-emerald">+₹1,200 Auto-Swept</strong>
          </div>
        </div>
      </div>
    `
  },

  '06': {
    number: '06',
    title: 'Live Net Worth Cockpit (RBI Aggregator)',
    category: 'CONSOLIDATED ASSETS & LIABILITIES',
    desc: 'Unified balance sheet tracking all liquid accounts, sweep-in FDs, and mutual funds via RBI Account Aggregator.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 06 · NET WORTH COCKPIT</span>
        <h2 class="workspace-title">Live Net Worth Cockpit</h2>
        <p class="workspace-sub">RBI Account Aggregator consent-linked balance sheet updating in real-time without screen-scraping.</p>
      </div>
      <div style="background: var(--bg-surface-elevated); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--border-hairline); margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Total Consolidated Net Worth</span>
            <div class="mono-text" style="font-size: 2.8rem; font-weight: 700; margin: 4px 0;">₹ 4,82,300</div>
            <span class="text-emerald" style="font-size: 0.85rem;">▲ 6.2% this quarter via Account Aggregator</span>
          </div>
          <span class="badge-subtle">RBI COMPLIANT</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <div>
            <div style="font-weight: 600; padding-bottom: 8px; border-bottom: 1px solid var(--border-hairline); margin-bottom: 12px;">Assets Owned (₹4,45,000)</div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.9rem;">
              <span>Liquid Savings & Sweep FDs:</span> <strong class="mono-text">₹1,10,000</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.9rem;">
              <span>Mutual Funds & Index SIPs:</span> <strong class="mono-text">₹2,40,000</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.9rem;">
              <span>Direct Equities & ETFs:</span> <strong class="mono-text">₹95,000</strong>
            </div>
          </div>

          <div>
            <div style="font-weight: 600; padding-bottom: 8px; border-bottom: 1px solid var(--border-hairline); margin-bottom: 12px; color: var(--accent-danger);">Liabilities Owed (-₹62,700)</div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.9rem;">
              <span>iPhone 16 No-Cost EMI:</span> <strong class="mono-text text-danger">-₹22,400</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.9rem;">
              <span>Education Loan (Moratorium):</span> <strong class="mono-text text-danger">-₹40,300</strong>
            </div>
          </div>
        </div>
      </div>
    `
  },

  '07': {
    number: '07',
    title: 'Liability & EMI Watchdog',
    category: 'DEBT ELIMINATION',
    desc: 'Monitoring invisible Buy-Now-Pay-Later debts, gadget EMIs, and education loans.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 07 · LIABILITY WATCHDOG</span>
        <h2 class="workspace-title">Liability & EMI Watchdog</h2>
        <p class="workspace-sub">Young India often defaults not from bad intent, but from losing track of 4 fragmented BNPL apps.</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <div style="background: var(--bg-surface-elevated); padding: 32px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
          <h4 style="font-size: 1.1rem; margin-bottom: 16px;">Active Debt Obligations</h4>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="padding: 14px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-hairline);">
              <div style="display: flex; justify-content: space-between;">
                <strong>iPhone 16 EMI</strong>
                <span class="text-danger mono-text">-₹2,800 / mo</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">6 of 9 EMIs remaining · Auto-debits on 5th</div>
            </div>
            <div style="padding: 14px; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-hairline);">
              <div style="display: flex; justify-content: space-between;">
                <strong>SBI Student Education Loan</strong>
                <span class="mono-text text-danger">₹40,300 Principle</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Interest: 8.15% · Repayment begins 6 mo post-grad</div>
            </div>
          </div>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 32px; border-radius: var(--radius-md); border: 1px solid var(--border-hairline);">
          <h4 style="font-size: 1.1rem; margin-bottom: 16px;">Prepayment Impact Calculator</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">
            Pre-closing your remaining ₹22,400 iPhone EMI now will free up ₹2,800/month of investable cash, advancing your MacBook Air goal by 1.5 months.
          </p>
          <button class="btn-secondary" onclick="alert('Pre-closure simulation initiated!')">Simulate Debt Paydown</button>
        </div>
      </div>
    `
  },

  '08': {
    number: '08',
    title: 'Spend Categorizer & Waste Detector',
    category: 'LEAKAGE PREVENTION',
    desc: 'Surfaces subscription creep, food delivery surges, and computes opportunity trade-offs.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 08 · WASTE DETECTOR</span>
        <h2 class="workspace-title">Spend Categorizer & Waste Detector</h2>
        <p class="workspace-sub">Flags abnormal spending compared against your personal historical baseline, not generic corporate budgets.</p>
      </div>
      <div style="background: var(--bg-surface-elevated); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--border-hairline);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; color: var(--accent-gold);">
          <span style="font-size: 1.4rem;">⚠️</span>
          <strong>Red Flag Alert: Food Delivery & Outings Spend is 34% Above Average</strong>
        </div>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 24px;">
          Over the last 14 days, late-night Swiggy/Zomato orders totaled ₹2,400 across 6 orders. Trimming this back to your typical 2 orders/week recovers ₹1,600 straight into your Goa trip fund.
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <button class="btn-primary" onclick="alert('Food Delivery Nudge Activated: Soft freeze enabled on late-night orders.')">Enable Delivery Nudge Guard</button>
          <button class="btn-secondary" onclick="alert('Auditing duplicate subscriptions...')">Audit Subscriptions</button>
        </div>
      </div>
    `
  },

  '09': {
    number: '09',
    title: 'Micro-Savings Goal Engine',
    category: 'GOAL-DRIVEN INVESTING',
    desc: 'Target vaults for M3 MacBook Air, Semester Goa Trip, and first vehicle deposit.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 09 · GOAL ENGINE</span>
        <h2 class="workspace-title">Micro-Savings Goal Engine</h2>
        <p class="workspace-sub">Rather than asking 'How much can you save?', PocketCircle asks 'What do you want in life, and by when?'</p>
      </div>
      <div class="vaults-grid">
        <div class="vault-card">
          <div class="vault-top">
            <div>
              <span class="vault-type">TECH VAULT</span>
              <h3 class="vault-name">M3 MacBook Air</h3>
            </div>
            <div class="vault-yield text-gold">12.4% SIP</div>
          </div>
          <div class="vault-progress-wrap">
            <div class="vault-numbers">
              <span id="mac-saved-text">₹58,200 saved</span>
              <span>Target: ₹82,000</span>
            </div>
            <div class="vault-bar">
              <div id="mac-bar-fill" class="vault-fill gold" style="width: 71%;"></div>
            </div>
          </div>
          <button class="btn-micro" onclick="addQuickMoney('mac', 1000)">+₹1,000 Quick Deposit</button>
        </div>

        <div class="vault-card">
          <div class="vault-top">
            <div>
              <span class="vault-type">CAMPUS TRIP</span>
              <h3 class="vault-name">Semester Goa Flat Trip</h3>
            </div>
            <div class="vault-yield text-emerald">Auto-Sweep</div>
          </div>
          <div class="vault-progress-wrap">
            <div class="vault-numbers">
              <span id="goa-saved-text">₹18,000 saved</span>
              <span>Target: ₹25,000</span>
            </div>
            <div class="vault-bar">
              <div id="goa-bar-fill" class="vault-fill" style="width: 72%;"></div>
            </div>
          </div>
          <button class="btn-micro" onclick="addQuickMoney('goa', 600)">+₹600 Split Sweep</button>
        </div>
      </div>
    `
  },

  '10': {
    number: '10',
    title: 'Emergency Cushion Vault',
    category: 'SAFETY BUFFER',
    desc: '7.1% sweep-in liquid fund buffer with instant ATM liquidity and zero lock-in penalties.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 10 · SAFETY SHIELD</span>
        <h2 class="workspace-title">Emergency Cushion Vault</h2>
        <p class="workspace-sub">86% of Indian students hold under ₹5,000 in backup funds. This vault builds an unshakeable emergency foundation.</p>
      </div>
      <div style="background: var(--bg-surface-elevated); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--border-hairline);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Current Emergency Reserve</span>
            <div class="mono-text text-emerald" style="font-size: 2.4rem; font-weight: 700;">₹12,400</div>
            <span style="font-size: 0.85rem; color: var(--text-secondary);">Target: ₹15,000 (Covering 2 months hostel mess + rent)</span>
          </div>
          <div style="text-align: right;">
            <span class="badge-subtle">7.1% ANNUAL YIELD</span>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 6px;">Instant T+0 Withdrawal</div>
          </div>
        </div>
        <button class="btn-primary" onclick="alert('₹500 added to Emergency Cushion!')">+₹500 Instant Buffer Boost</button>
      </div>
    `
  },

  '11': {
    number: '11',
    title: 'Milestone Financial Literacy Hub',
    category: 'FINANCIAL INTELLIGENCE',
    desc: 'Plain-language educational pills unlocked as student net worth grows.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 11 · LITERACY HUB</span>
        <h2 class="workspace-title">Milestone Financial Literacy Hub</h2>
        <p class="workspace-sub">Education tied to actual behavior rather than abstract Wall Street theory.</p>
      </div>
      <div class="literacy-pills-grid">
        <div class="literacy-item">
          <span class="pill-badge">UNLOCKED · LEVEL 1</span>
          <h4>Why 2.7% Savings Accounts Slowly Deplete Your Money</h4>
          <p>Real inflation in student cities runs at 6.8%. Keeping ₹10,000 in an idle account quietly destroys your purchasing power.</p>
        </div>
        <div class="literacy-item">
          <span class="pill-badge">UNLOCKED · LEVEL 2</span>
          <h4>The Hidden Math Behind "Zero-Cost" Phone EMIs</h4>
          <p>Understanding processing charges, GST surcharges, and how missed card billing cycles compound at 42% APR.</p>
        </div>
        <div class="literacy-item locked">
          <span class="pill-badge locked">🔒 UNLOCKS AT ₹1,00,000 NET WORTH</span>
          <h4>Direct Equity Index Funds vs Active Distributor Commissions</h4>
          <p>How saving a 1.2% distributor fee generates an extra ₹4.8 Lakhs over your first 8 career years.</p>
        </div>
      </div>
    `
  },

  '12': {
    number: '12',
    title: 'Student Credit Builder & Bank Portal',
    category: 'INSTITUTIONAL PARTNERSHIPS',
    desc: 'Pre-approved zero-fee student credit profiles and trusted bank partnerships.',
    render: () => `
      <div class="workspace-hero">
        <span class="workspace-badge">PILLAR 12 · CREDIT SOVEREIGNTY</span>
        <h2 class="workspace-title">Student Credit Builder & Bank Portal</h2>
        <p class="workspace-sub">Pre-approved credit-builder tools without loan-shark APRs or underwriting friction.</p>
      </div>
      <div style="background: var(--bg-surface-elevated); padding: 36px; border-radius: var(--radius-lg); border: 1px solid var(--border-hairline);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <h4 style="font-size: 1.2rem; font-weight: 600;">Your Student Credit Health</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">CIBIL Score: 742 (Prime Tier for Under-22)</p>
          </div>
          <span class="badge-subtle">PRE-APPROVED</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
          Because your flatmate bills and UPI transactions are settled without delay, you qualify for partner zero-annual-fee student credit cards that establish your credit file before your first job interview.
        </p>
        <button class="btn-primary" onclick="alert('Viewing verified banking partner benefits!')">Explore Verified Bank Partner Offers</button>
      </div>
    `
  }
};

function openSectionDetail(secId) {
  const data = sectionsData[secId];
  if (!data) return;

  const masterGrid = document.getElementById('dashboard-master-grid');
  const detailView = document.getElementById('dashboard-detail-view');
  const breadcrumb = document.getElementById('detail-sec-breadcrumb');
  const dynamicBody = document.getElementById('detail-dynamic-content');

  masterGrid.style.display = 'none';
  detailView.style.display = 'block';
  breadcrumb.textContent = `Section ${data.number}: ${data.title}`;

  dynamicBody.innerHTML = data.render();
  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function closeSectionDetail() {
  const masterGrid = document.getElementById('dashboard-master-grid');
  const detailView = document.getElementById('dashboard-detail-view');

  detailView.style.display = 'none';
  masterGrid.style.display = 'block';
  window.scrollTo({ top: 60, behavior: 'smooth' });
}

/* ==========================================================================
   05. Detail Interactive Helpers
   ========================================================================== */
function settleRoommate(id) {
  const card = document.getElementById(`roommate-${id}-card`);
  if (card) {
    card.innerHTML = `
      <div><strong>${id === 'ananya' ? 'Ananya Sharma' : 'Kabir Mehta'}</strong><div style="font-size: 0.75rem; color: var(--accent-emerald);">Settled via UPI</div></div>
      <span class="text-emerald mono-text" style="font-size: 0.85rem;">✓ Paid ₹600</span>
    `;
  }
  const status = document.getElementById('split-action-status');
  if (status) {
    status.textContent = `✓ ₹600 received from ${id}! Auto-swept into Goa Trip Fund.`;
  }
}

function settleAllRoommates() {
  settleRoommate('ananya');
  settleRoommate('kabir');
  const status = document.getElementById('split-action-status');
  if (status) {
    status.textContent = '✓ All ₹1,200 collected and auto-routed into Goa Trip Fund!';
  }
}

function runWorkspaceWhatIf(val) {
  const pill = document.getElementById('workspace-sim-pill');
  const runwayMetric = document.getElementById('ws-runway-metric');
  const runwayNote = document.getElementById('ws-runway-note');
  const goalMetric = document.getElementById('ws-goal-metric');
  const goalNote = document.getElementById('ws-goal-note');
  const wasteNudge = document.getElementById('ws-waste-nudge');

  const spend = parseInt(val, 10);
  if (pill) pill.textContent = `₹${spend.toLocaleString('en-IN')}`;

  const remaining = 5400 - spend;
  const daysSafe = Math.max(2, Math.round((remaining / 5400) * 24));
  const daysPushed = Math.max(1, Math.round(spend / 160));

  if (runwayMetric) {
    runwayMetric.textContent = `${daysSafe} Days Safe`;
    if (remaining > 3200) {
      runwayMetric.className = 'mono-text text-emerald';
      runwayNote.textContent = 'Mess dues on the 10th (₹3,200) are fully protected with remaining buffer.';
    } else {
      runwayMetric.className = 'mono-text text-danger';
      runwayNote.textContent = 'Warning: Approaching mess fee deficit. High risk on the 10th.';
    }
  }

  if (goalMetric) {
    goalMetric.textContent = `+${daysPushed} Days Push`;
    goalNote.textContent = `MacBook Air fund completion pushed back by ${daysPushed} days.`;
  }

  if (wasteNudge) {
    const coffees = Math.round(spend / 45);
    wasteNudge.textContent = `"Spending ₹${spend.toLocaleString('en-IN')} is equivalent to ${coffees} canteen meals. Trimming this in half preserves ₹${Math.round(spend / 2)} for emergencies."`;
  }
}

function addQuickMoney(type, amt) {
  if (type === 'mac') {
    const fill = document.getElementById('mac-bar-fill');
    const text = document.getElementById('mac-saved-text');
    if (fill) fill.style.width = '75%';
    if (text) text.textContent = '₹59,200 saved';
  } else {
    const fill = document.getElementById('goa-bar-fill');
    const text = document.getElementById('goa-saved-text');
    if (fill) fill.style.width = '76%';
    if (text) text.textContent = '₹18,600 saved';
  }
}

/* ==========================================================================
   FEATURE 01: Interactive Spend Tracker Comparison Graph Engine
   ========================================================================== */
let spendState = {
  seed: 'normal',
  category: 'all',
  prevData: [],
  currData: [],
  chartWidth: 900,
  chartHeight: 240,
  paddingX: 50,
  paddingYTop: 28,
  paddingYBottom: 45,
  maxY: 2000
};

// Base 30-Day Seed Datasets
const seedDatabase = {
  normal: {
    prev: [540, 610, 480, 520, 890, 1340, 1420, 510, 490, 620, 580, 780, 1290, 1380, 530, 470, 510, 630, 810, 1450, 1510, 560, 490, 530, 610, 890, 1360, 1290, 520, 480],
    curr: [420, 460, 390, 440, 680,  920,  980, 430, 410, 490, 470, 620,  980, 1050, 440, 380, 420, 510, 670, 1080, 1140, 450, 410, 430, 510, 710, 1020,  990, 430, 400]
  },
  exam: {
    prev: [540, 610, 480, 520, 890, 1340, 1420, 510, 490, 620, 580, 780, 1290, 1380, 530, 470, 510, 630, 810, 1450, 1510, 560, 490, 530, 610, 890, 1360, 1290, 520, 480],
    curr: [310, 340, 290, 320, 450,  520,  490, 330, 310, 360, 340, 420,  580,  560, 320, 290, 310, 370, 460,  590,  620, 340, 310, 330, 390, 480,  550,  520, 330, 300]
  },
  festive: {
    prev: [490, 520, 460, 510, 780, 1150, 1220, 480, 460, 540, 510, 690, 1180, 1240, 500, 450, 480, 580, 740, 1280, 1320, 510, 470, 490, 580, 790, 1220, 1180, 490, 460],
    curr: [590, 640, 560, 620, 1120, 1750, 1820, 610, 580, 720, 680, 940, 1690, 1850, 630, 570, 610, 740, 990, 1820, 1910, 660, 590, 630, 740, 1120, 1780, 1720, 610, 580]
  }
};

const categoryMultipliers = {
  all: 1.0,
  food: 0.52,
  social: 0.36
};

function initSpendTracker() {
  const container = document.getElementById('st-chart-container');
  if (!container) return;

  loadSpendData();
  setupSpendScrubber(container);
}

function loadSpendData() {
  const base = seedDatabase[spendState.seed] || seedDatabase.normal;
  const mult = categoryMultipliers[spendState.category] || 1.0;

  spendState.prevData = base.prev.map(v => Math.round(v * mult));
  spendState.currData = base.curr.map(v => Math.round(v * mult));

  renderSpendChart();
}

function setSpendSeed(seedKey) {
  spendState.seed = seedKey;
  document.querySelectorAll('.seed-chip-btn[data-seed]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-seed') === seedKey);
  });
  loadSpendData();
}

function setSpendCat(catKey) {
  spendState.category = catKey;
  document.querySelectorAll('.seed-chip-btn[data-cat]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === catKey);
  });
  loadSpendData();
}

function randomizeSpendData() {
  // Apply realistic random jitter to current dataset (+/- 18%)
  spendState.currData = spendState.currData.map(v => {
    const jitter = 0.82 + Math.random() * 0.36;
    return Math.max(180, Math.round(v * jitter));
  });

  // Re-render
  renderSpendChart();
}

function renderSpendChart() {
  const prevTotal = spendState.prevData.reduce((a, b) => a + b, 0);
  const currTotal = spendState.currData.reduce((a, b) => a + b, 0);

  // Update Summary UI
  const prevEl = document.getElementById('st-prev-total');
  const currEl = document.getElementById('st-curr-total');
  const varBadge = document.getElementById('st-variance-badge');
  const varVal = document.getElementById('st-variance-val');

  if (prevEl) prevEl.textContent = `₹${prevTotal.toLocaleString('en-IN')}`;
  if (currEl) currEl.textContent = `₹${currTotal.toLocaleString('en-IN')}`;

  const delta = currTotal - prevTotal;
  const pct = Math.round((delta / prevTotal) * 1000) / 10;

  if (varBadge && varVal) {
    if (delta <= 0) {
      varBadge.style.background = 'var(--accent-emerald-soft)';
      varBadge.style.color = 'var(--accent-emerald)';
      varVal.textContent = `${pct}% (₹${Math.abs(delta).toLocaleString('en-IN')} Saved)`;
    } else {
      varBadge.style.background = 'var(--accent-danger-soft)';
      varBadge.style.color = 'var(--accent-danger)';
      varVal.textContent = `+${pct}% (₹${delta.toLocaleString('en-IN')} Above Prev)`;
    }
  }

  // Calculate coordinates for SVG paths
  const count = spendState.currData.length;
  const usableWidth = spendState.chartWidth - (spendState.paddingX * 2);
  const usableHeight = spendState.chartHeight - spendState.paddingYTop - spendState.paddingYBottom;
  const baselineY = spendState.chartHeight - spendState.paddingYBottom;

  const maxVal = Math.max(...spendState.prevData, ...spendState.currData, 1800);

  const getCoords = (data) => {
    return data.map((val, i) => {
      const x = spendState.paddingX + (i / (count - 1)) * usableWidth;
      const y = baselineY - (val / maxVal) * usableHeight;
      return { x, y, val };
    });
  };

  const prevCoords = getCoords(spendState.prevData);
  const currCoords = getCoords(spendState.currData);

  // Save for scrubber
  spendState.prevCoords = prevCoords;
  spendState.currCoords = currCoords;

  // Build Bezier Smooth Path
  const buildSmoothPath = (pts) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  };

  const prevPathD = buildSmoothPath(prevCoords);
  const currPathD = buildSmoothPath(currCoords);
  const areaD = currPathD + ` L ${currCoords[currCoords.length - 1].x.toFixed(1)} ${baselineY} L ${currCoords[0].x.toFixed(1)} ${baselineY} Z`;

  const pathPrev = document.getElementById('st-path-prev');
  const pathCurr = document.getElementById('st-path-curr');
  const pathArea = document.getElementById('st-path-area');

  if (pathPrev) pathPrev.setAttribute('d', prevPathD);
  if (pathCurr) pathCurr.setAttribute('d', currPathD);
  if (pathArea) pathArea.setAttribute('d', areaD);
}

function setupSpendScrubber(container) {
  const line = document.getElementById('st-hover-line');
  const dotCurr = document.getElementById('st-hover-dot-curr');
  const dotPrev = document.getElementById('st-hover-dot-prev');
  const tooltip = document.getElementById('st-tooltip');
  const ttDay = document.getElementById('tt-day-label');
  const ttCurr = document.getElementById('tt-curr-val');
  const ttPrev = document.getElementById('tt-prev-val');

  if (!line || !dotCurr || !dotPrev || !tooltip) return;

  container.addEventListener('mousemove', (e) => {
    if (!spendState.currCoords || !spendState.currCoords.length) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const normX = (mouseX / rect.width) * spendState.chartWidth;

    // Find nearest point
    let closestIdx = 0;
    let minDiff = Infinity;
    spendState.currCoords.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - normX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    const cPt = spendState.currCoords[closestIdx];
    const pPt = spendState.prevCoords[closestIdx];

    // Convert SVG coords to CSS pixels
    const scaleX = rect.width / spendState.chartWidth;
    const scaleY = rect.height / spendState.chartHeight;

    const pxX = cPt.x * scaleX;
    const pxYCurr = cPt.y * scaleY;
    const pxYPrev = pPt.y * scaleY;

    line.style.left = `${pxX}px`;
    line.style.opacity = '1';

    dotCurr.style.left = `${pxX}px`;
    dotCurr.style.top = `${pxYCurr}px`;
    dotCurr.style.opacity = '1';

    dotPrev.style.left = `${pxX}px`;
    dotPrev.style.top = `${pxYPrev}px`;
    dotPrev.style.opacity = '1';

    // Update Tooltip
    ttDay.textContent = `Day ${closestIdx + 1} of 30`;
    ttCurr.textContent = `₹${cPt.val.toLocaleString('en-IN')}`;
    ttPrev.textContent = `₹${pPt.val.toLocaleString('en-IN')}`;

    tooltip.style.left = `${pxX}px`;
    tooltip.style.top = `${Math.min(pxYCurr, pxYPrev)}px`;
    tooltip.style.opacity = '1';
  });

  container.addEventListener('mouseleave', () => {
    line.style.opacity = '0';
    dotCurr.style.opacity = '0';
    dotPrev.style.opacity = '0';
    tooltip.style.opacity = '0';
  });
}

/* ==========================================================================
   FEATURE 02: Interactive Goal Simulator Engine
   ========================================================================== */
function initGoalSimulator() {
  const targetSlider = document.getElementById('gs-target-slider');
  if (!targetSlider) return;

  updateGoalSimulation();
}

function selectGoalPreset(button) {
  document.querySelectorAll('.goal-chip').forEach(b => b.classList.remove('active'));
  button.classList.add('active');

  const amount = parseInt(button.getAttribute('data-amount'), 10) || 50000;
  const saved = parseInt(button.getAttribute('data-saved'), 10) || 10000;
  const contrib = parseInt(button.getAttribute('data-contrib'), 10) || 4000;

  const targetSlider = document.getElementById('gs-target-slider');
  const savedSlider = document.getElementById('gs-saved-slider');
  const contribSlider = document.getElementById('gs-contrib-slider');

  if (targetSlider) targetSlider.value = amount;
  if (savedSlider) savedSlider.value = saved;
  if (contribSlider) contribSlider.value = contrib;

  updateGoalSimulation();
}

function updateGoalSimulation() {
  const targetSlider = document.getElementById('gs-target-slider');
  const savedSlider = document.getElementById('gs-saved-slider');
  const contribSlider = document.getElementById('gs-contrib-slider');
  const sweepToggle = document.getElementById('gs-sweep-toggle');

  if (!targetSlider || !savedSlider || !contribSlider) return;

  const target = parseInt(targetSlider.value, 10);
  const saved = Math.min(target, parseInt(savedSlider.value, 10));
  const contrib = parseInt(contribSlider.value, 10);
  const sweepActive = sweepToggle ? sweepToggle.checked : false;

  const sweepBoost = sweepActive ? 1200 : 0;
  const effectiveInflow = contrib + sweepBoost;
  const remainingGap = Math.max(0, target - saved);

  const monthsNeeded = remainingGap > 0 ? Math.ceil(remainingGap / effectiveInflow) : 0;
  const baselineMonths = remainingGap > 0 ? Math.ceil(remainingGap / contrib) : 0;
  const monthsSaved = Math.max(0, baselineMonths - monthsNeeded);

  // Update Numerical Displays
  const targetDisp = document.getElementById('gs-target-display');
  const savedDisp = document.getElementById('gs-saved-display');
  const contribDisp = document.getElementById('gs-contrib-display');

  if (targetDisp) targetDisp.textContent = `₹${target.toLocaleString('en-IN')}`;
  if (savedDisp) savedDisp.textContent = `₹${saved.toLocaleString('en-IN')}`;
  if (contribDisp) contribDisp.textContent = `₹${contrib.toLocaleString('en-IN')} / mo`;

  // Output Cockpit Cards
  const monthsEl = document.getElementById('gs-result-months');
  const dateEl = document.getElementById('gs-result-date');
  const speedupBadge = document.getElementById('gs-speedup-pill');

  if (monthsEl) monthsEl.textContent = monthsNeeded === 1 ? '1 Month' : `${monthsNeeded} Months`;

  // Calculate Target Date
  const now = new Date();
  now.setMonth(now.getMonth() + monthsNeeded);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const targetDateStr = `Target Date: ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  if (dateEl) dateEl.textContent = targetDateStr;

  if (speedupBadge) {
    if (sweepActive && monthsSaved > 0) {
      speedupBadge.style.display = 'inline-flex';
      speedupBadge.innerHTML = `<span>🚀 ${monthsSaved} ${monthsSaved === 1 ? 'Month' : 'Months'} Faster via Auto-Sweep</span>`;
    } else {
      speedupBadge.style.display = 'none';
    }
  }

  // Progress Bar
  const pct = Math.min(100, Math.round((saved / target) * 100));
  const progFill = document.getElementById('gs-progress-fill');
  const progText = document.getElementById('gs-progress-percent');
  if (progFill) progFill.style.width = `${pct}%`;
  if (progText) progText.textContent = `${pct}% Completed`;

  // Detailed breakdown
  const gapEl = document.getElementById('gs-gap-val');
  const rateEl = document.getElementById('gs-rate-val');
  const sweepsEl = document.getElementById('gs-sweeps-val');

  if (gapEl) gapEl.textContent = `₹${remainingGap.toLocaleString('en-IN')}`;
  if (rateEl) rateEl.textContent = `₹${effectiveInflow.toLocaleString('en-IN')} / month`;
  if (sweepsEl) {
    if (sweepActive && monthsNeeded > 0) {
      sweepsEl.textContent = `+₹${(sweepBoost * monthsNeeded).toLocaleString('en-IN')} total`;
    } else {
      sweepsEl.textContent = `₹0 (Disabled)`;
    }
  }
}

/* ==========================================================================
   07. FAQ Accordion Interaction
   ========================================================================== */
function toggleFaq(item) {
  const wasActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
  if (!wasActive) {
    item.classList.add('active');
  }
}
