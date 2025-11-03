<template>

    <div class="btn0" :class="class">
        <div class="btnCnt">
            <el-button @click="clickChild" :style="{ color: textColor, fontFamily: fontFamily }" :loading="loading"
                style="height: 100%;font-size: inherit">
                <template #default>
                    <slot name="default" />
                </template>
            </el-button>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import { ElNotification } from 'element-plus';
const emit = defineEmits(['btnClick'])
function clickChild() {
    if (prop.disabled == false) {
        emit('btnClick')
    } else {
        ElNotification({ title: "Button Disabled", message: "Not meeting the execution conditions", type: "error" })
    }
}
const prop = defineProps({
    mobile: String,
    text: {
        type: String,
        default: 'Custome Btn'
    },
    textColor: {
        type: String,
        default: '#fff'
    },
    class: {
        type: String,
        default: ''
    },
    fontSize: {
        type: String,
        default: '29px'
    },
    fontFamily: {
        type: String,
        default: ''
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
console.log(prop)
</script>

<style lang="scss" scoped>
::v-deep .el-button:hover {
    color: var(--el-menu-hover-text-color) !important;
}

::v-deep .el-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

::v-deep .el-button.is-loading:before {
    background-color: transparent;
}
</style>