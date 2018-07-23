
export class ConsoleObject {
    private identificator?: string;
    private classes: string[];

    private parentNode?: ConsoleObject;
    private childrenNodes: ConsoleObject[];
    private internalContent: string;

    constructor(parent?: ConsoleObject, id?: string, classes?: string[]) {
        this.identificator = id;
        this.classes = classes ? classes.slice() : [];
        this.childrenNodes = [];
        this.internalContent = "";

        // Setters here
        this.parent = parent;
    }

    public get type(): string {
        throw new Error("Undefined type of ConsoleObject");
    }

    public handlerObjectChange = () => {
        let node: ConsoleObject = this;

        while (node.parent) {
            node = node.parent;
        }

        node.handlerObjectChange();
    }

    public get children(): ConsoleObject[] {
        return this.childrenNodes.slice();
    }

    public get parent(): ConsoleObject|undefined {
        return this.parentNode;
    }

    public set parent(parentNode: ConsoleObject|undefined) {
        const oldParent = this.parentNode;

        if (oldParent) {
            oldParent.childrenNodes.splice(oldParent.childrenNodes.indexOf(this), 1);
        }

        this.parentNode = parentNode;

        if (oldParent) {
            oldParent.handlerObjectChange();
        }

        if (! parentNode) {
            return;
        }

        if (-1 === parentNode.childrenNodes.indexOf(this)) {
            parentNode.childrenNodes.push(this);
        }

        parentNode.handlerObjectChange();
    }

    public set content(text: string) {
        this.internalContent = text;

        this.handlerObjectChange();
    }

    public get content(): string {
        return this.internalContent;
    }

    public get innerContent(): string {
        return this.internalContent + this.childrenNodes.map((object) => object.content).join("");
    }

    public set id(identificator: string|undefined) {
        this.identificator = identificator;

        this.handlerObjectChange();
    }

    public get id(): string|undefined {
        return this.identificator;
    }

    public getClasses(): string[] {
        return this.classes.slice();
    }

    public addClass(... names: string[]): ConsoleObject {
        this.classes.push(... names);

        this.handlerObjectChange();

        return this;
    }

    public removeClass(... names: string[]): ConsoleObject {
        names.forEach((name) => {
            const index = this.classes.indexOf(name);

            if (-1 === index) {
                return;
            }

            this.classes.splice(index, 1);
        });

        this.handlerObjectChange();

        return this;
    }

    public findById(id: string): ConsoleObject|undefined {
        if (id === this.identificator) {
            return this;
        }

        return this.childrenNodes.map((child) => child.findById(id))[0];
    }
}
