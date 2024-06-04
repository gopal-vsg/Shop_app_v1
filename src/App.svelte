<script>
  import { supabase } from "./client";
  import {onMount} from "svelte"
  let users = []
  let message = ''
  onMount(async ()=>{
    const { data, error } = await supabase.from('shop_app_v1').select('shop_name,shop_owner');
    if (error) {
      message = 'Something is messed up';
    } else {
      users = data;
    }
  })

</script>

<main>
  <p>{message}</p>
  <div class="table">
    {#each users as user}
      <p>shop name : {user.shop_name} shop owner : {user.shop_owner}</p>
    {/each}
  </div>
</main>

<style>
 
</style>