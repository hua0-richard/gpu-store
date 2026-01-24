export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    let res = await fetch(url, {
        ...options,
        credentials: "include",
    });

    if (res.status === 401) {
        // Attempt refresh
        try {
            const refreshRes = await fetch("/refresh/user", {
                method: "POST",
                credentials: "include",
            });

            if (!refreshRes.ok) {
                throw new Error("Session expired");
            }

            // Retry original request
            res = await fetch(url, {
                ...options,
                credentials: "include",
            });
        } catch (err) {
            console.error("Auto-refresh failed", err);
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
            throw err;
        }
    }

    return res;
};
