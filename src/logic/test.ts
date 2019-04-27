import classes from '../../static/classes.json';
import NPC from './NPC';

const myNPC = new NPC(classes[0], 0);
console.log('name:', myNPC.name);
console.log('tier:', myNPC.tier);
console.log('stats:', myNPC.stats);
console.log('changing tier');
myNPC.tier = 2;
console.log('new stats:', myNPC.stats);
