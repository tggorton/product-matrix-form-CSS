<script>
  // State variables for KERV Kart: Multi-Retailer
  let allFeedsActive = null; // Q1
  let haveDtcEachRetailer = null; // Q2 (Yes Path)
  let clientProvideMissingDtcEach = null; // Q3 (Yes Path -> No)
  let anyDtcLinksAvailable = null; // Q7 (Yes Path -> No -> No)

  // No Path variables
  let clientProvideAccessFeedsEach = null; // Q4a
  let haveDtcEach_NoPath_Yes = null; // Q4a=Yes -> Q?
  let provideDtcEach_NoPath_Yes_No = null; // Q4a=Yes -> Q?=No -> Q?
  let provideAnyDtc_NoPath_Yes_No_No = null; // Q4a=Yes -> Q?=No -> Q?=No -> Q?

  let clientProvideAccessAnyFeeds = null; // Q4b (Follows Q4a=No)
  let clientAbleProvideDtcSample_NoPath_No_Yes = null; // Q5 (Follows Q4b=Yes)
  let clientAbleProvideDtcSample_NoPath_No_No = null; // Q6 (Follows Q4b=No)

  let finalResult = '';

  // Reactive logic for KERV Kart: Multi-Retailer (Revised Completely)
  $: {
    if (allFeedsActive === 'yes') {
      // Path A
      if (haveDtcEachRetailer === 'yes') {
        finalResult = 'Approved: Ops can begin campaign creation process';
      } else if (haveDtcEachRetailer === 'no') {
        if (clientProvideMissingDtcEach === 'yes') {
          finalResult = 'Approved: Dev DTC Implementations onboarding required -> Ops can begin campaign creation process';
        } else if (clientProvideMissingDtcEach === 'no') {
          if (anyDtcLinksAvailable === 'yes') {
            finalResult = 'Offer Single Retailer KERV Kart Solution & Dynamic Non-DTC Solution -> Ops can begin campaign creation process'; // Simplified result based on text
          } else if (anyDtcLinksAvailable === 'no') {
            finalResult = 'Offer Dynamic Non-DTC Solution';
          } else {
            finalResult = ''; // Waiting for Q7
          }
        } else {
          finalResult = ''; // Waiting for Q3
        }
      } else {
        finalResult = ''; // Waiting for Q2
      }
    } else if (allFeedsActive === 'no') {
      // Path B
      if (clientProvideAccessFeedsEach === 'yes') {
         // Path B.1
         if (haveDtcEach_NoPath_Yes === 'yes') {
             finalResult = 'Approved: Ops can begin campaign creation process';
         } else if (haveDtcEach_NoPath_Yes === 'no') {
             if (provideDtcEach_NoPath_Yes_No === 'yes') {
                 finalResult = 'Approved: Ops can begin campaign creation process';
             } else if (provideDtcEach_NoPath_Yes_No === 'no') {
                 if (provideAnyDtc_NoPath_Yes_No_No === 'yes') {
                     finalResult = 'Offer Single Retailer KERV Kart Solution & Dynamic Non-DTC Solution for retailers we are unable to get DTC Sample Links for';
                 } else if (provideAnyDtc_NoPath_Yes_No_No === 'no') {
                     finalResult = 'Offer Dynamic Non-DTC Solution';
                 } else {
                     finalResult = ''; // Waiting for provideAnyDtc_NoPath_Yes_No_No
                 }
             } else {
                 finalResult = ''; // Waiting for provideDtcEach_NoPath_Yes_No
             }
         } else {
             finalResult = ''; // Waiting for haveDtcEach_NoPath_Yes
         }
      } else if (clientProvideAccessFeedsEach === 'no'){
          // Path B.2
          if (clientProvideAccessAnyFeeds === 'yes') {
              if (clientAbleProvideDtcSample_NoPath_No_Yes === 'yes'){
                  finalResult = 'Offer Single Retailer KERV Kart Solution';
              } else if (clientAbleProvideDtcSample_NoPath_No_Yes === 'no') {
                  finalResult = 'Offer Dynamic Non-DTC Solution';
              } else {
                  finalResult = ''; // Waiting for clientAbleProvideDtcSample_NoPath_No_Yes
              }
          } else if (clientProvideAccessAnyFeeds === 'no'){
              if (clientAbleProvideDtcSample_NoPath_No_No === 'yes') {
                  finalResult = 'Offer DTC CTA for Non Dynamic Solutions';
              } else if (clientAbleProvideDtcSample_NoPath_No_No === 'no') {
                  finalResult = 'Offer Standard Non-Dynamic Solution';
              } else {
                   finalResult = ''; // Waiting for clientAbleProvideDtcSample_NoPath_No_No
              }
          } else {
              finalResult = ''; // Waiting for clientProvideAccessAnyFeeds
          }
      } else {
          finalResult = ''; // Waiting for clientProvideAccessFeedsEach (Q4a)
      }
    } else {
      finalResult = ''; // Waiting for Q1
    }
  }

  function resetForm() {
    allFeedsActive = haveDtcEachRetailer = clientProvideMissingDtcEach = anyDtcLinksAvailable = null;
    clientProvideAccessFeedsEach = haveDtcEach_NoPath_Yes = provideDtcEach_NoPath_Yes_No = provideAnyDtc_NoPath_Yes_No_No = null;
    clientProvideAccessAnyFeeds = clientAbleProvideDtcSample_NoPath_No_Yes = clientAbleProvideDtcSample_NoPath_No_No = null;
    finalResult = '';
  }
</script>

<form on:submit|preventDefault class="product-form">
  <!-- Q1 -->
  {#if allFeedsActive === null}
    <fieldset>
      <legend>Are all of the Product Catalog Feeds Active?</legend> <!-- Exact Text -->
      <div class="radio-option">
        <input type="radio" bind:group={allFeedsActive} value="yes" id="mrFeedsActiveYes" />
        <label for="mrFeedsActiveYes">Yes</label>
      </div>
      <div class="radio-option">
        <input type="radio" bind:group={allFeedsActive} value="no" id="mrFeedsActiveNo" />
        <label for="mrFeedsActiveNo">No</label>
      </div>
    </fieldset>
  {/if}

  <!-- Path A: allFeedsActive = yes -->
  {#if allFeedsActive === 'yes'}
    <!-- Q2 -->
    {#if haveDtcEachRetailer === null}
      <fieldset>
        <legend>Do we have a sample Direct-to-Cart Sample Link for each retailer</legend> <!-- Exact Text -->
        <div class="radio-option">
          <input type="radio" bind:group={haveDtcEachRetailer} value="yes" id="mrDtcLinksYes" />
          <label for="mrDtcLinksYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={haveDtcEachRetailer} value="no" id="mrDtcLinksNo" />
          <label for="mrDtcLinksNo">No</label>
        </div>
      </fieldset>
    {/if}

    <!-- Q3 -->
    {#if haveDtcEachRetailer === 'no' && clientProvideMissingDtcEach === null}
      <fieldset>
        <legend>Is the client able to provide a Direct-to-Cart Sample Link for each missing retailer?</legend> <!-- Exact Text -->
        <div class="radio-option">
          <input type="radio" bind:group={clientProvideMissingDtcEach} value="yes" id="mrProvideMissingDtcYes" />
          <label for="mrProvideMissingDtcYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={clientProvideMissingDtcEach} value="no" id="mrProvideMissingDtcNo" />
          <label for="mrProvideMissingDtcNo">No</label>
        </div>
      </fieldset>
    {/if}

    <!-- Q7 -->
    {#if haveDtcEachRetailer === 'no' && clientProvideMissingDtcEach === 'no' && anyDtcLinksAvailable === null}
      <fieldset>
        <legend>Are any Direct-to-Cart Links available?</legend> <!-- Exact Text -->
        <div class="radio-option">
          <input type="radio" bind:group={anyDtcLinksAvailable} value="yes" id="mrAnyDtcYes" />
          <label for="mrAnyDtcYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={anyDtcLinksAvailable} value="no" id="mrAnyDtcNo" />
          <label for="mrAnyDtcNo">No</label>
        </div>
      </fieldset>
    {/if}
  {/if}

  <!-- Path B: allFeedsActive = no -->
  {#if allFeedsActive === 'no'}
    <!-- Q4a -->
    {#if clientProvideAccessFeedsEach === null}
      <fieldset>
        <legend>Is the Client able to provide access to Product Catalog Feeds for each Retailer?</legend> <!-- Exact Text -->
        <div class="radio-option">
          <input type="radio" bind:group={clientProvideAccessFeedsEach} value="yes" id="mrProvideAccessEachYes" />
          <label for="mrProvideAccessEachYes">Yes</label>
        </div>
        <div class="radio-option">
          <input type="radio" bind:group={clientProvideAccessFeedsEach} value="no" id="mrProvideAccessEachNo" />
          <label for="mrProvideAccessEachNo">No</label>
        </div>
      </fieldset>
    {/if}

    <!-- Path B.1: Q4a = Yes -->
    {#if clientProvideAccessFeedsEach === 'yes'}
        {#if haveDtcEach_NoPath_Yes === null}
            <fieldset>
              <legend>Do we have a Direct-to-Cart Sample Link for each Retailer?</legend> <!-- Exact Text -->
              <div class="radio-option">
                <input type="radio" bind:group={haveDtcEach_NoPath_Yes} value="yes" id="mrB1HaveDtcYes" />
                <label for="mrB1HaveDtcYes">Yes</label>
              </div>
              <div class="radio-option">
                <input type="radio" bind:group={haveDtcEach_NoPath_Yes} value="no" id="mrB1HaveDtcNo" />
                <label for="mrB1HaveDtcNo">No</label>
              </div>
            </fieldset>
        {/if}
        {#if haveDtcEach_NoPath_Yes === 'no' && provideDtcEach_NoPath_Yes_No === null}
             <fieldset>
              <legend>Is the Client able to provide Direct-to-Cart Sample Links for each Retailer?</legend> <!-- Exact Text -->
              <div class="radio-option">
                <input type="radio" bind:group={provideDtcEach_NoPath_Yes_No} value="yes" id="mrB1ProvideDtcYes" />
                <label for="mrB1ProvideDtcYes">Yes</label>
              </div>
              <div class="radio-option">
                <input type="radio" bind:group={provideDtcEach_NoPath_Yes_No} value="no" id="mrB1ProvideDtcNo" />
                <label for="mrB1ProvideDtcNo">No</label>
              </div>
            </fieldset>
        {/if}
        {#if haveDtcEach_NoPath_Yes === 'no' && provideDtcEach_NoPath_Yes_No === 'no' && provideAnyDtc_NoPath_Yes_No_No === null}
            <fieldset>
              <legend>Is the client able to provide Direct-to-Cart Sample Links for any Retailer?</legend> <!-- Exact Text -->
              <div class="radio-option">
                <input type="radio" bind:group={provideAnyDtc_NoPath_Yes_No_No} value="yes" id="mrB1ProvideAnyYes" />
                <label for="mrB1ProvideAnyYes">Yes</label>
              </div>
              <div class="radio-option">
                <input type="radio" bind:group={provideAnyDtc_NoPath_Yes_No_No} value="no" id="mrB1ProvideAnyNo" />
                <label for="mrB1ProvideAnyNo">No</label>
              </div>
            </fieldset>
        {/if}
    {/if}

    <!-- Path B.2: Q4a = No -->
    {#if clientProvideAccessFeedsEach === 'no'}
        <!-- Q4b -->
        {#if clientProvideAccessAnyFeeds === null}
             <fieldset>
              <legend>Is the client able to provide access to any Product Catalog Feeds for the proposed Retailers?</legend> <!-- Exact Text -->
              <div class="radio-option">
                <input type="radio" bind:group={clientProvideAccessAnyFeeds} value="yes" id="mrProvideAccessAnyYes" />
                <label for="mrProvideAccessAnyYes">Yes</label>
              </div>
              <div class="radio-option">
                <input type="radio" bind:group={clientProvideAccessAnyFeeds} value="no" id="mrProvideAccessAnyNo" />
                <label for="mrProvideAccessAnyNo">No</label>
              </div>
            </fieldset>
        {/if}
        <!-- Q5 -->
        {#if clientProvideAccessAnyFeeds === 'yes' && clientAbleProvideDtcSample_NoPath_No_Yes === null}
            <fieldset>
              <legend>Is the client able to Direct-to-Cart Sample Links?</legend> <!-- Exact Text -->
              <div class="radio-option">
                <input type="radio" bind:group={clientAbleProvideDtcSample_NoPath_No_Yes} value="yes" id="mrB2ProvideDtcYes" />
                <label for="mrB2ProvideDtcYes">Yes</label>
              </div>
              <div class="radio-option">
                <input type="radio" bind:group={clientAbleProvideDtcSample_NoPath_No_Yes} value="no" id="mrB2ProvideDtcNo" />
                <label for="mrB2ProvideDtcNo">No</label>
              </div>
            </fieldset>
        {/if}
         <!-- Q6 -->
         {#if clientProvideAccessAnyFeeds === 'no' && clientAbleProvideDtcSample_NoPath_No_No === null}
             <fieldset>
              <legend>Is the Client able to provide Direct-to-Cart Sample Links?</legend> <!-- Exact Text -->
              <div class="radio-option">
                <input type="radio" bind:group={clientAbleProvideDtcSample_NoPath_No_No} value="yes" id="mrB2NoAccessProvideDtcYes" />
                <label for="mrB2NoAccessProvideDtcYes">Yes</label>
              </div>
              <div class="radio-option">
                <input type="radio" bind:group={clientAbleProvideDtcSample_NoPath_No_No} value="no" id="mrB2NoAccessProvideDtcNo" />
                <label for="mrB2NoAccessProvideDtcNo">No</label>
              </div>
            </fieldset>
         {/if}
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