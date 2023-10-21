<template>
    <Navbar/>
    <Sidebar/>





    <div class="flex items-center justify-center" style="border-radius:2px;">
        <div class="max-w-2xl rounded overflow-hidden justify-between p-4 leading-normal">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. as;ldkas;ldkla;sdkasdk;alskd;adkalsdk;askdalskd;laskdlaskdl;askdlaskdl;aks Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>

            <div class="justify-center flex items-center justify-center">
            <img class="w-1/2 place-content-center h-128"  src="@/assets/frames-diff-01.png">
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
        </div>
    </div>




<div class="flex items-center justify-center" style="border-radius:2px;">
    <div class="max-w-2xl rounded overflow-hidden justify-between p-4 leading-normal">
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. as;ldkas;ldkla;sdkasdk;alskd;adkalsdk;askdalskd;laskdlaskdl;askdlaskdl;aks Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
        </div>
        <div class="justify-center flex items-center justify-center">
        <img class="w-1/2 place-content-center h-128"  src="@/assets/frames-diff-01.png" alt="Sunset in the mountains">
        </div>
        <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
    </div>
</div>







</template>
    
<script>
import axios from 'axios';
import Navbar from "@/components/Navbar";
import Sidebar from '@/components/Sidebar';

export default {
    components: {Navbar, Sidebar,},
}
</script>