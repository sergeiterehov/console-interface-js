import { ConsoleRenderer } from "./ConsoleRenderer";
import { Visualizer } from "./Visualizer";
import { TextElement, ContainerElement } from "./elements";

const visualizer = new Visualizer({});
const root = new ContainerElement();

const renderer = new ConsoleRenderer(root, visualizer, (content) => {
    process.stdout.write("\x1bc");
    process.stdout.write(content);
});

new TextElement(root).content = "Time: ";
const time = new TextElement(root);

setInterval(() => {
    time.content = Date.now().toString();
}, 500);
