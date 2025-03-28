import GalleryCarousel from "@/components/gallery_carousel";
import SectionContainer from "@/components/section_container";

export default function Gallery() {
    return (
      <SectionContainer>
        <div className = "gallery-block grid-gallery">
          <div className="heading"><h2>HCI Tech Lab Gallery</h2></div>
          <div className = "row">
            {
              Object.keys(galleries).map((key, index) => (
                <GalleryCarousel images={galleries[key]} id = {index} title = {key} key = {index} />
              ))
            }
          </div>
        </div>
      </SectionContainer>
    );
  }

const galleries = {
  "May, 2024 (CHI)": [
    "img/Lab/2405/CHI1.jpg",
    "img/Lab/2405/CHI2.jpg",
    "img/Lab/2405/CHI3.png",
    "img/Lab/2405/CHI4.png",
    "img/Lab/2405/CHI5.jpg",
    "img/Lab/2405/CHI6.jpg",
    "img/Lab/2405/CHI7.jpg",
  ],
  "Apr, 2024": [
    "img/Lab/2404/2404_2.jpg",
    "img/Lab/2404/2404_1.jpg",
    "img/Lab/2404/2404_3.jpg"
  ],
  "Feb, 2024 (Graduation)": [
    "img/Lab/2402/Graduation1.JPG",
    "img/Lab/2402/Graduation2.JPG",
    "img/Lab/2402/Graduation3.JPG",
    "img/Lab/2402/Graduation4.JPG",
    "img/Lab/2402/Graduation5.JPG"
  ],
  "Nov, 2023 (KHC)": [
    "img/Lab/2311/KHC1.JPG",
    "img/Lab/2311/KHC2.JPG",
    "img/Lab/2311/KHC3.JPG",
    "img/Lab/2311/KHC4.JPG",
    "img/Lab/2311/KHC5.JPG",
    "img/Lab/2311/KHC6.JPG",
    "img/Lab/2311/KHC7.JPG",
    "img/Lab/2311/KHC8.JPG",
    "img/Lab/2311/KHC9.JPG",
    "img/Lab/2311/KHC10.JPG",
    "img/Lab/2311/KHC11.JPG",
    "img/Lab/2311/KHC12.JPG",
    "img/Lab/2311/KHC13.JPG"
  ],
  "Oct, 2023 (UIST)": [
    "img/Lab/2310/UIST1.jpg",
    "img/Lab/2310/UIST4.png",
    "img/Lab/2310/UIST3.jpg",
    "img/Lab/2310/UIST6.JPG",
    "img/Lab/2310/UIST7.JPG"
  ],
  "Oct, 2023 (ISMAR)": [
    "img/Lab/2310/ISMAR2.JPG",
    "img/Lab/2310/ISMAR1.JPG",
    "img/Lab/2310/ISMAR3.JPG",
    "img/Lab/2310/ISMAR4.JPG",
    "img/Lab/2310/ISMAR5.JPG"
  ],
  "Oct, 2023 (SUI)": [
    "img/Lab/2310/SUI1.jpeg",
    "img/Lab/2310/SUI2.jpeg"
  ],
  "Aug, 2023 (1Million Visit)": [
    "img/Lab/2308/1Mil.JPG",
    "img/Lab/2308/1Mil_1.jpg",
    "img/Lab/2308/1Mil_2.jpg"
  ],
  "July, 2023 (WHC)": [
    "img/Lab/2307/WHC3.JPG",
    "img/Lab/2308/1Mil_1.jpg",
    "img/Lab/2308/1Mil_2.jpg"
  ],
  "June, 2023 (1Million Visit)": [
    "img/Lab/2306/Visit2.jpeg",
    "img/Lab/2306/Visit1.jpeg"
  ],
  "May, 2023 (Teacher's Day)": [
    "img/Lab/2305/230514_1.jpg",
    "img/Lab/2305/230522.jpg"
  ],
  "March, 2023": [
    "img/Lab/2303/230301.png",
    "img/Lab/2303img_0694.jpg"
  ],
  "Feb, 2023": [
    "img/Lab/2302_1/G1.png",
    "img/Lab/2302_1/Graduate4.jpg",
    "img/Lab/2302_1/Graduate8.jpg"
  ],
  "Feb, 2023 (HCI Korea)": [
    "img/Lab/2302/HCIKorea2023.png",
    "img/Lab/2302/HCIK_23_2.jpeg",
    "img/Lab/2302/HCIK_23_9.jpeg"
  ],
  "Dec, 2022": [
    "img/Lab/2212/221209_Lab_Dinner.jpg",
    "img/Lab/2303img_0694.jpg"
  ],
  "Aug, 2022": [
    "img/Lab/2208/image1.jpg",
    "img/Lab/2208/image2.jpg",
    "img/Lab/2208/image3.jpg",
    "img/Lab/2208/image4.jpg",
    "img/Lab/2208/image5.jpg"
  ],
  "Jun, 2022": [
    "img/Lab/220624_Meeting.jpg"
  ],
  "May, 2022": [
    "img/Lab/2205/2205_7.jpg",
    "img/Lab/2205/2205_5.jpg"
  ],
  "Apr, 2022": [
    "img/Lab/220429_Lab Meeting.jpg",
    "img/Lab/220429_Lunch.jpg"
  ],
  "Dec, 2021": [
    "img/Lab/211201_Group.jpg"
  ]
}