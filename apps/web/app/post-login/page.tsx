"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PostLogin() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/");
        // router.refresh(); // optional
    }, [router]);

    return null;
}