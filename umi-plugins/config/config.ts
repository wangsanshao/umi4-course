import { defineConfig } from 'umi';

export default defineConfig({
  changeFavicon: 'https://img1.zhuanstatic.com/common/img/logo-64x64.png',
	plugins: [
    require.resolve('./config-plugin'), 
    require.resolve('../plugin/index'),
    require.resolve('../plugin/mdx-plugin')
  ],
  mfsu: false
});
