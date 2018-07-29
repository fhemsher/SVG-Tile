function openHelp()
{

    var height=helpDiv.scrollHeight
    d3.select("#helpDiv").transition().duration(800).style("height", height+"px")
    helpDiv.style.visibility="visible"

   introDiv.style.visibility="hidden"
   schematicHelpLibraryDiv.style.visibility="hidden"
   schematicHelpLibraryDiv.style.height="1px"
    schematicTableCloseButton.style.visibility="hidden"
   tessellateHelpDiv.style.height="1px"
   tessellateHelpDiv.style.visibility="hidden"
}
function closeHelp()
{
    var height=1
    d3.select("#helpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('helpDiv.style.visibility="hidden"',900)

    introDiv.style.visibility="hidden"
}





function openSchematicHelp()
{       introDiv.style.visibility="hidden"
                schematicHelpLibraryDiv.style.top = "60px"


    var height=schematicHelpLibraryDiv.scrollHeight
    d3.select("#schematicHelpLibraryDiv").transition().duration(800).style("height", height+"px")
    schematicHelpLibraryDiv.style.visibility="visible"

   helpDiv.style.visibility="hidden"
   helpDiv.style.height="1px"
       tessellateHelpDiv.style.height="1px"
   tessellateHelpDiv.style.visibility="hidden"



}
function closeSchematicHelp()
{
    var height=1
    d3.select("#schematicHelpLibraryDiv").transition().duration(800).style("height", height+"px")
    setTimeout('schematicHelpLibraryDiv.style.visibility="hidden"',900)
}





function openTessellateHelp()
{       introDiv.style.visibility="hidden"
               tessellateHelpDiv.style.top = "60px"


    var height=tessellateHelpDiv.scrollHeight
    d3.select("#tessellateHelpDiv").transition().duration(800).style("height", height+"px")
    tessellateHelpDiv.style.visibility="visible"

   helpDiv.style.visibility="hidden"
   helpDiv.style.height="1px"

    

    schematicHelpLibraryDiv.style.visibility="hidden"
    schematicHelpLibraryDiv.style.height="1px"
     schematicHelpLibraryDiv.style.visibility="hidden"
      schematicTableCloseButton.style.visibility="hidden"
}
function closeTessellateHelp()
{
    var height=1
    d3.select("#tessellateHelpDiv").transition().duration(800).style("height", height+"px")
    setTimeout('tessellateHelpDiv.style.visibility="hidden"',900)
}



function openZoomHelp()
{      introDiv.style.visibility="hidden"
	var height=zoomHelpDiv.scrollHeight
	d3.select("#zoomHelpDiv").transition().duration(500).style("height", height+"px")
	zoomHelpDiv.style.visibility="visible"
}
function closeZoomHelp()
{
	var height=1
	d3.select("#zoomHelpDiv").transition().duration(500).style("height", height+"px")
	setTimeout('zoomHelpDiv.style.visibility="hidden"',600)
}

