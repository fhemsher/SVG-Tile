 //---size svg---
 var WidthSVG
 var HeightSVG
 function sizeSVG()
 {   /*
    var width=window.innerWidth-30
    height=window.innerHeight-40
    svgDiv.style.width=width+"px"
    svgDiv.style.height=height+"px"
    tessSVG.setAttribute("width",width)
    tessSVG.setAttribute("height",height)
     svgWidthValue.value=width
     svgHeightValue.value=height
    WidthSVG=svgWidthValue.value
    HeightSVG=svgHeightValue.value
    */
 }




//--remove svg child elems---
function rE(myG)
{
	var nodes=myG.childNodes
	for(var k=nodes.length-1;k>=0;k--)
	myG.removeChild(nodes.item(k))
}
//---changes all transformed points to screen points---
function doScreenPoints(mySVG,myPolyG)
{
   var sCTM = myPolyG.getCTM()
   var polys=myPolyG.childNodes
   for(var k=0;k<polys.length;k++)
   {
        var myPoly=polys.item(k)
	     var pointsArray=polyPointsArray(myPoly)
		 var rawPnts=[]
		 for(var m=0;m<pointsArray.length;m++)
		 {
	        var mySVGPoint = mySVG.createSVGPoint();
			mySVGPoint.x =pointsArray[m][0]
			mySVGPoint.y =pointsArray[m][1]
	        mySVGPointTrans = mySVGPoint.matrixTransform(sCTM)
			var newX=mySVGPointTrans.x
			var newY=mySVGPointTrans.y
	        rawPnts.push([newX,newY])
		 }
	  	myPoly.setAttribute("points",rawPnts.join())
  }
  	 //---force removal of transform--
	  myPolyG.setAttribute("transform","")
	  myPolyG.removeAttribute("transform")
}


function screenPointsPoly(mySVG,myPoly)
{
   var sCTM = myPoly.getCTM()

	     var pointsArray=polyPointsArray(myPoly)
		 var rawPnts=[]
		 for(var m=0;m<pointsArray.length;m++)
		 {
	        var mySVGPoint = mySVG.createSVGPoint();
			mySVGPoint.x = pointsArray[m][0]
			mySVGPoint.y = pointsArray[m][1]
	        mySVGPointTrans = mySVGPoint.matrixTransform(sCTM)
			var newX=mySVGPointTrans.x
			var newY=mySVGPointTrans.y
	        rawPnts.push([newX,newY])
		 }
	  	myPoly.setAttribute("points",rawPnts.join())

  	 //---force removal of transform--
	  myPoly.setAttribute("transform","")
	  myPoly.removeAttribute("transform")
}

function polyPointsArray(myPolygon)
{

    var array=[]

   var pointsList = myPolygon.points;
	var n = pointsList.numberOfItems;
	for(var k=0;k<n;k++)
	{
		var x=pointsList.getItem(k).x
		var y=pointsList.getItem(k).y
			array.push([x,y])
	}

     return array
}


function readPointsCentroid(myPolygon)
{
	var pointList=myPolygon.points
	var m=pointList.numberOfItems
	var total_area = 0;
	var centroid = [0, 0];
	var a = pointList.getItem(0);
	for (i = 0; i < m - 2; i++)
	{
		var b = pointList.getItem(i + 1), c = pointList.getItem(i + 2);
		var area = 0.5 * Math.abs((a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y));
		total_area += area;
		centroid[0] += area * (a.x + b.x + c.x);
		centroid[1] += area * (a.y + b.y + c.y);
	}
	centroid[0] /= total_area * 3;
	centroid[1] /= total_area * 3;

	return centroid
}

//--read points directly at polygon---
//---x1,y1 x2,y2 x3,y3... dataXY (string) format---
function readPointsArea(myPolygon)
{
   var pointList=myPolygon.points
	var m=pointList.numberOfItems
	var total_area = 0;
	var centroid = [0, 0];
	var a = pointList.getItem(0);
	for (i = 0; i < m - 2; i++)
	{
		var b = pointList.getItem(i + 1), c = pointList.getItem(i + 2);
		var area = 0.5 * Math.abs((a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y));
		total_area += area;
	}
	return Math.round(total_area)
}

function translatePoly(mySVG,myPoly,transX,transY)
{

    var sCTM = myPoly.getCTM()

     var pointsArray=polyPointsArray(myPoly)
	 var rawPnts=[]
	 for(var m=0;m<pointsArray.length;m++)
	 {
        var mySVGPoint = mySVG.createSVGPoint();
		mySVGPoint.x =pointsArray[m][0]
		mySVGPoint.y =pointsArray[m][1]
        mySVGPointTrans = mySVGPoint.matrixTransform(sCTM)
		var newX=mySVGPointTrans.x+transX
		var newY=mySVGPointTrans.y+transY
        rawPnts.push([newX,newY])
	 }
  	myPoly.setAttribute("points",rawPnts.join())
	 //---force removal of transform--
  myPoly.setAttribute("transform","")
  myPoly.removeAttribute("transform")

}
//---straight path to polygon---
function path2pgonPnts(path)
{
	var points=[]
	var segList=path.pathSegList
	var segs=segList.numberOfItems
	for(var k=0;k<segs;k++)
	{
		var segObj=segList.getItem(k)
		points.push([segObj.x,segObj.y])
	}

	return points

}

function verifyConvexPlotCcw(points) {
    function ccw(p1, p2, p3) {
        return (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]);
    }
    function min(a, fn) {
	    if (!a.length) {
	        return -1;
	    }

	    var i = 0;
	    for (var j = 1; j < a.length; j++) {
	        if (fn(a[i], a[j]) < 0) {
	            i = j;
	        }
	    }
	    return i;
	}
    var n = points.length;

    // Find the point with the lowest y coordinate (breaking ties by looking at the x coordinate).
    var i = min(points, function(a, b) { return a[1] == b[1] ? b[0] - a[0] : b[1] - a[1] });

    // Take it out of the array.
    var p = points[i];
    points[i] = null;

    // Put an extra entry in the array.
    points.push(null);

    // Sort the points by the angle that the line from p to the point makes with the x axis.
    points.sort(function(a, b) {
        return !a ? -1 : (!b ? 1 : (a[0] - p[0]) / (a[1] - p[1]) - (b[0] - p[0]) / (b[1] - p[1]));
    });

    // Now the first two elements of points should be null.
    // Place the lowest-y-coordinate point at p[1], and a sentinel value at p[0].
    points[0] = points[n];
    points[1] = p;

    var m = 2;
    for (i = 3; i <= n; i++) {
        // Look at the next point.
        while (ccw(points[m - 1], points[m], points[i]) >= 0) {
            // If adding the next point would make the hull non-convex,
            // remove the most recently added point from the convex hull
            // we're building up.
            m--;
        }

        // Add this point to the convex hull.
        m++;
        points[m] = points[i];
    }

    // Finally, m is the number of points on the convex hull.
    points.length = m;

   return points
}

function rotatePolygon(myPolygon,rotateAngle,pivotX,pivotY)
{
		var zeroOffset=.000001 //---prevent error when pivotX/Y is also a point---

		var newPnts=[]
		var points=myPolygon.points

		for(var k=0;k<points.numberOfItems;k++)
		{
 			var pnt=points.getItem(k)

				var x=pnt.x
				var y=pnt.y

		//---compute initial offset angle----
				var xX=x-pivotX-zeroOffset;
				var yY=pivotY-y;
				var R=Math.sqrt(yY*yY+xX*xX);
				var sine=yY/R;
				var degrees=Math.abs(Math.asin(sine)*180/Math.PI);
				if(xX>=0&&yY>=0)myOffsetRotateAngle=270+(90-degrees);
				else if(xX>=0&&yY<=0)myOffsetRotateAngle=degrees;
				else if(xX<=0&&yY<=0)myOffsetRotateAngle=90+(90-degrees);
				else if(xX<=0&&yY>=0)myOffsetRotateAngle=180+degrees;


				var myDegrees=rotateAngle+myOffsetRotateAngle
				var myRads=(myDegrees) * Math.PI / 180
				 var x1=pivotX+R*Math.cos(myRads)
				 var y1=pivotY+R*Math.sin(myRads)
               newPnts.push([x1,y1])
        }

         myPolygon.setAttribute("points",newPnts.join())
}

function rotatePolygonG(myPolygonG,rotateAngle,pivotX,pivotY)
{
		var zeroOffset=.000001 //---prevent error when pivotX/Y is also a point---
     var polys=myPolygonG.childNodes

	for(var m=0;m<polys.length;m++)
	{
        var myPolygon=polys.item(m)

		var newPnts=[]
		var points=myPolygon.points
		for(var k=0;k<points.numberOfItems;k++)
		{       var pnt=points.getItem(k)

				var x=pnt.x
				var y=pnt.y

		//---compute initial offset angle----
				var xX=x-pivotX-zeroOffset;
				var yY=pivotY-y;
				var R=Math.sqrt(yY*yY+xX*xX);
				var sine=yY/R;
				var degrees=Math.abs(Math.asin(sine)*180/Math.PI);
				if(xX>=0&&yY>=0)myOffsetRotateAngle=270+(90-degrees);
				else if(xX>=0&&yY<=0)myOffsetRotateAngle=degrees;
				else if(xX<=0&&yY<=0)myOffsetRotateAngle=90+(90-degrees);
				else if(xX<=0&&yY>=0)myOffsetRotateAngle=180+degrees;

				var myDegrees=rotateAngle+myOffsetRotateAngle
				var myRads=(myDegrees) * Math.PI / 180
				 var x1=pivotX+R*Math.cos(myRads)
				 var y1=pivotY+R*Math.sin(myRads)

			    newPnts.push([x1,y1])
        }
         myPolygon.setAttribute("points",newPnts.join())

   }
}