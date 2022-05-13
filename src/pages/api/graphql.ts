/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { createContext } from '../../api/graphql/context'
import { Resolvers as resolvers } from '../../api/graphql/resolvers'
import { TypeDefs as typeDefs } from '../../api/graphql/schema'

const cors = Cors()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
