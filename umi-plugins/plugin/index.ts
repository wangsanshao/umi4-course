import { IApi } from "umi";

export default (api: IApi) => {
  api.onStart(() => {
    console.log("Plugin");
  });
  api.describe({
    key: 'changeFavicon',
    config: {
      schema(joi) {
        return joi.string()
      },
    },
    enableBy: api.EnableBy.config
  }),
  api.modifyConfig((memo) => {
    memo.favicons = api.userConfig.changeFavicon;
    return memo
  })
};
