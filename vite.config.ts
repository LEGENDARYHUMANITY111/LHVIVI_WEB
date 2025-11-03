import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath } from 'url';
import { getPluginsList } from './build/plugins';

import { resolve } from 'path'
import postcssPxToViewport from 'postcss-px-to-viewport'


export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
   const root = process.cwd();
   const env = loadEnv(mode, root);
   return {
      root,
      base: './',
      publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 打包路径
      assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 需要处理的静态资源位置
      plugins: getPluginsList(mode),
      server: {
         https: false,
         host: true,
         port: 3000,
         open: false,
         cors: true,
         proxy: {
            [env.VITE_APP_API_BASEURL]: {
               target: 'http://nft.cn',
               changeOrigin: true,
            },
            [env.VITE_APP_MOCK_BASEURL]: {
               target: 'http://localhost:3000',
               changeOrigin: true,
            },
         },
      },
      // 打包配置
      build: {
         outDir: '../niucloud/public',
         sourcemap: false,
         chunkSizeWarningLimit: 4000,
         rollupOptions: {
            input: {
               index: fileURLToPath(new URL('./index.html', import.meta.url)),
            },
            // 静态资源分类打包
            output: {
               format: 'esm',
               chunkFileNames: 'static/js/[name]-[hash].js',
               entryFileNames: 'static/js/[name]-[hash].js',
               assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            },
            external: [
               'react',
               'react-dom',
               'react/jsx-runtime'
            ]
         },
         commonjsOptions: {
            transformMixedEsModules: true,
         },
      },
      // 添加 optimizeDeps 配置
      optimizeDeps: {
         exclude: ['@fractalwagmi/popup-connection', 'react-modal']
      },
      // 配置别名
      resolve: {
         alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '#': fileURLToPath(new URL('./types', import.meta.url)),
            web3: resolve(__dirname, './node_modules/web3/dist/web3.min.js'),
         },
      },
      // 配置自适应
      css: {
         postcss: {
            plugins: [
               // postcssPxToViewport({
               //    unitToConvert: 'px', // 要转化的单位
               //    viewportWidth: 1920, // UI设计稿的宽度
               //    unitPrecision: 2, // 转换后的精度，即小数点位数
               //    propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
               //    viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
               //    fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
               //    selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
               //    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
               //    mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
               //    replace: true, // 是否转换后直接更换属性值
               //    // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
               //    exclude: [],
               //    landscape: false // 是否处理横屏情况
               // })
            ]
         }
      },
   };
});
