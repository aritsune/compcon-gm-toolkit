<template>
    <v-rating
        class="pipbar"
        v-model="md"
        :length="max"
        empty-icon="mdi-circle-outline"
        full-icon="mdi-circle"
        background-color="primary"
        hover
        clearable
        :ripple="false"
        dense
    />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({

})
export default class PipBar extends Vue {
    @Prop({type: Number, required: true}) value!: number;
    md = this.value;
    @Prop(Number) max!: number;


    @Watch('md')
    onChange() {
        this.$emit('input', this.md)
    }

}
</script>

<style>
.pipbar {
    display: flex;
    flex-wrap: wrap;
}
.pipbar .v-icon {
    padding: 0px 0px !important;
}
.pipbar .v-icon .v-ripple__container {
    width: 32px !important;
    height: 28px !important;
    left: -1px !important;
}
</style>
