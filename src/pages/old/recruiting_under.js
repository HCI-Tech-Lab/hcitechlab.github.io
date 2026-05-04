import SectionContainer from "@/components/section_container";
import Link from "next/link";

const recruitingData = {
    "period": "Winter 2026",
    "formLink": "",
    "documentLink": "",
    "projectTitles": [
        "Multimodal Hand Interaction Dataset & Modeling",
        "Impact Dataset & Haptic Generation from Movies with Multimodal AI",
        "MR-based Physical Interaction with Visual Guidance using Galaxy XR",
        "Design and Implication of Gaze-based Multimodal XR Interaction",
        "Mid-Air Sensing & Haptic Toolkit using Ultrasound Transducer Array",
        "Authoring & Fabrication UI for Triboelectric Sensing Interface",
    ],
    "deadline": "Nov 19, 2025 (Wed)",
}

export default function RecruitingUnder() {
    return (
        <SectionContainer>
            <h1 className="card-title">{recruitingData['period']} Undergraduate Research Internship <Link href={recruitingData['formLink']} target="_blank">[Apply Now]</Link></h1>
            <h3>HCI Tech Lab, Graduate School of Culture Technology, KAIST, {recruitingData['period']}</h3>
            <br />

            <h2>HCI Tech Lab Introduction</h2>
            <p>As an interdisciplinary research group in Culture Technology, we build physical/digital interactive system empowered by novel sensing/haptic technologies. In HCI Tech Lab, we aim to explore novel interactive technologies that bring direct benefits to real world users. Our research process generally includes:</p>
            <ul style={{marginLeft: "30px"}}>
                <li><h5>Find gaps between interface/device and human</h5></li>
                <li><h5>Bridge the gap with novel technical/social solution</h5></li>
                <li><h5>Evaluate the solution with research methods</h5></li>
                <li><h5>Deploy the solution with practical applications</h5></li> 
            </ul>
            
            <h2>Project Information</h2>
            <h5> You’ll be participating in ongoing research projects supervised by a graduate student mentor. Please refer to <Link href={recruitingData['documentLink']} target="_blank"><b>this document</b></Link> for project scope, required skills, and benefits. Below are titles for {recruitingData['period']} projects: </h5>
            <ul style={{marginLeft: "30px"}}>
                {
                    recruitingData['projectTitles'].map(
                        (item, index) => (
                            <li key = {index}><h5>[Project #{index + 1}] {item}</h5></li>
                        )
                    )
                }
            </ul>

            <br />

            <h2>Internship Conditions</h2>
            <ul style={{marginLeft: "30px"}}>
                <li><h5>Only accept students who can participate <b>full-time (40 hours per week)</b> while physically present in the lab.</h5></li>
                <li><h5>Flexible start/end dates + working hours.</h5></li>
                <li><h5><b>Interns will be paid & personal office space</b> will be provided in the N5 building</h5></li>
                <li><h5><b>URP</b> is a great option for undergraduate students at KAIST</h5></li>
                <li><h5>Prefers students who are willing to extend the internship. At the end of the internship, we will discuss extending the internship. The decision will depend on various factors (Internship progress, fit to the lab, commitment, etc).</h5></li>
            </ul>

            <br />

            <h2>How to Apply</h2>
            <ul style={{marginLeft: "30px"}}>
                <li><h5>Apply through <Link href = {recruitingData['formLink']} target="_blank"> Google Form </Link> </h5></li>
                <li><h5>Application Deadline: <b>{recruitingData['deadline']}</b></h5></li>
            </ul>

            <br />
        </SectionContainer>
    );
}