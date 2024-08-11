import Breadcrumb from "../../components/Breadcrumb";

export default function Dashboard() {
    return (
        <div className="container-fluid">
            <Breadcrumb pageName={"Dashboard"} />
            <div className="content-area">
                <div className="row">
                    {/* Card 1 */}
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Sales</h5>
                                <p className="card-text">1,200</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Customer</h5>
                                <p className="card-text">350</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Staff</h5>
                                <p className="card-text">5</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* Card 4 */}
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Store</h5>
                                <p className="card-text">10</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 5 */}
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Subscription</h5>
                                <p className="card-text">12</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 6 */}
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Service</h5>
                                <p className="card-text">8</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
