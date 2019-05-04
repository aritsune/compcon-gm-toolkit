<template>
    <div class="d-flex align-items-center justify-content-between">
        <div
        class="valuezone d-flex flex-column mr-1" style="min-width: 20px;"
        @click="editValue"
        >
            <div class="label">{{ label }}</div>
            <div
             v-if="digital"
             class="font-weight-bold"
             style="font-size: 24px; line-height: 24px;"
            >
             <span v-if="!editingValue">{{ value }}</span>
             <input type="text" v-model="preValue" v-else 
             style="width: 30px; text-align: center; background-color: transparent; border: none; font-weight: bold; font-size: 1em; color: #48455a; padding: 0;"
             ref="textfield"
             @blur="processEditedValue"
             @keyup.enter="onEnter"
             >
            </div>
        </div>
        <div class="pips" :style="`max-width: calc(${breakAt * 18}px)`">
            <filled-circle-icon style="font-size: 24px" v-for="i in value" :key="'fill' + i" />
            <circle-icon style="font-size: 24px" v-for="i in (max - value)" :key="'empt' + i" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CircleIcon from 'vue-material-design-icons/CheckboxBlankCircleOutline.vue';
import FilledCircleIcon from 'vue-material-design-icons/CheckboxBlankCircle.vue';

import Pips from './Pips.vue';

const breakAt = 8;

export default Vue.extend({
    components: { CircleIcon, FilledCircleIcon },
    data: () => ({
        breakAt,
        value: 0,
        editingValue: false,
        preValue: '',
    }),
    props: {
        label: { type: String, default: '?' },
        max: { type: Number, required: true },
        digital: { type: Boolean, default: true },
        rollover: { type: Boolean, default: false },
    },
    methods: {
        editValue() {
            this.editingValue = true;
            this.$nextTick(function () {
                (this.$refs.textfield as HTMLInputElement).focus();
            });
        },
        onEnter() {
            (this.$refs.textfield as HTMLInputElement).blur();
        },
        processEditedValue() {
            this.editingValue = false;
            const preValue = this.preValue;
            if (preValue.match(/^[\d\+\-]+$/)) {
                let postValue;
                if (preValue.startsWith('+') || preValue.startsWith('-')) {
                    postValue = this.value + parseInt(preValue)
                } else {
                    postValue = parseInt(preValue);
                }
                if (this.rollover) {
                    if (postValue < 1) postValue = this.max + postValue; 
                    else if (postValue > this.max) postValue = this.max + postValue; 
                } else {
                    postValue = Math.min(this.max, postValue)
                    postValue = Math.max(0, postValue)
                }
                this.value = postValue;
            }
            this.preValue = '';
        }
    },
    created() {
        this.value = this.max;
    }
})
</script>

<style scoped>
.valuezone {
    cursor: text;
}
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type=number] {
    -moz-appearance:textfield;
}
</style>


<style>
.pips {
  line-height: 10px;
  text-align: left;
  letter-spacing: -1px;
}
</style>
