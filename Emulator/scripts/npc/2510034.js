var status = 0;

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
		var jessica = "#fn������� Extrabold#��... ������.... �����ǰ�..\r\n";
		jessica += "��.. #rŻ����#k ���� ��Ź�� �����̴ٰ� ����µ�..\r\n";
		jessica += "���� ������ �ܼ��� ���� �־��..\r\n";
		jessica += "�׷���.. #d����#k �� ������ ���� �����ϰ� ���� ����������?\r\n";
                jessica += "#L0#* #d����#k �� ���������� ��ġ �Ͽ����ϴ�.#l\r\n\r\n      #i4009157# " + cm.itemQuantity(4009157) + "/1 + #i4009158# " + cm.itemQuantity(4009158) + "/1\r\n";
		cm.sendSimple(jessica);

	} else if (status == 1) {

	if (selection == 0) {
               if(cm.haveItem(4009157,1) && cm.haveItem(4009158,1)){
               cm.gainItem(4009157,-1);
               cm.gainItem(4009158,-1);
               cm.warp(302040000,0);
               cm.sendOk("#fn������� Extrabold##b���� ����#k �̶�� �� �� ��򰡿� �и� �����ſ���..\r\n������� �������̽� #r������#k ���� ã�ư�������!..\r\n\r\n#d(����� �����ʿ� �ִ� �������� ã�ư���..)#k");
               cm.dispose();
               } else {
               cm.sendOk("#fn������� Extrabold#��ſ��Դ�.. #d����#k �� ��ġ�� ���Ű� �����..\r\n������ ���� �޴� ���� ���迡 ��� ���� ������..#k");
               cm.dispose();
                }
} 
}    
}    
}       