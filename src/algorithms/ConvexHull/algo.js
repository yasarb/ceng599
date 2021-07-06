var ConvexHull = {

  ACTION_ADD_EDGE: 'addEdge',
  ACTION_REMOVE_LAST: 'removeLastEdge',
  ACTION_RECOLOR_LAST: 'recolorLastEdge',
  DEFAULT_NUM_POINTS: 10,
  DEFAULT_CANVAS_WIDTH: 800,
	DEFAULT_CANVAS_HEIGHT: 600,
	canvas: null,
	canvasMargin: 100,
	bbox: {xl:0, xr:800, yt:0, yb:600},
  random: Math.random,
  round: Math.round,
  max: Math.max,
  points: [],
  convexHull: [],
  steps: [],
  lastStepId: 0,

  init: function() {
    this.initCanvas();
		this.generatePoints(this.DEFAULT_NUM_POINTS);

    const leftmostPoint = this.minBy(this.points, p => p.x);
    const otherPoints = this.without(this.points, leftmostPoint);
    const sortedPoints = otherPoints.sort((p1, p2) => (
      this.polarAngle(p2, leftmostPoint) - this.polarAngle(p1, leftmostPoint)
    ));
    sortedPoints.unshift(leftmostPoint);
    sortedPoints.push(leftmostPoint);

    this.stepAddEdge(sortedPoints[0], sortedPoints[1], '#00f');
    
    let j = 1;

    for (let i = 2; i < sortedPoints.length; i++) {
      while (this.ccw(sortedPoints[j - 1], sortedPoints[j], sortedPoints[i])) {
        this.stepRecolorLastEdge('red');

        this.stepAddEdge(sortedPoints[j], sortedPoints[i], '#f00');
  
        if (j > 1) {
          j--;
        } else if (i === sortedPoints.length - 1) {
          this.stepRemoveLastEdge();
          this.stepRemoveLastEdge();
          break;
        } else {
          i++;
        }
  
        this.stepRemoveLastEdge();
        this.stepRemoveLastEdge();
      }
  
      this.stepAddEdge(sortedPoints[j], sortedPoints[i], '#00f');
  
      j++;
      let temp = sortedPoints[j];
      sortedPoints[j] = sortedPoints[i];
      sortedPoints[i] = temp;
    }

  },

  reset: function(){
    this.lastStepId = 0;
    this.convexHull = [];
    // this.queueInit();
		this.draw();
  },

  initCanvas: function() {
    if (this.canvas) {return;}
		var canvas = document.getElementById('voronoiCanvas');
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
  },

  generatePoints: function(n) {
    this.randomPoints(n);
		this.reset();
		// this.processQueueAll();
  },

  randomPoints: function(n) {
    var margin = this.canvasMargin;
		var xo = this.bbox.xl+margin;
		var dx = this.bbox.xr-margin*2;
		var yo = this.bbox.yt+margin;
		var dy = this.bbox.yb-margin*2;

		for (var i = 0; i < n; i++) {
			this.points.push(new this.Point(this.round(xo+this.random()*dx),this.round(yo+this.random()*dy)));
    }
  },

  Point: function (x, y) {
    this.x = x;
    this.y = y;
  },

  Edge: function(p1, p2, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.color = color ?? '#00f';
  },

  Step: function(action, color, data) {
    this.action = action;
    this.color = color;
    this.data = data;
  },

  minBy: function(arr, func) {
    const min = Math.min(...arr.map(func))
    return arr.find(item => func(item) === min);
  },

  without: function(arr, ...args) {
    return arr.filter(item => !args.includes(item));
  },

  stepAddEdge: function(p1, p2, color) {
    this.steps.push(new this.Step(this.ACTION_ADD_EDGE, color, new this.Edge(p1, p2)));
  },

  stepRemoveLastEdge: function() {
    this.steps.push(new this.Step(this.ACTION_REMOVE_LAST, null, null));
  },

  stepRecolorLastEdge: function(color) {
    this.steps.push(new this.Step(this.ACTION_RECOLOR_LAST, color, null));
  },

  convexAngle: function(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
  },
  
  ccw: function(p1, p2, p3) {
    return this.convexAngle(p1, p2, p3) <= 0;
  },
  
  polarAngle: function(p1, p2) {
    let xDiff = p1.x - p2.x;
    let yDiff = p1.y - p2.y;
    return Math.atan2(-yDiff, xDiff);
  },

	draw: function() {
		var ctx = this.canvas.getContext('2d');
		this.drawBackground(ctx);
		this.drawPoints(ctx);
		
    if (this.convexHull.length > 0) {
      this.drawConvexHull(ctx);
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

  drawPoints: function(ctx) {
		ctx.beginPath();
		var nPoints = this.points.length;

		for (var iPoint = 0; iPoint < nPoints; iPoint++){
			var point = this.points[iPoint];
      ctx.rect(point.x-1, point.y-1, 4, 4);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000';
      ctx.fill();
    }
  },

  drawConvexHull: function(ctx) {

    for (let i = 0; i < this.convexHull.length; i++) {
      const edge = this.convexHull[i];
      
      ctx.globalAlpha = 0.9;
			ctx.strokeStyle = edge.color;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(edge.p1.x, edge.p1.y);
			ctx.lineTo(edge.p2.x, edge.p2.y);
			ctx.stroke();
    }
  },

  processUpTo: function(n) {
    this.processN(n);
  },
  
  processN: function(n) {
    this.convexHull = [];
    this.lastStepId = 0;

    for (let i = 0; i < n; i++) {
      const step = this.steps[i];

      if (step.action === this.ACTION_ADD_EDGE) {
        this.convexHull.push(step.data)
      } else if (step.action === this.ACTION_REMOVE_LAST) {
        this.convexHull.pop();
      } else if (step.action === this.ACTION_RECOLOR_LAST) {
        var lastEdge = this.convexHull.pop();
        lastEdge.color = step.color;
        this.convexHull.push(lastEdge);
      }
    }

    this.draw();
    this.lastStepId = n;
  },

  processAll: function() {
    this.processN(999999999);
  },
};

export default ConvexHull;
