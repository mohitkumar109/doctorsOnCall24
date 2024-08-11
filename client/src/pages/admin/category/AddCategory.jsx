import Breadcrumb from "../../../components/Breadcrumb";

export default function AddCategory() {
    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Add Category"} />
            <div className="content-area">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Add Category ss</span>
                        <div className="d-flex gap-2" style={{ float: "right" }}>
                            <button className="btn btn-primary btn-sm waves-effect">Back</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="offset-3 mt-4">
                            <div className="row mb-4">
                                <label htmlFor="category" className="col-sm-2 col-form-label">
                                    Category
                                </label>
                                <div className="col-sm-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter category name"
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
