import type { AppProps } from "next/app";
import '../styles/main.scss'

import "@/styles/globals.css";
import Layout from "@/components/layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "@/context";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SiteHead from "@/components/common/SiteHead";

const FullScreenLoader = dynamic(import("@/components/ui/FullScreenLoader"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
  }, [])

  if (isLoading) return <FullScreenLoader />

  return <QueryClientProvider client={queryClient}>
    <SiteHead />
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  </QueryClientProvider>
}
