<script>
    import { fade } from "svelte/transition";

    import CommandOptions from "./components/commands.svelte";
    import Disclaimer from "./components/disclaimer.svelte";

    let query = "";
    let answer = "Answer will appear here";
    let isLoading = false;
    let currentCommand;
    let buttonTitle = "Enter a command first";
    let answered = false;
    let commandOptionsIsShown = false;
    let disclaimerIsShown = true;

    $: if (currentCommand) {
        query = currentCommand.command;
        answered = false;
    }

    $: if (query.length > 5) {
        buttonTitle = "Generate answer";
    }

    function handleChangeQuery(e) {
        answered = false;
        query = e.target.value;
    }

    const clearAnswer = () => (answer = "Answer will appear here");

    const toggleCommandOptions = () =>
        (commandOptionsIsShown = !commandOptionsIsShown);

    const closeDisclaimer = () => (disclaimerIsShown = false);

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
        document.getElementById("generate-button").classList.remove("error");
        document
            .getElementById("generate-button")
            .classList.add("fade-animate");
        const url = "https://ees-openai-completer.herokuapp.com/complete";

        try {
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
            buttonTitle = "Generate Answer";
            answered = true;
        } catch (error) {
            buttonTitle = "Error: API key overused";
            document.getElementById("generate-button").classList.add("error");
        }
        isLoading = false;
        document
            .getElementById("generate-button")
            .classList.remove("fade-animate");
    }
</script>

{#if commandOptionsIsShown}
    <CommandOptions {changeCurrentCommand} />
{/if}
{#if disclaimerIsShown}
    <Disclaimer close={closeDisclaimer} />
{/if}
{#if commandOptionsIsShown || disclaimerIsShown}
    <div
        id="dimmer"
        transition:fade={{ duration: 150 }}
        on:click={() => {
            commandOptionsIsShown = false;
        }}
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

    <button
        class="rounded engine"
        on:click={generateAnswer}
        id="generate-button"
        disabled={isLoading || query === ""}
    >
        {buttonTitle}
    </button>

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
        background-color: hsla(0, 0%, 0%, 0.5);
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 9;
        box-shadow: 0px 0px 7px rgba(0, 0, 0, 1);
        backdrop-filter: blur(1px);
    }
</style>
