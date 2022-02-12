<script>
    import { onMount } from "svelte";
    let query;
    let answer = "Answer will appear here";
    let isLoading = false;
    let isDarkTheme = false;

    onMount(() => {
        document.getElementById("query").focus();
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
                <i class="bx bxl-github" title="Toggle Theme" />
            </a>
            <!-- <i class={isDarkTheme ? "bx bx-sun" : "bx bx-moon"} /> -->
        </div>
    </nav>

    <div class="py-1">
        <h2 class="text-center" style="padding-bottom: .5rem;">EngineX</h2>
        <h6 class="text-center">Your OpenAI Assitant | Eric Echemane</h6>
    </div>

    <div class="py-1">
        <textarea
            class="m-auto w-full"
            name="query"
            id="query"
            rows="8"
            bind:value={query}
            placeholder="EngineX has answer for everything. Enter question or command here..."
        />
    </div>

    <div class="py-1">
        <textarea
            class="m-auto w-full"
            name="answer"
            id="answer"
            rows="8"
            bind:value={answer}
            disabled
        />
    </div>

    <div class="py-1">
        <button class="w-full" on:click={generateAnswer} disabled={isLoading}>
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
