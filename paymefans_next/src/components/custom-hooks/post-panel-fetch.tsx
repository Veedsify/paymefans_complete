"use client";
import { useEffect, useState } from "react";
import axios, { CancelToken, CancelTokenSource } from "axios";
import { getToken } from "@/utils/cookie.get";
import { UserPostProps } from "@/types/components";

export default function PostPanelFetch(pageNumber: number) {
    const [posts, setPosts] = useState<UserPostProps[]>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);
    const token = getToken()

    useEffect(() => {
        let cancel;
        setLoading(true)
        setError(false)
        const api = `${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/posts`
        const postPerPage = process.env.NEXT_PUBLIC_POST_PER_PAGE
        axios.get(`${api}?page=${pageNumber}&limit=${postPerPage}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setLoading(false)
            setHasMore(res.data.data.total > res.data.data.length)
            setTotalResults(res.data.total)
            setPosts((prev) => {
                return [...new Set([...prev, ...res.data.data])]
            })
            console.log(res)
        }).catch((e) => {
            if (axios.isCancel(e)) {
                console.log('Request canceled', e.message);
            } else {
                setError(true)
                console.log('Error', e.message);
            }
        })
    }, [pageNumber, token])

    return { posts, loading, error, hasMore, totalResults }
}

// const { posts, loading, error, hasMore, totalResults } = PostPanelFetch(page);
// const observer = useRef<IntersectionObserver | null>(null);

// const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
//     if (loading) return;
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver(entries => {
//         if (entries[0].isIntersecting && hasMore) {
//             setPage(prev => prev + 1);
//         }
//     });
//     if (node) observer.current.observe(node);
// }, [loading, hasMore]);