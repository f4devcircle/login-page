<template>
  <b-container>
    <b-col md="8" offset-md="2" v-if="show">
      <b-form @submit="onSubmit">
        <span class="desc">Please authorize yourself by logging in with your JKT48 account credentials to start buying tickets from JKTbot.<br><br></span>
        <b-form-group id="exampleInputGroup1">
          <b-form-input id="exampleInput1"
            type="email"
            v-model="form.email"
            required
            placeholder="Your email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
          description="<br>We need you to log in to make us able to perform ticket buying from your own account. Your email and password won't be stored anywhere, so don't be worry!">
          <b-form-input id="exampleInput2"
            type="password"
            v-model="form.password"
            required
            placeholder="Your password">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="info" class="float-right">Authorize</b-button>
      </b-form>
    </b-col>
    <b-col md="8" offset-md="2" v-else-if="forbidden">
      <span class="desc">Forbidden</span>
    </b-col>
    <b-col md="8" offset-md="2" v-else>
      <span class="desc">You have been logged in! Please close this page and buy your ticket from JKTbot.</span>
    </b-col>
    <b-col md="12" class="footer fixed-bottom">
      <span>&copy; 2019 JKTbot | <a href="https://github.com/f4devcircle" target="_blank">Github</a></span>
    </b-col>
  </b-container>
</template>

<script>
  import Axios from 'axios'

  const uri = window.location.search.substring(1)
  const params = new URLSearchParams(uri)

  export default {
    data () {
      return {
        form: {
          email: ''
        },
        show: true,
        forbidden: false
      }
    },

    methods: {
      verifyLogin: async function() {
        if (params.get('userId') !== null) {
          try {
            this.show = await Axios.get(process.env.API_ENDPOINT + 'verify/' + params.get('userId')).data
          } catch (error) {
            console.log(error)
          }
          this.show = false
        } else {
          this.show = false
          this.forbidden = true
        }
      },

      login: async function() {
        try {
          const response = await Axios.post(env.process.API_ENDPOINT + 'login/' + params.get('userId'), this.form)
          if (response.data.error !== undefined) {
            alert(response.data.message)
          } else {
            this.show = false;
          }
          console.log(response.data);
        } catch (error) {
          alert('Something went wrong, please try again later.')
        }
      },

      onSubmit: async function (evt) {
        evt.preventDefault()
        await this.login(this.form)
      }
    },

    created: async function() {
      await this.verifyLogin()
    }
  }
</script>

<style scoped>
  .desc {
    margin-bottom: 100px;
  }
  .footer {
    margin-bottom: 20px;
    text-align: center;
    color: gray;
    font-size: small
  }
</style>
