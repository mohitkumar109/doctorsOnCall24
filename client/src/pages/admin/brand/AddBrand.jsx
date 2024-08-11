import Breadcrumb from "../../../components/Breadcrumb";

export default function AddBrand() {
    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Add Brand"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Add Brand</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-primary btn-sm waves-effect">Back</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="offset-3 mt-4">
                            <div className="row mb-4">
                                <label htmlFor="brand" className="col-sm-2 col-form-label">
                                    Brand
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Brand"
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <label htmlFor="status" className="col-sm-2 col-form-label">
                                    Status
                                </label>
                                <div className="col-sm-5">
                                    <select className="form-select">
                                        <option selected>Choose...</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-sm-2">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
