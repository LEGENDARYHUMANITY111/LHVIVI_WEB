<template>

    <div class="titleBox">
        <div class="bg"></div>
        <div class="content">
            <div class="title">{{ text }}</div>
            <div class="desc" v-if="desc.length > 0">{{ desc }}</div>
        </div>

    </div>

</template>

<script lang="ts" setup>
//import { defineEmits } from 'vue'
const prop = defineProps({
    mobile: String,
    text: {
        type: String,
        default: 'Custome Btn'
    },
    desc: {
        type: String,
        default: ''
    },
    textColor: {
        type: String,
        default: '#fff'
    },
    class: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '425px'
    },
    height: {
        type: String,
        default: '100px'
    },
    fontSize: {
        type: String,
        default: '29px'
    },
    fontFamily: {
        type: String,
        default: 'AlibabaPuHuiTi_2_75_SemiBold'
    }
})
console.log(prop)
</script>

<style lang="scss" scoped>
.titleBox {
    padding: 10px 0;
    width: 100%;
    //background-image: linear-gradient(153deg, #D7BC84, #CDCDCD);
    height: 55px;
    position: relative;
    //background-color: green;

    .bg {
        height: 2px;
        width: 100%;
        //background-image: linear-gradient(153deg, #D7BC84, #CDCDCD);
        background-color: #888C9C;
        position: absolute;
        bottom: 1px;
        z-index: 900;
    }

    .content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 910;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            border-bottom: 4px solid #fff;
            height: calc(100% - 5px - 20px);
            display: inline-flex;
            padding: 10px 0;
            align-items: center;
            font-family: Unbounded;
            font-weight: 500;
            font-size: 26px;
            text-transform: uppercase
        }

        .desc {
            font-family: Poppins;
            font-weight: 300;
            font-size: 16px;
            color: #848484;
            line-height: 24px;
        }
    }
}

@media screen and (max-width: 800px) {
    .titleBox {
        .desc {
            display: none;
        }
    }
}
</style>