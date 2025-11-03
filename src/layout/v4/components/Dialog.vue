<template>
    <el-dialog :model-value="show" width="600" :title="title" class="dialog" modal-class="oveBg"
        :close-on-click-modal="closeOnClickModal" :show-close="showClose" :close-on-press-escape="closeOnPressEscape">
        <slot name="content" />
    </el-dialog>
</template>

<script lang="ts" setup>

const prop = defineProps({
    show: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    },
    closeOnClickModal: {
        type: Boolean,
        default: true
    },
    showClose: {
        type: Boolean,
        default: true
    },
    closeOnPressEscape: {
        type: Boolean,
        default: true
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
    },
    backgroundImage: {
        type: String,
        default: 'linear-gradient(153deg, #D7BC84, #CDCDCD)'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
})

</script>

<style lang="scss">
.dialog {
    color: #000;
    border-radius: 15px;
    background-position: top left;
    background-repeat: no-repeat;

    .el-dialog__title {
        color: #000;
        font-size: 18px;
        font-family: Poppins;
    }

    .el-dialog__body {
        color: #000;
    }
}

.oveBg {
    background-color: rgb(0, 0, 0, 0.9);
}

@media screen and (max-width: 800px) {
    .dialog {
        width: calc(100% - 40px);
    }
}
</style>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";
</style>