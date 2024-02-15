import type { AppProps } from "next/app";
import '../styles/main.scss'

import "@/styles/globals.css";
import Layout from "@/components/layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "@/context";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  return <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  </QueryClientProvider>
}
