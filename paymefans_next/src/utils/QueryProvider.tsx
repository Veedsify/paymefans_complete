﻿"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 10, // 6 seconds 
                refetchInterval: 1000 * 10, // 5 minutes
            },
        },
    })

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>;
}

export default QueryProvider;