import './globals.css'

export const metadata = {
  title: 'Izum Study Clone',
  description: 'Demo site using Next.js + R3F + Tailwind',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
