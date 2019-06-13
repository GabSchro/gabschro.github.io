
function MandelbrotSet() {
    var self = this;
    
    self.name = 'Mandelbrot Set';
    
    self.getValueAt = function(x, y) {
        var xt;
        var zx = 0, zy = 0;
        var cy = y;
        var cx = x;

        for (var i = 0; i < 255 && zx < 2; i++) {
            xt = zx * zy;
            zx = zx * zx - zy * zy + cx;
            zy = 2 * xt + cy;
        }

        return i;
    };
}

function JuliaSet() {
    var self = this;
    
    self.x = -0.704029749122184;
    self.y = -0.3383527246917294;
    self.name = 'Julia Set';

    self.getInputs = function() {
        return [{'name': 'x', 'min': -2, 'max': 2, 'step': 0.01, 'value': self.x}, {'name': 'y', 'min': -2, 'max': 2, 'step': 0.01, 'value': self.y}];
    };

    self.getValueAt = function(x, y) {
        var n = 255;

        var cRe = self.x;
        var cIm = self.y;
        var newRe = x;
        var newIm = y;
        for(var i = 0; i < 255; i++)
        {
          //remember value of previous iteration
          var oldRe = newRe;
          var oldIm = newIm;
          //the actual iteration, the real and imaginary part are calculated
          newRe = oldRe * oldRe - oldIm * oldIm + cRe;
          newIm = 2 * oldRe * oldIm + cIm;
          //if the point is outside the circle with radius 2: stop
          if((newRe * newRe + newIm * newIm) > 4) break;
        }
    
        return i;
    };
}

function SierpinskiCarpet() {
    var self = this;
    
    self.name = 'Sierpinkski Carpet';

    self.getRangeInfo = function() {
        return {
            'minX': -1,
            'maxX': 1,
            'minY': -1,
            'maxY': 1
        };
    };

    self.getValueAt = function(x, y) {
        x += 1;
        y += 1;
        if (x > 2 || y > 2 || x < 0 || y < 0) {
            return 0;
        }
        x *= 0.5;
        y *= 0.5;
        var multipleOf3 = Math.pow(3, 20);
        x = x * multipleOf3;
        y = y * multipleOf3;
        x = Math.round(x);
        y = Math.round(y);
        for (var i = 0; i < 30 && (x > 0 || y > 0); i++)
        {
            if (x % 3 === 1 && y % 3 === 1)
                return 0;
            x = Math.floor(x / 3);
            y = Math.floor(y / 3);
        }
        return 500; 
    };
}

/*
The Sololearnski Carpet is a newly invented fractal inspired by both the Sololearn logo and the Sierpinski Carpet.

Hopefully Sololearn doesn't hunt me(Josh Greig) down for misusing their logo.

The data for where the pattern repeats is defined in the HTML section.
*/
function SololearnskiCarpet() {
    var self = this;
    
    self.name = 'Sololearnski Carpet';
    var smallestCircleRadius = 0.000001;
    var grid; 
    // grid is used for efficiency to minimize the number of circles we need to look at 
    // while checking a specific point in the fractal.
    
    function initializeGrid() {
        grid = [];
        for (var i = 0; i < SololearnskiCarpet.gridSize; i++ ) {
            var row = [];
            for (var j = 0; j < SololearnskiCarpet.gridSize; j++ ) {
                row.push([]);
            }
            grid.push(row);
        }
        var count = 0;
        circles.forEach(function(circle) {
            // Add the circle to the cells in the grid that it may overlap.
            var maxR = 1;
            var minR = SololearnskiCarpet.minRadiusRatio;
            // The + 1 and - 1 is to rule out error with integer rounding on the grid pattern.
            maxR = maxR * circle.radius + 2;
            minR = Math.max(0, minR * circle.radius - 2);
            var maxRSquared = maxR * maxR;
            var minRSquared = minR * minR;
            
            for (var dx = - Math.round(maxR); dx < maxR; dx++) {
                var dxSquared = dx * dx;
                var maxYSquared = maxRSquared - dxSquared;
                if (maxYSquared > 0) { // avoid trying to get square root of a negative or 0.
                    var maxY = Math.sqrt(maxYSquared);
                    for (var dy = - Math.round(maxY); dy < maxY; dy++) {
                        var distanceSquared = dxSquared + dy * dy;
                        if (distanceSquared <= maxRSquared && distanceSquared >= minRSquared) {
                            var x = Math.round(dx + circle.cx);
                            var y = Math.round(dy + circle.cy);
                            if (x >= 0 && y >= 0 && x < grid.length && y < grid[x].length) {
                                grid[x][y].push(circle);
                                count++;
                            }
                        }
                    }
                }
            }
        });
    }
    
    self.getRangeInfo = function() {
        return {
            'minX': -1,
            'maxX': 1,
            'minY': -1,
            'maxY': 1
        };
    };
    
    self.adaptToZoom = function(averageSize) {
        smallestCircleRadius = Math.max(0.00000000000001, averageSize * 0.0001);
    };

    function checkCircle(circle, x, y, circleRadius) {
        // Base case for recursion.
        if (circleRadius < smallestCircleRadius) {
            return true;
        }
        x = (x - circle.cx + circle.radius) / circle.radius;
        y = (y - circle.cy + circle.radius) / circle.radius;
        x *= SololearnskiCarpet.gridSize * 0.5;
        y *= SololearnskiCarpet.gridSize * 0.5;
        var px = Math.round(x);
        var py = Math.round(y);
        if (px < 0 || px >= grid.length || py < 0 || py >= grid[0].length) {
            return false;
        }
        var circlesToCheck = grid[parseInt(x)][parseInt(y)];
        for (var i = 0; i < circlesToCheck.length; i++) {
            var circle = circlesToCheck[i];
            if (checkCircle(circle, x, y, circle.radius * circleRadius / SololearnskiCarpet.gridSize)) {
                return true;
            }
        }
        return false; 
    }

    self.getValueAt = function(x, y) {
        x += 1;
        y += 1;
        if (x < 0 || y < 0 || x > 2 || y > 2) {
            return 0;
        }
        x *= SololearnskiCarpet.gridSize / 2;
        y *= SololearnskiCarpet.gridSize / 2;

        var circlesToCheck = grid[parseInt(x)][parseInt(y)];
        for (var i = 0; i < circlesToCheck.length; i++) {
            var circle = circlesToCheck[i];
            if (checkCircle(circle, x, y, circle.radius)) {
                return 1000;
            }
        }

        return 0;
    };
    
    initializeGrid();
}

SololearnskiCarpet.gridSize = 600;
SololearnskiCarpet.minRadiusRatio = 0.40041861506392995;

SololearnskiCarpet.init = function() {

    /*
    The circles data defined in HTML is only for 1 of the 6 repeating and rotated shapes.
    uncompressCircleData repeats, scales, and rotates the single shape 6 times to create 
    a complete Sololearn logo pattern.
    */
    function uncompressCircleData(size) {     
        var sololearnCx = circles[1].cx * 0.8788;
        var sololearnCy = circles[1].cx * 1.6835;
        var sololearnRadius = sololearnCy * 1.02;

        function replicateSixTimes() {
            var extraCircles = [];
        
            for (var i = 0; i < 6; i++) {
                var angle = i * Math.PI / 3; // radians
                var sinAngle = Math.sin(angle);
                var cosAngle = Math.cos(angle);
                circles.forEach(function(circle) {
                    var x = circle.cx - sololearnCx, y = circle.cy - sololearnCy;
                    var rx = x * cosAngle - y * sinAngle;
                    var ry = y * cosAngle + x * sinAngle;
                    extraCircles.push({
                        'radius': circle.radius,
                        'cx': rx,
                        'cy': ry
                    });
                });
            }
            
            extraCircles.forEach(scaleAndTranslateCircle);
            
            circles = extraCircles;
        }
    
        function scaleAndTranslateCircle(circle) {
            var scaleFactor = size / sololearnRadius * 0.5;
            circle.radius *= scaleFactor;
            circle.cx += sololearnRadius;
            circle.cy += sololearnRadius;
            circle.cx *= scaleFactor;
            circle.cy *= scaleFactor;
        }
        
        replicateSixTimes();
    }

    uncompressCircleData(SololearnskiCarpet.gridSize);
};

function Zoom() {
    var self = this;
    var offsetX;
    var offsetY;
    var width, height;
    var pixelWidth, pixelHeight;
    var scaleFactorChange = 0.2;

    self.getAverageSize = function() {
        return (width + height) * 0.5;
    };
    
    self.resized = function() {
        var $canvas = $('canvas');
        pixelWidth = $canvas.width();
        pixelHeight = $canvas.height();
        
        var newAspectRatio = pixelWidth / pixelHeight;
        var area = width * height;

        // preserve the aspect ratio.        
        width = Math.sqrt(area * newAspectRatio);
        height = width / newAspectRatio;
    };

    self.reset = function() {
        self.resized();
        var newAspectRatio = pixelWidth / pixelHeight;
        var area = 4 * 4;
        width = Math.sqrt(area * newAspectRatio);
        height = width / newAspectRatio;
        
        
        offsetX = - width * 0.5;
        offsetY = - height * 0.5;
    };
    
    self.viewerCoordinatesToPixels = function (x, y) {
        return {
            'x': (x - offsetX) * pixelWidth / width,
            'y': (y - offsetY) * pixelHeight / height
        };
    };

    self.pixelsToViewerCoordinates = function(x, y) {
        return {
            'x': x / pixelWidth * width + offsetX,
            'y': y / pixelHeight * height + offsetY
        };
    }

    function getZoomInCoordinates(x, y) {
        var p = self.pixelsToViewerCoordinates(x, y);
        var result = {
            'width': width * scaleFactorChange,
            'height': height * scaleFactorChange
        };
        result.offsetX = p.x - result.width * 0.5;
        result.offsetY = p.y - result.height * 0.5;

        return result;
    }

    // Finds pixel coordinates that would be zoomed into if clicking at the specified x, y position.    
    self.getZoomInCoordinates = function(x, y) {
        var viewerCoordinateInfo = getZoomInCoordinates(x, y);
        var p = self.viewerCoordinatesToPixels(viewerCoordinateInfo.offsetX, viewerCoordinateInfo.offsetY);

        return {
            'width': viewerCoordinateInfo.width * pixelWidth / width,
            'height': viewerCoordinateInfo.height * pixelHeight / height,
            'offsetX': p.x,
            'offsetY': p.y
        };
    };

    self.zoomInto = function(x, y) {
        var newInfo = getZoomInCoordinates(x, y);
        offsetX = newInfo.offsetX;
        offsetY = newInfo.offsetY;
        width = newInfo.width;
        height = newInfo.height;
    };
    
    self.zoomOut = function() {
        var middleX = offsetX + width * 0.5;
        var middleY = offsetY + height * 0.5;
        offsetX = middleX - (width / scaleFactorChange) * 0.5;
        offsetY = middleY - (height / scaleFactorChange) * 0.5;
        width /= scaleFactorChange;
        height /= scaleFactorChange;
    };

    self.reset();
    self.resized();
}

function toTwoDigits(v) {
    v = Math.round(v);
    v = Math.min(255, Math.max(0, v));
    var twoDigits = "" + v.toString(16);
    while (twoDigits.length < 2) {
        twoDigits = '0' + twoDigits;
    }
    return twoDigits;
}

function valueToGray(value) {
    var twoDigits = toTwoDigits(value);
    return '#' + twoDigits + twoDigits + twoDigits;
}

valueToGray.title = 'Gray';

function valueToLightGray(value) {
    return valueToGray(255 * Math.sqrt(value / 255));
}

valueToLightGray.title = 'Light Gray';

function valueToColourful(value) {
    var b = value * 1;
    var g = value * 5;
    var r = value * 20;
    return '#' + toTwoDigits(r) + toTwoDigits(g) + toTwoDigits(b);    
}

valueToColourful.title = 'Colourful';

function Renderer(zoom, selectedFractal) {
    var self = this;
    var maxSquareSize = 4;
    self.selectedFractal = selectedFractal;
    var renderingQueue = [];
    
    function processSection(squareSize, minX, minY, maxX, maxY) {
        if (self.valueToColour === undefined || self.selectedFractal === undefined) {
            return;
        }
        var $canvas = $('canvas');
        var g = $canvas[0].getContext('2d');

        var pixeledSquareSize = Math.max(1, squareSize);

        // Make sure the range starts with integers to avoid having pixels blurred into each other.
        minX = parseInt(minX);
        minY = parseInt(minY);
        for (var x = minX; x < maxX; x += pixeledSquareSize) {
            for (var y = minY; y < maxY; y += pixeledSquareSize) {
                var p;
                var value;
                if (squareSize < 1) {
                    var totalValue = 0;
                    for (var microX = 0; microX < 1; microX += squareSize) {
                        for (var microY = 0; microY < 1; microY += squareSize) {
                            p = zoom.pixelsToViewerCoordinates(x + microX, y + microY);
                            totalValue += self.selectedFractal.getValueAt(p.x, p.y);
                        }
                    }
                    value = totalValue * squareSize * squareSize;
                }
                else {
                    p = zoom.pixelsToViewerCoordinates(x, y);
                    value = self.selectedFractal.getValueAt(p.x, p.y);
                }
                
                var colour = self.valueToColour(value);
                g.fillStyle = colour;
                g.beginPath();
                g.rect(x, y, pixeledSquareSize, pixeledSquareSize);
                g.fill();
                g.closePath();
            }
        }
    }

    function trimBottomRight(renderingTask) {
        var $canvas = $('canvas');
        var w = $canvas.width(), h = $canvas.height();
        var g = $canvas[0].getContext('2d');
        g.clearRect(renderingTask.minX, renderingTask.maxY, renderingTask.maxX - renderingTask.minX + 5, 5);
        g.clearRect(renderingTask.maxX, renderingTask.minY, 5, renderingTask.maxY - renderingTask.minY + 5);
    }
    
    function clearDisplay() {
        var $canvas = $('canvas');
        var w = $canvas.width(), h = $canvas.height();
        var g = $canvas[0].getContext('2d');
        g.clearRect(0,0,w,h);        
    }
    
    function processRenderingChunk() {
        if (renderingQueue.length > 0) {
            var renderingTask = renderingQueue[0];
            renderingQueue.shift();
            if (renderingTask.squareSize === undefined) {
                trimBottomRight(renderingTask);
            }
            else {
                if (renderingTask.squareSize === maxSquareSize) {
                    clearDisplay();
                }
                processSection(renderingTask.squareSize, renderingTask.minX, renderingTask.minY, renderingTask.maxX, renderingTask.maxY);
            }
        }
    }

    self.resetDisplay = function() {
        // Resets the processing queue so a new region is drawn completely fresh.
        var $canvas = $('canvas');
        var w = $canvas.width(), h = $canvas.height();
        if (typeof self.selectedFractal.adaptToZoom === 'function') {
            self.selectedFractal.adaptToZoom(zoom.getAverageSize());
        }
        squareSize = maxSquareSize;
        renderingQueue = [];
        var squareSizes = [];
        for (var squareSize = maxSquareSize; squareSize >= 1; squareSize --) {
            squareSizes.push(squareSize);
        }
        squareSizes.push(0.5);
        squareSizes.push(0.25);
        var minP, maxP;
        if (typeof self.selectedFractal.getRangeInfo === 'function') {
            var rangeInfo = self.selectedFractal.getRangeInfo();
            minP = zoom.viewerCoordinatesToPixels(rangeInfo.minX, rangeInfo.minY);
            maxP = zoom.viewerCoordinatesToPixels(rangeInfo.maxX, rangeInfo.maxY);
        }
        squareSizes.forEach(function(squareSize) {
            var numSlices;
            if (squareSize >= 1) {
                numSlices = 1 << (maxSquareSize - squareSize); 
            }
            else {
                numSlices = (1 << (maxSquareSize - 1)) / squareSize;
            }
            for (var x = 0; x < numSlices; x++) {
                for (var y = 0; y < numSlices; y++) {
                    var minX = x * w / numSlices;
                    var maxX = (x + 1) * w / numSlices;
                    var minY = y * h / numSlices;
                    var maxY =  (y + 1) * h / numSlices;
                    if (minP) {
                        minX = Math.max(minP.x, minX);
                        minY = Math.max(minP.y, minY);
                        maxX = Math.min(maxP.x, maxX);
                        maxY = Math.min(maxP.y, maxY);
                    }
                    if (minX < maxX && minY < maxY) {
                        renderingQueue.push({
                            'squareSize': squareSize,
                            'minX': minX,
                            'minY': minY,
                            'maxX': maxX,
                            'maxY': maxY
                        });
                    }
                }
            }
            if (minP) {
                renderingQueue.push({
                    'minX': minP.x,
                    'minY': minP.y,
                    'maxX': maxP.x,
                    'maxY': maxP.y
                });
            }
        });
    };

    // process the queue of rendering tasks continuously so the page doesn't lock up so much.
    window.setInterval(processRenderingChunk, 10);
}


$(function() {
    SololearnskiCarpet.init();
    var fractals = [new  SololearnskiCarpet(), new SierpinskiCarpet(), new MandelbrotSet(), new JuliaSet()];
    var colourPalettes = [valueToLightGray, valueToColourful, valueToGray];
    var zoom = new Zoom();
    var renderer = new Renderer(zoom, fractals[0]);

    function addOptionsToSelect(selectId, namedOptions, propertyName) {
        namedOptions.forEach(function(option) {
            $('#' + selectId).append($('<option></option').text(option[propertyName]));
        });
    }
    
    addOptionsToSelect('fractalType', fractals, 'name');
    addOptionsToSelect('colourPalette', colourPalettes, 'title');
    
    function fractalTypeChanged() {
        var name = $('#fractalType option:selected').text();
        var fractalMatchingName = fractals.filter(function(fractal) {
            return fractal.name === name;
        })[0];
        zoom.reset();
        renderer.selectedFractal = fractalMatchingName;
        renderer.resetDisplay();
    }
    
    function canvasClicked(event) {
        zoom.zoomInto(event.clientX, event.clientY);
        renderer.resetDisplay();
    }
    
    function resetZoomClicked() {
        zoom.reset();
        renderer.resetDisplay();
    }

    function zoomOutClicked() {
        zoom.zoomOut();
        renderer.resetDisplay();
    }
    
    function windowResized() {
        zoom.resized();
        var zoomInBoxInfo = zoom.getZoomInCoordinates(0,0);
        $('.zoom-in-box').css({
            'width': zoomInBoxInfo.width + 'px',
            'height': zoomInBoxInfo.height + 'px'
        });
        var $canvas = $('canvas');
        var w = $canvas.width(), h = $canvas.height();
        
        // Make sure canvas resolution is 1 to 1 with the pixels it uses on the screen.
        $canvas.attr('width', w);
        $canvas.attr('height', h);
        renderer.resetDisplay();
    };
    
    function mouseMoved(event) {
        var zoomInBoxInfo = zoom.getZoomInCoordinates(event.clientX, event.clientY);
        $('.zoom-in-box').css({
            'left': zoomInBoxInfo.offsetX + 'px',
            'top': zoomInBoxInfo.offsetY + 'px'
        });
    }

    function colourPaletteChanged() {
        var name = $('#colourPalette option:selected').text();
        var colour = colourPalettes.filter(function(palette) {
            return palette.title === name;
        })[0];
        renderer.valueToColour = colour;
        renderer.resetDisplay();
    }
    
    function showDialog() {
        var $inputs = $('.dialog .inputs');
        $inputs.empty();
        if (typeof renderer.selectedFractal.getInputs === 'function') {
            renderer.selectedFractal.getInputs().forEach(function(input) {
                var $newLabel = $('<label></label>').text(input.name);
                var $newInput = $('<input>').attr('type', 'range');
                var copiableAttributes = ['min', 'max', 'step', 'value'];
                copiableAttributes.forEach(function(attrName) {
                    if (input[attrName] !== undefined) {
                        $newInput.attr(attrName, input[attrName]);
                    }
                });
                var $row = $('<div></div>');
                $newInput.on('input', function() {
                    if (!isNaN($newInput.val())) {
                        zoom.reset();
                        renderer.selectedFractal[input.name] = parseFloat($newInput.val());
                        renderer.resetDisplay();
                    }
                });
                $row.append($newLabel);
                $row.append($newInput);
                $inputs.append($row);
            });
            $('.dialog').removeClass('no-inputs');
        }
        else {
            $('.dialog').addClass('no-inputs');
        }
        $('.dialog').addClass('open');
    }

    function hideDialog() {
        $('.dialog').removeClass('open');
    }

    $('#showDialog').on('click', showDialog);
    $('.dialog button').on('click', hideDialog);
    $('#colourPalette').on('change', colourPaletteChanged);
    $('#fractalType').on('change', fractalTypeChanged);
    $('#zoomOut').on('click', zoomOutClicked);
    $('#resetZoom').on('click', resetZoomClicked);
    $('.display').on('mousedown', canvasClicked).on('mousemove', mouseMoved);
    $(window).on('resize', windowResized);
    windowResized();
    colourPaletteChanged();
});
