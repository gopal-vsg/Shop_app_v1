<script>
  import { supabase } from "./client";
  import { onMount } from "svelte";

  let users = [];
  let message = "";
  let editingUser = null;
  
  let new_shop = '';
  let new_owner = '';

  onMount(async () => {
    const { data, error } = await supabase
      .from("shop_app_v1")
      .select("shop_id, shop_name, shop_owner");
    if (error) {
      message = "Failed to Fetech Details";
    } else {
      users = data;
    }
  });

  function startEditing(user) {
    editingUser = { ...user };
  }

  async function saveChanges() {
    const { error } = await supabase
      .from("shop_app_v1")
      .update({ shop_name: editingUser.shop_name, shop_owner: editingUser.shop_owner })
      .eq("shop_id", editingUser.shop_id);

    if (error) {
      message = "Failed to update data";
    } else {
      message = "Data updated successfully";
      editingUser = null;
      window.location.reload();
    }
  }

  function cancelEditing() {
    editingUser = null;
  }

  async function add() {
    if(new_owner !== '' && new_shop !== ''){
      const { data, error } = await supabase.from('shop_app_v1').insert([{ shop_name: new_shop, shop_owner: new_owner }])
      if (error) {
        message = `Error : ${error.message}`
      } else {
        console.log("data entered successfully")
        message = 'Data inserted successfully'
        new_shop = ''
        new_owner = ''
        window.location.reload();
      }
    }
  }
</script>

<main>
  <p>{message}</p>
  <div class="table">
    <p class="title"> Details of Shops </p>
    <p class="index">Shop Name<span></span>Shop Owner</p>
    {#each users as user}
      {#if editingUser && editingUser.shop_id === user.shop_id}
        <div>
          <input type="text" bind:value={editingUser.shop_name} />
          <input type="text" bind:value={editingUser.shop_owner} />
          <button on:click={saveChanges}>Save</button>
          <button on:click={cancelEditing}>Cancel</button>
        </div>
      {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p on:click={() => startEditing(user)}>
          {user.shop_name} <span></span>{user.shop_owner}
        </p>
        
      {/if}
    {/each}
  </div>
  <p class="note">*Click on the values to Edit</p>
  <br>
  <h3> Enter new Values </h3>
  <br>
  <label for="">enter Shop name</label>
  <input type="text" bind:value={new_shop}>
  <label for="">enter owner name</label>
  <input type="text" bind:value={new_owner}>
  <button on:click={add}>add</button>
</main>

<style>
  .table {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>