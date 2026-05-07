import { Html, Head, Main, NextScript } from 'next/document';
import NavBar from '@/components/navbar';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*Agressive Caching */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />

        <link rel="icon" type="image/png" href="/favicon.png" />
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
                  KAIST, N5, Room 2347<br />
                  291 Daehak-ro, Yuseong-gu, Daejeon (34141) <br />
                  Republic of Korea
                </h5> 
              </div>

              <div className="col-lg-6 col-12 text-lg-end text-start px-4 mt-1">
                <img 
                  className="d-none d-md-inline-block" 
                  alt="footer-desktop" 
                  src="CT_New_Logo_White1.png" 
                  style={{ height: '50px', width: "auto"}}
                />
                <img 
                  className="d-inline-block d-md-none" 
                  alt="footer-mobile" 
                  src="Logo_Black.png" 
                  style={{ height: '50px', width: "auto"}}
                />
              </div>

            </div>
          </div>
        </footer>
      </body>
    </Html>
  );
}
