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
       �� = "#fn������� Extrabold# �Ŀ�����Ʈ �� ȯ������Ʈ�� �߰��������� �����Ͻ� �� �ֽ��ϴ�.\r\n\r\n#L0#�Ŀ�����Ʈ�� �߰������� �����ϱ�.\r\n#L1#ȯ������Ʈ�� �߰������� �����ϱ�.\r\n"
       cm.sendSimple(��);
    } else if (status == 1) {
        ���� = selection;
        if (selection == 0) {
            cm.sendGetNumber("#fn������� Extrabold# �Ŀ�����Ʈ�� ����Ͽ� �߰��������� �����Ͻ� �� �ֽ��ϴ�. ����ϰ� ���� �Ŀ�����Ʈ ���� �����ּ���.\r\n\r\n#r(#h #���� ���� �Ŀ�����Ʈ : "+cm.getPlayer().getRC()+")",1,1,cm.getPlayer().getRC())
        } else if (selection == 1) {
            cm.sendGetNumber("#fn������� Extrabold# ȯ������Ʈ�� ����Ͽ� �߰��������� �����Ͻ� �� �ֽ��ϴ�. ����ϰ� ���� ȯ������Ʈ ���� �����ּ���.\r\n\r\n#r(#h #���� ���� ȯ������Ʈ : "+cm.getPlayer().getGP()+")",1,1,cm.getPlayer().getGP())
        }
    }// else if (status == 2) {
      
        if (���� == 0) {
            if (cm.getPlayer().getRC() >= selection) {
                cm.getPlayer().gainRC(-selection);
            } else {
                cm.sendOk("������ �߻��߽��ϴ�.");
                cm.dispose();
                return;
            }
        } else if (���� == 1) {
            if (cm.getPlayer().getGP() >= selection) {
                cm.getPlayer().gainGP(-selection);
            } else {
                cm.sendOk("������ �߻��߽��ϴ�.");
                cm.dispose();
                return;
            }
          
       }
            cm.getPlayer().setAddDamage(Number(cm.getPlayer().getAddDamage()) + Number(selection*10000));
            cm.sendOk("�Ϸ�");
            cm.dispose();
        
    }
}






























































































