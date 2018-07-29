function disableAllButtons()
{
  selectDrawElemDiv.style.visibility="hidden"
    openAddSchematicButton.disabled=true
    openAddCircleButton.disabled=true
    openAddArcButton.disabled=true
    openAddIconButton.disabled=true

    openAddEllipseButton.disabled=true
    openAddRectButton.disabled=true
    openAddBGimageButton.disabled=true
    openAddTextButton.disabled=true
    openAddPathButton.disabled=true
    openAddPgonButton.disabled=true
    openAddPolygonButton.disabled=true
    openAddArcButton.disabled=true

    openAddTextureButton.disabled=true
    openAddGradientButton.disabled=true
    getSchematicLibraryButton.disabled=true

}
function enableAllButtons()
{

  selectDrawElemDiv.style.visibility="visible"

    openAddSchematicButton.disabled=false
    openAddCircleButton.disabled=false
    openAddArcButton.disabled=false
    openAddIconButton.disabled=false

    openAddEllipseButton.disabled=false
    openAddRectButton.disabled=false
    openAddBGimageButton.disabled=false
    openAddTextButton.disabled=false
    openAddPathButton.disabled=false
    openAddPgonButton.disabled=false
    openAddPolygonButton.disabled=false
    openAddArcButton.disabled=false

    openAddTextureButton.disabled=false
    openAddGradientButton.disabled=false
       getSchematicLibraryButton.disabled=false


    openAddSchematicButton.style.borderColor=""
    openAddCircleButton.style.borderColor=""
    openAddArcButton.style.borderColor=""
    openAddIconButton.style.borderColor=""

    openAddEllipseButton.style.borderColor=""
    openAddRectButton.style.borderColor=""
    openAddBGimageButton.style.borderColor=""



    openAddTextButton.style.borderColor="" 
    openAddPathButton.style.borderColor="" 
    openAddPgonButton.style.borderColor="" 
    openAddPolygonButton.style.borderColor=""
    openAddArcButton.style.borderColor=""

    openAddTextureButton.style.borderColor=""
    openAddGradientButton.style.borderColor=""
       getSchematicLibraryButton.style.borderColor=""

    if(svgSaveDiv.style.display!="none")
        showSaveSVG()


}


function openAddPgonDraw()
{
    if(addElemPgonLoad==true)
        startPgonDraw()

        openIframe("AddElem", "addElemPgon", 0)
        mySVG.setAttribute("onclick", "plantPgonSymbol(event)")

        openAddPgonButton.style.borderStyle = "inset"
}

function openAddArcDraw()
{
    if(addElemArcLoad==true)
        startArcDraw()

        openIframe("AddElem", "addElemArc", 0)
        mySVG.setAttribute("onclick", "placeDrawArc(event)")

        openAddArcButton.style.borderStyle = "inset"
}





function openAddSchematicDraw()
{
    if(addElemSchematicLoad==true)
    {
         startSchematicDraw()
          addElemSchematicCw.sendSchematicMessageSpan.innerHTML=""
          addElemSchematicCw.schematicCategorySelect.selectedIndex=0
          addElemSchematicCw.mySchematicTitleValue.value=""

          addElemSchematicCw.saveToLibraryDiv.style.opacity=.5
    }


        openIframe("AddElem", "addElemSchematic", 0)
       // mySVG.setAttribute("onclick", "plantSchematic(event)")

        openAddSchematicButton.style.borderStyle = "inset"
}



function openAddIconDraw()
{
    if(addElemIconLoad==true)
        startIconDraw()

        openIframe("AddElem", "addElemIcon", 0)
        mySVG.setAttribute("onclick", "plantIcon(event)")

        openAddIconButton.style.borderStyle = "inset"

}


function openAddTexture()
{
    if(addElemTextureLoad==true)
        startTextureDraw()

        openIframe("AddElem", "addElemTexture", 0)
       // mySVG.setAttribute("onclick", "plantPgonSymbol(event)")

        openAddTextureButton.style.borderStyle = "inset"
}


function openAddBGimage()
{
   if(addElemBGimageLoad==true)
       startBGimageDraw()
    if(document.getElementById(DrawBGimageEditId))
    {   var cw = addElemBGimageCw
        cw.editTemplateCheckDiv.style.visibility="visible"


    }

        openIframe("AddElem", "addElemBGimage", 0)
       // mySVG.setAttribute("onclick", "plantPgonSymbol(event)")

        openAddBGimageButton.style.borderStyle = "inset"
}

function openAddGradient()
{
    if(addElemGradientLoad==true)
        startGradientDraw()

        openIframe("AddElem", "addElemGradient", 0)
       // mySVG.setAttribute("onclick", "plantPgonSymbol(event)")

        openAddGradientButton.style.borderStyle = "inset"
}






function openAddCircleDraw()
{
    if(addElemCircleLoad==true)
        startCircleDraw()

        openIframe("AddElem", "addElemCircle", 0)

        openAddCircleButton.style.borderStyle = "inset"
}


function openAddEllipseDraw()
{
    if(addElemEllipseLoad==true)
        startEllipseDraw()

        openIframe("AddElem", "addElemEllipse", 0)

        openAddEllipseButton.style.borderStyle = "inset"
}

function openAddPolygonDraw()
{
    if(addElemPolygonLoad==true)
        startPolygonDraw()

        openIframe("AddElem", "addElemPolygon", 0)

        openAddPolygonButton.style.borderStyle = "inset"
}


function openAddRectDraw()
{
    if(addElemRectLoad==true)
        startRectDraw()

        openIframe("AddElem", "addElemRect", 0)

        openAddRectButton.style.borderStyle = "inset"
}

function openAddTextDraw()
{
    if(addElemTextLoad==true)
        startTextDraw()
        openIframe("AddElem", "addElemText", 0)

        openAddTextButton.style.borderStyle = "inset"

}
function openAddPathDraw()
{

    if(addElemPathLoad==false)
        openIframe("AddElem", "addElemPath", 0)
        else
        {
            openIframe("AddElem", "addElemPath", 0)
            startPathDraw()
        }

        openAddPathButton.style.borderStyle = "inset"

}

var AddElemOpen = false //--true if any addElem Frame is viz=true
function isAddElemOpen() //---called from iframeSelection.js---
{
    AddElemOpen = false

    if(editElemSchematicViz==true)AddElemOpen = true;
    if(addElemTessellateViz==true)AddElemOpen = true;
    if(editElemIsaViz==true)AddElemOpen = true;
    if(addElemSchematicViz==true)AddElemOpen = true;
    if(addElemTextViz==true)AddElemOpen = true;
    if(addElemCircleViz==true)AddElemOpen = true;
    if(addElemIconViz==true)AddElemOpen = true;

    if(addElemEllipseViz==true)AddElemOpen = true;
    if(addElemRectViz==true)AddElemOpen = true;
    if(addElemTextViz==true)AddElemOpen = true;
    if(addElemPgonViz==true)AddElemOpen = true;
    if(addElemTextureViz==true)AddElemOpen = true;
    if(addElemGradientViz==true)AddElemOpen = true;
    if(addElemPolygonViz==true)AddElemOpen = true;
    if(addElemArcViz==true)AddElemOpen = true;

}

function openIframe(Dir, name, left)
{
    if(ZoomDrawing==false)
    {
            closeAllFrames()
            disableAllButtons()

            var top = 50

            var fName = eval(name+"Load")
            var myFrame = document.getElementById(name+'Frame')
            var myDiv = d3.select("#"+name+"FrameDiv")

            if(fName==false)
            {
                eval(name+"Load=true")
                myFrame.src = Dir+"/"+name+".htm";
                eval(name+"Cw=document.getElementById(name+'Frame').contentWindow")
            }
            else
            {

                var height = myFrame.scrollHeight

            }
            myFrame.style.overflow = "hidden"

            myDiv.transition().duration(800).style("height", height+"px")

            eval(name+"Viz=true")

            myDiv.style("visibility", "visible")
            myDiv.style("left", left+"px")
            myDiv.style("top", top+"px")

            if(name=="addElemRect")
                startRectDraw()
                if(name=="addElemCircle")
                startCircleDraw()

                if(name=="addElemText")
                startTextDraw()
    }
}

//---fired from iframe onload----
function sizeFrame(name, width, height)
{
    var myFrame = document.getElementById(name+'Frame')
    var myDiv = d3.select("#"+name+"FrameDiv")

    myFrame.style.width = width+"px"
    myFrame.style.height = height+"px"

    myDiv.style("width", width+"px")
    myDiv.transition().duration(800).style("height", height+"px")

}
//---X button in iframe---
function closeIframe(name)
{

    mySVG.removeAttribute("onclick")



    openAddSchematicButton.style.borderStyle = ""
    openAddCircleButton.style.borderStyle = ""
    openAddIconButton.style.borderStyle = ""

    openAddEllipseButton.style.borderStyle = ""
    openAddRectButton.style.borderStyle = ""
    openAddBGimageButton.style.borderStyle = ""
    openAddTextButton.style.borderStyle = ""
    openAddPathButton.style.borderStyle = ""
    openAddPgonButton.style.borderStyle = ""
    openAddPolygonButton.style.borderStyle = ""
    openAddArcButton.style.borderStyle = ""

    openAddTextureButton.style.borderStyle = ""
    openAddGradientButton.style.borderStyle = ""
    getSchematicLibraryButton.style.borderStyle = ""

    enableAllButtons()
    var myDiv = d3.select("#"+name+"FrameDiv")
    myDiv.transition().style("height", 1+"px")
    .on("end", function()
        {
            myDiv.style("visibility", "hidden")
        }
    )
    eval(name+"Viz=false")

}

//---Only one frame visable: fired when another  frame is chosen
function closeAllFrames()
{


    closeHelp()
     introDiv.style.visibility="hidden"  


   closeTessellateHelp()
   closeSchematicTable()
   closeSchematicHelp()


    if(svgSaveDiv.style.display=="block")
        showSaveSVG()


         openAddCircleButton.style.borderStyle = ""
         openAddSchematicButton.style.borderStyle = ""
         openAddIconButton.style.borderStyle = ""


   openAddEllipseButton.style.borderStyle = ""
    openAddRectButton.style.borderStyle = ""
    openAddBGimageButton.style.borderStyle = ""
    openAddTextButton.style.borderStyle = ""
    openAddPathButton.style.borderStyle = ""
    openAddPgonButton.style.borderStyle = ""
    openAddPolygonButton.style.borderStyle = ""
    openAddArcButton.style.borderStyle = ""

    openAddTextureButton.style.borderStyle = ""
    openAddGradientButton.style.borderStyle = ""
    getSchematicLibraryButton.style.borderStyle = ""


    for(var k = 0; k<iframeNameArray.length; k++)
    {
        var name = iframeNameArray[k]
        var viz = eval(name+"Viz")
        if(viz==true)
        {

            if(name=="editElemSchematic")closeEditSchematic()

            else if(name=="addElemText")closeDrawText()
            else if(name=="addElemCircle")closeDrawCircle()
            else if(name=="addElemTexture")closeDrawTexture()

            //---added---
            else if(name=="addElemSchematic")closeDrawSchematic()
            else if(name=="addElemTessellate")closeDrawTessellate()


            else if(name=="addElemEllipse")closeDrawEllipse()
            else if(name=="addElemRect")closeDrawRect()
            else if(name=="addElemPath")closeDrawPath()
            else if(name=="addElemPgon")closeDrawPgon()
            else if(name=="addElemPolygon")closeDrawPolygon()
            else if(name=="addElemArc")closeDrawArc()


            var myDiv = d3.select("#"+name+"FrameDiv")
            myDiv.style("height", 1+"px")
            myDiv.style("visibility", "hidden")
            myDiv.style("overflow", "hidden")


        }
        eval(name+"Viz=false")
    }

}

var addElemSchematicLoad = false
var addElemTessellateLoad = false
var editElemSchematicLoad = false




var addElemCircleLoad = false
var addElemArcLoad = false
var addElemIconLoad = false
var addElemPgonLoad = false
var addElemPolygonLoad = false
var addElemTextureLoad = false
var addElemGradientLoad = false
var addElemPgonEditLoad = false
var addElemEllipseLoad = false
var addElemRectLoad = false
var addElemBGimageLoad = false
var addElemTextLoad = false
var addElemPathLoad = false
var addElemPathEditLoad = false

var addElemCircleViz = false
var addElemArcViz = false

var addElemSchematicViz = false
var addElemTessellateViz = false
var editElemSchematicViz = false


var addElemIconViz = false
var addElemPgonViz = false
var addElemPolygonViz = false
var addElemTextureViz = false
var addElemGradientViz = false
var addElemPgonEditViz = false
var addElemEllipseViz = false
var addElemRectViz = false
var addElemBGimageViz = false
var addElemTextViz = false
var addElemPathViz = false
var addElemPathEditViz = false

var addElemCircleCw
var addElemArcCw
var addElemSchematicCw
var addElemTessellateCw
var editElemSchematicCw
var addElemIconCw

var addElemPgonCw
var addElemPolygonCw
var addElemTextureCw
var addElemGradientCw


var addElemPgonEditCw
var addElemEllipseCw
var addElemRectCw
var addElemBGimageCw
var addElemTextCw
var addElemPathCw
var addElemPathEditCw

//---each iframe---

var iframeNameArray =[]

iframeNameArray[0] = 'addElemText'

iframeNameArray[1] = 'addElemPath'
iframeNameArray[2] = 'addElemPathEdit'

iframeNameArray[3] = 'addElemCircle'
iframeNameArray[4] = 'addElemEllipse'
iframeNameArray[5] = 'addElemRect'
iframeNameArray[6] = 'addElemPgon'
iframeNameArray[7] = 'addElemPgonEdit'

iframeNameArray[8] = 'addElemTexture'
iframeNameArray[9] = 'addElemIcon'
iframeNameArray[10] = 'addElemGradient'
iframeNameArray[11] = 'addElemPolygon'

iframeNameArray[12] = 'addElemSchematic'
iframeNameArray[13] = 'editElemSchematic'
iframeNameArray[14] = 'addElemBGimage'
iframeNameArray[15] = 'addElemArc'
iframeNameArray[16] = 'addElemTessellate'


