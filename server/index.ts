// Import packages required by the app
import express, {Express, Request, Response} from "express"
import cors from "cors"
import { openDb } from "./database"
import { QueryResult} from "pg"

// Start new instance of express
const app: Express = express();
// Packges used by app
app.use(cors());
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))

// Port number declaration
const port: number = 3001;

// Define routes
app
  .get("/restaurants",(req: Request, res: Response) => {
    let pool = openDb()

    pool.query("select * from restaurants", (error: Error,result: QueryResult) => {
        if (error) {
          res.status(500).json({error: error.message})
        }
        res.status(200).json(result.rows)
    })
  })
  .post("/new", (req: Request, res: Response) => {
    let pool = openDb()

    pool.query("insert into restaurants (name, address...description) values ($1, $2, ...) returning *",
    [req.body.description],
    (error: Error, result: QueryResult) => {
      if (error) {
        res.status(500).json({error: error.message})
      }
      res.status(200).json({id: result.rows[0].id})
    })
  })
  .delete("/delete/:id",async (req: Request, res: Response) => {
    let pool = openDb()
    let id = parseInt(req.params.id)

    pool.query("delete from restaurants where id = $1",
    [id],
    (error: Error, result: QueryResult) => {
      if (error) {
        res.status(500).json({error: error.message})
      }
      res.status(200).json({id: id})
    })
  })
  .put("/update/name/:id", (req: Request, res: Response) => {
    let pool = openDb()

    let id = req.params.id
    let description = req.body.description

    pool.query("update restaurants set name = $1 where id= $2 returning *",
    [description,id],
    (error: Error, result: QueryResult) => {
      if (error) {
        res.status(500).json({error: error.message})
      }
      res.status(200).json({id: result.rows[0].id})
    })
  })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});