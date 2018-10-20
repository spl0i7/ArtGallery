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
                <tr>
                   <td><b>Name</b></td>
                   <td>{{this.artJSON['name']}}</td>
               </tr>
               <tr>
                   <td><b>Owner</b></td>
                   <td>{{this.artJSON['curr_owner']}}</td>
               </tr>
                <tr>
                   <td><b>Accession Number</b></td>
                   <td>{{this.artJSON['accession_no']}}</td>
               </tr>
                <tr>
                   <td><b>Primary Maker</b></td>
                   <td>{{this.artJSON['prod_pri_person_details_group'][0]['prod_pri_person_name']}}</td>
               </tr>
                <tr>
                   <td><b>Nationality</b></td>
                   <td>{{this.artJSON['prod_pri_person_details_group'][0]['prod_pri_person_nationality']}}</td>
               </tr>
                <tr>
                   <td><b>Life Years</b></td>
                   <td>{{this.artJSON['prod_pri_person_details_group'][0]['prod_pri_person_lifeyears']}}</td>
               </tr>
                <tr>
                   <td><b>Primary Prod Date</b></td>
                   <td>{{this.artJSON['prod_pri_date_details_group'][0]['prod_pri_date']}}</td>
               </tr>
                <tr>
                   <td><b>Acquisition Source</b></td>
                   <td>{{this.artJSON['acq_source_address_group'][0]['acq_source']}}</td>
               </tr>
                <tr>
                   <td><b>Signature Date</b></td>
                   <td>{{this.artJSON['signature_date']}}</td>
               </tr>
                <tr>
                   <td><b>Material</b></td>
                   <td>{{this.artJSON['material_desc']}}</td>
               </tr>
                <tr>
                   <td><b>Measure</b></td>
                   <td>{{this.artJSON['measure_desc']}}</td>
               </tr>
                <tr>
                   <td><b>Acquisation Source</b></td>
                   <td>{{this.artJSON['acq_source_address_group'][0]['acq_source']}}</td>
               </tr>
                <tr>
                   <td><b>Acquisition Date</b></td>
                   <td>{{this.artJSON['acq_date']}}</td>
               </tr>
                <tr>
                   <td><b>Valuation</b></td>
                   <td>{{this.artJSON['valuation_group'][0]['valuation']}}</td>
               </tr>
                <tr>
                   <td><b>Valuation Date</b></td>
                   <td>{{this.artJSON['valuation_group'][0]['valuation_date']}}</td>
               </tr>
                <tr>
                   <td><b>Current Location</b></td>
                   <td>{{this.artJSON['curr_loc_details_all_parts_group'][0]['curr_loc_all_parts']}}</td>
               </tr>
                <tr>
                   <td><b>Purchase Price</b></td>
                   <td>{{this.artJSON['acq_price_original']}}</td>
               </tr>
                <tr>
                   <td><b>Insurance Value</b></td>
                   <td>{{this.artJSON['insurance_closing_amv_group'][0]['ob_sym_closing_ins_valuation']}}</td>
               </tr>
                <tr>
                   <td><b>Insurance Method</b></td>
                   <td>{{this.artJSON['insurance_closing_amv_group'][0]['ob_sym_closing_ins_method']}}</td>
               </tr>
                <tr>
                   <td><b>Insurance Date</b></td>
                   <td>{{this.artJSON['insurance_closing_amv_group'][0]['ob_sym_closing_ins_date']}}</td>
               </tr>
                <tr>
                   <td><b>Insurance Valuer</b></td>
                   <td>{{this.artJSON['insurance_closing_amv_group'][0]['ob_sym_closing_ins_person']}}</td>
               </tr>
                <tr>
                   <td><b>Condition Description</b></td>
                   <td>
                       <p v-for="desc in getCondDesc()">{{ desc }}</p>
                    </td>
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
