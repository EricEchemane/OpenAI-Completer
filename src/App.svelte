<script>
    import { onMount } from "svelte";
    import commands from "./lib/commands";
    let query = "";
    let answer = "Answer will appear here";
    let isLoading = false;
    let isDarkTheme = false;
    let currentCommand;

    $: if (currentCommand) {
        query = currentCommand.command;
    }

    function handleChangeQuery(e) {
        query = e.target.value;
    }

    onMount(() => {
        // document.getElementById("query").focus();
        isDarkTheme = localStorage.getItem("theme") === "dark";
    });

    async function generateAnswer() {
        isLoading = true;
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
    }
</script>

<main class="m-auto p-2" style="max-width: 700px;">
    <nav>
        <img id="logo" src="/favicon.png" alt="logo" />
        <div>
            <a
                title="Give a star"
                target="_blank"
                href="https://github.com/EricEchemane/OpenAI-Completer"
                icon
            >
                <i class="bx bxl-github" />
            </a>
            <!-- <i class={isDarkTheme ? "bx bx-sun" : "bx bx-moon"} /> -->
        </div>
    </nav>

    <div class="py-1">
        <h2 class="text-center" style="padding-bottom: .5rem;">EngineX</h2>
        <h6 class="text-center">Your OpenAI Assitant | Eric Echemane</h6>
    </div>

    <div class="py-1">
        <select
            name="commands"
            id="commands"
            class="w-full rounded"
            style="margin-bottom: 1rem;"
            bind:value={currentCommand}
        >
            <option hidden value={undefined}>Choose a command</option>
            {#each commands as command}
                <option value={command}> {command.command_name} </option>
            {/each}
        </select>

        {#if currentCommand}
            <div style="font-size: .8rem; padding: 1rem 0; line-height: 170%;">
                <em>Instruction:</em>
                {currentCommand.instruction} <br />
            </div>
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
        />
    </div>

    <div class="py-1">
        <textarea
            class="m-auto w-full rounded"
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
            class="w-full rounded"
            on:click={generateAnswer}
            disabled={isLoading}
        >
            {isLoading ? "Loading..." : "Generate Answer"}
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
    }
</style>
