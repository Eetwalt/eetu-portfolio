<script lang="ts">
  import { onMount } from "svelte";

  onMount (() => {
    let wrappers = document.querySelectorAll("#project-wrapper");
    wrappers.forEach(wrapper => {
        let nameTag = wrapper.querySelector("#nameTag") as HTMLElement;
        let typeTag = wrapper.querySelector("#typeTag") as HTMLElement;

        wrapper.addEventListener("mouseenter", hoverIn);
        wrapper.addEventListener("mouseleave", hoverOut);

        function hoverIn() {
          nameTag.classList.add("visible");
          typeTag.classList.add("visible");
        }

        function hoverOut() {
          nameTag.classList.remove("visible");
          typeTag.classList.remove("visible");
        }
    });
  });

  export let name:string, type:string;
  export let isActive: boolean;
</script>

<div id="typeTag" class="tag cc-project-type {isActive ? "visible" : ""}">{type}</div>
<div id="nameTag" class="tag cc-project-name {isActive ? "visible" : ""}">{name}</div>