import Link from 'next/link';

// Shared header for the Research section: gradient banner + sub-page tabs.
// `current` is 'overview', 'highlights' or 'projects'.
const TABS = [
  { key: 'overview', label: 'Overview', href: '/research-overview' },
  { key: 'highlights', label: 'Highlights', href: '/research-highlights' },
  { key: 'projects', label: 'Projects', href: '/projects' },
];

export default function ResearchHeader({ current }) {
  return (
    <>
      <div className="research-hero">
        <div className="container position-relative">
          <span className="section-eyebrow research-hero-eyebrow">HCI Tech Lab</span>
          <h1 className="research-hero-title">Research</h1>
          <p className="research-hero-sub">
            Pioneering Embodied and Physical Human–AI Interaction
          </p>
        </div>
      </div>

      <div className="container">
        <nav className="research-tabs" aria-label="Research sections">
          {TABS.map((tab) => (
            <Link
              key={tab.key}
              href={tab.href}
              className={`research-tab ${current === tab.key ? 'current' : ''}`}
              aria-current={current === tab.key ? 'page' : undefined}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
