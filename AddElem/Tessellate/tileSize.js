var Sizing=false
function sizeAdjust(factor)
{

    var cw=addElemTessellateCw
    var mult=parseFloat(cw.sizeAdjustSelect.options[cw.sizeAdjustSelect.selectedIndex].text)
    var sizeAdd=parseFloat(factor)*mult+1

    var pgons=cw.document.getElementById("mainPolyG").childNodes

    var bb=cw.document.getElementById("mainPolyG").getBBox()
    var bbx=bb.x
    var bby=bb.y
    var bbw=bb.width
    var bbh=bb.height
    var cx=bbx+.5*bbw
    var cy=bby+.5*bbh
    for(var k=0;k<pgons.length;k++)
    {
        var pgon=pgons.item(k)

        pgon.setAttribute("transform","translate("+cx+" "+cy+")scale("+sizeAdd+")translate("+(-cx)+" "+(-cy)+")")
        ctmPolygon(pgon)
    }


    SaveBorderPoly=cw.document.getElementById("BorderPoly").cloneNode(true)


    CloneTile=cw.document.getElementById("mainPolyG").cloneNode(true)
    for(var k=0;k<CloneTile.childNodes.length;k++)
    CloneTile.childNodes.item(k).removeAttribute("onclick")
    Sizing=true

    if(ActiveElem)
        tessellate()
}

function resizeChangeTU(scale)
{
      console.log(scale)
         var cw=addElemTessellateCw

      var pgons=cw.changeSVG.getElementById("mainPolyG").childNodes

    var bb=cw.changeSVG.getElementById("mainPolyG").getBBox()
    var bbx=bb.x
    var bby=bb.y
    var bbw=bb.width
    var bbh=bb.height
    var cx=bbx+.5*bbw
    var cy=bby+.5*bbh
    for(var k=0;k<pgons.length;k++)
    {
        var pgon=pgons.item(k)

        pgon.setAttribute("transform","translate("+cx+" "+cy+")scale("+scale+")translate("+(-cx)+" "+(-cy)+")")
        ctmPolygon(pgon)
    }


}

