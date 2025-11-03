<template>
    <div style="width: 100%;height: 100%;" :style="{ backgroundColor: backgroundColor, borderBottom: borderBottom }">

        <div class="container">

            <div class="menuBox">

                <div class="logo" @click="toUrl('/')">
                    <img src="@/assets/nft/image/34324 1.png" alt="Element logo" />
                </div>

                <Menu ref="menuRef" @ellipisisClick="" @open-sub-menu="openSubMenuClick" />

            </div>


        </div>



    </div>

</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Menu from '@/layout/v5/components/Menu.vue'
import { toUrl } from '@/utils/router';

type MenuType = InstanceType<typeof Menu>;
const menuRef = ref<null | MenuType>(null);

const logout = () => {
    menuRef.value?.logout()
}

const login = () => {
    menuRef.value?.login()
}

defineExpose({
    logout,
    login,
})

const backgroundColor = ref('rgb(255, 255, 255,0)')
const borderBottom = ref('none');

const scroll = () => {
    const scrollTop = document.documentElement.scrollTop // 已经滚动区域的高
    // 以滚动高度 + 当前视口高度  >= 可滚动高度 = 触底
    if (scrollTop > 120) {
        backgroundColor.value = 'rgb(255, 255, 255,1)'
        borderBottom.value = '1px solid #F6F6F6'
    } else {
        backgroundColor.value = 'rgb(255, 255, 255,0)'
        borderBottom.value = 'none'
    }
}
// 挂载dom后注册scroll事件
onMounted(() => window.addEventListener('scroll', scroll))
// 页面销毁移除scroll事件
onUnmounted(() => window.removeEventListener('scroll', scroll))

// openSubMenu
const emit = defineEmits(['openSubMenu'])
const openSubMenuClick = (res) => {
    emit('openSubMenu', res)
}

</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.container {
    height: 100%;

    .menuBox {
        display: flex;
        height: 100%;
        justify-content: space-between;
    }

    .logo {
        display: flex;
        align-items: center;
        height: 100%;
        cursor: pointer;

        img {
            width: 324px;
            height: 65px;
        }
    }


}



@media screen and (max-width: 800px) {
    .container {
        .logo {
            img {
                width: 249px;
                height: 50px;
            }
        }

        .menuBox {
            .menu {
                .item {
                    display: none;
                }

                .ellipsis {
                    display: flex;
                }
            }
        }
    }
}
</style>