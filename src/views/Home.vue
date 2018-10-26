<template>
  <div class="home">
    
    <loading-screen v-if="isLoading" loadingMessage="Loading Collection"></loading-screen>
    <div v-else>
      
      <h1>Select Collections</h1>
      <SelectOwner :ownersList="ownersList"/>
    </div>

  </div>
</template>
<script>

import SelectOwner from "@/components/SelectOwner.vue";
import LoadingScreen from "@/components/Loading.vue";
import Vue from "vue";

export default {
  name: "home",
  components: {
    SelectOwner,
    LoadingScreen
  },
  data() {
    return {
      isLoading : true,
      hasError : false,
      ownersList : [],
    }
  },
  methods : {
    fetchOwners : function() {
        fetch('http://www.arthage.co.uk/api/objects?fields=curr_owner&limit=1000')
        .then((response)=>{
          if (response.status !== 200) {
            this.isError = true;
            return;
          }
          response.json().then((data)=>{
            //let regex =  new RegExp( 'DEACCESSIONED', 'gi');
            this.ownersList = [...new Set(data['_embedded'].records.map(i => i.curr_owner))].filter(i => typeof(i) === "string" );
            this.isLoading = false;
          });
      })
      .catch(function(err) {
        /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error('Fetch Error :-S', err);
      });
    }
  },
  mounted() {
    
    if(!Vue.config.offline) {
      this.fetchOwners();
    } else {
      this.isLoading = false;
      this.ownersList = ['DEACCESSIONED', 'OMICRON COLLECTIONS LTD', 'GEMINI ART LIMITED', 'ANTONELLO COLLECTIONS LTD',
                          'BTB (BORJA)' , 'LEONARDO COLLECTIONS LTD', 'GAMMA COLLECTIONS LTD',  'HHTB', 'EPSILON COLLECTIONS LIMITED',
                          'TBG Europe NV Amsterdam', 'ANSTALT ANATOL', 'CLYPSE LTD/EPSILON COLLECTIONS LTD', 'ANGARA ANSTALT/EPSILON COLL', 'ANGARA ANSTALT', 'CLIENT A'];
    }

  }
};
</script>
