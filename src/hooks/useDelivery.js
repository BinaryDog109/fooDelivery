import { useGetDocuments } from "./useGetDocuments"

export const useDelivery = () => {
    const {docs: drivers, error, isPending} = useGetDocuments("Users", null, null, [
        "hasOrder",
        "==",
        null
    ])
    return {drivers, error, isPending}
}