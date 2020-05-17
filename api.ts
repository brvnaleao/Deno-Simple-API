import { Application, Router } from "https://deno.land/x/oak/mod.ts";
const app = new Application();
const router = new Router();

interface User {
    name: string,
    age: number,
    email: string,
    minor: boolean
};

let users: Array <User> =[
    {
        name: "Bruna",
        age: 26,
        email: "bruna@example.com",
        minor: false
    },
    {
        name: "Julia",
        age: 27,
        email: "julia@example.com",
        minor: false
    },   
    {
        name: "Maria",
        age: 28,
        email: "maria@example.com",
        minor: false
    },   
    {
        name: "Pedro",
        age: 29,
        email: "pedro@example.com",
        minor: false
    },
    {
        name: "Fábio",
        age: 17,
        email: "fabio@example.com",
        minor: true
    },
    {
        name: "Cristina",
        age: 15,
        email: "cristina@example.com",
        minor: true
    }
];


//controllers
const getUsers = ({response}:{response:any}) =>{
    response.body = users;
};
const addUsers = async ({request, response}:{request: any; response:any}) =>{
    const body = await request.body();
    const user: User = body.value;
    users.push(user);

    response.status = 200;
    response.body = {status: "User added correctly!"}
};


//MIDDLEWARES

//creating a log
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`METHOD: ${ctx.request.method} - URL: ${ctx.request.url} - TIME: ${rt}`);
});

//getting the time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

//setting up a router
router
    .get('/users', getUsers)
    .post('/users', addUsers);

app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({ port: 3000 });