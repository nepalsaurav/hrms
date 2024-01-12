import { useQuery } from "react-query"
import { pb } from "../../store/pb"

import { snakeCaseToHuman } from "../../utils/utils"
//@ts-ignore
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom"

function AddLeaveRequet() {
    const [startDate, setStartDate] = useState<Date>(new Date())
    const navigate = useNavigate()
    const { isLoading, error, data } = useQuery('repoData', () =>
        pb.send("/api/get-collection-schema?name=leave_requests", {})
    )
    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: '

    return (
        <div className="px-4">
            <button className="btn mb-3" onClick={() => { navigate("/leave") }}>
                <IoChevronBackCircleSharp />
                Back</button>
            {/* <FocusTrap> */}
            <div className="grid gap-4 grid-cols-2">
                {Array.isArray(data.schema) && data.schema.map((e: any) => (
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">{snakeCaseToHuman(e.name)}</span>
                            </div>
                            {e.type === "text" && <input type="text" placeholder="Type here" className="input input-bordered" />}
                            {e.type === "date" && <DatePicker className="input input-bordered w-full" selected={startDate} onChange={(date: Date) => setStartDate(date)} />}
                            <div className="label">
                            </div>
                        </label>
                    </div>
                ))}

            </div>
            <div className="grid gap-4 grid-cols-2">
                <button className="btn btn-primary">Submit</button>
                <button className="btn btn-secondary">Cancel</button>
            </div>
            {/* </FocusTrap> */}
        </div>
    )
}

export default AddLeaveRequet