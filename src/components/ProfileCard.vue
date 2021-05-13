<template>
  <div class="card profile">
    <div>
      <div class="space-between">
        <div class="d-flex">
          <div class="profile__avatar">
            <img :src="imagePath(profile.id)" />
          </div>
          <div class="profile__info">
            <strong>{{profile.name}}</strong>
            <span>{{ profile.speciality | join }}</span>
          </div>
        </div>
        <div class="y-centering">
          <span role="button" class="y-centering likeBtn mr-1" @click="toggleLike(profile.id)">
            <span class=" mr-1">{{ profile.likes }}</span>
            <i :class="!profile.is_liked ? 'lar' : 'las text-danger'" class="la-heart icon"></i>
          </span>
          <span role="button" class="mr-1" @click="CommentActiveItem = profile.id">
            <i class="lar la-comment-dots icon"></i>
          </span>
          <a :href="mailTo(profile.email)" class="mr-1" @click="toggleLike()">
            <i class="las la-envelope icon"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="comment input-control" v-if="CommentActiveItem == profile.id">
      <input type="text" placeholder="write something ...">
      <button><i class="las la-paper-plane"></i></button>
    </div>
  </div>
</template>

<script>
// import DoctorIcon from "./DoctorIcon";

export default {
  name: 'ProfileCard',

  components: {
    // DoctorIcon
  },
  data () {
    return {
      CommentActiveItem: '',
      is_liked: false
    }
  },
  computed: {
    likeIcon (is_liked) {
      return is_liked ? 'lar' : 'las text-danger'
      console.log(is_liked)
    }
  },
  filters: {
    join (value) {
      if (!value) return ''
      return value.join(', ')
    }
  },
  methods: {
    imagePath (id) {
      return require('@/assets/img/avatars/' + id + '.jpg')
    },
    mailTo(address) {
      return `mailto:${address}`
    },
    toggleLike(profileId) {
      this.$emit('toggle-like', profileId)
    }
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.profile {
  /* display: flex; */
  /* align-items: center; */
}
.profile__avatar {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  border: 1px solid #ccc;
  padding: .25rem;
}
.profile__avatar  > img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.profile__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  /* flex-grow: 1; */
}
.profile__info > strong {
  font-weight: 900;
  font-size: 1.1rem;
}
.profile__info > span {
  font-weight: 500;
  color: #555;
  font-size: .9rem;
}
.comment {
  margin-top: 1rem;
  position: relative;
}
.comment > button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: .4rem;
  padding: .75rem 1rem;
  border: 0;
  border-radius: .8rem;
  background-color: #23049d;
  color: #fff;
}
.comment > input {
  padding-right: 3.2rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 1rem;
  padding: 1rem;
}
.comment input:focus {
  border: 1px solid #23049d;
  color: #23049d;
}
.comment input:focus + i {
  color: red;
}

.likeBtn {
  background-color: #edffec;
  padding: .1rem .5rem;
  border-radius: 1rem;
}
.likeBtn > span {
  font-size: .9rem;
  margin-right: .2rem;
}
</style>
