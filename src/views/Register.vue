<template>
   <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="d-flex bd-highlight">
                    <div class="p-2 flex-grow-1 bd-highlight">
                        <img src="/logo.png" class="img-thumbnail" alt="SSI Open Code Inbox">                           
                    </div>

                    <div class="btn-group p-2 bd-highlight" role="group" aria-label="Basic example">                       
                        <button class="btn btn-outline-primary" @click.prevent="back()">
                           <i class="bi bi-arrow-90deg-left"></i>
                            Back
                        </button>                                             
                        <button class="btn btn-outline-primary" @click.prevent="logout()">
                            <i class="bi bi-box-arrow-right"></i>
                            Logout                   
                        </button>
                       
                    </div>
                                    
                </div>              
                <div class="card rounded shadow">
                    <div class="card-header">
                        Ganti Password dan Nama Anda
                    </div>
                    <div class="card-body">                          
                           <div class="tab-pane show active" id="register" role="tabpanel" aria-labelledby="profile-tab"> 
                                <div v-if="validation.success" class="alert alert-info alert-dismissible" role="alert">
                                     Update Password berhasil, silahkan login ulang untuk melanjutkan !!!
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>                           
                                <form @submit.prevent="store()" id="formRegister">
                                    <div class="mb-3">
                                        <lable class="form-lable">Nama</lable>
                                        <input type="hidden" v-model="user.nomor_hp">
                                        <input type="text" class="form-control" v-model="user.nama">
                                        <div v-if="validation.nama" class="text-danger">
                                            {{validation.nama[0]}}
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <lable class="form-lable">Password Lama</lable>
                                        <input type="password" class="form-control" v-model="user.old_password">
                                        <div v-if="validation.old_password" class="text-danger">
                                            {{validation.old_password[0]}}
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
                                        <lable class="form-lable">Password Confirmation</lable>
                                        <input type="password" class="form-control" v-model="user.password_confirmation">
                                        <div v-if="validation.password_confirmation" class="text-danger">
                                            {{validation.password_confirmation[0]}}
                                        </div>
                                    </div>
                                    <!--
                                    <div class="mb-3">
                                        <lable class="form-lable">Sentra Operasi</lable>
                                        <select class="form-select" v-model="user.sentra_operasi">
                                            <option v-for="(sop,index) in so.data" :key="index" :value="sop.id" v-text="sop.nama"></option>
                                        </select>
                                        <div v-if="validation.sentra_operasi" class="text-danger">
                                            {{validation.sentra_operasi[0]}}
                                        </div>
                                    </div>     
                                    -->                                                                 
                                    <button class="btn btn-outline-primary">Submit</button>
                                </form>
                                            
                            </div>  
                        
                    </div>
                </div>
            </div>           
        </div>    
   </div>
</template>
<script>
import {reactive,onMounted,ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'


export default{
    setup(){        
        //data binding
       const user = reactive({
           nomor_hp:'',
           nama:'',
           old_password:'',
           password:'',
           password_confirmation:'',
           sentra_operasi:''         
       });

       //let so =ref([]);

       const validation =ref([]);
       const router =useRouter();

        onMounted(() => {
           // getSentra();
            axios.defaults.headers.common["Authorization"]=`Bearer ${localStorage.getItem('myapptoken')}`;  
            axios.get('show_user?nomor_hp='+localStorage.getItem('nomor_hp'))
            .then((result)=>{
                user.nomor_hp=result.data.data.nomor_hp;
                user.nama=result.data.data.nama;
                user.password='';
                user.password_confirmation='';
                //user.sentra_operasi=result.data.data.sentra_operasi;               
            }).catch((err)=>{
                console.log(err.response.data)
            })
       });

       function store(){
           axios.post(
               'update_user',
               user
           )
           .then((response) => {   
               if(response.data.success===true){           
                 validation.value=response.data;
                 alert(response.data.message)
                 localStorage.removeItem('myapptoken');
                 router.push({
                    name:'user.login'
                 });
               }
           }).catch((err) => {
               validation.value=err.response.data;
           });
       };

       function back(){
          
        router.push({
            name:'opencode.index'
        });
              
       };

    //    function getSentra(){
    //         axios.defaults.headers.common["Authorization"]=`Bearer ${localStorage.getItem('myapptoken')}`;       
    //         axios.get('get_sentra')
    //         .then((result)=>{so.value=result.data}).catch((err)=>{err.console.log(err.response)});
    //     }

          
        return {
            user,
            //so,
            validation,
            router,
            back,
            store
        }
    }
}
</script>
