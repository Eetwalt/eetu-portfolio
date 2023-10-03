<script>
    import WorkTags from './WorksTags.svelte';
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';

    export let works;

    let currentActiveSlide = 0;
    function handleSlideMove(e) {
        currentActiveSlide = e.detail.index;
    }

</script>


<Splide
    options={{
        speed: 2000,
        type: 'loop',
        autoplay: true,
        interval: 4000,
        easing: "ease",
        height: '50vh',
        padding: '20%',
        pagination: false,
        breakpoints: {
            640: {
                padding: '10%',
            },
        }
    }}
    on:move={handleSlideMove}
>
    {#each works as work, index}
        <SplideSlide class="image-wrapper cc-projects">
            <a
            id="project-wrapper" href={'/works/' + work.slug} 
            >
                <img 
                    src={work.image.url} loading="lazy" 
                    srcset={`${work.image.url} 500w, ${work.image.url} 800w, ${work.image.url} 1080w, ${work.image.url} 1600w, ${work.image.url} 1920w`} 
                    alt={work.altText} 
                    class="full-image cc-project {index === currentActiveSlide ? "is-focused" : ""}"
                />
                <div id="tagsWrapper" class="tags-wrapper">
                    <WorkTags name={work.name} type={work.type} isActive={index === currentActiveSlide ? true : false}/>
                </div>
            </a>
        </SplideSlide>
    {/each}
</Splide>