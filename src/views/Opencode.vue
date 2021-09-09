<template>
   <div class="container my-5">
       <div class="row justify-content-center">
           <div class="col-12">
                <div class="d-flex bd-highlight">
                    <div class="p-2 flex-grow-1 bd-highlight">
                        <img src="/logo.png" class="img-thumbnail" alt="SSI Open Code Inbox">                           
                    </div>

                    <div class="btn-group p-2 bd-highlight" role="group" aria-label="Basic example">
                       
                        <button class="btn btn-outline-primary" @click.prevent="addCode()">
                            <i class="bi bi-arrow-repeat"></i>
                            Reload
                        </button>
                        <button class="btn btn-outline-primary" @click.prevent="profile()">
                            <i class="bi bi-gear"></i>
                            Setting                   
                        </button>
                       
                        <button class="btn btn-outline-primary" @click.prevent="logout()">
                            <i class="bi bi-box-arrow-right"></i>
                            Logout                   
                        </button>
                       
                    </div>
                                    
                </div>            
               
                <div class="card rounded shadow">
                    <div class="card-header">
                        Inbox
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <tbody>
                                <tr v-for="(open,index) in opencode.data" :key="index">
                                    <td>{{open.pesan}}</td>
                                    <td><small>{{open.jam}}</small></td>                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
           </div>           
       </div>
   </div>
</template>
<script>
import axios from 'axios'
import {onMounted,ref} from 'vue'
import {useRouter} from 'vue-router'
export default{
    setup(){
        //reactive state
        let opencode =ref([]);

        const router =useRouter();

        onMounted(() => {     
            getData();           
        });

        function logout(){
            axios.get(`logout`)
           .then(() => {
                localStorage.removeItem('myapptoken');
                router.push({
                   name:'user.login'
                });
           }).catch((err) => {
               console.log(err);
           });
        };
         
        function addCode(){           
        //     axios.get(`receiveCode?nomor_hp=085697775111&pesan=rahasia`)
        //    .then(() => {
        //        getData();
        //    }).catch((err) => {
        //        console.log(err);
        //    });
           getData();
        }

        function getData(){
            axios.defaults.headers.common["Authorization"]=`Bearer ${localStorage.getItem('myapptoken')}`;       
            axios.get('opencode?nomor_hp='+localStorage.getItem('nomor_hp'))
            .then((result)=>{opencode.value=result.data}).catch((err)=>{err.console.log(err.response)});
        }


        function profile(){           
            router.push({
                name:'user.profile'
            });
        };
       
        return {
            opencode,
            addCode,
            profile,
            logout
        }
    }
}
</script>
