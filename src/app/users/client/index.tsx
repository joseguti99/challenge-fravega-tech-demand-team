'use client'

import Header from "@/src/components/Header"
import { useEffect, useState } from "react"
import { useGetSearchUsers } from "../hooks/useGetUserQuery"
import CardContainer from "../components/CardContainer"
import LinearLoader from "@/src/components/LinearLoader"

export default function UserClient() {
    const [value, setValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const {
        data: searchResults,
        isLoading,
        error
    } = useGetSearchUsers(searchTerm);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        setSearchTerm(value.trim());
    };

    useEffect(() => {
        if (!value.trim()) setSearchTerm('');
    }, [value]);

    return (
        <div>
            <Header value={value} onChange={onChange} onSubmit={onSubmit} />
            {isLoading && <LinearLoader />}
            {error && <div>Error en la búsqueda</div>}
            <CardContainer searchResults={searchResults} searchTerm={searchTerm} />
        </div>
    )
}