<template>
  <div id='app' class='container'>
    <div class='page-header'>
      <h1>Vue.js 2 & Firebase <small></small></h1>
    </div>
    <div class='panel panel-default'>
      <div class='panel-heading'>
        <h3 class='panel-title'>Add New Sewadals</h3>
      </div>
      <div class='panel-body'>
         <form id='form' class='form-inline' v-on:submit.prevent='addSewadal'>
          <div class='form-group'>
            <label for='sewadalPNO'>Personal No:</label>
            <input type='text' id='sewadalPNO' class='form-control' v-model='newSewadal.personalNumber'>
          </div>
          <div class='form-group'>
            <label for='sewadalFNAME'>First Name:</label>
            <input type='text' id='sewadalFNAME' class='form-control' v-model='newSewadal.firstName'>
          </div>
          <div class='form-group'>
            <label for='sewadalMNAME'>Middle Name:</label>
            <input type='text' id='sewadalMNAME' class='form-control' v-model='newSewadal.middleName'>
          </div>
          <div class='form-group'>
            <label for='sewadalLNAME'>Last Name:</label>
            <input type='text' id='sewadalLNAME' class='form-control' v-model='newSewadal.lastName'>
          </div>
          <input type='submit' class='btn btn-primary' value='Add Sewadal'>
        </form>
      </div>
    </div>
    <div class='panel panel-default'>
      <div class='panel-heading'>
        <h3 class='panel-title'>Sewadal List</h3>
      </div>
      <div class='panel-body'>
        <table class='table table-striped'>
          <thead>
            <tr>
              <th>Personal Number</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='sewadal in sewadals' :key=sewadal.personalNumber>
              <td><a >{{sewadal.personalNumber}}</a></td>
              <td>{{sewadal.firstName}} {{sewadal.middleName}} {{sewadal.lastName}}</td>
              <td><span class='glyphicon glyphicon-trash' aria-hidden='true' v-on:click='removeSewadal(sewadal)'></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase';
import toastr from 'toastr';
const config = {
  apiKey: 'AIzaSyBC9lFx5SMaI5eMJjVRGevCDADLv3ZT6C8',
  authDomain: 'dso2019.firebaseapp.com',
  databaseURL: 'https://dso2019.firebaseio.com',
  projectId: 'dso2019',
  storageBucket: 'dso2019.appspot.com',
  messagingSenderId: '109044230454',
};

const app = Firebase.initializeApp(config);
const db = app.database();
const sewadalsRef = db.ref('sewadals');
const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: 'Sewadals',
  firebase: {
    sewadals: sewadalsRef,
  },
  data() {
    return {
      newSewadal: {
        personalNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dob: '',
        type: '',
        emailID: '',
        contactNumber: '',
      },
    };
  },
  // computed property for form validation state
  computed: {
    validation() {
      return {
        firstName: !!this.newSewadal.firstName.trim(),
        emailID: emailRE.test(this.newSewadal.emailID)
      }
    },
    isValid() {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    addSewadal() {
      sewadalsRef.push(this.newSewadal);
      this.newSewadal.personalNumber = '';
      this.newSewadal.firstName = '';
      this.newSewadal.middleName = '';
      this.newSewadal.lastName = '';
      this.newSewadal.gender = '';
      this.newSewadal.dob = '';
      this.newSewadal.type = '';
      this.newSewadal.emailID = '';
      this.newSewadal.contactNumber = '';
    },
    removeSewadal(sewadal) {
      sewadalsRef.child(sewadal['.key']).remove();
      toastr.success('Sewadal removed successfully');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
/* Import Bootstrap Vue Styles */
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>