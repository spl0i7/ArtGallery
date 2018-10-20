<template>
  <div class="ownerListContainer">

    <div class="row">
      <div class="col s4"><button class="btn" @click="selectAllBox()">All</button></div>
      <div class="col s4 offset-s2"><button class="btn" @click="clearAllBox()">Clear</button></div>
    </div>


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
        <td><label><input type="checkbox"  @click="selectOwner(owner)" :checked="selectAll"/><span></span></label></td> 
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
      selectedOwners : new Set(),
      selectAll : false
    }
  },
  methods: {
      selectAllBox : function() {
          this.selectAll = true;
          this.ownersList.forEach(i=> this.selectedOwners.add(i));

          this.$store.commit('change', this.selectedOwners);
          console.log(this.$store.getters.selectedOwners);
      },
      clearAllBox : function() {
        this.selectAll = false;
        this.selectedOwners = new Set();

        this.$store.commit('change', this.selectedOwners);
        console.log(this.$store.getters.selectedOwners);

      },
      selectOwner: function(i) {

        if(!this.selectedOwners.has(i)) this.selectedOwners.add(i);
        else this.selectedOwners.delete(i);

        this.$store.commit('change', this.selectedOwners);

        console.log(this.$store.getters.selectedOwners);
       
      }
      
    }
  
};
</script>
