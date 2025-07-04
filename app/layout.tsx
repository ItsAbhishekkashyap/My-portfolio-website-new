// // layout.tsx (⚠️ no 'use client' here)
// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
// import { Toaster } from "@/components/ui/toaster"
// import ResponsiveHeader from "@/components/responsive-header"
// import ClientDiagnosticWrapper from "@/components/client-diagnostic-wrapper"
// import ChatbotWrapper from "@/components/chatbot-wrapper"

// import ClientLayoutWrapper from '@/components/ClientLayoutWrapper' // 👈 new wrapper

// const inter = Inter({ subsets: ["latin"], display: "swap" })

// export const metadata: Metadata = {
//   title: "Abhishek Gond",
//   description: "Portfolio of Abhishek Gond, Electronics and Communication Engineer",
//   generator: "v0.dev",
//   icons: { icon: "/grad.svg" },
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//       </head>
//       <body className={`${inter.className} theme-transition`}>
//         <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
//           <ResponsiveHeader />
//           <ClientLayoutWrapper>
//             {children}
//           </ClientLayoutWrapper>
//           <Toaster />
//           <ClientDiagnosticWrapper />
//           <ChatbotWrapper />
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }



// layout.tsx
// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ResponsiveHeader from "@/components/responsive-header"
import ChatbotWrapper from "@/components/chatbot-wrapper"
import ClientDiagnosticWrapper from "@/components/client-diagnostic-wrapper"
import { Toaster } from "react-hot-toast"  // ✅ react-hot-toast

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Abhishek Gond",
  description: "Portfolio",
  icons: { icon: "/grad.svg" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ResponsiveHeader />

          {children}

          <Toaster position="top-right" /> {/* ✅ Only one Toaster needed */}
          <ClientDiagnosticWrapper />
          <ChatbotWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
