import type { AppProps } from "next/app";
import '../styles/main.scss'

import "@/styles/globals.css";
import Layout from "@/components/layouts/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </QueryClientProvider>
}
