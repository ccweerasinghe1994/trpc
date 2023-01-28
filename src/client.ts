import {createTRPCProxyClient,httpBatchLink} from '@trpc/client'
import { AppRouter } from './server'

const trpc = createTRPCProxyClient<AppRouter>({
    links:[
        httpBatchLink({
            url:"http://localhost:3000/trpc"
        })
    ]
})


async function main() {
    const movie = await trpc.movie.create.mutate({
        name:"Boby Boss",
        score:4
    })
}