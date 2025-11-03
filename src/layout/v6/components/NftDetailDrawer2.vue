<template>
    <div>
        <el-drawer :model-value="show" size="70%" title="" custom-class="nftDrawer" :direction="direction"
            :before-close="closeDrawerClick">
            <template #header>
                <template v-if="Object.keys(resp.nftDetail).length > 0">
                    <div>
                        <div class="nftImage">
                            <img :src="resp.nftDetail.ipfs_image" v-if="resp.nftDetail.ipfs_image" />
                            <img src="@/assets/v5/image/tmp1.jpg" v-else />
                        </div>
                    </div>
                </template>
            </template>
            <div>
                <div class="nftContent">
                    <template v-if="Object.keys(resp.nftDetail).length > 0">
                        <div class="nftDetail">
                            <div class="nftTitle">
                                {{ resp.nftDetail.name }}
                            </div>

                            <div class="detailTable">
                                <div class="item">
                                        <div class="itemTile">
                                            <span class="color1">●</span> Shipping Fee
                                        </div>
                                        <div>
                                            <div class="discountVal">
                                                {{ formData.area == 1 ? resp.nftDetail.shiping_free_jp : resp.nftDetail.shiping_free_other }} VIVI
                                            </div>
                                            <!-- <div class="discount">
                                               VIVI
                                            </div> -->
                                        </div>
                                    </div>
                                    <div style="margin-top: 30px;">
                                       <el-form ref="formRef" label-position="top" label-width="80px" :model="formData" :rules="rules">
                                            <el-form-item label="Recipient Name" prop="name">
                                                <el-input v-model="formData.name" :placeholder="'Please enter the recipient\'s name'" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="Contact Number" prop="phone">
                                                <el-input v-model="formData.phone" :placeholder="'Please enter the recipient\'s phone number'" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="Area" prop="area">
                                                <el-radio v-model="formData.area" label="1">Japan</el-radio>
                                                <el-radio v-model="formData.area" label="0">Overseas</el-radio>
                                            </el-form-item>
                                            <el-form-item label="Shipping Address" prop="address">
                                                <el-input type="textarea" v-model="formData.address" :placeholder="'Please enter the recipient\'s shipping address'" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="Email for Notifications" prop="email">
                                                <el-input v-model="formData.email" :placeholder="'Please enter the recipient\'s email'" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                            </div>

                            <div class="mintBtnBox">

                                <template v-if="resp.nftDetail.burn_id == 0">
                                        <el-button type="btn1" @click="submitForm">
                                            <div class="title">Pay & Redeem</div>
                                        </el-button>
                                    </template>
                                    <template v-else>
                                        <el-button type="btn1" disabled>
                                            <div class="title">Redeemed</div>
                                        </el-button>
                                    </template>

                            </div>

                            <div class="nftMsg">
                                Don’t miss our Signature Collections developed in collaboration with world-renowned
                                artists
                                and fashion icons. These unique digital assets seamlessly blend high art with high
                                fashion,
                                creating an unpre
                            </div>

                        </div>
                    </template>
                </div>

            </div>

        </el-drawer>

        <MintArtNftDialog ref="mintDialogRef" :close-on-click-modal="false" :show-close="false"
            :close-on-press-escape="false" @mint-result="mintResult" />
    </div>
</template>
<script lang="ts" setup>

const mintDialogRef = ref(null);
import MintArtNftDialog from '@/layout/v6/components/MintArtNftDialog.vue'
import type { DrawerProps } from 'element-plus'
const direction = ref<DrawerProps['direction']>('btt')
// 组件相关代码
import { computed, reactive, ref, watch } from 'vue';
const prop = defineProps({
    title: {
        type: String,
        default: ''
    },
    show: {
        type: Boolean,
        default: false
    },
    closeOnClickModal: {
        type: Boolean,
        default: false
    },
    showClose: {
        type: Boolean,
        default: true
    },
    nftId: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['closeDrawer'])
const closeDrawerClick = (res) => {
    emit('closeDrawer', res)
}
import { useUserStoreHook } from '@/store/modules/lhs/user';
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())

import { getNftDetail, redeemNft } from '@/api/lht/nft'
const resp = reactive({
    nftDetail: {}
})
watch(
    () => prop.show,
    (newVal, oldVal) => {
        console.log(oldVal);
        if (newVal == true) {
            getNftDetailData()
        }
    }
)

const getNftDetailData = () => {
    getNftDetail({id:prop.nftId}).then((res) => {
        resp.nftDetail = res || {}
    })
}

const formData = reactive({
    name: '',
    phone:'',
    address: '',
    email: '',
    tx: '',
    area: '0',
})

const rules = {
    name: [
    { required: true, message: 'Please enter the recipient\'s name', trigger: 'blur' },
    { min: 2, max: 10, message: 'Please enter the recipient\'s name', trigger: 'blur' }
    ],
    phone: [
    { required: true, message: 'Please enter the recipient\'s phone number', trigger: 'change' },
    { pattern: /^\d{11}$/, message: 'Please enter the recipient\'s phone number', trigger: 'change' }
    ],
    address: [
    { required: true, message: 'Please enter the recipient\'s address', trigger: 'change' },
    { min: 10, max: 60, message: 'Please enter the recipient\'s address', trigger: 'change' }
    ],
    email: [
    { required: true, message: 'Please enter the recipient\'s email', trigger: 'change' },
    { type: 'email', message: 'Please enter the recipient\'s email', trigger: 'change' }
    ],
    area: [
    { required: true, message: 'Please enter the recipient\'s area', trigger: 'change' }
    ],
}

const formRef = ref()
const submitForm = async () => {
    if (!formRef.value) return
    
    try {
        // Validate form fields
        const valid = await formRef.value.validate()
        if (!valid) {
            ElMessage.warning('Please fill in all required fields correctly')
            return
        }

        if (!formData.tx) {
            let payAmount = formData.area == 1 ? resp.nftDetail.shiping_free_jp : resp.nftDetail.shiping_free_other
            mintDialogRef?.value?.burnNftWithUsdtPayment(resp.nftDetail.nft_address,payAmount);
            //mintDialogRef?.value?.burnNftWithUsdtPayment('FS4imHNozYvnv5g3qFTmczV1RjB5ykR2NGukGugJkaYs',15);
            return
        }

    } catch (error) {
        console.error('Form submission error:', error)
        ElMessage.error('Failed to submit form. Please try again.')
    }
}


const mintResult = (data) => {
    console.log("mintResult", data)
    //showArtNftDetail(resp.currentInfo.id);
    if (data.status == 1 && data.data?.tx) {
        formData.tx = data.data.tx


        // Prepare form data
        const formDataToSubmit = {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            address: formData.address.trim(),
            email: formData.email.trim(),
            nft_id: resp.nftDetail.id,
            tx: formData.tx
        }

        redeemNft(formDataToSubmit).then((res) => {
            ElMessage.success('Redeem request submitted successfully!')
            getNftDetailData()
        })
        
        // Close the dialog
        closeDialogClick(true)

        // Reset form
        formRef.value.resetFields()

    } else {
        ElMessage.error(data.message || 'Failed to redeem NFT. Please try again.')
    }
}
</script>

<style lang="scss">
.nftDrawer {
    overflow: visible !important;

    .nftImage {
        width: 120px;
        height: 160px;
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
        top: -90px;
        z-index: 9999;

        img {
            width: 100%;
        }
    }

    .el-drawer__close-btn {
        justify-content: end
    }
}
</style>

<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.nftDrawer {
    .nftContent {
        display: flex;
        flex-direction: column;



        .nftDetail {
            width: 100%;

            .nftTitle {
                font-family: Adobe Gothic Std;
                font-size: 36px;
                font-weight: 700;
                text-align: left;
            }

            .progressBox {
                margin: 20px 0 30px 0;

                .progressInfo {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;

                    font-family: Poppins;
                    font-size: 20px;
                    font-weight: 600;
                    text-align: left;

                    .normal {
                        color: #A3A3A3;

                    }

                }
            }

            .detailTable {
                width: calc(100% - 20px);
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 4px 4px rgb(0, 0, 0, 0.1);
                padding: 10px;

                .item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 1px 0 0 rgb(0, 0, 0, 0.04);
                    padding: 10px 0;
                    min-height: 30px;

                    .itemTile {
                        font-family: IBM Plex Sans;
                        font-size: 16px;
                        font-weight: 500;

                        .color1 {
                            color: #5269F8;
                        }

                        .color2 {
                            color: #9DC4FF;
                        }

                        .color3 {
                            color: #8403B6;
                        }

                        .color4 {
                            color: #B775F8;
                        }
                    }

                    .discountVal {
                        font-family: Poppins;
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 32px;
                    }

                    .discount {
                        font-family: Poppins;
                        font-size: 14px;
                        font-weight: 400;
                        text-align: right;
                        text-decoration: line-through;
                        color: #333333;
                        line-height: 32px;
                    }

                    .nftPayBox {
                        border-radius: 10px;
                        overflow: hidden;
                        display: flex;

                        .item {
                            font-family: IBM Plex Sans;
                            font-size: 16px;
                            font-weight: 500;
                            padding: 0 15px;
                            background-color: #F5F5F5;
                        }

                        .item.active {
                            background-color: #8557E4;
                            color: #fff;
                        }
                    }
                }
            }

            .mintBtnBox {
                margin: 50px auto;
                width: 80%;
            }

            .nftStatus {
                display: flex;

                .item {
                    min-width: 120px;

                    .key {
                        font-family: Poppins;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 29.88px;
                        text-align: left;
                        color: #706F6F;

                    }

                    .value {
                        font-family: Poppins;
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 29.88px;
                        text-align: left;

                    }
                }
            }

            .nftMsg {
                font-family: Poppins;
                font-size: 18px;
                font-weight: 400;
                line-height: 24px;
                text-align: center;
            }

        }
    }
}



.el-button--btn1,
.el-button--btn2 {
    width: 100%;
    border: none;
    background-image: linear-gradient(90deg, #2600FC, #FF00EA);
    height: 54px;
    border-radius: 42px;

    .title {
        color: #fff;
        font-family: Poppins;
        font-size: 22px;
        font-weight: 500;
        line-height: 36px;
        text-align: center;
    }
}

.el-button--btn2 {
    background-image: none;
    background-color: #AEAEB2;
}

.el-button--btn1.is-disabled,
.el-button--btn2.is-disabled {
    background-image: none;
    background-color: #AEAEB2;
}
</style>