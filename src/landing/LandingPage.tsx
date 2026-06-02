import { useEffect, useState } from 'react';
import './landing.css';

/**
 * MACP public landing page — the front door before the roadmap app.
 * Faithful recreation of the Claude Design handoff (project 14B):
 * premium dark "amber light in a dark room" SaaS marketing page.
 *
 * Primary CTAs ("Build your system" / "Sign in") route to `#/app`, which the
 * top-level router resolves to the roadmap checklist. In-page anchors
 * (#how / #features / #progress / #top) drive smooth-scroll within this page.
 */
export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  // Header lifts to a hairline-bordered glass bar once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="macp-landing">
      {/* ============================ HEADER ============================ */}
      <header className={`site${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap">
          <nav className="nav">
            <a className="wordmark" href="#top" aria-label="MACP system">
              <span className="mk" style={{ fontSize: 24 }}>MACP</span>
              <span className="sy" style={{ fontSize: 10 }}>system</span>
            </a>
            <div className="links">
              <a href="#how">How it works</a>
              <a href="#features">Features</a>
              <a href="#progress">Progress</a>
            </div>
            <div className="actions">
              <a className="signin" href="#/app">Sign in</a>
              <a className="btn-amber" href="#/app">Build your system</a>
              <button className="menu-toggle" aria-label="Menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <span id="top" />

      {/* ============================ HERO ============================ */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Modular AI Coaching Platform</div>
              <h1 className="serif">Build the system you actually <span className="accent">return to.</span></h1>
              <p className="subcopy">MACP turns your goals into a daily operating system — AI-built plans, today's frog, progress signals, recovery when life happens, and weekly reviews that adapt the plan.</p>
              <div className="cta-row">
                <a className="btn-amber" href="#/app">Build your system
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </a>
                <a className="btn-ghost" href="#how">See how it works
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </a>
              </div>
              <div className="trust">
                <div className="item"><span className="dot" /><span className="t">Built around daily execution</span></div>
                <div className="item"><span className="dot" /><span className="t">Adapts when you miss days</span></div>
                <div className="item"><span className="dot" /><span className="t">Made for long-term consistency</span></div>
              </div>
            </div>

            <div className="dash-float">
              <div className="dash" role="img" aria-label="MACP dashboard preview">
                <div className="dash-head">
                  <a className="wordmark" href="#top"><span className="mk" style={{ fontSize: 20 }}>MACP</span><span className="sy" style={{ fontSize: 8.4 }}>system</span></a>
                  <div className="dash-nav"><span className="on">Dashboard</span><span>Calendar</span><span>Weekly review</span></div>
                </div>
                <div className="dash-greet">
                  <div>
                    <h3>Good afternoon, <span className="nm">Rostomi</span></h3>
                    <div className="dash-date">Monday, June 1, 2026</div>
                  </div>
                  <div className="tier-pill"><span className="dot" /><span>Tier 1 · Foundation</span></div>
                </div>
                <div className="plan-card">
                  <div className="top"><span className="lbl">Current plan</span><span className="badge">INITIAL</span></div>
                  <h4>Plan v1</h4>
                  <div className="meta">Tier 1 · Foundation · Working professional</div>
                </div>
                <div className="stat-row">
                  <div className="stat">
                    <div className="lbl">Habits today</div>
                    <div className="val"><span className="n">3</span><span className="u"> /5</span></div>
                    <div className="sub" style={{ color: 'var(--macp-green-text)' }}>On track</div>
                  </div>
                  <div className="stat">
                    <div className="lbl">Streak</div>
                    <div className="val"><span className="n">6</span><span className="u"> days</span></div>
                    <div className="sub" style={{ color: 'var(--macp-amber)' }}>Keep going</div>
                  </div>
                  <div className="stat">
                    <div className="lbl">This week</div>
                    <div className="val"><span className="n">72</span><span className="u"> %</span></div>
                    <div className="sub" style={{ color: 'var(--macp-text-dim)' }}>+12% vs last</div>
                  </div>
                </div>
                <div className="frog">
                  <div className="lbl">🐸&nbsp;&nbsp;Eat the frog · Highest leverage</div>
                  <h4>Practice a new skill for 5 minutes</h4>
                  <div className="actions">
                    <button className="mark">Mark Complete</button>
                    <button className="focus">Focus Mode · 25 min</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ TRUST STRIP ============================ */}
      <div className="strip">
        <div className="wrap">
          <div className="strip-grid">
            <div className="strip-item"><div className="label">01 — Generate</div><div className="t">AI plan generation</div></div>
            <div className="strip-item"><div className="label">02 — Execute</div><div className="t">Daily frog priority</div></div>
            <div className="strip-item"><div className="label">03 — Adapt</div><div className="t">Weekly review loop</div></div>
            <div className="strip-item"><div className="label">04 — Recover</div><div className="t">Built-in recovery</div></div>
          </div>
        </div>
      </div>

      {/* ============================ HOW IT WORKS ============================ */}
      <section className="block" id="how">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">How it works</div>
            <h2>From a few questions to a system that <span className="accent">runs your day.</span></h2>
            <p>No blank slate, no endless setup. MACP builds the structure, then keeps it realistic as your weeks change.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">STEP 01</div>
              <div className="line" />
              <h3>Answer a few questions</h3>
              <p>Goals, schedule, friction, intensity, and the constraints you're actually working with.</p>
            </div>
            <div className="step">
              <div className="num">STEP 02</div>
              <div className="line" />
              <h3>Get your AI system</h3>
              <p>Habits, milestones, tiers, today's frog, and a weekly focus — built around your real life.</p>
            </div>
            <div className="step">
              <div className="num">STEP 03</div>
              <div className="line" />
              <h3>Execute today's frog</h3>
              <p>One highest-leverage action gets priority. Do that first; the rest follows.</p>
            </div>
            <div className="step">
              <div className="num">STEP 04</div>
              <div className="line" />
              <h3>Review and adapt weekly</h3>
              <p>Momentum, misses, and recovery feed the next adjustment. The plan stays honest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FEATURES ============================ */}
      <section className="block" id="features">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">What's inside the system</div>
            <h2>A command surface for the person you're <span className="accent">becoming.</span></h2>
            <p>Five working parts, one calm surface. Amber signals what's live; green marks what's done or recovered.</p>
          </div>
          <div className="features">
            <div className="feat">
              <div className="tile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5 10.1 7.6z" /><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" /></svg>
              </div>
              <div className="label">AI plans</div>
              <h3>AI-built plans</h3>
              <p>Personalized habit architecture based on your goals, time, and constraints — not a generic template.</p>
            </div>
            <div className="feat">
              <div className="tile green"><span className="frog-emoji">🐸</span></div>
              <div className="label">Daily leverage</div>
              <h3>Today's frog</h3>
              <p>A single high-leverage task anchors the day. Do the hardest thing first, while it still matters.</p>
            </div>
            <div className="feat">
              <div className="tile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><polyline points="3 3 3 8 8 8" /><polyline points="12 7 12 12 15 14" /></svg>
              </div>
              <div className="label">Weekly loop</div>
              <h3>Weekly reviews</h3>
              <p>Reflect, adjust, and keep the system realistic. Every week tunes the plan to where you actually are.</p>
            </div>
            <div className="feat">
              <div className="tile">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 14 4-4 3 3 5-6" /></svg>
              </div>
              <div className="label">Signal</div>
              <h3>Progress insights</h3>
              <p>See where consistency is building and where the same friction keeps repeating — week over week.</p>
            </div>
            <div className="feat span2">
              <div className="tile green" style={{ marginBottom: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-9 9z" /><polyline points="3 4.5 3 9 7.5 9" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <div className="body">
                <div className="label">On track</div>
                <h3>Recovery when life happens</h3>
                <p>Miss a day? Resume without shame. MACP adjusts the plan instead of restarting you from zero — so one bad week never breaks the system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ COMMAND SURFACE PROOF ============================ */}
      <section className="block" id="progress">
        <div className="wrap">
          <div className="surface-grid">
            <div className="dash-wide-wrap">
              <div className="dash-wide">
                <div className="dash-head">
                  <a className="wordmark" href="#top"><span className="mk" style={{ fontSize: 19 }}>MACP</span><span className="sy" style={{ fontSize: 8 }}>system</span></a>
                  <div className="dash-nav"><span>Dashboard</span><span className="on">Weekly review</span><span>Calendar</span></div>
                </div>
                <div className="dash-greet">
                  <div>
                    <h3 style={{ fontSize: 23 }}>Week 4 · <span className="nm">Foundation</span></h3>
                    <div className="dash-date">May 25 – Jun 1, 2026</div>
                  </div>
                  <div className="tier-pill"><span className="dot" /><span>On track</span></div>
                </div>
                <div className="dw-stats">
                  <div className="stat"><div className="lbl">Consistency</div><div className="val"><span className="n">84</span><span className="u"> %</span></div><div className="sub" style={{ color: 'var(--macp-green-text)' }}>Building</div></div>
                  <div className="stat"><div className="lbl">Streak</div><div className="val"><span className="n">6</span><span className="u"> days</span></div><div className="sub" style={{ color: 'var(--macp-amber)' }}>Live</div></div>
                  <div className="stat"><div className="lbl">Habits</div><div className="val"><span className="n">28</span><span className="u"> /35</span></div><div className="sub" style={{ color: 'var(--macp-text-dim)' }}>This week</div></div>
                  <div className="stat"><div className="lbl">Recovered</div><div className="val"><span className="n">2</span><span className="u"> days</span></div><div className="sub" style={{ color: 'var(--macp-green-text)' }}>Resumed</div></div>
                </div>
                <div className="momentum">
                  <div className="head"><span className="lbl">Weekly momentum</span><span className="pct">+12% vs last</span></div>
                  <div className="bars">
                    <div className="bar"><i style={{ height: '62%' }} /></div>
                    <div className="bar green"><i style={{ height: '80%' }} /></div>
                    <div className="bar"><i style={{ height: '54%' }} /></div>
                    <div className="bar miss"><i style={{ height: '22%' }} /></div>
                    <div className="bar green"><i style={{ height: '74%' }} /></div>
                    <div className="bar green"><i style={{ height: '88%' }} /></div>
                    <div className="bar"><i style={{ height: '70%' }} /></div>
                  </div>
                </div>
                <div className="dw-row">
                  <div className="mini"><div className="lbl">Next review</div><h5>Sunday, 6:00 PM</h5><p>Adjust tier, set next week's focus.</p></div>
                  <div className="mini recover"><div className="lbl">Recovery signal</div><h5>Back on track</h5><p>Missed Thursday — plan rebalanced, no reset.</p></div>
                </div>
              </div>
            </div>

            <div className="callouts">
              <div className="section-head" style={{ marginBottom: 14 }}>
                <div className="eyebrow">The command surface</div>
                <h2 style={{ fontSize: 34 }}>Your whole system, on one <span className="accent">surface.</span></h2>
              </div>
              <div className="callout"><div className="label">Current plan</div><h4>Your tier, at a glance</h4><p>Plan version, tier, and focus — always the first thing you see.</p></div>
              <div className="callout"><div className="label">Consistency</div><h4>Momentum you can read</h4><p>Daily completion charted across the week, amber for live, green for done.</p></div>
              <div className="callout"><div className="label">Weekly review</div><h4>A standing appointment</h4><p>Reflect and re-tune on schedule, so the plan never drifts from reality.</p></div>
              <div className="callout"><div className="label">Recovery signal</div><h4>One bad day isn't a reset</h4><p>Miss a day and the system rebalances — you resume, you don't restart.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FINAL CTA ============================ */}
      <section className="final">
        <div className="wrap">
          <div className="inner">
            <div className="eyebrow">Set your standard</div>
            <h2 className="serif">Your system is built when you <span className="accent">start.</span></h2>
            <p>Answer a few questions. Get your first AI plan in minutes.</p>
            <a className="btn-amber" href="#/app">Build your system
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="site">
        <div className="wrap">
          <div className="foot">
            <a className="wordmark" href="#top"><span className="mk" style={{ fontSize: 20 }}>MACP</span><span className="sy" style={{ fontSize: 9 }}>system</span></a>
            <div className="links">
              <a href="#how">How it works</a>
              <a href="#features">Features</a>
              <a href="#progress">Progress</a>
              <a href="#/app">Sign in</a>
            </div>
            <div className="copy">Build a system that compounds</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
