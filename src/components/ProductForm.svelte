<script>
  // Remove SMUI imports
  // import Radio from '@smui/radio';
  // import FormField from '@smui/form-field';
  // import Button from '@smui/button';

  let feedActive = null;
  let dtcLinkActive = null;
  let clientProvideDtc = null;
  let feedAccess = null;
  let dtcLinkNoFeed = null;
  let finalResult = '';

  $: if (feedActive === 'yes') {
    if (dtcLinkActive === 'yes') {
      finalResult = 'Approved: Ops can begin campaign creation process!!';
    } else if (dtcLinkActive === 'no' && clientProvideDtc === 'yes') {
      finalResult = 'Alpha Dev Request for DTC Implementation: Engineering -> Ops can begin campaign creation process!!';
    } else if (dtcLinkActive === 'no' && clientProvideDtc === 'no') {
      finalResult = 'Offer Dynamic Non-Kerv Kart solution';
    } else {
      finalResult = '';
    }
  } else if (feedActive === 'no') {
    if (feedAccess === 'yes' && dtcLinkNoFeed === 'yes') {
      finalResult = 'Approved: Ops can begin campaign creation process!!';
    } else if (feedAccess === 'yes' && dtcLinkNoFeed === 'no') {
      finalResult = 'Offer Non-Kerv Kart Dynamic Solution';
    } else if (feedAccess === 'no' && dtcLinkNoFeed === 'yes') {
      finalResult = 'Offer DTC CTA for Non-Dynamic Solutions';
    } else if (feedAccess === 'no' && dtcLinkNoFeed === 'no') {
      finalResult = 'Offer standard Non-Dynamic Solution';
    } else {
      finalResult = '';
    }
  }

  function resetForm() {
    feedActive = dtcLinkActive = clientProvideDtc = feedAccess = dtcLinkNoFeed = null;
    finalResult = '';
  }
</script>

<form on:submit|preventDefault class="product-form">
  {#if feedActive === null}
    <fieldset>
      <legend>Do we have an Active Product Catalog Feed?</legend>
      <div class="radio-option">
        <input type="radio" bind:group={feedActive} value="yes" id="feedActiveYes" />
        <label for="feedActiveYes">Yes</label>
      </div>
      <div class="radio-option">
        <input type="radio" bind:group={feedActive} value="no" id="feedActiveNo" />
        <label for="feedActiveNo">No</label>
      </div>
    </fieldset>
  {:else if feedActive === 'yes' && dtcLinkActive === null}
    <fieldset>
      <legend>Do we have a Direct-to-Cart Sample link?</legend>
      <div class="radio-option">
        <input type="radio" bind:group={dtcLinkActive} value="yes" id="dtcLinkActiveYes" />
        <label for="dtcLinkActiveYes">Yes</label>
      </div>
      <div class="radio-option">
        <input type="radio" bind:group={dtcLinkActive} value="no" id="dtcLinkActiveNo" />
        <label for="dtcLinkActiveNo">No</label>
      </div>
    </fieldset>
  {:else if feedActive === 'yes' && dtcLinkActive === 'no' && clientProvideDtc === null}
    <fieldset>
       <legend>Is the Client able to provide Direct-to-Cart Sample Link?</legend>
      <div class="radio-option">
        <input type="radio" bind:group={clientProvideDtc} value="yes" id="clientProvideDtcYes" />
        <label for="clientProvideDtcYes">Yes</label>
      </div>
      <div class="radio-option">
        <input type="radio" bind:group={clientProvideDtc} value="no" id="clientProvideDtcNo" />
        <label for="clientProvideDtcNo">No</label>
      </div>
    </fieldset>
  {:else if feedActive === 'no' && feedAccess === null}
    <fieldset>
      <legend>Is the client able to provide access to Product Catalog Feed?</legend>
      <div class="radio-option">
        <input type="radio" bind:group={feedAccess} value="yes" id="feedAccessYes" />
        <label for="feedAccessYes">Yes</label>
      </div>
      <div class="radio-option">
        <input type="radio" bind:group={feedAccess} value="no" id="feedAccessNo" />
        <label for="feedAccessNo">No</label>
      </div>
    </fieldset>
  {:else if feedActive === 'no' && feedAccess !== null && dtcLinkNoFeed === null}
    <fieldset>
      <legend>Do we have a Direct-to-Cart Sample link?</legend>
      <div class="radio-option">
        <input type="radio" bind:group={dtcLinkNoFeed} value="yes" id="dtcLinkNoFeedYes" />
        <label for="dtcLinkNoFeedYes">Yes</label>
      </div>
      <div class="radio-option">
        <input type="radio" bind:group={dtcLinkNoFeed} value="no" id="dtcLinkNoFeedNo" />
        <label for="dtcLinkNoFeedNo">No</label>
      </div>
    </fieldset>
  {/if}

  {#if finalResult}
    <div class="final-result-box">
      <h2>Result</h2>
      <p>{finalResult}</p>
      <button type="button" class="button reset-button" on:click={resetForm}>START OVER</button>
    </div>
  {/if}
</form>

<style>
  /* Add some basic styling for the form elements */
  .product-form fieldset {
    border: 1px solid rgba(0, 0, 0, 0.23); /* Add MUI-like border */
    border-radius: 4px;
    padding: 1rem 1rem 0.5rem 1rem; /* Adjust padding */
    margin: 0 0 1.5rem 0;
    position: relative; /* For positioning legend */
  }

  .product-form legend {
    font-weight: normal; /* Match MUI label */
    font-size: 0.75rem; /* Smaller legend like MUI label */
    color: #6c757d; /* Grey legend text */
    padding: 0 0.5rem; /* Padding around legend */
    margin: 0; /* Reset margin */
    /* Positioning trick for label inside border */
    position: absolute;
    top: -0.6em;
    left: 0.5rem;
    background-color: white; /* Cover the border */
    line-height: 1;
    display: inline; /* override block */
    width: auto; /* override width */
  }

  .radio-option {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem; /* Increased spacing */
  }

  .radio-option input[type="radio"] {
    margin-right: 0.5rem;
    accent-color: #d63384; /* Use a pinkish accent similar to logo */
  }

  .radio-option label {
    cursor: pointer;
  }

  /* Update button styling to match reference */
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

  /* Style for the grey reset button */
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
