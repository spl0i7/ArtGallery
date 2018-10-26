<template>
  <div class="ownerListContainer">

    <div class="row">
    </div>


    <table class="table">
      <thead>
        <tr>
          <td><b>Owner</b></td>
          <td><b> Select</b></td>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(o,i) in ownersList">
        <td>{{o}}</td>
        <td><label><span><router-link :to="{ name: 'collection', params: { owner: o }}" class="waves-effect waves-light btn">View</router-link></span></label></td> 
      </tr>
      </tbody>
    </table>
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
      selectedOwners : new Set(),
      selectAll : false
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
