<template>
    <div>
        <Dialog :show="show" :title="title" @close="closeDialogClick" :close-on-click-modal="closeOnClickModal"
            :show-close="showClose && submitLoading == false" :close-on-press-escape="false">
            <template #content>
                <div>

                    <h1>Recharge</h1>

                    <el-form :rules="rules" ref="ruleFormRef" :model="formData" label-width="120px"
                        label-position="top">
                        <el-form-item label="Recharge Amount" prop="amount">
                            <el-input v-model="formData.amount" placeholder="Please enter recharge amount">
                                <template #prepend>
                                    <!-- <el-select v-model="formData.coin_type" style="width: 100px">
                                        <el-option v-for="item in coinTypeList" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select> -->
                                    USD
                                </template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="Payment Channel" prop="pay_channel">
                            <el-radio-group v-model="formData.pay_channel" @change="payChannelChange">
                                <el-radio label="stripe" border>Credit Card</el-radio>
                                <el-radio label="solana" border>Solana Wallet</el-radio>
                                <el-radio label="bsc" border>Bsc Wallet</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <template v-if="formData.pay_channel == 'solana' || formData.pay_channel == 'bsc'">
                            <div class="walletBox">
                                <div class="qrcode">
                                    <qrcode-vue :value="resp.rechargeInfo[formData.pay_channel]" :size="200" level="h"
                                        :render-as="RenderAs" />
                                </div>
                            </div>
                            <div class="walletBox">
                                <el-input placeholder="wallet address" :value="resp.rechargeInfo[formData.pay_channel]">
                                    <template #append>
                                        <el-button
                                            @click="copy(resp.rechargeInfo[formData.pay_channel])">Copy</el-button>
                                    </template>
                                </el-input>
                            </div>

                            <!-- <div class="walletBox">
                                <el-form-item>
                                    <el-button type="btn1" @click="submitForm(ruleFormRef)" :loading="submitLoading">
                                        Recharge Online
                                    </el-button>
                                </el-form-item>
                            </div> -->
                        </template>
                        <template v-else>
                            <div style="margin-top: 30px;"></div>
                            <el-form-item>
                                <el-button type="btn1" @click="submitForm(ruleFormRef)" :loading="submitLoading">
                                    Recharge
                                </el-button>
                            </el-form-item>
                        </template>

                        <div class="tips">
                            <p>The minimum recharge amount is 10 USDT</p>
                            <p>Recharge amount must be greater than or equal to the order amount</p>
                            <p>Recharge takes 3-5 minutes to arrive</p>
                        </div>

                    </el-form>

                </div>
            </template>
        </Dialog>
    </div>
</template>
<script lang="ts" setup>
// 二维码
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs } from 'qrcode.vue'

// 组件相关代码
import Dialog from '@/layout/v5/components/Dialog.vue'
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
})

import { getAssets, getStripePayUrl, getRechargeInfoApi,registerRecharge } from '@/api/lhs/user'
import { formatMoney, img, showNotification, copy } from '@/utils/utils';
const resp = reactive({
    assets: {},
    rechargeInfo: {}
})
watch(
    () => prop.show,
    (newVal, oldVal) => {
        console.log(oldVal);
        if (newVal == true) {
            getAssetsData()
        }
    }
)


const getAssetsData = () => {
    getAssets({}).then((res) => {
        resp.assets = res
    })
    getRechargeInfoApi({}).then((res) => {
        resp.rechargeInfo = res
    })
}

// form
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()

const formData = reactive({
    amount: '',
    pay_channel: ''
})

interface RuleForm {
    pay_channel: string,
    amount: Number,
}
const rules = reactive<FormRules<RuleForm>>({
    pay_channel: [
        { required: true, message: 'Please select payment channel', trigger: 'blur' },
    ],
    amount: [
        { required: true, message: 'Please input recharge amount', trigger: 'blur' },
        { type: 'number', min: 10, message: 'Please input recharge amount and gt 10', trigger: 'blur', transform: (value) => Number(value) },
    ]
})

const submitLoading = ref(false)
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    submitLoading.value = true
    await formEl.validate((valid, fields) => {
        if (valid) {
            getStripePayUrl(formData).then((res) => {
                window.location.href = res.url
            }).catch((err) => {
                submitLoading.value = false
            })
            console.log('submit!', formData)
        } else {
            console.log('error submit!', fields)
            submitLoading.value = false
        }
    })
}

const useAll = () => {
    formData.amount = resp.assets[prop.coinType]
}





const emit = defineEmits(['closeDialog'])
const closeDialogClick = (res) => {
    ruleFormRef.value.resetFields()
    emit('closeDialog', res)
}

const payChannelChange = (val) => {
    registerRecharge({chain:val})
}

</script>
<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.el-button--btn1 {
    background-image: none;
    background-color: #7140EB;
    color: #fff;
}

.tips {
    margin-top: 30px;
    color: #606266;
}

.walletBox {
    display: flex;
    justify-content: center;
    margin: 30px;
    flex-direction: column;
    align-items: center;

    .qrcode {
        padding: 10px;
        background-color: #fff;
        width: fit-content;

    }
}
</style>