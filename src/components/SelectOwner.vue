<template>
  <div class="ownerListContainer">
    <table class="table">
      <thead>
        <tr>
          <td><b>Owner</b></td>
          <td><b> Select</b></td>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(owner,index) in ownersList">
        <td>{{owner}}</td>
        <td><label><input type="checkbox"  @click="selectOwner(owner)" /><span></span></label></td> 
      </tr>
      </tbody>
    </table>
    <router-link class="btn waves-effect waves-light" to="/search" >Continue</router-link>

  </div>

</template>

<script>

export default {

  name: "SelectOwner",
  props: {
    ownersList : Array
  },
  data() {
    return {
      selectedOwners : new Set()
    }
  },
  methods: {
      selectOwner: function(i) {

        if(!this.selectedOwners.has(i)) this.selectedOwners.add(i);
        else this.selectedOwners.delete(i);

        this.$store.commit('change', this.selectedOwners);

        console.log(this.$store.getters.selectedOwners);
       
      }
      
    }
  
};
</script>
