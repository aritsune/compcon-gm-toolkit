import { NPCStatBlock } from './NPCClass';

export default interface NPCTemplate {
  name: string;
  features: {
    name: string;
    description: string;
  }[];
  traits: {
    name: string;
    effect: string;
  }[];
  statTransform: (arg: NPCStatBlock) => NPCStatBlock;
  statCaps?: { [key: string]: number };
  incompatibleTemplates: string[];
}
