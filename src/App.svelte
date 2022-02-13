<script>
    import commands from "./lib/commands";
    let query = "";
    let answer = "Answer will appear here";
    let isLoading = false;
    let currentCommand;
    let buttonTitle = "Generate Answer";
    let answered = false;

    $: if (currentCommand) {
        query = currentCommand.command;
        answered = false;
    }

    function handleChangeQuery(e) {
        answered = false;
        query = e.target.value;
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
            <i class="bx bxl-github" />
        </a>
    </nav>

    <div class="py-1">
        <h6 class="text-center">Your OpenAI Assistant | Eric Echemane</h6>
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
</style>
