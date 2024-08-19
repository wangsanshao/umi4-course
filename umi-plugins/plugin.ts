import { IApi } from 'umi';

export default (api: IApi) => {
  api.describe({ key: 'dumi:routes_next' });
  api.modifyRoutes(memo => {
    Object.keys(memo).forEach(id => {
      const route = memo[id];
      const { file } = route
      if (file && /\.md$/.test(file)) {
        const content = route.__content
        console.log(content)
      }
    })
    
    return memo
  })
  api.registerCommand({
    name: 'hello',
    fn() {
        console.log('Hello Umi Developer')
      },
  });
	api.onStart(()=>{
		console.log('Local Plugin');
	});
};
