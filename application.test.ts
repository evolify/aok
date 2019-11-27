import Application from './mod.ts'

const app = new Application()

app.use(async (ctx, next) =>{
  console.log('get')
  await next()
})

app.use(async ctx => {
  ctx.res.body = "hello"
})

app.listen(3000)