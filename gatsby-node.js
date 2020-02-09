const fetch = require('node-fetch');
const _ = require('lodash');

async function onCreateNode({
  node,
  actions,
  createNodeId,
  createContentDigest,
},
pluginOptions) {
  if (!node || !node.frontmatter) return;
  const { createNode, createParentChildLink } = actions;

  await Promise.all(Object.keys(node.frontmatter).map(async (key) => {
    const value = node.frontmatter[key];

    function transformObject(obj, id, type) {
      const geoNode = {
        ...obj,
        id,
        children: [],
        parent: node.id,
        internal: {
          contentDigest: createContentDigest(obj),
          type,
        },
      };
      createNode(geoNode);
      createParentChildLink({ parent: node, child: geoNode });
    }

    if (value.includes('coordinates')) {
      const json = JSON.parse(value);

      if (json.type === 'Point') {
        const long = json.coordinates[0];
        const lat = json.coordinates[1];
        const query = `${lat}%2C${long}`;
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${pluginOptions.apiKey}&q=${query}`);
        const geo = await response.json();
        transformObject(geo.results[0], createNodeId(`${node.id} >>> GEO`), _.upperFirst(_.camelCase(`${key} Geo`)));
      }
    }
  }));
}

exports.onCreateNode = onCreateNode;
