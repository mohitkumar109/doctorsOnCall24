import BaseApi from "./BaseApi";

class AuthApi extends BaseApi {
    async registerAPI(values) {
        const req = {
            url: "admin/register",
            method: "POST",
            data: values,
        };
        return await this.makeRequest(req);
    }
    async loginAPI(values) {
        const req = {
            url: "admin/login",
            method: "POST",
            data: values,
        };
        return await this.makeRequest(req);
    }
}

export default AuthApi;
