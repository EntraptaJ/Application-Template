// API/index.ts
import './Setup';
import Koa from 'koa';
import KoaRouter from '@koa/router';
import { ApolloServer } from 'apollo-server-koa';
import { generateGQLSchema } from './Library/generateGQLSchema';

async function startAPI(): Promise<void> {
  const server = new Koa();
  const serverRouter = new KoaRouter();
  const apiServer = new ApolloServer({
    playground: true,
    introspection: true,
    schema: await generateGQLSchema()
  });

  apiServer.applyMiddleware({ app: server });

  server.use(serverRouter.routes()).use(serverRouter.allowedMethods());
  const httpServer = await server.listen(80);
  console.log(httpServer.connections);
}

startAPI();
