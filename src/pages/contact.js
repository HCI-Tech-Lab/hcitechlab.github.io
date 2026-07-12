import SectionContainer from '@/components/section_container';
import Link from 'next/link';

export default function Contact() {
    return (
      <div>
        <SectionContainer>
          {/* ===== Contact ===== */}
          <div className="mb-4">
            <span className="section-eyebrow">Get in touch</span>
            <h2 className="section-title">Contact</h2>
          </div>

          <div className="row g-5 align-items-center">
            {/* Left: concise contact info */}
            <div className="col-lg-6">
              <p style={{ color: '#475467', lineHeight: 1.7 }}>
                HCI Tech Lab is part of the{' '}
                <Link href="https://ct.kaist.ac.kr" target="_blank" className="text-decoration-none fw-semibold">Graduate School of Culture Technology</Link>{' '}
                at <Link href="https://www.kaist.ac.kr" target="_blank" className="text-decoration-none fw-semibold">KAIST</Link>.
              </p>

              <div className="contact-row">
                <span className="contact-icon rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                  <i className="bi bi-envelope-fill" style={{ color: '#005184' }} />
                </span>
                <div>
                  <div className="project-label mb-1">Email — best for all communication</div>
                  <Link href="mailto:sangho@kaist.ac.kr" className="text-decoration-none fw-semibold">
                    Prof. Sang Ho Yoon · sangho@kaist.ac.kr
                  </Link>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-icon rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                  <i className="bi bi-geo-alt-fill" style={{ color: '#1260de' }} />
                </span>
                <div>
                  <div className="project-label mb-1">Postal mail &amp; shipments</div>
                  <div style={{ color: '#344054', lineHeight: 1.6 }}>
                    Human-Centered Interactive Technologies Lab<br />
                    KAIST, N5, Room 2346<br />
                    291 Daehak-ro, Yuseong-gu, Daejeon, Republic of Korea (34141)
                  </div>
                  <div className="mt-3">
                    <Link
                      href="https://www.google.com/maps?q=KAIST+N5,+291+Daehak-ro,+Yuseong-gu,+Daejeon"
                      target="_blank"
                      className="section-link"
                    >
                      Open in Google Maps ↗
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: KAIST campus landscape */}
            <div className="col-lg-6">
              <div className="contact-photo media-frame">
                <img src="./img/Other/kaist_campus.jpg" alt="KAIST campus, Daejeon" />
                <span className="contact-mosaic-caption">KAIST </span>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer>
          {/* ===== Join Us ===== */}
          <div className="mb-4">
            <span className="section-eyebrow">Open positions</span>
            <h2 className="section-title">Join Us</h2>
            <p className="section-sub">
              <b>Updated Jul 2026 — we currently have open positions for M.S./Ph.D. students.</b>
            </p>
          </div>

          <p style={{ color: '#475467' }}>
            We are excited to talk to strong candidates whose backgrounds or interests overlap with:
          </p>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="join-area-card">
                <div className="project-label mb-2">Software engineering</div>
                <div style={{ color: '#344054' }}>Human-Computer Interaction (HCI), Artificial Intelligence (AI), Extended Reality (XR)</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="join-area-card">
                <div className="project-label mb-2">Hardware engineering</div>
                <div style={{ color: '#344054' }}>Actuators, Sensors, Embedded Systems, Mechanical Design, Signal Processing</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="join-area-card">
                <div className="project-label mb-2">HCI related topics</div>
                <div style={{ color: '#344054' }}>UX/UI Design, Creativity Toolkit, Perception/Cognition</div>
              </div>
            </div>
          </div>

          <Link className="btn btn-primary" href="/recruiting_graduate">
            <b>M.S./Ph.D. Students — How to Apply&nbsp;↗</b>
          </Link>
          {/*<Link className="btn btn-primary ms-2" href="/internship/summer-2026"><b>2026 Summer Internship</b></Link>*/}
        </SectionContainer>
      </div>
    );
  }