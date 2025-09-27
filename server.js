import express from "express";
import { publicRouter } from "./routes/publicAPi.js";
import { router } from "./routes/api.js";
const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.use(publicRouter)
app.use(router);

app.listen(3000, () => {
    console.log(`Server is running in port 3000`);
})

export default {
    app
}