"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactQueryProvider from "@/lib/react-query-provider";
import AuthInitializer from "../components/AuthInitializer";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <ReactQueryProvider>
          <AuthInitializer />
          {children}
        </ReactQueryProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}