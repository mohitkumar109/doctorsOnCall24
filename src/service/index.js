import { Dependencies } from "../packages/index.js";
import { config } from "../common/index.js";
import * as Seeder from "../service/seederAdmin.js";

export const bootstrapStatus = {
    /** create directory - specify list of directories */
    // createDirectory: Helper.createNewDirectory('bin'),

    /** check if `.env` files exists */
    environmentCheck: config.environment,

    /** creates admins */
    createAdmin: Seeder.createAdmin([{ name: "Admin", email: "mohit@gmail.com" }]),
};

console.log("bootstrap status --\n", bootstrapStatus);

console.log("~~Initiating Bootstrapping~~\n");
let Sday = Dependencies.moment()
    .utc()
    .add(330, "minutes")
    .startOf("day")
    .subtract(330, "minutes")
    .subtract(86400, "seconds")
    .toDate();
let Eday = Dependencies.moment()
    .utc()
    .add(330, "minutes")
    .startOf("day")
    .subtract(330, "minutes")
    .subtract(1, "seconds")
    .toDate();
let todaySday = Dependencies.moment()
    .utc()
    .add(330, "minutes")
    .startOf("day")
    .subtract(330, "minutes")
    .toDate();
let todayEday = Dependencies.moment(todaySday).add(86399, "seconds").toDate();
console.log("sday---", Sday, Eday, todaySday, todayEday);
console.log(`1. Environment File Exists: ${bootstrapStatus.environmentCheck ? "✔" : "❌"}`);
console.log(`2. Admin Exists: ${bootstrapStatus.createAdmin ? "✔" : "❌"}`);
console.log("\n~~~ Completed Bootstrapping ~~~\n");
