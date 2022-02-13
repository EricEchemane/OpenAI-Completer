<script>
    import { fade } from "svelte/transition";

    import CommandOptions from "./components/commands.svelte";

    let query = "";
    let answer = "Answer will appear here";
    let isLoading = false;
    let currentCommand;
    let buttonTitle = "Generate Answer";
    let answered = false;
    let commandOptionsIsShown = false;

    $: if (currentCommand) {
        query = currentCommand.command;
        answered = false;
    }

    function handleChangeQuery(e) {
        answered = false;
        query = e.target.value;
    }

    function clearAnswer() {
        answer = "Answer will appear here";
    }

    function toggleCommandOptions() {
        commandOptionsIsShown = !commandOptionsIsShown;
    }

    function changeCurrentCommand(newCommand) {
        currentCommand = newCommand;
        query = currentCommand.command;
        answered = false;
        commandOptionsIsShown = false;
        clearAnswer();
    }

    async function generateAnswer() {
        answered = false;
        isLoading = true;
        buttonTitle = "Engine started...";
        const url = "https://ees-openai-completer.herokuapp.com/complete";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
            }),
        });
        const data = await response.json();
        answer = data.choices[0].text.substring(2);
        isLoading = false;
        buttonTitle = "Generate Answer";
        answered = true;
    }
</script>

{#if commandOptionsIsShown}
    <CommandOptions {changeCurrentCommand} />
{/if}
{#if commandOptionsIsShown}
    <div
        id="dimmer"
        transition:fade={{ duration: 150 }}
        on:click={() => (commandOptionsIsShown = false)}
    />
{/if}

<main class="m-auto p-2" style="max-width: 700px;">
    <nav>
        <img id="logo" src="/favicon.png" alt="logo" />
        <h2 class="text-center">EngineX</h2>
        <a
            title="Give a star"
            target="_blank"
            href="https://github.com/EricEchemane/OpenAI-Completer"
            icon
        >
            <i class="bx bxl-github" id="github-icon" />
        </a>
    </nav>

    <div class="py-1">
        <h6 class="text-center">Your OpenAI Assistant | Eric Echemane</h6>
    </div>

    <div class="py-1">
        <div id="select" on:click={toggleCommandOptions}>
            <span>Choose command </span><i class="bx bx-chevron-down" />
        </div>

        {#if currentCommand}
            <p style="font-size: .8rem; padding: 1rem 0; line-height: 170%;">
                <em>Instruction:</em>
                {currentCommand.instruction} <br />
            </p>
        {/if}

        <textarea
            class="m-auto w-full rounded"
            name="query"
            id="query"
            autoresize
            value={query}
            style="font-size: .8rem;"
            on:input={handleChangeQuery}
            placeholder="EngineX has answer for everything. Enter a command/question or choose commands from above."
            on:keydown={(e) => {
                if (e.key === "Enter" && e.ctrlKey == true) {
                    generateAnswer();
                }
            }}
        />
    </div>

    <div class="py-1">
        <textarea
            class={"m-auto w-full rounded" + (answered ? " engine" : "")}
            style="font-size: .8rem;"
            name="answer"
            id="answer"
            bind:value={answer}
            disabled
            autoresize
        />
    </div>

    <div class="py-1">
        <button
            class="w-full rounded engine"
            on:click={generateAnswer}
            disabled={isLoading || query === ""}
        >
            {buttonTitle}
        </button>
    </div>
</main>

<style>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #logo {
        width: 30px;
        height: 30px;
        filter: invert(100%);
    }
    #select {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 1px solid hsla(0, 0%, 100%, 0.3);
        font-size: 0.8rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        transition: 200ms;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #select:hover {
        border: 1px solid hsla(0, 0%, 100%, 0.5);
    }
    #dimmer {
        background-color: hsla(0, 0%, 100%, 0.1);
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 9;
    }
</style>
