const commands = [
    {
        command_name: "Basic question",
        instruction: "Replace the question below ending with a question mark (?)",
        command: "Who was president of the United States in 1955?",
    },
    {
        command_name: "Grammar correction",
        instruction: "Replace the sentence on the 3rd line.",
        command: "Correct this to standard English:\n\nI hungry on today",
    },
    {
        command_name: "Summarize for a grade student",
        instruction: "Replace the sentence on the 3rd line.",
        command: "Summarize this for a second-grade student:\n\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history.",
    },
    {
        command_name: "English to other language",
        instruction: "Replace the language on the 1st line and the word or phrase you want to be translated on the 3rd line.",
        command: "Translate this into Filipino.\n\nI am hungry",
    },
    {
        command_name: "Explain programming code",
        instruction: "Place your code starting from the 3rd line",
        command: "Explain a complicated piece of code.\n\ndef sum(a, b):\n    return a + b",
    },
    {
        command_name: "Evaluate a mathematical expression",
        instruction: "Replace the expression on the 3rd line.",
        command: "Evaluate the following expression:\n\n(2 + 3) * (4 + 5)",
    },
    {
        command_name: "Evaluate a math equation",
        instruction: "Replace the equation on the 3rd line.",
        command: "Evaluate the following equation:\n\nx^2 + 7 = 2",
    },
    {
        command_name: "Create study notes",
        instruction: "Replace the sentence below.",
        command: "What are 5 key points I should know when studying Ancient Rome?",
    },
];

export default commands;