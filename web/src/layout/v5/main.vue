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
        <div class="over" v-if="subMenuShowStatus">
            <div class="contanter" style="color: #fff;position: fixed;">
                <Menu direction="column" @open-sub-menu="openSubMenu" />
            </div>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Menu from '@/layout/v5/components/Menu.vue'
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
    console.log("openSubMenu: ", res);
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
@import "/src/assets/v5/css/common.scss";

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

.over {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0, 0, 0, 0.9);
    padding: 50px;
    z-index: 999;
}

.common-layout {
    position: relative;
}


@media screen and (min-width: 1919px){
    .common-layout {
        zoom: 1;
    }
}

@media screen and (max-width: 1919px) and (min-width: 1279px) {
    .common-layout {
        zoom: 0.75;
    }
}

@media screen and (max-width: 1279px) and (min-width: 86px) {
    .common-layout {
        zoom: 0.6;
    }
}

</style>