import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const excludeLayout = Component.noLayout || false;

  return (
    <AuthProvider>
      {excludeLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </AuthProvider>
  );
}
