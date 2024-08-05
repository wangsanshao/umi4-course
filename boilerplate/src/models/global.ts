const GlobalModel: {
  state: {
    name: string;
  };
  effects: {
    changeName: (payload: any, effects: any) => void;
  };
} = {
  state: {
    name: 'learn umi',
  },
  effects: {
    *changeName({ payload }, { call, put }) {
      console.log(payload);
      // {name: "umi 入门教程"}
    },
  },
};

export default GlobalModel;
