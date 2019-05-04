import _ from 'lodash';

import NPC from './NPC';

export const NPCTips = (npc: NPC): string[] => {
  const output: string[] = [];

  const { systems } = npc;
  const templates = npc._templates;

  const optionalModuleCategories = [npc.npcClass.name, 'generic'].concat(
    _.intersection(['mercenary', 'pirate', 'spacer'], npc._templates),
  );

  const classOrGenericSystemsCount = systems.filter(
    sys => optionalModuleCategories.includes && !sys.base,
  ).length;
  let optionalString;
  if (templates.includes('elite'))
    optionalString =
      'As an Elite, the NPC should have between 1 and 3 modules from the following categories: ';
  else if (templates.includes('ultra'))
    optionalString =
      'As an Ultra, the NPC should have between 2 and 4 modules from the following categories: ';
  else
    optionalString =
      'The NPC should have between 0 and 2 modules from the following categories: ';
  optionalString += optionalModuleCategories.map(_.capitalize).join(', ');

  output.push(optionalString);

  if (templates.includes('exotic')) {
    output.push('The NPC should have one or two exotic modules.');
  }

  if (templates.includes('commander')) {
    output.push('The NPC should have one commander trait.');
  }

  if (templates.includes('veteran')) {
    output.push(
      `The Veteran should have at most ${npc.tier + 1} Veteran traits.`,
    );
  }

  if (templates.includes('ultra')) {
    const ultraSystemsCount = systems.filter(sys => sys.class === 'ultra')
      .length;
    output.push('The Ultra should have 1-3 Ultra traits or modules.');
  }

  return output;
};
