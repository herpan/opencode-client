<template>
<div v-if="user.loc">
   <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12">              
                <div class="card rounded shadow">
                    <div class="card-header">
                        <img src="/logo.png" class="img-thumbnail" alt="SSI Open Code Inbox">                        
                            SSI Open Code Inbox
                            <small class="text-muted">V1.0</small>                        
                    </div>
                    <div class="card-body">                        
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">                                
                                <div v-if="validation.message" class="alert alert-danger alert-dismissible" role="alert">
                                      {{validation.message}}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div> 
                                <form @submit.prevent="login()">                                   
                                    <div class="mb-3">
                                        <lable class="form-lable">Nomor HP</lable>
                                        <input type="text" class="form-control" v-model="user.nomor_hp">
                                            <div v-if="validation.nomor_hp" class="text-danger">
                                            {{validation.nomor_hp[0]}}
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <lable class="form-lable">Password</lable>
                                        <input type="password" class="form-control" v-model="user.password">
                                        <div v-if="validation.password" class="text-danger">
                                            {{validation.password[0]}}
                                        </div>
                                    </div> 

                                    <div class="mb-3">
                                        <lable class="form-lable">Latitude</lable>
                                        <input type="text" class="form-control" v-model="user.latitude" readonly> 
                                    </div>
                                    <div class="mb-3">
                                        <lable class="form-lable">Longitude</lable>
                                        <input type="text" class="form-control" v-model="user.longitude" readonly>  
                                    </div> 
                                    <button class="btn btn-outline-primary">
                                        <i class="bi bi-box-arrow-in-right"></i>
                                        Login
                                    </button>
                                </form>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>           
        </div>    
   </div>
</div>
<div v-else>Mohon Izinkan akses lokasi 😢</div>
</template>
<script>
import {reactive,ref} from 'vue'
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'


export default{
    setup(){

        
        //data binding
       const user = reactive({
           nomor_hp:'',
           password:'',
           device_token:'',
           latitude:'',
           longitude:'',
           loc:true
        });

       const validation =ref([]);
       const router =useRouter();       

        onMounted(() => {     
           getLocation();  
        });

            
       function login(){
           user.device_token=localStorage.getItem('device_token');           
           //alert(user.device_token);
           axios.post(
               'login',
                user
           )
           .then((response) => {
              localStorage.setItem('myapptoken',response.data.token);
              localStorage.setItem('nomor_hp',response.data.user.nomor_hp);
              localStorage.setItem('device_token',response.data.token);
               console.log(response.data);
              router.push({
                   name:'opencode.index'
              });
           }).catch((err) => {
               validation.value=err.response.data;
           });
       };
       function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition,showError);
            } else {
                user.loc=false;
                //console.log("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            user.loc=true;
            user.latitude=position.coords.latitude;
            user.longitude=position.coords.longitude;            
        }

        function showError(error) {
                switch(error.code) {
                case error.PERMISSION_DENIED:
                user.loc=false;
                //alert(0);    
                //x.innerHTML = "User denied the request for Geolocation."
                break;
                default : 
                user.loc=true;
                break;
                // case error.POSITION_UNAVAILABLE:
                // x.innerHTML = "Location information is unavailable."
                // break;
                // case error.TIMEOUT:
                // x.innerHTML = "The request to get user location timed out."
                // break;
                // case error.UNKNOWN_ERROR:
                // x.innerHTML = "An unknown error occurred."
                // break;
            }
       }
       
        return {
            user,
            validation,
            router, 
            getLocation,         
            login
        }
    }
}
</script>
