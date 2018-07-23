import { ConsoleObject } from "./ConsoleObject";

export enum Color {
    Black = "black",
    White = "whilte",
}

export interface IViewRuleSelector {
    type?: string;
    id?: string;
    classes: string[];
    rules: IViewRule;
}

export interface IViewRule {
    color?: {
        font?: Color;
        background?: Color;
    };
    position?: {
        x?: number;
        y?: number;
    };
    size?: {
        width?: number;
        height?: number;
    };
    inside?: IViewRuleSelector[];
}

export class Visualizer {
    private rules: IViewRule;

    constructor(rules: IViewRule) {
        this.rules = rules;
    }

    public render(object: ConsoleObject, parentRule: IViewRule): string {
        const rule = this.mergeRule(parentRule, {}, object);
        let style: string = "";

        if (rule.color) {
            if (rule.color.font) {
                switch (rule.color.font) {
                    case Color.Black:
                        style += "\x1b[37m";
                        break;
                    case Color.White:
                        style += "\x1b[31m";
                        break;
                }
            }
        }

        return style + object.content + object.children.map((child) => this.render(child, rule)).join("");
    }

    private mergeRule(parent: IViewRule, child: IViewRule, context: ConsoleObject): IViewRule {
        return {
            color: {
                font: (parent.color ? parent.color.font : undefined) || (child.color ? child.color.font : undefined),
            },
        };
    }
}
