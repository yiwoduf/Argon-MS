/*
  제작자 우비
 */

maple = [
"#i4310034# 5개로 - #d#i1662002##z1662002# 1개",
"#i4310034# 5개로 - #i1662003##z1662003# 1개",
"#i4310034# 5개로 - #i1672003##z1672003# 1개",]



function start() { 
   var text = "여기 아이템 리스트들은 안드로이드 상점입니다\r\n아이템들을 구매하실려면 #i4310034# 가필요합니다."

   for (var i = 0; i < maple.length; i++) 
       text += "\r\n#L" + i + "#" + maple[i] + "#l"; 
   cm.sendSimple(text); 
} 

function action(mode, type, selection) { 
    cm.dispose(); 
        if (selection == 0) { 
	if(cm.haveItem(4310034, 5)) { 
            cm.gainItem(4310034,-5); 
            cm.gainItem(1662002,1); 
            cm.sendOk("#i4310034# 5개로 선택하신 아이템으로 교환하셨습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("#i4310034# 5개가 있는지 다시 이벤토리창에서 확인하세요.");
            cm.dispose();;
        } 
        } else if (selection == 1) { 
	if(cm.haveItem(4310034, 5)) { 
            cm.gainItem(4310034,-5); 
            cm.gainItem(1662003,1); 
            cm.sendOk("#i4310034# 5개로 선택하신 아이템으로 교환하셨습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("#i4310034# 5개가 있는지 다시 이벤토리창에서 확인하세요.");
            cm.dispose();
}
        } else if (selection == 2) { 
	if(cm.haveItem(4310034, 5)) { 
            cm.gainItem(4310034,-5); 
            cm.gainItem(1672003,1); 
            cm.sendOk("#i4310034# 5개로 선택하신 아이템으로 교환하셨습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("#i4310034# 5개가 있는지 다시 이벤토리창에서 확인하세요.");
            cm.dispose();
}
        } else if (selection == 3) { 
	if(cm.haveItem(4310034, 6)) { 
            cm.gainItem(4310034,-6); 
            cm.gainItem(1672027,1); 
            cm.sendOk("#i4310034# 6개로 선택하신 아이템으로 교환하셨습니다.");
            cm.dispose(); 
        } else {
            cm.sendOk("#i4310034# 6개가 있는지 다시 이벤토리창에서 확인하세요.");
            cm.dispose();
}
}
}