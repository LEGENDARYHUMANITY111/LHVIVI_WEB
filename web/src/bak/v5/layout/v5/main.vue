<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header ref="headRef" @open-sub-menu="openSubMenu" />
            </el-header>
            <el-main>
                <router-view @showLoginDialog="login"></router-view>
                <Footer />
            </el-main>
        </el-container>
    </div>

</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Menu from '@/layout/v4/components/Menu.vue'
import { useRouter } from 'vue-router';

type headerType = InstanceType<typeof Header>;
const headRef = ref<null | headerType>(null);

const logout = () => {
    headRef.value?.logout()
}

const login = () => {
    headRef.value?.login()
}

const subMenuShowStatus = ref(false)
const openSubMenu = (res) => {
    //console.log("openSubMenu: ", res);
    if (res == false) {
        subMenuShowStatus.value = false;
    } else {
        subMenuShowStatus.value = !subMenuShowStatus.value
    }
}

// 处理分享码
const router = useRouter()
const query = computed(() => router.currentRoute.value.query)
if ("code" in query.value && Object.keys(query.value.code).length == 5) {
    localStorage.setItem('shareCode', query.value.code + '')
}

</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.aaa .menu {
    flex-direction: column
}

::v-deep .el-header {
    position: fixed;
    padding: 0;
    height: 109px;
    overflow: hidden;
    width: 100%;
    z-index: 999;
}

::v-deep .el-main {
    padding: 0;
    // padding-top: 120px;
    min-height: 100%;
}
</style>