/* eslint-disable no-restricted-globals*/

import Tree from 'avl';

var LineSegmentIntersection = {
  EPS: 1E-9,
  DEFAULT_NUM_SEGMENTS: 5,
  DEFAULT_CANVAS_WIDTH: 800,
	DEFAULT_CANVAS_HEIGHT: 600,
  random: self.Math.random,
	round: self.Math.round,
  max: self.Math.max,
  min: self.Math.min,
  canvas: null,
  canvasMargin: 50,
	bbox: {xl:0,xr:800,yt:0,yb:600},
  queue: null,
  status: null,
  output: null,
  sweepline: null,

  SweepLine: function(position) {
    this.x = 0;
    this.position = position;
  },

  init: function() {

    this.SweepLine.prototype.setPosition = function (position) {
      this.position = position;
    }

    this.SweepLine.prototype.setX = function (x) {
      this.x = x;
    }

    this.sweepline = new this.SweepLine('before');
    try{
      this.queue = new Tree(this.comparePoints, true);
      this.queueBackup = new Tree(this.comparePoints, true);
      this.status = new Tree(this.compareSegments.bind(this.sweepline), true);
      this.output = new Tree(this.comparePoints, true);
    } catch(uwu){
      if (!(/is not a constructor/i.test(uwu.message))){
        throw uwu
      }
      this.queue = new Tree.default(this.comparePoints, true);
      this.queueBackup = new Tree.default(this.comparePoints, true);
      this.status = new Tree.default(this.compareSegments.bind(this.sweepline), true);
      this.output = new Tree.default(this.comparePoints, true);
    }

    this.initCanvas();

		// and randomly generate a bunch of sites to have something to see
		this.generateSegments(this.DEFAULT_NUM_SEGMENTS);
  },

  generateSegments: function(n) {
		this.randomSegments(n);
		this.reset();
		this.processQueueAll();
  },

  reset: function() {
		this.queueInit();
		this.draw();
  },

  initCanvas: function() {
		if (this.canvas) {return;}
		var canvas = document.getElementById('lsiCanvas');
		if (!canvas.getContext) {return;}
		var ctx = canvas.getContext('2d');
		if (!ctx) {return;}
		canvas.width = this.DEFAULT_CANVAS_WIDTH;
		canvas.height = this.DEFAULT_CANVAS_HEIGHT;
		ctx.fillStyle='#fff';
		ctx.rect(0,0,canvas.width,canvas.height);
		ctx.fill();
		ctx.strokeStyle = '#888';
		ctx.stroke();
		this.canvas = canvas;

		// event handlers TODO TODO TODO
		// var me = this;
		// canvas.onclick = function(e) {
		// 	if (!e) {e=self.event;}
		// 	// -----
		// 	// http://www.quirksmode.org/js/events_properties.html#position
		// 	var x = 0;
		// 	var y = 0;
		// 	if (e.pageX || e.pageY) {
		// 		x = e.pageX;
		// 		y = e.pageY;
    //   }
		// 	else if (e.clientX || e.clientY) {
		// 		x = e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
		// 		y = e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
    //   }
		// 	// -----
		// 	me.addSite(x-this.offsetLeft,y-this.offsetTop);
    // };
  },

  queueInit: function() {
    this.sweepline = new this.SweepLine('before');
    this.output = new Tree(this.comparePoints, true);
    this.status = new Tree.default(this.compareSegments.bind(this.sweepline), true);

    if (this.queueBackup.size > 0) {
      this.queue = new Tree(this.comparePoints, true);

      this.queueBackup.keys().forEach(element => {
        this.queue.insert(element, element);
      });
    }
  },

  draw: function() {
		var ctx = this.canvas.getContext('2d');
		this.drawBackground(ctx);
		this.drawSegments(ctx);
    this.drawOutput(ctx);

		// sweep line
		if (this.sweepline.x < this.canvas.width) {
			ctx.globalAlpha = 0.9;
			ctx.strokeStyle = '#00f';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(this.sweepline.x, 0);
			ctx.lineTo(this.sweepline.x, this.canvas.height);
			ctx.stroke();
    }
  },

	drawBackground: function(ctx) {
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.rect(0,0,this.canvas.width,this.canvas.height);
		ctx.fillStyle = '#fff';
		ctx.fill();
		ctx.strokeStyle = '#888';
		ctx.stroke();
  },

	drawSegments: function(ctx) {
		ctx.beginPath();
		var nSegments = this.queueBackup.size;

		for (var iSegment=0; iSegment < nSegments; iSegment++){
			var segment = this.queueBackup.at(iSegment);

      if (segment.data.segments.length > 0) {
        var segmentStart = segment.data.segments[0][0];
        var segmentEnd = segment.data.segments[0][1];
        ctx.rect(segmentStart[0]-1, segmentStart[1]-1, 4, 4);
        ctx.rect(segmentEnd[0]-1, segmentEnd[1]-1, 4, 4);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#000';
        ctx.fill();

        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(segmentStart[0]+1, segmentStart[1]+1);
        ctx.lineTo(segmentEnd[0]+1, segmentEnd[1]+1);
        ctx.stroke();
      }
    }
	
  },

  drawOutput: function(ctx) {
		ctx.beginPath();
		var nSegments = this.output.size;

		for (var iSegment=0; iSegment < nSegments; iSegment++){
			var segment = this.output.at(iSegment);

      if (segment.data.type === 'intersection') {
        ctx.rect(segment.data.x-1, segment.data.y-1, 6, 6);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#f00';
        ctx.fill();
      }
    }
	
  },

  drawSweepline: function(ctx) {
		
    ctx.globalAlpha=0.9;
    ctx.strokeStyle='#00f';
    ctx.lineWidth=0.5;
    ctx.beginPath();
    ctx.moveTo(this.sweepline.x, 0);
    ctx.lineTo(this.sweepline.x, this.canvas.height);
    ctx.stroke();
	
  },

  randomSegments: function(n) {
		var margin = this.canvasMargin;
		var xo = this.bbox.xl+margin;
		var dx = this.bbox.xr-margin*2;
		var yo = this.bbox.yt+margin;
		var dy = this.bbox.yb-margin*2;
    var segments = [];

		for (var i=0; i < n; i++) {
      segments.push([[this.round(xo+this.random()*dx),this.round(yo+this.random()*dy)], [this.round(xo+this.random()*dx),this.round(yo+this.random()*dy)]]);
    }

    // var segments = [
    //   [[150, 350], [540, 250]],
    //   [[170, 440], [510, 50]],
    //   [[350, 550], [430, 60]],
    // ];

    for(let segmentID in segments) {
      let segment = segments[segmentID];
      segment[0].ID = segmentID;
      segment[1].ID = segmentID;
      segment.sort(this.comparePoints);
      let begin = new this.Point(segment[0], 'begin', segmentID),
          end   = new this.Point(segment[1], 'end', segmentID);
  
      this.queue.insert(begin, begin);
      this.queueBackup.insert(begin, begin);
  
      begin = this.queue.find(begin).key;
      begin.segments.push(segment);
  
      this.queue.insert(end, end);
      this.queueBackup.insert(end, end);
    }
  },

  queueIsEmpty: function() {
		// this.queueSanitize();
		return this.queue.isEmpty();
  },

  findIntersections: function() {
    
      while (!this.queue.isEmpty()) {
          var point = this.queue.pop();
          this.handleEventPoint(point.key, this.status, this.output, this.queue, this.sweepline);
      }
  
      return this.output.keys().map(function(key){
          return {x: key.x, y: key.y, segmentID: key.segmentID};
      });
  },

  handleEventPoint: function(point, status, output, queue, sweepline) {
    const EPS = 1E-9;
    sweepline.setPosition('before');
    sweepline.setX(point.x);

    var Up = point.segments, // segments, for which this is the left end
        Lp = [],             // segments, for which this is the right end
        Cp = [];             // // segments, for which this is an inner point

    // step 2
    status.forEach(function(node) {
        var segment = node.key,
            segmentBegin = segment[0],
            segmentEnd = segment[1];

        // count right-ends
        if (Math.abs(point.x - segmentEnd[0]) < EPS && Math.abs(point.y - segmentEnd[1]) < EPS) {
            Lp.push(segment);
        // count inner points
        } else {
            // filter left ends
            if (!(Math.abs(point.x - segmentBegin[0]) < EPS && Math.abs(point.y - segmentBegin[1]) < EPS)) {
                if (Math.abs(LineSegmentIntersection.direction(segmentBegin, segmentEnd, [point.x, point.y])) < EPS && LineSegmentIntersection.onSegment(segmentBegin, segmentEnd, [point.x, point.y])) {
                    Cp.push(segment);
                }
            }
        }
    });

    if ([].concat(Up, Lp, Cp).length > 1) {
        output.insert(point, point);
    };

    for (var j = 0; j < Cp.length; j++) {
        status.remove(Cp[j]);
    }

    sweepline.setPosition('after');

    for (var k = 0; k < Up.length; k++) {
        if (!status.contains(Up[k])) {
            status.insert(Up[k]);
        }
    }
    for (var l = 0; l < Cp.length; l++) {
        if (!status.contains(Cp[l])) {
            status.insert(Cp[l]);
        }
    }

    if (Up.length === 0 && Cp.length === 0) {
        for (var i = 0; i < Lp.length; i++) {
            var s = Lp[i],
                sNode = status.find(s),
                sl = status.prev(sNode),
                sr = status.next(sNode);

            if (sl && sr) {
              this.findNewEvent(sl.key, sr.key, point, output, queue);
            }

            status.remove(s);
        }
    } else {
        var UCp = [].concat(Up, Cp).sort(this.compareSegments),
            UCpmin = UCp[0],
            sllNode = status.find(UCpmin),
            UCpmax = UCp[UCp.length-1],
            srrNode = status.find(UCpmax),
            sll = sllNode && status.prev(sllNode),
            srr = srrNode && status.next(srrNode);

        if (sll && UCpmin) {
            this.findNewEvent(sll.key, UCpmin, point, output, queue);
        }

        if (srr && UCpmax) {
            this.findNewEvent(srr.key, UCpmax, point, output, queue);
        }

        for (var p = 0; p < Lp.length; p++) {
            status.remove(Lp[p]);
        }
    }
    return output;
  },

  findNewEvent: function(sl, sr, point, output, queue) {
    var intersectionCoords = this.findSegmentsIntersection(sl, sr),
        intersectionPoint;

    if (intersectionCoords) {
        intersectionPoint = new this.Point(intersectionCoords, 'intersection', [sl[0].ID, sr[0].ID]);

        if (!output.contains(intersectionPoint)) {
            queue.insert(intersectionPoint, intersectionPoint);
        }

        output.insert(intersectionPoint, intersectionPoint);
    }
  },

  Point: function (coords, type, segmentID) {
    this.segmentID = segmentID;
    this.x = coords[0];
    this.y = coords[1];
    this.type = type;
    this.segments = [];
  },

  onSegment: function(a, b, c) {
    var x1 = a[0],
        x2 = b[0],
        x3 = c[0],
        y1 = a[1],
        y2 = b[1],
        y3 = c[1];

    return (Math.min(x1, x2) <= x3) && (x3 <= Math.max(x1, x2)) &&
           (Math.min(y1, y2) <= y3) && (y3 <= Math.max(y1, y2));
  },

  direction: function(a, b, c) {
    var x1 = a[0],
        x2 = b[0],
        x3 = c[0],
        y1 = a[1],
        y2 = b[1],
        y3 = c[1];

    return (x3 - x1) * (y2 - y1) - (x2 - x1) * (y3 - y1);
  },

  segmentsIntersect: function(a, b) {
    var p1 = a[0],
        p2 = a[1],
        p3 = b[0],
        p4 = b[1],
        d1 = this.direction(p3, p4, p1),
        d2 = this.direction(p3, p4, p2),
        d3 = this.direction(p1, p2, p3),
        d4 = this.direction(p1, p2, p4);

    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
        return true;
    } else if (d1 === 0 && this.onSegment(p3, p4, p1)) {
        return true;
    } else if (d2 === 0 && this.onSegment(p3, p4, p2)) {
        return true;
    } else if (d3 === 0 && this.onSegment(p1, p2, p3)) {
        return true;
    } else if (d4 === 0 && this.onSegment(p1, p2, p4)) {
        return true;
    }
    return false;
  },

  findSegmentsIntersection: function(a, b) {
    var x1 = a[0][0],
        y1 = a[0][1],
        x2 = a[1][0],
        y2 = a[1][1],
        x3 = b[0][0],
        y3 = b[0][1],
        x4 = b[1][0],
        y4 = b[1][1];
    var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
        ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
        ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1 >= x2) {
            if (!this.between(x2, x, x1)) {return false;}
        } else {
            if (!this.between(x1, x, x2)) {return false;}
        }
        if (y1 >= y2) {
            if (!this.between(y2, y, y1)) {return false;}
        } else {
            if (!this.between(y1, y, y2)) {return false;}
        }
        if (x3 >= x4) {
            if (!this.between(x4, x, x3)) {return false;}
        } else {
            if (!this.between(x3, x, x4)) {return false;}
        }
        if (y3 >= y4) {
            if (!this.between(y4, y, y3)) {return false;}
        } else {
            if (!this.between(y3, y, y4)) {return false;}
        }
    }
    return [x, y];
  },

  between: function(a, b, c) {
    return a - this.EPS <= b && b <= c + this.EPS;
  },

  compareSegments: function(a, b) {
    var x1 = a[0][0],
        y1 = a[0][1],
        x2 = a[1][0],
        y2 = a[1][1],
        x3 = b[0][0],
        y3 = b[0][1],
        x4 = b[1][0],
        y4 = b[1][1];

    var currentX,
        ay,
        by,
        deltaY,
        deltaX1,
        deltaX2;

    if (a === b) {
        return 0;
    }

    currentX = LineSegmentIntersection.sweepline.x;
    ay = LineSegmentIntersection.getY(a, currentX);
    by = LineSegmentIntersection.getY(b, currentX);
    deltaY = ay - by;

    if (Math.abs(deltaY) > LineSegmentIntersection.EPS) {
        return deltaY < 0 ? -1 : 1;
    } else {
        var aSlope = LineSegmentIntersection.getSlope(a),
            bSlope = LineSegmentIntersection.getSlope(b);

        if (aSlope !== bSlope) {
            if (LineSegmentIntersection.sweepline.position === 'before') {
                return aSlope > bSlope ? -1 : 1;
            } else {
                return aSlope > bSlope ? 1 : -1;
            }
        }
    }
    deltaX1 = x1 - x3;

    if (deltaX1 !== 0) {
        return deltaX1 < 0 ? -1 : 1;
    }

    deltaX2 = x2 - x4;

    if (deltaX2 !== 0) {
        return deltaX2 < 0 ? -1 : 1;
    }

    return 0;
  }, 

  comparePoints: function(a, b) {
    var EPS = 1E-9;
    var aIsArray = Array.isArray(a),
        bIsArray = Array.isArray(b),
        x1 = aIsArray ? a[0] : a.x,
        y1 = aIsArray ? a[1] : a.y,
        x2 = bIsArray ? b[0] : b.x,
        y2 = bIsArray ? b[1] : b.y;

    if (x1 - x2 > EPS || (Math.abs(x1 - x2) < EPS && y1 - y2 > EPS)) {
        return 1;
    } else if (x2 - x1 > EPS || (Math.abs(x1 - x2) < EPS && y2 - y1 > EPS)) {
        return -1;
    } else if (Math.abs(x1 - x2) < EPS && Math.abs(y1 - y2) < EPS ) {
        return 0;
    }
  },

  getSlope: function(segment) {
    var x1 = segment[0][0],
        y1 = segment[0][1],
        x2 = segment[1][0],
        y2 = segment[1][1];

    if (x1 === x2) {
        return (y1 < y2) ? Infinity : - Infinity;
    } else {
        return (y2 - y1) / (x2 - x1);
    }
  },

  getY: function(segment, x) {
    var begin = segment[0],
        end = segment[1],
        span = segment[1][0] - segment[0][0],
        deltaX0,
        deltaX1,
        ifac,
        fac;

    if (x <= begin[0]) {
        return begin[1];
    } else if (x >= end[0]) {
        return end[1];
    }

    deltaX0 = x - begin[0];
    deltaX1 = end[0] - x;

    if (deltaX0 > deltaX1) {
        ifac = deltaX0 / span
        fac = 1 - ifac;
    } else {
        fac = deltaX1 / span
        ifac = 1 - fac;
    }

    return (begin[1] * fac) + (end[1] * ifac);
  },

	processQueueOne: function() {
		var point = this.queue.pop();
		this.handleEventPoint(point.key, this.status, this.output, this.queue, this.sweepline);
  },

  processQueueN: function(n) {
		while (n > 0 && !this.queueIsEmpty()) {
			var res = this.processQueueOne();
			n -= 1;
    }

		if (this.queueIsEmpty()) {
			this.sweepline.setX(this.max(this.sweepline.x, this.canvas.width));
    }
  },

  processQueueAll: function() {
    this.processQueueN(999999999);
		this.sweepline.setX(this.max(this.sweepline.x, this.canvas.width));
		this.draw();
  },

  processUpTo: function(x) {
		var point;

		while (!this.queueIsEmpty()) {
			point = this.queue.min();

			if (point.x > x) { break; }

			this.processQueueOne();
    }

		// let's not go backward
    this.sweepline.setX(this.max(this.sweepline.x, x));

		// empty queue if sweep line is no longer visible
		if (this.sweepline.x > this.canvas.width) {
			this.processQueueN(999999999);
    }
  },
};


export default LineSegmentIntersection;
