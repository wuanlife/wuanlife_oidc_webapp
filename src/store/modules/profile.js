
const profile = {
  state: {
    mail: '',
    sex: '',
    name: '',
    avatar_url: '',
    birthday: ''
  },
  mutations: {
    SET_PROFILE: (state, profile) => {
      state.mail = profile.mail
      state.sex = profile.sex
      state.name = profile.name
      state.avatar_url = profile.dafaultAvatarUrl
      state.birthday = profile.birthday
    }
  }
}

export default profile
