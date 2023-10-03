<script lang="ts">
    import { tweened } from 'svelte/motion'
    import { cubicIn } from 'svelte/easing';
    import { inview } from 'svelte-inview';
    import type { Options } from 'svelte-inview';

    let number1 = 0;
    let number2 = 0;
    let number3 = 0;
    let number4 = 0;

    let currentNumber1Value = tweened(number1, {
        duration: 2000,
        easing: cubicIn
    });

    let currentNumber2Value = tweened(number2, {
        duration: 2000,
        easing: cubicIn,
        delay: 2000,
    });

    let currentNumber3Value = tweened(number3, {
        duration: 2000,
        easing: cubicIn,
        delay: 4000,
    });

    let currentNumber4Value = tweened(number4, {
        duration: 2000,
        easing: cubicIn,
        delay: 6000,
    });

    function addToNumbers() {
        $currentNumber1Value += 3
        $currentNumber2Value += 30
        $currentNumber3Value += 100
        $currentNumber4Value += 9000
    }

    const options: Options = {
        rootMargin: '-50px',
        unobserveOnEnter: true,
    };

    export let wrapperClasses: any;
    export let statboxClass: any;

</script>

<div use:inview={options} on:inview_enter={() => addToNumbers()}>
    <div class="row row-no-gutters" id="numbers">
        <div class={`col u-mb-0 col-no-gutters ${wrapperClasses}`}>
        <div class={`stat-box ${statboxClass}`}>
            <p class="stat-heading">Year in the business:</p>
            <p class="stat-number" id="num1">
                {Math.trunc($currentNumber1Value)}+
            </p>
        </div>
        </div>
        <div class={`col u-mb-0 col-no-gutters ${wrapperClasses}`}>  
        <div class={`stat-box ${statboxClass}`}>
            <p class="stat-heading">Developed websites:</p>
            <p class="stat-number" id="num2">{Math.trunc($currentNumber2Value)}+</p>
        </div>
        </div>
        <div class={`col u-mb-0 col-no-gutters ${wrapperClasses}`}>
        <div class={`stat-box ${statboxClass}`}>
            <p class="stat-heading">Happy clients:</p>
            <p class="stat-number" id="num3">{Math.trunc($currentNumber3Value)}%</p>
        </div>
        </div>
        <div class={`col u-mb-0 col-no-gutters ${wrapperClasses}`}>
        <div class={`stat-box ${statboxClass}`}>
            <p class="stat-heading">Motivation level:</p>
            <p class="stat-number" id="num4">{Math.trunc($currentNumber4Value)}+</p>
        </div>
        </div>
    </div>
</div>