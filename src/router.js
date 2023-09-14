import { Router } from "express";
import artistsRouter from "./routes/artists.router.js";
import homeRouter from "./routes/home.router.js";

export default Router().use("/", homeRouter).use("/artists", artistsRouter);
