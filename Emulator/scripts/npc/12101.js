


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Pure Online Development Source Script)

	���۷� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 9330008

	���ǽ� �̸� : FAQ ����Ʈ npc 1

	���ǽð� �ִ� �� : �����÷ε� : ������ (2000100)

	���ǽ� ���� : MISSINGNO


*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
	status++;
    }
    if (status == 0) {
             var chat = "����Ʈ ������ ����� ��������?#b";
             chat += "#b\r\n#L0#����Ʈ ������ ����ڽ��ϴ�.";
             cm.sendSimple(chat);
	  } else if (status == 1) {
             if (selection == 0) {
             if (cm.getQuestStatus(32240) == 0) {
              /* ĳ���� ���� */
             cm.completeQuest(32240);   
             cm.completeQuest(25710);   
             cm.completeQuest(23612); 
             cm.completeQuest(38074);   
             cm.completeQuest(25711);   
             cm.completeQuest(23616);   
             cm.completeQuest(25512);   
             cm.completeQuest(23220);  
             cm.completeQuest(32241);   
             cm.completeQuest(32246);   
             cm.completeQuest(23610);
             cm.completeQuest(23611);
             cm.completeQuest(12394);   
             cm.completeQuest(12395);
             cm.completeQuest(12396);
             cm.completeQuest(17355);
             cm.completeQuest(17357); 
             cm.completeQuest(17358);
             cm.completeQuest(17363);
             cm.completeQuest(17372); 
             cm.completeQuest(17373); 
             cm.completeQuest(2650);     
             cm.completeQuest(3956); 
             cm.completeQuest(6995)
             cm.completeQuest(6996);
             cm.completeQuest(6997);
             cm.completeQuest(6998);
             cm.completeQuest(6999); 
             cm.completeQuest(31000);
             cm.completeQuest(32160);  
             cm.completeQuest(3116); 
             cm.completeQuest(1538);
             cm.completeQuest(4310);
             cm.completeQuest(31200);
             cm.completeQuest(3138);
             cm.completeQuest(3163);
             cm.completeQuest(3853);
             cm.completeQuest(31300);
             cm.completeQuest(25964);
             cm.completeQuest(31900);
             cm.completeQuest(3715);
	     cm.sendOk("�Ϸ�Ǿ����ϴ�.");
           } else {
	     cm.sendOk("�̹� �ϽŰŰ��ƿ�.");
             }
	 } else if (selection == 1) {
	     cm.sendOk("����������");
         }
    }
}
