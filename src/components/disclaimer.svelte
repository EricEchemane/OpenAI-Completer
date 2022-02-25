<script>
    export let close;
    import { slide } from "svelte/transition";
</script>

<main transition:slide={{ duration: 128 }}>
    <h4 class="text-center" style="margin-bottom: 1rem;">IMPORTANT</h4>
    <p class="text-center" style="line-height: 190%;">
        This application uses an OpenAI free trial. If this application starts
        to fail, it is likely due to the API key being overused. In that case,
        please contact the developer if you have something to help.
        <!-- Due to exceedance of API calls, this application is currently unavailable. -->
    </p>
    <hr />
    <button on:click={close}> I understand </button>
</main>

<style>
    button:hover {
        background-color: hsla(0, 0%, 100%, 0.1);
    }
    button:active {
        background-color: hsla(0, 0%, 100%, 0.2);
    }
    button {
        cursor: pointer;
        background-color: transparent;
        color: dodgerblue !important;
        width: 100%;
        text-align: center;
        border-radius: 0.3rem;
        font-size: 0.8rem;
        font-weight: 600;
        transition: 100ms;
    }
    hr {
        opacity: 0.1;
        margin: 0.5rem 0;
    }
    main {
        background: linear-gradient(
            135deg,
            hsl(235, 92%, 5%),
            hsl(326, 92%, 5%)
        );
        backdrop-filter: blur(30px);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        border: 1px solid hsla(0, 0%, 100%, 0.5);
        border-radius: 9px;
        width: min(500px, 80vw);
        font-size: 0.9rem;
        overflow: hidden;
        padding: 1.5rem;
    }
</style>
