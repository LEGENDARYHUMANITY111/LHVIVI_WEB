<template>
    <div class="menu" :class="direction == 'column' ? 'column' : 'row'">

        <!-- <div class="item" @click="closeSubMenu">
            <div class="close">
                <img src="@/assets/lhs/v4/image/close.png" />
            </div>
        </div> -->

        <!-- <div class="item" :class="menuPath == 'todo2' && userSubmenu == false ? 'active' : ''">
            Explore
        </div>

        <div class="item" :class="menuPath == 'todo' && userSubmenu == false ? 'active' : ''">
            Genesis NFT
        </div>

        <div class="item" :class="menuPath == '/news' && userSubmenu == false ? 'active' : ''">
            JOIN US
        </div> -->

        <div class="item" @click="openChildMenuClick('msg', '')">
            <div class="msgBox">
                <div class="msg" v-if="direction == 'row'">
                    <img src="@/assets/lhs/v4/image/notice.png" />
                </div>
                <div v-if="direction == 'column'">Message</div>
            </div>
        </div>

        <template v-if="isLogin">

            <template v-if="direction == 'column'">
                <!-- column dd -->
                <div class="item" @click="userSubmenu = !userSubmenu; menuPath = ''"
                    :class="userSubmenu ? 'active' : ''">
                    <div class="userBox">
                        <div class="user">
                            <div class="avatar" v-if="userInfo.headimg">
                                <img :src="img(userInfo.headimg)" />
                            </div>
                            <el-avatar v-else>
                                {{ userInfo.nickname.substr(userInfo.nickname.length - 1, 1) }}
                            </el-avatar>
                            <div class="right">
                                <div class="name">
                                    {{ userInfo.nickname }}
                                </div>
                                <div class="jb">
                                    <img v-if="userSubmenu" src="@/assets/lhs/v4/image/arrowdown.png" />
                                    <img v-else src="@/assets/lhs/v4/image/arrowright.png" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <template v-if="userSubmenu && direction == 'column'">

                    <div style="margin-top: 30px;"></div>
                    <div class="item sub" v-for="(item, index) in subMenuList" :key="index"
                        @click="openChildMenuClick(item.key, item.path)">
                        <img :src="item.icon" />
                        {{ item.name }}
                    </div>

                </template>

            </template>

            <template v-else>
                <!-- row -->
                <el-popover ref="subMenuPopverRef" :width="300"
                    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
                    popper-class="poperRowCls" trigger="click" @hide="userSubmenu = false">
                    <template #reference>
                        <div v-click-outside="false" class="item" @click="userSubmenu = !userSubmenu; menuPath = ''"
                            :class="userSubmenu && false ? 'active' : ''">
                            <div class="userBox">
                                <div class="user">
                                    <div class="avatar" v-if="userInfo.headimg">
                                        <img :src="img(userInfo.headimg)" />
                                    </div>
                                    <el-avatar v-else>
                                        {{ userInfo.nickname.substr(userInfo.nickname.length - 1, 1) }}
                                    </el-avatar>
                                    <div class="right">
                                        <div class="name">
                                            {{ userInfo.nickname }}
                                        </div>
                                        <div class="jb">
                                            <img v-if="userSubmenu" src="@/assets/lhs/v4/image/arrowdown.png" />
                                            <img v-else src="@/assets/lhs/v4/image/arrowright.png" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </template>
                    <template #default>
                        <div style="display: flex; flex-direction: column" class="rowPoperItem">
                            <div class="item" v-for="(item, index) in  subMenuList " :key="index"
                                @click="openChildMenuClick(item.key, item.path)">
                                <img :src="item.icon" />
                                <div class="title">{{ item.name }}</div>
                            </div>
                        </div>
                    </template>
                </el-popover>
            </template>

        </template>

        <template v-else>
            <div class="item">
                <div class="loginBtn" @click="openV5LoginDialog">
                    <div class="cnt">LOGIN</div>
                </div>
                <!-- <template v-if="installedSolanaWallet">
                    <div class="loginBtn" @click="openV5LoginDialog">
                        <div class="cnt">LOGIN</div>
                    </div>
                </template>
                <template v-else>
                    <div class="loginBtn" @click="installPhantom">
                        <div class="cnt">Install Phantom</div>
                    </div>
                </template> -->
            </div>
        </template>

        <div class="ellipsis" @click="openSubMenuClick">
            <img src="@/assets/lhs/v4/image/menu.png" />
        </div>
    </div>

    <LoginOrRegisterDialog ref="LoginDialogRef" :show="loginDialogShow" @close-dialog="colseLoginDialog" />
    <ProfileDialog :show="profileDialogShow" title="Profile" @close-dialog="closeProfileDialog" />
    <!-- <InvitationCodeDialog :show="invitationCodeDialogShow" title="Invitation Code"
        @close-dialog="closeInvitationCodeDialog" /> -->
    <MyInvitationListDialog :show="myInvitationListDialogShow" @close-dialog="closeMyInvitationListDialog" />
    <MyTaskListDialog :show="myTaskListDialogShow" @close-dialog="closeMyTaskListDialog" />
    <ExportPrivateKeyDialog :show="exportPrivateKeyDialogShow" @close-dialog="closeExportPrivateKeyDialog" />
    <MyMessageListDialog :show="messageBoxDialogShow" @close-dialog="closeMessageBoxDialog" />
    <!-- <EnterInvitationCodeDialog :show="enterInvitationCodeDialogShow" @close-dialog="closeEnterInvitationCodeDialog" /> -->

    <MintNFT ref="mintNftRef" @callback="mintNftCallback" :show="show" />


    <!--v5 start-->
    <LoginDialog :show="v5loginDialogShow" @close-dialog="closeV5LoginDialog" />
    <!--v5 end-->

</template>
<script lang="ts" setup>

// v5 start
import LoginDialog from '@/layout/v6/components/LoginDialog.vue'
const v5loginDialogShow = ref(false)

const openV5LoginDialog = () => {
    v5loginDialogShow.value = true
}

const closeV5LoginDialog = () => {
    v5loginDialogShow.value = false
}


// v5 end

import LoginOrRegisterDialog from '@/layout/v4/components/LoginOrRegisterDialog.vue'
import ProfileDialog from '@/layout/v4/components/ProfileDialog.vue'
import InvitationCodeDialog from '@/layout/v4/components/InvitationCodeDialog.vue'
import MyInvitationListDialog from '@/layout/v4/components/MyInvitationListDialog.vue'
import MyTaskListDialog from '@/layout/v4/components/MyTaskListDialog.vue'
import ExportPrivateKeyDialog from '@/layout/v4/components/ExportPrivateKeyDialog.vue'
import MyMessageListDialog from '@/layout/v5/components/MyMessageListDialog.vue'
import EnterInvitationCodeDialog from '@/layout/v4/components/EnterInvitationCodeDialog.vue'
import { useRouter } from 'vue-router'
import { computed, reactive, ref, watch } from 'vue'

import { getMyParentInvateCode, getMyLevel } from '@/api/lhs/user'

const installedSolanaWallet = ref(false)
installedSolanaWallet.value = typeof (window.solana) == 'undefined' ? false : true;
const installPhantom = () => {
    window.location.href = 'https://phantom.app/';
}

// mintNft start
const show = ref(false)
const mintNftCallback = (res) => {

}
import MintNFT from '@/layout/v4/components/MintNft.vue';
const mintNftRef = ref(null)
const LoginWithPhantom = async () => {
    mintNftRef.value?.loginWithPhantom();
}
// mintNft end

const loginDialogShow = ref(false)
const profileDialogShow = ref(false)
const invitationCodeDialogShow = ref(false)
const myInvitationListDialogShow = ref(false)
const myTaskListDialogShow = ref(false)
const subMenuPopverRef = ref(null)
const exportPrivateKeyDialogShow = ref(false)
const messageBoxDialogShow = ref(false)
const enterInvitationCodeDialogShow = ref(false)

const prop = defineProps({
    direction: {
        type: String,
        default: 'row'
    },
    subMenuStatus: {
        type: Boolean,
        default: false
    }
})

import img1 from '@/assets/lhs/layouts/Profile.svg'
import img2 from '@/assets/lhs/v4/image/export.svg'
import img3 from '@/assets/lhs/layouts/InvitationCode.svg'
import img4 from '@/assets/lhs/layouts/Invitation.svg'
import img5 from '@/assets/lhs/layouts/Task.svg'
import img6 from '@/assets/lhs/layouts/Link.svg'
import img7 from '@/assets/lhs/layouts/exit.svg'

const subMenuList = ref([
    // {
    //     name: 'Profile',
    //     path: '',
    //     icon: img1,
    //     key: 'profile'
    // },
    // {
    //     name: 'Export PrivateKey',
    //     path: '',
    //     icon: img2,
    //     key: 'export_private_key'
    // },
    // {
    //     name: 'Invitation Code',
    //     path: '',
    //     icon: img3,
    //     key: 'invitation_code'
    // },
    // {
    //     name: 'My Invitation',
    //     path: '',
    //     icon: img4,
    //     key: 'my_invitation'
    // },
    // {
    //     name: 'Task List',
    //     path: '',
    //     icon: img5,
    //     key: 'task_list'
    // },
    {
        name: 'User Center',
        path: '',
        icon: img1,
        key: 'user_center'
    },
    // {
    //     name: 'Help Center',
    //     path: '',
    //     icon: img6,
    //     key: 'help_center'
    // },
    {
        name: 'Logout',
        path: '',
        icon: img7,
        key: 'logout'
    }
])

const router = useRouter()

const userSubmenu = ref(true)

const emit = defineEmits(['openSubMenu'])

const menuPath = ref('/')
menuPath.value = router.currentRoute.value.path
const clickMenu = (path) => {
    menuPath.value = path
    userSubmenu.value = false
    router.push({ path: path })
    emit('openSubMenu', false)
}

const closeSubMenu = () => {
    emit('openSubMenu', false)
}

const openSubMenuClick = () => {
    console.log("menu::openSubMenuClick: ", prop.subMenuStatus);
    emit('openSubMenu', true)
}

const openLoginDialog = () => {
    loginDialogShow.value = true
}

const colseLoginDialog = () => {
    loginDialogShow.value = false
}

const closeProfileDialog = () => {
    profileDialogShow.value = false
}

const openProfileDialog = () => {
    profileDialogShow.value = true
}

const closeInvitationCodeDialog = () => {
    invitationCodeDialogShow.value = false
}

const openInvitationCodeDialog = () => {
    invitationCodeDialogShow.value = true
}

const closeMyInvitationListDialog = () => {
    myInvitationListDialogShow.value = false
}

const openMyInvitationListDialog = () => {
    myInvitationListDialogShow.value = true
}

const closeMyTaskListDialog = () => {
    myTaskListDialogShow.value = false
}

const openMyTaskListDialog = () => {
    myTaskListDialogShow.value = true
}

const closeExportPrivateKeyDialog = () => {
    exportPrivateKeyDialogShow.value = false
}

const openExportPrivateKeyDialog = () => {
    exportPrivateKeyDialogShow.value = true
}

const closeMessageBoxDialog = () => {
    messageBoxDialogShow.value = false
}

const openMessageBoxDialog = () => {
    messageBoxDialogShow.value = true
}

const closeEnterInvitationCodeDialog = () => {
    enterInvitationCodeDialogShow.value = false
}

const openEnterInvitationCodeDialog = () => {
    enterInvitationCodeDialogShow.value = true
}


// 登录状态
import { useUserStoreHook } from '@/store/modules/lhs/user'
import { copy, img, openWin } from '@/utils/utils';
import { toUrl } from '@/utils/router'
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())
const userInfo = computed(() => useUserStore.info)

// 
type LoginDialogType = InstanceType<typeof LoginOrRegisterDialog>;
const LoginDialogRef = ref<null | LoginDialogType>(null);

const logout = () => {
    closeSubMenu()
    LoginDialogRef.value?.logout()
}

const login = () => {
    // if (!isLogin.value) {
    //     loginDialogShow.value = true
    // }
    //LoginWithPhantom();
    openV5LoginDialog()
}

const openChildMenuClick = (key, path) => {
    subMenuPopverRef.value?.hide()
    if (key == 'logout') {
        logout()
        return
    } else if (key == 'profile') {
        openProfileDialog()
        return
    } else if (key == 'invitation_code') {
        openInvitationCodeDialog()
        return
    } else if (key == 'my_invitation') {
        openMyInvitationListDialog()
        return
    } else if (key == 'task_list') {
        openMyTaskListDialog()
        return
    } else if (key == 'export_private_key') {
        openExportPrivateKeyDialog()
        return
    } else if (key == 'msg') {
        openMessageBoxDialog()
        return
    } else if (key == 'help_center') {
        openWin('https://lh-s.org/', '_self')
        return
    } else if (key == 'user_center') {
        //toUrl('/user')
        clickMenu('/user')
        return;
    }

    if (path) {
        router.push({ path: path })
    }
}

const resp = reactive({
    myLevel: {
        level: 1,
        img: '',
        name: ''
    }
})



const loginedRequest = () => {
    getMyParentInvateCode({}).then((res) => {
        if (res == '') {
            openEnterInvitationCodeDialog()
        }
    })
}

// 登录状态，则每次刷新都要执行
if (isLogin.value) {
    loginedRequest()
}

//  监听登录：由未登录变化为已登录
watch(isLogin, (value) => {
    if (value) {
        // 已经登录，执行代码
        console.log("登录成功");
        loginedRequest()
    } else {
        // 未登录，执行代码
        console.log("退出登录");
    }
});

defineExpose({
    logout,
    login,
})

</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.menu.row {
    flex-direction: row;
}

.menu.column {
    flex-direction: column;
    width: auto;

    .item {
        padding: 20px 0;

        .close {
            width: 100%;
            display: flex;
            cursor: pointer;

            justify-content: end;

            img {
                width: 30px;
                height: 30px;
            }
        }

    }


}

.menu {
    width: calc(100% - 350px);
    height: 100%;
    min-width: 100px;
    display: flex;
    justify-content: end;



    .close {
        display: none;
    }

    .item {
        height: calc(100% - 2px);
        font-family: AlibabaPuHuiTi_2_75_SemiBold;
        font-weight: 400;
        font-size: 18px;
        color: #8B8F9F;
        display: flex;
        align-items: center;
        margin-left: 20px;
        cursor: pointer;
        text-transform: uppercase;

        .msgBox {
            display: flex;
            align-items: center;

            .msg {
                width: 25px;
                height: 25px;
                border-radius: 40px;
                margin-right: 5px;
                background-color: #000;
                padding: 10px;

                img {
                    width: 100%;
                }
            }
        }

    }

    .item.active {
        border-bottom: 2px solid #000;
        color: #000;
        font-weight: 500;
    }

    .item.sub {
        padding-left: 40px;

        img {
            margin-right: 20px;
            width: 24px;
            height: 24px;
        }
    }


    .ellipsis {
        width: 80px;
        height: 100%;
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
            height: 22px;
            background-color: #000;
            padding: 10px;
            border-radius: 42px;
        }
    }
}

.loginBtn {
    width: 162px;
    height: 37px;
    background-image: linear-gradient(148deg, #717171, #B5B5B5);
    border-radius: 43px;
    overflow: hidden;
    padding: 3px;

    .cnt {
        width: 100%;
        height: 100%;
        background-color: #000;
        border-radius: 43px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: AlibabaPuHuiTi_2_75_SemiBold;
        font-weight: 400;
        font-size: 18px;
        color: #8B8F9F;
        text-transform: capitalize;
    }
}

.loginBtn:hover {
    .cnt {
        color: #fff;
    }
}

.userBox {
    //align-items: center;
    min-width: 150px;

    .user {
        height: 43px;
        padding: 0 30px 0 0;
        border-radius: 45px;
        background-color: #000;
        border: 1px solid #8B8F9F;
        display: flex;
        align-items: center;

        .avatar {
            height: 45px;
            width: 45px;
            border-radius: 45px;
            overflow: hidden;

            img {
                width: 100%;
            }
        }

        .right {
            display: flex;
            align-items: center;

            .name {
                font-family: AlibabaPuHuiTi_2_75_SemiBold;
                margin-left: 10px;
                font-weight: 400;
                font-size: 16px;
                color: #8B8F9F;
            }

            .level {
                margin-left: 10px;
                width: 28px;

                img {
                    width: 100%;
                }
            }

            .jb {
                display: flex;
                align-items: center;
                margin-left: 10px;

                img {
                    width: 20px;
                    height: 20px;
                }
            }
        }


    }
}

.userBox:hover {
    .user {
        .name {
            color: #fff;
        }
    }
}

.rowPoperItem {

    .item {
        display: flex;
        padding: 15px 0;
        cursor: pointer;

        img {
            filter: drop-shadow(100000px 0 0 #8B8F9F);
            transform: translate(-100000px);
            width: 24px;
            height: 24px;
        }

        .title {
            margin-left: 10px;
            font-family: AlibabaPuHuiTi_2_75_SemiBold;
            font-weight: 400;
            font-size: 18px;
            color: #8B8F9F;
        }
    }
}

@media screen and (max-width: 800px) {
    .menu.row {
        .item {
            display: none;
        }

        .ellipsis {
            display: flex;
        }
    }
}
</style>