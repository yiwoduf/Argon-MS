/*

	ġ�쾾 :: projectchiu16@nate.com
	���ζ�¶��� ������ 'ġ�쾾' �ۼ�

*/

importPackage(java.lang);
var status = -1;
var gp_required = 1000; // �ʿ��� ȯ�� ����Ʈ
var hit = 1; // �߰� Ÿ��
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    }
    if (mode == 0 || mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("#fs13##r#fn������� EXtrabold#�ѹ� �� ���������׷�! ���ζ�¶��� �߰�Ÿ�� �ý���!\r\n�߰�Ÿ���� ����Ƚ���� Ÿ���� ���ϱⰡ �Ǽ� �ѹ��� �� ���� �������� ���ϴ� �ý����̾�.\r\n���Ŵ� " + hit + " Ÿ���� ĳ���Ϳ� �߰��ȴٱ�!\r\n\r\n ���� XŸ�� : "+cm.getPlayer().getAddDamageHit()+"�� ����#l#k\r\n\r\n#fs15##L1#ȯ������Ʈ " + gp_required + " �� �ŷ��ϰھ�.#fs13#\r\n#l\r\n   (���� �����ϰ� �ִ� ȯ�� ����Ʈ : "+cm.getPlayer().getGP()+")\r\n#b#L2#Ÿ�ݼ��� �ø��� ��������?\r\n#r");
    } else if (status == 1) {
if (selection == 1) {
        if (cm.getPlayer().getAddDamageHit() + hit > 99) {
            cm.sendOk("��춧����, 100�� ���� �� Ÿ�ݼ��� ������!");
            cm.dispose();
        } else if (cm.getPlayer().getGP() > gp_required) {
            cm.getPlayer().gainGP(-gp_required);
            cm.getPlayer().gainAddDamageHit(hit);
            cm.sendOk("���� Ÿ��Ƚ���� �����߾�.");
            cm.dispose();
        } else {
            cm.sendOk("ȯ�� ����Ʈ�� �����ϱ�");
            cm.dispose();
        }

} else if (selection == 2) {
	cm.sendOk("������ Ƚ���� �÷��ݴϴ�. (��. �ѹ��� ���õ������� 100 �ϰ�� X 'Ÿ��' �� �������� ������ �˴ϴ�.)");
	cm.dispose();
}
}
}