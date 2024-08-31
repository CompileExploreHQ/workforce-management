import multer from "multer";

const storage = multer.memoryStorage();
const multerInstance = multer({ storage });
const multipartMiddleware = multerInstance.any();
export default multipartMiddleware;
