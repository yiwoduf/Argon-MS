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
	    cm.sendSimple("��ģ��..");
   	    cm.dispose();
} else if (selection == 9) {
	if (!cm.haveItem(4000313,50)) {
	cm.sendOk("�������� �����մϴ�..");
        cm.dispose();
	return;
}
	cm.gainItem(4000313, -50);
	cm.gainItem(4021016, 50);
	cm.sendOk("#e�ѽ���Ÿ���� ������ּ����� �ϴ� �����Դϴ�, ���׻�#h #���� �����մϴ�#n");
	cm.dispose();
} else if (selection == 10) {
if (!cm.haveItem(2430218,3)) {
	cm.sendOk("�������� �����մϴ�..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4001085,1)) {
	cm.sendOk("�������� �����մϴ�..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(1122076,1)) {
	cm.sendOk("�������� �����մϴ�..");
        cm.dispose();
	return;
}
	cm.sendOk("#e�ѽ���Ÿ���� ������ּ����� �ϴ� �����Դϴ�, ���׻�#h #���� �����մϴ�#n");
	cm.gainItem(2430218,-3);
	cm.gainItem(4001085,-1);
	cm.gainItem(1122076,-1);
	cm.gainItem(4021021, 1);
	cm.dispose();

} else if (selection == 1) {
	cm.sendOk("#v1122150# #e#t1122150##n = #b������ �� 3�� / �ֻ�� ���� 400�� / ȥ���� ���� 100��#k\r\n\r\n#v1112663# #e#t1112663##n = #b������ �� 2�� / �ֻ�� ���� 200�� / ȥ���� ���� 80��#k\r\n\r\n#v1112665# #e#t1112665##n = #b������ �� 1�� / �ֻ�� ����100�� / ȥ���� ���� 40�� #k\r\n\r\n #v1112664# #e#t1112664##n = #b������ �� 1�� / �ֻ�� ���� 50�� / ȥ���� ���� 30��#k");
	cm.dispose();
} else if (selection == 2) {
	cm.sendOk("#v4000313# #b#t4000313##k #e50���� #v4021016# #t4021016# 50��#n \r\n #v4021021# #b#t4021021##k = #v2430218# #t2430218# 3�� #v1122076# #t1122076# 1�� #v4001085# #t4001085# 1��\r\n#v4021020# #b#t4021020# �� #v2430218# #t2430218##k �� #e������#n���� �����Ǽ� �ֽ��ϴ�.");
	cm.dispose();
} else if (selection == 3) {
	var jessica3 = "� ���� ���͵��� �Ҷ��� ������ּ���..\r\n";
	jessica3 += "#L5##i1122150# #t1122150# ��ȯ\r\n";
	jessica3 += "#L6##i1112663# #t1112663# ��ȯ\r\n";
	jessica3 += "#L8##i1112665# #t1112665# ��ȯ\r\n";
	jessica3 += "#L7##i1112664# #t1112664# ��ȯ\r\n";
	cm.sendSimple(jessica3);
} else if (selection == 4) {
	    var cps2 ="���� ���� �Ͻðڽ��ϱ�?\r\n"
	    cps2 += "#b#L9##b[#h #]  :  #k#r#v4021016# #t4021016# #n\r\n#k";
	    cps2 += "#b#L10##b[#h #]  :  #k#r#v4021021# #t4021021# #n\r\n#k";
	    cm.sendSimple(cps2);
} else if (selection == 5) {
	if (!cm.haveItem(4021021,3)) {
	cm.sendOk("�������� �����մϴ�..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4021016, 400)) {
	cm.sendOk("�������� �����մϴ�..");
	cm.dispose();
	return;
}
	if (!cm.haveItem(4021020, 100)) {
	cm.sendOk("�������� �����մϴ�.");
	cm.dispose();
	retrun;
}
	cm.sendOk("#h # �� �ѽ���Ÿ���� �Ҷ��� ������ּż� �����մϴ�.");
	cm.gainItem(4021021, -3);
	cm.gainItem(4021016, -400);
	cm.gainItem(4021020, -100);
	cm.name(1122150, 150,50,50);
	cm.dispose();
} else if (selection == 6) {
if (!cm.haveItem(4021021,2)) {
	cm.sendOk("�������� �����մϴ�..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4021016, 200)) {
	cm.sendOk("�������� �����մϴ�..");
	cm.dispose();
	return;
}
	if (!cm.haveItem(4021020, 80)) {
	cm.sendOk("�������� �����ϳ�");
	cm.dispose();
	retrun;
}
	cm.sendOk("#h # �� �ѽ���Ÿ���� �Ҷ��� ������ּż� �����մϴ�.");
	cm.gainItem(4021021, -2);
	cm.gainItem(4021016, -200);
	cm.gainItem(4021020, -80);
	cm.name(1112663, 100,50,40);
	cm.dispose();
} else if (selection == 7) {
if (!cm.haveItem(4021021,1)) {
	cm.sendOk("�������� �����մϴ�..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4021016, 50)) {
	cm.sendOk("�������� �����մϴ�..");
	cm.dispose();
	return;
}
	if (!cm.haveItem(4021020, 30)) {
	cm.sendOk("�������� �����ϳ�");
	cm.dispose();
	retrun;
}
	cm.sendOk("#h # �� �ѽ���Ÿ���� �Ҷ��� ������ּż� �����մϴ�.");
	cm.gainItem(4021021, -1);
	cm.gainItem(4021016, -50);
	cm.gainItem(4021020, -30);
	cm.name(1112664, 50,30,30);
	cm.dispose();
} else if (selection == 8) {
if (!cm.haveItem(4021021,2)) {
	cm.sendOk("�������� �����մϴ�..");
        cm.dispose();
	return;
}
	if (!cm.haveItem(4021016, 200)) {
	cm.sendOk("�������� �����մϴ�..");
	cm.dispose();
	return;
}
	if (!cm.haveItem(4021020, 80)) {
	cm.sendOk("�������� �����ϳ�");
	cm.dispose();
	retrun;
}
	cm.sendOk("#h # �� �ѽ���Ÿ���� �Ҷ��� ������ּż� �����մϴ�.");
	cm.gainItem(4021021, -2);
	cm.gainItem(4021016, -200);
	cm.gainItem(4021020, -80);
	cm.name(1112665, 50,40,40);
	cm.dispose();


}
}
}

