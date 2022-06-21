const { gql } = require("apollo-server");

const typeDefs = gql `
  type City {
    id: ID
    name: String
    temperature: Temperature
  } 

  type Temperature {
    actual: Float
    min: Float
    max: Float
  }

  input ConfigInput {
    units: Unit
    lang: Language
  }

  type Query {
    getCityByName(name: String!, country: String, config: ConfigInput): City
    getCityById(id: [String!], config: ConfigInput): [City]
  }

  enum Unit {
    metric
    imperial
    kelvin
  }

  enum Language {
    af
    al
    ar
    az
    bg
    ca
    cz
    da
    de
    el
    en
    eu
    fa
    fi
    fr
    gl
    he
    hi
    hr
    hu
    id
    it
    ja
    kr
    la
    lt
    mk
    no
    nl
    pl
    pt
    pt_br
    ro
    ru
    sv
    se
    sk
    sl
    sp
    es
    sr
    th
    tr
    ua
    uk
    vi
    zh_cn
    zh_tw
    zu
  }
`;

module.exports = {
    typeDefs,
};