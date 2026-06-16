import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Figurinha Panini",
  description: "Crie sua figurinha personalizada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}