import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsPencil, BsTrash3Fill } from "react-icons/bs";
import { capitalizeFirstLetter } from "../../utils/helper";
import { useActionGenericOneMutation } from "../../redux/api/generic";

const GenericTable = ({ record, sn }) => {
    const [actionGenericOne] = useActionGenericOneMutation();
    const changeStatus = async (id, status) => {
        try {
            let answer = window.confirm(`Are you sure you want to ${status} this category?`);
            if (!answer) return;

            const res = await actionGenericOne({ id, status }).unwrap();
            if (res.success) {
                toast.success(res?.message);
            } else {
                toast.error("Failed to change status");
            }
        } catch (error) {
            toast.error("Error changing status");
        }
    };

    return (
        <tr>
            <td>{sn + 1}</td>
            <td>{capitalizeFirstLetter(record?.genericName)}</td>
            <td>{record?.createdBy || "None"}</td>
            <td>{record?.updatedBy || "None"}</td>
            <td>{record?.createdAt?.split("T")[0]}</td>
            <td>
                <div className="form-check form-switch">
                    <input
                        type="checkbox"
                        role="switch"
                        id={`flexSwitchCheckChecked-${record._id}`}
                        checked={record.status === "active"}
                        className="form-check-input mt-2"
                        onChange={() =>
                            changeStatus(
                                record?._id,
                                record?.status === "active" ? "inactive" : "active"
                            )
                        }
                    />
                    <span
                        className={`badge ${
                            record?.status === "active" ? "bg-success" : "bg-danger"
                        }`}
                    >
                        {record?.status === "active" ? "Active" : "Inactive"}
                    </span>
                </div>
            </td>
            <td className="text-default">
                <div className="d-flex gap-3">
                    <Link to={`/edit-generic/${record?._id}`} className="text-primary">
                        <BsPencil />
                    </Link>

                    <Link to="#" className="text-danger">
                        <BsTrash3Fill onClick={() => changeStatus(record?._id, "delete")} />
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default GenericTable;
