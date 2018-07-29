
var RowColumn=false
function rowAdjust(factor)
{              var cw=addElemTessellateCw
    var mult=parseFloat(cw.rowAdjustSelect.options[cw.rowAdjustSelect.selectedIndex].text)
    var rowAdd=parseFloat(factor)*mult
    if(VtTileCnt+rowAdd >0)
    {
    VtTileCnt=VtTileCnt+rowAdd

    RowColumn=true
    if(ActiveElem)
    tessellate()
      if(EditTessellate==false)       
     cw.trimBoxButton.disabled=false
   }
}
function columnAdjust(factor)
{        var cw=addElemTessellateCw
    var mult=parseFloat(cw.columnAdjustSelect.options[cw.columnAdjustSelect.selectedIndex].text)
    var columnAdd=parseFloat(factor)*mult

    if(HzTileCnt+columnAdd>0)
    {

    HzTileCnt=HzTileCnt+columnAdd
    RowColumn=true
    if(ActiveElem)
    tessellate()
    if(EditTessellate==false)
      cw.trimBoxButton.disabled=false


    }
}
