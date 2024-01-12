import { useQuery } from "react-query";
import { pb } from "../../../store/pb";
import { BaseModel } from "pocketbase";

function Employee() {

    const { isLoading, error, data } = useQuery('repoData', () =>
        pb.collection("employee").getFullList({
            sort: '-created',
        })
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error

    return (
        <>
            <p>this is employee page</p>
            {Array.isArray(data) && data.map((e: BaseModel) => (
                <>
                    <p>{e.first_name}</p>
                    <p>{e.last_name}</p>
                </>
            ))}
        </>
    )


}

export default Employee