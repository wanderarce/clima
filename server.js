var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema, GraphQLInputObjectType, GraphQLNonNull, GraphQLFloat, GraphQLString } = require('graphql');

var Temperature = new GraphQLInputObjectType({
    name: 'Temperature',
    fields: {
        min: { type: new GraphQLNonNull(GraphQLFloat) },
        max: { type: new GraphQLNonNull(GraphQLFloat) },
        day: { type: new GraphQLNonNull(GraphQLString) },
    }
});
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
    getCityByName(name: String!, country: String, config: ConfigInput): City
    getCityById(id: [String!], config: ConfigInput): [City]
  }

type City {
    id: ID
    name: String
    country: String
    
    temperature: Temperature
  }

  type Temperature {
    actual: Float
    feelsLike: Float
    min: Float
    max: Float
  }

    

    
  type Query {
    city(name: String): City
  }
`);

class City {
    constructor() {
        this.cities = [City];
        this.cities.push(new City("Campo Grande", Temperature(12, 20, new Date())));
    }
}



// The root provides a resolver function for each API endpoint
var root = {
    getCity: ({ name }) => {

        return new City();
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');