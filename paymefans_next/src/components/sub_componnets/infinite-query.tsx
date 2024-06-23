"use client"
import { getToken } from '@/utils/cookie.get';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItems = async ({ pageParam = 1 }: { pageParam: number }) => {
    const token = getToken()

    const api = `${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/posts`

    const postPerPage = process.env.NEXT_PUBLIC_POST_PER_PAGE

    const res = await axios.get(`${api}?page=${pageParam}&limit=${postPerPage}`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
    return res.data;
};

const fetchItemsOther = async ({ pageParam = 1, userid }: { pageParam: number, userid?: string }) => {
    const token = getToken()

    const api = `${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/${userid}/posts`

    const postPerPage = process.env.NEXT_PUBLIC_POST_PER_PAGE

    const res = await axios.get(`${api}?page=${pageParam}&limit=${postPerPage}`, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        }
    })
    return res.data;
};

export const useItems = () => {
    return useInfiniteQuery({
        queryKey: ['items'],
        queryFn: async => fetchItems({ pageParam: async.pageParam }),
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1;
            } else {
                return undefined;
            }
        },
        initialPageParam: 0, // Add the initialPageParam property
    });
};


export const useItemsOther = ({ userId }: { userId: string }) => {
    return useInfiniteQuery({
        queryKey: ['itemsOther'],
        queryFn: async => fetchItemsOther({ pageParam: async.pageParam, userid: userId }),
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1;
            } else {
                return undefined;
            }
        },
        initialPageParam: 1, // Add the initialPageParam property
    });
};
