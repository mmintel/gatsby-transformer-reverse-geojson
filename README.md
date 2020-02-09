# gatsby-transformer-reverse-geojson
Reverse geocodes GeoJSON data.
---
Let's say you have this data in your frontmatter:
```
location: '{"type":"Point","coordinates":[7.1217982,50.9882845]}'
```
This transformer will find it, pass it to Opencage and create gatsby nodes containing the reverse geocoded response.

You can query it like this as a child node:
```
childMarkdownRemark {
  frontmatter {
    location
  }
  childLocationGeo {
    formatted
  }
}
```

or like this to retrieve all of them
```
allLocationGeo {
    edges {
      node {
        formatted
      }
    }
  }
```

## Install
`yarn add gatsby-transformer-reverse-geojson`

## How to use
Sign up for an [Opencage](https://opencagedata.com/) api key.
In your`gatsby-config.js` add:
```
{
  resolve: 'gatsby-transformer-reverse-geojson',
  options: {
    apiKey: 'YOUR OPENCAGE API KEY'
  }
}
```

## Please note
Currently only supports the `type: "Point"` (default) widget. If you need more just let me know.