<script>
import Vue from 'vue'
export default {
  name: 'Entry',
  data() {
    return {
      selectedMonth: 'Jan',
      dates: [],
      months: [],
      years: [2015,2016,2017,2018,2019],
      freeText: ''
    }
  },
  // computed property for form validation state
  computed: {
      getDates() {
        const date = Vue.moment().date(1);
        this.months = this.getMonthNames('en-US', 'MMM', 2012);
        return date.toString();
      }
  },
  methods: {
      getMonthNames(lang, frmt, year) {
        var userLang = Vue.moment.lang();            // Save user language
        // moment.lang(lang);                       // Switch to specified language
        var months = [];                         // Months array
        var m = Vue.moment(year);                  // Create a moment in 2011
        for (var i = 0; i < 12; i++)             // Loop from 0 to 12 (exclusive)
          months.push(m.months(i).format(frmt)); // Append the formatted month
        // moment.lang(userLang);                   // Restore user language
        return months;                           // Return the array of months
      },
  },
  render: function(h){
      return (
        <b-card >
        <b-form-select options={this.years} v-model={this.selectedYear} checked={this.selectedYear}/>
        <b-form-select options={this.months} v-model={this.selectedMonth} />
        <b-form-input  type="text" value={this.getDates} v-model={this.freeText} style="width:30rem"></b-form-input>

        </b-card>
      )
  },
  watch : {

    freeText:  {
      handler (val, oldVal) {
        alert(oldVal + '::' + val)
      },
    }
  }
};
</script>

<style>

</style>
