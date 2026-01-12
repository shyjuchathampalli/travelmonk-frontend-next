"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient as baseClient } from "./react-query";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => baseClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
