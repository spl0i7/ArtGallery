<template>

  <div>
    <loading-screen v-if="isLoading" loadingMessage="Loading all the collection"></loading-screen>
    <div v-else>
      <div class="row">
        <div class="row">
          <h3 class="col s6">{{$route.params.owner}}</h3>
          <div class="input-field col s3">
                <i class="material-icons prefix">search</i>
                <input id="icon_prefix" type="text" class="validate" placeholder="Search Text" v-model="searchQuery" v-on:keyup.enter="doSearch">
          </div>
        </div>

        <div class="col s12">
          <div class="row center-align">
            <h5>Showing {{collections.length}} records</h5>
          </div>
        </div>
      </div>
      <div class="center-align centeredContainer">
        <table v-if="filteredCollections" class="striped table">
          <!-- Accession number, Artist, Item, Medium, Location, Owner -->
          <thead>
            <td></td>
            <td><b>Accession</b></td>
            <td><b>Artist</b></td>
            <td><b>Name</b></td>
            <td><b>Location</b></td>
            <td></td>
          </thead>
          <tbody>
            <!-- /* eslint-disable */ -->
            <tr v-for="rec in filteredCollections" :key="rec.access_no">
              <td><img :src="rec.thumb"  class="artThumnail" ></td>
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
  </div>
</template>
<script>

import Search from "@/components/Search.vue";
import LoadingScreen from "@/components/Loading.vue";


export default {
  components: {
    Search,
    LoadingScreen
  },
  data() {
    return {
      rawCollections : [],
      searchResults : null,
      searchQuery: null,
      collections : [],
      isLoading: true,
    }

  },
  mounted() {
    let ownerData = localStorage.getItem(this.$route.params.owner);
    if(ownerData) {
      this.collections = JSON.parse(ownerData);
      this.isLoading = false;
    }
    else {

    fetch(`http://www.arthage.co.uk/api/objects?query=OWNER\\${this.$route.params.owner.split(' ')[0]}&fields="av_image_ref_export,accession_no,name,prod_pri_person_details_group,taxon_details_group,hist_loc_group"`)

        .then((response)=>{
          if (response.status !== 200) {
            return;
          }
          response.json().then((data)=>{
            this.rawCollections = data['_embedded']['records'];

            /*eslint no-console: ["error", { allow: ["warn", "error"] }] */

            this.rawCollections.forEach((d)=> this.collections.push({
              'access_no' : d['accession_no'],
              'artist' : d['prod_pri_person_details_group'][0]['prod_pri_person_name'],
              'name' : d['name'],
              'classification' : d['taxon_details_group'][0]['classification'],
              'location': d['hist_loc_group'][0]['hist_loc'],
              'thumb' : `http://www.arthage.co.uk/thumbs/${d['av_image_ref_export']}.bmp`,
              'id' : d['_links']['self']['href'].split('/')[5]

            }));
            
            localStorage.setItem(this.$route.params.owner, JSON.stringify(this.collections));
            this.isLoading = false;
        });
      });
  
  
    }
  },
  computed : {
    filteredCollections : function() {
      if(!this.searchQuery) return this.collections;
      else {
        let searchResults = [];
        let reg = new RegExp(this.searchQuery, 'gi');

        for(let i = 0 ; i < this.collections.length; i++) {
          if( reg.test(this.collections[i]['location']) || reg.test(this.collections[i]['name']) || reg.test(this.collections[i]['artist']) || reg.test(this.collections[i]['access_no'])) {
            searchResults.push(this.collections[i]);
          }
        
        }

        return searchResults;

        
      }
    }
  },
  methods: {
    doSearch : function() {
      
    },
  }
};
</script>
