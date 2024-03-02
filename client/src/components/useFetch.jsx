import { useState, useEffect } from "react"

function useFetch(url, method="GET", body=null) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const controller = new AbortController()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url, {method: method, headers: {"Content-Type": "application/json"}, body: body? JSON.stringify(body) : body, signal: controller.signal})
                if (!response.ok) throw Error("Could not fetch. Response status:", response.status)
                const data = await response.json()
                setData(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        return () => controller.abort()
    }, [url, method, body])

    return {data, loading, error}
}

export default useFetch