import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acesse sua conta",
  description: "Acesse sua conta para continuar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
