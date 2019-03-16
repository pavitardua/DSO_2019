<template>
  <div id='app' class='container'>
    <div class='page-header'>
      <h3 class='panel-title'>Sewadal List</h3> <router-link to="/Entry" class="text_medium theme_color font_weight300 theme_colorHover">Attendance</router-link>
    </div>
    <!-- <div class='panel panel-default'>
      <div class='panel-heading'>
        <h3 class='panel-title'>Add New Sewadals</h3>
      </div>
      <div class='panel-body'>
         <form id='form' class='form-inline' v-on:submit.prevent='addSewadal'>
          <div class='form-group'>
            <label for='sewadalPNO'>Personal No:</label>
            <input type='text' id='sewadalPNO' class='form-control' v-model='newSewadal.personal_no'>
          </div>
          <div class='form-group'>
            <label for='sewadalFNAME'>First Name:</label>
            <input type='text' id='sewadalFNAME' class='form-control' v-model='newSewadal.first_name'>
          </div>
          <div class='form-group'>
            <label for='sewadalMNAME'>Middle Name:</label>
            <input type='text' id='sewadalMNAME' class='form-control' v-model='newSewadal.middle_name'>
          </div>
          <div class='form-group'>
            <label for='sewadalLNAME'>Last Name:</label>
            <input type='text' id='sewadalLNAME' class='form-control' v-model='newSewadal.last_name'>
          </div>
          <input type='submit' class='btn btn-primary' value='Add Sewadal'>
        </form>
      </div>
    </div> -->
    <!-- <div class='panel panel-default'> -->

      <div >
        <b-table striped hover :items="sewadals" :fields="fields" />
          <!-- <thead>
            <tr>
              <th>Serial Number </th>
              <th>Personal Number </th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(sewadal, i) in sewadals' :key="`${i}-${sewadal.personal_no}`">
              <td>{{i}}</td>
              <td>{{sewadal.personal_no}}</td>
              <td>{{sewadal.first_name}} {{sewadal.middle_name}} {{sewadal.last_name}}</td>
              <td><span class='glyphicon glyphicon-trash' aria-hidden='true' v-on:click='removeSewadal(sewadal)'></span></td>
            </tr>
          </tbody> -->
      </div>
    <!-- </div> -->
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
      fields: {
          first_name: {
            label: 'First name',
            sortable: true
          },
          last_name: {
            label: 'Last name',
            sortable: true
          },
          personal_no: {
            label: 'Personal number',
            sortable: true
          }
      },
      newSewadal: {
        personal_no: '',
        first_name: '',
        middle_name: '',
        last_name: '',
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
        first_name: !!this.newSewadal.first_name.trim(),
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
      this.newSewadal.personal_no = '';
      this.newSewadal.first_name = '';
      this.newSewadal.middle_name = '';
      this.newSewadal.last_name = '';
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