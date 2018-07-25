# Try the console... JS!

This is lib for creating interactive console application. You can build objects structure like DOM and manage it (set classes, content and move an nodes).

```js
import { root } from "./kernel";
import { TextElement } from "./elements";

new TextElement(root).content = "Time: ";
const time = new TextElement(root);
new TextElement(root).content = "\nPress counter: ";
const counter = new TextElement(root);

let counterValue: number = 0;

setInterval(() => {
    time.content = (new Date()).toISOString();
}, 500);

root.on("keypress", (key) => {
    counterValue += 1;
    counter.content = counterValue.toString();
});

root.on("exit", () => {
    counter.content = "death";
});

```

```
Time: 2018-07-25T16:30:14.375Z
Press counter: 42
```