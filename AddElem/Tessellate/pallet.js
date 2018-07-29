









var PalletColor
var Coloring=false
var cellCnt=0
function colorSelected()
{
    var cw=addElemTessellateCw
   var name=cw.colorSelect.options[cw.colorSelect.selectedIndex].text

   PalletColor=cw.colorSelect.options[cw.colorSelect.selectedIndex].value
   var row=cw.colorPalletTable.rows[0]
   var  ccell=row.insertCell(cellCnt++)
   ccell.style.background=PalletColor
   ccell.innerHTML="<input type=radio name=radioColor checked onClick=parent.palletColorClicked('"+PalletColor+"') />"

   cw.clearPalletColorButton.disabled=false
}
function  palletColorClicked(clr)
{
   PalletColor=clr
}

var PalletSeed
function changeColor(evt)
{     var cw=addElemTessellateCw
      if(PalletColor)
      {
            var target=evt.target
            Coloring=true

            PalletSeed=target.getAttribute("seed")
            target.setAttribute("fill",PalletColor)
             CloneTile=cw.document.getElementById("changeSVG").lastChild

          for(var k=0;k<CloneTile.childNodes.length;k++)
               {
                     CloneTile.childNodes.item(k).removeAttribute("onclick")
                    var seed=CloneTile.childNodes.item(k).getAttribute("seed")


                    if(seed==PalletSeed)
                      CloneTile.childNodes.item(k).setAttribute("fill",PalletColor)

               }


            if(ActiveElem)
            {


                        tessellate()
            }

      }

 }

function clearPalletColorButtonClicked()
{    var cw=addElemTessellateCw
    for(var k=cw.colorPalletTable.rows[0].cells.length-1;k>=0;k--)
       cw.colorPalletTable.rows[0].deleteCell(k)
     cw.colorSelect.selectedIndex=0
    cw.clearPalletColorButton.disabled=true
    PalletColor=null
    Coloring=false
     cellCnt=0
}

function borderColorSelected()
{
    var cw=addElemTessellateCw
   var clr=cw.borderColorSelect.options[cw.borderColorSelect.selectedIndex].value
    cw.borderColorSpan.style.background=clr
    var changeBorder= cw.changeSVG.getElementById("BorderPoly")
    changeBorder.setAttribute("stroke",clr)
    var tuBorder= cw.tileUnitSVG.getElementById("BorderPoly")
        tuBorder.setAttribute("stroke",clr)
              if(ActiveElem)
            {
               tessellate()
            }
}
//---white option color---
var clrWhite=[
'#000000',
'#003153',
'#00008B',
'#00416A',
'#4B0082',
'#32127A',
'#000080',
'#082567',
'#191970',
'#08457E',
'#0F4D92',
'#120A8F',
'#003399',
'#333399',
'#002FA7',
'#1034A6',
'#00009C',
'#0047AB',
'#2A52BE',
'#1C39BB',
'#0000CD',
'#1560BD',
'#4169E1',
'#6050DC',
'#5218FA',
'#5218FA',
'#0247FE',
'#0000FF',
'#007FFF',
'#0070FF',
'#5B92E5',
'#013220',
'#4D5D53',
'#004953',
'#4B5320',
'#465945',
'#004225',
'#21421E',
'#355E3B',
'#006633',
'#92000A',
'#800020',
'#801818',
'#960018',
'#702963',
'#66023C',
'#8B008B',
'#7F007F',
'#6600FF',
'#321414',
'#79443B',
'#6D351A',
'#592720',
'#614051',
'#3D2B1F',
'#560319',
'#7B3F00',
'#654321',
'#734A12',
'#704214',
'#674C47',
'#800000',
'#80461B',
'#893F45',
'#8A3324',
'#B7410E',
'#918151',
'#738678',
'#534B4F',
'#50404D',
'#3B444B',
'#483C32',
'#696969',
'#2F4F4F',
'#555555',
'#464646',
'#40404F'

]


var clrArray=[]
clrArray[0]=['none','none']
clrArray[1]=['Black','#000000']
clrArray[2]=['White','#FFFFFF']
clrArray[3]=['Prussian blue','#003153']
clrArray[4]=['Dark blue','#00008B']
clrArray[5]=['Indigo (dye)','#00416A']
clrArray[6]=['Indigo (web)','#4B0082']
clrArray[7]=['Persian indigo','#32127A']
clrArray[8]=['Navy Blue','#000080']
clrArray[9]=['Sapphire','#082567']
clrArray[10]=['Midnight blue','#191970']
clrArray[11]=['Dark cerulean','#08457E']
clrArray[12]=['Yale Blue','#0F4D92']
clrArray[13]=['Ultramarine','#120A8F']
clrArray[14]=['Smalt (Dark powder blue)','#003399']
clrArray[15]=['Blue (pigment)','#333399']
clrArray[16]=['International Klein Blue','#002FA7']
clrArray[17]=['Egyptian blue','#1034A6']
clrArray[18]=['Duke blue','#00009C']
clrArray[19]=['Cobalt','#0047AB']
clrArray[20]=['Cerulean blue','#2A52BE']
clrArray[21]=['Persian blue','#1C39BB']
clrArray[22]=['Medium blue','#0000CD']
clrArray[23]=['Denim','#1560BD']
clrArray[24]=['Royal Blue','#4169E1']
clrArray[25]=['Majorelle Blue','#6050DC']
clrArray[26]=['Han Purple','#5218FA']
clrArray[27]=['Han Blue','#5218FA']
clrArray[28]=['Blue (RYB)','#0247FE']
clrArray[29]=['Blue','#0000FF']
clrArray[30]=['Azure','#007FFF']
clrArray[31]=['Brandeis Blue','#0070FF']
clrArray[32]=['United Nations blue','#5B92E5']
clrArray[33]=['Cornflower blue','#6495ED']
clrArray[34]=['Dodger blue','#1E90FF']
clrArray[35]=['Bondi blue','#0095B6']
clrArray[36]=['Airforce blue','#5D8AA8']
clrArray[37]=['Cerulean','#007BA7']
clrArray[38]=['Steel blue','#4682B4']
clrArray[39]=['Maya blue','#73C2FB']
clrArray[40]=['Electric blue','#7DF9FF']
clrArray[41]=['Robin egg blue','#00CCCC']
clrArray[42]=['Carolina blue','#99BADD']
clrArray[43]=['Periwinkle','#CCCCFF']
clrArray[44]=['Lavender blue','#CCCCFF']
clrArray[45]=['Pale cornflower blue','#ABCDEF']
clrArray[46]=['Light blue','#ADD8E6']
clrArray[47]=['Pale blue','#AFEEEE']
clrArray[48]=['Sky Blue','#87CEEB']
clrArray[49]=['Columbia blue','#9BDDFF']
clrArray[50]=['Powder blue','#B0E0E6']
clrArray[51]=['Alice blue','#F0F8FF']
clrArray[52]=['Baby blue','#E0FFFF']
clrArray[53]=['Azure (web)','#F0FFFF']
clrArray[54]=['Lavender (web)','#E6E6FA']
clrArray[55]=['Dark green','#013220']
clrArray[56]=['Feldgrau','#4D5D53']
clrArray[57]=['Midnight green (eagle green)','#004953']
clrArray[58]=['Army green','#4B5320']
clrArray[59]=['Gray-asparagus','#465945']
clrArray[60]=['British racing green','#004225']
clrArray[61]=['Myrtle','#21421E']
clrArray[62]=['Forest green','#228B22']
clrArray[63]=['Green (HTML/CSS green)','#008000']
clrArray[64]=['India green','#138808']
clrArray[65]=['Islamic green','#009000']
clrArray[66]=['Office green','#008000']
clrArray[67]=['Olive Drab','#6B8E23']
clrArray[68]=['Dark spring green','#177245']
clrArray[69]=['Fern green','#4F7942']
clrArray[70]=['Hunter green','#355E3B']
clrArray[71]=['MSU Green','#006633']
clrArray[72]=['Viridian','#40826D']
clrArray[73]=['Pine Green','#01796F']
clrArray[74]=['Sea Green','#2E8B57']
clrArray[75]=['Shamrock green','#009E60']
clrArray[76]=['Green (pigment)','#00A550']
clrArray[77]=['Jungle green','#29AB87']
clrArray[78]=['Green (RYB)','#66B032']
clrArray[79]=['Jade','#00A86B']
clrArray[80]=['Kelly green','#4CBB17']
clrArray[81]=['Lime green','#32CD32']
clrArray[82]=['Malachite','#0BDA51']
clrArray[83]=['Emerald','#50C878']
clrArray[84]=['Dark pastel green','#03C03C']
clrArray[85]=['Yellow-green','#9ACD32']
clrArray[86]=['Moss green','#ADDFAD']
clrArray[87]=['Celadon','#ACE1AF']
clrArray[88]=['Tea Green','#D0F0C0']
clrArray[89]=['Magic mint','#AAF0D1']
clrArray[90]=['Spring bud','#A7FC00']
clrArray[91]=['Lime (color wheel)','#BFFF00']
clrArray[92]=['Chartreuse','#DFFF00']
clrArray[93]=['Pear','#D1E231']
clrArray[94]=['Electric lime','#CCFF00']
clrArray[95]=['Green-yellow','#ADFF2F']
clrArray[96]=['Green (color wheel)','#00FF00']
clrArray[97]=['Harlequin','#3FFF00']
clrArray[98]=['Bright green','#66FF00']
clrArray[99]=['Chartreuse (web)','#7FFF00']
clrArray[100]=['Electric green','#00FF00']
clrArray[101]=['Lawn green','#7CFC00']
clrArray[102]=['Spring green','#00FF7F']
clrArray[103]=['Mint green','#98FF98']
clrArray[104]=['Lime (web)','#00FF00']
clrArray[105]=['Medium spring green','#00FA9A']
clrArray[106]=['Pastel green','#77DD77']
clrArray[107]=['Persian green','#00A693']
clrArray[108]=['Asparagus','#7BA05B']
clrArray[109]=['Camouflage green','#78866B']
clrArray[110]=['Olivine','#9AB973']
clrArray[111]=['Dark khaki','#BDB76B']
clrArray[112]=['Brass','#B5A642']
clrArray[113]=['Olive','#808000']
clrArray[114]=['Sangria','#92000A']
clrArray[115]=['Burgundy','#800020']
clrArray[116]=['Falu red','#801818']
clrArray[117]=['Carmine','#960018']
clrArray[118]=['Carnelian','#B31B1B']
clrArray[119]=['Firebrick','#B22222']
clrArray[120]=['Upsdell red','#AE2029']
clrArray[121]=['Cardinal','#C41E3A']
clrArray[122]=['Venetian red','#C80815']
clrArray[123]=['Persian red','#CC3333']
clrArray[124]=['Lava','#CF1020']
clrArray[125]=['Fire engine red','#CE2029']
clrArray[126]=['Crimson','#DC143C']
clrArray[127]=['Cinnabar','#E34234']
clrArray[128]=['Alizarin','#E32636']
clrArray[129]=['Rich carmine','#D70040']
clrArray[130]=['Deep carmine pink','#EF3038']
clrArray[131]=['Vermilion','#E34234']
clrArray[132]=['Ruby','#E0115F']
clrArray[133]=['Rose Madder','#E32636']
clrArray[134]=['Red (pigment)','#ED1C24']
clrArray[135]=['Amaranth','#E52B50']
clrArray[136]=['Razzmatazz','#E3256B']
clrArray[137]=['Raspberry','#E30B5C']
clrArray[138]=['Scarlet','#FF2400']
clrArray[139]=['Red (RYB)','#FE2712']
clrArray[140]=['Red','#FF0000']
clrArray[141]=['Amaranth Pink','#F19CBB']
clrArray[142]=['Carnation pink','#FFA6C9']
clrArray[143]=['Cherry blossom pink','#FFB7C5']
clrArray[144]=['Pink','#FFC0CB']
clrArray[145]=['Tea rose (rose)','#F4C2C2']
clrArray[146]=['Light pink','#FFB6C1']
clrArray[147]=['Pastel pink','#FFD1DC']
clrArray[148]=['Pale red-violet','#DB7093']
clrArray[149]=['Light Thulian pink','#E68FAC']
clrArray[150]=['Lavender rose','#FBA0E3']
clrArray[151]=['Lavender pink','#FBAED2']
clrArray[152]=['Lavender magenta','#EE82EE']
clrArray[153]=['Fuchsia Pink','#FF77FF']
clrArray[154]=['Fuchsia','#FF00FF']
clrArray[155]=['Heliotrope','#DF73FF']
clrArray[156]=['Coral pink','#F88379']
clrArray[157]=['Ultra pink','#FF6FFF']
clrArray[158]=['Thulian pink','#DE6FA1']
clrArray[159]=['Shocking Pink','#FC0FC0']
clrArray[160]=['Salmon pink','#FF91A4']
clrArray[161]=['Rose pink','#FF66CC']
clrArray[162]=['Rose','#FF007F']
clrArray[163]=['Persian rose','#FE28A2']
clrArray[164]=['Persian pink','#F77FBE']
clrArray[165]=['Hot Pink','#FF69B4']
clrArray[166]=['Hot Magenta','#FF00CC']
clrArray[167]=['Hollywood Cerise','#F400A1']
clrArray[168]=['French Rose','#F64A8A']
clrArray[169]=['Deep pink','#FF1493']
clrArray[170]=['Deep cerise','#DA3287']
clrArray[171]=['Dark pink','#E75480']
clrArray[172]=['Cerise Pink','#EC3B83']
clrArray[173]=['Cerise','#DE3163']
clrArray[174]=['Carmine Pink','#EB4C42']
clrArray[175]=['Brink Pink','#FB607F']
clrArray[176]=['Brilliant rose','#FF55A3']
clrArray[177]=['Bright pink','#FF007F']
clrArray[178]=['International orange','#FF4F00']
clrArray[179]=['Ochre','#CC7722']
clrArray[180]=['Dark coral','#CD5B45']
clrArray[181]=['Cinnamon','#D2691E']
clrArray[182]=['Burnt orange','#CC5500']
clrArray[183]=['Tawny','#CD5700']
clrArray[184]=['Tangerine','#F28500']
clrArray[185]=['Safety orange','#FF6600']
clrArray[186]=['Pumpkin','#FF7518']
clrArray[187]=['Portland Orange','#FF5A36']
clrArray[188]=['Pink-orange','#FF9966']
clrArray[189]=['Persian orange','#D99058']
clrArray[190]=['Persimmon','#EC5800']
clrArray[191]=['Orange-Red','#FF4500']
clrArray[192]=['Orange Peel','#FFA000']
clrArray[193]=['Orange (web)','#FFA500']
clrArray[194]=['Orange (RYB)','#FB9902']
clrArray[195]=['Orange (color wheel)','#FF7F00']
clrArray[196]=['Deep saffron','#FF9933']
clrArray[197]=['Coral','#FF7F50']
clrArray[198]=['Carrot orange','#ED9121']
clrArray[199]=['Atomic tangerine','#FF9966']
clrArray[200]=['Gamboge','#E49B0F']
clrArray[201]=['Amber (SAE/ECE)','#FF7E00']
clrArray[202]=['Yellow (RYB)','#FEFE33']
clrArray[203]=['Yellow (process)','#FFEF00']
clrArray[204]=['Yellow','#FFFF00']
clrArray[205]=['Tangerine yellow','#FFCC00']
clrArray[206]=['School bus yellow','#FFD800']
clrArray[207]=['Saffron','#F4C430']
clrArray[208]=['Mustard','#FFDB58']
clrArray[209]=['Maize','#FBEC5D']
clrArray[210]=['Lemon','#FDE910']
clrArray[211]=['Khaki (X11)','#F0E68C']
clrArray[212]=['Golden yellow','#FFDF00']
clrArray[213]=['Golden poppy','#FCC200']
clrArray[214]=['Gold (web)','#FFD700']
clrArray[215]=['Flax','#EEDC82']
clrArray[216]=['Corn','#FBEC5D']
clrArray[217]=['Buff','#F0DC82']
clrArray[218]=['Selective yellow','#FFBA00']
clrArray[219]=['Amber','#FFBF00']
clrArray[220]=['Goldenrod','#DAA520']
clrArray[221]=['Gold (metallic)','#D4AF37']
clrArray[222]=['Byzantium','#702963']
clrArray[223]=['Tyrian purple','#66023C']
clrArray[224]=['Dark magenta','#8B008B']
clrArray[225]=['Royal purple','#6B3FA0']
clrArray[226]=['Purple (HTML/CSS)','#7F007F']
clrArray[227]=['Blue-violet','#8A2BE2']
clrArray[228]=['Violet (RYB)','#8601AF']
clrArray[229]=['Amethyst','#9966CC']
clrArray[230]=['Wisteria','#C9A0DC']
clrArray[231]=['Violet (web)','#EE82EE']
clrArray[232]=['Dark violet','#9400D3']
clrArray[233]=['Violet','#8B00FF']
clrArray[234]=['Purple (X11)','#A020F0']
clrArray[235]=['Psychedelic purple','#DD00FF']
clrArray[236]=['Plum (web)','#CC99CC']
clrArray[237]=['Pale magenta','#F984E5']
clrArray[238]=['Orchid','#DA70D6']
clrArray[239]=['Medium purple','#9370DB']
clrArray[240]=['Medium lavender magenta','#CC99CC']
clrArray[241]=['Mauve','#E0B0FF']
clrArray[242]=['Lavender indigo','#9457EB']
clrArray[243]=['Lavender (floral)','#B57EDC']
clrArray[244]=['Electric purple','#BF00FF']
clrArray[245]=['Electric indigo','#6600FF']
clrArray[246]=['Deep magenta','#CD00CC']
clrArray[247]=['Deep lilac','#9955BB']
clrArray[248]=['Deep fuchsia','#C154C1']
clrArray[249]=['Turquoise','#30D5C8']
clrArray[250]=['Dark turquoise','#00CED1']
clrArray[251]=['Cyan (process)','#00B7EB']
clrArray[252]=['Cyan','#00FFFF']
clrArray[253]=['Bright turquoise','#08E8DE']
clrArray[254]=['Aqua','#00FFFF']
clrArray[255]=['Aquamarine','#7FFFD4']
clrArray[256]=['Seal brown','#321414']
clrArray[257]=['Bole','#79443B']
clrArray[258]=['Auburn','#6D351A']
clrArray[259]=['Caput Mortuum','#592720']
clrArray[260]=['Eggplant','#614051']
clrArray[261]=['Bistre','#3D2B1F']
clrArray[262]=['Dark scarlet','#560319']
clrArray[263]=['Chocolate','#7B3F00']
clrArray[264]=['Dark brown','#654321']
clrArray[265]=['Raw umber','#734A12']
clrArray[266]=['Sepia','#704214']
clrArray[267]=['Medium taupe','#674C47']
clrArray[268]=['Maroon (HTML/CSS)','#800000']
clrArray[269]=['Russet','#80461B']
clrArray[270]=['Cordovan','#893F45']
clrArray[271]=['Burnt umber','#8A3324']
clrArray[272]=['Brown','#964B00']
clrArray[273]=['Copper rose','#996666']
clrArray[274]=['Rose Taupe','#905D5D']
clrArray[275]=['Dark goldenrod','#B8860B']
clrArray[276]=['Tan','#D2B48C']
clrArray[277]=['Pale taupe','#BC987E']
clrArray[278]=['Pale brown','#987654']
clrArray[279]=['Sienna','#A0522D']
clrArray[280]=['Rust','#B7410E']
clrArray[281]=['Old Rose','#C08081']
clrArray[282]=['Mahogany','#C04000']
clrArray[283]=['Golden brown','#996515']
clrArray[284]=['Deep chestnut','#B94E48']
clrArray[285]=['Dark chestnut','#986960']
clrArray[286]=['Copper','#B87333']
clrArray[287]=['Bronze','#CD7F32']
clrArray[288]=['Burnt sienna','#E97451']
clrArray[289]=['Chestnut','#CD5C5C']
clrArray[290]=['Dark salmon','#E9967A']
clrArray[291]=['Dark tan','#918151']
clrArray[292]=['Deep peach','#FFCBA4']
clrArray[293]=['Desert sand','#EDC9AF']
clrArray[294]=['Ecru','#C2B280']
clrArray[295]=['Fallow','#C19A6B']
clrArray[296]=['Khaki','#C3B091']
clrArray[297]=['Lavender purple','#967BB6']
clrArray[298]=['Lilac','#C8A2C8']
clrArray[299]=['Magenta','#FF00FF']
clrArray[300]=['Magenta (dye)','#CA1F7B']
clrArray[301]=['Magenta (process)','#FF0090']
clrArray[302]=['Maroon (X11)','#B03060']
clrArray[303]=['Mauve Taupe','#915F6D']
clrArray[304]=['Medium carmine','#AF4035']
clrArray[305]=['Mountbatten pink','#997A8D']
clrArray[306]=['Old Gold','#CFB53B']
clrArray[307]=['Old Lavender','#796878']
clrArray[308]=['Pale carmine','#AF4035']
clrArray[309]=['Pale chestnut','#DDADAF']
clrArray[310]=['Puce','#CC8899']
clrArray[311]=['Red-violet','#C71585']
clrArray[312]=['Salmon','#FF8C69']
clrArray[313]=['Sandy brown','#F4A460']
clrArray[314]=['Tea rose (orange)','#F88379']
clrArray[315]=['Terra cotta','#E2725B']
clrArray[316]=['Thistle','#D8BFD8']
clrArray[317]=['Tomato','#FF6347']
clrArray[318]=['Vegas Gold','#C5B358']
clrArray[319]=['Wheat','#F5DEB3']
clrArray[320]=['Seashell','#FFF5EE']
clrArray[321]=['Papaya whip','#FFEFD5']
clrArray[322]=['Old Lace','#FDF5E6']
clrArray[323]=['Magnolia','#F8F4FF']
clrArray[324]=['Linen','#FAF0E6']
clrArray[325]=['Lavender blush','#FFF0F5']
clrArray[326]=['Ivory','#FFFFF0']
clrArray[327]=['Cosmic latte','#FFF8E7']
clrArray[328]=['Cream','#FFFDD0']
clrArray[329]=['Peach','#FFE5B4']
clrArray[330]=['Peach-orange','#FFCC99']
clrArray[331]=['Peach-yellow','#FADFAD']
clrArray[332]=['Apricot','#FBCEB1']
clrArray[333]=['Lemon chiffon','#FFFACD']
clrArray[334]=['Champagne','#F7E7CE']
clrArray[335]=['Beige','#F5F5DC']
clrArray[336]=['Navajo white','#FFDEAD']
clrArray[337]=['Misty rose','#FFE4E1']
clrArray[338]=['Pale pink','#FADADD']
clrArray[339]=['Xanadu','#738678']
clrArray[340]=['Liver','#534B4F']
clrArray[341]=['Purple Taupe','#50404D']
clrArray[342]=['Arsenic','#3B444B']
clrArray[343]=['Teal','#008080']
clrArray[344]=['Slate gray','#708090']
clrArray[345]=['Rose quartz','#AA98A9']
clrArray[346]=['Silver','#C0C0C0']
clrArray[347]=['Taupe gray','#8B8589']
clrArray[348]=['Platinum','#E5E4E2']
clrArray[349]=['Lavender gray','#C4C3D0']
clrArray[350]=['Gray','#808080']
clrArray[351]=['Gainsboro','#DCDCDC']
clrArray[352]=['LightGray','#D3D3D3']
clrArray[353]=['DarkGray','#A9A9A9']
clrArray[354]=['Taupe','#483C32']
clrArray[355]=['DimGray','#696969']
clrArray[356]=['LightSlatGray','#778899']
clrArray[357]=['SlateGray','#708090']
clrArray[358]=['DarkSlateGray','#2F4F4F']
clrArray[359]=['Davy grey','#555555']
clrArray[360]=['Charcoal','#464646']
clrArray[361]=['Payne grey','#40404F']