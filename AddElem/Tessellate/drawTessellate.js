

var PreviewTileString           ///---loaded onclick tessellate

function previewTessellate()
{
    helpDiv.style.visibility="hidden"
    helpDiv.style.height="1px"
    selectDrawElemDiv.style.visibility="hidden"
    introDiv.style.visibility="hidden"

    schematicHelpLibraryDiv.style.visibility="hidden"
    schematicHelpLibraryDiv.style.height="1px"


    previewTessellateFrameDiv.style.visibility="visible"
}

function closeTessellatePreview()
{
    previewTessellateFrameDiv.style.visibility="hidden"

   selectDrawElemDiv.style.visibility="visible"

}



function openAddTessellateDraw()
{
    if(addElemTessellateLoad==true)
    {
         startTessellateDraw()

   }
       openIframe("AddElem", "addElemTessellate", 0)

}


function closeDrawTessellate()
{
     if(addElemTessellateViz==true)
    {
         if(EditTessellate)
        {

                var elemObjEdit = document.getElementById(DrawTessellateEditId)

                elemObjEdit.style.display = "inline"

                domActiveElemG.removeAttribute("transform")
                domActiveElemG.removeAttribute("cursor")
                domActiveElemG.removeAttribute("class")
                domActiveElemG.removeAttribute("onmouseup")
                for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
                    domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))
                domActiveElemG.appendChild(dragDot)
        }
        if(DrawTessellate==true && ActiveElem)
        {
            domActiveElemG.removeAttribute("transform")
            domActiveElemG.removeAttribute("cursor")
            for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
                domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))
            domActiveElemG.appendChild(dragDot)
            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawTessellate()") //---click to add more icons for this session---

        }

        if(mySVG.getElementById("myClipPath"))
        {
          mySVG.removeChild(mySVG.getElementById("myClipPath"))


        }
        if(mySVG.getElementById("edgePath"))
        {
          mySVG.removeChild(mySVG.getElementById("edgePath"))

        }
        domActiveElemG.removeAttribute("clip-path")

           EdgePath=mySVG.getElementById("edgePath")
      ActiveBoxRectPath=null
        closeIframe("addElemTessellate");
        coverOff()

        var cw = addElemTessellateCw

          cw.trChange1.style.visibility="hidden"
          cw.trChange2.style.visibility="hidden"
        DraggingObj = false
        DrawTessellate = false
        EditTessellate = false
        cw.trimBoxButton.disabled=true
        cw.cancelTrimBoxButton.disabled=true
        TrimBox=false
        Clip=false
      SecondCornerPointSet=false
      FirstCornerPointSet=false

        mySVG.removeAttribute("onmousedown")
        mySVG.removeAttribute("onmousemove")
        mySVG.removeAttribute("onmouseup")

        mySVG.removeAttribute('onclick')


        activeElem = null
        ActiveElem = null

        DrawX.style("display", "none")
        DrawX.attr("stroke", "violet")
        DrawX.attr("transform", null)



         cw.drawTessellateFinishButton.disabled = true
        cw.drawTessellateCancelButton.disabled = true

        cw.drawTessellateCancelButton.style.borderColor = ""
        cw.drawTessellateDeleteButton.style.visibility = "hidden"
        cw.drawTessellateBotButton.disabled=true

        cw.drawTessellateEditSpan.innerText = "Draw Structural Tessellations"

        cw.containerDiv.style.backgroundColor = "#f0e6ac"


    }
}
var PreviewTileString
var DrawTessellate=false
function startTessellateDraw()
{
     var cw = addElemTessellateCw
    if(EditTessellate==false)
    {
        ActiveElem = null
        activeElem = null
        DrawTessellate = true
           addPreviewTile()

    }



}



var TUCode
var CloneTile
var EdgeLen
var Template
//---init ----
var ColsValue
var RowsValue
var SaveBorderPoly
var SaveTileG  //<g id="mainPolyG" transform="" stroke="rgb(0,0,0)" stroke-width="1"><polygon id="mainPoly" fill="rgb(252, 194, 0)" onmouseover="setChange(evt)" onmouseout="unhiliteChange(evt)" onclick="changeMe(evt)" points="44.9999,40.9802 15,40.9802 -4.95911e-005,66.9612 15,92.9423 44.9999,92.9423 59.9997,66.9612" seed="0"></polygon><polygon fill="rgb(224, 176, 255)" onmouseover="setChange(evt)" onmouseout="unhiliteChange(evt)" onclick="changeMe(evt)" points="44.9999,40.9802 29.9999,14.9995 15,40.9802" seed="1"></polygon><polygon fill="rgb(224, 176, 255)" onmouseover="setChange(evt)" onmouseout="unhiliteChange(evt)" onclick="changeMe(evt)" points="44.9999,92.9423 15,92.9423 29.9999,118.923" seed="2"></polygon><polygon fill="rgb(41, 171, 135)" onmouseover="setChange(evt)" onmouseout="unhiliteChange(evt)" onclick="changeMe(evt)" points="70.9808,25.9805 55.9805,4.57764e-005 29.9999,14.9995 44.9999,40.9802" seed="3"></polygon><polygon fill="rgb(41, 171, 135)" onmouseover="setChange(evt)" onmouseout="unhiliteChange(evt)" onclick="changeMe(evt)" points="85.9807,51.9622 70.9808,25.9805 45.0005,40.9812 59.9997,66.9612" seed="4"></polygon></g>
 var BorderPoly

function addPreviewTile()
{
    var cw = addElemTessellateCw
    cw.trChange1.style.visibility="hidden"
    cw.trChange2.style.visibility="hidden"
    HzTileCnt=1 //---horizontal tiles/cols---
    VtTileCnt=1//---vertical tiles/rows---
    Coloring=false
    Sizing=false
    Rotating=false
    RowColumn=false

    //----clear previous----
    cw.tileUnitDiv.innerHTML='<svg overflow=visible xmlns="http://www.w3.org/2000/svg" id="tileUnitSVG"  pointer-events="all"  copyright="Francis Hemsher, 2013">'+
    '</svg>'
    domActiveElemG.removeAttribute("transform")


    mySVG.appendChild(dragDot)


    var parser = new DOMParser();
    var	xmlDoc=parser.parseFromString(PreviewTileString, "text/xml").documentElement ;

    if(xmlDoc.getAttribute("template"))
    Template=xmlDoc.getAttribute("template")
    else //---rhombic do not have template attrib---
    Template=xmlDoc.getAttribute("code")

    EdgeLen=parseFloat(xmlDoc.getAttribute("EdgeLen"))

    BorderPoly = xmlDoc.getElementById("BorderPoly")

    BorderPoly.setAttribute("stroke","none")
    BorderPoly.setAttribute("stroke-width","3")

    var mainPolyG = xmlDoc.getElementById("mainPolyG")
       mainPolyG.insertBefore(BorderPoly,mainPolyG.firstChild)

    cw.tileUnitSVG.appendChild(mainPolyG)
    SaveBorderPoly=BorderPoly.cloneNode(true)

    //---place default stroke-width and stroke in top g ,purge from each  seed polygon===
    mainPolyG.setAttribute("stroke","rgb(0,0,0)")
    mainPolyG.setAttribute("stroke-width","1")
    var seeds=mainPolyG.childNodes
    for(var k=0;k<seeds.length;k++)
    {
        if(seeds.item(k).getAttribute("seed"))
        {
        seeds.item(k).removeAttribute("onmouseover")
        seeds.item(k).removeAttribute("onmouseout")
        seeds.item(k).setAttribute("onclick","parent.changeColor(evt)")
        seeds.item(k).setAttribute("fill","none")
        }
    }

    cw.tileUnitSVG.appendChild(mainPolyG)
    SaveTileG=mainPolyG.cloneNode(true)
    cw.tileUnitSVG.setAttribute("code",TUCode)

    var jointColor="black"
    mainPolyG.setAttribute("stroke",jointColor)
    mainPolyG.setAttribute("pointer-events","all")
    var cloneSVG=cw.tileUnitSVG.cloneNode(true)
    cloneSVG.setAttribute("id","changeSVG")
     cloneSVG.setAttribute("pointer-events","none")

     var copyMainPolyG=cloneSVG.getElementById("mainPolyG")
     for(var k=0;k<copyMainPolyG.childNodes.length;k++)
     {
          copyMainPolyG.childNodes.item(k).removeAttribute("onclick")



     }

    cw.changeDiv.innerHTML=new XMLSerializer().serializeToString(cloneSVG )
    fitSVGinDiv()

    CloneTile=mainPolyG.cloneNode(true)

    CloneTile.removeAttribute("transform")

    CloneTile.setAttribute("id","cloneTile")
    var seeds=CloneTile.childNodes
    for(var k=0;k<seeds.length;k++)
    {
        var seed=seeds.item(k)
        seed.removeAttribute("onclick")
    }


    mySVG.setAttribute("onclick","tessellate()")

}


var TessBorders
var TessTiles
var SaveTransform
var Clip=false
var EdgePath
//--click on drawing---
function tessellate()
{

    coverOn()


    var cw = addElemTessellateCw
    cw.drawTessellateFinishButton.disabled = false
    cw.drawTessellateCancelButton.disabled = false

    if(!ActiveElem)
    {
        domActiveElemG.setAttribute("transform","translate("+SVGx+","+SVGy+")")
        domActiveElemG.setAttribute("class","dragTargetObj")
        domActiveElemG.setAttribute("cursor","move")
    }
    else
    {

        if(domActiveElemG.getAttribute("clip-path"))
        {
          if(EditTessellate==false)
          {
          Clip=mySVG.getElementById("myClipPath")
           EdgePath=mySVG.getElementById("edgePath")
          }
           else
           {
           Clip=mySVG.getElementById(ClipID)
          EdgePath=mySVG.getElementById(EdgeID)
          }
        }
         else
          Clip=false
    }

    if(Coloring)
    {
       for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
         domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))

        CloneTile=cw.changeSVG.getElementById("mainPolyG").cloneNode(true)

        for(var k=0;k<CloneTile.childNodes.length;k++)
        {
            var seed=CloneTile.childNodes.item(k).getAttribute("seed")

            if(seed==PalletSeed)
                CloneTile.childNodes.item(k).setAttribute("fill",PalletColor)

        }

        Coloring=false
    }
    if(Rotating)
    {
       for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
        domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))

        CloneTile=cw.changeSVG.getElementById("mainPolyG").cloneNode(true)
        for(var k=0;k<CloneTile.childNodes.length;k++)
        {
            var seed=CloneTile.childNodes.item(k)
            seed.removeAttribute("onclick")
        }
        Rotating=false
    }
    if(Sizing)
    {
       for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
        domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))

        CloneTile=cw.changeSVG.getElementById("mainPolyG").cloneNode(true)
        for(var k=0;k<CloneTile.childNodes.length;k++)
        {
            var seed=CloneTile.childNodes.item(k)
            seed.removeAttribute("onclick")
        }
        Sizing=false
    }
    if(RowColumn)
    {
        for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
           domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))

        CloneTile=cw.changeSVG.getElementById("mainPolyG").cloneNode(true)
        for(var k=0;k<CloneTile.childNodes.length;k++)
        {
            var seed=CloneTile.childNodes.item(k)
            seed.removeAttribute("onclick")
        }
        RowColumn=false
    }

    TessTiles= domActiveElemG.appendChild(document.createElementNS(NS,"g"))
    TessTiles.setAttribute("id","TessTiles")
    TessBorders= domActiveElemG.appendChild(document.createElementNS(NS,"g"))
    TessBorders.setAttribute("id","TessBorders")
   TessBorders.setAttribute("visibility","hidden")

    CloneBorder=BorderPoly.cloneNode(true)
    CloneBorder.removeAttribute("style") //---visibiliy=hidden
    CloneBorder.removeAttribute("stroke")
    CloneBorder.removeAttribute("stroke-width")
    CloneBorder.id="CloneBorder"


    placeTileSymbols()

}

var HzTileCnt=1 //---horizontal tiles/cols---
var VtTileCnt=1//---vertical tiles/rows---
var TransX
var TransY
var TransRowX
var TransRowY
function placeTileSymbols()
{

    var cw = addElemTessellateCw
    cw.trChange1.style.visibility="visible"
    cw.trChange2.style.visibility="visible"
    var startRowCnt=0
    var startColCnt=0

    var templateKeys=eval("trans"+Template)

    //---for col=0---
    var parentKeyPnt0=templateKeys[0][1]
    var childKeyPnt0=templateKeys[0][3]

    var parentKeyPnt1=templateKeys[1][1]
    var childKeyPnt1=templateKeys[1][3]
    CloneTile=cw.changeSVG.getElementById("mainPolyG")
    CloneBorder=cw.changeSVG.getElementById("BorderPoly")


   for(var row=startRowCnt;row<VtTileCnt;row++)
   {
         for(var col=startColCnt;col<HzTileCnt;col++)
		 {
            if(row==startRowCnt&&col==startColCnt) //---the key at 0,0, ie the 'first" poly tile---
			{
               var tile=CloneTile.cloneNode(true)

              var cloneBorder=CloneBorder.cloneNode(true)
		       cloneBorder.id="Border"+startColCnt+"_"+startRowCnt
			   TessBorders.appendChild(cloneBorder)

			   tile.id="Tile"+startColCnt+"_"+startRowCnt
			   TessTiles.appendChild(tile)

			}
			//---first column---
            else if(col==startColCnt&&row>startRowCnt)
			{
                var prevKeyPoly=document.getElementById("Border"+startColCnt+"_"+(row-1))

                var prevKeyPnts=polyPointsArray(prevKeyPoly)
                var keyPnt=prevKeyPnts[parentKeyPnt0]
                var keyX=keyPnt[0]
                var keyY=keyPnt[1]

                var myPnt=prevKeyPnts[childKeyPnt0]
                var myX=myPnt[0]
                var myY=myPnt[1]

                TransX=row*(keyX-myX)
                TransY=row*(keyY-myY)

                var cloneBorder=CloneBorder.cloneNode(true)
                cloneBorder.id="Border"+col+"_"+row
                TessBorders.appendChild(cloneBorder)
                translatePoly(mySVG,cloneBorder,TransX,TransY)

                var tile=CloneTile.cloneNode(true)

                tile.id="Tile"+col+"_"+row
                tile.setAttribute("transform","translate("+TransX+","+TransY+")")
                TessTiles.appendChild(tile)

			}
            //----top row-----
			else if(row==startRowCnt &&col>startColCnt)
			{
                var prevKeyPoly=document.getElementById("Border"+(col-1)+"_"+startRowCnt)
                var prevKeyPnts=polyPointsArray(prevKeyPoly)

                var keyPnt=prevKeyPnts[parentKeyPnt1]

                var keyX=keyPnt[0]
                var keyY=keyPnt[1]

                var myPnt=prevKeyPnts[childKeyPnt1]
                var myX=myPnt[0]
                var myY=myPnt[1]

                TransX=col*(keyX-myX)
                TransY=col*(keyY-myY)

                var cloneBorder=CloneBorder.cloneNode(true)
                cloneBorder.id="Border"+col+"_"+row
                TessBorders.appendChild(cloneBorder)
                translatePoly(mySVG,cloneBorder,TransX,TransY)


                var tile=CloneTile.cloneNode(true)

                tile.id="Tile"+col+"_"+row

                tile.setAttribute("transform","translate("+TransX+","+TransY+")")
                TessTiles.appendChild(tile)

			}
            //---remaining rows/cols------
			else if(col>startColCnt && row>startRowCnt)
			{
                var prevRowPoly=document.getElementById("Border"+(col)+"_"+(row-1))
                var prevRowPnts=polyPointsArray(prevRowPoly)
                var keyRowPnt=prevRowPnts[parentKeyPnt0]
                var keyRowX=keyRowPnt[0]
                var keyRowY=keyRowPnt[1]

                var myRowPnt=prevRowPnts[childKeyPnt0]
                var myRowX=myRowPnt[0]
                var myRowY=myRowPnt[1]

                TransRowX=row*(keyRowX-myRowX)
                TransRowY=row*(keyRowY-myRowY)

                var prevKeyPoly=document.getElementById("Border"+(col-1)+"_"+(row))
                var prevKeyPnts=polyPointsArray(prevKeyPoly)
                var keyPnt=prevKeyPnts[parentKeyPnt1]
                var keyX=keyPnt[0]
                var keyY=keyPnt[1]

                var myPnt=prevKeyPnts[childKeyPnt1]
                var myX=myPnt[0]
                var myY=myPnt[1]
                TransX=col*(keyX-myX)+TransRowX
                TransY=col*(keyY-myY)+TransRowY

                var cloneBorder=CloneBorder.cloneNode(true)
                cloneBorder.id="Border"+col+"_"+row
                TessBorders.appendChild(cloneBorder)
                translatePoly(mySVG,cloneBorder,TransX,TransY)


                var tile=CloneTile.cloneNode(true)

                tile.id="Tile"+col+"_"+row

                tile.setAttribute("transform","translate("+TransX+","+TransY+")")
                TessTiles.appendChild(tile)

			}

		 }
      startBBox()

   }
   if(Clip!=false)
      {
        domActiveElemG.appendChild(Clip)
        domActiveElemG.appendChild(EdgePath)
      }
}

//--init transX transY---

var TessTransX
var TessTransY
function startBBox()
{
        var bb=TessTiles.getBBox()
        var bbRect=document.createElementNS(NS,"rect")

        bbRect.setAttribute("fill","none")
        bbRect.setAttribute("stroke","lime")
        bbRect.setAttribute("stroke-width",5)
        bbRect.setAttribute("x",bb.x)
        bbRect.setAttribute("y",bb.y)
        bbRect.setAttribute("width",bb.width)
        bbRect.setAttribute("height",bb.height)

        domActiveElemG.appendChild(bbRect)
        var bbCentroidX=bb.x+.5*bb.width
        var bbCentroidY=bb.y+.5*bb.height

        var dwgCenterX=0
        var dwgCenterY=0

        TessTransX=dwgCenterX-bbCentroidX
        TessTransY=dwgCenterY-bbCentroidY


        bbRect.setAttribute("transform","translate("+TessTransX+","+TessTransY+")" )
        TessTiles.setAttribute("transform","translate("+TessTransX+","+TessTransY+")" )

        mySVG.removeAttribute("onclick")
        mySVG.setAttribute("onmousedown","startDragTessellate(evt)")
        mySVG.setAttribute("onmousemove","dragTessellate(evt)")
        mySVG.setAttribute("onmouseup","endDragTessellate()")
        ActiveElem=domActiveElemG
        DrawX.style("display", "none")
        // TessBorders.setAttribute("transform","translate("+TessTransX+","+TessTransY+")")

        setTimeout(dumpBorders,1000)

        domActiveElemG.removeChild(bbRect)

}

function dumpBorders()
{
  for(var k=TessBorders.childNodes.length-1;k>=0;k--)
    TessBorders.removeChild(TessBorders.childNodes.item(k))

}

//---on add icon DrawX follows cursor
var EditTessellate=false
var TessellateDeleted=false

function trackDrawTessellate()
{
    var cw = addElemTessellateCw

    if( ZoomDrawing==false&&ActiveElem==null&&EditTessellate==false && TessellateDeleted==false)
    {
        DrawX.style("display", "inline")
       DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")



    }
}

        var ClipID
        var EdgeID
function finishDrawTessellate()
{

    if(EditTessellate==true)
        finishEditTessellate()
        else
        {       var utcms=new Date().getTime()
            var cw = addElemTessellateCw
            domActiveElemG.removeAttribute("class")
            domActiveElemG.removeAttribute("onmouseup")
            coverOff()
             if(domActiveElemG.getAttribute("clip-path") )
            {
              var cp=domActiveElemG.getElementsByTagName("clipPath")[0]
                 cp.id="clipPath"+utcms
                domActiveElemG.setAttribute("clip-path","url(#"+cp.id+")")
                var myEdge=document.getElementById("edgePath")
                     myEdge.id="edgePath"+utcms
                 ClipID=cp.id
                 EdgeID=myEdge.id

            }
            var finishedElem = document.getElementById("domActiveElemG").cloneNode(true)



            domActiveElemG.removeAttribute("transform")
            domActiveElemG.removeAttribute("cursor")
            for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
            domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))
            domActiveElemG.appendChild(dragDot)

            finishedElem.removeAttribute("cursor")
            finishedElem.removeAttribute("requiredExtensions")
            finishedElem.removeAttribute("systemLanguage")


            var id = "tessellate"+utcms

            finishedElem.setAttribute("id", id)
            finishedElem.setAttribute("class", "tessellateElem")
            finishedElem.setAttribute("rows",  VtTileCnt)
            finishedElem.setAttribute("cols", HzTileCnt)

            mySVG.removeAttribute("onmousedown")
            mySVG.removeAttribute("onmousemove")
            mySVG.removeAttribute("onmouseup")

            finishedElem.setAttribute("onmousedown", "editTessellateDraw("+id+",evt)")

            var docu = new DOMParser().parseFromString('<xml></xml>',  "application/xml")
            var cdata = docu.createCDATASection(cw.tileUnitDiv.innerHTML);
            docu.getElementsByTagName('xml')[0].appendChild(cdata);
            finishedElem.appendChild(cdata)

            var docuChange = new DOMParser().parseFromString('<xml></xml>',  "application/xml")
            var cdataChange = docuChange.createCDATASection(cw.changeDiv.innerHTML);
            docuChange.getElementsByTagName('xml')[0].appendChild(cdataChange);
            finishedElem.appendChild(cdataChange)

             domElemG.appendChild(finishedElem)

            ActiveElem = null
            activeElem = null


            mySVG.setAttribute("onclick","tessellate()")

            DrawX.style("display", "none")


            cw.drawTessellateFinishButton.disabled = true
            cw.drawTessellateCancelButton.disabled = true
            cw.drawTessellateBotButton.disabled=true


        }
}




function cancelDrawTessellate()
{
    var cw = addElemTessellateCw
    if(EditTessellate==true)
        cancelEditTessellate()
        else
        {
            domActiveElemG.removeAttribute("transform")
            domActiveElemG.removeAttribute("cursor")
            for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
                domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))
            domActiveElemG.appendChild(dragDot)
            activeElem = null
            // d3SVG.style("cursor", "default")
            ActiveElem = null

            mySVG.setAttribute('onclick', "placeDrawTessellate()") //---click to add more icons for this session---

            cw.drawTessellateFinishButton.disabled = true
            cw.drawTessellateBotButton.disabled=true
            cw.drawTessellateCancelButton.disabled = true


            coverOff()

        }

        cw.drawTessellateCancelButton.style.borderColor = ""

}
//====================edit/update ===============================

var EditTessellate = false
var DrawTessellateEditId
var EditThisTessellate
function editTessellateDraw(elemObjEdit, evt) //--right button/mousedown on tessellate---
{
    var isRightMB;
    var evtW = window.event;
    if(evtW)
    {
        isRightMB = evtW.which == 3;
        if (!isRightMB) // IE, Opera
            isRightMB = evtW.button == 2;
    }
    else //---firefox--
        isRightMB = evt.which == 3;

    if(isRightMB&&DrawTessellate==false&&ZoomDrawing==false)
    {
        EditThisTessellate = elemObjEdit

        DrawTessellateEditId = elemObjEdit.getAttribute("id")//---used in cancel edit--

        ActiveElem = null
        EditTessellate = true
        if(addElemTessellateLoad==false)
        {
            openIframe("AddElem", "addElemTessellate", 10)

        }
        else if(addElemTessellateViz==false)
        {
            openIframe("AddElem", "addElemTessellate", 10)
            setEditTessellate()
        }
        else
            setEditTessellate()

    }
    if(isRightMB&&ZoomDrawing==true ) //---zoom drag
    {
        mySVG.setAttribute("onmousedown", "startDragZoom(evt)")
        mySVG.setAttribute("onmousemove", "dragZoom(evt)")
        mySVG.setAttribute("onmouseup", "endDragZoom(evt)")
        d3.select("#mySVG").on("mousedown.zoom", null)

        var dragTarget=evt.target

        var classed=dragTarget.getAttribute("class")
        dragTarget.setAttribute("class", "dragTargetObj")
        dragTarget.removeAttribute("onmousedown")
        dragTarget.setAttribute("style","cursor:move")
       dragTarget.setAttribute("opacity",.4)
        DrawX.style("display", "none")
        ZoomDraggedElems.push([dragTarget,"editTessellateDraw("+dragTarget.id+",evt)",classed])
    }
}
//---after iframe loaded see sendSize() at addElemTessellate.htm---
var EditTessellateObj
var TuHTML
function setEditTessellate()
{
    coverOn()

    mySVG.removeAttribute('onclick')
    var cw = addElemTessellateCw
    cw.trChange1.style.visibility="visible"
    cw.trChange2.style.visibility="visible"

    var elemObjEdit = document.getElementById(DrawTessellateEditId)
        console.log(elemObjEdit)

    EditTessellateObj = elemObjEdit.cloneNode(true)
    TuHTMLChange=EditTessellateObj.lastChild.data
    EditTessellateObj.removeChild(EditTessellateObj.lastChild)
    TuHTML=EditTessellateObj.lastChild.data
    EditTessellateObj.removeChild(EditTessellateObj.lastChild)


    VtTileCnt=+EditTessellateObj.getAttribute("rows")
    HzTileCnt=+EditTessellateObj.getAttribute("cols")

       console.log(EditTessellateObj)

    elemObjEdit.style.display = "none"
    EditTessellateObj.removeAttribute("onmousedown")


    cw.tileUnitDiv.innerHTML=TuHTML
    cw.changeDiv.innerHTML=TuHTMLChange

    mySVG.appendChild(dragDot)
    domActiveElemG.setAttribute("transform",EditTessellateObj.getAttribute("transform"))
    for(var k=0;k<EditTessellateObj.childNodes.length;k++)
    {
            var node= EditTessellateObj.childNodes.item(k).cloneNode(true)
         domActiveElemG.appendChild(node)

    }

     if(elemObjEdit.getAttribute("clip-path"))
        domActiveElemG.setAttribute("clip-path",elemObjEdit.getAttribute("clip-path"))


    domActiveElemG.setAttribute("class","dragTargetObj")
 console.log(domActiveElemG)
    ActiveElem = d3.select("#domActiveElemG")
    activeElem = document.getElementById("domActiveElemG")



    cw.drawTessellateDeleteButton.style.visibility = "visible"
    cw.drawTessellateEditSpan.innerHTML = "Edit Tessellate"
    cw.drawTessellateTopButton.style.visibility = "visible"
    cw.drawTessellateBotButton.style.visibility = "visible"

    cw.containerDiv.style.backgroundColor = "orange"
    cw.drawTessellateCancelButton.disabled = false
    cw.drawTessellateFinishButton.disabled = false
    cw.drawTessellateBotButton.disabled=false

    DrawX.attr("stroke", "darkorange")
    DrawX.style("display", "inline")
    DrawX.attr("transform", ActiveElem.attr("transform"))

    mySVG.style.cursor = ""

    var borderColor=elemObjEdit.firstChild.firstChild.getAttribute("stroke")
    for(var k=0;k<cw.borderColorSelect.options.length;k++)
    {
        var clr=cw.borderColorSelect.options[k].value
        if(clr==borderColor)
        {
           cw.borderColorSelect.selectedIndex=k
           cw.borderColorSpan.style.background=clr
           break;
        }
    }






    setTessellateEditDrag()

}
function setTessellateEditDrag()
{

    activeElem.removeAttribute("onmousedown")


    //---timeout??---
    mySVG.setAttribute("onmousedown", "startDragTessellate(evt)")
    mySVG.setAttribute("onmousemove", "dragTessellate(evt)")
    mySVG.setAttribute("onmouseup", "endDragTessellate()")
    ActiveElem.style("cursor", "move")

}




function finishEditTessellate()
{

    var cw = addElemTessellateCw



    coverOff()

    var finishedElem = document.getElementById("domActiveElemG").cloneNode(true)

    domActiveElemG.removeAttribute("transform")
    domActiveElemG.removeAttribute("cursor")
    domActiveElemG.removeAttribute("class")
    domActiveElemG.removeAttribute("onmouseup")
    for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
        domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))
    domActiveElemG.appendChild(dragDot)

    finishedElem.removeAttribute("style")


    finishedElem.setAttribute("id", DrawTessellateEditId)
    finishedElem.setAttribute("class", "tessellateElem")
    finishedElem.setAttribute("rows",  VtTileCnt)
    finishedElem.setAttribute("cols", HzTileCnt)
    finishedElem.removeAttribute("requiredExtensions")
    finishedElem.removeAttribute("systemLanguage")
    mySVG.removeAttribute("onmousedown")
    mySVG.removeAttribute("onmousemove")
    mySVG.removeAttribute("onmouseup")

    finishedElem.setAttribute("onmousedown", "editTessellateDraw("+DrawTessellateEditId+",evt)")

    var docu = new DOMParser().parseFromString('<xml></xml>',  "application/xml")
    var cdata = docu.createCDATASection(cw.tileUnitDiv.innerHTML);
    docu.getElementsByTagName('xml')[0].appendChild(cdata);
    finishedElem.appendChild(cdata)

    var docuChange = new DOMParser().parseFromString('<xml></xml>',  "application/xml")
    var cdataChange = docuChange.createCDATASection(cw.changeDiv.innerHTML);
    docuChange.getElementsByTagName('xml')[0].appendChild(cdataChange);
    finishedElem.appendChild(cdataChange)


    domElemG.insertBefore(finishedElem, EditThisTessellate)
    domElemG.removeChild(EditThisTessellate)


    ActiveElem = null
    activeElem = null
    EditTessellate=false
    closeDrawTessellate()

}



function cancelEditTessellate()
{
    //---return to previous settings
    var elemObjEdit = document.getElementById(DrawTessellateEditId)

    elemObjEdit.style.display = "inline"

    domActiveElemG.removeAttribute("transform")
    domActiveElemG.removeAttribute("cursor")
    domActiveElemG.removeAttribute("class")
    domActiveElemG.removeAttribute("onmouseup")
    for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
        domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))
    domActiveElemG.appendChild(dragDot)
    activeElem = null

    ActiveElem = null
    EditTessellate=false
    closeDrawTessellate()
    //setEditEllipse()

}



//=======================delete molecule==================
var TessellateDeleted = false
//---button---
function removeCurrentDrawTessellate()
{
    domActiveElemG.removeAttribute("class")
    domActiveElemG.removeAttribute("transform")
    domActiveElemG.removeAttribute("cursor")
    for(var k=domActiveElemG.childNodes.length-1;k>=0;k--)
    domActiveElemG.removeChild(domActiveElemG.childNodes.item(k))
    domActiveElemG.appendChild(dragDot)
    var elemObjEdit = document.getElementById(DrawTessellateEditId)
    domElemG.removeChild(elemObjEdit)
    TessellateDeleted = true

   ActiveElem=null
    EditTessellate=false 
    closeDrawTessellate()

}

//====================Top/Bot===================
function topDrawTessellate()
{

    var elemObjEdit = document.getElementById(DrawTessellateEditId)
    var finishedElem = document.getElementById("domActiveElemG").cloneNode(true)
    finishedElem.setAttribute("class", "tessellateElem")
    finishedElem.removeAttribute("style")
    finishedElem.removeAttribute("cursor")
    finishedElem.style.cursor = "default"
    finishedElem.setAttribute("id", DrawTessellateEditId)
    finishedElem.setAttribute("onmousedown", "editTessellateDraw("+DrawTessellateEditId+",evt)")

    domElemG.removeChild(elemObjEdit)
    domElemG.appendChild(finishedElem)

    closeDrawTessellate()
}
function botDrawTessellate()
{
    if(EditTessellate)
    {
        var elemObjEdit = document.getElementById(DrawTessellateEditId)
        var finishedElem = document.getElementById("domActiveElemG").cloneNode(true)

        finishedElem.setAttribute("class", "tessellateElem")
        finishedElem.removeAttribute("style")
        finishedElem.style.cursor = "default"
        finishedElem.removeAttribute("cursor")

        finishedElem.setAttribute("id", DrawTessellateEditId)
        finishedElem.setAttribute("onmousedown", "editTessellateDraw("+DrawTessellateEditId+",evt)")

        domElemG.removeChild(elemObjEdit)
        domElemG.insertBefore(finishedElem,domElemG.firstChild)

       closeDrawTessellate()
   }
   else
   {
        finishDrawTessellate()
        domElemG.insertBefore(domElemG.lastChild,domElemG.firstChild)
   }

}

function fitSVGinDiv(){
     var cw = addElemTessellateCw
	var divWH=200
	cw.tileUnitDiv.style.width=divWH+"px"
	cw.tileUnitDiv.style.height=divWH+"px"


	var bb=cw.tileUnitSVG.getBBox()
	var bbx=bb.x
	var bby=bb.y
	var bbw=bb.width
	var bbh=bb.height
     var cx=bbx+.5*bbw
    var cy=bby+.5*bbh
    //--use greater of bbw vs bbh--
	if(bbw>=bbh)
		var factor=bbw/divWH
	else
		var factor=bbh/divWH

	var vbWH=divWH*factor

	var vbX=(bbw-vbWH)/2
	var vbY=(bbh-vbWH)/2


	  cw.tileUnitSVG.setAttribute("viewBox",vbX+" "+vbY+" "+vbWH+" "+vbWH)


		cw.tileUnitSVG.setAttribute("width","100%")
		cw.tileUnitSVG.setAttribute("height","100%")
       var scale=1/factor
      resizeChangeTU(scale) ///---tileSize.js----

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


function ctmScreenPolygon(myPoly)
{
	var ctm = myPoly.getScreenCTM()
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

/*
 tess_E
 0
:
(4) ["0_0", "6", "0_1", "2"]
1
:
(4) ["0_0", "5", "1_0", "0"]
*/

//---key Tiles & Key Points---
//["0_0",7,"1_0",2,"0_0",5,"0_1",0]

//["1_0",4,"0_0",11,"1_0",8,"1_1",1]


var transStar_Hex2_sq=[]
transStar_Hex2_sq[0]=["0_0",4,"0_1",11]
transStar_Hex2_sq[1]=["0_0",8,"1_0",1]



var transHex2_rh2_60=[]
transHex2_rh2_60[0]=["0_0",7,"0_1",2]
transHex2_rh2_60[1]=["0_0",5,"1_0",0]

var transflourette=[]
transflourette[0]=["0_0",12,"0_1",2]
transflourette[1]=["0_0",14,"1_0",6]


var transRhomb_5_10=[]
transRhomb_5_10[0]=["0_0",15,"0_1",5]
transRhomb_5_10[1]=["0_0",14,"1_0",0]


var transtess_E=[]
transtess_E[0]=["0_0",6,"0_1",2]
transtess_E[1]=["0_0",5,"1_0",0]
var transTess_C=[]
transTess_C[0]=["0_0",11,"0_1",4]
transTess_C[1]=["0_0",9,"1_0",0]


var transPent_04=[]
transPent_04[0]=["0_0",3,"0_1",1]
transPent_04[1]=["0_0",5,"1_0",1]

var transStar_2tri=[]
transStar_2tri[0]=["0_0",4,"0_1",0]
transStar_2tri[1]=["0_0",6,"1_0",1]

var transRhomb=[]
transRhomb[0]=["0_0",15,"0_1",5]
transRhomb[1]=["0_0",10,"1_0",0]

 var transRhomb8_sq=[]
transRhomb8_sq[0]=["0_0",22,"0_1",5]
transRhomb8_sq[1]=["0_0",13,"1_0",0]


var transStar_5_5=[]
transStar_5_5[0]=["0_0",15,"0_1",6]
transStar_5_5[1]=["0_0",10,"1_0",25]

//----rhombic fixed CCW---
var transA2_1_0_R=[]
transA2_1_0_R[0]=["0_0",3,"0_1",1]
transA2_1_0_R[1]=["0_0",5,"1_0",1]
var transA2_2_1_R=[]
transA2_2_1_R[0]=["0_0",7,"0_1",1]
transA2_2_1_R[1]=["0_0",9,"1_0",4]
var transA2_3_1_0=[]
transA2_3_1_0[0]=["0_0",6,"0_1",1]
transA2_3_1_0[1]=["0_0",8,"1_0",3]
var transA2_3_1_R=[]
transA2_3_1_R[0]=["0_0",4,"0_1",9]
transA2_3_1_R[1]=["0_0",6,"1_0",1]

//=============rhombus new: fixed CCW=============
var transA2_2_1_0R=[]
transA2_2_1_0R[0]=["0_0",7,"0_1",1]
transA2_2_1_0R[1]=["0_0",9,"1_0",4]


var transA2_1_0_R=[]
transA2_1_0_R[0]=["0_0",3,"0_1",1]
transA2_1_0_R[1]=["0_0",5,"1_0",1]
var transA2_2_1_R=[]
transA2_2_1_R[0]=["0_0",7,"0_1",1]
transA2_2_1_R[1]=["0_0",9,"1_0",4]

var transA2_4_1_R=[]
transA2_4_1_R[0]=["0_0",7,"0_1",1]
transA2_4_1_R[1]=["0_0",10,"1_0",4]

var transA2_3_1_R=[]
transA2_3_1_R[0]=["0_0",4,"0_1",9]
transA2_3_1_R[1]=["0_0",6,"1_0",1]

var transA8_7_4_R=[]
transA8_7_4_R[0]=["0_0",10,"0_1",1]
transA8_7_4_R[1]=["0_0",13,"1_0",4]

var transA8_7_2_R=[]
transA8_7_2_R[0]=["0_0",11,"0_1",1]
transA8_7_2_R[1]=["0_0",15,"1_0",6]
var transA8_6_3_R=[]
transA8_6_3_R[0]=["0_0",8,"0_1",1]
transA8_6_3_R[1]=["0_0",12,"1_0",3]

var transA8_6_2_R=[]
transA8_6_2_R[0]=["0_0",9,"0_1",0]
transA8_6_2_R[1]=["0_0",12,"1_0",2]

var transA8_6_1_R=[]
transA8_6_1_R[0]=["0_0",7,"0_1",13]
transA8_6_1_R[1]=["0_0",11,"1_0",3]
var transA8_5_2_R=[]
transA8_5_2_R[0]=["0_0",10,"0_1",1]
transA8_5_2_R[1]=["0_0",13,"1_0",6]
var transA8_5_0_R=[]
transA8_5_0_R[0]=["0_0",8,"0_1",1]
transA8_5_0_R[1]=["0_0",12,"1_0",5]
var transA8_4_2_R=[]
transA8_4_2_R[0]=["0_0",13,"0_1",3]
transA8_4_2_R[1]=["0_0",17,"1_0",8]
var transC6_4_1_R=[]
transC6_4_1_R[0]=["0_0",6,"0_1",0]
transC6_4_1_R[1]=["0_0",8,"1_0",2]
var transA12_5_0_R=[]
transA12_5_0_R[0]=["0_0",8,"0_1",1]
transA12_5_0_R[1]=["0_0",12,"1_0",4]
var transB8_5_0_R=[]
transB8_5_0_R[0]=["0_0",7,"0_1",0]
transB8_5_0_R[1]=["0_0",10,"1_0",3]
var transB6_5_2_R=[]
transB6_5_2_R[0]=["0_0",9,"0_1",2]
transB6_5_2_R[1]=["0_0",11,"1_0",4]
var transA14_5_0_R=[]
transA14_5_0_R[0]=["0_0",10,"0_1",2]
transA14_5_0_R[1]=["0_0",13,"1_0",7]

var transA12_2_0_R=[]
transA12_2_0_R[0]=["0_0",7,"0_1",1]
transA12_2_0_R[1]=["0_0",10,"1_0",4]

var transA12_3_2_R=[]
transA12_3_2_R[0]=["0_0",11,"0_1",2]
transA12_3_2_R[1]=["0_0",15,"1_0",6]

var transA12_4_0_R=[]
transA12_4_0_R[0]=["0_0",8,"0_1",1]
transA12_4_0_R[1]=["0_0",11,"1_0",5]

var transA12_4_2_R=[]
transA12_4_2_R[0]=["0_0",11,"0_1",1]
transA12_4_2_R[1]=["0_0",17,"1_0",5]


var transA12_6_0_R=[]
transA12_6_0_R[0]=["0_0",9,"0_1",1]
transA12_6_0_R[1]=["0_0",11,"1_0",5]

var transA12_6_1_R=[]
transA12_6_1_R[0]=["0_0",10,"0_1",3]
transA12_6_1_R[1]=["0_0",15,"1_0",6]

var transA12_6_2_R=[]
transA12_6_2_R[0]=["0_0",12,"0_1",1]
transA12_6_2_R[1]=["0_0",18,"1_0",6]

var transA12_6_3_R=[]
transA12_6_3_R[0]=["0_0",11,"0_1",2]
transA12_6_3_R[1]=["0_0",16,"1_0",7]


var transA12_8_1_R=[]
transA12_8_1_R[0]=["0_0",10,"0_1",2]
transA12_8_1_R[1]=["0_0",13,"1_0",4]


var transA12_8_2_R=[]
transA12_8_2_R[0]=["0_0",11,"0_1",0]
transA12_8_2_R[1]=["0_0",17,"1_0",6]

var transA12_9_2_R=[]
transA12_9_2_R[0]=["0_0",12,"0_1",20]
transA12_9_2_R[1]=["0_0",16,"1_0",4]

var transA12_10_2_R=[]
transA12_10_2_R[0]=["0_0",11,"0_1",1]
transA12_10_2_R[1]=["0_0",15,"1_0",4]

var transA12_18_4_R=[]
transA12_18_4_R[0]=["0_0",9,"0_1",21]
transA12_18_4_R[1]=["0_0",17,"1_0",2]

var transA14_2_3_R=[]
transA14_2_3_R[0]=["0_0",16,"0_1",4]
transA14_2_3_R[1]=["0_0",21,"1_0",10]

var transA14_5_1_R=[]
transA14_5_1_R[0]=["0_0",10,"0_1",1]
transA14_5_1_R[1]=["0_0",13,"1_0",6]


var transA14_6_0_R=[]
transA14_6_0_R[0]=["0_0",8,"0_1",0]
transA14_6_0_R[1]=["0_0",12,"1_0",4]


var transA14_6_2_R=[]
transA14_6_2_R[0]=["0_0",10,"0_1",1]
transA14_6_2_R[1]=["0_0",12,"1_0",4]

var transA14_7_1_R=[]
transA14_7_1_R[0]=["0_0",11,"0_1",1]
transA14_7_1_R[1]=["0_0",14,"1_0",7]


var transA14_7_3_R=[]
transA14_7_3_R[0]=["0_0",11,"0_1",2]
transA14_7_3_R[1]=["0_0",16,"1_0",7]


var transA14_8_3_R=[]
transA14_8_3_R[0]=["0_0",13,"0_1",3]
transA14_8_3_R[1]=["0_0",18,"1_0",8]

var transA14_9_1_R=[]
transA14_9_1_R[0]=["0_0",10,"0_1",0]
transA14_9_1_R[1]=["0_0",15,"1_0",5]

var transA14_9_7_R=[]
transA14_9_7_R[0]=["0_0",13,"0_1",2]
transA14_9_7_R[1]=["0_0",18,"1_0",5]

var transA14_12_3_R =[]
transA14_12_3_R [0]=["0_0",11,"0_1",0]
transA14_12_3_R [1]=["0_0",15,"1_0",4]


var transA14_12_4_R=[]
transA14_12_4_R[0]=["0_0",13,"0_1",1]
transA14_12_4_R[1]=["0_0",16,"1_0",4]

var transA14_15_7_R=[]
transA14_15_7_R[0]=["0_0",13,"0_1",0]
transA14_15_7_R[1]=["0_0",17,"1_0",4]


var transA16_5_0_R=[]
transA16_5_0_R[0]=["0_0",10,"0_1",1]
transA16_5_0_R[1]=["0_0",12,"1_0",5]

var transA16_7_0_R=[]
transA16_7_0_R[0]=["0_0",9,"0_1",3]
transA16_7_0_R[1]=["0_0",14,"1_0",6]


var transA16_8_2_R=[]
transA16_8_2_R[0]=["0_0",11,"0_1",1]
transA16_8_2_R[1]=["0_0",13,"1_0",3]
var transA16_9_0_R=[]
transA16_9_0_R[0]=["0_0",7,"0_1",0]
transA16_9_0_R[1]=["0_0",11,"1_0",2]

var transA16_10_1_R=[]
transA16_10_1_R[0]=["0_0",5,"0_1",15]
transA16_10_1_R[1]=["0_0",9,"1_0",1]


 var transA16_12_0_R=[]
transA16_12_0_R[0]=["0_0",13,"0_1",1]
transA16_12_0_R[1]=["0_0",20,"1_0",6]


var transA18_3_2_R=[]
transA18_3_2_R[0]=["0_0",12,"0_1",3]
transA18_3_2_R[1]=["0_0",17,"1_0",7]


var transA18_3_3_R=[]
transA18_3_3_R[0]=["0_0",9,"0_1",0]
transA18_3_3_R[1]=["0_0",16,"1_0",4]

var transA18_5_0_R=[]
transA18_5_0_R[0]=["0_0",9,"0_1",1]
transA18_5_0_R[1]=["0_0",11,"1_0",4]


var transA18_7_1_R=[]
transA18_7_1_R[0]=["0_0",10,"0_1",1]
transA18_7_1_R[1]=["0_0",15,"1_0",6]

var transA18_8_0_R=[]
transA18_8_0_R[0]=["0_0",10,"0_1",1]
transA18_8_0_R[1]=["0_0",14,"1_0",6]


var transA18_27_9_R=[]
transA18_27_9_R[0]=["0_0",12,"0_1",28]
transA18_27_9_R[1]=["0_0",16,"1_0",4]

var transA20_6_1_R=[]
transA20_6_1_R[0]=["0_0",11,"0_1",1]
transA20_6_1_R[1]=["0_0",14,"1_0",4]

var transA20_7_2_R=[]
transA20_7_2_R[0]=["0_0",10,"0_1",1]
transA20_7_2_R[1]=["0_0",14,"1_0",3]

var transA20_14_0_R=[]
transA20_14_0_R[0]=["0_0",11,"0_1",2]
transA20_14_0_R[1]=["0_0",14,"1_0",6]

var transA22_9_0_R=[]
transA22_9_0_R[0]=["0_0",7,"0_1",0]
transA22_9_0_R[1]=["0_0",14,"1_0",3]

var transA24_6_2_R=[]
transA24_6_2_R[0]=["0_0",14,"0_1",5]
transA24_6_2_R[1]=["0_0",20,"1_0",10]

var transA24_9_0_R=[]
transA24_9_0_R[0]=["0_0",10,"0_1",0]
transA24_9_0_R[1]=["0_0",13,"1_0",2]

var transA24_12_0_R=[]
transA24_12_0_R[0]=["0_0",13,"0_1",3]
transA24_12_0_R[1]=["0_0",18,"1_0",8]

var transA26_6_0_R=[]
transA26_6_0_R[0]=["0_0",13,"0_1",2]
transA26_6_0_R[1]=["0_0",18,"1_0",5]

var transA28_26_0_R=[]
transA28_26_0_R[0]=["0_0",18,"0_1",9]
transA28_26_0_R[1]=["0_0",26,"1_0",11]


var transA32_14_0_R=[]
transA32_14_0_R[0]=["0_0",13,"0_1",2]
transA32_14_0_R[1]=["0_0",16,"1_0",6]

var transB2_2_1_R=[]
transB2_2_1_R[0]=["0_0",6,"0_1",2]
transB2_2_1_R[1]=["0_0",9,"1_0",4]

var transB2_4_1_R=[]
transB2_4_1_R[0]=["0_0",7,"0_1",1]
transB2_4_1_R[1]=["0_0",11,"1_0",3]

var transB4_4_1_R=[]
transB4_4_1_R[0]=["0_0",8,"0_1",1]
transB4_4_1_R[1]=["0_0",10,"1_0",4]

var transB8_6_0_R=[]
transB8_6_0_R[0]=["0_0",9,"0_1",2]
transB8_6_0_R[1]=["0_0",14,"1_0",4]

var transB8_6_2_R=[]
transB8_6_2_R[0]=["0_0",10,"0_1",1]
transB8_6_2_R[1]=["0_0",12,"1_0",2]

var transB8_6_3_R=[]
transB8_6_3_R[0]=["0_0",10,"0_1",1]
transB8_6_3_R[1]=["0_0",12,"1_0",4]

var transB10_5_0_R=[]
transB10_5_0_R[0]=["0_0",9,"0_1",3]
transB10_5_0_R[1]=["0_0",13,"1_0",6]

var transB10_6_1_R=[]
transB10_6_1_R[0]=["0_0",13,"0_1",3]
transB10_6_1_R[1]=["0_0",17,"1_0",8]

var transB10_7_1_R=[]
transB10_7_1_R[0]=["0_0",9,"0_1",3]
transB10_7_1_R[1]=["0_0",15,"1_0",7]

var transB10_9_2_R=[]
transB10_9_2_R[0]=["0_0",15,"0_1",3]
transB10_9_2_R[1]=["0_0",19,"1_0",8]

var transB12_3_2_R=[]
transB12_3_2_R[0]=["0_0",11,"0_1",3]
transB12_3_2_R[1]=["0_0",14,"1_0",7]

var transB14_6_2_R=[]
transB14_6_2_R[0]=["0_0",8,"0_1",1]
transB14_6_2_R[1]=["0_0",12,"1_0",3]

var transB14_7_1_R=[]
transB14_7_1_R[0]=["0_0",10,"0_1",5]
transB14_7_1_R[1]=["0_0",17,"1_0",7]


var transB14_7_3_R=[]
transB14_7_3_R[0]=["0_0",11,"0_1",2]
transB14_7_3_R[1]=["0_0",14,"1_0",5]

var transB14_9_1_R=[]
transB14_9_1_R[0]=["0_0",9,"0_1",0]
transB14_9_1_R[1]=["0_0",15,"1_0",4]

var transB14_9_7_R=[]
transB14_9_7_R[0]=["0_0",13,"0_1",0]
transB14_9_7_R[1]=["0_0",20,"1_0",5]

var transB14_12_3_R=[]
transB14_12_3_R[0]=["0_0",14,"0_1",2]
transB14_12_3_R[1]=["0_0",18,"1_0",8]

var transB14_15_7_R=[]
transB14_15_7_R[0]=["0_0",18,"0_1",3]
transB14_15_7_R[1]=["0_0",22,"1_0",8]

var transB16_7_0_R=[]
transB16_7_0_R[0]=["0_0",12,"0_1",3]
transB16_7_0_R[1]=["0_0",14,"1_0",5]

var transB16_8_0_R=[]
transB16_8_0_R[0]=["0_0",8,"0_1",0]
transB16_8_0_R[1]=["0_0",12,"1_0",4]

var transB16_10_1_R=[]
transB16_10_1_R[0]=["0_0",9,"0_1",0]
transB16_10_1_R[1]=["0_0",12,"1_0",2]

var transB18_8_0_R=[]
transB18_8_0_R[0]=["0_0",9,"0_1",2]
transB18_8_0_R[1]=["0_0",12,"1_0",4]

var transB18_9_1_R=[]
transB18_9_1_R[0]=["0_0",11,"0_1",1]
transB18_9_1_R[1]=["0_0",14,"1_0",4]

var transB18_27_9_R=[]
transB18_27_9_R[0]=["0_0",18,"0_1",0]
transB18_27_9_R[1]=["0_0",25,"1_0",13]

var transB20_6_0_R=[]
transB20_6_0_R[0]=["0_0",11,"0_1",2]
transB20_6_0_R[1]=["0_0",15,"1_0",7]

var transB20_6_1_R=[]
transB20_6_1_R[0]=["0_0",10,"0_1",1]
transB20_6_1_R[1]=["0_0",13,"1_0",4]

var transB20_9_6_R=[]
transB20_9_6_R[0]=["0_0",13,"0_1",2]
transB20_9_6_R[1]=["0_0",21,"1_0",8]

var transB20_15_6_R=[]
transB20_15_6_R[0]=["0_0",15,"0_1",0]
transB20_15_6_R[1]=["0_0",22,"1_0",10]

var transB20_18_7_R=[]
transB20_18_7_R[0]=["0_0",15,"0_1",2]
transB20_18_7_R[1]=["0_0",19,"1_0",6]

var transB24_9_0_R=[]
transB24_9_0_R[0]=["0_0",11,"0_1",2]
transB24_9_0_R[1]=["0_0",14,"1_0",4]

var transB24_18_3_R=[]
transB24_18_3_R[0]=["0_0",13,"0_1",3]
transB24_18_3_R[1]=["0_0",19,"1_0",5]

var transB24_18_9_R=[]
transB24_18_9_R[0]=["0_0",21,"0_1",6]
transB24_18_9_R[1]=["0_0",26,"1_0",12]

var transB26_12_1_R=[]
transB26_12_1_R[0]=["0_0",8,"0_1",18]
transB26_12_1_R[1]=["0_0",15,"1_0",4]

var transB26_18_6_R=[]
transB26_18_6_R[0]=["0_0",15,"0_1",2]
transB26_18_6_R[1]=["0_0",25,"1_0",9]

var transB30_18_2_R=[]
transB30_18_2_R[0]=["0_0",14,"0_1",28]
transB30_18_2_R[1]=["0_0",23,"1_0",6]


var transB30_18_8_R=[]
transB30_18_8_R[0]=["0_0",18,"0_1",4]
transB30_18_8_R[1]=["0_0",25,"1_0",8]


var transB30_27_7_R=[]
transB30_27_7_R[0]=["0_0",18,"0_1",3]
transB30_27_7_R[1]=["0_0",24,"1_0",9]

var transB32_12_0_R=[]
transB32_12_0_R[0]=["0_0",13,"0_1",1]
transB32_12_0_R[1]=["0_0",18,"1_0",9]

var transB32_12_1_R=[]
transB32_12_1_R[0]=["0_0",20,"0_1",4]
transB32_12_1_R[1]=["0_0",27,"1_0",9]

var transB36_18_1_R=[]
transB36_18_1_R[0]=["0_0",14,"0_1",2]
transB36_18_1_R[1]=["0_0",17,"1_0",7]

var transB36_18_7_R=[]
transB36_18_7_R[0]=["0_0",19,"0_1",5]
transB36_18_7_R[1]=["0_0",25,"1_0",9]

var transC6_6_1_R=[]
transC6_6_1_R[0]=["0_0",8,"0_1",0]
transC6_6_1_R[1]=["0_0",11,"1_0",3]

var transC8_4_0_R=[]
transC8_4_0_R[0]=["0_0",7,"0_1",2]
transC8_4_0_R[1]=["0_0",11,"1_0",5]

var transC10_5_0_R=[]
transC10_5_0_R[0]=["0_0",10,"0_1",1]
transC10_5_0_R[1]=["0_0",13,"1_0",5]

var transC10_6_1_R=[]
transC10_6_1_R[0]=["0_0",10,"0_1",3]
transC10_6_1_R[1]=["0_0",14,"1_0",6]

var transC12_9_2_R=[]
transC12_9_2_R[0]=["0_0",11,"0_1",2]
transC12_9_2_R[1]=["0_0",14,"1_0",7]

var transC14_12_3_R=[]
transC14_12_3_R[0]=["0_0",10,"0_1",0]
transC14_12_3_R[1]=["0_0",18,"1_0",4]






//--- below require CCW fix-----
var transBrokenRose2_5_5_10_tu=[]
transBrokenRose2_5_5_10_tu[0]=["0_0",10,"0_1",0] // first column
transBrokenRose2_5_5_10_tu[1]=["0_0",17,"1_0",1] // first row
var transBrokenRose1_5_5_10_tu=[]
transBrokenRose1_5_5_10_tu[0]=["0_0",13,"0_1",0]
transBrokenRose1_5_5_10_tu[1]=["0_0",14,"1_0",4]
var transBrokenRose3_5_5_10_tu=[]
transBrokenRose3_5_5_10_tu[0]=["0_0",8,"0_1",21]
transBrokenRose3_5_5_10_tu[1]=["0_0",18,"1_0",2]
var trans5_5_10_tu=[]
trans5_5_10_tu[0]=["0_0",10,"0_1",0]
trans5_5_10_tu[1]=["0_0",17,"1_0",3]

var transCompass4_5_20_tu=[]
transCompass4_5_20_tu[0]=["0_0",16,"0_1",32]
transCompass4_5_20_tu[1]=["0_0",24,"1_0",1]
var transRockets3_10_15_tu=[]
transRockets3_10_15_tu[0]=["0_0",11,"0_1",1]
transRockets3_10_15_tu[1]=["0_0",24,"1_0",6]
var transFighters3_10_15_tu=[]
transFighters3_10_15_tu[0]=["0_0",12,"0_1",28]
transFighters3_10_15_tu[1]=["0_0",23,"1_0",7]
var transWaves3_9_18_tu=[]
transWaves3_9_18_tu[0]=["0_0",16,"0_1",0]
transWaves3_9_18_tu[1]=["0_0",23,"1_0",4]
var transArt3_9_18_tu=[]
transArt3_9_18_tu[0]=["0_0",15,"0_1",0]
transArt3_9_18_tu[1]=["0_0",22,"1_0",2]
var transStarburst3_8_24_tu=[]
transStarburst3_8_24_tu[0]=["0_0",22,"0_1",0]
transStarburst3_8_24_tu[1]=["0_0",34,"1_0",2]
var transDancer3_8_24_tu=[]
transDancer3_8_24_tu[0]=["0_0",23,"0_1",1]
transDancer3_8_24_tu[1]=["0_0",37,"1_0",1]
var transShield3_7_42_tu=[]
transShield3_7_42_tu[0]=["0_0",30,"0_1",0]
transShield3_7_42_tu[1]=["0_0",45,"1_0",6]
var transMirror3_7_42_tu_1=[]
transMirror3_7_42_tu_1[0]=["0_0",61,"0_1",2]
transMirror3_7_42_tu_1[1]=["0_0",62,"1_0",21]
var transNutshell3_10_15_tu=[]
transNutshell3_10_15_tu[0]=["0_0",32,"0_1",0]
transNutshell3_10_15_tu[1]=["0_0",48,"1_0",2]
var transWarrior3_9_18_tu=[]
transWarrior3_9_18_tu[0]=["0_0",35,"0_1",0]
transWarrior3_9_18_tu[1]=["0_0",49,"1_0",12]
var transGlobe4_5_20_tu_1=[]
transGlobe4_5_20_tu_1[0]=["0_0",30,"0_1",0]
transGlobe4_5_20_tu_1[1]=["0_0",46,"1_0",1]
var transGear5_5_10_tu=[]
transGear5_5_10_tu[0]=["0_0",20,"0_1",0]
transGear5_5_10_tu[1]=["0_0",34,"1_0",4]
var transRhomb1=[]
transRhomb1[0]=["0_0",2,"0_1",6]
transRhomb1[1]=["0_0",4,"1_0",0]
var trans3_4_4_6_tu=[]
trans3_4_4_6_tu[0]=["0_0",4,"0_1",1]
trans3_4_4_6_tu[1]=["0_0",7,"1_0",2]
var trans3_4_3_12_tu=[]
trans3_4_3_12_tu[0]=["0_0",5,"0_1",0]
trans3_4_3_12_tu[1]=["0_0",13,"1_0",2]
var trans3_3_6_6_tu=[]
trans3_3_6_6_tu[0]=["0_0",3,"0_1",1]
trans3_3_6_6_tu[1]=["0_0",5,"1_0",2]
var trans3_3_4_12_tu=[]
trans3_3_4_12_tu[0]=["0_0",7,"0_1",18]
trans3_3_4_12_tu[1]=["0_0",12,"1_0",0]
var trans4_8_8_tu=[]
trans4_8_8_tu[0]=["0_0",4,"0_1",0]
trans4_8_8_tu[1]=["0_0",7,"1_0",0]
var trans4_6_12_tu=[]
trans4_6_12_tu[0]=["0_0",8,"0_1",0]
trans4_6_12_tu[1]=["0_0",13,"1_0",1]
var trans3_3_3_3_6_tu=[]
trans3_3_3_3_6_tu[0]=["0_0",3,"0_1",6]
trans3_3_3_3_6_tu[1]=["0_0",4,"1_0",0]
var trans3_6_3_6_tu=[]
trans3_6_3_6_tu[0]=["0_0",1,"0_1",4]
trans3_6_3_6_tu[1]=["0_0",3,"1_0",5]
var trans3_12_12_tu=[]
trans3_12_12_tu[0]=["0_0",8,"0_1",1]
trans3_12_12_tu[1]=["0_0",11,"1_0",2]
//var transu2_8_tu=[]
//transu2_8_tu[0]=["0_0",6,"0_1",1]
//transu2_8_tu[1]=["0_0",13,"1_0",2]
var transtetrakis_tu=[]
transtetrakis_tu[0]=["0_0",1,"0_1",0]
transtetrakis_tu[1]=["0_0",2,"1_0",1]

var transu3_1_tu=[]
transu3_1_tu[0]=["0_0",12,"0_1",2]
transu3_1_tu[1]=["0_0",16,"1_0",5]

var transu5_100_tu=[]
transu5_100_tu[0]=["0_0",7,"0_1",13]
transu5_100_tu[1]=["0_0",9,"1_0",2]
//==============above require fix CCW===============



var transu2_1_tu=[]
transu2_1_tu[0]=["0_0",8,"0_1",1]
transu2_1_tu[1]=["0_0",15,"1_0",2]
var transu2_8_tu=[]
transu2_8_tu[0]=["0_0",8,"0_1",2]
transu2_8_tu[1]=["0_0",12,"1_0",4]
var transu2_3_tu=[]
transu2_3_tu[0]=["0_0",3,"0_1",0]
transu2_3_tu[1]=["0_0",5,"1_0",1]

var transtetrakis_tu=[]
transtetrakis_tu[0]=["0_0",1,"0_1",0]
transtetrakis_tu[1]=["0_0",2,"1_0",1]
var transu2_2_tu=[]
transu2_2_tu[0]=["0_0",12,"0_1",5]
transu2_2_tu[1]=["0_0",15,"1_0",7]
var transu2_6_tu=[]
transu2_6_tu[0]=["0_0",7,"0_1",1]
transu2_6_tu[1]=["0_0",9,"1_0",4]
var transu2_4_tu=[]
transu2_4_tu[0]=["0_0",6,"0_1",1]
transu2_4_tu[1]=["0_0",8,"1_0",4]
var transu2_5_tu=[]
transu2_5_tu[0]=["0_0",6,"0_1",1]
transu2_5_tu[1]=["0_0",9,"1_0",2]

var transu2_7_tu=[]
transu2_7_tu[0]=["0_0",6,"0_1",2]
transu2_7_tu[1]=["0_0",9,"1_0",4]
var transu2_9_tu=[]
transu2_9_tu[0]=["0_0",10,"0_1",3]
transu2_9_tu[1]=["0_0",12,"1_0",6]
var transu2_10_tu=[]
transu2_10_tu[0]=["0_0",4,"0_1",11]
transu2_10_tu[1]=["0_0",8,"1_0",1]
var transu2_11_tu=[]
transu2_11_tu[0]=["0_0",5,"0_1",1]
transu2_11_tu[1]=["0_0",7,"1_0",3]
var transu2_12_tu=[]
transu2_12_tu[0]=["0_0",4,"0_1",7]
transu2_12_tu[1]=["0_0",6,"1_0",2]
var transu2_13_tu=[]
transu2_13_tu[0]=["0_0",8,"0_1",0]
transu2_13_tu[1]=["0_0",11,"1_0",3]
var transu2_14_tu=[]
transu2_14_tu[0]=["0_0",3,"0_1",0]
transu2_14_tu[1]=["0_0",6,"1_0",1]
var transu2_15_tu=[]
transu2_15_tu[0]=["0_0",5,"0_1",11]
transu2_15_tu[1]=["0_0",8,"1_0",2]
var transu2_16_tu=[]
transu2_16_tu[0]=["0_0",8,"0_1",2]
transu2_16_tu[1]=["0_0",11,"1_0",5]
var transu2_17_tu=[]
transu2_17_tu[0]=["0_0",4,"0_1",12]
transu2_17_tu[1]=["0_0",8,"1_0",1]
var transu2_18_tu=[]
transu2_18_tu[0]=["0_0",4,"0_1",9]
transu2_18_tu[1]=["0_0",6,"1_0",1]
var transu2_19_tu=[]
transu2_19_tu[0]=["0_0",6,"0_1",10]
transu2_19_tu[1]=["0_0",7,"1_0",2]
var transu2_20_tu=[]
transu2_20_tu[0]=["0_0",4,"0_1",8]
transu2_20_tu[1]=["0_0",6,"1_0",2]

var transu3_2_tu=[]
transu3_2_tu[0]=["0_0",5,"0_1",11]
transu3_2_tu[1]=["0_0",8,"1_0",2]
var transu3_3_tu=[]
transu3_3_tu[0]=["0_0",5,"0_1",0]
transu3_3_tu[1]=["0_0",7,"1_0",3]
var transu3_4_tu=[]
transu3_4_tu[0]=["0_0",5,"0_1",11]
transu3_4_tu[1]=["0_0",7,"1_0",1]
var transu3_7_tu=[]
transu3_7_tu[0]=["0_0",10,"0_1",24]
transu3_7_tu[1]=["0_0",15,"1_0",2]
//---note: 3_8=3_7
var transu3_9_tu=[]
transu3_9_tu[0]=["0_0",8,"0_1",0]
transu3_9_tu[1]=["0_0",10,"1_0",2]
var transu3_10_tu=[]
transu3_10_tu[0]=["0_0",7,"0_1",15]
transu3_10_tu[1]=["0_0",11,"1_0",3]
var transu3_11_tu=[]
transu3_11_tu[0]=["0_0",6,"0_1",0]
transu3_11_tu[1]=["0_0",11,"1_0",1]
var transu3_12_tu=[]
transu3_12_tu[0]=["0_0",6,"0_1",13]
transu3_12_tu[1]=["0_0",9,"1_0",3]
var transu3_13_tu=[]
transu3_13_tu[0]=["0_0",8,"0_1",17]
transu3_13_tu[1]=["0_0",12,"1_0",4]
var transu3_14_tu=[]
transu3_14_tu[0]=["0_0",6,"0_1",13]
transu3_14_tu[1]=["0_0",9,"1_0",3]
var transu3_15_tu=[]
transu3_15_tu[0]=["0_0",7,"0_1",15]
transu3_15_tu[1]=["0_0",12,"1_0",2]
var transu3_16_tu=[]
transu3_16_tu[0]=["0_0",6,"0_1",0]
transu3_16_tu[1]=["0_0",9,"1_0",3]
var transu3_17_tu=[]
transu3_17_tu[0]=["0_0",5,"0_1",0]
transu3_17_tu[1]=["0_0",8,"1_0",2]
var transu3_18_tu=[]
transu3_18_tu[0]=["0_0",5,"0_1",11]
transu3_18_tu[1]=["0_0",8,"1_0",2]
var transu3_19_tu=[]
transu3_19_tu[0]=["0_0",7,"0_1",15]
transu3_19_tu[1]=["0_0",12,"1_0",2]
var transu3_20_tu=[]
transu3_20_tu[0]=["0_0",5,"0_1",11]
transu3_20_tu[1]=["0_0",8,"1_0",2]
var transu3_21_tu=[]
transu3_21_tu[0]=["0_0",6,"0_1",13]
transu3_21_tu[1]=["0_0",10,"1_0",2]
var transu3_22_tu=[]
transu3_22_tu[0]=["0_0",5,"0_1",15]
transu3_22_tu[1]=["0_0",10,"1_0",2]
var transu3_23_tu=[]
transu3_23_tu[0]=["0_0",6,"0_1",13]
transu3_23_tu[1]=["0_0",7,"1_0",1]
var transu3_25_tu=[]
transu3_25_tu[0]=["0_0",5,"0_1",0]
transu3_25_tu[1]=["0_0",8,"1_0",1]
var transu3_26_tu=[]
transu3_26_tu[0]=["0_0",11,"0_1",0]
transu3_26_tu[1]=["0_0",17,"1_0",2]
var transu3_27_tu=[]
transu3_27_tu[0]=["0_0",6,"0_1",2]
transu3_27_tu[1]=["0_0",10,"1_0",3]
var transu3_28_tu=[]
transu3_28_tu[0]=["0_0",5,"0_1",1]
transu3_28_tu[1]=["0_0",8,"1_0",3]
var transu3_29_tu=[]
transu3_29_tu[0]=["0_0",4,"0_1",0]
transu3_29_tu[1]=["0_0",8,"1_0",2]
var transu3_30_tu=[]
transu3_30_tu[0]=["0_0",10,"0_1",2]
transu3_30_tu[1]=["0_0",13,"1_0",6]
var transu3_31_tu=[]
transu3_31_tu[0]=["0_0",8,"0_1",0]
transu3_31_tu[1]=["0_0",11,"1_0",4]
var transu3_32_tu=[]
transu3_32_tu[0]=["0_0",4,"0_1",1]
transu3_32_tu[1]=["0_0",6,"1_0",3]
var transu3_33_tu=[]
transu3_33_tu[0]=["0_0",4,"0_1",11]
transu3_33_tu[1]=["0_0",8,"1_0",1]
var transu3_34_tu=[]
transu3_34_tu[0]=["0_0",9,"0_1",1]
transu3_34_tu[1]=["0_0",13,"1_0",3]
var transu3_35_tu=[]
transu3_35_tu[0]=["0_0",17,"0_1",5]
transu3_35_tu[1]=["0_0",27,"1_0",9]
var transu3_37_tu=[]
transu3_37_tu[0]=["0_0",12,"0_1",4]
transu3_37_tu[1]=["0_0",17,"1_0",9]
var transu3_38_tu=[]
transu3_38_tu[0]=["0_0",5,"0_1",13]
transu3_38_tu[1]=["0_0",9,"1_0",2]
var transu3_39_tu=[]
transu3_39_tu[0]=["0_0",7,"0_1",0]
transu3_39_tu[1]=["0_0",9,"1_0",2]
var transu3_39A_tu=[]
transu3_39A_tu[0]=["0_0",5,"0_1",11]
transu3_39A_tu[1]=["0_0",8,"1_0",2]
var transu3_40_tu=[]
transu3_40_tu[0]=["0_0",5,"0_1",0]
transu3_40_tu[1]=["0_0",8,"1_0",2]
var transu3_40A_tu=[]
transu3_40A_tu[0]=["0_0",5,"0_1",0]
transu3_40A_tu[1]=["0_0",7,"1_0",2]
var transu3_41_tu=[]
transu3_41_tu[0]=["0_0",5,"0_1",1]
transu3_41_tu[1]=["0_0",8,"1_0",2]
var transu3_42_tu=[]
transu3_42_tu[0]=["0_0",7,"0_1",13]
transu3_42_tu[1]=["0_0",10,"1_0",2]
var transu3_43_tu=[]
transu3_43_tu[0]=["0_0",5,"0_1",13]
transu3_43_tu[1]=["0_0",8,"1_0",1]
var transu3_44_tu=[]
transu3_44_tu[0]=["0_0",4,"0_1",10]
transu3_44_tu[1]=["0_0",7,"1_0",1]
var transu3_45_tu=[]
transu3_45_tu[0]=["0_0",4,"0_1",8]
transu3_45_tu[1]=["0_0",6,"1_0",1]
var transu3_46_tu=[]
transu3_46_tu[0]=["0_0",4,"0_1",8]
transu3_46_tu[1]=["0_0",5,"1_0",1]
var transu3_49_tu=[]
transu3_49_tu[0]=["0_0",6,"0_1",13]
transu3_49_tu[1]=["0_0",10,"1_0",2]
var transu3_50_tu=[]
transu3_50_tu[0]=["0_0",7,"0_1",15]
transu3_50_tu[1]=["0_0",11,"1_0",3]
var transu3_51_tu=[]
transu3_51_tu[0]=["0_0",6,"0_1",13]
transu3_51_tu[1]=["0_0",10,"1_0",2]
var transu3_52_tu=[]
transu3_52_tu[0]=["0_0",8,"0_1",0]
transu3_52_tu[1]=["0_0",14,"1_0",2]
var transu3_53_tu=[]
transu3_53_tu[0]=["0_0",4,"0_1",14]
transu3_53_tu[1]=["0_0",9,"1_0",1]
var transu3_55_tu=[]
transu3_55_tu[0]=["0_0",4,"0_1",8]
transu3_55_tu[1]=["0_0",6,"1_0",1]
var transu3_57_tu=[]
transu3_57_tu[0]=["0_0",7,"0_1",0]
transu3_57_tu[1]=["0_0",9,"1_0",3]
var transu3_58_tu=[]
transu3_58_tu[0]=["0_0",9,"0_1",1]
transu3_58_tu[1]=["0_0",11,"1_0",5]
var transu3_59_tu=[]
transu3_59_tu[0]=["0_0",6,"0_1",14]
transu3_59_tu[1]=["0_0",10,"1_0",2]
var transu3_60_tu=[]
transu3_60_tu[0]=["0_0",9,"0_1",18]
transu3_60_tu[1]=["0_0",14,"1_0",5]
var transu3_61_tu=[]
transu3_61_tu[0]=["0_0",4,"0_1",0]
transu3_61_tu[1]=["0_0",7,"1_0",1]

var transu4_1_tu=[]
transu4_1_tu[0]=["0_0",13,"0_1",1]
transu4_1_tu[1]=["0_0",17,"1_0",5]
var transu4_2_tu=[]
transu4_2_tu[0]=["0_0",10,"0_1",22]
transu4_2_tu[1]=["0_0",14,"1_0",2]
var transu4_3_tu=[]
transu4_3_tu[0]=["0_0",8,"0_1",17]
transu4_3_tu[1]=["0_0",12,"1_0",2]
var transu4_4_tu=[]
transu4_4_tu[0]=["0_0",8,"0_1",0]
transu4_4_tu[1]=["0_0",11,"1_0",3]
var transu4_5_tu=[]
transu4_5_tu[0]=["0_0",6,"0_1",0]
transu4_5_tu[1]=["0_0",8,"1_0",2]
var transu4_6_tu=[]
transu4_6_tu[0]=["0_0",9,"0_1",20]
transu4_6_tu[1]=["0_0",13,"1_0",2]
var transu4_8_tu=[]
transu4_8_tu[0]=["0_0",7,"0_1",17]
transu4_8_tu[1]=["0_0",11,"1_0",1]
var transu4_9_tu=[]
transu4_9_tu[0]=["0_0",10,"0_1",1]
transu4_9_tu[1]=["0_0",14,"1_0",4]
var transu4_11_tu=[]
transu4_11_tu[0]=["0_0",3,"0_1",7]
transu4_11_tu[1]=["0_0",6,"1_0",0]
var transu4_12_tu=[]
transu4_12_tu[0]=["0_0",6,"0_1",11]
transu4_12_tu[1]=["0_0",8,"1_0",2]
var transu4_13_tu=[]
transu4_13_tu[0]=["0_0",6,"0_1",0]
transu4_13_tu[1]=["0_0",8,"1_0",4]
var transu4_14_tu=[]
transu4_14_tu[0]=["0_0",8,"0_1",20]
transu4_14_tu[1]=["0_0",14,"1_0",2]
var transu4_15_tu=[]
transu4_15_tu[0]=["0_0",6,"0_1",0]
transu4_15_tu[1]=["0_0",11,"1_0",3]
var transu4_16_tu=[]
transu4_16_tu[0]=["0_0",8,"0_1",0]
transu4_16_tu[1]=["0_0",11,"1_0",4]
var transu4_17_tu=[]
transu4_17_tu[0]=["0_0",10,"0_1",0]
transu4_17_tu[1]=["0_0",13,"1_0",3]
var transu4_18_tu=[]
transu4_18_tu[0]=["0_0",9,"0_1",0]
transu4_18_tu[1]=["0_0",12,"1_0",4]
var transu4_19_tu=[]
transu4_19_tu[0]=["0_0",4,"0_1",0]
transu4_19_tu[1]=["0_0",10,"1_0",2]
var transu4_20_tu=[]
transu4_20_tu[0]=["0_0",8,"0_1",0]
transu4_20_tu[1]=["0_0",11,"1_0",3]
var transu4_23_tu=[]
transu4_23_tu[0]=["0_0",8,"0_1",0]
transu4_23_tu[1]=["0_0",10,"1_0",3]
var transu4_24_tu=[]
transu4_24_tu[0]=["0_0",9,"0_1",0]
transu4_24_tu[1]=["0_0",12,"1_0",2]
var transu4_26_tu=[]
transu4_26_tu[0]=["0_0",11,"0_1",27]
transu4_26_tu[1]=["0_0",16,"1_0",3]
var transu4_27_tu=[]
transu4_27_tu[0]=["0_0",14,"0_1",2]
transu4_27_tu[1]=["0_0",20,"1_0",5]
var transu4_28_tu=[]
transu4_28_tu[0]=["0_0",19,"0_1",1]
transu4_28_tu[1]=["0_0",22,"1_0",8]
var transu4_29_tu=[]
transu4_29_tu[0]=["0_0",26,"0_1",2]
transu4_29_tu[1]=["0_0",32,"1_0",14]
var transu4_30_tu=[]
transu4_30_tu[0]=["0_0",12,"0_1",2]
transu4_30_tu[1]=["0_0",15,"1_0",6]
var transu4_31_tu=[]
transu4_31_tu[0]=["0_0",18,"0_1",1]
transu4_31_tu[1]=["0_0",22,"1_0",6]
var transu4_32_tu=[]
transu4_32_tu[0]=["0_0",16,"0_1",3]
transu4_32_tu[1]=["0_0",21,"1_0",7]
var transu4_33_tu=[]
transu4_33_tu[0]=["0_0",16,"0_1",0]
transu4_33_tu[1]=["0_0",22,"1_0",4]
var transu4_35_tu=[]
transu4_35_tu[0]=["0_0",10,"0_1",24]
transu4_35_tu[1]=["0_0",14,"1_0",3]
var transu4_36_tu=[]
transu4_36_tu[0]=["0_0",5,"0_1",16]
transu4_36_tu[1]=["0_0",10,"1_0",1]
var transu4_37_tu=[]
transu4_37_tu[0]=["0_0",9,"0_1",0]
transu4_37_tu[1]=["0_0",12,"1_0",2]
var transu4_38_tu=[]
transu4_38_tu[0]=["0_0",10,"0_1",0]
transu4_38_tu[1]=["0_0",14,"1_0",6]
var transu4_39_tu=[]
transu4_39_tu[0]=["0_0",9,"0_1",18]
transu4_39_tu[1]=["0_0",16,"1_0",1]
var transu4_40_tu=[]
transu4_40_tu[0]=["0_0",10,"0_1",19]
transu4_40_tu[1]=["0_0",17,"1_0",1]
var transu4_41_tu=[]
transu4_41_tu[0]=["0_0",10,"0_1",0]
transu4_41_tu[1]=["0_0",17,"1_0",3]
var transu4_42_tu=[]
transu4_42_tu[0]=["0_0",8,"0_1",17]
transu4_42_tu[1]=["0_0",14,"1_0",2]
var transu4_43_tu=[]
transu4_43_tu[0]=["0_0",9,"0_1",19]
transu4_43_tu[1]=["0_0",16,"1_0",2]
var transu4_44_tu=[]
transu4_44_tu[0]=["0_0",9,"0_1",19]
transu4_44_tu[1]=["0_0",16,"1_0",2]
var transu4_45_tu=[]
transu4_45_tu[0]=["0_0",9,"0_1",19]
transu4_45_tu[1]=["0_0",16,"1_0",2]
var transu4_46_tu=[]
transu4_46_tu[0]=["0_0",7,"0_1",13]
transu4_46_tu[1]=["0_0",11,"1_0",1]
var transu4_47_tu=[]
transu4_47_tu[0]=["0_0",8,"0_1",17]
transu4_47_tu[1]=["0_0",15,"1_0",1]
var transu4_48_tu=[]
transu4_48_tu[0]=["0_0",9,"0_1",19]
transu4_48_tu[1]=["0_0",16,"1_0",2]
var transu4_49_tu=[]
transu4_49_tu[0]=["0_0",10,"0_1",19]
transu4_49_tu[1]=["0_0",16,"1_0",2]
var transu4_50_tu=[]
transu4_50_tu[0]=["0_0",9,"0_1",0]
transu4_50_tu[1]=["0_0",14,"1_0",4]
var transu4_51_tu=[]
transu4_51_tu[0]=["0_0",8,"0_1",17]
transu4_51_tu[1]=["0_0",13,"1_0",3]
var transu4_52_tu=[]
transu4_52_tu[0]=["0_0",9,"0_1",0]
transu4_52_tu[1]=["0_0",15,"1_0",3]
var transu4_53_tu=[]
transu4_53_tu[0]=["0_0",8,"0_1",0]
transu4_53_tu[1]=["0_0",13,"1_0",3]
var transu4_54_tu=[]
transu4_54_tu[0]=["0_0",9,"0_1",0]
transu4_54_tu[1]=["0_0",15,"1_0",3]
var transu4_55_tu=[]
transu4_55_tu[0]=["0_0",9,"0_1",19]
transu4_55_tu[1]=["0_0",17,"1_0",1]
var transu4_56_tu=[]
transu4_56_tu[0]=["0_0",9,"0_1",0]
transu4_56_tu[1]=["0_0",14,"1_0",4]
var transu4_59_tu=[]
transu4_59_tu[0]=["0_0",8,"0_1",15]
transu4_59_tu[1]=["0_0",13,"1_0",1]
var transu4_60_tu=[]
transu4_60_tu[0]=["0_0",8,"0_1",0]
transu4_60_tu[1]=["0_0",14,"1_0",2]
var transu4_61_tu=[]
transu4_61_tu[0]=["0_0",9,"0_1",0]
transu4_61_tu[1]=["0_0",16,"1_0",2]
var transu4_62_tu=[]
transu4_62_tu[0]=["0_0",7,"0_1",15]
transu4_62_tu[1]=["0_0",13,"1_0",1]
var transu4_63_tu=[]
transu4_63_tu[0]=["0_0",7,"0_1",15]
transu4_63_tu[1]=["0_0",13,"1_0",1]
var transu4_64_tu=[]
transu4_64_tu[0]=["0_0",8,"0_1",17]
transu4_64_tu[1]=["0_0",14,"1_0",2]
var transu4_65_tu=[]
transu4_65_tu[0]=["0_0",9,"0_1",16]
transu4_65_tu[1]=["0_0",14,"1_0",2]
var transu4_66_tu=[]
transu4_66_tu[0]=["0_0",8,"0_1",15]
transu4_66_tu[1]=["0_0",13,"1_0",1]
var transu4_67_tu=[]
transu4_67_tu[0]=["0_0",7,"0_1",15]
transu4_67_tu[1]=["0_0",13,"1_0",1]
var transu4_68_tu=[]
transu4_68_tu[0]=["0_0",9,"0_1",0]
transu4_68_tu[1]=["0_0",15,"1_0",3]
var transu4_69_tu=[]
transu4_69_tu[0]=["0_0",9,"0_1",0]
transu4_69_tu[1]=["0_0",15,"1_0",3]
var transu4_70_tu=[]
transu4_70_tu[0]=["0_0",8,"0_1",0]
transu4_70_tu[1]=["0_0",14,"1_0",2]
var transu4_71_tu=[]
transu4_71_tu[0]=["0_0",8,"0_1",0]
transu4_71_tu[1]=["0_0",12,"1_0",4]
var transu4_72_tu=[]
transu4_72_tu[0]=["0_0",9,"0_1",18]
transu4_72_tu[1]=["0_0",14,"1_0",4]
var transu4_73_tu=[]
transu4_73_tu[0]=["0_0",8,"0_1",17]
transu4_73_tu[1]=["0_0",14,"1_0",2]
var transu4_74_tu=[]
transu4_74_tu[0]=["0_0",7,"0_1",15]
transu4_74_tu[1]=["0_0",10,"1_0",4]
var transu4_75_tu=[]
transu4_75_tu[0]=["0_0",8,"0_1",16]
transu4_75_tu[1]=["0_0",11,"1_0",5]
var transu4_76_tu=[]
transu4_76_tu[0]=["0_0",7,"0_1",0]
transu4_76_tu[1]=["0_0",11,"1_0",3]
var transu4_77_tu=[]
transu4_77_tu[0]=["0_0",8,"0_1",17]
transu4_77_tu[1]=["0_0",13,"1_0",3]
var transu4_78_tu=[]
transu4_78_tu[0]=["0_0",7,"0_1",15]
transu4_78_tu[1]=["0_0",12,"1_0",2]
var transu4_80_tu=[]
transu4_80_tu[0]=["0_0",8,"0_1",20]
transu4_80_tu[1]=["0_0",15,"1_0",3]
var transu4_81_tu=[]
transu4_81_tu[0]=["0_0",7,"0_1",0]
transu4_81_tu[1]=["0_0",13,"1_0",4]
var transu4_82_tu=[]
transu4_82_tu[0]=["0_0",8,"0_1",0]
transu4_82_tu[1]=["0_0",12,"1_0",4]
var transu4_84_tu=[]
transu4_84_tu[0]=["0_0",8,"0_1",21]
transu4_84_tu[1]=["0_0",12,"1_0",3]
var transu4_85_tu=[]
transu4_85_tu[0]=["0_0",7,"0_1",0]
transu4_85_tu[1]=["0_0",9,"1_0",2]
var transu4_86_tu=[]
transu4_86_tu[0]=["0_0",10,"0_1",2]
transu4_86_tu[1]=["0_0",15,"1_0",6]
var transu4_87_tu=[]
transu4_87_tu[0]=["0_0",11,"0_1",3]
transu4_87_tu[1]=["0_0",16,"1_0",7]
var transu4_88_tu=[]
transu4_88_tu[0]=["0_0",12,"0_1",4]
transu4_88_tu[1]=["0_0",17,"1_0",8]
var transu4_89_tu=[]
transu4_89_tu[0]=["0_0",11,"0_1",3]
transu4_89_tu[1]=["0_0",16,"1_0",7]
var transu4_90_tu=[]
transu4_90_tu[0]=["0_0",12,"0_1",4]
transu4_90_tu[1]=["0_0",17,"1_0",8]
var transu4_91_tu=[]
transu4_91_tu[0]=["0_0",12,"0_1",4]
transu4_91_tu[1]=["0_0",17,"1_0",8]
var transu4_93_tu=[]
transu4_93_tu[0]=["0_0",6,"0_1",13]
transu4_93_tu[1]=["0_0",8,"1_0",1]
var transu4_94_tu=[]
transu4_94_tu[0]=["0_0",16,"0_1",1]
transu4_94_tu[1]=["0_0",20,"1_0",6]
var transu4_96_tu=[]
transu4_96_tu[0]=["0_0",9,"0_1",1]
transu4_96_tu[1]=["0_0",12,"1_0",5]
var transu4_97_tu=[]
transu4_97_tu[0]=["0_0",8,"0_1",1]
transu4_97_tu[1]=["0_0",11,"1_0",4]
var transu4_98_tu=[]
transu4_98_tu[0]=["0_0",7,"0_1",1]
transu4_98_tu[1]=["0_0",11,"1_0",3]
var transu4_99_tu=[]
transu4_99_tu[0]=["0_0",7,"0_1",0]
transu4_99_tu[1]=["0_0",10,"1_0",4]
var transu4_100_tu=[]
transu4_100_tu[0]=["0_0",7,"0_1",21]
transu4_100_tu[1]=["0_0",14,"1_0",2]
var transu4_101_tu=[]
transu4_101_tu[0]=["0_0",10,"0_1",0]
transu4_101_tu[1]=["0_0",13,"1_0",4]
var transu4_102_tu=[]
transu4_102_tu[0]=["0_0",12,"0_1",22]
transu4_102_tu[1]=["0_0",15,"1_0",3]
var transu4_104_tu=[]
transu4_104_tu[0]=["0_0",10,"0_1",0]
transu4_104_tu[1]=["0_0",13,"1_0",4]
var transu4_105_tu=[]
transu4_105_tu[0]=["0_0",10,"0_1",0]
transu4_105_tu[1]=["0_0",17,"1_0",6]
var transu4_106_tu=[]
transu4_106_tu[0]=["0_0",7,"0_1",0]
transu4_106_tu[1]=["0_0",11,"1_0",3]
var transu4_107_tu=[]
transu4_107_tu[0]=["0_0",6,"0_1",15]
transu4_107_tu[1]=["0_0",10,"1_0",2]
var transu4_109_tu=[]
transu4_109_tu[0]=["0_0",7,"0_1",14]
transu4_109_tu[1]=["0_0",11,"1_0",2]
var transu4_109A_tu=[]
transu4_109A_tu[0]=["0_0",7,"0_1",15]
transu4_109A_tu[1]=["0_0",10,"1_0",3]
var transu4_110_tu=[]
transu4_110_tu[0]=["0_0",11,"0_1",23]
transu4_110_tu[1]=["0_0",17,"1_0",5]
var transu4_113_tu=[]
transu4_113_tu[0]=["0_0",6,"0_1",11]
transu4_113_tu[1]=["0_0",9,"1_0",2]
var transu4_114_tu=[]
transu4_114_tu[0]=["0_0",7,"0_1",1]
transu4_114_tu[1]=["0_0",12,"1_0",5]

var transu4_115_tu=[]
transu4_115_tu[0]=["0_0",10,"0_1",4]
transu4_115_tu[1]=["0_0",15,"1_0",7]
var transu4_117_tu=[]
transu4_117_tu[0]=["0_0",9,"0_1",1]
transu4_117_tu[1]=["0_0",13,"1_0",5]
var transu4_119_tu=[]
transu4_119_tu[0]=["0_0",8,"0_1",20]
transu4_119_tu[1]=["0_0",14,"1_0",2]
var transu4_121_tu=[]
transu4_121_tu[0]=["0_0",6,"0_1",11]
transu4_121_tu[1]=["0_0",9,"1_0",3]
var transu4_122_tu=[]
transu4_122_tu[0]=["0_0",6,"0_1",0]
transu4_122_tu[1]=["0_0",10,"1_0",2]
var transu4_123_tu=[]
transu4_123_tu[0]=["0_0",6,"0_1",11]
transu4_123_tu[1]=["0_0",10,"1_0",2]
var transu4_125_tu=[]
transu4_125_tu[0]=["0_0",6,"0_1",11]
transu4_125_tu[1]=["0_0",9,"1_0",2]
var transu4_126_tu=[]
transu4_126_tu[0]=["0_0",6,"0_1",12]
transu4_126_tu[1]=["0_0",9,"1_0",2]
var transu4_127_tu=[]
transu4_127_tu[0]=["0_0",5,"0_1",13]
transu4_127_tu[1]=["0_0",9,"1_0",2]
var transu4_128_tu=[]
transu4_128_tu[0]=["0_0",4,"0_1",0]
transu4_128_tu[1]=["0_0",8,"1_0",2]
var transu4_129_tu=[]
transu4_129_tu[0]=["0_0",5,"0_1",0]
transu4_129_tu[1]=["0_0",7,"1_0",2]
var transu4_132_tu=[]
transu4_132_tu[0]=["0_0",10,"0_1",1]
transu4_132_tu[1]=["0_0",15,"1_0",4]
var transu4_133_tu=[]
transu4_133_tu[0]=["0_0",8,"0_1",17]
transu4_133_tu[1]=["0_0",11,"1_0",5]
var transu4_134_tu=[]
transu4_134_tu[0]=["0_0",10,"0_1",0]
transu4_134_tu[1]=["0_0",14,"1_0",6]
var transu4_135_tu=[]
transu4_135_tu[0]=["0_0",7,"0_1",0]
transu4_135_tu[1]=["0_0",10,"1_0",4]
var transu4_136_tu=[]
transu4_136_tu[0]=["0_0",9,"0_1",0]
transu4_136_tu[1]=["0_0",14,"1_0",4]
var transu4_137_tu=[]
transu4_137_tu[0]=["0_0",10,"0_1",0]
transu4_137_tu[1]=["0_0",17,"1_0",3]
var transu4_139_tu=[]
transu4_139_tu[0]=["0_0",9,"0_1",0]
transu4_139_tu[1]=["0_0",13,"1_0",5]
var transu4_140_tu=[]
transu4_140_tu[0]=["0_0",10,"0_1",0]
transu4_140_tu[1]=["0_0",14,"1_0",6]
var transu4_141_tu=[]
transu4_141_tu[0]=["0_0",9,"0_1",0]
transu4_141_tu[1]=["0_0",14,"1_0",4]
var transu4_142_tu=[]
transu4_142_tu[0]=["0_0",10,"0_1",0]
transu4_142_tu[1]=["0_0",15,"1_0",5]
var transu4_143_tu=[]
transu4_143_tu[0]=["0_0",6,"0_1",1]
transu4_143_tu[1]=["0_0",9,"1_0",2]
var transu4_145_tu=[]
transu4_145_tu[0]=["0_0",5,"0_1",10]
transu4_145_tu[1]=["0_0",8,"1_0",1]
var transu4_147_tu=[]
transu4_147_tu[0]=["0_0",6,"0_1",0]
transu4_147_tu[1]=["0_0",8,"1_0",2]
var transu4_148_tu=[]
transu4_148_tu[0]=["0_0",6,"0_1",19]
transu4_148_tu[1]=["0_0",13,"1_0",1]
var transu4_149_tu=[]
transu4_149_tu[0]=["0_0",11,"0_1",3]
transu4_149_tu[1]=["0_0",15,"1_0",5]
var transu4_150_tu=[]
transu4_150_tu[0]=["0_0",9,"0_1",2]
transu4_150_tu[1]=["0_0",15,"1_0",4]
var transu4_151_tu=[]
transu4_151_tu[0]=["0_0",8,"0_1",1]
transu4_151_tu[1]=["0_0",10,"1_0",4]
var transu5_1_tu=[]
transu5_1_tu[0]=["0_0",15,"0_1",2]
transu5_1_tu[1]=["0_0",21,"1_0",7]
var transu5_2_tu=[]
transu5_2_tu[0]=["0_0",11,"0_1",1]
transu5_2_tu[1]=["0_0",14,"1_0",6]
var transu5_3A_tu=[]
transu5_3A_tu[0]=["0_0",9,"0_1",21]
transu5_3A_tu[1]=["0_0",18,"1_0",2]
var transu5_4_tu=[]
transu5_4_tu[0]=["0_0",13,"0_1",7]
transu5_4_tu[1]=["0_0",0,"1_0",10]
var transu5_5_tu=[]
transu5_5_tu[0]=["0_0",12,"0_1",8]
transu5_5_tu[1]=["0_0",19,"1_0",10]
var transu5_6_tu=[]
transu5_6_tu[0]=["0_0",13,"0_1",1]
transu5_6_tu[1]=["0_0",18,"1_0",6]
var transu5_7_tu=[]
transu5_7_tu[0]=["0_0",10,"0_1",0]
transu5_7_tu[1]=["0_0",14,"1_0",4]
var transu5_10_tu=[]
transu5_10_tu[0]=["0_0",10,"0_1",22]
transu5_10_tu[1]=["0_0",15,"1_0",2]
var transu5_11_tu=[]
transu5_11_tu[0]=["0_0",10,"0_1",23]
transu5_11_tu[1]=["0_0",19,"1_0",7]
var transu5_12_tu=[]
transu5_12_tu[0]=["0_0",12,"0_1",1]
transu5_12_tu[1]=["0_0",16,"1_0",4]
var transu5_13_tu=[]
transu5_13_tu[0]=["0_0",9,"0_1",17]
transu5_13_tu[1]=["0_0",13,"1_0",3]
var transu5_15_tu=[]
transu5_15_tu[0]=["0_0",7,"0_1",0]
transu5_15_tu[1]=["0_0",12,"1_0",2]
var transu5_16_tu=[]
transu5_16_tu[0]=["0_0",11,"0_1",0]
transu5_16_tu[1]=["0_0",15,"1_0",5]
var transu5_17_tu=[]
transu5_17_tu[0]=["0_0",10,"0_1",0]
transu5_17_tu[1]=["0_0",14,"1_0",5]
var transu5_18_tu=[]
transu5_18_tu[0]=["0_0",10,"0_1",0]
transu5_18_tu[1]=["0_0",14,"1_0",4]
var transu5_19_tu=[]
transu5_19_tu[0]=["0_0",8,"0_1",14]
transu5_19_tu[1]=["0_0",12,"1_0",2]
var transu5_20_tu=[]
transu5_20_tu[0]=["0_0",6,"0_1",12]
transu5_20_tu[1]=["0_0",8,"1_0",1]
var transu5_21_tu=[]
transu5_21_tu[0]=["0_0",10,"0_1",0]
transu5_21_tu[1]=["0_0",13,"1_0",5]
var transu5_22_tu=[]
transu5_22_tu[0]=["0_0",8,"0_1",0]
transu5_22_tu[1]=["0_0",11,"1_0",4]
var transu5_23_tu=[]
transu5_23_tu[0]=["0_0",10,"0_1",0]
transu5_23_tu[1]=["0_0",13,"1_0",5]
var transu5_24_tu=[]
transu5_24_tu[0]=["0_0",8,"0_1",0]
transu5_24_tu[1]=["0_0",10,"1_0",3]
var transu5_25_tu=[]
transu5_25_tu[0]=["0_0",13,"0_1",3]
transu5_25_tu[1]=["0_0",16,"1_0",6]
var transu5_26_tu=[]
transu5_26_tu[0]=["0_0",13,"0_1",1]
transu5_26_tu[1]=["0_0",21,"1_0",4]

var transu5_27_tu=[]
transu5_27_tu[0]=["0_0",8,"0_1",1]
transu5_27_tu[1]=["0_0",11,"1_0",4]
var transu5_28_tu=[]
transu5_28_tu[0]=["0_0",12,"0_1",1]
transu5_28_tu[1]=["0_0",15,"1_0",5]
var transu5_29_tu=[]
transu5_29_tu[0]=["0_0",8,"0_1",1]
transu5_29_tu[1]=["0_0",12,"1_0",3]
var transu5_35_tu=[]
transu5_35_tu[0]=["0_0",14,"0_1",0]
transu5_35_tu[1]=["0_0",20,"1_0",4]
var transu5_36_tu=[]
transu5_36_tu[0]=["0_0",19,"0_1",2]
transu5_36_tu[1]=["0_0",24,"1_0",7]
var transu5_37_tu=[]
transu5_37_tu[0]=["0_0",19,"0_1",1]
transu5_37_tu[1]=["0_0",24,"1_0",6]
var transu5_38_tu=[]
transu5_38_tu[0]=["0_0",21,"0_1",3]
transu5_38_tu[1]=["0_0",26,"1_0",8]
var transu5_39_tu=[]
transu5_39_tu[0]=["0_0",10,"0_1",0]
transu5_39_tu[1]=["0_0",15,"1_0",5]
var transu5_40_tu=[]
transu5_40_tu[0]=["0_0",17,"0_1",39]
transu5_40_tu[1]=["0_0",30,"1_0",8]
var transu5_41_tu=[]
transu5_41_tu[0]=["0_0",16,"0_1",40]
transu5_41_tu[1]=["0_0",29,"1_0",9]
var transu5_43_tu=[]
transu5_43_tu[0]=["0_0",11,"0_1",1]
transu5_43_tu[1]=["0_0",15,"1_0",4]
var transu5_44_tu=[]
transu5_44_tu[0]=["0_0",13,"0_1",0]
transu5_44_tu[1]=["0_0",17,"1_0",6]
var transu5_45_tu=[]
transu5_45_tu[0]=["0_0",13,"0_1",25]
transu5_45_tu[1]=["0_0",17,"1_0",7]
var transu5_46_tu=[]
transu5_46_tu[0]=["0_0",13,"0_1",28]
transu5_46_tu[1]=["0_0",21,"1_0",7]
var transu5_47_tu=[]
transu5_47_tu[0]=["0_0",15,"0_1",29]
transu5_47_tu[1]=["0_0",21,"1_0",7]
var transu5_48_tu=[]
transu5_48_tu[0]=["0_0",6,"0_1",17]
transu5_48_tu[1]=["0_0",11,"1_0",1]
var transu5_49_tu=[]
transu5_49_tu[0]=["0_0",6,"0_1",19]
transu5_49_tu[1]=["0_0",14,"1_0",3]
var transu5_50_tu=[]
transu5_50_tu[0]=["0_0",12,"0_1",24]
transu5_50_tu[1]=["0_0",18,"1_0",6]
var transu5_51_tu=[]
transu5_51_tu[0]=["0_0",11,"0_1",21]
transu5_51_tu[1]=["0_0",15,"1_0",5]
var transu5_52_tu=[]
transu5_52_tu[0]=["0_0",10,"0_1",21]
transu5_52_tu[1]=["0_0",15,"1_0",5]
var transu5_53_tu=[]
transu5_53_tu[0]=["0_0",12,"0_1",0]
transu5_53_tu[1]=["0_0",18,"1_0",6]
var transu5_54_tu=[]
transu5_54_tu[0]=["0_0",11,"0_1",0]
transu5_54_tu[1]=["0_0",16,"1_0",6]
var transu5_55_tu=[]
transu5_55_tu[0]=["0_0",12,"0_1",0]
transu5_55_tu[1]=["0_0",20,"1_0",4]
var transu5_56_tu=[]
transu5_56_tu[0]=["0_0",12,"0_1",23]
transu5_56_tu[1]=["0_0",18,"1_0",4]
var transu5_57_tu=[]
transu5_57_tu[0]=["0_0",12,"0_1",0]
transu5_57_tu[1]=["0_0",18,"1_0",6]
var transu5_58_tu=[]
transu5_58_tu[0]=["0_0",12,"0_1",0]
transu5_58_tu[1]=["0_0",17,"1_0",5]
var transu5_59_tu=[]
transu5_59_tu[0]=["0_0",10,"0_1",21]
transu5_59_tu[1]=["0_0",17,"1_0",3]
var transu5_60_tu=[]
transu5_60_tu[0]=["0_0",12,"0_1",0]
transu5_60_tu[1]=["0_0",19,"1_0",5]
var transu5_61_tu=[]
transu5_61_tu[0]=["0_0",13,"0_1",0]
transu5_61_tu[1]=["0_0",19,"1_0",5]
var transu5_62_tu=[]
transu5_62_tu[0]=["0_0",11,"0_1",0]
transu5_62_tu[1]=["0_0",16,"1_0",6]
var transu5_63_tu=[]
transu5_63_tu[0]=["0_0",11,"0_1",21]
transu5_63_tu[1]=["0_0",15,"1_0",7]
var transu5_64_tu=[]
transu5_64_tu[0]=["0_0",12,"0_1",1]
transu5_64_tu[1]=["0_0",19,"1_0",5]
var transu5_65_tu=[]
transu5_65_tu[0]=["0_0",12,"0_1",0]
transu5_65_tu[1]=["0_0",20,"1_0",4]
var transu5_66_tu=[]
transu5_66_tu[0]=["0_0",12,"0_1",0]
transu5_66_tu[1]=["0_0",19,"1_0",5]
var transu5_67_tu=[]
transu5_67_tu[0]=["0_0",12,"0_1",0]
transu5_67_tu[1]=["0_0",19,"1_0",5]
var transu5_68_tu=[]
transu5_68_tu[0]=["0_0",11,"0_1",0]
transu5_68_tu[1]=["0_0",17,"1_0",5]
var transu5_69_tu=[]
transu5_69_tu[0]=["0_0",11,"0_1",21]
transu5_69_tu[1]=["0_0",16,"1_0",5]
var transu5_70_tu=[]
transu5_70_tu[0]=["0_0",11,"0_1",21]
transu5_70_tu[1]=["0_0",16,"1_0",6]
var transu5_71_tu=[]
transu5_71_tu[0]=["0_0",11,"0_1",0]
transu5_71_tu[1]=["0_0",17,"1_0",6]
var transu5_72_tu=[]
transu5_72_tu[0]=["0_0",7,"0_1",0]
transu5_72_tu[1]=["0_0",11,"1_0",3]
var transu5_74_tu=[]
transu5_74_tu[0]=["0_0",11,"0_1",0]
transu5_74_tu[1]=["0_0",15,"1_0",7]
var transu5_75_tu=[]
transu5_75_tu[0]=["0_0",11,"0_1",0]
transu5_75_tu[1]=["0_0",18,"1_0",4]
var transu5_76_tu=[]
transu5_76_tu[0]=["0_0",11,"0_1",0]
transu5_76_tu[1]=["0_0",16,"1_0",6]
var transu5_77_tu=[]
transu5_77_tu[0]=["0_0",11,"0_1",21]
transu5_77_tu[1]=["0_0",16,"1_0",6]
var transu5_78_tu=[]
transu5_78_tu[0]=["0_0",11,"0_1",0]
transu5_78_tu[1]=["0_0",18,"1_0",4]
var transu5_79_tu=[]
transu5_79_tu[0]=["0_0",11,"0_1",0]
transu5_79_tu[1]=["0_0",19,"1_0",3]
var transu5_80_tu=[]
transu5_80_tu[0]=["0_0",11,"0_1",0]
transu5_80_tu[1]=["0_0",18,"1_0",4]
var transu5_81_tu=[]
transu5_81_tu[0]=["0_0",11,"0_1",0]
transu5_81_tu[1]=["0_0",17,"1_0",5]
var transu5_82_tu=[]
transu5_82_tu[0]=["0_0",10,"0_1",1]
transu5_82_tu[1]=["0_0",16,"1_0",4]
var transu5_83_tu=[]
transu5_83_tu[0]=["0_0",12,"0_1",0]
transu5_83_tu[1]=["0_0",20,"1_0",4]
var transu5_84_tu=[]
transu5_84_tu[0]=["0_0",11,"0_1",0]
transu5_84_tu[1]=["0_0",17,"1_0",5]
var transu5_85_tu=[]
transu5_85_tu[0]=["0_0",12,"0_1",0]
transu5_85_tu[1]=["0_0",19,"1_0",5]
var transu5_86_tu=[]
transu5_86_tu[0]=["0_0",10,"0_1",0]
transu5_86_tu[1]=["0_0",15,"1_0",5]
var transu5_87_tu=[]
transu5_87_tu[0]=["0_0",12,"0_1",0]
transu5_87_tu[1]=["0_0",18,"1_0",6]
var transu5_88_tu=[]
transu5_88_tu[0]=["0_0",12,"0_1",0]
transu5_88_tu[1]=["0_0",19,"1_0",5]
var transu5_89_tu=[]
transu5_89_tu[0]=["0_0",11,"0_1",0]
transu5_89_tu[1]=["0_0",18,"1_0",4]
var transu5_90_tu=[]
transu5_90_tu[0]=["0_0",11,"0_1",0]
transu5_90_tu[1]=["0_0",18,"1_0",4]
var transu5_91_tu=[]
transu5_91_tu[0]=["0_0",10,"0_1",1]
transu5_91_tu[1]=["0_0",15,"1_0",3]
var transu5_92_tu=[]
transu5_92_tu[0]=["0_0",9,"0_1",0]
transu5_92_tu[1]=["0_0",14,"1_0",3]
var transu5_94_tu=[]
transu5_94_tu[0]=["0_0",9,"0_1",0]
transu5_94_tu[1]=["0_0",19,"1_0",4]
var transu5_95_tu=[]
transu5_95_tu[0]=["0_0",12,"0_1",1]
transu5_95_tu[1]=["0_0",18,"1_0",6]
var transu5_96_tu=[]
transu5_96_tu[0]=["0_0",11,"0_1",0]
transu5_96_tu[1]=["0_0",14,"1_0",6]
var transu5_97_tu=[]
transu5_97_tu[0]=["0_0",10,"0_1",0]
transu5_97_tu[1]=["0_0",15,"1_0",5]
var transu5_98_tu=[]
transu5_98_tu[0]=["0_0",12,"0_1",1]
transu5_98_tu[1]=["0_0",18,"1_0",6]
var transu5_99_tu=[]
transu5_99_tu[0]=["0_0",10,"0_1",0]
transu5_99_tu[1]=["0_0",15,"1_0",5]
var transu5_101_tu=[]
transu5_101_tu[0]=["0_0",11,"0_1",1]
transu5_101_tu[1]=["0_0",17,"1_0",5]
var transu5_102_tu=[]
transu5_102_tu[0]=["0_0",11,"0_1",0]
transu5_102_tu[1]=["0_0",17,"1_0",5]
var transu5_103_tu=[]
transu5_103_tu[0]=["0_0",10,"0_1",1]
transu5_103_tu[1]=["0_0",18,"1_0",3]
var transu5_104_tu=[]
transu5_104_tu[0]=["0_0",10,"0_1",0]
transu5_104_tu[1]=["0_0",15,"1_0",5]
var transu5_105_tu=[]
transu5_105_tu[0]=["0_0",11,"0_1",0]
transu5_105_tu[1]=["0_0",17,"1_0",5]
var transu5_106_tu=[]
transu5_106_tu[0]=["0_0",12,"0_1",2]
transu5_106_tu[1]=["0_0",19,"1_0",5]
var transu5_107_tu=[]
transu5_107_tu[0]=["0_0",11,"0_1",1]
transu5_107_tu[1]=["0_0",17,"1_0",5]
var transu5_117_tu=[]
transu5_117_tu[0]=["0_0",6,"0_1",0]
transu5_117_tu[1]=["0_0",9,"1_0",3]
var transu5_118_tu=[]
transu5_118_tu[0]=["0_0",11,"0_1",0]
transu5_118_tu[1]=["0_0",17,"1_0",3]
var transu5_119_tu=[]
transu5_119_tu[0]=["0_0",10,"0_1",0]
transu5_119_tu[1]=["0_0",16,"1_0",4]
var transu5_120_tu=[]
transu5_120_tu[0]=["0_0",10,"0_1",0]
transu5_120_tu[1]=["0_0",16,"1_0",4]
var transu5_121_tu=[]
transu5_121_tu[0]=["0_0",10,"0_1",0]
transu5_121_tu[1]=["0_0",16,"1_0",4]
var transu5_122_tu=[]
transu5_122_tu[0]=["0_0",10,"0_1",0]
transu5_122_tu[1]=["0_0",16,"1_0",4]
var transu5_123_tu=[]
transu5_123_tu[0]=["0_0",9,"0_1",1]
transu5_123_tu[1]=["0_0",13,"1_0",5]
var transu5_124_tu=[]
transu5_124_tu[0]=["0_0",10,"0_1",0]
transu5_124_tu[1]=["0_0",16,"1_0",4]
var transu5_125_tu=[]
transu5_125_tu[0]=["0_0",10,"0_1",2]
transu5_125_tu[1]=["0_0",13,"1_0",5]
var transu5_126_tu=[]
transu5_126_tu[0]=["0_0",9,"0_1",1]
transu5_126_tu[1]=["0_0",12,"1_0",4]
var transu5_127_tu=[]
transu5_127_tu[0]=["0_0",7,"0_1",1]
transu5_127_tu[1]=["0_0",11,"1_0",4]
var transu5_143_tu=[]
transu5_143_tu[0]=["0_0",7,"0_1",0]
transu5_143_tu[1]=["0_0",11,"1_0",3]
var transu5_144_tu=[]
transu5_144_tu[0]=["0_0",8,"0_1",21]
transu5_144_tu[1]=["0_0",13,"1_0",1]
var transu5_147_tu=[]
transu5_147_tu[0]=["0_0",18,"0_1",2]
transu5_147_tu[1]=["0_0",22,"1_0",9]
var transu5_148_tu=[]
transu5_148_tu[0]=["0_0",13,"0_1",2]
transu5_148_tu[1]=["0_0",19,"1_0",5]
var transu5_150_tu=[]
transu5_150_tu[0]=["0_0",7,"0_1",14]
transu5_150_tu[1]=["0_0",10,"1_0",0]
var transu5_151_tu=[]
transu5_151_tu[0]=["0_0",10,"0_1",2]
transu5_151_tu[1]=["0_0",14,"1_0",4]
var transu5_152_tu=[]
transu5_152_tu[0]=["0_0",11,"0_1",1]
transu5_152_tu[1]=["0_0",14,"1_0",3]
var transu5_153_tu=[]
transu5_153_tu[0]=["0_0",12,"0_1",1]
transu5_153_tu[1]=["0_0",16,"1_0",5]
var transu5_154_tu=[]
transu5_154_tu[0]=["0_0",12,"0_1",3]
transu5_154_tu[1]=["0_0",15,"1_0",7]
var transu5_155_tu=[]
transu5_155_tu[0]=["0_0",9,"0_1",1]
transu5_155_tu[1]=["0_0",11,"1_0",3]
var transu5_156_tu=[]
transu5_156_tu[0]=["0_0",15,"0_1",3]
transu5_156_tu[1]=["0_0",19,"1_0",8]
var transu5_157_tu=[]
transu5_157_tu[0]=["0_0",16,"0_1",3]
transu5_157_tu[1]=["0_0",23,"1_0",7]
var transu5_158_tu=[]
transu5_158_tu[0]=["0_0",15,"0_1",2]
transu5_158_tu[1]=["0_0",19,"1_0",6]
var transu5_159_tu=[]
transu5_159_tu[0]=["0_0",6,"0_1",2]
transu5_159_tu[1]=["0_0",9,"1_0",4]
var transu5_160_tu=[]
transu5_160_tu[0]=["0_0",17,"0_1",3]
transu5_160_tu[1]=["0_0",21,"1_0",10]
var transu5_161_tu=[]
transu5_161_tu[0]=["0_0",10,"0_1",2]
transu5_161_tu[1]=["0_0",12,"1_0",6]
var transu5_162_tu=[]
transu5_162_tu[0]=["0_0",17,"0_1",5]
transu5_162_tu[1]=["0_0",21,"1_0",11]
var transu5_163_tu=[]
transu5_163_tu[0]=["0_0",14,"0_1",6]
transu5_163_tu[1]=["0_0",20,"1_0",10]
var transu5_164_tu=[]
transu5_164_tu[0]=["0_0",10,"0_1",2]
transu5_164_tu[1]=["0_0",13,"1_0",6]
var transu5_165_tu=[]
transu5_165_tu[0]=["0_0",16,"0_1",4]
transu5_165_tu[1]=["0_0",20,"1_0",10]
var transu5_166_tu=[]
transu5_166_tu[0]=["0_0",16,"0_1",4]
transu5_166_tu[1]=["0_0",21,"1_0",10]
var transu5_167_tu=[]
transu5_167_tu[0]=["0_0",14,"0_1",4]
transu5_167_tu[1]=["0_0",19,"1_0",8]
var transu5_169_tu=[]
transu5_169_tu[0]=["0_0",12,"0_1",4]
transu5_169_tu[1]=["0_0",17,"1_0",8]
var transu5_170_tu=[]
transu5_170_tu[0]=["0_0",7,"0_1",1]
transu5_170_tu[1]=["0_0",9,"1_0",4]
var transu5_171_tu=[]
transu5_171_tu[0]=["0_0",16,"0_1",4]
transu5_171_tu[1]=["0_0",21,"1_0",10]
var transu5_172_tu=[]
transu5_172_tu[0]=["0_0",15,"0_1",5]
transu5_172_tu[1]=["0_0",21,"1_0",10]
var transu5_173_tu=[]
transu5_173_tu[0]=["0_0",15,"0_1",5]
transu5_173_tu[1]=["0_0",21,"1_0",10]
var transu5_174_tu=[]
transu5_174_tu[0]=["0_0",16,"0_1",4]
transu5_174_tu[1]=["0_0",21,"1_0",10]
var transu5_175_tu=[]
transu5_175_tu[0]=["0_0",16,"0_1",4]
transu5_175_tu[1]=["0_0",21,"1_0",10]
var transu5_176_tu=[]
transu5_176_tu[0]=["0_0",14,"0_1",4]
transu5_176_tu[1]=["0_0",19,"1_0",9]
var transu5_177_tu=[]
transu5_177_tu[0]=["0_0",14,"0_1",4]
transu5_177_tu[1]=["0_0",19,"1_0",9]
var transu5_178_tu=[]
transu5_178_tu[0]=["0_0",14,"0_1",4]
transu5_178_tu[1]=["0_0",20,"1_0",9]
var transu5_179_tu=[]
transu5_179_tu[0]=["0_0",8,"0_1",17]
transu5_179_tu[1]=["0_0",13,"1_0",5]
var transu5_180_tu=[]
transu5_180_tu[0]=["0_0",13,"0_1",5]
transu5_180_tu[1]=["0_0",19,"1_0",9]
var transu5_181_tu=[]
transu5_181_tu[0]=["0_0",13,"0_1",5]
transu5_181_tu[1]=["0_0",19,"1_0",9]
var transu5_182_tu=[]
transu5_182_tu[0]=["0_0",13,"0_1",5]
transu5_182_tu[1]=["0_0",19,"1_0",9]
var transu5_183_tu=[]
transu5_183_tu[0]=["0_0",13,"0_1",5]
transu5_183_tu[1]=["0_0",19,"1_0",9]
var transu5_185_tu=[]
transu5_185_tu[0]=["0_0",12,"0_1",4]
transu5_185_tu[1]=["0_0",17,"1_0",8]
var transu5_186_tu=[]
transu5_186_tu[0]=["0_0",11,"0_1",3]
transu5_186_tu[1]=["0_0",15,"1_0",7]
var transu5_187_tu=[]
transu5_187_tu[0]=["0_0",14,"0_1",4]
transu5_187_tu[1]=["0_0",19,"1_0",9]
var transu5_188_tu=[]
transu5_188_tu[0]=["0_0",14,"0_1",4]
transu5_188_tu[1]=["0_0",19,"1_0",9]
var transu5_189_tu=[]
transu5_189_tu[0]=["0_0",11,"0_1",3]
transu5_189_tu[1]=["0_0",15,"1_0",7]
var transu5_190_tu=[]
transu5_190_tu[0]=["0_0",10,"0_1",1]
transu5_190_tu[1]=["0_0",13,"1_0",6]
var transu5_191_tu=[]
transu5_191_tu[0]=["0_0",11,"0_1",3]
transu5_191_tu[1]=["0_0",15,"1_0",7]
var transu5_192_tu=[]
transu5_192_tu[0]=["0_0",10,"0_1",1]
transu5_192_tu[1]=["0_0",13,"1_0",6]
var transu5_194_tu=[]
transu5_194_tu[0]=["0_0",10,"0_1",2]
transu5_194_tu[1]=["0_0",13,"1_0",6]
var transu5_198_tu=[]
transu5_198_tu[0]=["0_0",10,"0_1",1]
transu5_198_tu[1]=["0_0",13,"1_0",6]
var transu5_199_tu=[]
transu5_199_tu[0]=["0_0",11,"0_1",2]
transu5_199_tu[1]=["0_0",14,"1_0",7]
var transu5_200_tu=[]
transu5_200_tu[0]=["0_0",12,"0_1",3]
transu5_200_tu[1]=["0_0",17,"1_0",7]
var transu5_201_tu=[]
transu5_201_tu[0]=["0_0",15,"0_1",4]
transu5_201_tu[1]=["0_0",21,"1_0",9]
var transu5_202_tu=[]
transu5_202_tu[0]=["0_0",12,"0_1",2]
transu5_202_tu[1]=["0_0",16,"1_0",7]
var transu5_203_tu=[]
transu5_203_tu[0]=["0_0",12,"0_1",2]
transu5_203_tu[1]=["0_0",15,"1_0",6]
var transu5_204_tu=[]
transu5_204_tu[0]=["0_0",11,"0_1",2]
transu5_204_tu[1]=["0_0",14,"1_0",7]
var transu5_205_tu=[]
transu5_205_tu[0]=["0_0",7,"0_1",2]
transu5_205_tu[1]=["0_0",11,"1_0",5]
var transu5_206_tu=[]
transu5_206_tu[0]=["0_0",8,"0_1",15]
transu5_206_tu[1]=["0_0",13,"1_0",4]
var transu5_211_tu=[]
transu5_211_tu[0]=["0_0",17,"0_1",1]
transu5_211_tu[1]=["0_0",22,"1_0",6]
var transu5_212_tu=[]
transu5_212_tu[0]=["0_0",14,"0_1",0]
transu5_212_tu[1]=["0_0",17,"1_0",5]
var transu5_213_tu=[]
transu5_213_tu[0]=["0_0",13,"0_1",29]
transu5_213_tu[1]=["0_0",18,"1_0",3]
var transu5_215_tu=[]
transu5_215_tu[0]=["0_0",10,"0_1",22]
transu5_215_tu[1]=["0_0",14,"1_0",2]
var transu5_216_tu=[]
transu5_216_tu[0]=["0_0",6,"0_1",12]
transu5_216_tu[1]=["0_0",8,"1_0",1]
var transu5_217_tu=[]
transu5_217_tu[0]=["0_0",11,"0_1",27]
transu5_217_tu[1]=["0_0",20,"1_0",4]
var transu5_218_tu=[]
transu5_218_tu[0]=["0_0",9,"0_1",2]
transu5_218_tu[1]=["0_0",13,"1_0",5]
var transu5_219_tu=[]
transu5_219_tu[0]=["0_0",6,"0_1",14]
transu5_219_tu[1]=["0_0",9,"1_0",1]
var transu5_220_tu=[]
transu5_220_tu[0]=["0_0",10,"0_1",2]
transu5_220_tu[1]=["0_0",12,"1_0",5]
var transu5_221_tu=[]
transu5_221_tu[0]=["0_0",8,"0_1",0]
transu5_221_tu[1]=["0_0",12,"1_0",4]
var transu5_222_tu=[]
transu5_222_tu[0]=["0_0",10,"0_1",1]
transu5_222_tu[1]=["0_0",13,"1_0",3]
var transu5_223_tu=[]
transu5_223_tu[0]=["0_0",21,"0_1",4]
transu5_223_tu[1]=["0_0",27,"1_0",8]
var transu5_224_tu=[]
transu5_224_tu[0]=["0_0",10,"0_1",0]
transu5_224_tu[1]=["0_0",13,"1_0",6]
var transu5_225_tu=[]
transu5_225_tu[0]=["0_0",8,"0_1",15]
transu5_225_tu[1]=["0_0",11,"1_0",4]
var transu5_226_tu=[]
transu5_226_tu[0]=["0_0",9,"0_1",17]
transu5_226_tu[1]=["0_0",12,"1_0",5]
var transu5_227A_tu=[]
transu5_227A_tu[0]=["0_0",14,"0_1",0]
transu5_227A_tu[1]=["0_0",17,"1_0",3]
var transu5_227B_tu=[]
transu5_227B_tu[0]=["0_0",11,"0_1",23]
transu5_227B_tu[1]=["0_0",17,"1_0",5]
var transu5_228_tu=[]
transu5_228_tu[0]=["0_0",14,"0_1",0]
transu5_228_tu[1]=["0_0",19,"1_0",3]
var transu5_230_tu=[]
transu5_230_tu[0]=["0_0",13,"0_1",2]
transu5_230_tu[1]=["0_0",16,"1_0",6]
var transu5_232_tu=[]
transu5_232_tu[0]=["0_0",11,"0_1",21]
transu5_232_tu[1]=["0_0",15,"1_0",5]
var transu5_233_tu=[]
transu5_233_tu[0]=["0_0",10,"0_1",1]
transu5_233_tu[1]=["0_0",13,"1_0",4]
var transu5_234_tu=[]
transu5_234_tu[0]=["0_0",8,"0_1",0]
transu5_234_tu[1]=["0_0",11,"1_0",4]
var transu5_236_tu=[]
transu5_236_tu[0]=["0_0",7,"0_1",15]
transu5_236_tu[1]=["0_0",12,"1_0",4]
var transu5_237_tu=[]
transu5_237_tu[0]=["0_0",6,"0_1",12]
transu5_237_tu[1]=["0_0",9,"1_0",2]
var transu5_238_tu=[]
transu5_238_tu[0]=["0_0",5,"0_1",1]
transu5_238_tu[1]=["0_0",6,"1_0",3]
var transu5_239_tu=[]
transu5_239_tu[0]=["0_0",16,"0_1",2]
transu5_239_tu[1]=["0_0",18,"1_0",8]
var transu5_240_tu=[]
transu5_240_tu[0]=["0_0",13,"0_1",3]
transu5_240_tu[1]=["0_0",17,"1_0",8]
var transu5_241_tu=[]
transu5_241_tu[0]=["0_0",13,"0_1",3]
transu5_241_tu[1]=["0_0",17,"1_0",8]
var transu5_242_tu=[]
transu5_242_tu[0]=["0_0",12,"0_1",2]
transu5_242_tu[1]=["0_0",15,"1_0",7]
var transu5_243_tu=[]
transu5_243_tu[0]=["0_0",7,"0_1",0]
transu5_243_tu[1]=["0_0",12,"1_0",4]
var transu5_244_tu=[]
transu5_244_tu[0]=["0_0",16,"0_1",2]
transu5_244_tu[1]=["0_0",19,"1_0",8]
var transu5_245_tu=[]
transu5_245_tu[0]=["0_0",13,"0_1",3]
transu5_245_tu[1]=["0_0",17,"1_0",8]
var transu5_247_tu=[]
transu5_247_tu[0]=["0_0",8,"0_1",0]
transu5_247_tu[1]=["0_0",12,"1_0",4]
var transu5_248_tu=[]
transu5_248_tu[0]=["0_0",3,"0_1",8]
transu5_248_tu[1]=["0_0",7,"1_0",1]


var transu5_249_tu=[]
transu5_249_tu[0]=["0_0",12,"0_1",25]
transu5_249_tu[1]=["0_0",18,"1_0",2]
var transu5_250_tu=[]
transu5_250_tu[0]=["0_0",8,"0_1",1]
transu5_250_tu[1]=["0_0",10,"1_0",3]
var transu5_251_tu=[]
transu5_251_tu[0]=["0_0",7,"0_1",1]
transu5_251_tu[1]=["0_0",9,"1_0",4]
var transu5_252_tu=[]
transu5_252_tu[0]=["0_0",10,"0_1",2]
transu5_252_tu[1]=["0_0",14,"1_0",6]
var transu5_254_tu=[]
transu5_254_tu[0]=["0_0",8,"0_1",0]
transu5_254_tu[1]=["0_0",12,"1_0",4]
var transu5_255_tu=[]
transu5_255_tu[0]=["0_0",8,"0_1",0]
transu5_255_tu[1]=["0_0",11,"1_0",4]
var transu5_256_tu=[]
transu5_256_tu[0]=["0_0",7,"0_1",0]
transu5_256_tu[1]=["0_0",10,"1_0",4]
var transu5_257_tu=[]
transu5_257_tu[0]=["0_0",7,"0_1",13]
transu5_257_tu[1]=["0_0",11,"1_0",3]
var transu5_258_tu=[]
transu5_258_tu[0]=["0_0",5,"0_1",13]
transu5_258_tu[1]=["0_0",8,"1_0",2]
var transu5_259_tu=[]
transu5_259_tu[0]=["0_0",10,"0_1",2]
transu5_259_tu[1]=["0_0",14,"1_0",5]
var transu5_260_tu=[]
transu5_260_tu[0]=["0_0",6,"0_1",14]
transu5_260_tu[1]=["0_0",10,"1_0",2]
var transu5_261_tu=[]
transu5_261_tu[0]=["0_0",7,"0_1",0]
transu5_261_tu[1]=["0_0",9,"1_0",2]
var transu5_262_tu=[]
transu5_262_tu[0]=["0_0",10,"0_1",2]
transu5_262_tu[1]=["0_0",12,"1_0",5]
var transu5_263_tu=[]
transu5_263_tu[0]=["0_0",11,"0_1",1]
transu5_263_tu[1]=["0_0",16,"1_0",6]
var transu5_264_tu=[]
transu5_264_tu[0]=["0_0",7,"0_1",13]
transu5_264_tu[1]=["0_0",10,"1_0",4]
var transu5_265_tu=[]
transu5_265_tu[0]=["0_0",5,"0_1",9]
transu5_265_tu[1]=["0_0",7,"1_0",3]
var transu5_266_tu=[]
transu5_266_tu[0]=["0_0",10,"0_1",20]
transu5_266_tu[1]=["0_0",15,"1_0",3]
var transu5_268_tu=[]
transu5_268_tu[0]=["0_0",10,"0_1",22]
transu5_268_tu[1]=["0_0",16,"1_0",4]
var transu5_269_tu=[]
transu5_269_tu[0]=["0_0",9,"0_1",0]
transu5_269_tu[1]=["0_0",14,"1_0",4]
var transu5_270_tu=[]
transu5_270_tu[0]=["0_0",10,"0_1",1]
transu5_270_tu[1]=["0_0",15,"1_0",6]
var transu5_271_tu=[]
transu5_271_tu[0]=["0_0",9,"0_1",1]
transu5_271_tu[1]=["0_0",13,"1_0",5]
var transu5_272_tu=[]
transu5_272_tu[0]=["0_0",10,"0_1",0]
transu5_272_tu[1]=["0_0",14,"1_0",6]
var transu5_273_tu=[]
transu5_273_tu[0]=["0_0",15,"0_1",3]
transu5_273_tu[1]=["0_0",20,"1_0",8]
var transu5_276_tu=[]
transu5_276_tu[0]=["0_0",8,"0_1",1]
transu5_276_tu[1]=["0_0",12,"1_0",4]
var transu5_277_tu=[]
transu5_277_tu[0]=["0_0",5,"0_1",15]
transu5_277_tu[1]=["0_0",10,"1_0",1]
var transu5_278_tu=[]
transu5_278_tu[0]=["0_0",7,"0_1",17]
transu5_278_tu[1]=["0_0",12,"1_0",3]
var transu5_279_tu=[]
transu5_279_tu[0]=["0_0",11,"0_1",3]
transu5_279_tu[1]=["0_0",15,"1_0",7]
var transu5_280_tu=[]
transu5_280_tu[0]=["0_0",11,"0_1",3]
transu5_280_tu[1]=["0_0",14,"1_0",7]
var transu5_281_tu=[]
transu5_281_tu[0]=["0_0",10,"0_1",1]
transu5_281_tu[1]=["0_0",13,"1_0",7]
var transu5_282_tu=[]
transu5_282_tu[0]=["0_0",13,"0_1",2]
transu5_282_tu[1]=["0_0",16,"1_0",8]
var transu5_283_tu=[]
transu5_283_tu[0]=["0_0",10,"0_1",2]
transu5_283_tu[1]=["0_0",12,"1_0",6]
var transu5_286_tu=[]
transu5_286_tu[0]=["0_0",13,"0_1",25]
transu5_286_tu[1]=["0_0",17,"1_0",4]
var transu5_287_tu=[]
transu5_287_tu[0]=["0_0",11,"0_1",21]
transu5_287_tu[1]=["0_0",13,"1_0",4]
var transu5_288_tu=[]
transu5_288_tu[0]=["0_0",19,"0_1",2]
transu5_288_tu[1]=["0_0",22,"1_0",11]
var transu5_289_tu=[]
transu5_289_tu[0]=["0_0",4,"0_1",0]
transu5_289_tu[1]=["0_0",5,"1_0",1]
var transu5_296_tu=[]
transu5_296_tu[0]=["0_0",9,"0_1",0]
transu5_296_tu[1]=["0_0",12,"1_0",5]
var transu5_298_tu=[]
transu5_298_tu[0]=["0_0",8,"0_1",1]
transu5_298_tu[1]=["0_0",11,"1_0",4]
var transu5_308_tu=[]
transu5_308_tu[0]=["0_0",8,"0_1",0]
transu5_308_tu[1]=["0_0",11,"1_0",4]
var transu5_309_tu=[]
transu5_309_tu[0]=["0_0",12,"0_1",0]
transu5_309_tu[1]=["0_0",18,"1_0",6]
var transu5_310_tu=[]
transu5_310_tu[0]=["0_0",10,"0_1",2]
transu5_310_tu[1]=["0_0",13,"1_0",6]
var transu5_311_tu=[]
transu5_311_tu[0]=["0_0",18,"0_1",4]
transu5_311_tu[1]=["0_0",23,"1_0",11]
var transu5_314_tu=[]
transu5_314_tu[0]=["0_0",13,"0_1",3]
transu5_314_tu[1]=["0_0",18,"1_0",6]
var transu5_315_tu=[]
transu5_315_tu[0]=["0_0",10,"0_1",2]
transu5_315_tu[1]=["0_0",14,"1_0",6]
var transu5_316_tu=[]
transu5_316_tu[0]=["0_0",15,"0_1",1]
transu5_316_tu[1]=["0_0",20,"1_0",4]
var transu5_317_tu=[]
transu5_317_tu[0]=["0_0",9,"0_1",1]
transu5_317_tu[1]=["0_0",11,"1_0",4]
var transu5_319_tu=[]
transu5_319_tu[0]=["0_0",9,"0_1",0]
transu5_319_tu[1]=["0_0",12,"1_0",4]
var transu5_320_tu=[]
transu5_320_tu[0]=["0_0",12,"0_1",2]
transu5_320_tu[1]=["0_0",16,"1_0",5]
var transu5_321_tu=[]
transu5_321_tu[0]=["0_0",15,"0_1",5]
transu5_321_tu[1]=["0_0",20,"1_0",8]
var transu5_323_tu=[]
transu5_323_tu[0]=["0_0",20,"0_1",7]
transu5_323_tu[1]=["0_0",23,"1_0",10]
var transu5_324_tu=[]
transu5_324_tu[0]=["0_0",7,"0_1",1]
transu5_324_tu[1]=["0_0",10,"1_0",3]
var transu5_325_tu=[]
transu5_325_tu[0]=["0_0",11,"0_1",1]
transu5_325_tu[1]=["0_0",14,"1_0",4]
var transu5_326_tu=[]
transu5_326_tu[0]=["0_0",9,"0_1",1]
transu5_326_tu[1]=["0_0",11,"1_0",4]
var transu5_327_tu=[]
transu5_327_tu[0]=["0_0",10,"0_1",2]
transu5_327_tu[1]=["0_0",14,"1_0",5]
var transu5_328_tu=[]
transu5_328_tu[0]=["0_0",22,"0_1",5]
transu5_328_tu[1]=["0_0",27,"1_0",12]
var transu5_329_tu=[]
transu5_329_tu[0]=["0_0",12,"0_1",3]
transu5_329_tu[1]=["0_0",17,"1_0",7]
var transu5_330_tu=[]
transu5_330_tu[0]=["0_0",10,"0_1",1]
transu5_330_tu[1]=["0_0",16,"1_0",7]
var transu5_331_tu=[]
transu5_331_tu[0]=["0_0",11,"0_1",1]
transu5_331_tu[1]=["0_0",14,"1_0",4]
var transu5_332_tu=[]
transu5_332_tu[0]=["0_0",10,"0_1",0]
transu5_332_tu[1]=["0_0",14,"1_0",4]



var transu3_4_tu=[]
transu3_4_tu[0]=["0_0",9,"0_1",0]
transu3_4_tu[1]=["0_0",14,"1_0",3]
var transu3_5_tu=[]
transu3_5_tu[0]=["0_0",11,"0_1",0]
transu3_5_tu[1]=["0_0",17,"1_0",1]
var transu3_6_tu=[]
transu3_6_tu[0]=["0_0",14,"0_1",1]
transu3_6_tu[1]=["0_0",18,"1_0",4]
//var transu3_22_tu=[]
//transu3_22_tu[0]=["0_0",4,"0_1",0]
//transu3_22_tu[1]=["0_0",7,"1_0",1]
var transu3_24_tu=[]
transu3_24_tu[0]=["0_0",8,"0_1",0]
transu3_24_tu[1]=["0_0",16,"1_0",3]
var transu3_36_tu=[]
transu3_36_tu[0]=["0_0",6,"0_1",15]
transu3_36_tu[1]=["0_0",10,"1_0",0]
var transu3_47_tu=[]
transu3_47_tu[0]=["0_0",6,"0_1",0]
transu3_47_tu[1]=["0_0",13,"1_0",2]
var transu3_48_tu=[]
transu3_48_tu[0]=["0_0",6,"0_1",0]
transu3_48_tu[1]=["0_0",9,"1_0",1]
var transu3_54_tu=[]
transu3_54_tu[0]=["0_0",4,"0_1",0]
transu3_54_tu[1]=["0_0",6,"1_0",1]
var transu3_56_tu=[]
transu3_56_tu[0]=["0_0",7,"0_1",0]
transu3_56_tu[1]=["0_0",9,"1_0",2]
var transu4_7_tu=[]
transu4_7_tu[0]=["0_0",8,"0_1",21]
transu4_7_tu[1]=["0_0",16,"1_0",3]
var transu4_7A_tu=[]
transu4_7A_tu[0]=["0_0",13,"0_1",29]
transu4_7A_tu[1]=["0_0",19,"1_0",4]
var transu4_10_tu=[]
transu4_10_tu[0]=["0_0",8,"0_1",1]
transu4_10_tu[1]=["0_0",11,"1_0",5]
var transu4_21_tu=[]
transu4_21_tu[0]=["0_0",8,"0_1",1]
transu4_21_tu[1]=["0_0",10,"1_0",4]
var transu4_22_tu=[]
transu4_22_tu[0]=["0_0",2,"0_1",0]
transu4_22_tu[1]=["0_0",4,"1_0",0]
var transu4_23_tu=[]
transu4_23_tu[0]=["0_0",4,"0_1",0]
transu4_23_tu[1]=["0_0",7,"1_0",1]
var transu4_25_tu=[]
transu4_25_tu[0]=["0_0",25,"0_1",0]
transu4_25_tu[1]=["0_0",35,"1_0",4]
var transu4_34_tu=[]
transu4_34_tu[0]=["0_0",12,"0_1",1]
transu4_34_tu[1]=["0_0",19,"1_0",3]
var transu4_57_tu=[]
transu4_57_tu[0]=["0_0",5,"0_1",0]
transu4_57_tu[1]=["0_0",7,"1_0",3]
var transu4_79_tu=[]
transu4_79_tu[0]=["0_0",6,"0_1",2]
transu4_79_tu[1]=["0_0",9,"1_0",3]
var transu4_83_tu=[]
transu4_83_tu[0]=["0_0",11,"0_1",1]
transu4_83_tu[1]=["0_0",17,"1_0",2]
var transu4_92_tu=[]
transu4_92_tu[0]=["0_0",5,"0_1",0]
transu4_92_tu[1]=["0_0",8,"1_0",2]
var transu4_95_tu=[]
transu4_95_tu[0]=["0_0",6,"0_1",12]
transu4_95_tu[1]=["0_0",10,"1_0",1]
var transu4_103_tu=[]
transu4_103_tu[0]=["0_0",10,"0_1",22]
transu4_103_tu[1]=["0_0",19,"1_0",0]
var transu4_108_tu=[]
transu4_108_tu[0]=["0_0",22,"0_1",3]
transu4_108_tu[1]=["0_0",25,"1_0",12]
var transu4_111_tu=[]
transu4_111_tu[0]=["0_0",10,"0_1",1]
transu4_111_tu[1]=["0_0",13,"1_0",3]
var transu4_112_tu=[]
transu4_112_tu[0]=["0_0",4,"0_1",1]
transu4_112_tu[1]=["0_0",5,"1_0",2]
var transu4_116_tu=[]
transu4_116_tu[0]=["0_0",2,"0_1",1]
transu4_116_tu[1]=["0_0",4,"1_0",1]
var transu4_118_tu=[]
transu4_118_tu[0]=["0_0",3,"0_1",0]
transu4_118_tu[1]=["0_0",7,"1_0",2]

var transu4_120_tu=[]
transu4_120_tu[0]=["0_0",5,"0_1",2]
transu4_120_tu[1]=["0_0",7,"1_0",2]
var transu4_124_tu=[]
transu4_124_tu[0]=["0_0",4,"0_1",2]
transu4_124_tu[1]=["0_0",6,"1_0",2]
var transu4_130_tu=[]
transu4_130_tu[0]=["0_0",7,"0_1",17]
transu4_130_tu[1]=["0_0",14,"1_0",4]
var transu4_131_tu=[]
transu4_131_tu[0]=["0_0",9,"0_1",0]
transu4_131_tu[1]=["0_0",12,"1_0",2]
var transu4_138_tu=[]
transu4_138_tu[0]=["0_0",4,"0_1",10]
transu4_138_tu[1]=["0_0",9,"1_0",0]
var transu4_144_tu=[]
transu4_144_tu[0]=["0_0",6,"0_1",16]
transu4_144_tu[1]=["0_0",10,"1_0",2]
var transu4_146_tu=[]
transu4_146_tu[0]=["0_0",4,"0_1",11]
transu4_146_tu[1]=["0_0",7,"1_0",1]

var transu5_8_tu=[]
transu5_8_tu[0]=["0_0",11,"0_1",0]
transu5_8_tu[1]=["0_0",22,"1_0",7]
var transu5_9_tu=[]
transu5_9_tu[0]=["0_0",6,"0_1",0]
transu5_9_tu[1]=["0_0",8,"1_0",1]
var transu5_14_tu=[]
transu5_14_tu[0]=["0_0",7,"0_1",0]
transu5_14_tu[1]=["0_0",13,"1_0",0]

var transu5_30_tu=[]
transu5_30_tu[0]=["0_0",2,"0_1",0]
transu5_30_tu[1]=["0_0",4,"1_0",0]
var transu5_31_tu=[]
transu5_31_tu[0]=["0_0",3,"0_1",0]
transu5_31_tu[1]=["0_0",5,"1_0",0]
var transu5_32_tu=[]
transu5_32_tu[0]=["0_0",20,"0_1",47]
transu5_32_tu[1]=["0_0",32,"1_0",2]
var transu5_33_tu=[]
transu5_33_tu[0]=["0_0",13,"0_1",1]
transu5_33_tu[1]=["0_0",25,"1_0",3]
var transu5_34_tu=[]
transu5_34_tu[0]=["0_0",9,"0_1",1]
transu5_34_tu[1]=["0_0",15,"1_0",3]
var transu5_42_tu=[]
transu5_42_tu[0]=["0_0",13,"0_1",3]
transu5_42_tu[1]=["0_0",23,"1_0",4]
var transu5_73_tu=[]
transu5_73_tu[0]=["0_0",10,"0_1",1]
transu5_73_tu[1]=["0_0",16,"1_0",6]
var transu5_93_tu=[]
transu5_93_tu[0]=["0_0",6,"0_1",15]
transu5_93_tu[1]=["0_0",11,"1_0",1]
var transu5_128_tu=[]
transu5_128_tu[0]=["0_1",14,"1_0",3]
transu5_128_tu[1]=["0_0",11,"1_0",0]
var transu5_145_tu=[]
transu5_145_tu[0]=["0_0",5,"0_1",10]
transu5_145_tu[1]=["0_0",8,"1_0",2]
var transu5_146_tu=[]
transu5_146_tu[0]=["0_0",6,"0_1",3]
transu5_146_tu[1]=["0_0",9,"1_0",3]
var transu5_149_tu=[]
transu5_149_tu[0]=["0_0",11,"0_1",3]
transu5_149_tu[1]=["0_0",13,"1_0",6]
var transu5_168_tu=[]
transu5_168_tu[0]=["0_0",3,"0_1",8]
transu5_168_tu[1]=["0_0",5,"1_0",2]

var transu5_184_tu=[]
transu5_184_tu[0]=["0_0",12,"0_1",5]
transu5_184_tu[1]=["0_0",17,"1_0",10]
/*
var transu5_184_tu=[]
transu5_184_tu[0]=["0_0",10,"0_1",5]
transu5_184_tu[1]=["0_0",15,"1_0",7]
*/

var transu5_193_tu=[]
transu5_193_tu[0]=["0_0",3,"0_1",8]
transu5_193_tu[1]=["0_0",5,"1_0",2]
var transu5_195_tu=[]
transu5_195_tu[0]=["0_0",6,"0_1",3]
transu5_195_tu[1]=["0_0",10,"1_0",5]
var transu5_196_tu=[]
transu5_196_tu[0]=["0_0",10,"0_1",21]
transu5_196_tu[1]=["0_0",15,"1_0",3]
var transu5_197_tu=[]
transu5_197_tu[0]=["0_0",4,"0_1",1]
transu5_197_tu[1]=["0_0",7,"1_0",1]
var transu5_207_tu=[]
transu5_207_tu[0]=["0_0",15,"0_1",30]
transu5_207_tu[1]=["0_0",24,"1_0",9]
var transu5_208_tu=[]
transu5_208_tu[0]=["0_0",8,"0_1",1]
transu5_208_tu[1]=["0_0",10,"1_0",2]

var transu5_209_tu=[]
transu5_209_tu[0]=["0_0",11,"0_1",28]
transu5_209_tu[1]=["0_0",21,"1_0",5]
var transu5_210_tu=[]
transu5_210_tu[0]=["0_0",7,"0_1",27]
transu5_210_tu[1]=["0_0",17,"1_0",28]
var transu5_214_tu=[]
transu5_214_tu[0]=["0_0",15,"0_1",33]
transu5_214_tu[1]=["0_0",20,"1_0",9]

var transu5_229_tu=[]
transu5_229_tu[0]=["0_0",3,"0_1",0]
transu5_229_tu[1]=["0_0",6,"1_0",1]
//var transu5_230_tu=[]
//transu5_230_tu[0]=["0_0",8,"0_1",1]
//transu5_230_tu[1]=["0_0",13,"1_0",3]
var transu5_231_tu=[]
transu5_231_tu[0]=["0_0",13,"0_1",2]
transu5_231_tu[1]=["0_0",16,"1_0",5]
var transu5_235_tu=[]
transu5_235_tu[0]=["0_0",5,"0_1",14]
transu5_235_tu[1]=["0_0",7,"1_0",1]
var transu5_246_tu=[]
transu5_246_tu[0]=["0_0",6,"0_1",18]
transu5_246_tu[1]=["0_0",10,"1_0",0]

var transu5_252_tu=[]
transu5_252_tu[0]=["0_0",5,"0_1",8]
transu5_252_tu[1]=["0_0",6,"1_0",2]
var transu5_253_tu=[]
transu5_253_tu[0]=["0_0",3,"1_1",0]
transu5_253_tu[1]=["0_0",4,"1_0",2]
var transu5_258_tu=[]
transu5_258_tu[0]=["0_0",6,"0_1",10]
transu5_258_tu[1]=["0_0",8,"1_0",2]
var transu5_267_tu=[]
transu5_267_tu[0]=["0_0",2,"0_1",5]
transu5_267_tu[1]=["0_0",3,"1_0",1]
var transu5_274_tu=[]
transu5_274_tu[0]=["0_0",3,"0_1",0]
transu5_274_tu[1]=["0_0",7,"1_0",2]
var transu5_275_tu=[]
transu5_275_tu[0]=["0_0",3,"0_1",9]
transu5_275_tu[1]=["0_0",5,"1_0",0]
var transu5_285_tu=[]
transu5_285_tu[0]=["0_0",8,"0_1",2]
transu5_285_tu[1]=["0_0",13,"1_0",3]
var transu5_297_tu=[]
transu5_297_tu[0]=["0_0",4,"0_1",1]
transu5_297_tu[1]=["0_0",7,"1_0",1]
var transu5_307_tu=[]
transu5_307_tu[0]=["0_0",7,"0_1",2]
transu5_307_tu[1]=["0_0",9,"1_0",3]
var transu5_312_tu=[]
transu5_312_tu[0]=["0_0",4,"0_1",14]
transu5_312_tu[1]=["0_0",8,"1_0",1]
var transu5_313_tu=[]
transu5_313_tu[0]=["0_0",8,"0_1",0]
transu5_313_tu[1]=["0_0",16,"1_0",3]
var transu5_318_tu=[]
transu5_318_tu[0]=["0_0",10,"0_1",2]
transu5_318_tu[1]=["0_0",15,"1_0",6]
//=============above require ccw fix==================

 //==============lost svg files ???????????????????
///////var transu2_5_tu=[]
/////transu2_5_tu[0]=["0_0",11,"0_1",23]
////transu2_5_tu[1]=["0_0",14,"1_0",3]
//var transu2_13_tu=[]
//transu2_13_tu[0]=["0_0",7,"0_1",1]
//transu2_13_tu[1]=["0_0",13,"1_0",3]
//var transu2_16_tu=[]
//transu2_16_tu[0]=["0_0",7,"0_1",0]
//transu2_16_tu[1]=["0_0",13,"1_0",2]
//var transu2_18_tu=[]
//transu2_18_tu[0]=["0_0",10,"0_1",0]
//transu2_18_tu[1]=["0_0",17,"1_0",3]
var transu2_19_tu=[]
transu2_19_tu[0]=["0_0",9,"0_1",3]
transu2_19_tu[1]=["0_0",12,"1_0",5]
var transu2_20_tu=[]
transu2_20_tu[0]=["0_0",11,"0_1",4]
transu2_20_tu[1]=["0_0",15,"1_0",5]

var transu6_1_tu=[]
transu6_1_tu[0]=["0_0",14,"0_1",1]
transu6_1_tu[1]=["0_0",19,"1_0",7]
var transu6_2_tu=[]
transu6_2_tu[0]=["0_0",13,"0_1",1]
transu6_2_tu[1]=["0_0",18,"1_0",6]
var transu6_3_tu=[]
transu6_3_tu[0]=["0_0",14,"0_1",2]
transu6_3_tu[1]=["0_0",21,"1_0",8]
var transu6_4_tu=[]
transu6_4_tu[0]=["0_0",15,"0_1",1]
transu6_4_tu[1]=["0_0",21,"1_0",8]
var transu6_5_tu=[]
transu6_5_tu[0]=["0_0",13,"0_1",1]
transu6_5_tu[1]=["0_0",18,"1_0",6]
var transu6_6_tu=[]
transu6_6_tu[0]=["0_0",18,"0_1",3]
transu6_6_tu[1]=["0_0",23,"1_0",8]
var transu6_7_tu=[]
transu6_7_tu[0]=["0_0",15,"0_1",2]
transu6_7_tu[1]=["0_0",20,"1_0",7]
var transu6_8_tu=[]
transu6_8_tu[0]=["0_0",14,"0_1",2]
transu6_8_tu[1]=["0_0",18,"1_0",6]
var transu6_9_tu=[]
transu6_9_tu[0]=["0_0",15,"0_1",2]
transu6_9_tu[1]=["0_0",19,"1_0",7]
var transu6_10_tu=[]
transu6_10_tu[0]=["0_0",16,"0_1",6]
transu6_10_tu[1]=["0_0",21,"1_0",11]
var transu6_11_tu=[]
transu6_11_tu[0]=["0_0",17,"0_1",5]
transu6_11_tu[1]=["0_0",0,"1_0",11]
var transu6_12_tu=[]
transu6_12_tu[0]=["0_0",17,"0_1",5]
transu6_12_tu[1]=["0_0",0,"1_0",10]
var transu6_13_tu=[]
transu6_13_tu[0]=["0_0",11,"0_1",1]
transu6_13_tu[1]=["0_0",16,"1_0",4]
var transu6_14_tu=[]
transu6_14_tu[0]=["0_0",11,"0_1",1]
transu6_14_tu[1]=["0_0",14,"1_0",6]
var transu6_15_tu=[]
transu6_15_tu[0]=["0_0",13,"0_1",1]
transu6_15_tu[1]=["0_0",18,"1_0",7]
var transu6_16_tu=[]
transu6_16_tu[0]=["0_0",13,"0_1",1]
transu6_16_tu[1]=["0_0",18,"1_0",6]
var transu6_17_tu=[]
transu6_17_tu[0]=["0_0",13,"0_1",2]
transu6_17_tu[1]=["0_0",19,"1_0",5]
var transu6_18_tu=[]
transu6_18_tu[0]=["0_0",11,"0_1",1]
transu6_18_tu[1]=["0_0",15,"1_0",5]
var transu6_19_tu=[]
transu6_19_tu[0]=["0_0",12,"0_1",1]
transu6_19_tu[1]=["0_0",17,"1_0",5]

var transu6_20_tu=[]
transu6_20_tu[0]=["0_0",19,"0_1",2]
transu6_20_tu[1]=["0_0",24,"1_0",8]
var transu6_21_tu=[]
transu6_21_tu[0]=["0_0",16,"0_1",2]
transu6_21_tu[1]=["0_0",20,"1_0",7]
var transu6_22_tu=[]
transu6_22_tu[0]=["0_0",21,"0_1",6]
transu6_22_tu[1]=["0_0",26,"1_0",12]
var transu6_23_tu=[]
transu6_23_tu[0]=["0_0",19,"0_1",6]
transu6_23_tu[1]=["0_0",27,"1_0",13]
var transu6_24_tu=[]
transu6_24_tu[0]=["0_0",15,"0_1",2]
transu6_24_tu[1]=["0_0",18,"1_0",8]
var transu6_25_tu=[]
transu6_25_tu[0]=["0_0",15,"0_1",3]
transu6_25_tu[1]=["0_0",21,"1_0",9]
var transu6_26_tu=[]
transu6_26_tu[0]=["0_0",16,"0_1",2]
transu6_26_tu[1]=["0_0",20,"1_0",6]
var transu6_27_tu=[]
transu6_27_tu[0]=["0_0",16,"0_1",2]
transu6_27_tu[1]=["0_0",21,"1_0",6]
var transu6_28_tu=[]
transu6_28_tu[0]=["0_0",20,"0_1",5]
transu6_28_tu[1]=["0_0",24,"1_0",11]
var transu6_29_tu=[]
transu6_29_tu[0]=["0_0",18,"0_1",6]
transu6_29_tu[1]=["0_0",21,"1_0",10]
var transu6_30_tu=[]
transu6_30_tu[0]=["0_0",19,"0_1",4]
transu6_30_tu[1]=["0_0",22,"1_0",11]
var transu6_31_tu=[]
transu6_31_tu[0]=["0_0",10,"0_1",4]
transu6_31_tu[1]=["0_0",13,"1_0",7]
var transu6_32_tu=[]
transu6_32_tu[0]=["0_0",7,"0_1",3]
transu6_32_tu[1]=["0_0",9,"1_0",5]
var transu6_33_tu=[]
transu6_33_tu[0]=["0_0",15,"0_1",5]
transu6_33_tu[1]=["0_0",19,"1_0",10]
var transu6_34_tu=[]
transu6_34_tu[0]=["0_0",15,"0_1",5]
transu6_34_tu[1]=["0_0",21,"1_0",9]
var transu6_35_tu=[]
transu6_35_tu[0]=["0_0",13,"0_1",3]
transu6_35_tu[1]=["0_0",15,"1_0",8]
var transu6_36_tu=[]
transu6_36_tu[0]=["0_0",14,"0_1",4]
transu6_36_tu[1]=["0_0",17,"1_0",9]
var transu6_37_tu=[]
transu6_37_tu[0]=["0_0",14,"0_1",1]
transu6_37_tu[1]=["0_0",21,"1_0",5]
 var transu6_38_tu=[]
transu6_38_tu[0]=["0_0",10,"0_1",0]
transu6_38_tu[1]=["0_0",16,"1_0",6]
var transu6_39_tu=[]
transu6_39_tu[0]=["0_0",13,"0_1",1]
transu6_39_tu[1]=["0_0",19,"1_0",5]
var transu6_40_tu=[]
transu6_40_tu[0]=["0_0",21,"0_1",1]
transu6_40_tu[1]=["0_0",26,"1_0",10]
var transu6_41_tu=[]
transu6_41_tu[0]=["0_0",13,"0_1",1]
transu6_41_tu[1]=["0_0",17,"1_0",7]
var transu6_42_tu=[]
transu6_42_tu[0]=["0_0",18,"0_1",4]
transu6_42_tu[1]=["0_0",23,"1_0",11]
var transu6_43_tu=[]
transu6_43_tu[0]=["0_0",16,"0_1",6]
transu6_43_tu[1]=["0_0",22,"1_0",11]
var transu6_44_tu=[]
transu6_44_tu[0]=["0_0",15,"0_1",5]
transu6_44_tu[1]=["0_0",20,"1_0",10]
var transu6_45_tu=[]
transu6_45_tu[0]=["0_0",12,"0_1",4]
transu6_45_tu[1]=["0_0",16,"1_0",8]
var transu6_46_tu=[]
transu6_46_tu[0]=["0_0",14,"0_1",4]
transu6_46_tu[1]=["0_0",19,"1_0",8]
var transu6_47_tu=[]
transu6_47_tu[0]=["0_0",14,"0_1",4]
transu6_47_tu[1]=["0_0",19,"1_0",9]
var transu6_48_tu=[]
transu6_48_tu[0]=["0_0",15,"0_1",1]
transu6_48_tu[1]=["0_0",21,"1_0",5]
var transu6_49_tu=[]
transu6_49_tu[0]=["0_0",12,"0_1",2]
transu6_49_tu[1]=["0_0",15,"1_0",5]
var transu6_50_tu=[]
transu6_50_tu[0]=["0_0",17,"0_1",3]
transu6_50_tu[1]=["0_0",22,"1_0",10]
var transu6_51_tu=[]
transu6_51_tu[0]=["0_0",10,"0_1",2]
transu6_51_tu[1]=["0_0",12,"1_0",5]
var transu6_52_tu=[]
transu6_52_tu[0]=["0_0",11,"0_1",1]
transu6_52_tu[1]=["0_0",14,"1_0",6]
var transu6_53_tu=[]
transu6_53_tu[0]=["0_0",12,"0_1",1]
transu6_53_tu[1]=["0_0",16,"1_0",6]
var transu6_54_tu=[]
transu6_54_tu[0]=["0_0",12,"0_1",1]
transu6_54_tu[1]=["0_0",16,"1_0",7]
var transu6_55_tu=[]
transu6_55_tu[0]=["0_0",9,"0_1",0]
transu6_55_tu[1]=["0_0",16,"1_0",4]
var transu6_56_tu=[]
transu6_56_tu[0]=["0_0",11,"0_1",1]
transu6_56_tu[1]=["0_0",15,"1_0",5]
var transu6_57_tu=[]
transu6_57_tu[0]=["0_0",11,"0_1",1]
transu6_57_tu[1]=["0_0",15,"1_0",5]
var transu6_58_tu=[]
transu6_58_tu[0]=["0_0",11,"0_1",2]
transu6_58_tu[1]=["0_0",14,"1_0",6]
var transu6_59_tu=[]
transu6_59_tu[0]=["0_0",9,"0_1",1]
transu6_59_tu[1]=["0_0",14,"1_0",6]
var transu6_60_tu=[]
transu6_60_tu[0]=["0_0",12,"0_1",2]
transu6_60_tu[1]=["0_0",16,"1_0",6]
var transu6_61_tu=[]
transu6_61_tu[0]=["0_0",17,"0_1",3]
transu6_61_tu[1]=["0_0",22,"1_0",8]
var transu6_62_tu=[]
transu6_62_tu[0]=["0_0",13,"0_1",1]
transu6_62_tu[1]=["0_0",15,"1_0",7]
var transu6_63_tu=[]
transu6_63_tu[0]=["0_0",17,"0_1",5]
transu6_63_tu[1]=["0_0",19,"1_0",9]
var transu6_64_tu=[]
transu6_64_tu[0]=["0_0",10,"0_1",2]
transu6_64_tu[1]=["0_0",13,"1_0",5]
var transu6_65_tu=[]
transu6_65_tu[0]=["0_0",10,"0_1",2]
transu6_65_tu[1]=["0_0",13,"1_0",5]
var transu6_66_tu=[]
transu6_66_tu[0]=["0_0",11,"0_1",3]
transu6_66_tu[1]=["0_0",13,"1_0",5]
var transu6_67_tu=[]
transu6_67_tu[0]=["0_0",18,"0_1",2]
transu6_67_tu[1]=["0_0",23,"1_0",7]
var transu6_68_tu=[]
transu6_68_tu[0]=["0_0",17,"0_1",3]
transu6_68_tu[1]=["0_0",26,"1_0",10]
var transu6_69_tu=[]
transu6_69_tu[0]=["0_0",10,"0_1",1]
transu6_69_tu[1]=["0_0",13,"1_0",6]
var transu6_70_tu=[]
transu6_70_tu[0]=["0_0",16,"0_1",4]
transu6_70_tu[1]=["0_0",19,"1_0",10]
var transu6_71_tu=[]
transu6_71_tu[0]=["0_0",9,"0_1",2]
transu6_71_tu[1]=["0_0",12,"1_0",5]
var transu6_72_tu=[]
transu6_72_tu[0]=["0_0",23,"0_1",8]
transu6_72_tu[1]=["0_0",29,"1_0",12]
var transu6_73_tu=[]
transu6_73_tu[0]=["0_0",16,"0_1",2]
transu6_73_tu[1]=["0_0",24,"1_0",10]
var transu6_74_tu=[]
transu6_74_tu[0]=["0_0",18,"0_1",6]
transu6_74_tu[1]=["0_0",22,"1_0",9]
var transu6_75_tu=[]
transu6_75_tu[0]=["0_0",13,"0_1",2]
transu6_75_tu[1]=["0_0",18,"1_0",7]
var transu6_76_tu=[]
transu6_76_tu[0]=["0_0",17,"0_1",4]
transu6_76_tu[1]=["0_0",24,"1_0",9]
var transu6_77_tu=[]
transu6_77_tu[0]=["0_0",11,"0_1",2]
transu6_77_tu[1]=["0_0",15,"1_0",7]
var transu6_78_tu=[]
transu6_78_tu[0]=["0_0",11,"0_1",1]
transu6_78_tu[1]=["0_0",15,"1_0",5]
var transu6_79_tu=[]
transu6_79_tu[0]=["0_0",15,"0_1",6]
transu6_79_tu[1]=["0_0",19,"1_0",8]
var transu6_80_tu=[]
transu6_80_tu[0]=["0_0",12,"0_1",1]
transu6_80_tu[1]=["0_0",17,"1_0",5]
var transu6_81_tu=[]
transu6_81_tu[0]=["0_0",21,"0_1",1]
transu6_81_tu[1]=["0_0",26,"1_0",6]
var transu6_82_tu=[]
transu6_82_tu[0]=["0_0",23,"0_1",1]
transu6_82_tu[1]=["0_0",26,"1_0",9]
var transu6_83_tu=[]
transu6_83_tu[0]=["0_0",26,"0_1",7]
transu6_83_tu[1]=["0_0",31,"1_0",15]
var transu6_84_tu=[]
transu6_84_tu[0]=["0_0",31,"0_1",9]
transu6_84_tu[1]=["0_0",39,"1_0",15]
var transu6_85_tu=[]
transu6_85_tu[0]=["0_0",18,"0_1",0]
transu6_85_tu[1]=["0_0",23,"1_0",6]
var transu6_86_tu=[]
transu6_86_tu[0]=["0_0",26,"0_1",6]
transu6_86_tu[1]=["0_0",33,"1_0",14]
var transu6_87_tu=[]
transu6_87_tu[0]=["0_0",23,"0_1",3]
transu6_87_tu[1]=["0_0",30,"1_0",10]
var transu6_88_tu=[]
transu6_88_tu[0]=["0_0",26,"0_1",6]
transu6_88_tu[1]=["0_0",31,"1_0",13]
var transu6_89_tu=[]
transu6_89_tu[0]=["0_0",19,"0_1",4]
transu6_89_tu[1]=["0_0",26,"1_0",7]
var transu6_90_tu=[]
transu6_90_tu[0]=["0_0",15,"0_1",3]
transu6_90_tu[1]=["0_0",20,"1_0",7]
var transu6_91_tu=[]
transu6_91_tu[0]=["0_0",14,"0_1",2]
transu6_91_tu[1]=["0_0",18,"1_0",8]
var transu6_92_tu=[]
transu6_92_tu[0]=["0_0",25,"0_1",3]
transu6_92_tu[1]=["0_0",36,"1_0",14]
var transu6_93_tu=[]
transu6_93_tu[0]=["0_0",20,"0_1",0]
transu6_93_tu[1]=["0_0",24,"1_0",8]
var transu6_94_tu=[]
transu6_94_tu[0]=["0_0",19,"0_1",0]
transu6_94_tu[1]=["0_0",29,"1_0",8]
var transu6_95_tu=[]
transu6_95_tu[0]=["0_0",20,"0_1",0]
transu6_95_tu[1]=["0_0",31,"1_0",11]
var transu6_96_tu=[]
transu6_96_tu[0]=["0_0",16,"0_1",5]
transu6_96_tu[1]=["0_0",20,"1_0",8]
var transu6_97_tu=[]
transu6_97_tu[0]=["0_0",21,"0_1",37]
transu6_97_tu[1]=["0_0",26,"1_0",7]
var transu6_98_tu=[]
transu6_98_tu[0]=["0_0",25,"0_1",0]
transu6_98_tu[1]=["0_0",30,"1_0",8]
var transu6_99_tu=[]
transu6_99_tu[0]=["0_0",15,"0_1",0]
transu6_99_tu[1]=["0_0",20,"1_0",5]
var transu6_100_tu=[]
transu6_100_tu[0]=["0_0",25,"0_1",3]
transu6_100_tu[1]=["0_0",29,"1_0",11]

var transu6_101_tu=[]
transu6_101_tu[0]=["0_0",23,"0_1",1]
transu6_101_tu[1]=["0_0",29,"1_0",9]
var transu6_102_tu=[]
transu6_102_tu[0]=["0_0",14,"0_1",2]
transu6_102_tu[1]=["0_0",17,"1_0",5]
var transu6_103_tu=[]
transu6_103_tu[0]=["0_0",22,"0_1",2]
transu6_103_tu[1]=["0_0",27,"1_0",8]
var transu6_104_tu=[]
transu6_104_tu[0]=["0_0",13,"0_1",0]
transu6_104_tu[1]=["0_0",18,"1_0",2]
var transu6_105_tu=[]
transu6_105_tu[0]=["0_0",13,"0_1",2]
transu6_105_tu[1]=["0_0",18,"1_0",5]
var transu6_106_tu=[]
transu6_106_tu[0]=["0_0",14,"0_1",0]
transu6_106_tu[1]=["0_0",20,"1_0",6]
var transu6_107_tu=[]
transu6_107_tu[0]=["0_0",16,"0_1",3]
transu6_107_tu[1]=["0_0",21,"1_0",9]
var transu6_108_tu=[]
transu6_108_tu[0]=["0_0",20,"0_1",37]
transu6_108_tu[1]=["0_0",25,"1_0",6]
var transu6_109_tu=[]
transu6_109_tu[0]=["0_0",15,"0_1",4]
transu6_109_tu[1]=["0_0",19,"1_0",9]
var transu6_110_tu=[]
transu6_110_tu[0]=["0_0",11,"0_1",4]
transu6_110_tu[1]=["0_0",16,"1_0",6]
var transu6_111_tu=[]
transu6_111_tu[0]=["0_0",13,"0_1",1]
transu6_111_tu[1]=["0_0",19,"1_0",4]
var transu6_112_tu=[]
transu6_112_tu[0]=["0_0",13,"0_1",6]
transu6_112_tu[1]=["0_0",20,"1_0",9]
var transu6_113_tu=[]
transu6_113_tu[0]=["0_0",13,"0_1",4]
transu6_113_tu[1]=["0_0",20,"1_0",10]
var transu6_114_tu=[]
transu6_114_tu[0]=["0_0",14,"0_1",7]
transu6_114_tu[1]=["0_0",21,"1_0",9]

var transu6_213_tu=[]
transu6_213_tu[0]=["0_0",11,"0_1",2]
transu6_213_tu[1]=["0_0",16,"1_0",6]
var transu6_214_tu=[]
transu6_214_tu[0]=["0_0",22,"0_1",6]
transu6_214_tu[1]=["0_0",26,"1_0",12]
var transu6_215_tu=[]
transu6_215_tu[0]=["0_0",15,"0_1",3]
transu6_215_tu[1]=["0_0",21,"1_0",9]
var transu6_266_tu=[]
transu6_266_tu[0]=["0_0",10,"0_1",1]
transu6_266_tu[1]=["0_0",16,"1_0",6]
var transu6_268_tu=[]
transu6_268_tu[0]=["0_0",20,"0_1",7]
transu6_268_tu[1]=["0_0",25,"1_0",12]
var transu6_314_tu=[]
transu6_314_tu[0]=["0_0",12,"0_1",2]
transu6_314_tu[1]=["0_0",17,"1_0",7]
var transu6_315_tu=[]
transu6_315_tu[0]=["0_0",9,"0_1",3]
transu6_315_tu[1]=["0_0",12,"1_0",5]
var transu6_316_tu=[]
transu6_316_tu[0]=["0_0",15,"0_1",2]
transu6_316_tu[1]=["0_0",20,"1_0",6]
var transu6_317_tu=[]
transu6_317_tu[0]=["0_0",19,"0_1",5]
transu6_317_tu[1]=["0_0",22,"1_0",10]
var transu6_318_tu=[]
transu6_318_tu[0]=["0_0",10,"0_1",2]
transu6_318_tu[1]=["0_0",14,"1_0",6]
var transu6_319_tu=[]
transu6_319_tu[0]=["0_0",11,"0_1",0]
transu6_319_tu[1]=["0_0",16,"1_0",6]
var transu6_362_tu=[]
transu6_362_tu[0]=["0_0",18,"0_1",4]
transu6_362_tu[1]=["0_0",21,"1_0",10]
var transu6_363_tu=[]
transu6_363_tu[0]=["0_0",9,"0_1",2]
transu6_363_tu[1]=["0_0",12,"1_0",6]
var transu6_364_tu=[]
transu6_364_tu[0]=["0_0",13,"0_1",3]
transu6_364_tu[1]=["0_0",18,"1_0",8]
var transu6_365_tu=[]
transu6_365_tu[0]=["0_0",10,"0_1",2]
transu6_365_tu[1]=["0_0",15,"1_0",5]
var transu6_366_tu=[]
transu6_366_tu[0]=["0_0",9,"0_1",1]
transu6_366_tu[1]=["0_0",13,"1_0",5]
var transu6_367_tu=[]
transu6_367_tu[0]=["0_0",10,"0_1",3]
transu6_367_tu[1]=["0_0",14,"1_0",6]
var transu6_368_tu=[]
transu6_368_tu[0]=["0_0",9,"0_1",3]
transu6_368_tu[1]=["0_0",12,"1_0",6]
var transu6_369_tu=[]
transu6_369_tu[0]=["0_0",12,"0_1",3]
transu6_369_tu[1]=["0_0",14,"1_0",7]
var transu6_370_tu=[]
transu6_370_tu[0]=["0_0",11,"0_1",2]
transu6_370_tu[1]=["0_0",14,"1_0",5]
var transu6_371_tu=[]
transu6_371_tu[0]=["0_0",14,"0_1",0]
transu6_371_tu[1]=["0_0",20,"1_0",4]
var transu6_372_tu=[]
transu6_372_tu[0]=["0_0",21,"0_1",6]
transu6_372_tu[1]=["0_0",26,"1_0",12]
var transu6_373_tu=[]
transu6_373_tu[0]=["0_0",15,"0_1",5]
transu6_373_tu[1]=["0_0",19,"1_0",9]
var transu6_374_tu=[]
transu6_374_tu[0]=["0_0",13,"0_1",3]
transu6_374_tu[1]=["0_0",15,"1_0",7]
var transu6_375_tu=[]
transu6_375_tu[0]=["0_0",13,"0_1",3]
transu6_375_tu[1]=["0_0",15,"1_0",7]


var transu6_376_tu=[]
transu6_376_tu[0]=["0_0",20,"0_1",3]
transu6_376_tu[1]=["0_0",26,"1_0",10]
var transu6_377_tu=[]
transu6_377_tu[0]=["0_0",23,"0_1",4]
transu6_377_tu[1]=["0_0",26,"1_0",12]
var transu6_378_tu=[]
transu6_378_tu[0]=["0_0",38,"0_1",12]
transu6_378_tu[1]=["0_0",43,"1_0",19]
var transu6_379_tu=[]
transu6_379_tu[0]=["0_0",20,"0_1",7]
transu6_379_tu[1]=["0_0",26,"1_0",12]
var transu6_380_tu=[]
transu6_380_tu[0]=["0_0",15,"0_1",2]
transu6_380_tu[1]=["0_0",19,"1_0",6]

var transu6_381_tu=[]
transu6_381_tu[0]=["0_0",11,"0_1",2]
transu6_381_tu[1]=["0_0",17,"1_0",7]
var transu6_382_tu=[]
transu6_382_tu[0]=["0_0",9,"0_1",18]
transu6_382_tu[1]=["0_0",14,"1_0",5]
var transu6_383_tu=[]
transu6_383_tu[0]=["0_0",13,"0_1",3]
transu6_383_tu[1]=["0_0",15,"1_0",7]
var transu6_384_tu=[]
transu6_384_tu[0]=["0_0",12,"0_1",2]
transu6_384_tu[1]=["0_0",17,"1_0",7]
var transu6_385_tu=[]
transu6_385_tu[0]=["0_0",22,"0_1",0]
transu6_385_tu[1]=["0_0",37,"1_0",15]
var transu6_386_tu=[]
transu6_386_tu[0]=["0_0",18,"0_1",2]
transu6_386_tu[1]=["0_0",24,"1_0",7]
var transu6_387_tu=[]
transu6_387_tu[0]=["0_0",15,"0_1",2]
transu6_387_tu[1]=["0_0",18,"1_0",9]
var transu6_388_tu=[]
transu6_388_tu[0]=["0_0",13,"0_1",1]
transu6_388_tu[1]=["0_0",17,"1_0",5]
var transu6_389_tu=[]
transu6_389_tu[0]=["0_0",14,"0_1",3]
transu6_389_tu[1]=["0_0",19,"1_0",8]
var transu6_390_tu=[]
transu6_390_tu[0]=["0_0",20,"0_1",7]
transu6_390_tu[1]=["0_0",26,"1_0",12]
var transu6_391_tu=[]
transu6_391_tu[0]=["0_0",15,"0_1",2]
transu6_391_tu[1]=["0_0",19,"1_0",6]
var transu6_392_tu=[]
transu6_392_tu[0]=["0_0",11,"0_1",2]
transu6_392_tu[1]=["0_0",14,"1_0",4]

var transu6_430_tu=[]
transu6_430_tu[0]=["0_0",22,"0_1",5]
transu6_430_tu[1]=["0_0",28,"1_0",11]
var transu6_455_tu=[]
transu6_455_tu[0]=["0_0",19,"0_1",4]
transu6_455_tu[1]=["0_0",24,"1_0",11]
var transu6_456_tu=[]
transu6_456_tu[0]=["0_0",13,"0_1",3]
transu6_456_tu[1]=["0_0",18,"1_0",8]
var transu6_457_tu=[]
transu6_457_tu[0]=["0_0",13,"0_1",3]
transu6_457_tu[1]=["0_0",17,"1_0",8]
var transu6_458_tu=[]
transu6_458_tu[0]=["0_0",13,"0_1",3]
transu6_458_tu[1]=["0_0",17,"1_0",8]
var transu6_459_tu=[]
transu6_459_tu[0]=["0_0",11,"0_1",1]
transu6_459_tu[1]=["0_0",13,"1_0",2]
var transu6_460_tu=[]
transu6_460_tu[0]=["0_0",11,"0_1",1]
transu6_460_tu[1]=["0_0",14,"1_0",7]
var transu6_461_tu=[]
transu6_461_tu[0]=["0_0",11,"0_1",2]
transu6_461_tu[1]=["0_0",14,"1_0",5]
var transu6_462_tu=[]
transu6_462_tu[0]=["0_0",11,"0_1",1]
transu6_462_tu[1]=["0_0",15,"1_0",6]
var transu6_463_tu=[]
transu6_463_tu[0]=["0_0",10,"0_1",1]
transu6_463_tu[1]=["0_0",14,"1_0",7]
var transu6_464_tu=[]
transu6_464_tu[0]=["0_0",9,"0_1",1]
transu6_464_tu[1]=["0_0",13,"1_0",6]
var transu6_465_tu=[]
transu6_465_tu[0]=["0_0",15,"0_1",4]
transu6_465_tu[1]=["0_0",20,"1_0",10]
var transu6_466_tu=[]
transu6_466_tu[0]=["0_0",14,"0_1",3]
transu6_466_tu[1]=["0_0",18,"1_0",9]
var transu6_467_tu=[]
transu6_467_tu[0]=["0_0",12,"0_1",2]
transu6_467_tu[1]=["0_0",16,"1_0",7]
var transu6_468_tu=[]
transu6_468_tu[0]=["0_0",20,"0_1",4]
transu6_468_tu[1]=["0_0",26,"1_0",8]
var transu6_469_tu=[]
transu6_469_tu[0]=["0_0",11,"0_1",0]
transu6_469_tu[1]=["0_0",17,"1_0",6]
var transu6_470_tu=[]
transu6_470_tu[0]=["0_0",11,"0_1",1]
transu6_470_tu[1]=["0_0",14,"1_0",7]
var transu6_471_tu=[]
transu6_471_tu[0]=["0_0",12,"0_1",2]
transu6_471_tu[1]=["0_0",16,"1_0",7]
var transu6_472_tu=[]
transu6_472_tu[0]=["0_0",11,"0_1",1]
transu6_472_tu[1]=["0_0",14,"1_0",4]
var transu6_473_tu=[]
transu6_473_tu[0]=["0_0",13,"0_1",2]
transu6_473_tu[1]=["0_0",17,"1_0",5]
var transu6_474_tu=[]
transu6_474_tu[0]=["0_0",9,"0_1",1]
transu6_474_tu[1]=["0_0",12,"1_0",6]
var transu6_475_tu=[]
transu6_475_tu[0]=["0_0",10,"0_1",1]
transu6_475_tu[1]=["0_0",12,"1_0",4]
var transu6_476_tu=[]
transu6_476_tu[0]=["0_0",10,"0_1",0]
transu6_476_tu[1]=["0_0",16,"1_0",6]
var transu6_477_tu=[]
transu6_477_tu[0]=["0_0",21,"0_1",5]
transu6_477_tu[1]=["0_0",26,"1_0",10]
var transu6_478_tu=[]
transu6_478_tu[0]=["0_0",7,"0_1",1]
transu6_478_tu[1]=["0_0",9,"1_0",3]
var transu6_479_tu=[]
transu6_479_tu[0]=["0_0",5,"0_1",11]
transu6_479_tu[1]=["0_0",7,"1_0",1]
var transu6_480_tu=[]
transu6_480_tu[0]=["0_0",20,"0_1",1]
transu6_480_tu[1]=["0_0",23,"1_0",7]
var transu6_481_tu=[]
transu6_481_tu[0]=["0_0",19,"0_1",5]
transu6_481_tu[1]=["0_0",23,"1_0",9]
var transu6_482_tu=[]
transu6_482_tu[0]=["0_0",16,"0_1",0]
transu6_482_tu[1]=["0_0",17,"1_0",7]
var transu6_483_tu=[]
transu6_483_tu[0]=["0_0",15,"0_1",2]
transu6_483_tu[1]=["0_0",19,"1_0",6]
var transu6_484_tu=[]
transu6_484_tu[0]=["0_0",11,"0_1",1]
transu6_484_tu[1]=["0_0",13,"1_0",5]
var transu6_485_tu=[]
transu6_485_tu[0]=["0_0",10,"0_1",3]
transu6_485_tu[1]=["0_0",12,"1_0",5]
var transu6_486_tu=[]
transu6_486_tu[0]=["0_0",21,"0_1",2]
transu6_486_tu[1]=["0_0",25,"1_0",9]
var transu6_487_tu=[]
transu6_487_tu[0]=["0_0",11,"0_1",23]
transu6_487_tu[1]=["0_0",15,"1_0",2]
var transu6_488_tu=[]
transu6_488_tu[0]=["0_0",9,"0_1",1]
transu6_488_tu[1]=["0_0",11,"1_0",4]
var transu6_489_tu=[]
transu6_489_tu[0]=["0_0",15,"0_1",3]
transu6_489_tu[1]=["0_0",19,"1_0",8]
var transu6_490_tu=[]
transu6_490_tu[0]=["0_0",16,"0_1",2]
transu6_490_tu[1]=["0_0",20,"1_0",7]
var transu6_491_tu=[]
transu6_491_tu[0]=["0_0",11,"0_1",4]
transu6_491_tu[1]=["0_0",17,"1_0",7]
var transu6_492_tu=[]
transu6_492_tu[0]=["0_0",14,"0_1",2]
transu6_492_tu[1]=["0_0",19,"1_0",8]
var transu6_493_tu=[]
transu6_493_tu[0]=["0_0",11,"0_1",3]
transu6_493_tu[1]=["0_0",16,"1_0",8]
var transu6_494_tu=[]
transu6_494_tu[0]=["0_0",11,"0_1",3]
transu6_494_tu[1]=["0_0",15,"1_0",6]
var transu6_495_tu=[]
transu6_495_tu[0]=["0_0",11,"0_1",2]
transu6_495_tu[1]=["0_0",17,"1_0",6]
var transu6_496_tu=[]
transu6_496_tu[0]=["0_0",12,"0_1",0]
transu6_496_tu[1]=["0_0",14,"1_0",5]
var transu6_497_tu=[]
transu6_497_tu[0]=["0_0",15,"0_1",6]
transu6_497_tu[1]=["0_0",19,"1_0",10]
var transu6_498_tu=[]
transu6_498_tu[0]=["0_0",22,"0_1",3]
transu6_498_tu[1]=["0_0",28,"1_0",13]
var transu6_499_tu=[]
transu6_499_tu[0]=["0_0",16,"0_1",5]
transu6_499_tu[1]=["0_0",20,"1_0",10]
var transu6_500_tu=[]
transu6_500_tu[0]=["0_0",22,"0_1",7]
transu6_500_tu[1]=["0_0",28,"1_0",14]
     var transu6_501_tu=[]
transu6_501_tu[0]=["0_0",13,"0_1",1]
transu6_501_tu[1]=["0_0",18,"1_0",8]
var transu6_502_tu=[]
transu6_502_tu[0]=["0_0",13,"0_1",1]
transu6_502_tu[1]=["0_0",18,"1_0",7]
var transu6_503_tu=[]
transu6_503_tu[0]=["0_0",12,"0_1",1]
transu6_503_tu[1]=["0_0",16,"1_0",7]
var transu6_504_tu=[]
transu6_504_tu[0]=["0_0",15,"0_1",2]
transu6_504_tu[1]=["0_0",20,"1_0",6]
var transu6_505_tu=[]
transu6_505_tu[0]=["0_0",21,"0_1",5]
transu6_505_tu[1]=["0_0",25,"1_0",11]
var transu6_506_tu=[]
transu6_506_tu[0]=["0_0",15,"0_1",2]
transu6_506_tu[1]=["0_0",18,"1_0",7]
var transu6_507_tu=[]
transu6_507_tu[0]=["0_0",13,"0_1",3]
transu6_507_tu[1]=["0_0",17,"1_0",6]
var transu6_508_tu=[]
transu6_508_tu[0]=["0_0",15,"0_1",2]
transu6_508_tu[1]=["0_0",22,"1_0",10]
var transu6_509_tu=[]
transu6_509_tu[0]=["0_0",12,"0_1",1]
transu6_509_tu[1]=["0_0",16,"1_0",7]
var transu6_510_tu=[]
transu6_510_tu[0]=["0_0",13,"0_1",3]
transu6_510_tu[1]=["0_0",18,"1_0",8]
var transu6_511_tu=[]
transu6_511_tu[0]=["0_0",13,"0_1",2]
transu6_511_tu[1]=["0_0",18,"1_0",6]
var transu6_512_tu=[]
transu6_512_tu[0]=["0_0",9,"0_1",2]
transu6_512_tu[1]=["0_0",13,"1_0",6]
var transu6_513_tu=[]
transu6_513_tu[0]=["0_0",9,"0_1",2]
transu6_513_tu[1]=["0_0",12,"1_0",5]
var transu6_514_tu=[]
transu6_514_tu[0]=["0_0",10,"0_1",23]
transu6_514_tu[1]=["0_0",15,"1_0",2]
var transu6_515_tu=[]
transu6_515_tu[0]=["0_0",14,"0_1",3]
transu6_515_tu[1]=["0_0",19,"1_0",9]
var transu6_516_tu=[]
transu6_516_tu[0]=["0_0",18,"0_1",4]
transu6_516_tu[1]=["0_0",23,"1_0",11]
var transu6_517_tu=[]
transu6_517_tu[0]=["0_0",17,"0_1",5]
transu6_517_tu[1]=["0_0",23,"1_0",11]
var transu6_518_tu=[]
transu6_518_tu[0]=["0_0",14,"0_1",2]
transu6_518_tu[1]=["0_0",18,"1_0",8]
var transu6_519_tu=[]
transu6_519_tu[0]=["0_0",11,"0_1",3]
transu6_519_tu[1]=["0_0",15,"1_0",7]
var transu6_520_tu=[]
transu6_520_tu[0]=["0_0",23,"0_1",3]
transu6_520_tu[1]=["0_0",27,"1_0",13]
var transu6_521_tu=[]
transu6_521_tu[0]=["0_0",20,"0_1",6]
transu6_521_tu[1]=["0_0",1,"1_0",13]
var transu6_522_tu=[]
transu6_522_tu[0]=["0_0",19,"0_1",5]
transu6_522_tu[1]=["0_0",1,"1_0",12]
var transu6_523_tu=[]
transu6_523_tu[0]=["0_0",17,"0_1",3]
transu6_523_tu[1]=["0_0",21,"1_0",10]
var transu6_524_tu=[]
transu6_524_tu[0]=["0_0",14,"0_1",4]
transu6_524_tu[1]=["0_0",19,"1_0",9]
var transu6_525_tu=[]
transu6_525_tu[0]=["0_0",14,"0_1",4]
transu6_525_tu[1]=["0_0",19,"1_0",9]
var transu6_526_tu=[]
transu6_526_tu[0]=["0_0",13,"0_1",3]
transu6_526_tu[1]=["0_0",17,"1_0",8]
var transu6_527_tu=[]
transu6_527_tu[0]=["0_0",17,"0_1",8]
transu6_527_tu[1]=["0_0",2,"1_0",14]
var transu6_528_tu=[]
transu6_528_tu[0]=["0_0",17,"0_1",7]
transu6_528_tu[1]=["0_0",3,"1_0",13]
 var transu6_529_tu=[]
transu6_529_tu[0]=["0_0",23,"0_1",7]
transu6_529_tu[1]=["0_0",1,"1_0",15]
var transu6_530_tu=[]
transu6_530_tu[0]=["0_0",17,"0_1",5]
transu6_530_tu[1]=["0_0",23,"1_0",11]
var transu6_531_tu=[]
transu6_531_tu[0]=["0_0",16,"0_1",4]
transu6_531_tu[1]=["0_0",21,"1_0",10]
var transu6_532_tu=[]
transu6_532_tu[0]=["0_0",16,"0_1",4]
transu6_532_tu[1]=["0_0",21,"1_0",10]
var transu6_533_tu=[]
transu6_533_tu[0]=["0_0",15,"0_1",3]
transu6_533_tu[1]=["0_0",19,"1_0",9]
var transu6_534_tu=[]
transu6_534_tu[0]=["0_0",18,"0_1",4]
transu6_534_tu[1]=["0_0",23,"1_0",11]
var transu6_535_tu=[]
transu6_535_tu[0]=["0_0",17,"0_1",5]
transu6_535_tu[1]=["0_0",23,"1_0",11]
var transu6_536_tu=[]
transu6_536_tu[0]=["0_0",8,"0_1",1]
transu6_536_tu[1]=["0_0",13,"1_0",6]
var transu6_537_tu=[]
transu6_537_tu[0]=["0_0",12,"0_1",2]
transu6_537_tu[1]=["0_0",15,"1_0",5]
var transu6_538_tu=[]
transu6_538_tu[0]=["0_0",11,"0_1",0]
transu6_538_tu[1]=["0_0",17,"1_0",6]
var transu6_539_tu=[]
transu6_539_tu[0]=["0_0",14,"0_1",2]
transu6_539_tu[1]=["0_0",18,"1_0",8]
var transu6_540_tu=[]
transu6_540_tu[0]=["0_0",16,"0_1",3]
transu6_540_tu[1]=["0_0",20,"1_0",7]
var transu6_541_tu=[]
transu6_541_tu[0]=["0_0",9,"0_1",1]
transu6_541_tu[1]=["0_0",12,"1_0",4]
var transu6_542_tu=[]
transu6_542_tu[0]=["0_0",9,"0_1",2]
transu6_542_tu[1]=["0_0",13,"1_0",5]
var transu6_543_tu=[]
transu6_543_tu[0]=["0_0",12,"0_1",2]
transu6_543_tu[1]=["0_0",16,"1_0",8]
var transu6_544_tu=[]
transu6_544_tu[0]=["0_0",18,"0_1",6]
transu6_544_tu[1]=["0_0",24,"1_0",11]
var transu6_545_tu=[]
transu6_545_tu[0]=["0_0",9,"0_1",1]
transu6_545_tu[1]=["0_0",10,"1_0",4]
var transu6_546_tu=[]
transu6_546_tu[0]=["0_0",9,"0_1",15]
transu6_546_tu[1]=["0_0",11,"1_0",1]
var transu6_547_tu=[]
transu6_547_tu[0]=["0_0",9,"0_1",1]
transu6_547_tu[1]=["0_0",13,"1_0",5]
var transu6_548_tu=[]
transu6_548_tu[0]=["0_0",8,"0_1",1]
transu6_548_tu[1]=["0_0",10,"1_0",1]
var transu6_549_tu=[]
transu6_549_tu[0]=["0_0",11,"0_1",2]
transu6_549_tu[1]=["0_0",14,"1_0",5]
var transu6_550_tu=[]
transu6_550_tu[0]=["0_0",11,"0_1",2]
transu6_550_tu[1]=["0_0",14,"1_0",6]
var transu6_551_tu=[]
transu6_551_tu[0]=["0_0",13,"0_1",3]
transu6_551_tu[1]=["0_0",17,"1_0",8]
var transu6_553_tu=[]
transu6_553_tu[0]=["0_0",13,"0_1",2]
transu6_553_tu[1]=["0_0",18,"1_0",6]
var transu6_554_tu=[]
transu6_554_tu[0]=["0_0",10,"0_1",1]
transu6_554_tu[1]=["0_0",13,"1_0",4]
var transu6_555_tu=[]
transu6_555_tu[0]=["0_0",17,"0_1",5]
transu6_555_tu[1]=["0_0",24,"1_0",10]
var transu6_557_tu=[]
transu6_557_tu[0]=["0_0",19,"0_1",5]
transu6_557_tu[1]=["0_0",24,"1_0",11]
var transu6_558_tu=[]
transu6_558_tu[0]=["0_0",11,"0_1",5]
transu6_558_tu[1]=["0_0",15,"1_0",7]
var transu6_559_tu=[]
transu6_559_tu[0]=["0_0",11,"0_1",4]
transu6_559_tu[1]=["0_0",15,"1_0",7]
var transu6_560_tu=[]
transu6_560_tu[0]=["0_0",19,"0_1",5]
transu6_560_tu[1]=["0_0",23,"1_0",10]
var transu6_561_tu=[]
transu6_561_tu[0]=["0_0",15,"0_1",2]
transu6_561_tu[1]=["0_0",18,"1_0",9]
var transu6_562_tu=[]
transu6_562_tu[0]=["0_0",17,"0_1",3]
transu6_562_tu[1]=["0_0",21,"1_0",9]
var transu6_563_tu=[]
transu6_563_tu[0]=["0_0",9,"0_1",3]
transu6_563_tu[1]=["0_0",13,"1_0",5]
var transu6_564_tu=[]
transu6_564_tu[0]=["0_0",8,"0_1",1]
transu6_564_tu[1]=["0_0",11,"1_0",3]
var transu6_565_tu=[]
transu6_565_tu[0]=["0_0",12,"0_1",1]
transu6_565_tu[1]=["0_0",17,"1_0",5]
var transu6_566_tu=[]
transu6_566_tu[0]=["0_0",9,"0_1",0]
transu6_566_tu[1]=["0_0",12,"1_0",6]
var transu6_567_tu=[]
transu6_567_tu[0]=["0_0",10,"0_1",0]
transu6_567_tu[1]=["0_0",17,"1_0",3]
var transu6_568_tu=[]
transu6_568_tu[0]=["0_0",9,"0_1",0]
transu6_568_tu[1]=["0_0",14,"1_0",4]
var transu6_569_tu=[]
transu6_569_tu[0]=["0_0",18,"0_1",2]
transu6_569_tu[1]=["0_0",24,"1_0",12]
var transu6_570_tu=[]
transu6_570_tu[0]=["0_0",15,"0_1",2]
transu6_570_tu[1]=["0_0",19,"1_0",7]
var transu6_571_tu=[]
transu6_571_tu[0]=["0_0",18,"0_1",3]
transu6_571_tu[1]=["0_0",25,"1_0",10]
var transu6_572_tu=[]
transu6_572_tu[0]=["0_0",14,"0_1",2]
transu6_572_tu[1]=["0_0",18,"1_0",6]
var transu6_573_tu=[]
transu6_573_tu[0]=["0_0",19,"0_1",0]
transu6_573_tu[1]=["0_0",25,"1_0",10]
var transu6_574_tu=[]
transu6_574_tu[0]=["0_0",13,"0_1",1]
transu6_574_tu[1]=["0_0",19,"1_0",7]
var transu6_575_tu=[]
transu6_575_tu[0]=["0_0",12,"0_1",1]
transu6_575_tu[1]=["0_0",19,"1_0",5]
var transu6_576_tu=[]
transu6_576_tu[0]=["0_0",12,"0_1",1]
transu6_576_tu[1]=["0_0",19,"1_0",5]
var transu6_577_tu=[]
transu6_577_tu[0]=["0_0",11,"0_1",1]
transu6_577_tu[1]=["0_0",16,"1_0",6]
var transu6_579_tu=[]
transu6_579_tu[0]=["0_0",10,"0_1",1]
transu6_579_tu[1]=["0_0",15,"1_0",5]
var transu6_580_tu=[]
transu6_580_tu[0]=["0_0",12,"0_1",1]
transu6_580_tu[1]=["0_0",16,"1_0",8]
var transu6_581_tu=[]
transu6_581_tu[0]=["0_0",12,"0_1",1]
transu6_581_tu[1]=["0_0",20,"1_0",4]
var transu6_582_tu=[]
transu6_582_tu[0]=["0_0",11,"0_1",1]
transu6_582_tu[1]=["0_0",17,"1_0",5]
var transu6_583_tu=[]
transu6_583_tu[0]=["0_0",17,"0_1",2]
transu6_583_tu[1]=["0_0",20,"1_0",7]
var transu6_584_tu=[]
transu6_584_tu[0]=["0_0",13,"0_1",2]
transu6_584_tu[1]=["0_0",17,"1_0",8]
var transu6_585_tu=[]
transu6_585_tu[0]=["0_0",17,"0_1",1]
transu6_585_tu[1]=["0_0",20,"1_0",5]
var transu6_586_tu=[]
transu6_586_tu[0]=["0_0",12,"0_1",4]
transu6_586_tu[1]=["0_0",15,"1_0",6]
var transu6_587_tu=[]
transu6_587_tu[0]=["0_0",11,"0_1",2]
transu6_587_tu[1]=["0_0",18,"1_0",7]
var transu6_588_tu=[]
transu6_588_tu[0]=["0_0",10,"0_1",2]
transu6_588_tu[1]=["0_0",14,"1_0",6]
var transu6_589_tu=[]
transu6_589_tu[0]=["0_0",12,"0_1",2]
transu6_589_tu[1]=["0_0",17,"1_0",7]
var transu6_590_tu=[]
transu6_590_tu[0]=["0_0",11,"0_1",2]
transu6_590_tu[1]=["0_0",15,"1_0",5]
var transu6_591_tu=[]
transu6_591_tu[0]=["0_0",12,"0_1",4]
transu6_591_tu[1]=["0_0",17,"1_0",8]
var transu6_592_tu=[]
transu6_592_tu[0]=["0_0",13,"0_1",3]
transu6_592_tu[1]=["0_0",17,"1_0",7]
var transu6_594_tu=[]
transu6_594_tu[0]=["0_0",13,"0_1",3]
transu6_594_tu[1]=["0_0",16,"1_0",5]
var transu6_595_tu=[]
transu6_595_tu[0]=["0_0",15,"0_1",2]
transu6_595_tu[1]=["0_0",18,"1_0",7]
var transu6_596_tu=[]
transu6_596_tu[0]=["0_0",12,"0_1",1]
transu6_596_tu[1]=["0_0",17,"1_0",8]
var transu6_597_tu=[]
transu6_597_tu[0]=["0_0",7,"0_1",1]
transu6_597_tu[1]=["0_0",9,"1_0",5]
var transu6_598_tu=[]
transu6_598_tu[0]=["0_0",11,"0_1",0]
transu6_598_tu[1]=["0_0",16,"1_0",7]
var transu6_599_tu=[]
transu6_599_tu[0]=["0_0",15,"0_1",7]
transu6_599_tu[1]=["0_0",19,"1_0",9]
var transu6_600_tu=[]
transu6_600_tu[0]=["0_0",10,"0_1",2]
transu6_600_tu[1]=["0_0",12,"1_0",5]
var transu6_601_tu=[]
transu6_601_tu[0]=["0_0",14,"0_1",6]
transu6_601_tu[1]=["0_0",17,"1_0",8]
var transu6_602_tu=[]
transu6_602_tu[0]=["0_0",16,"0_1",4]
transu6_602_tu[1]=["0_0",21,"1_0",10]
var transu6_603_tu=[]
transu6_603_tu[0]=["0_0",15,"0_1",5]
transu6_603_tu[1]=["0_0",21,"1_0",10]
var transu6_604_tu=[]
transu6_604_tu[0]=["0_0",8,"0_1",2]
transu6_604_tu[1]=["0_0",11,"1_0",5]
var transu6_605_tu=[]
transu6_605_tu[0]=["0_0",13,"0_1",2]
transu6_605_tu[1]=["0_0",16,"1_0",6]
var transu6_606_tu=[]
transu6_606_tu[0]=["0_0",19,"0_1",6]
transu6_606_tu[1]=["0_0",23,"1_0",11]
var transu6_607_tu=[]
transu6_607_tu[0]=["0_0",12,"0_1",4]
transu6_607_tu[1]=["0_0",17,"1_0",8]
var transu6_608_tu=[]
transu6_608_tu[0]=["0_0",13,"0_1",3]
transu6_608_tu[1]=["0_0",17,"1_0",8]
var transu6_609_tu=[]
transu6_609_tu[0]=["0_0",20,"0_1",3]
transu6_609_tu[1]=["0_0",23,"1_0",12]
var transu6_610_tu=[]
transu6_610_tu[0]=["0_0",18,"0_1",1]
transu6_610_tu[1]=["0_0",26,"1_0",6]
var transu6_611_tu=[]
transu6_611_tu[0]=["0_0",20,"0_1",2]
transu6_611_tu[1]=["0_0",23,"1_0",7]
var transu6_612_tu=[]
transu6_612_tu[0]=["0_0",20,"0_1",4]
transu6_612_tu[1]=["0_0",26,"1_0",9]
var transu6_613_tu=[]
transu6_613_tu[0]=["0_0",20,"0_1",4]
transu6_613_tu[1]=["0_0",26,"1_0",9]
var transu6_614_tu=[]
transu6_614_tu[0]=["0_0",21,"0_1",3]
transu6_614_tu[1]=["0_0",27,"1_0",9]
var transu6_615_tu=[]
transu6_615_tu[0]=["0_0",18,"0_1",4]
transu6_615_tu[1]=["0_0",23,"1_0",12]
var transu6_630_tu=[]
transu6_630_tu[0]=["0_0",10,"0_1",0]
transu6_630_tu[1]=["0_0",12,"1_0",3]
var transu6_631_tu=[]
transu6_631_tu[0]=["0_0",13,"0_1",2]
transu6_631_tu[1]=["0_0",17,"1_0",6]
var transu6_632_tu=[]
transu6_632_tu[0]=["0_0",18,"0_1",6]
transu6_632_tu[1]=["0_0",23,"1_0",11]
var transu6_645_tu=[]
transu6_645_tu[0]=["0_0",11,"0_1",2]
transu6_645_tu[1]=["0_0",14,"1_0",5]
var transu6_649_tu=[]
transu6_649_tu[0]=["0_0",11,"0_1",3]
transu6_649_tu[1]=["0_0",15,"1_0",7]
var transu6_650_tu=[]
transu6_650_tu[0]=["0_0",11,"0_1",1]
transu6_650_tu[1]=["0_0",13,"1_0",7]
var transu6_651_tu=[]
transu6_651_tu[0]=["0_0",10,"0_1",2]
transu6_651_tu[1]=["0_0",12,"1_0",4]
var transu6_653_tu=[]
transu6_653_tu[0]=["0_0",6,"0_1",12]
transu6_653_tu[1]=["0_0",10,"1_0",3]
var transu6_654_tu=[]
transu6_654_tu[0]=["0_0",12,"0_1",3]
transu6_654_tu[1]=["0_0",0,"1_0",8]
var transu6_655_tu=[]
transu6_655_tu[0]=["0_0",9,"0_1",2]
transu6_655_tu[1]=["0_0",14,"1_0",6]
var transu6_656_tu=[]
transu6_656_tu[0]=["0_0",9,"0_1",2]
transu6_656_tu[1]=["0_0",12,"1_0",4]
var transu6_659_tu=[]
transu6_659_tu[0]=["0_0",15,"0_1",5]
transu6_659_tu[1]=["0_0",19,"1_0",9]
var transu6_660_tu=[]
transu6_660_tu[0]=["0_0",11,"0_1",2]
transu6_660_tu[1]=["0_0",14,"1_0",4]
var transu6_663_tu=[]
transu6_663_tu[0]=["0_0",15,"0_1",1]
transu6_663_tu[1]=["0_0",24,"1_0",11]
var transu6_664_tu=[]
transu6_664_tu[0]=["0_0",12,"0_1",3]
transu6_664_tu[1]=["0_0",15,"1_0",7]
var transu6_669_tu=[]
transu6_669_tu[0]=["0_0",9,"0_1",1]
transu6_669_tu[1]=["0_0",11,"1_0",4]
var transu6_670_tu=[]
transu6_670_tu[0]=["0_0",13,"0_1",2]
transu6_670_tu[1]=["0_0",18,"1_0",7]
var transu6_673_tu=[]
transu6_673_tu[0]=["0_0",9,"0_1",2]
transu6_673_tu[1]=["0_0",12,"1_0",6]
var transark3_1_tu=[]
transark3_1_tu[0]=["0_0",12,"0_1",2]
transark3_1_tu[1]=["0_0",15,"1_0",5]
var transark3_3_tu=[]
transark3_3_tu[0]=["0_0",8,"0_1",4]
transark3_3_tu[1]=["0_0",11,"1_0",6]
var transark3_4_tu=[]
transark3_4_tu[0]=["0_0",9,"0_1",3]
transark3_4_tu[1]=["0_0",12,"1_0",6]
var transark3_5_tu=[]
transark3_5_tu[0]=["0_0",16,"0_1",2]
transark3_5_tu[1]=["0_0",19,"1_0",8]
var transark3_6_tu=[]
transark3_6_tu[0]=["0_0",11,"0_1",3]
transark3_6_tu[1]=["0_0",14,"1_0",6]
var transark3_7_tu=[]
transark3_7_tu[0]=["0_0",17,"0_1",5]
transark3_7_tu[1]=["0_0",24,"1_0",12]
var transark3_8_tu=[]
transark3_8_tu[0]=["0_0",15,"0_1",3]
transark3_8_tu[1]=["0_0",20,"1_0",7]
var transark3_9_tu=[]
transark3_9_tu[0]=["0_0",6,"0_1",14]
transark3_9_tu[1]=["0_0",10,"1_0",1]
var transark3_18_tu=[]
transark3_18_tu[0]=["0_0",10,"0_1",1]
transark3_18_tu[1]=["0_0",12,"1_0",4]
var transark3_19_tu=[]
transark3_19_tu[0]=["0_0",8,"0_1",1]
transark3_19_tu[1]=["0_0",10,"1_0",5]
var transark3_20_tu=[]
transark3_20_tu[0]=["0_0",14,"0_1",4]
transark3_20_tu[1]=["0_0",16,"1_0",8]
var transark3_21_tu=[]
transark3_21_tu[0]=["0_0",6,"0_1",11]
transark3_21_tu[1]=["0_0",8,"1_0",1]
var transark3_22_tu=[]
transark3_22_tu[0]=["0_0",10,"0_1",1]
transark3_22_tu[1]=["0_0",12,"1_0",6]
var transark3_25_tu=[]
transark3_25_tu[0]=["0_0",8,"0_1",1]
transark3_25_tu[1]=["0_0",11,"1_0",4]
var transark3_26_tu=[]
transark3_26_tu[0]=["0_0",11,"0_1",1]
transark3_26_tu[1]=["0_0",16,"1_0",2]
var transark3_27_tu=[]
transark3_27_tu[0]=["0_0",17,"0_1",5]
transark3_27_tu[1]=["0_0",21,"1_0",9]
var transark3_28_tu=[]
transark3_28_tu[0]=["0_0",11,"0_1",2]
transark3_28_tu[1]=["0_0",16,"1_0",5]
var transark3_29_tu=[]
transark3_29_tu[0]=["0_0",12,"0_1",0]
transark3_29_tu[1]=["0_0",15,"1_0",3]
var transark3_32_tu=[]
transark3_32_tu[0]=["0_0",10,"0_1",2]
transark3_32_tu[1]=["0_0",13,"1_0",5]
var transark3_36_tu=[]
transark3_36_tu[0]=["0_0",13,"0_1",3]
transark3_36_tu[1]=["0_0",16,"1_0",6]
var transark3_37_tu=[]
transark3_37_tu[0]=["0_0",10,"0_1",0]
transark3_37_tu[1]=["0_0",13,"1_0",4]
var transark3_38_tu=[]
transark3_38_tu[0]=["0_0",9,"0_1",3]
transark3_38_tu[1]=["0_0",13,"1_0",5]
var transark3_39_tu=[]
transark3_39_tu[0]=["0_0",10,"0_1",1]
transark3_39_tu[1]=["0_0",13,"1_0",4]
var transark4_1_tu=[]
transark4_1_tu[0]=["0_0",11,"0_1",2]
transark4_1_tu[1]=["0_0",14,"1_0",6]
var transark4_2_tu=[]
transark4_2_tu[0]=["0_0",8,"0_1",0]
transark4_2_tu[1]=["0_0",12,"1_0",4]
var transark4_3_tu=[]
transark4_3_tu[0]=["0_0",12,"0_1",1]
transark4_3_tu[1]=["0_0",16,"1_0",5]
var transark4_4_tu=[]
transark4_4_tu[0]=["0_0",12,"0_1",2]
transark4_4_tu[1]=["0_0",16,"1_0",5]
var transark4_7_tu=[]
transark4_7_tu[0]=["0_0",9,"0_1",2]
transark4_7_tu[1]=["0_0",13,"1_0",5]
var transark4_8_tu=[]
transark4_8_tu[0]=["0_0",10,"0_1",2]
transark4_8_tu[1]=["0_0",13,"1_0",5]
var transark4_9_tu=[]
transark4_9_tu[0]=["0_0",11,"0_1",3]
transark4_9_tu[1]=["0_0",12,"1_0",6]
var transark4_10_tu=[]
transark4_10_tu[0]=["0_0",19,"0_1",3]
transark4_10_tu[1]=["0_0",23,"1_0",10]
var transark4_11_tu=[]
transark4_11_tu[0]=["0_0",15,"0_1",2]
transark4_11_tu[1]=["0_0",19,"1_0",6]
var transark4_12_tu=[]
transark4_12_tu[0]=["0_0",12,"0_1",2]
transark4_12_tu[1]=["0_0",15,"1_0",6]
var transark4_13_tu=[]
transark4_13_tu[0]=["0_0",16,"0_1",2]
transark4_13_tu[1]=["0_0",20,"1_0",7]
var transark4_14_tu=[]
transark4_14_tu[0]=["0_0",20,"0_1",2]
transark4_14_tu[1]=["0_0",27,"1_0",9]
var transark4_15_tu=[]
transark4_15_tu[0]=["0_0",11,"0_1",1]
transark4_15_tu[1]=["0_0",14,"1_0",6]
var transark4_16_tu=[]
transark4_16_tu[0]=["0_0",11,"0_1",1]
transark4_16_tu[1]=["0_0",13,"1_0",4]
var transark4_21_tu=[]
transark4_21_tu[0]=["0_0",12,"0_1",3]
transark4_21_tu[1]=["0_0",17,"1_0",7]
var transark4_22_tu=[]
transark4_22_tu[0]=["0_0",10,"0_1",2]
transark4_22_tu[1]=["0_0",14,"1_0",6]
var transark4_23_tu=[]
transark4_23_tu[0]=["0_0",11,"0_1",1]
transark4_23_tu[1]=["0_0",18,"1_0",6]
var transark4_24_tu=[]
transark4_24_tu[0]=["0_0",9,"0_1",2]
transark4_24_tu[1]=["0_0",11,"1_0",4]
var transark4_31_tu=[]
transark4_31_tu[0]=["0_0",15,"0_1",2]
transark4_31_tu[1]=["0_0",18,"1_0",7]
var transark4_33_tu=[]
transark4_33_tu[0]=["0_0",22,"0_1",7]
transark4_33_tu[1]=["0_0",29,"1_0",13]
var transark5_1_tu=[]
transark5_1_tu[0]=["0_0",10,"0_1",1]
transark5_1_tu[1]=["0_0",12,"1_0",4]
var transark5_2_tu=[]
transark5_2_tu[0]=["0_0",11,"0_1",1]
transark5_2_tu[1]=["0_0",14,"1_0",4]
var transark5_3_tu=[]
transark5_3_tu[0]=["0_0",14,"0_1",0]
transark5_3_tu[1]=["0_0",19,"1_0",4]
var transark5_4_tu=[]
transark5_4_tu[0]=["0_0",12,"0_1",2]
transark5_4_tu[1]=["0_0",15,"1_0",6]
var transark5_11_tu=[]
transark5_11_tu[0]=["0_0",17,"0_1",5]
transark5_11_tu[1]=["0_0",21,"1_0",9]
var transark5_13_tu=[]
transark5_13_tu[0]=["0_0",15,"0_1",2]
transark5_13_tu[1]=["0_0",19,"1_0",6]
var transark5_14_tu=[]
transark5_14_tu[0]=["0_0",12,"0_1",1]
transark5_14_tu[1]=["0_0",16,"1_0",5]
var transark5_15_tu=[]
transark5_15_tu[0]=["0_0",11,"0_1",3]
transark5_15_tu[1]=["0_0",14,"1_0",7]
var transark6_1_tu=[]
transark6_1_tu[0]=["0_0",14,"0_1",1]
transark6_1_tu[1]=["0_0",19,"1_0",5]
var transark6_2_tu=[]
transark6_2_tu[0]=["0_0",23,"0_1",2]
transark6_2_tu[1]=["0_0",28,"1_0",9]
var transark6_4_tu=[]
transark6_4_tu[0]=["0_0",19,"0_1",3]
transark6_4_tu[1]=["0_0",24,"1_0",9]
var transark6_6_tu=[]
transark6_6_tu[0]=["0_0",10,"0_1",2]
transark6_6_tu[1]=["0_0",14,"1_0",6]
var transark6_7_tu=[]
transark6_7_tu[0]=["0_0",11,"0_1",2]
transark6_7_tu[1]=["0_0",14,"1_0",5]
var transark6_8_tu=[]
transark6_8_tu[0]=["0_0",20,"0_1",4]
transark6_8_tu[1]=["0_0",26,"1_0",9]
var transark6_9_tu=[]
transark6_9_tu[0]=["0_0",21,"0_1",4]
transark6_9_tu[1]=["0_0",27,"1_0",12]
var transark6_10_tu=[]
transark6_10_tu[0]=["0_0",12,"0_1",1]
transark6_10_tu[1]=["0_0",16,"1_0",5]
var transark7_1_tu=[]
transark7_1_tu[0]=["0_0",10,"0_1",1]
transark7_1_tu[1]=["0_0",12,"1_0",5]
var transark7_2_tu=[]
transark7_2_tu[0]=["0_0",18,"0_1",3]
transark7_2_tu[1]=["0_0",23,"1_0",10]
var transark7_3_tu=[]
transark7_3_tu[0]=["0_0",17,"0_1",2]
transark7_3_tu[1]=["0_0",20,"1_0",8]
var transark7_4_tu=[]
transark7_4_tu[0]=["0_0",14,"0_1",2]
transark7_4_tu[1]=["0_0",18,"1_0",8]
var transark7_5_tu=[]
transark7_5_tu[0]=["0_0",15,"0_1",2]
transark7_5_tu[1]=["0_0",19,"1_0",6]
var transark7_6_tu=[]
transark7_6_tu[0]=["0_0",26,"0_1",8]
transark7_6_tu[1]=["0_0",31,"1_0",15]
var transark7_7_tu=[]
transark7_7_tu[0]=["0_0",10,"0_1",1]
transark7_7_tu[1]=["0_0",13,"1_0",4]

