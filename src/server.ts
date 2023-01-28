import { initTRPC } from "@trpc/server";
import {z} from 'zod';
const t = initTRPC.create();

const { router,procedure} = t

const movieRouter = router({
    findById:procedure.input(z.string()).query(({input})=>{
        return findMovie(input)
    })

    create:procedure.input(z.object({
        name:z.string(),
        score:z.number().positive().lt(6)
    })).mutation(({input})=>{
        return addMovie(input.name,input.query)
    })
})

const appRouter = router({
    movie:movieRouter
})

export type AppRouter = typeof appRouter;

const app = express();

app.use('/trpc',trpExpress.createExpressMiddleware({
    router:appRouter
}))

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
    
})