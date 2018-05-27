class Color {
    private r: number;
    private g: number;
    private b: number;

    constructor(r?: number, g?: number, b?: number) {
        this.r = this.setColor(r || Math.floor(Math.random() * 255));
        this.g = this.setColor(g || Math.floor(Math.random() * 255));
        this.b = this.setColor(b || Math.floor(Math.random() * 255));
    }

    public getNormalizedColors() {
        return [this.r / 255, this.g / 255, this.b / 255];
    }

    public getRGB() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    private setColor(value: number): number {
        if (value >= 0 && value <= 1) {
            return value * 255;
        } else {
            return value;
        }
    }
}

export default Color;
