import SectionContainer from "@/components/section_container";
import Link from "next/link";
import { internshipCalls } from "@/data/internship_data";

export default function InternshipCall({ data }) {
    // Safety check just in case data doesn't load instantly
    if (!data) return <SectionContainer><h2>Loading...</h2></SectionContainer>;

    return (
        <SectionContainer>
            <h1 className="card-title">
                {data.period} Undergraduate Research Internship 
                {data.formLink !== "#" && data.formLink !== "" && (
                    <Link href={data.formLink} target="_blank" className="ms-2 text-primary text-decoration-none">
                        [Apply Now]
                    </Link>
                )}
            </h1>
            <h3>HCI Tech Lab, Graduate School of Culture Technology, KAIST, {data.period}</h3>
            <br />

            <h2>HCI Tech Lab Introduction</h2>
            <p>As an interdisciplinary research group in Culture Technology, we build physical/digital interactive systems empowered by novel sensing/haptic technologies. In HCI Tech Lab, we aim to explore novel interactive technologies that bring direct benefits to real world users. Our research process generally includes:</p>
            <ul style={{marginLeft: "30px"}}>
                <li><h5>Find gaps between interface/device and human</h5></li>
                <li><h5>Bridge the gap with novel technical &social solution</h5></li>
                <li><h5>Evaluate the solution with research methods</h5></li>
                <li><h5>Deploy the solution with practical applications</h5></li> 
            </ul>
            
            <h2>Project Information</h2>
            <h5> 
                You’ll be participating in ongoing research projects supervised by a graduate student mentor. Please refer to{" "} 
                {data.documentLink !== "#" && data.documentLink !== "" ? (
                    <Link href={data.documentLink} target="_blank" className="text-decoration-none text-primary"><b>this document</b></Link> 
                ) : (
                    <b>this document</b>
                )}
                {" "}for project scope, required skills, and benefits. Below are titles for {data.period} projects: 
            </h5>
            <ul style={{marginLeft: "30px", marginTop: "15px"}}>
                {data.projectTitles.map((item, index) => (
                    <li key={index} className="mb-2"><h5>[Project #{index + 1}] {item}</h5></li>
                ))}
            </ul>

            <br />

            <h2>Internship Conditions</h2>
            <ul style={{marginLeft: "30px"}}>
                <li className="mb-2"><h5>Only accept students who can participate <b>full-time (40 hours per week)</b> while physically present in the lab.</h5></li>
                <li className="mb-2"><h5>Flexible start/end dates + working hours.</h5></li>
                <li className="mb-2"><h5><b>Interns will be paid & personal office space</b> will be provided in the N5 building</h5></li>
                <li className="mb-2"><h5><b>URP</b> is a great option for undergraduate students at KAIST</h5></li>
                <li className="mb-2"><h5>Preference will be given to students who are willing to continue in the lab beyond the internship as graduate students.</h5></li>
            </ul>

            <br />

            <h2>How to Apply</h2>
            <ul style={{marginLeft: "30px"}}>
                <li className="mb-2">
                    <h5>Apply through{" "}
                        {data.formLink !== "#" && data.formLink !== "" ? (
                            <Link href={data.formLink} target="_blank" className="text-primary text-decoration-none">Google Form</Link>
                        ) : (
                            "Google Form"
                        )}
                    </h5>
                </li>
                <li><h5>Application Deadline: <b>{data.deadline}</b></h5></li>
            </ul>

            <br />
        </SectionContainer>
    );
}

// --- NEXT.JS DATA FETCHING FOR STATIC EXPORT ---

// 1. This tells Next.js exactly which URLs to create based on your data file keys
export async function getStaticPaths() {
    const paths = Object.keys(internshipCalls).map((slugKey) => ({
        params: { slug: slugKey },
    }));

    return { paths, fallback: false };
}

// 2. This passes the specific data to the page component based on the URL visited
export async function getStaticProps({ params }) {
    const data = internshipCalls[params.slug];
    
    return {
        props: {
            data,
        },
    };
}