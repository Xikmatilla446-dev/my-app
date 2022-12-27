import useGeneralQuery from "./useGeneralQuery";


const useGetDocumentsQuery = () => useGeneralQuery("/api/v1/documents");

export  {
    useGetDocumentsQuery
}