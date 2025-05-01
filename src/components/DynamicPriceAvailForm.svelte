<script>
  let feedActive = null;
  let feedAccess = null;
  let finalResult = '';

  // Reactive logic for KERV: Dynamic Product Price + Availability
  $: {
    if (feedActive === 'yes') {
      finalResult = 'Approved, Ops Can Begin Campaign Creative Process';
    } else if (feedActive === 'no') {
      if (feedAccess === 'yes') {
        finalResult = 'Approved: Requires onboarding of Product Catalog -> Ops can begin campaign creation process'; // Adjusted text slightly for flow
      } else if (feedAccess === 'no') {
        finalResult = 'Offer Non-Dynamic Solution';
      } else {
        finalResult = ''; // Waiting for Q2
      }
    } else {
      finalResult = ''; // Waiting for Q1
    }
  }

  function resetForm() {
    feedActive = feedAccess = null;
    finalResult = '';
  }
</script>

<form on:submit|preventDefault class="product-form">
  <!-- Q1 -->
  {#if feedActive === null}
    <fieldset>
      <legend>Do we have an Active Product Catalog Feed?</legend>
      <div class="radio-option">
        <input type="radio" bind:group={feedActive} value="yes" id="dpFeedActiveYes" />
        <label for="dpFeedActiveYes">Yes</label>
      </div>
      <div class="radio-option">
        <input type="radio" bind:group={feedActive} value="no" id="dpFeedActiveNo" />
        <label for="dpFeedActiveNo">No</label>
      </div>
    </fieldset>
  {/if}

  <!-- Path B: feedActive = no -->
  {#if feedActive === 'no'}
    <!-- Q2 -->
    {#if feedAccess === null}
      <fieldset>
        <legend>Is the client able to provide access to a Product Feed Catalog?</legend>
        <div class="radio-option">
          <input type="radio" bind:group={feedAccess} value="yes" id="dpFeedAccessYes" />
          <label for="dpFeedAccessYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={feedAccess} value="no" id="dpFeedAccessNo" />
          <label for="dpFeedAccessNo">No</label>
        </div>
      </fieldset>
    {/if}
  {/if}

  <!-- Final Result -->
  {#if finalResult}
    <div class="final-result-box">
      <h2>Result</h2>
      <p>{finalResult}</p>
      <button type="button" class="button reset-button" on:click={resetForm}>START OVER</button>
    </div>
  {/if}
</form>

<style>
  /* Reusing styles from ProductForm via App.svelte global styles */
  /* Or add specific styles here if needed */
  .product-form fieldset {
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    padding: 1rem 1rem 0.5rem 1rem;
    margin: 0 0 1.5rem 0;
    position: relative;
  }

  .product-form legend {
    font-weight: normal;
    font-size: 0.75rem;
    color: #6c757d;
    padding: 0 0.5rem;
    margin: 0;
    position: absolute;
    top: -0.6em;
    left: 0.5rem;
    background-color: white;
    line-height: 1;
    display: inline;
    width: auto;
  }

  .radio-option {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .radio-option input[type="radio"] {
    margin-right: 0.5rem;
    accent-color: #d63384;
  }

  .radio-option label {
    cursor: pointer;
  }

  .button {
    font-family: inherit;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: 1px solid transparent;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .reset-button {
    border-color: #e9ecef;
    background-color: #f8f9fa;
    color: #6c757d;
    padding: 0.6rem 1.2rem;
  }

  .reset-button:hover {
    background-color: #e9ecef;
    border-color: #dee2e6;
    color: #495057;
  }
</style> 