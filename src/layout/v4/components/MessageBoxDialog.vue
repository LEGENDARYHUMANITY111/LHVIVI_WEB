<template>
    <Dialog :show="show" title="" @close="closeDialogClick">
        <template #content>

            <div class="icon">
                <img :src="img(icon)" />
            </div>
            <h2 class="h2">
                {{ title }}
            </h2>
            <div class="btnBox">
                <div class="btn" @click="btnClickClick">
                    <div class="cnt">
                        {{ btnText }}
                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
// 组件相关代码
import Dialog from '@/layout/v4/components/Dialog.vue'
import { img } from '@/utils/utils';
const prop = defineProps({
    title: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    btnText: {
        type: String,
        default: 'Close'
    },
    icon: {
        type: String,
        default: '/upload/attachment/image//202405/09/1715228046413cf483802539845e20853d8995e163_local.png'
    },
    show: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['closeDialog', 'btnClick'])
const closeDialogClick = (res) => {
    emit('closeDialog', res)
}
const btnClickClick = (res) => {
    emit('btnClick', res)
    closeDialogClick(false)
}
</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.h2 {
    text-align: center;
    padding: 0 20px;
    line-height: 32px;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;

    img {
        width: 80px;
    }
}

.btnBox {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 60px;
}
</style>