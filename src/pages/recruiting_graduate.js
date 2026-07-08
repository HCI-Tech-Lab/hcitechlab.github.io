import SectionContainer from "@/components/section_container";
import Link from "next/link";

export default function RecruitingGrad() {
    return (
        <SectionContainer>
            <h1 className="card-title">M.S./Ph.D. Open Positions (Updated: Jul 2026)</h1>
            <br />
            <h2> Applications for M.S./Ph.D. Positions <Link href="https://forms.gle/bsay5LuEGfJjBC1P9" target="_blank">[Apply Now]</Link></h2>
            <p>If you are interested in joining our lab as a M.S./Ph.D. student, please send me an <b><i><a href="mailto:sangho@kaist.ac.kr"> email</a></i></b> and submit <b><i><a href="https://forms.gle/PFQ9CbpZDgLED2gGA" target="_blank">Google Form</a></i></b>.</p>
            <p>Please briefly describe your research interests and attach your CV, including your undergraudate transcript or GPA.</p>
            <b>Important: Please insert “Application PhD” or “Application MS" in the subject line if you send an email.</b>

            <br />
            <br />
            <br />

            <h2>HCI Tech Lab Introduction</h2>
            <p>As an interdisciplinary research group in Culture Technology, we build physical and digital interactive system powered by novel sensing andhaptic technologies. At HCI Tech Lab, we explore interactive technologies that bring direct benefits to real-world users. Our research process generally includes:</p>
            <ul style={{marginLeft: "30px"}}>
                <li><h5>Identify gaps between interface/device and human needs</h5></li>
                <li><h5>Bridge the gap with novel technical and social solutions</h5></li>
                <li><h5>Evaluate the solution with research methods</h5></li>
                <li><h5>Deploy solutions with real-world applications</h5></li> 
            </ul>
            <h5 style={{marginLeft: "10px", paddingBottom: "20px"}}> See our recent <Link href="/publications" target="_blank"><b>publications</b></Link> for examples.</h5>

            <h2>Potential Projects</h2>
            <h5> You will work on a research project in a close collaboration with the PI and the other lab members. Here are some potential project ideas: </h5>
            <ul style={{marginLeft: "30px"}}>
                <li><h5>Build, collect, design physical AI dataset and models</h5></li>
                <li><h5>Design, build, evaluate novel sensing techniques</h5></li>
                <li><h5>Design, build, evaluate wearable haptic experiences</h5></li>
                <li><h5>Develop creativity and authoring toolkits for human-centered interaction</h5></li>
                <li><h5>You can also suggest new ideas!</h5></li>
            </ul>

            <br />

            <h2>Requirement</h2>

            <ul style={{marginLeft: "30px"}}>
                <li><h5>We welcome students from diverse backgrounds and majors. Ideal candidates are:</h5></li>
                <li><h5>Eager to learn and build physical and digital interactive systems</h5></li>
                <li><h5>Self-motivated and able to take ownership of their proposed ideas</h5></li>
                <li><h5>Experienced in SW/HW prototyping within research projects (optional but strongly recommended)</h5></li>
            </ul>

            <br />

            <h2>Ph.D. Student</h2>
            <ul style={{marginLeft: "30px"}}>
                <li><h5>We prefer Ph.D. candidates with prior research experience and publications in related venues (e.g., top conferences listed on <Link href="https://csrankings.org/#/fromyear/2022/toyear/2026/index?vision&mlmining&graph&chi&robotics&visualization&asia" target="_blank">CSRankings</Link>).</h5></li>
                <li><h5>If you do not yet have research experience or publications, please consider applying for the M.S. program first.</h5></li>
                <li><h5>At KAIST, a Master's degree is required for admission to the Ph.D. program.</h5></li>
            </ul>

            <br />

            <h2>M.S. Student</h2>
            <ul style={{marginLeft: "30px"}}>
                <li><h5><b>(Spring 2027 Admission) We will only consider candidates who complete an internship in our lab during Summer 2026.</b></h5></li>
                <li><h5>All M.S. students are expected to conduct an individual research project and complete a thesis.</h5></li>
                <li><h5>For official admission in Graduate School of Culture Technology, please refer to <Link href="https://ct.kaist.ac.kr/pages/sub/sub0601" target="_blank">admission website.</Link></h5></li>
                <li><h5>For official admission in Graduate School of Metaverse, please refer to <Link href="https://meta.kaist.ac.kr/" target="_blank">admission website.</Link></h5></li>
                <li><h5>For official admission in School of Computing, please refer to <Link href="https://cs.kaist.ac.kr/content?menu=41" target="_blank">admission website.</Link></h5></li>
                <li><h5>For official admission in Robotics Program, please refer to <Link href="https://robots.kaist.ac.kr/english" target="_blank">admission website.</Link></h5></li>
                <li><h5>For official admission in AX Department, please refer to <Link href="https://ax.kaist.ac.kr/#/admission-grad" target="_blank">admission website.</Link></h5></li>
            </ul>

            <br />

            <h2>Conditions</h2>
            <ul style={{marginLeft: "30px"}}>
                <li><h5>Monthly Stipend + Research Incentive</h5></li>
                <li><h5>Personal office space in the N5 building, with a hybrid work arrangement available as needed.</h5></li>
                <li><h5>Standing desk and individual PC & monitor provided.</h5></li>
                <li><h5>Prototyping-related consumables and equipment are provided.</h5></li>
            </ul>
            <br />
        </SectionContainer>
    );
}