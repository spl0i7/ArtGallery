<template>

  <div class="row ">
    <h1>Search</h1>
    <p>You can either do a quick search, search by accession number, search by name or search by artist</p>
    <div class="col s12">
      <div class="row center-align">
        <div class="input-field col s4">
          <i class="material-icons prefix">search</i>
          <input id="icon_prefix" type="text" class="validate" placeholder="Search Text" v-model="searchQuery">
        </div>
        <div class="input-field col s2">
          <label>
            <input type="radio" name="searchType" value="quick" v-model="searchType" checked/>
            <span>Quick Search</span>
          </label>
        </div>
        <div class="input-field col s2">
          <label>
            <input type="radio" name ="searchType" value="accession" v-model="searchType"/>
            <span>Search By Accession</span>
          </label>
        </div>
        <div class="input-field col s2">
          <label>
            <input type="radio" name="searchType" value="name" v-model="searchType"/>
            <span>Search by Name</span>
          </label>
        </div>
        <div class="input-field col s2">
          <label>
            <input type="radio" name="searchType" value="artist" v-model="searchType"/>
            <span>Search by Artist</span>
          </label>
        </div>
      </div>
      <div class="row center-align">
        <a class="waves-effect waves-light btn" @click="doSearch"><i class="material-icons left">search</i>Search</a>
      </div>
    </div>
    <div class="tableContainer">
      <table v-if="searchResults" class="striped">
        <thead>
          <td>Name</td>
          <td>Owner</td>
          <td>Artist</td>
          <td>Accession Number</td>
          <td>View</td>
        </thead>
        <tbody>
          <!-- /* eslint-disable */ -->
          <tr v-for="rec in searchResults">
            <td>{{rec.name}}</td>
            <td>{{rec.owner}}</td>
            <td>{{rec.artist}}</td>
            <td>{{rec.access_no}}</td>
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
      searchType : 'quick',
      searchQuery : null,
      searchResults : null,
    }
  },
  methods: {
    doSearch : function() {

      this.searchResults = null;
      this.doAPISearch(this.searchQuery);
    },
    selectedOwners: function() {
      return this.$store.getters.selectedOwners;
    },
    checkOwner: function(i){
      if(this.selectedOwners()) return this.selectedOwners().has(i);
      return false;
    },
    doAPISearch: function(query) {
      return fetch(`http://www.arthage.co.uk/api/objects?query=${query}`)
      .then((response)=>{
          if (response.status !== 200) {
            // todo : display error message
            return;
          }
          response.json().then((data)=>{
            //ANTONELLO COLLECTIONS LTD; 1988.4; Pablo PICASSO; Profile Head of Young Woman
            let searchResults = [];

            data['_links'].records.forEach(i=> {
              let dataArr = i.title.split(';');

              searchResults.push(
                {
                  'owner' : dataArr[0].trim(),
                  'access_no' : dataArr[1].trim(),
                  'artist' : dataArr[2].trim(),
                  'name' : dataArr[3].trim(),
                  'id' : i.href.split('/')[5],
                  'link' : i.href,
                }
              );
            });


          searchResults = searchResults.filter(i=>this.checkOwner(i.owner))

          switch(this.searchType) {
            case "quick":
              this.searchResults = searchResults;
              break;
            case "accession":
              this.searchResults = searchResults.filter(i => i.access_no == this.searchQuery);
              break;
            case "name" : 
              this.searchResults = searchResults.filter(i => new RegExp(this.searchQuery, 'gi').test(i.name));
              break;
            case "artist":  
              this.searchResults = searchResults.filter(i => new RegExp(this.searchQuery, 'gi').test(i.artist));
              break;
          }
               
        });
      })
      .catch(()=>{
        // todo : check for error
        //console.error('Fetch Error :-S', err);
      });
    }
  }
};
</script>
