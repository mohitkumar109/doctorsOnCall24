import BaseApi from "./BaseApi";

class BrandApi extends BaseApi {
    async addBrandAPI(values) {
        const req = {
            url: "admin/brand/",
            method: "POST",
            data: values,
        };
        return await this.makeRequest(req);
    }

    async updateBrandAPI(id, values) {
        const req = {
            url: `admin/brand/${id}`,
            method: "PATCH",
            data: values,
        };
        return await this.makeRequest(req);
    }

    async getBrandAPI(search, sorting, status, page) {
        const req = {
            url: `admin/brand/?search=${search}&sorting=${sorting}&status=${status}&page=${page}`,
            method: "GET",
            data: {},
        };
        return await this.makeRequest(req);
    }

    async getBrandByIdAPI(id) {
        const req = {
            url: `admin/brand/${id}`,
            method: "GET",
            data: {},
        };
        return await this.makeRequest(req);
    }

    async actionBrandOneAPI(id, status) {
        const req = {
            url: `admin/actionOnBrand/${id}/${status}`,
            method: "PATCH",
            data: {},
        };
        return await this.makeRequest(req);
    }
}

export default BrandApi;
