var Rotating=false
var RotateCx
var RotateCy

function rotateAdjust(factor)
{
    var cw=addElemTessellateCw
    var mult=parseFloat(cw.rotateAdjustSelect.options[cw.rotateAdjustSelect.selectedIndex].text)
    var rotateAdd=parseFloat(factor)*mult

    RotateAngle=rotateAdd

    var mainPolyG=cw.document.getElementById("mainPolyG")
    var bb=mainPolyG.getBBox()
    var bbx=bb.x
    var bby=bb.y
    var bbw=bb.width
    var bbh=bb.height
    var cx=bbx+.5*bbw
    var cy=bby+.5*bbh
    RotateCx=cx
    RotateCy=cy


     var pgons=mainPolyG.childNodes
     for(var k=0;k<pgons.length;k++)
     {
        var pgon=pgons.item(k)
        pgon.setAttribute("transform","rotate("+RotateAngle+","+RotateCx+","+RotateCy+")")
        ctmPolygon(pgon)
     }

      CloneTile=cw.document.getElementById("mainPolyG").cloneNode(true)
       for(var k=0;k<CloneTile.childNodes.length;k++)
            CloneTile.childNodes.item(k).removeAttribute("onclick")

    Rotating=true
    if(ActiveElem)
        tessellate()
}


function ctmPolygon(myPoly)
{
	var ctm = myPoly.getCTM()
	var svgRoot = myPoly.ownerSVGElement

	var pointsList = myPoly.points;
	var n = pointsList.numberOfItems;


	for(var m=0; m < n; m++)
	{
		var mySVGPoint = svgRoot.createSVGPoint();
		mySVGPoint.x = pointsList.getItem(m).x
		mySVGPoint.y = pointsList.getItem(m).y
		mySVGPointTrans = mySVGPoint.matrixTransform(ctm)
		pointsList.getItem(m).x=mySVGPointTrans.x
		pointsList.getItem(m).y=mySVGPointTrans.y
	};
	//---force removal of transform--
	myPoly.setAttribute("transform","")
	myPoly.removeAttribute("transform")
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