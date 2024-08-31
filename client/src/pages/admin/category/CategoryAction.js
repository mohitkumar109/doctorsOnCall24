import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../../services/apiConfig";

async function changeStatusMulti(data, fetchCategory, status) {
    let arraysIds = [];
    data.forEach((d) => {
        if (d.checked === true && d.status !== status) {
            arraysIds.push(d._id);
        }
    });
    const idsParam = arraysIds.join(",");
    if (arraysIds.length) {
        try {
            const response = await axios.patch(
                `${BASE_URL}/admin/actionOnCategory/${status}`,
                {
                    ids: idsParam,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success(response.data.message);
                fetchCategory();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.response ? error.response.data.message : error.message);
        }
    } else {
        toast.error("Click on Checkbox");
    }
}

export const Action = { changeStatusMulti };
