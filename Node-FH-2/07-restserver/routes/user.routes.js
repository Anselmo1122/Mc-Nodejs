const { Router } = require("express");
const {
	userGet,
	userPost,
	userPut,
	userPatch,
	userDelete,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", userGet);

userRouter.post("/", userPost);

userRouter.put("/:id", userPut);

userRouter.patch("/", userPatch);

userRouter.delete("/", userDelete);

module.exports = userRouter;
