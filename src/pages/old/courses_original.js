import SectionContainer from "@/components/section_container";
import {gct565_data} from "@/data/course_data/gct565_data";
import {ctp445_data} from "@/data/course_data/ctp445_data";
import {gct722_data} from "@/data/course_data/gct722_data";
import {gct623_data} from "@/data/course_data/gct623_data";
import Link from "next/link";

export default function Courses() {
    return (
      <SectionContainer>
        <h2 className="card-title">Courses</h2>
        <div className = "row courses_item">
            <div className = "news-item col-md-6 mb-4">
                <h5><b>GCT 565 Augmented Humans</b></h5>
                <h5>This course explores various aspects (interfaces, sensing & haptics, applications) of augmented humans.</h5>
                {
                  gct565_data.slice().reverse().map((item, index) => (
                    <Link key = {index} href={`/gct565/${item.course_info.code.toLowerCase()}`}>{item.course_info.code}<br/></Link>
                  )) 
                }
            </div>
            <div className = "news-item col-md-6 mb-4">
                <h5><b>CTP 445 Augmented Reality</b></h5>
                <h5>This course explores core knwoledge relating to augmented reality including augmented interfaces, sensing technology, visualization, and applications.</h5>
                {
                  ctp445_data.slice().reverse().map((item, index) => (
                    <Link key = {index} href={`/ctp445/${item.course_info.code.toLowerCase()}`}>{item.course_info.code}<br/></Link>
                  )) 
                }
            </div>
            <div className = "news-item col-md-6 mb-4">
                <h5><b>GCT 722 Interactive Haptic Technologies (Offered biennially)</b></h5>
                <h5>This course will cover interactive haptic technologies for XR/AR/VR, Mobile/Ubiquitous Computing, and Tangible & Object Interface.</h5>
                {
                  gct722_data.slice().reverse().map((item, index) => (
                    <Link key = {index} href={`/gct722/${item.course_info.code.toLowerCase()}`}>{item.course_info.code}<br/></Link>
                  )) 
                }
            </div>
            <div className = "news-item col-md-6 mb-4">
                <h5><b>GCT/MV623 Interaction Sensing Principle& Application</b></h5>
                <h5>This course will educate core principles of 3D & Physical sensing adopted for huamn computer interaction.</h5>
                {
                  gct623_data.slice().reverse().map((item, index) => (
                    <Link key = {index} href={`/gct623/${item.course_info.code.toLowerCase()}`}>{item.course_info.code}<br/></Link>
                  )) 
                }
            </div>
        </div>
      </SectionContainer>
    );
  }