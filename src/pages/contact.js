import SectionContainer from '@/components/section_container';
import Link from 'next/link';

export default function Contact() {
    return (
      <div>
        <SectionContainer >
          <h2 className="card-title" >Contact</h2>
          <div className = "row g-0">
            <div className = "col-md-7 text-left">
              <h5>
                <p></p>
                <p>HCI Tech Lab is part of the <Link href="https://ct.kaist.ac.kr" target="_blank">Graduate School of Culture Technology</Link> in <Link href="https://www.kaist.ac.kr" target="_blank">KAIST</Link>.</p>
                <p> Email is generally best for all communication. <br/> Please contact <Link href="mailto:sangho@kaist.ac.kr">Prof. Sang Ho Yoon</Link></p>
                <p> For postal mail and shipments, our mail stop is</p>
                <p style={{marginLeft: "30px"}}>   Human-Centered Interactive Technologies Lab<br/>KAIST, N5, Room 2346,<br/>291 Daehak-ro, Yuseong-gu, Daejeon, Republic of Korea (34141)</p>
              </h5>
            </div>
            <div className="col-md-4 text-right">
              <iframe className ="ratio ratio-16x9" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6424.938890682808!2d127.35955263490298!3d36.373628078565574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDIyJzI1LjEiTiAxMjfCsDIxJzUwLjIiRQ!5e0!3m2!1sen!2skr!4v1632238152008!5m2!1sen!2skr" frameBorder="0" width="100%" height="100%" style={{border: "0"}} allowFullScreen></iframe>
            </div>
          </div>
        </SectionContainer>
        <SectionContainer>
          <h2 className="card-title">Join Us</h2>
          <p></p>
          <h4><i><b> (Updated: Mar 2026) **We currently have open positions for M.S./Ph.D.**</b></i></h4>
          <p></p>
          <h4>We are excited to talk to strong candidates whose backgrounds or interests overlap with</h4>
          <h4 style={{marginLeft: "30px"}}><b>Software engineering: </b> Human-Computer Interaction(HCI), Artificial Intelligence(AI), Extended Reality(XR)</h4>
          <h4 style={{marginLeft: "30px"}}><b>Hardware engineering: </b> Actuators, Sensors, Embedded systems, Mechanical Design, Signal processing</h4>
          <h4 style={{marginLeft: "30px"}}><b>HCI related topics: </b> UX/UI Design, Creativity Toolkit, Perception/Cognition</h4>
          <p></p>
          <h4>For M.S./Ph.D. students, please check below.</h4>
          <p></p>
          <Link className="badge bg-primary" href="/recruiting_graduate" style={{width: "15.5rem", height: "2.2rem", fontSize: "1.2rem",marginRight: "1rem" }}>M.S./Ph.D. Students</Link>
          <Link className="badge bg-primary" href="/internship/summer-2026" style={{width: "15.5rem", height: "2.2rem", fontSize: "1.2rem" }}>2026 Summer Internship</Link>
        </SectionContainer>
      </div>
    );
  }