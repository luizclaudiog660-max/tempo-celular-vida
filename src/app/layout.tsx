import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tempo de Celular em Vida",
  description: "Descubra quanto tempo você gasta no celular e transforme sua vida com trocas inteligentes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className={`${inter.className} antialiased transition-colors duration-300`}>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}