/*
  ������ ���
 */

maple = [
"#i4310034# 5���� - #d#i1662002##z1662002# 1��",
"#i4310034# 5���� - #i1662003##z1662003# 1��",
"#i4310034# 5���� - #i1672003##z1672003# 1��",]



function start() { 
   var text = "���� ������ ����Ʈ���� �ȵ���̵� �����Դϴ�\r\n�����۵��� �����ϽǷ��� #i4310034# ���ʿ��մϴ�."

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
            cm.sendOk("#i4310034# 5���� �����Ͻ� ���������� ��ȯ�ϼ̽��ϴ�.");
            cm.dispose(); 
        } else {
            cm.sendOk("#i4310034# 5���� �ִ��� �ٽ� �̺��丮â���� Ȯ���ϼ���.");
            cm.dispose();;
        } 
        } else if (selection == 1) { 
	if(cm.haveItem(4310034, 5)) { 
            cm.gainItem(4310034,-5); 
            cm.gainItem(1662003,1); 
            cm.sendOk("#i4310034# 5���� �����Ͻ� ���������� ��ȯ�ϼ̽��ϴ�.");
            cm.dispose(); 
        } else {
            cm.sendOk("#i4310034# 5���� �ִ��� �ٽ� �̺��丮â���� Ȯ���ϼ���.");
            cm.dispose();
}
        } else if (selection == 2) { 
	if(cm.haveItem(4310034, 5)) { 
            cm.gainItem(4310034,-5); 
            cm.gainItem(1672003,1); 
            cm.sendOk("#i4310034# 5���� �����Ͻ� ���������� ��ȯ�ϼ̽��ϴ�.");
            cm.dispose(); 
        } else {
            cm.sendOk("#i4310034# 5���� �ִ��� �ٽ� �̺��丮â���� Ȯ���ϼ���.");
            cm.dispose();
}
        } else if (selection == 3) { 
	if(cm.haveItem(4310034, 6)) { 
            cm.gainItem(4310034,-6); 
            cm.gainItem(1672027,1); 
            cm.sendOk("#i4310034# 6���� �����Ͻ� ���������� ��ȯ�ϼ̽��ϴ�.");
            cm.dispose(); 
        } else {
            cm.sendOk("#i4310034# 6���� �ִ��� �ٽ� �̺��丮â���� Ȯ���ϼ���.");
            cm.dispose();
}
}
}