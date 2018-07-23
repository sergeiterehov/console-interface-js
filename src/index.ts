import { root } from "./kernel";
import { TextElement } from "./elements";

new TextElement(root).content = "Time: ";
const time = new TextElement(root);
new TextElement(root).content = "\nКоличество нажатий: ";
const counter = new TextElement(root);

let counterValue: number = 0;

setInterval(() => {
    time.content = (new Date()).toISOString();
}, 500);

root.on("keypress", (key) => {
    counterValue += 1;
    counter.content = counterValue.toString();
});
