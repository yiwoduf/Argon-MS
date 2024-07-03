var select = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
	    cm.sendSimple("다친다..");
   	    cm.dispose();
} else if (selection == 9) {
	if (!cm.haveItem(4000313,50)) {
	cm.sendOk("아이템이 부족합니다..");
        cm.dispose();
	return;
}
	cm.gainItem(4000313, -50);
	cm.gainItem(4021016, 50);
	cm.sendOk("#e팩스스타일을 잠재워주셧으면 하는 마음입니다, 전항상#h #님을 응원합니다#n");
	cm.dispose();
} else if (selection == 10) {
if (!cm.haveItem(2430218,3)) {
	cm.sendOk("아이템이 부족합니다..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4001085,1)) {
	cm.sendOk("아이템이 부족합니다..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(1122076,1)) {
	cm.sendOk("아이템이 부족합니다..");
        cm.dispose();
	return;
}
	cm.sendOk("#e팩스스타일을 잠재워주셧으면 하는 마음입니다, 전항상#h #님을 응원합니다#n");
	cm.gainItem(2430218,-3);
	cm.gainItem(4001085,-1);
	cm.gainItem(1122076,-1);
	cm.gainItem(4021021, 1);
	cm.dispose();

} else if (selection == 1) {
	cm.sendOk("#v1122150# #e#t1122150##n = #b현자의 돌 3개 / 최상급 결정 400개 / 혼돈의 파편 100개#k\r\n\r\n#v1112663# #e#t1112663##n = #b현자의 돌 2개 / 최상급 결정 200개 / 혼돈의 파편 80개#k\r\n\r\n#v1112665# #e#t1112665##n = #b현자의 돌 1개 / 최상급 결정100개 / 혼돈의 파편 40개 #k\r\n\r\n #v1112664# #e#t1112664##n = #b현자의 돌 1개 / 최상급 결정 50개 / 혼돈의 파편 30개#k");
	cm.dispose();
} else if (selection == 2) {
	cm.sendOk("#v4000313# #b#t4000313##k #e50개당 #v4021016# #t4021016# 50개#n \r\n #v4021021# #b#t4021021##k = #v2430218# #t2430218# 3개 #v1122076# #t1122076# 1개 #v4001085# #t4001085# 1개\r\n#v4021020# #b#t4021020# 과 #v2430218# #t2430218##k 은 #e돌림판#n에서 뽑으실수 있습니다.");
	cm.dispose();
} else if (selection == 3) {
	var jessica3 = "어서 빨리 몬스터들의 소란을 잠재워주세요..\r\n";
	jessica3 += "#L5##i1122150# #t1122150# 교환\r\n";
	jessica3 += "#L6##i1112663# #t1112663# 교환\r\n";
	jessica3 += "#L8##i1112665# #t1112665# 교환\r\n";
	jessica3 += "#L7##i1112664# #t1112664# 교환\r\n";
	cm.sendSimple(jessica3);
} else if (selection == 4) {
	    var cps2 ="무얼 제작 하시겠습니까?\r\n"
	    cps2 += "#b#L9##b[#h #]  :  #k#r#v4021016# #t4021016# #n\r\n#k";
	    cps2 += "#b#L10##b[#h #]  :  #k#r#v4021021# #t4021021# #n\r\n#k";
	    cm.sendSimple(cps2);
} else if (selection == 5) {
	if (!cm.haveItem(4021021,3)) {
	cm.sendOk("아이템이 부족합니다..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4021016, 400)) {
	cm.sendOk("아이템이 부족합니다..");
	cm.dispose();
	return;
}
	if (!cm.haveItem(4021020, 100)) {
	cm.sendOk("아이템이 부족합니다.");
	cm.dispose();
	retrun;
}
	cm.sendOk("#h # 님 팩스스타일의 소란을 잠재워주셔서 감사합니다.");
	cm.gainItem(4021021, -3);
	cm.gainItem(4021016, -400);
	cm.gainItem(4021020, -100);
	cm.name(1122150, 150,50,50);
	cm.dispose();
} else if (selection == 6) {
if (!cm.haveItem(4021021,2)) {
	cm.sendOk("아이템이 부족합니다..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4021016, 200)) {
	cm.sendOk("아이템이 부족합니다..");
	cm.dispose();
	return;
}
	if (!cm.haveItem(4021020, 80)) {
	cm.sendOk("아이템이 부족하네");
	cm.dispose();
	retrun;
}
	cm.sendOk("#h # 님 팩스스타일의 소란을 잠재워주셔서 감사합니다.");
	cm.gainItem(4021021, -2);
	cm.gainItem(4021016, -200);
	cm.gainItem(4021020, -80);
	cm.name(1112663, 100,50,40);
	cm.dispose();
} else if (selection == 7) {
if (!cm.haveItem(4021021,1)) {
	cm.sendOk("아이템이 부족합니다..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4021016, 50)) {
	cm.sendOk("아이템이 부족합니다..");
	cm.dispose();
	return;
}
	if (!cm.haveItem(4021020, 30)) {
	cm.sendOk("아이템이 부족하네");
	cm.dispose();
	retrun;
}
	cm.sendOk("#h # 님 팩스스타일의 소란을 잠재워주셔서 감사합니다.");
	cm.gainItem(4021021, -1);
	cm.gainItem(4021016, -50);
	cm.gainItem(4021020, -30);
	cm.name(1112664, 50,30,30);
	cm.dispose();
} else if (selection == 8) {
if (!cm.haveItem(4021021,2)) {
	cm.sendOk("아이템이 부족합니다..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4021016, 200)) {
	cm.sendOk("아이템이 부족합니다..");
	cm.dispose();
	return;
}
	if (!cm.haveItem(4021020, 80)) {
	cm.sendOk("아이템이 부족하네");
	cm.dispose();
	retrun;
}
	cm.sendOk("#h # 님 팩스스타일의 소란을 잠재워주셔서 감사합니다.");
	cm.gainItem(4021021, -2);
	cm.gainItem(4021016, -200);
	cm.gainItem(4021020, -80);
	cm.name(1112665, 50,40,40);
	cm.dispose();


}
}
}

