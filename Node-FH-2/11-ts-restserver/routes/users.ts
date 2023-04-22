import { Router } from "express";
import { 
  obtainUsers, 
  obtainUser, 
  createUser, 
  updateUser, 
  deleteUser  
} from "../controllers/users";

const router = Router();

router.get("/", obtainUsers);
router.get("/:id", obtainUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
