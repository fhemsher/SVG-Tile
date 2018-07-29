
var TrimBox=false
function createTrimBox()
{
    var cw = addElemTessellateCw
    cw.cancelTrimBoxButton.disabled=false
    cw.trimBoxButton.disabled=true
    TrimBox=true

    domActiveElemG.removeAttribute("cursor")
    domActiveElemG.removeAttribute("class")
    mySVG.removeAttribute("onmousemove")
    mySVG.setAttribute("onmousedown","buildNewBoxRect(evt)")
    mySVG.setAttribute("onmouseup","finishNewBoxRect();")

    coverOn()
}
var XBr
var YBr
function trackDrawTrimBox()
{
	//---creating new rect follows mouse til second click
	if( ActiveBoxRectPath&&SecondCornerPointSet==false&&FirstCornerPointSet==true    )
	{
		Dx=XBr
		Dy=SVGy
		Hx=SVGx
		Hy=YBr
		me="M"+XBr+" "+YBr+" "+Dx+" "+Dy+" "+SVGx+" "+SVGy+" "+Hx+" "+Hy+"Z"
		ActiveBoxRectPath.setAttribute("d",me)


	}

     if(FirstCornerPointSet==false && !ActiveBoxRectPath)
     {
        DrawX.style("display", "inline")
        DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")
    }

}



//---create groupRect---

var ActiveBoxRectPath

var FirstCornerPointSet=false
var SecondCornerPointSet=false

function buildNewBoxRect(evt)
{

		if(!ActiveBoxRectPath &&
		 FirstCornerPointSet==false && SecondCornerPointSet==false)
		{
            DrawX.style("display", "block")
            DrawX.attr("stroke", "violet")
            mySVG.style.cursor="default"
            ActiveBoxRectPath=document.createElementNS(NS,"path")
            ActiveBoxRectPath.setAttribute("stroke","black");
            ActiveBoxRectPath.setAttribute("fill","none");
            ActiveBoxRectPath.setAttribute("stroke-width","1");
            ActiveBoxRectPath.setAttribute("stroke-dasharray","5,5");
            mySVG.appendChild(ActiveBoxRectPath)
            XBr=SVGx;
            YBr=SVGy;
            firstPoint="M"+XBr+" "+YBr;
            ActiveBoxRectPath.setAttribute("d",firstPoint);
            FirstCornerPointSet=true;
            DrawX.attr("transform","translate("+XBr+","+YBr+")")
		}


}
//---onmouse move;see main.showCoords(evt)



//---onmouseup-----

function finishNewBoxRect()
{

	if(ActiveBoxRectPath)
	{//---2nd click---

		/*---build a rect from the path points---
		1. compute the upper left, x,y
		2. compute the width
		3. compute the height
		*/
         SecondPoint=true
		var reM=/M/
		var reZ=/Z/
		d=ActiveBoxRectPath.getAttribute("d")
		d=d.replace(reM,"")
		d=d.replace(reZ,"")
		dSplit=d.split(" ")

		for(i=0;i<dSplit.length;i++)
		{
			x=parseFloat(dSplit[i])
			y=parseFloat(dSplit[i+1])

			XY=x+y
			if(i==0)
			{
				minXY=XY
				minPnt=0
			}
			else
			if(XY<minXY)
			{
				minXY=XY
				minPnt=(i/2)
			}
			i++
		}

		if(minPnt==0)
		{
			rectX=XBr
			rectY=YBr
			width=SVGx-XBr
			height=SVGy-YBr
		}
		else if(minPnt==1)
		{
			rectX=XBr
			rectY=SVGy
			width=SVGx-XBr
			height=YBr-SVGy
		}
		else if(minPnt==2)
		{
			rectX=SVGx
			rectY=SVGy
			width=XBr - SVGx
			height=YBr - SVGy
		}
		else if(minPnt==3)
		{
			rectX=SVGx
			rectY=YBr
			width=XBr - SVGx
			height=SVGy-YBr
		}

		if(width!=0 && height!=0)
		{
		    mySVG.removeAttribute("onmousedown")
       mySVG.removeAttribute("onmouseup")

	  ActiveBoxRectPath.removeAttribute("stroke-dasharray")
	 ActiveBoxRectPath.removeAttribute("stroke")
	 ActiveBoxRectPath.removeAttribute("stroke-width")
	  ActiveBoxRectPath.setAttribute("pointer-events","none")

            var matrix=domActiveElemG.getCTM()
             var myTfm=decomposeMatrix(matrix)

             var transX= -myTfm.translateX
            var transY=  -myTfm.translateY
            if(myTfm.rotation==0)
            ActiveBoxRectPath.setAttribute("transform","translate("+transX+" "+transY+")")
            else
            ActiveBoxRectPath.setAttribute("transform","translate("+transX+" "+transY+")rotate("+myTfm.rotation+")")
             domActiveElemG.appendChild(ActiveBoxRectPath)


         var clipPath=document.createElementNS(NS,"clipPath")
         clipPath.id="myClipPath"
            clipPath.appendChild(ActiveBoxRectPath)
            domActiveElemG.appendChild(clipPath)
            domActiveElemG.setAttribute("clip-path","url(#myClipPath)")

              var edgePath=document.createElementNS(NS,"path")
              edgePath.setAttribute("id","edgePath")
              edgePath.setAttribute("stroke","black")
              edgePath.setAttribute("stroke-width","2")
              edgePath.setAttribute("fill","none")
               edgePath.setAttribute("pointer-events","none")
               edgePath.setAttribute("transform",ActiveBoxRectPath.getAttribute("transform"))
               edgePath.setAttribute("d",ActiveBoxRectPath.getAttribute("d"))
               edgePath.setAttribute("pointer-events","none")
               domActiveElemG.appendChild(edgePath)

            DrawX.style("display","none")
           SecondCornerPointSet=true

             domActiveElemG.setAttribute("cursor","move")
 domActiveElemG.setAttribute("class","dragTargetObj")
     mySVG.setAttribute("onmousedown", "startDragTessellate(evt)")
    mySVG.setAttribute("onmousemove", "dragTessellate(evt)")
    mySVG.setAttribute("onmouseup", "endDragTessellate()")
            console.log(domActiveElemG)






           var cw = addElemTessellateCw
              cw.cancelTrimBoxButton.disabled=true
              cw.trimBoxButton.disabled=true


          TrimBox=false
		}
       coverOff()
	}



}


function cancelTrimBox()
{
    var cw = addElemTessellateCw
   mySVG.removeChild(ActiveBoxRectPath)
ActiveBoxRectPath=null
 FirstCornerPointSet=false
SecondCornerPointSet=false

      coverOff()
    cw.trimBoxButton.disabled=false
   cw.cancelTrimBoxButton.disabled=true
  TrimBox=false
}
