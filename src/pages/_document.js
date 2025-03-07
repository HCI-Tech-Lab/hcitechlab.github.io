import { Html, Head, Main, NextScript } from 'next/document';
import Image from 'next/image';
import NavBar from '@/components/navbar';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter&family=Share+Tech&display=swap" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" defer></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.css" />
        <NavBar />
      </Head>
      <body>
        <Main />
        <NextScript />
        <footer className="py-4 bg-black">
          <div className = "container">
            <div className = "row">
              <div className="col-lg-6 px-4"> 
                <h5 className="m-0 text-left text-white" style= {{fontSize:"medium"}} ><b>HCI Tech Lab</b></h5> 
                <h5 className="m-0 text-left" style= {{color: "lightgray", fontSize:"small"}}>
                  KAIST, N5, Room 2346<br />
                  291 Daehak-ro, Yuseong-gu, Daejeon (34141) <br />
                  Republic of Korea
                </h5> 
              </div>

              <div className="col-lg-6 text-keft">
                <Image alt="footer" src="/CT_New_Logo_White.png" width = {5000} height={500} style={{ height: '50px' , width: "auto"}}/>
              </div>

            </div>
          </div>
        </footer>
      </body>
    </Html>
  );
}
