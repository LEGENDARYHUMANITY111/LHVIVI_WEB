<template>
    <div class="footer">
        <div class="cntBox">
            <div class="logo">
                <img src="@/assets/nft/image/图片2 3.svg" />
            </div>
            <div class="link">
                <div class="item" @click="toUrl('telegram')" v-if="configInfo.website_social_app_telegram">
                    <img src="@/assets/nft/image/Vector-3.png" />
                </div>
                <div class="item" @click="toUrl('discord')" v-if="configInfo.website_social_app_discord">
                    <img src="@/assets/nft/image/Vector-2.png" />
                </div>
                <div class="item" @click="toUrl('twitter')" v-if="configInfo.website_social_app_twitter">
                    <img src="@/assets/nft/image/Vector-1.png" />
                </div>
                <div class="item" @click="toUrl('opensea')" v-if="configInfo.website_social_app_opensea">
                    <img src="@/assets/nft/image/VectorOpenSea.png" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useSysConfig } from '@/store/modules/lhs/config'
import { isUrl } from '@/utils/utils';
const configInfo = useSysConfig().$state.config;
const toUrl = (key: string) => {
    let url;
    if (key == 'discord') {
        url = configInfo.website_social_app_discord
    } else if (key == 'telegram') {
        url = configInfo.website_social_app_telegram
    } else if (key == 'twitter') {
        url = configInfo.website_social_app_twitter
    } else if (key == 'opensea') {
        url = configInfo.website_social_app_opensea
    }

    if (url && isUrl(url)) {
        window.location.href = url
    }

}
</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.footer {
    //margin-top: 50px;
    background-color: #FFF;
    height: 107px;

    .cntBox {
        background-color: #0C1217;
        border-radius: 12px 12px 0 0;
        margin: 0 70px;
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        height: 100%;
        align-items: center;

        .logo {
            width: 237px;
            height: 48px;
            cursor: pointer;
        }

        .logo:hover {
            img {
                transform: scale(1.05);
                transition: transform 500ms;
            }
        }

        .link {
            display: flex;

            .item {
                width: 37px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                margin-left: 25px;

                img {
                    max-width: 100%;
                    max-height: 100%
                }
            }

            .item:hover {
                img {
                    transform: scale(1.2);
                    transition: transform 500ms;
                }
            }

            .item:first-child {
                margin-left: 0;
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .footer {
        height: auto;

        .cntBox {
            margin: 0;
            flex-direction: column;
            padding: 30px;

            .logo {
                margin-bottom: 20px;
            }
        }
    }
}
</style>