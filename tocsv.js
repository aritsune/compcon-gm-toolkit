const fs = require('fs');
const _ = require('lodash');

const systems = require('./static/systems.json');
const genericSystems = require('./static/generic_systems.json');
const templateSystems = require('./static/template_systems.json');

let main = _.groupBy(systems.concat(templateSystems), 'class');
main['generic'] = genericSystems;

let out = '';

for (const category in main) {
  out += category.toUpperCase() + '\n';
  const filteredSyses = main[category].filter(s => s.effect);
  for (const sys of filteredSyses) {
    out += Object.values(_.pick(sys, ['name', 'effect']))
      .map(f => f.replace(/"/gi, '""'))
      .map(f => `"${f}"`)
      .join(',');
    out += '\n';
  }
}

fs.writeFileSync('sys.csv', out);
