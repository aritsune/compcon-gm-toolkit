<template>
    <div class="recharge d-flex align-items-center justify-content-center">
        <history style="font-size: 24px" />
        <div class="ml-1">Recharge {{ value }}+</div>
        <div class="ml-1" @click.stop>
            <b-check :value="charged" @click.stop="charged = !charged" style="margin-right: -9px" />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import History from 'vue-material-design-icons/History.vue';


export default Vue.extend({
    name: 'recharge',
    components: { History },
    data: () => ({
        charged: false,
    }),
    props: { value: { type: Number, required: true }, digital: { type: Boolean, default: true } },
    mounted() {
        this.charged = this.digital
    }
})
</script>

<style scoped>
.recharge {
    height: 24px;
    font-weight: bold;
}
</style>
