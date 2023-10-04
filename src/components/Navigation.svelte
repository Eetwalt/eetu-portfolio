<script lang="ts">
  import { isNavOpen } from '../navStore';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  function updateNavState () {
    isNavOpen.set(window.innerWidth > 991);
  }

  window.addEventListener('resize', updateNavState);

  updateNavState();
</script>

<div style="pointer-events: none;" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="top-nav w-nav">
    <div class="custom-container">
      <div class="row row-justify-between">
        <div class="col col-shrink u-mb-0">
            <!-- svelte-ignore a11y-no-redundant-roles -->
            {#if $isNavOpen}
            <nav style="pointer-events: all" id="nav-menu" role="navigation" class="nav-menu" transition:fly={{ duration: 600, x: 300, opacity: 0.5, easing: quintOut }}>
              <div class="navigation-logo-wrapper">
                <img src="../images/white-icon.svg" loading="lazy" alt="Eetu Rantanen logo" class="full-image cc-contain cc-nav-logo"></div>
              <div class="nav-border"></div>
              <a href="/" class="nav-link w-nav-link">Home</a>
              <div class="nav-border"></div>
              <a href="/work" class="nav-link w-nav-link">work</a>
              <div class="nav-border"></div>
              <a href="/about" class="nav-link w-nav-link">About</a>
              <div class="nav-border"></div>
              <a href="/blog" class="nav-link is-last w-nav-link">blog</a>
            </nav>
            {/if}
        </div>
        <div style="pointer-events: all" class="col col-shrink u-mb-0">
          <button id="menu-button" class="menu-button w-nav-button" on:click={() => isNavOpen.set(!$isNavOpen)}>
            <div class="w-icon-nav-menu"></div>
          </button>
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a href="/contact" class="btn cc-secondary cc-nav w-inline-block">
            <div>Contact</div>
          </a>
        </div>
      </div>
    </div>
</div>