import { ConsoleRenderer } from "./ConsoleRenderer";
import { Visualizer } from "./Visualizer";
import { ContainerElement } from "./elements";
import * as readline from "readline";

const visualizer = new Visualizer({});
export const root = new ContainerElement();

const renderer = new ConsoleRenderer(root, visualizer, (content) => {
    process.stdout.write("\x1bc");
    process.stdout.write(content);
});

if (! process.stdin.setRawMode) {
    throw new Error("Raw mode is unavailable");
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (str, key) => {
    root.trigger("keypress", key);

    if (key.ctrl && key.name === "c") {
        root.trigger("exit");
        return process.exit();
    }
});
