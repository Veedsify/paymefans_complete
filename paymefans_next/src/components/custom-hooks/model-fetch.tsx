"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/cookie.get";
import { PostData, UserPostProps } from "@/types/components";

export default function ModelsFetch(pageNumber: number, search: string) {
    const [models, setModels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setModels([])
    }, [search])

    useEffect(() => {
        let cancel;
        setLoading(true)
        setError(false)
        const token = getToken()
        const api = `${process.env.NEXT_PUBLIC_EXPRESS_URL}/search-models`

        axios(api, {
            method: 'GET',
            params: {
                q: search,
                page: pageNumber,
                limit: 18
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setModels((prev) => {
                return [...new Set([...prev, ...res.data.models])]
            })
            setHasMore(res.data.models.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
    }, [pageNumber, search])

    return { models, loading, error, hasMore }
}