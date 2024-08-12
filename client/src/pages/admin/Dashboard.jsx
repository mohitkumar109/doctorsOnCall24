import Breadcrumb from "../../components/Breadcrumb";

export default function Dashboard() {
    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Dashboard"} />
            <div className="content-area">
                <div className="row">
                    {/* Card 1 */}
                    <div className="col-xl-3 col-md-3 mb-4">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <p className="card-text">1,200</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-3 mb-4">
                        <div className="card bg-warning text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <p className="card-text">1,200</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-3 mb-4">
                        <div className="card bg-success text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <p className="card-text">1,200</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-3 mb-4">
                        <div className="card bg-danger text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <p className="card-text">1,200</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                </div>
                <div className="row">
                    <div className="col-xl-3 col-md-3 mb-4">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <p className="card-text">1,200</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-3 mb-4">
                        <div className="card bg-warning text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <p className="card-text">1,200</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-3 mb-4">
                        <div className="card bg-success text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <p className="card-text">1,200</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-3 mb-4">
                        <div className="card bg-danger text-white">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <p className="card-text">1,200</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
