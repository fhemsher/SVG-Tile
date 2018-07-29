
var TransformRequestTessellateObj
var TransListTessellate
var DragTargetTessellate=null;
var Dragging = false;
var OffsetX = 0;
var OffsetY = 0;
//---mouse down over element---
function startDragTessellate(evt)
{
    if(!Dragging) //---prevents dragging conflicts on other draggable elements---
    {
        if(evt.target.parentNode.parentNode.parentNode.getAttribute("class")=="dragTargetObj")
        {

                DragTargetTessellate=domActiveElemG


            //---reference point to its respective viewport--
            var pnt = DragTargetTessellate.ownerSVGElement.createSVGPoint();
            pnt.x = evt.clientX;
            pnt.y = evt.clientY;
            //---elements transformed and/or in different(svg) viewports---
            var sCTM = DragTargetTessellate.getScreenCTM();
            var Pnt = pnt.matrixTransform(sCTM.inverse());

            TransformRequestTessellateObj = DragTargetTessellate.ownerSVGElement.createSVGTransform()
            //---attach new or existing transform to element, init its transform list---
            var myTransListTessellateAnim=DragTargetTessellate.transform
            TransListTessellate=myTransListTessellateAnim.baseVal

            OffsetX = Pnt.x
            OffsetY = Pnt.y

            Dragging=true;
        }
    }
}
//---mouse move---
function dragTessellate(evt)
{
    if(Dragging)
    {
        var pnt = DragTargetTessellate.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = DragTargetTessellate.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());
        Pnt.x -= OffsetX;
        Pnt.y -= OffsetY;

        TransformRequestTessellateObj.setTranslate(Pnt.x,Pnt.y)
        TransListTessellate.appendItem(TransformRequestTessellateObj)
        TransListTessellate.consolidate()

           //DrawX.attr("transform", "translate("+SVGx+" "+SVGy+")")


    }
}
//--mouse up---
function endDragTessellate()
{
    Dragging = false ;


}
