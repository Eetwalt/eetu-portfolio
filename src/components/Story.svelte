<script lang="ts">
    import { inview } from 'svelte-inview';
    import type { Options } from 'svelte-inview';

    const options: Options = {
        rootMargin: '-50px',
        unobserveOnEnter: true,
    };

    let heading1Opacity = 1;
    let heading2Opacity = 0;
    let heading3Opacity = 0;
    let isVisible1 = false;
    let isVisible2 = false;
    let isVisible3 = false;
    let phrase1 =`Born and raised in a small town called Kangasala, <b
          >Eetu had his sights set on becoming a volleyball sensation from
          a young age.</b
        > He started his journey as a setter and eventually transitioned
        into a spiker, making his way through the Finnish league and first
        division. His dream was to make it as a professional athlete
        overseas, and he poured his heart and soul into the sport.
        <b
          >Everything else in life took a back seat to his passion for
          sports</b
        >, even his high school graduation, which came fashionably late.
        Who needs good grades when you're planning to play volleyball
        until eternity, right? <br><br><br>
        As a talented and motivated athlete, eetu entered the Finnish
        league at the early age of 16. Living the life of a
        semi-professional athlete, juggling various side gigs on the side.

        <b>Adulthood and a regular job seemed like a distant future</b>;
        the athlete's career still had a glimmer of hope.`
        
    let phrase2 =`The seasons rolled on, and after a few heartbreakingly
        disappointing ones, <b
          >eetu was hit with a harsh reality check — he wasn't going to
          make it as a professional athlete.</b
        > This bitter pill to swallow left him with no Plan B, but
        fortunately, life had other plans in store for him. <br><br><br>
        Eetu decided to embark on a journey that took him from the courts
        to the classroom. <b
          >Enrolling in a college in Pietarsaari, he started his studies
          for a business degree</b
        >, initially finding them refreshing after his hiatus from high
        school. But it didn't take long for him to realize that this path
        wasn't his calling. Spending four years pursuing a degree without
        a clear direction wasn't something he wanted. <b
          >Eetu made a bold decision and dropped out after just one year.</b
        ><br><br><br>One of Eetu's <b
          >side gigs during his volleyball days was accounting, where his
          knack for organization and problem-solving shone.</b
        > He found beauty in transforming chaotic financial data into
        tidy, readable reports for entrepreneurs. Inspired by this
        experience,
        <b>Eetu decided to pursue an accounting degree.</b> With the
        skills honed during his side gigs, he swiftly earned his degree
        within a year and started working as a bookkeeper.<br><br><br>
        <b
          >While attending school, Eetu continued to nurture his creative
          side.</b
        > Graphic and web design, a passion he had cultivated since his
        early teens, provided <b
          >a perfect counterbalance to the systematic world of accounting.</b
        > But as the daily grind of accounting started to feel repetitive,
        Eetu began to dream of entrepreneurship. His interest in digital
        design and web development grew stronger, and he started to see a
        future in it. <b>Eetu dipped his toes into web development</b>
         using WordPress but felt limited by its constraints. Then, he
        stumbled upon <b
          >a game-changer for him — Webflow. With this tool, he felt only
          the sky was the limit,</b
        > and he dove headfirst into learning it, paving the way for a
        freelance career in web development.`

    let phrase3 = `Eetu took the leap, <b>launching his own business.</b> Initially,
        it was a side hustle while he continued his accounting work, but
        it wasn't long before his client base expanded, and <b
          >he was able to leave his day job behind. Turning his passion
          into a profession felt like a dream come true.</b
        ><br><br><br>
        A few years went by, and the <b
          >web design & development work remained fun and rewarding.</b
        > But as exhilarating as the freedom of setting his own hours and
        making all the decisions was, <b
          >Eetu began to yearn for collaboration and structure in his work
          life.</b
        > So, he set out to find other web agencies that could use his
        expertise. That's when he discovered <b
          >Kuasi, a Webflow development agency based in Turku, Finland.
          Eetu and Kuasi joined forces</b
        >, with him handling the development while they managed the
        rest—marketing, sales, design, and client communication. <b
          >This arrangement allowed Eetu to immerse himself in
          development, learning new tools and languages as projects grew
          in complexity.</b
        ><br><br><br>
        Today, eetu proudly calls himself <b
          >not just a Webflow developer, but a full-fledged web developer,
          primarily specializing in front-end development.</b
        > His journey with Webflow has deepened his understanding of HTML
        and CSS. Later, learning Java- and TypeScript alongside the Svelte
        framework has opened up a new universe of possibilities in the
        world of web development. Eetu is well-versed in GitHub, has
        crafted a couple of simple APIs using Cloudflare Workers, and has
        published sites using Astro. He has created simple web
        applications using low-code tools and enhanced their functionality
        with custom-written JavaScript.<br><br><br>
        <strong class="highlight"
          >Eetu's hunger for knowledge is insatiable, and he constantly
          strives to become an even better web developer. If you have a
          web development project in mind that needs a pair of
          professional hands, Eetu is your man.</strong
        >
        `
    
    let typedChar1 = "";
    let typedChar2 = "";
    let typedChar3 = "";
    let index1 = 0;
    let index2 = 0;
    let index3 = 0;
    let typewriter1: any;
    let typewriter2: any;
    let typewriter3: any;

    $: if (!phrase1) {
        typedChar1 = "";
        index1 = typedChar1.length;
    }

    $: if (!phrase2) {
        typedChar2 = "";
        index2 = typedChar2.length;
    }

    $: if (!phrase3) {
        typedChar3 = "";
        index3 = typedChar3.length;
    }

    const typeChar1 = () => {
        if (index1 < phrase1.length) {
        typedChar1 += phrase1[index1];
        index1 += 1;
        } else {
        stopTyping1();
        heading2Opacity = 1;
        console.log(heading2Opacity);
        startTyping2();
        }
    };

    const typeChar2 = () => {
        if (index2 < phrase2.length) {
        typedChar2 += phrase2[index2];
        index2 += 1;
        } else {
        stopTyping2();
        heading3Opacity = 1;
        console.log(heading3Opacity);
        startTyping3();
        }
    };

    const typeChar3 = () => {
        if (index3 < phrase3.length) {
        typedChar3 += phrase3[index3];
        index3 += 1;
        } else {
        stopTyping3();
        }
    };

    const startTyping1 = () => {isVisible1 = true; typewriter1 = setInterval(typeChar1, 20)};
    const startTyping2 = () => {
        isVisible2 = true; 
        setTimeout(() => {
            typewriter2 = setInterval(typeChar2, 20)
        }, 1000);
    };
    const startTyping3 = () => {
        isVisible3 = true; 
        setTimeout(() => {
            typewriter3 = setInterval(typeChar3, 20)
        }, 1000);
    };

    const stopTyping1 = () => clearInterval(typewriter1);
    const stopTyping2 = () => clearInterval(typewriter2);
    const stopTyping3 = () => clearInterval(typewriter3);

    const skipPhrase1 = () => {
        typedChar1 = phrase1; // Set typedChar1 to the complete phrase1
        stopTyping1(); // Stop the typing animation for phrase1
        heading2Opacity = 1;
        startTyping2(); // Start the typing animation for phrase2 immediately
    };

    const skipPhrase2 = () => {
        typedChar2 = phrase2; // Set typedChar2 to the complete phrase2
        stopTyping2(); // Stop the typing animation for phrase2
        heading3Opacity = 1;
        startTyping3(); // Start the typing animation for phrase3 immediately
    };

    const skipPhrase3 = () => {
        typedChar3 = phrase3; // Set typedChar3 to the complete phrase3
        stopTyping3(); // Stop the typing animation for phrase3
        // You can optionally handle what happens after phrase3 here
    };
</script>

<div class="about-content-wrapper is-right">
    <div class="story-section {isVisible1 ? 'visible' : ''}" id="teens" use:inview={options} on:inview_enter={() => startTyping1()}>
      <h3 class="h3 u-mb-1" style="opacity: {heading1Opacity}">
        teens <span class="eyebrow">2010-2015</span>
        <a href="#teens" class="skip-button" aria-label="skip" on:click={skipPhrase1} on:keypress={skipPhrase1}>skip</a>
      </h3>
      <p class="u-mb-3">{@html typedChar1}</p>
    </div>
    <div class="story-section {isVisible2 ? 'visible' : ''}" id="youngAdult">
      <h3 class="h3 u-mb-1" style="opacity: {heading2Opacity}">
        young adult <span class="eyebrow">2015-2020</span>
        <a href="#youngAdult" class="skip-button" aria-label="skip" on:click={skipPhrase2} on:keypress={skipPhrase2}>skip</a>
      </h3>
      <p class="u-text-justify u-mb-3">{@html typedChar2}</p>
    </div>
    <div class="story-section {isVisible3 ? 'visible' : ''}" id="adult">
      <h3 class="h3 u-mb-1" style="opacity: {heading3Opacity}">
        adult <span class="eyebrow">2020-present</span>
        <a href="#adult" class="skip-button" aria-label="skip" on:click={skipPhrase3} on:keypress={skipPhrase3}>skip</a>
      </h3>
      <p class="u-text-justify u-mb-3">{@html typedChar3}</p>
    </div>
</div>

<style>
    .h3 {
      transition: opacity 0.5s ease; /* Add a smooth transition effect */
    }

    .story-section {
        overflow: hidden; /* Hide overflowing content */
        max-height: 0; /* Initially hide the content */
        transition: max-height 0.5s ease; /* Apply a smooth transition to max-height */
    }
    
    .story-section.visible {
        max-height: 1200px; /* Set a maximum height to reveal the content smoothly */
    }
</style>