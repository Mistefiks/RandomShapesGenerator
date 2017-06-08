class DeathlyHallow {
    constructor (x, y, size = false, color = false, weight = false) {

        this.x = x;
        this.y = y;
        if(!size)
            size = random(100, 400);
        this.size = size;
        if(!weight)
            weight = random(0, 5);
        this.weight = weight;
        if(!color)
            color = {
                r: random(0, 255),
                g: random(0, 255),
                b: random(0, 255)
            }
        this.color = color;

    }
    draw () {

        let a;
        a = this.size * 2/Math.sqrt(3);

        // Line
        this.drawLine(0, -this.size/2, 0, this.size/2);

        // Triangle
        this.drawLine(-a/2, -this.size/2, a/2, -this.size/2);
        this.drawLine(-a/2, -this.size/2, 0, this.size/2);
        this.drawLine(a/2, -this.size/2, 0, this.size/2);

        // Ellipse
        this.drawEllipse(0, -this.size/6, this.size * 2/3);

    }

    drawLine (x1, y1, x2, y2, color = this.color, weight = this.weight) {

        let pos1, pos2;

        pos1 = this.getPoints(x1, y1);
        pos2 = this.getPoints(x2, y2);

        stroke(color.r, color.g, color.b);
        strokeWeight(weight);
        line(pos1.x, pos1.y, pos2.x, pos2.y);

    }
    drawEllipse (x, y, r, color = this.color, weight = this.weight) {

        let pos;
        pos = this.getPoints(x, y);

        stroke(color.r, color.g, color.b);
        strokeWeight(weight);
        noFill();
        ellipseMode(CENTER);
        ellipse(pos.x, pos.y, r);

    }
    drawPoint (x, y, color = this.color, weight = 10) {

        let pos;
        pos = this.getPoints(x, y);

        stroke(color.r, color.g, color.b);
        strokeWeight(weight);
        point(pos.x, pos.y);

    }
    getPoints (x, y) {

        x = this.x + x;
        y = this.y - y;

        return {x: x, y: y};
    }
}