import express from "express";
import upload from "../middlewares/multer.js";
import { uploadReport, deleteReport, getAllReports, viewReport } from "../controllers/reportController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadReport);
router.delete("/:reportId", deleteReport);
router.get("/", getAllReports);
router.get("/view/:reportId", viewReport)

export { router };