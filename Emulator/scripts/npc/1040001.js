var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
/* ���úκ� ���� */
���� = 0;
�űԸ���Ʈ = [5000473, 5000290, 5000291, 5000292, 5000293, 5000294, 5000295, 5000296, 5000297, 5000298, 5000320, 5000321, 5000322, 5000330, 5000331, 5000332, 5000342, 5000343, 5000344, 5000352, 5000353, 5000354, 5000365, 5000366, 5000367, 5000385, 5000386, 5000387, 5000402, 5000403, 5000404, 5000405, 5000406, 5000407, 5000408, 5000409, 5000414, 5000415, 5000416, 5000417, 5000021]
/* ���úκ� �� */

    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
    �� = "#fUI/UIPVP.img/DmgEffect/DmgRed/excellent#\r\n"
    ��+= "#fn������� Extrabold##fs23##e< �����ý��丮 #r�ִ��̺�Ʈ#k!! >#fn������� Extrabold##fs15#\r\n #d�ֽŽű� �޼� ���� �Ǹ��� ���°Ծ������..#k\r\n#fn�ü�ü##fs20# #r�ֽŽűԵ��� 0�� !!#k#fn����##fs16#\r\n\r\n"
    for(var i=0; i<�űԸ���Ʈ.length; i++) {
    ��+= "#L"+i+"# #i"+�űԸ���Ʈ[i]+"# #b[#z"+�űԸ���Ʈ[i]+"#]#k\r\n"
    }
    cm.sendSimple(��);
    } else if (status == 1) {
    if(cm.getPlayer().getMeso() >= ����) {
    cm.gainMeso(-����);
    cm.BuyPET(�űԸ���Ʈ[selection]);
    cm.sendOk("#i"+�űԸ���Ʈ[selection]+"#�� �����ϼ̽��ϴ�.");
    cm.dispose();
    } else {
    cm.sendOk("�űԱ��Ÿ� �ϱ⿡�� �޼Ұ� �����մϴ�.");
    }
}
}