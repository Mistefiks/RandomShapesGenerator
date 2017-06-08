class Pentagram {
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
    static drawReverseRainbow (x, y, size) {
        let pen;
        for(let i = size; i > 20; i -= 20){
            pentagrams.push( new Pentagram(x, y, i, false, 5) );
        }
    }
    static drawRainbow (x, y, size) {
        let pen;
        for(let i = 20; i < size; i += 20){
            pentagrams.push( new Pentagram(x, y, i, false, 5) );
        }
    }
    draw () {

        let points = [];

        let pos = {};

        pos.x = 0;
        pos.y = 0.5 * this.size;

        let n;
        n = 5;

        for(let i = 0; i < n; i++) {

            pos = this.rotatePoint(pos.x, pos.y, 360/n);
            points.push(pos);

        }

        for(let i = 0; i < points.length; i++) {

            let id, p1, p2;
            id = i + 2;
            if(id > points.length - 1)
                id = id - points.length;
            
            p1 = points[i];
            p2 = points[id];

            this.drawLine(p1.x, p1.y, p2.x, p2.y);

        }

        this.drawEllipse(0, 0, this.size);

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
    rotatePoint (x, y, angle) {

        let pos;
        pos = {x: 0, y: 0};

        angle = toRadians(angle);

        pos.x = x * Math.cos( angle ) - y * Math.sin( angle );
        pos.y = x * Math.sin( angle ) + y * Math.cos( angle );

        return pos;
    }
}