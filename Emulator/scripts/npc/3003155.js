
var k = "#fUI/UIToolTip/Item/Equip/Star/Star#"

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
            cps = "                     #e<�����÷��� ���ɻ���>#n\r\n";
            cps = "#fUI/CashShop.img/CSStatus/BtN/normal/0# #fn������� Extrabold##fs15##b#h ##k #fn������� Extrabold##fs15# ���� �����Դϴ�.#fn������� Extrabold##fs12#\r\n ���� : "+ cm.getPlayer().getLevel() +"���޼� : " + cm.getPlayer().getMeso()+ "��#n\r\n\r\n";
            cps += "#L100000##fs 13##i2280003##e#r  ���� ����#k";
           cps += "#L100002##fs 13##i2280004##e#r  �ü� ����#n\r\n\r\n";
           cps += "#L100001##fs 13##i2280005##e#r  ���� ����#k";
           cps += "#L100003##fs 13##i2280006##e#r  ���� ����#n\r\n\r\n";
            cps += "#L100004##fs 13##i2280007##e#r  ���� ����#k";
            cm.sendSimple(cps);         
        } else if (selection == 100000) {
                cm.sendSimple ("#r#e[ ���� �� ]#n#k\r\n" +
            "#k#L0#����" +
            "#k#L1#����" +
            "#k#L2#����" +
            "#k#L3#�Ź�" +
            "#k#L4#����" +
            "#k#L5#�尩" +
            "#k#L6#����\r\n\r\n\r\n\r\n" +

            "#l#b#e[ ���� ���� ]#n#k\r\n" +
            "#k#L7#�������" +
            "#k#L8#�Ѽյ���" +
            "#k#L9#�μյ���" +
            "#k#L10#�Ѽյб�\r\n" +
            "#k#L11#�μյб�" +
            "#k#L12#�Ѽհ�" +
            "#k#L13#�μհ�" +
            "#k#L14#â" +
            "#k#L15#����" +
            "#k#L76#�ڵ�ĳ��");
        } else if (selection == 100001) {
                cm.sendSimple ("#r#e[ ������ �� ]#n#k\r\n" +
            "#k#L16#����" +
            "#k#L7#����" +
            "#k#L18#����" +
            "#k#L19#����" +
            "#k#L20#�Ź�" +
            "#k#L21#�尩" +
            "#k#L22#����\r\n\r\n\r\n\r\n" +

            "#l#b#e[ ������ ���� ]#n#k\r\n" +
            "#k#L23#���̴׷ε�" +
            "#k#L24#�巡�����" +
            "#k#L25#�ϵ�" +
            "#k#L26#������");
        } else if (selection == 100002) {
                cm.sendSimple ("#r#e[ �ü� �� ]#n#k\r\n" +
            "#k#L27#����" +
            "#k#L28#����" +
            "#k#L29#����" +
            "#k#L30#����" +
            "#k#L31#�Ź�" +
            "#k#L32#�尩\r\n\r\n\r\n\r\n" +

            "#l#b#e[ �ü� ���� ]#n#k\r\n" +
            "#k#L33#Ȱ" +
            "#k#L34#����" +
            "#k#L35#����" +
            "#k#L36#����ȭ��" +
            "#k#L37#ȭ��");
        } else if (selection == 100003) {
                cm.sendSimple ("#r#e[ ���� �� ]#n#k\r\n" +
            "#l#L38##b����" +
            "#k#L39##b����" +
            "#k#L40##b����" +
            "#k#L41##b����" +
            "#k#L42##b�Ź�" +
            "#l#L43##b�尩" +
            "#l#L44##b ����\r\n\r\n\r\n\r\n" +

            "#l#b#e[ ���� ���� ]#n#k\r\n" +
            "#l#L45#�������ҵ�" +
            "#l#L46#�ܰ�" +
            "#l#L47#�ƴ�" +
            "#l#L48#���̵�" +
            "#l#L49#����" +
            "#l#L50#ī��" +
	    "#k\r\n#L51#ǥâ");
        } else if (selection == 100004) {
                cm.sendSimple ("#r#e[ ���� �� ]#n#k\r\n" +
            "#k#L52#����" +
            "#k#L53#����" +
            "#k#L54#�Ź�" +
            "#k#L55#�尩\r\n\r\n\r\n\r\n" +

            "#l#b#e[ ���� ���� ]#n#k\r\n" +
            "#k#L56#��Ŭ" +
            "#k#L57#��" +
            "#k#L58#�ڵ�ĳ��" +
            "#l#L59#�ҿｴ��" +
            "#k#L60#�Ҹ�");
        } else if (selection == 100005) {
                cm.sendSimple ("#r#e[ ������ ���� ]#n#k\r\n" +
            "#k#L66#����" +
            "#k#L67#��");
        } else if (selection == 100006) {
                cm.sendSimple ("#r#e[ �Ǽ��縮 ���� ]#n#k" +
            "\r\n#L69#�����" +
            "#L70#�����" +
            "#L71#���Ʈ" +
            "#L72#����" +
            "#L74#����");
        } else if (selection == 100007) {
            cm.dispose();
            cm.openNpc(1002006);
        } else if (selection == 100008) {
            cm.dispose();
            cm.openNpc(1530210);
        } else if (selection == 100009) {
            cm.dispose();
            cm.openNpc(2411025);
        } else if (selection == 100010) {
            cm.dispose();
            cm.openNpc(1002003);         
        } else if (selection == 100011) {
            cm.dispose();
            cm.openNpc(3003228);
        } else if (selection == 100012) {
            cm.dispose();
            cm.openNpc(2520024);
        } else if (selection == 100013) {
            cm.dispose();
            cm.openNpc(9201023);
        } else if (selection == 100014) {
            cm.dispose();
            cm.openNpc(2450023);
        } else if (selection == 100015) {
            cm.dispose();
            cm.openNpc(1512003);
        } else if (selection == 100016) {
            cm.dispose();
            cm.openNpc(9001119);
        } else if (selection == 100017) {
            cm.dispose();
            cm.openNpc(9001119);
        } else if (selection >= 0) {
            cm.CollectivelyShop(selection, 1530429);
            cm.dispose();
 } else if (s == 1) {
  cm.openNpc (9010095);
 } else if (s == 2) {
  cm.openNpc (1012000);
 } else if (s == 3) {
  cm.openNpc (9001076);
 } else if (s == 4) {
  cm.openNpc (1540850);
 } else if (s == 5) {
  cm.openNpc (1540106);
        }
    }
}