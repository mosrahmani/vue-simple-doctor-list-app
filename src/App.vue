<template>
    <div id="app" class="x-centering">
        <div class="container">
            <h1 class="app-title">PROFILES LIST</h1>
            <div class="options">
                <div class="options__search">
                    <img src="@/assets/img/loading.svg" v-show="isSearching" class="options__search--sub" alt="loading ...">
                    <input
                        type="text"
                        placeholder="search ..."
                        v-model="searchQuery"
                    />
                    <i class="las la-search options__search--sub" v-show="!isSearching"></i>
                </div>
                <button class="btn btn-white ml-2" @click="toggleSort">
                    <i :class="sortIcon" class="las"></i>
                </button>
                <button class="btn btn-primary ml-2" @click="showAddModal()">
                    <i class="las la-plus mr-1"></i>
                    Add Profile
                </button>
            </div>
            <div v-if="profiles.length !== 0">
                <ProfileCard
                    v-for="(profile, index) in profiles"
                    :key="index"
                    :profile="profile"
                    @toggle-like="toggleLike"
                    class="profile"
                />
            </div>
            <div class="not-found" v-else>
                <i class="las la-heart-broken"></i>
                Sorry! Can’t find what you’re looking for.
            </div>

        </div>
        <Modal classes="modal" height="auto" width="500px" name="addProfile">
            <form @submit.prevent="addProfile()">
                <div class="modal__header">
                    <h3>New Profile</h3>
                    <span role="button" @click="$modal.hide('addProfile')"><i class="las la-times"></i></span>
                </div>
                <div class="modal__content">
                    <div class="form-control" :class="{ 'form-error': $v.newProfile.name.$error }">
                        <label for="name">Name:</label>
                        <input id="name" type="text" v-model="newProfile.name" @blur="$v.newProfile.name.$touch()" placeholder="Enter Doctor name">
                        <div v-if="$v.newProfile.name.$error" class="mt-1">
                            <div v-if="!$v.newProfile.name.alpha">just english</div>
                        </div>
                    </div>
                    <div>
                        <label for="speciality">specialities</label>
                        <multiselect id="speciality" v-model="newProfile.speciality" :options="options" select-label="Pick this" deselectLabel="Remove this" :max="3" :max-height="140" :multiple="true" :searchable="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some speciality">
                        </multiselect>
                    </div>
                    <div class="form-control" :class="{ 'form-error': $v.newProfile.email.$error }">
                        <label for="email">Email:</label>
                        <input id="email" type="email" v-model="newProfile.email" @blur="$v.newProfile.email.$touch()" placeholder="Enter doctor email">
                        <div v-if="$v.newProfile.email.$error" class="mt-1">
                            <div v-if="!$v.newProfile.email.email">not valid</div>
                        </div>
                    </div>
                </div>
                <div class="modal__footer">
                    <button type="submit" class="btn btn-primary">Add New Profile</button>
                    <span role="button" class="btn btn-light ml-2" @click="$modal.hide('addProfile')">Cancel</span>
                </div>
            </form>
        </Modal>
    </div>
</template>

<script>
import ProfileCard from './components/ProfileCard'
import json from '../json/data.json'
import { required, email, alpha } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'

export default {
  name: 'App',

  data () {
    return {
      profiles: json.profiles,
      searchQuery: '',
      isSearching: false,
      debounce: null,
      sortType: 'asc',
      options: ['Surgeon', 'Radiologist', 'Cardiologist', 'Psychiatrist', 'Dermatologist'],
    //   options: [
    //     { name: 'Vue.js', language: 'JavaScript' },
    //     { name: 'Adonis', language: 'JavaScript' },
    //     { name: 'Rails', language: 'Ruby' },
    //   ],
      newProfile: {
        email: '',
        speciality: []
      }
    }
  },

  components: {
    ProfileCard,
    Multiselect
  },
  computed: {
    sortIcon () {
      return this.sortType === 'asc' ? 'la-sort-up' : 'la-sort-down'
    }
  },
  methods: {
    showAddModal () {
      this.$modal.show('addProfile')
    },
    sortAsc () {
      this.profiles.sort((a, b) => a.likes - b.likes)
    },
    sortDesc () {
      this.profiles.sort((a, b) => b.likes - a.likes)
    },
    toggleSort () {
      if (this.sortType === 'asc') {
        this.sortDesc()
        this.sortType = 'desc'
      } else {
        this.sortAsc()
        this.sortType = 'asc'
      }
    },
    search (name) {
      this.profiles = json.profiles.filter(item =>
        item.name.toLowerCase().includes(name.toLowerCase())
      )
    },
    addProfile() {
        this.$v.$touch()
        if (!this.$v.newProfile.$invalid) {
            let id = this.profiles.length + 1
            this.profiles.push({
                id: id,
                name: this.newProfile.name,
                speciality: this.newProfile.speciality,
                email: this.newProfile.email,
                description: this.newProfile.description,
                likes: 0,
                is_liked: false
            })
            this.$modal.hide('addProfile')
        }

    },
    toggleLike (profileId) {
        let index = this.profiles.findIndex(obj => obj.id === profileId)
        let is_liked = this.profiles[index].is_liked
      if (is_liked) {
          this.profiles[index].likes--
        this.profiles[index].is_liked = false
      } else {
          this.profiles[index].likes++
          this.profiles[index].is_liked = true
      }
    }
  },
  watch: {
    searchQuery: function (newVal) {
      this.isSearching = true
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.search(newVal)
        this.isSearching = false
      }, 1200)
    }
  },
  validations: {
    newProfile: {
      name: {
        required,
        alpha
      },
      email: {
        required,
        email
      }
    }
  }
}
</script>

<style>
#app {
    height: 100%;
}
.centering {
    display: flex;
    align-items: center;
    justify-content: center;
}
.app-title {
    width: 100%;
    text-align: left;
    font-size: 1.6rem;
    margin-bottom: 2rem;
}
.options {
    display: flex;
    margin-bottom: 1.4rem;
}
.options__search {
    flex-grow: 1;
    position: relative;
}
.options__search > input {
    width: 100%;
    padding: 1.3rem;
    border: 0;
    background-color: #fff;
    border-radius: 0.8rem;
}

.options__search--sub {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.2rem;
    font-size: 1.4rem;
}
.btn {
    border-radius: 0.8rem;
    padding: 1.3rem;
}
.btn-primary {
    background-color: #23049d;
    color: #fff;
}
.btn-white {
    background-color: #fff;
}
.btn-light {
    background-color: #f4f9f9;
}
.content {
    display: flex;
}

@media screen and (min-width: 600px) {
    .section {
        width: 50vw;
        max-width: 20em;
    }
}

.input {
    flex: 1;
    padding: 1em;
    border: 0;
    color: #8f8f8f;
    font-size: 1rem;
}

.buttons {
    display: flex;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
    margin-top: 30px;
}

.icons-note {
    margin-top: 30px;
    font-size: 10px;
}
.modal {
    border-radius: 1rem !important;
    box-shadow: none !important;
    padding: 2rem;
}
.modal__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.4rem;
}
.modal__header > h3 {
    font-size: 1.2rem;
    font-weight: bold;
}
.modal__footer {
    margin-top: 1.4rem;
}
.not-found {
    /* text-align: center; */
    color: red;
    font-size: 1.2rem;
}
.not-found > i {
    font-size: 1.2rem;
}
</style>
