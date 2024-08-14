import React from "react";

const UpdateProfileModel = ({ open, setOpen }) => {
    return (
        <aside className={`modal-overlay ${open ? "open" : ""}`}>
            <div className="modal-container">
                <div className="modal-content">
                    <h4 className="text-center mb-4">Update Profile</h4>
                    <form className="offset-lg-1">
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="fullName"
                                placeholder="John Doe"
                            />
                            <div className="form-text text-danger">errors</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="john@doe.com"
                            />
                            <div className="form-text text-danger">errors</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">
                                Mobile
                            </label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                placeholder="Mobile Number"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary m-3">
                            Update Profile
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
};

export default UpdateProfileModel;
