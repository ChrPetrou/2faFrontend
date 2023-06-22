import Layout from "@/components/Layout";
import "../styles/globals.css";
import { Chivo } from "next/font/google";
const ChivotFont = Chivo({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <Layout style={{ fontFamily: ChivotFont.style.fontFamily }}>
      <Component {...pageProps} />
    </Layout>
  );
}
