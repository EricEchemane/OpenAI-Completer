<script>
    export let changeCurrentCommand;
    import { slide } from "svelte/transition";
    import commands from "../lib/commands";
</script>

<main
    area-label="command options"
    id="command-options"
    transition:slide={{ duration: 150 }}
>
    {#each commands as command}
        <div
            class="option"
            role="option"
            on:click={() => changeCurrentCommand(command)}
        >
            {@html command.icon}
            {command.command_name}
        </div>
    {/each}
</main>

<style>
    main {
        background: conic-gradient(
            from 147.14deg at 50% 50%,
            hsl(205, 97%, 5%) -55.68deg,
            hsl(354, 97%, 5%) 113.23deg,
            hsl(266, 97%, 5%) 195deg,
            hsl(205, 97%, 5%) 304.32deg,
            hsl(354, 97%, 5%) 473.23deg
        );
        backdrop-filter: blur(30px);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        border: 1px solid hsla(0, 0%, 100%, 0.5);
        border-radius: 5px;
        width: max-content;
        font-size: 0.8rem;
        overflow: hidden;
    }
    .option {
        color: hsl(0, 0%, 80%);
        padding: 0.5rem;
        padding-right: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }
    .option:hover {
        backdrop-filter: brightness(1.5);
    }
</style>
