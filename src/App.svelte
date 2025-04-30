<script>
  // Remove SMUI imports
  // import Select, { Option } from '@smui/select';
  import ProductForm from './components/ProductForm.svelte';
  let selectedProduct = '';
</script>

<main>
  <header>
    <img src="/logo.png" alt="KERV Logo" class="logo" />
    <h1>KERV Product Matrix</h1>
    <div class="spacer"></div>
  </header>

  <div class="content">
    <!-- Add placeholder to select -->
    <select id="product-select" bind:value={selectedProduct} class="product-select" required>
      <option value="" disabled selected>Select a product...</option> <!-- Use selected attribute -->
      <option value="kerv-kart">KERV Kart Single Retailer</option>
      <option value="product-2">Product 2</option>
      <option value="product-3">Product 3</option>
      <option value="product-4">Product 4</option>
      <option value="product-5">Product 5</option>
    </select>

    {#if selectedProduct === 'kerv-kart'}
      <ProductForm />
    {/if}
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f8f9fa; /* Light background */
    color: #212529; /* Dark text */
  }

  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.5rem; /* Increased padding */
    background-color: white;
    border-bottom: 1px solid #e9ecef; /* Slightly lighter border */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    height: 40px; /* Increased size */
    margin-right: 1rem;
  }

  /* Restore H1 styles */
  header h1 {
    font-size: 1.15rem; /* Adjusted size */
    font-weight: 600; /* Slightly bolder */
    margin: 0;
    color: #343a40; /* Darker text */
    white-space: nowrap; /* Prevent wrapping */
  }

  .spacer {
    flex-grow: 1;
  }

  .content {
    padding: 2.5rem;
    width: 90%;
    max-width: 1200px;
    margin: 2rem auto;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08);
    flex-grow: 1;
  }

  /* Remove the separate label, use placeholder */
  /* .select-label { ... } */

  .product-select {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.8rem 1rem; /* MUI-like padding */
    border: 1px solid rgba(0, 0, 0, 0.23); /* MUI-like border */
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    display: block;
    width: 100%;
    /* max-width: 400px; */ /* Allow full width within content */
    margin-bottom: 2rem;
    appearance: none; /* Remove default arrow */
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ced4da%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); /* Custom arrow */
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
    color: #495057; /* Default text color */
    transition: border-color 0.2s ease;
  }

  .product-select:hover {
     border-color: rgba(0, 0, 0, 0.87); /* MUI-like hover */
  }

  .product-select:focus {
    outline: none;
    border-color: #e6007e; /* Use pink accent on focus */
    box-shadow: 0 0 0 1px #e6007e; /* Add focus ring */
  }

  .product-select:required:invalid {
      color: #6c757d; /* Style placeholder differently */
  }
  .product-select option[value=""][disabled] {
      display: none; /* Hide placeholder from dropdown */
  }
  .product-select option {
      color: #212529; /* Ensure options have dark text */
  }


  /* Style for the final result box (ensure App.svelte controls this style) */
  :global(.final-result-box) {
    margin-top: 1.5rem;
    padding: 1rem 1.5rem;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    background-color: #f8f9fa;
  }

  :global(.final-result-box h2) {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: #343a40;
  }

  :global(.final-result-box p) {
    margin-bottom: 1rem;
  }

  /* Add global style for the result button */
  :global(.final-result-box .button) {
    /* Style defined in ProductForm.svelte, just ensuring selector works */
  }

</style>
