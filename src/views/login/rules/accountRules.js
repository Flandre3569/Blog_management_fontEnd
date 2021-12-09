export const rules = {
  name: [
    {
      required: true,
      message: '用户名必须填写',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,12}$/,
      message: '用户名必须是5-12位的数字或字母',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必须填写',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,12}$/,
      message: '密码必须是5-12位的数字或字母',
      trigger: 'blur'
    }
  ]
};
