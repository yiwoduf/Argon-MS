
var status;
var select = -1;
var book  = new Array(2591315,2591316,2591317,2591318,2591319,2591320,2591321,2591322,2591323);

function start() {    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.dispose();
    	return;
    } else {
        if (mode == 1)
            status++;
        if (status == 0) {
	    if(!cm.haveItem(2432577, 10)) { 
		cm.sendOk("#e소울조각#n이 10개가 없는것같습니다.");
		cm.dispose();
		} else {
	    var text = "#b#h ##k님 벌써 #e소울조각#n을 10개나 모으셨네요!\r\n축하드립니다, 받고 싶은 소울을 선택해주세요.\r\n\r\n#b";
		for (var i = 0; i < book.length; i++) {
		    text+="#L"+i+"##i"+book[i]+"# #z"+book[i]+"##l\r\n";
		}
				cm.sendSimple(text);
		}
	} else if (status == 1) {
		select = selection;
		cm.sendYesNo("받을 소울은 #b#t"+book[select]+"##k이 맞습니까?");
	} else if (status == 2) {
		cm.gainItem(book[select], 1);
		cm.gainItem(2432577, -10);
		cm.dispose();
			}
    		}
	}
