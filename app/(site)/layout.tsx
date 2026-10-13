import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBar from "@/components/layout/MobileBar";

/** Shared chrome for every public page. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileBar />
    </>
  );
}
