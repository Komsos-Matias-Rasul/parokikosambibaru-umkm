import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
})

export const metadata = {
  title: "UMKM | Paroki Kosambi Baru",
  description: "Berbagai produk UMKM milik umat Paroki Kosambi Baru mulai dari makanan, minuman, barang, dan jasa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
