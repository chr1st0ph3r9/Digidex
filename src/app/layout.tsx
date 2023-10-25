import "./globals.css";

export const metadata = {
  title: "Digidex",
  description: "The best place to find information of digimons",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
