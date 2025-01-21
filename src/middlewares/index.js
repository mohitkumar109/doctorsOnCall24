import { userAuth } from "../middlewares/userAuthMiddleware.js";
import { checkPermission } from "../middlewares/roleAuthMiddleware.js";
import { errorHandler, InvalidRoute } from "./errorMiddleware.js";
export default { userAuth, checkPermission, errorHandler, InvalidRoute };
