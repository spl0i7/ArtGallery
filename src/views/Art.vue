<template>

  <div class="row ">
    <loading-screen v-if="isLoading" loadingMessage="Loading Art"></loading-screen>
   <div v-else>
       <div class="container">
           <img :src="getImage()" alt="" class="artImage">
       </div>
       <div class="ownerListContainer">

       <table class="table">
           <tbody>
                <tr v-if="this.artJSON['curr_owner']">
                   <td><b>Owner</b></td>
                   <td>{{this.artJSON['curr_owner']}}</td>
               </tr>
                <tr v-if="this.artJSON['taxon_details_group']">
                   <td><b>Classification</b></td>
                   <td>{{this.artJSON['taxon_details_group'][0]['classification']}}</td>
               </tr>
                <tr v-if="this.artJSON['accession_no']">
                   <td><b>Accession Number</b></td>
                   <td>{{this.artJSON['accession_no']}}</td>
               </tr>
                <tr v-if="this.artJSON['prod_pri_person_details_group']">
                   <td><b>Primary Maker</b></td>
                   <td>{{this.artJSON['prod_pri_person_details_group'][0]['prod_pri_person_name'] }}</td>
               </tr>
                <tr v-if="this.artJSON['prod_pri_person_details_group'][0]['prod_pri_person_lifeyears']">
                   <td><b>Life Years</b></td>
                   <td>{{this.artJSON['prod_pri_person_details_group'][0]['prod_pri_person_lifeyears']}}</td>
               </tr>
                <tr v-if="this.artJSON['name']">
                   <td><b>Name</b></td>
                   <td>{{this.artJSON['name']}}</td>
               </tr>
                <tr v-if="this.artJSON['prod_pri_date_details_group'][0]['prod_pri_date']">
                   <td><b>Primary Prod Date</b></td>
                   <td>{{this.artJSON['prod_pri_date_details_group'][0]['prod_pri_date']}}</td>
               </tr>
                <tr v-if="this.artJSON['prod_pri_place_group'][0]['prod_pri_place']">
                   <td><b>Production Place</b></td>
                   <td>{{this.artJSON['prod_pri_place_group'][0]['prod_pri_place']}}</td>
               </tr>
                <tr v-if="this.artJSON['prod_pri_date_details_group'][0]['prod_pri_date']">
                   <td><b>Production Date</b></td>
                   <td>{{this.artJSON['prod_pri_date_details_group'][0]['prod_pri_date']}}</td>
               </tr>                   
                <tr v-if="this.artJSON['edition']">
                   <td><b>Edition</b></td>
                   <td>{{this.artJSON['edition']}}</td>
               </tr>
                <tr v-if="this.artJSON['material_desc']">
                   <td><b>Material</b></td>
                   <td>{{this.artJSON['material_desc']}}</td>
               </tr>
                <tr v-if="this.artJSON['measure_desc']">
                   <td><b>Measure</b></td>
                   <td>{{this.artJSON['measure_desc']}}</td>
               </tr>
                <tr v-if="this.artJSON['brief_desc']">
                   <td><b>Brief Description</b></td>
                   <td>{{this.artJSON['brief_desc']}}</td>
               </tr>
               <tr v-if="this.artJSON['condition_desc']">
                   <td><b>Condition Description</b></td>
                   <td>
                       <p v-for="desc in getCondDesc()" :key="desc">{{ desc }}</p>
                    </td>
               </tr>
                <tr v-if="this.artJSON['curr_loc_details_all_parts_group'][0]['curr_loc_all_parts']">
                   <td><b>Current Location</b></td>
                   <td>{{this.artJSON['curr_loc_details_all_parts_group'][0]['curr_loc_all_parts']}}</td>
               </tr>
               <tr v-if="this.artJSON['prov_notes_group']">
                   <td><b>Prov Notes Group</b></td>
                   <td>
                       <p v-for="note in artJSON['prov_notes_group']" :key="note['prov_date']"><span>{{note['prov_date']}}</span> - <span>{{note['prov_person']}}</span></p>
                   </td>
               </tr>
                <tr v-if="this.artJSON['exhibition_notes']">
                   <td><b>Exhibition Details</b></td>
                   <td>{{this.artJSON['exhibition_notes']}}</td>
               </tr>
                <tr v-if="this.artJSON['accession_date']">
                   <td><b>Accession Date</b></td>
                   <td>{{this.artJSON['accession_date']}}</td>
               </tr>

                <tr v-if="this.artJSON['acq_date']">
                   <td><b>Acquisition Date</b></td>
                   <td>{{this.artJSON['acq_date']}}</td>
               </tr>
                <tr v-if="this.artJSON['acq_price_local']">
                   <td><b>Acquisation Price</b></td>
                   <td>{{this.artJSON['acq_price_local']}}</td>
               </tr>
                <tr v-if="this.artJSON['acq_source_address_group'][0]['acq_source']">
                   <td><b>Acquisation Source</b></td>
                   <td>{{this.artJSON['acq_source_address_group'][0]['acq_source']}}</td>
               </tr>
                <tr v-if="this.artJSON['acq_method']">
                   <td><b>Acquisation Method</b></td>
                   <td>{{this.artJSON['acq_method']}}</td>
               </tr>
                <tr v-if="this.artJSON['deacc_date']">
                   <td><b>Deaccession Date</b></td>
                   <td>{{this.artJSON['deacc_date']}}</td>
               </tr>
                <tr v-if="this.artJSON['deacc_notes']">
                   <td><b>Deaccession Notes</b></td>
                   <td>{{this.artJSON['deacc_notes']}}</td>
               </tr>
                <tr v-if="this.artJSON['deacc_person']">
                   <td><b>Transferred To</b></td>
                   <td>{{this.artJSON['deacc_person']}}</td>
               </tr>
                <tr v-if="this.artJSON['deacc_proceeds']">
                   <td><b>Deaccession Proceeds</b></td>
                   <td>{{this.artJSON['deacc_proceeds']}}</td>
               </tr>
                <tr v-if="this.artJSON['deacc_reason']">
                   <td><b>Deaccession Reason</b></td>
                   <td>{{this.artJSON['deacc_reason']}}</td>
               </tr>
                <tr v-if="this.artJSON['deacc_method']">
                   <td><b>Deaccession Method</b></td>
                   <td>{{this.artJSON['deacc_method']}}</td>
               </tr>
                <tr v-if="this.artJSON['deacc_date_release']">
                   <td><b>Deaccession Date of Release</b></td>
                   <td>{{this.artJSON['deacc_date_release']}}</td>
               </tr>        
                <tr v-if="this.artJSON['prod_pri_date_details_group'][0]['prod_pri_date']">
                   <td><b>Primary Prod Date</b></td>
                   <td>{{this.artJSON['prod_pri_date_details_group'][0]['prod_pri_date']}}</td>
               </tr>
                <tr v-if="this.artJSON['acq_source_address_group'][0]['acq_source']">
                   <td><b>Acquisition Source</b></td>
                   <td>{{this.artJSON['acq_source_address_group'][0]['acq_source']}}</td>
               </tr>
                <tr v-if="this.artJSON['signature_date']">
                   <td><b>Signature Date</b></td>
                   <td>{{this.artJSON['signature_date']}}</td>
               </tr>
                <tr v-if="this.artJSON['insurance_closing_amv_group']">
                   <td><b>Insurance Method</b></td>
                   <td>{{this.artJSON['insurance_closing_amv_group'][0]['ob_sym_closing_ins_method']}}</td>
               </tr>
                <tr v-if="this.artJSON['insurance_closing_amv_group']">
                   <td><b>Insurance Date</b></td>
                   <td>{{this.artJSON['insurance_closing_amv_group'][0]['ob_sym_closing_ins_date']}}</td>
               </tr>
                <tr v-if="this.artJSON['insurance_closing_amv_group']">
                   <td><b>Insurance Value</b></td>
                   <td>{{this.artJSON['insurance_closing_amv_group'][0]['ob_sym_closing_ins_valuation']}}</td>
               </tr>
                <tr v-if="this.artJSON['valuation_group']">
                   <td><b>Market Value</b></td>
                   <td>{{this.artJSON['valuation_group'][0]['valuation']}}</td>
               </tr>
           </tbody>
       </table>
                  </div>

   </div>
  </div>

</template>

<script>


import Art from "@/components/Art.vue";
import LoadingScreen from "@/components/Loading.vue";


export default {
    components: {
        Art,
        LoadingScreen
    },
    methods : {
        getImage : function() {
            if(this.artJSON['av_image_ref_export']) return `${this.imageBase}/${this.artJSON['av_image_ref_export']}`;
            else return '/img/404.gif';
        },
        getCondDesc: function(){
            let resultStr = [];
            if(this.artJSON['condition_desc']){
                let splitString = this.artJSON['condition_desc'].split(/([A-Z]\. \S+, \d{1,} \S+ \d{4}:)/).filter(i => i.length > 0);
                for(let i = 0; i < splitString.length-1; i+=2){
                    resultStr.push(splitString[i] + splitString[i+1]);
                }
            }
            return resultStr;
        
        }
    },
    data () {
        return {
            imageBase: 'http://www.arthage.co.uk/image',
            isLoading : true,
            artJSON : null,
            isError : false
        }
    },
    mounted() {
        fetch(`http://www.arthage.co.uk/api/objects/${this.$route.params.id}`)
        .then((response)=>{
          if (response.status !== 200) {
            this.isError = true;
            return;
          }
          response.json().then((data)=>{


            if(!data['valuation_group'][0]){
                data['valuation_group']=[{}];
            }

            if(!data['insurance_closing_amv_group'][0]){
                data['insurance_closing_amv_group']=[{}];
            }
            if(!data['curr_loc_details_all_parts_group'][0]){
                data['curr_loc_details_all_parts_group']=[{}];
            }
            if(!data['prod_pri_person_details_group'][0]) {
                data['prod_pri_person_details_group'] = [{}];
            }
            if(!data['prod_pri_date_details_group'][0]) {
                data['prod_pri_date_details_group'] = [{}];
            }
            if(!data['prod_pri_place_group'][0]) {
                data['prod_pri_place_group'] = [{}];
            }
            



            this.artJSON = data;
            this.isLoading = false;


          });
      })
      .catch(function(err) {
        /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error('Fetch Error :-S', err);
      });
    }
};
</script>
