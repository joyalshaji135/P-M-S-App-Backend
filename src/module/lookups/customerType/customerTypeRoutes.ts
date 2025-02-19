import { Router } from "express";
import {
  createCustomerTypeProfile,
  editCustomerTypeProfile,
  deleteCustomerTypeProfile,
  getCustomerTypeById,
  getAllCustomerTypes,
  updateCustomerTypeStatus,
} from "./customerTypeControllers";


const router = Router();

router.post("/create-customer-type", createCustomerTypeProfile);

router.patch("/:id/status-change-customer-type", updateCustomerTypeStatus);

router.put("/:id/update-customer-type", editCustomerTypeProfile);

router.delete("/:id/delete-customer-type", deleteCustomerTypeProfile);

router.get("/:id/get-by-id-customer-type", getCustomerTypeById);

router.get("/get-all-customer-types", getAllCustomerTypes);

export default router;
