<script>
  // Remove SMUI imports
  // import Radio from '@smui/radio';
  // import FormField from '@smui/form-field';
  // import Button from '@smui/button';

  // State variables for KERV Kart: Single Retailer
  let feedActive = null; // Q1
  let haveDtcLink = null; // Q2 (Yes Path)
  let clientProvideDtc = null; // Q3 (Yes Path -> No)
  let feedAccess = null; // Q4 (No Path)
  let clientProvideDtc_NoPath = null; // Q5 (No Path -> Yes)
  let haveDtcLink_NoPath = null; // Q6 (No Path -> No)
  let finalResult = '';

  // Reactive logic for KERV Kart: Single Retailer
  $: {
    if (feedActive === 'yes') {
      if (haveDtcLink === 'yes') {
        finalResult = 'Approved: Ops can begin campaign creative process';
      } else if (haveDtcLink === 'no') {
        if (clientProvideDtc === 'yes') {
          finalResult = 'Approved: Dev DTC Implementation onboarding required -> Ops can begin campaign creation process'; // Adjusted text slightly for flow
        } else if (clientProvideDtc === 'no') {
          finalResult = 'Offer Dynamic Non-KERV Kart Solution';
        } else {
          finalResult = ''; // Waiting for Q3
        }
      } else {
        finalResult = ''; // Waiting for Q2
      }
    } else if (feedActive === 'no') {
      if (feedAccess === 'yes') {
        if (clientProvideDtc_NoPath === 'yes') {
           finalResult = 'Approved: Ops can begin campaign creative process'; // Q5=Yes
        } else if (clientProvideDtc_NoPath === 'no'){
            finalResult = 'Offer Non-KERV Kart Dynamic Solution'; // Q5=No
        } else {
             finalResult = ''; // Waiting for Q5
        }
      } else if (feedAccess === 'no') {
        if (haveDtcLink_NoPath === 'yes') {
          finalResult = 'Approved: Offer DTC CTA for Non-Dynamic Solutions'; // Q6=Yes - added Approved
        } else if (haveDtcLink_NoPath === 'no') {
          finalResult = 'Offer standard Non-Dynamic Solution'; // Q6=No
        } else {
           finalResult = ''; // Waiting for Q6
        }
      } else {
        finalResult = ''; // Waiting for Q4
      }
    } else {
      finalResult = ''; // Waiting for Q1
    }
  }

  function resetForm() {
    feedActive = haveDtcLink = clientProvideDtc = feedAccess = clientProvideDtc_NoPath = haveDtcLink_NoPath = null;
    finalResult = '';
  }
</script>

<form on:submit|preventDefault class="product-form">
  <!-- Q1 -->
  {#if feedActive === null}
    <fieldset>
      <legend>Do we have an Active Product Catalog Feed?</legend> <!-- Exact Text -->
      <div class="radio-option">
        <input type="radio" bind:group={feedActive} value="yes" id="srFeedActiveYes" />
        <label for="srFeedActiveYes">Yes</label>
      </div>
      <div class="radio-option">
        <input type="radio" bind:group={feedActive} value="no" id="srFeedActiveNo" />
        <label for="srFeedActiveNo">No</label>
      </div>
    </fieldset>
  {/if}

  <!-- Path A: feedActive = yes -->
  {#if feedActive === 'yes'}
    <!-- Q2 -->
    {#if haveDtcLink === null}
      <fieldset>
        <legend>Do we have a Direct-to-Cart Sample Link?</legend> <!-- Exact Text -->
        <div class="radio-option">
          <input type="radio" bind:group={haveDtcLink} value="yes" id="srHaveDtcYes" />
          <label for="srHaveDtcYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={haveDtcLink} value="no" id="srHaveDtcNo" />
          <label for="srHaveDtcNo">No</label>
        </div>
      </fieldset>
    {/if}

    <!-- Q3 -->
    {#if haveDtcLink === 'no' && clientProvideDtc === null}
      <fieldset>
        <legend>Is the Client able to provide a Direct-to-Cart Sample Link?</legend> <!-- Exact Text -->
        <div class="radio-option">
          <input type="radio" bind:group={clientProvideDtc} value="yes" id="srProvideDtcYes" />
          <label for="srProvideDtcYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={clientProvideDtc} value="no" id="srProvideDtcNo" />
          <label for="srProvideDtcNo">No</label>
        </div>
      </fieldset>
    {/if}
  {/if}

  <!-- Path B: feedActive = no -->
  {#if feedActive === 'no'}
    <!-- Q4 -->
    {#if feedAccess === null}
      <fieldset>
        <legend>Is the client able to provide access to a Product Catalog Feed?</legend> <!-- Exact Text -->
        <div class="radio-option">
          <input type="radio" bind:group={feedAccess} value="yes" id="srFeedAccessYes" />
          <label for="srFeedAccessYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={feedAccess} value="no" id="srFeedAccessNo" />
          <label for="srFeedAccessNo">No</label>
        </div>
      </fieldset>
    {/if}

    <!-- Q5 -->
    {#if feedAccess === 'yes' && clientProvideDtc_NoPath === null}
      <fieldset>
        <legend>Is the Client able to provide a Direct-to-Cart Sample Link</legend> <!-- Exact Text -->
        <div class="radio-option">
          <input type="radio" bind:group={clientProvideDtc_NoPath} value="yes" id="srProvideDtcNoPathYes" />
          <label for="srProvideDtcNoPathYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={clientProvideDtc_NoPath} value="no" id="srProvideDtcNoPathNo" />
          <label for="srProvideDtcNoPathNo">No</label>
        </div>
      </fieldset>
    {/if}

    <!-- Q6 -->
    {#if feedAccess === 'no' && haveDtcLink_NoPath === null}
      <fieldset>
        <legend>Do we have a Direct-to-Cart Sample Link?</legend> <!-- Exact Text -->
        <div class="radio-option">
          <input type="radio" bind:group={haveDtcLink_NoPath} value="yes" id="srHaveDtcNoPathYes" />
          <label for="srHaveDtcNoPathYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={haveDtcLink_NoPath} value="no" id="srHaveDtcNoPathNo" />
          <label for="srHaveDtcNoPathNo">No</label>
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
