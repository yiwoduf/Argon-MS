var status = -1;

pass = 0;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
 
    joblist = [3700,3710,3711,3712,3200,3210,3211,3212,3300,3310,3311,3312,3500,3510,3511,3512,2100,2110,2111,2112,2200,2210,2211,2212,2300,2310,2311,2312,2700,2710,2711,2712
              ,2500,2510,2511,2512,1100,1110,1111,1112,5100,5110,5111,5112,1400,1410,1411,1412,122,112,132,3100,3110,3111,3112,3101,3120,3121,3122,6100,6110,6111,6112,512,14200,14210,14211,14212,400,410,411,412]
    skillist = [1311015,3121002,1301007,5301003,33101005,5121009]
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        for (a=0; a<joblist.length; a++) {
             if (cm.getPlayer().getJob() == joblist[a]) {
                 pass = 1;
             }
        }
        if (cm.getPlayer().getKeyValue("gBuff") == null) {
            if (pass == 1) {
                �� = "���� ������ #h #����, #b1ȸ ����#k���� ���� 1���� ���� �� �ֽ��ϴ�. ������ �ٲ� �� ������, ������ ������ �ּ���!.\r\n\r\n"
                    for (i=0; i<skillist.length; i++) {
                        ��+= "#b#L"+i+"# #s"+skillist[i]+"# #q"+skillist[i]+"#\r\n";
                    }
                cm.sendSimple(��);
            } else {
                cm.sendOk("���� ������ �ƴ� ���� ����� �Ұ����մϴ�.");
                cm.dispose();
            }
        } else {
            if (pass == 1) {
                cm.giveBuff(cm.getPlayer().getKeyValue("gBuff"),30);
                cm.dispose();
            } else {
                cm.sendOk("���� ������ �ƴ� ���� ����� �Ұ����մϴ�.");
                cm.dispose();
            }
        }
    } else if (status == 1) {
            cm.getPlayer().setKeyValue("gBuff",skillist[selection])
            cm.sendOk("#s"+skillist[selection]+"# #b#q"+skillist[selection]+"##k�� ���̽��ϴ�.\r\n\r\n������ �� �������� Ű���ÿ� ������ ��, ����� �� �ش� ������ ���޵˴ϴ�.");
            cm.dispose();
    }
}