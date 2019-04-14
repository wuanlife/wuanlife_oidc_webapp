
const profile = {
  state: {
    mail: '',
    sex: '',
    name: '',
    avatar_url: '',
    birthday: '',
    // 签到
    total_fruit: '',
    single_fruit: '',
    is_sign: '',
    max: '',
    min: ''
  },
  mutations: {
    SET_PROFILE: (state, profile) => {
      state.mail = profile.mail
      state.sex = profile.sex
      state.name = profile.name
      state.avatar_url = profile.dafaultAvatarUrl
      state.birthday = profile.birthday
      // 签到
      state.total_fruit = profile.totalFruit
      state.single_fruit = profile.singleFruit
      state.is_sign = profile.isSign
      state.max = profile.max
      state.min = profile.min
    }
  }
}

export default profile
