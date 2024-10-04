import express, { Request, Response }    from "express";
import dotenv from "dotenv"

dotenv.config()


const app = express();


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! Its me Za Worldoo");
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
