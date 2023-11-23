import { UserProvider } from "../context/UserContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online Note",
  description: "Online Note using NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <>{children}</>
        </UserProvider>
      </body>
    </html>
  );
}
