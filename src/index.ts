import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

import "./database/connection";
import routes from "./routes";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
function cors(): any {
  throw new Error("Function not implemented.");
}
