declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue-fragment';
declare module 'vuedraggable';

declare module "*.png" {
  const value: string;
  export default value;
}