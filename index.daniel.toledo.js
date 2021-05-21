const { ApolloServer, gql } = require('apollo-server')
const { v4: uuid } = require('uuid')
const axios = require('axios').default;

let juegos=[]

const typeDefs = gql` 
  type Juego {
    id: String!    
    title: String!
    thumbnail: String!
    short_description: String!
    description: String!
    game_url: String!    
    genre: String!    
    platform: String! 
    developer: String!  
    release_date: String! 
    freetogame_profile_url: String! 
    minimum_system_requirements: String! 
    processor: String! 
    memory: String! 
    graphics: String! 
    storage: String! 
    screenshots: [String!]! 
  }
  type Mutation {
    "Agrega un nuevo Juego"
    addCapitulo(
      id: Int!    
      title: String!
      short_description: String!
      platform: String!
      developer: String!
      storage: String!  
      game_url: String! 
    ): Juego   
  }
  type Query {
   "Agrega un nuevo Juego"
    allJuego(author: String, genre: String): [Juego!]!
    findJuego(id: String): Juego!
    juegoCount: Int!
  }
`

let url="https://www.freetogame.com/api/games"

const resolvers = {
  Query: {
    allJuego: (root, args) => {

      let retorno=axios(url)
          .then((result) => {

            return result.data.results

          })
          .catch((error) => {
           return []
          });

      return retorno

    },
    findJuego: (root, args) => {

      let retorno=axios.get(url+"/?id="+args.id)
          .then((result) => {

            return result.data

          })
          .catch((error) => {
            return []
          });

      return retorno

    },
    JuegoCount: () => {
        let retorno=axios(url)
            .then((result) => {

                return result.data.info.count

            })
            .catch((error) => {
                return 0
            });

        return retorno
    },
  },
  Mutation: {
    addJuego: (root, args) => {

      const juego = { ...args, id: uuid() }
      juegos = juegos.concat(juego)
      return juego
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})