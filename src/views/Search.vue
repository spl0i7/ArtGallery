<template>

  <div>
    <div class="row">
      <h1>Search</h1>
      <p>You can either do a quick search, search by accession number, search by name or search by artist</p>
      <div class="col s12">
        <div class="row center-align">
          <div class="input-field col s4">
            <i class="material-icons prefix">search</i>
            <input id="icon_prefix" type="text" class="validate" placeholder="Search Text" v-model="searchQuery" v-on:keyup.enter="doSearch">
          </div>
        </div>
        <div class="row center-align">
          <a class="waves-effect waves-light btn" @click="doSearch"><i class="material-icons left">search</i>Search</a>
        </div>
      </div>
    </div>
    
    <div class="center-align centeredContainer">
      <table v-if="collections" class="striped table">
        <!-- Accession number, Artist, Item, Medium, Location, Owner -->
        <thead>
          <td>Preview</td>
          <td>Accession Number</td>
          <td>Artist</td>
          <td>Name</td>
          <td>Location</td>

          <td>View</td>
        </thead>
        <tbody>
          <!-- /* eslint-disable */ -->
          <tr v-for="rec in collections" :key="rec.access_no">
            <td><img :src="rec.thumb" alt=""></td>
            <td>{{rec.access_no}}</td>
            <td>{{rec.artist}}</td>
            <td>{{rec.name}}</td>
            <td>{{rec.location}}</td>

            <td> <router-link class="btn waves-effect waves-light" :to="{ name: 'art', params: { id: rec.id }}" >View</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>
<script>

import Search from "@/components/Search.vue";


export default {
  components: {
    Search
  },
  data() {
    return {
      rawCollections : [],
      searchResults : null,
      searchQuery: null,
      collections : []
    }
  },
  mounted() {

    fetch(`http://www.arthage.co.uk/api/objects?query=OWNER\\${this.$route.params.owner}`)
        .then((response)=>{
          if (response.status !== 200) {
            return;
          }
          response.json().then((data)=>{
            this.rawCollections = data['_links']['records'];

            /*eslint no-console: ["error", { allow: ["warn", "error"] }] */

            this.rawCollections.reduce((p, c)=> p.then(()=>fetch(c['href']).then((response)=>response.json().then((d)=> this.collections.push({
              'access_no' : d['accession_no'],
              'artist' : d['prod_pri_person_details_group'][0]['prod_pri_person_name'],
              'name' : d['name'],
              'classification' : d['taxon_details_group'][0]['classification'],
              'location': d['hist_loc_group'][0]['hist_loc'],
              'thumb' : `http://www.arthage.co.uk/thumbs/${d['av_image_ref_export']}.bmp`

            }) ))), Promise.resolve());
            

        });
      });
  },

  methods: {
    doSearch : function() {

      this.searchResults = null;
      this.doAPISearch(this.searchQuery);
    },
  }
};
</script>
