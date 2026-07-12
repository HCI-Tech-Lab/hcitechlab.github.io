import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import NavBar from "@/components/navbar";
import GoogleAnalytics from "@/components/googleanalytics";


export default function App({ Component, pageProps }) {

  return (
    <>
      <GoogleAnalytics trackingId="G-L11CDKTS4E" />
      <NavBar />
      <main style={{ paddingTop: "86px"}}>
        <Component {...pageProps} />
      </main>
    </>
  );
}