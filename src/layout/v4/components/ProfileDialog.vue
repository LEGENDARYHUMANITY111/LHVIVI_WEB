<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick">
        <template #content>
            <el-form :rules="rules" ref="ruleFormRef" :model="profileForm" label-width="120px" label-position="top">
                <el-form-item label="Nickname" prop="nickname">
                    <el-input v-model="profileForm.nickname" placeholder="Please enter a new nickname" />
                </el-form-item>
                <el-form-item label="Avatar" class="mt-[30px]">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <el-avatar :size="50" :src="img(profileForm.headimg)" v-if="profileForm.headimg.length > 10" />
                        <el-avatar :size="50" v-else />
                        <el-upload class="avatar-uploader" :show-file-list="false" v-bind="upload">
                            <template #default>
                                <el-button width="100%" height="35px" text="">
                                    <template #default>
                                        <div class="btn" style="width: 80px; height: 30px;font-size: 14px;">
                                            <div class="cnt">UPLOAD</div>
                                        </div>
                                    </template>
                                </el-button>
                            </template>
                        </el-upload>

                    </div>
                </el-form-item>
                <!-- <el-form-item label="nickname">
               <el-input v-model="form.name" :rows="4" type="textarea" placeholder="Please input" />
            </el-form-item> -->
                <div style="margin-top: 30px;"></div>
                <el-form-item>
                    <el-button width="100%" height="35px" text="" @click="submitForm(ruleFormRef)">
                        <template #default>
                            <div class="btnBox">
                                <div class="btn">
                                    <div class="cnt">Save Change</div>
                                </div>
                            </div>
                        </template>
                    </el-button>
                </el-form-item>
            </el-form>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
// 组件相关代码
import Dialog from '@/layout/v4/components/Dialog.vue'
const prop = defineProps({
    title: {
        type: String,
        default: 'LOGIN'
    },
    show: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['closeDialog'])
const closeDialogClick = (res) => {
    emit('closeDialog', res)
}

import { useUserStoreHook } from '@/store/modules/lhs/user'
const useUserStore = useUserStoreHook();

// profile start
import { modifyMember } from '@/api/lhs/user';
import { img, showNotification } from '@/utils/utils';
import type { FormInstance, FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue';
const dialogProfileVisible = ref(false)
const ruleFormRef = ref<FormInstance>()

const profileForm = reactive({
    nickname: '',
    headimg: ''
})

interface RuleForm {
    nickname: string
}
const rules = reactive<FormRules<RuleForm>>({
    nickname: [
        // { required: true, message: 'Please enter the correct nickname', trigger: 'blur' },
        { min: 6, max: 20, message: 'Length should be 6 to 20', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            modifyMember(profileForm).then(() => {
                dialogProfileVisible.value = !dialogProfileVisible.value
                showNotification('Profile updated success', 'success')
                useUserStore.getMemberInfo()
            })
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}


const upload = computed(() => {
    const headers: Record<string, any> = {}
    headers.token = localStorage.getItem('lhs-api-token')
    return {
        action: `${import.meta.env.VITE_IMG_DOMAIN}` + '/api/file/image',
        limit: 1,
        headers,
        onSuccess: (response: any, uploadFile: any) => {
            let img = uploadFile?.response?.data?.url;
            if (response.code == 1) {
                profileForm.headimg = img
            } else {
                uploadFile.status = 'fail'
                showNotification(response.msg, 'error')
            }
        }
    }
})
// profile end

</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.el-button.is-text:not(.is-disabled):focus,
.el-button.is-text:not(.is-disabled):hover {
    background-color: transparent;
}

.btnBox {
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
}
</style>